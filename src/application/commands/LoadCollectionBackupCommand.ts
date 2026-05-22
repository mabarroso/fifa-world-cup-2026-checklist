import { CollectionState } from '../../domain/entities/CollectionState';
import type { CollectionStateData } from '../../domain/entities/CollectionState';
import type { CollectionRepository } from '../../domain/repositories/CollectionRepository';
import type {
  CollectionBackupFile,
  CollectionBackupFileGateway,
} from '../ports/CollectionBackupFileGateway';

function assertValidCollectionMap(map: unknown, fieldName: string): asserts map is Record<string, number> {
  if (typeof map !== 'object' || map === null || Array.isArray(map)) {
    throw new Error(`El campo "${fieldName}" del backup no es válido.`);
  }

  for (const [key, value] of Object.entries(map)) {
    if (typeof value !== 'number' || Number.isNaN(value) || value < 0) {
      throw new Error(`El valor para "${fieldName}.${key}" debe ser un número mayor o igual que 0.`);
    }
  }
}

function normalizeSemver(version: string): [number, number, number] {
  const parsed = version.trim().match(/^(\d+)\.(\d+)\.(\d+)$/);

  if (!parsed) {
    throw new Error(`Versión inválida: ${version}`);
  }

  return [Number(parsed[1]), Number(parsed[2]), Number(parsed[3])];
}

function compareSemver(left: string, right: string): number {
  const [la, lb, lc] = normalizeSemver(left);
  const [ra, rb, rc] = normalizeSemver(right);

  if (la !== ra) return la - ra;
  if (lb !== rb) return lb - rb;
  return lc - rc;
}

function assertValidBackupPayload(payload: unknown): asserts payload is CollectionBackupFile {
  if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) {
    throw new Error('El contenido del backup no es un objeto JSON válido.');
  }

  const maybeBackup = payload as Partial<CollectionBackupFile>;

  if (typeof maybeBackup.appVersion !== 'string') {
    throw new Error('El backup no contiene un campo "appVersion" válido.');
  }

  if (typeof maybeBackup.collection !== 'object' || maybeBackup.collection === null || Array.isArray(maybeBackup.collection)) {
    throw new Error('El backup no contiene un campo "collection" válido.');
  }

  const collection = maybeBackup.collection as Partial<CollectionStateData>;
  assertValidCollectionMap(collection.owned, 'owned');
  assertValidCollectionMap(collection.duplicates, 'duplicates');
}

export class LoadCollectionBackupCommand {
  constructor(
    private repository: CollectionRepository,
    private backupGateway: CollectionBackupFileGateway,
    private currentAppVersion: string,
  ) {}

  async execute(filePath: string): Promise<{ importedVersion: string }> {
    if (!filePath.toLowerCase().endsWith('.fwc26')) {
      throw new Error('El archivo seleccionado no tiene extensión .fwc26.');
    }

    const payload = await this.backupGateway.readBackup(filePath);
    assertValidBackupPayload(payload);

    if (compareSemver(payload.appVersion, this.currentAppVersion) > 0) {
      throw new Error(
        `El backup fue generado con una versión más nueva (${payload.appVersion}) y no es compatible con la app actual (${this.currentAppVersion}).`,
      );
    }

    const nextState = CollectionState.fromJSON(payload.collection);
    await this.repository.save(nextState);

    return { importedVersion: payload.appVersion };
  }
}
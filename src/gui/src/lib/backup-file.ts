export interface GuiCollectionState {
  owned: Record<string, number>;
  duplicates: Record<string, number>;
}

export interface BackupFilePayload {
  appVersion: string;
  collection: GuiCollectionState;
}

export const GUI_APP_VERSION = '1.0.3';

function parseSemver(version: string): [number, number, number] {
  const match = version.trim().match(/^(\d+)\.(\d+)\.(\d+)$/);

  if (!match) {
    throw new Error(`Versión inválida: ${version}`);
  }

  return [Number(match[1]), Number(match[2]), Number(match[3])];
}

export function compareSemver(left: string, right: string): number {
  const [la, lb, lc] = parseSemver(left);
  const [ra, rb, rc] = parseSemver(right);

  if (la !== ra) return la - ra;
  if (lb !== rb) return lb - rb;
  return lc - rc;
}

function assertMap(value: unknown, name: string): asserts value is Record<string, number> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new Error(`El campo "${name}" no es válido.`);
  }

  for (const [key, mapValue] of Object.entries(value)) {
    if (typeof mapValue !== 'number' || Number.isNaN(mapValue) || mapValue < 0) {
      throw new Error(`El valor "${name}.${key}" debe ser un número mayor o igual que 0.`);
    }
  }
}

export function buildBackupPayload(collection: GuiCollectionState, appVersion: string = GUI_APP_VERSION): BackupFilePayload {
  return {
    appVersion,
    collection: {
      owned: { ...collection.owned },
      duplicates: { ...collection.duplicates },
    },
  };
}

export function serializeBackup(payload: BackupFilePayload): string {
  return `${JSON.stringify(payload, null, 2)}\n`;
}

export function parseBackup(content: string): BackupFilePayload {
  let parsed: unknown;
  try {
    parsed = JSON.parse(content);
  } catch {
    throw new Error('El archivo no contiene JSON válido.');
  }

  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    throw new Error('El backup no tiene un formato válido.');
  }

  const payload = parsed as Partial<BackupFilePayload>;
  if (typeof payload.appVersion !== 'string') {
    throw new Error('El backup no contiene una versión válida.');
  }

  if (typeof payload.collection !== 'object' || payload.collection === null || Array.isArray(payload.collection)) {
    throw new Error('El backup no contiene datos de colección válidos.');
  }

  const collection = payload.collection as Partial<GuiCollectionState>;
  assertMap(collection.owned, 'owned');
  assertMap(collection.duplicates, 'duplicates');

  return {
    appVersion: payload.appVersion,
    collection: {
      owned: collection.owned,
      duplicates: collection.duplicates,
    },
  };
}

export function assertCompatibleBackup(backupVersion: string, currentVersion: string = GUI_APP_VERSION): void {
  if (compareSemver(backupVersion, currentVersion) > 0) {
    throw new Error(
      `El backup fue creado con una versión más nueva (${backupVersion}) que la app actual (${currentVersion}).`,
    );
  }
}
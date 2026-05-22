import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FileText, Table, List, Download, FolderOpen, Save, Upload } from 'lucide-react';
import { useCollectionStore } from '../stores';
import { getAllStickers } from '../data/stickers';
import { Button, Panel, Badge, Header } from '../components';
import { invoke } from '@tauri-apps/api/core';
import {
  assertCompatibleBackup,
  buildBackupPayload,
  GUI_APP_VERSION,
  parseBackup,
  serializeBackup,
} from '../lib/backup-file';

const formats = [
  { id: 'pdf', label: 'PDF', icon: FileText, color: 'var(--color-red)', desc: 'Lista para imprimir' },
  { id: 'csv', label: 'CSV', icon: Table, color: 'var(--color-green)', desc: 'Hoja de cálculo' },
  { id: 'txt', label: 'TXT', icon: List, color: 'var(--color-cyan)', desc: 'Archivo de texto' },
];

export function ExportScreen() {
  const { owned, duplicates, setOwned, setDuplicates } = useCollectionStore();
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);
  const [exported, setExported] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [backupMessage, setBackupMessage] = useState<string | null>(null);
  const [backupBusy, setBackupBusy] = useState(false);

  const allStickers = useMemo(() => getAllStickers(), []);

  const missing = useMemo(() => {
    return allStickers.filter((s) => !owned[s.id]);
  }, [allStickers, owned]);

  const missingCount = missing.length;

  const hasData = useMemo(() => {
    const ownedCount = Object.values(owned).some((qty) => qty > 0);
    const duplicatesCount = Object.values(duplicates).some((qty) => qty > 0);
    return ownedCount || duplicatesCount;
  }, [owned, duplicates]);

  const handleExport = async (format: string) => {
    setSelectedFormat(format);
    setExporting(true);
    setError(null);

    try {
      let result: string;
      switch (format) {
        case 'pdf':
          result = await invoke('export_pdf', { stickers: missing });
          break;
        case 'csv':
          result = await invoke('export_csv', { stickers: missing });
          break;
        case 'txt':
          result = await invoke('export_txt', { stickers: missing });
          break;
        default:
          throw new Error(`Formato no soportado: ${format}`);
      }

      setExporting(false);
      setExported(true);
      // Optionally, we could show a success message with the file path
      console.log('Exportado a:', result);
    } catch (err) {
      setExporting(false);
      setError(err instanceof Error ? err.message : 'Error desconocido');
      console.error('Error al exportar:', err);
    }
  };

  const handleSaveBackup = async () => {
    setBackupBusy(true);
    setError(null);
    setBackupMessage(null);

    try {
      const payload = buildBackupPayload({ owned, duplicates }, GUI_APP_VERSION);
      const content = serializeBackup(payload);
      const suggestedName = 'coleccion.fwc26';
      const isTauri = typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;

      if (isTauri) {
        const { save } = await import('@tauri-apps/plugin-dialog');
        const { writeTextFile } = await import('@tauri-apps/plugin-fs');

        const selectedPath = await save({
          defaultPath: suggestedName,
          filters: [{ name: 'Backup Panini FWC26', extensions: ['fwc26'] }],
        });

        if (!selectedPath) {
          setBackupMessage('Guardado cancelado.');
          return;
        }

        const finalPath = selectedPath.toLowerCase().endsWith('.fwc26')
          ? selectedPath
          : `${selectedPath}.fwc26`;

        await writeTextFile(finalPath, content);
        setBackupMessage(`Copia de seguridad guardada correctamente: ${finalPath}`);
      } else {
        const blob = new Blob([content], { type: 'application/json' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = suggestedName;
        link.click();
        URL.revokeObjectURL(url);
        setBackupMessage('Copia de seguridad guardada correctamente (.fwc26).');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar backup');
    } finally {
      setBackupBusy(false);
    }
  };

  const handleOpenBackup = async () => {
    setBackupBusy(true);
    setError(null);
    setBackupMessage(null);

    try {
      if (hasData) {
        const accepted = window.confirm(
          'ATENCION: tu colección actual no está vacía. Si continúas, será reemplazada por el contenido del backup. ¿Deseas continuar?',
        );

        if (!accepted) {
          setBackupMessage('Importación cancelada.');
          return;
        }
      }

      const isTauri = typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;
      let content = '';

      if (isTauri) {
        const { open } = await import('@tauri-apps/plugin-dialog');
        const { readTextFile } = await import('@tauri-apps/plugin-fs');

        const selectedPath = await open({
          multiple: false,
          filters: [{ name: 'Backup Panini FWC26', extensions: ['fwc26'] }],
        });

        if (!selectedPath || Array.isArray(selectedPath)) {
          setBackupMessage('Importación cancelada.');
          return;
        }

        content = await readTextFile(selectedPath);
      } else {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.fwc26';

        const file = await new Promise<File>((resolve, reject) => {
          input.onchange = () => {
            const selected = input.files?.[0];
            if (!selected) {
              reject(new Error('No se seleccionó ningún archivo.'));
              return;
            }
            resolve(selected);
          };
          input.click();
        });

        content = await file.text();
      }

      const backup = parseBackup(content);
      assertCompatibleBackup(backup.appVersion, GUI_APP_VERSION);
      setOwned(backup.collection.owned);
      setDuplicates(backup.collection.duplicates);
      setBackupMessage(`Backup cargado correctamente (versión ${backup.appVersion}).`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al abrir backup');
    } finally {
      setBackupBusy(false);
    }
  };

  const getPreview = () => {
    return missing.slice(0, 5).map((s) => `${s.id},${s.name},${s.team}`).join('\n');
  };

  return (
    <div>
      <Header />
      {error && (
        <Panel className="p-6 text-center border-[var(--color-red)] mb-6">
          <p className="text-[var(--color-white)]">{error}</p>
        </Panel>
      )}
      <p className="text-[var(--color-white)] opacity-60 mb-6">
        Exporta tus cromos faltantes en diferentes formatos
      </p>

      <div className="flex gap-6">
        <div className="flex-1">
          <Panel className="p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4 text-[var(--color-white)]">
              Copia de seguridad
            </h2>
            <p className="text-sm text-[var(--color-white)] opacity-70 mb-4">
              Guarda o abre tu colección en archivos .fwc26
            </p>
            <div className="flex gap-3 flex-wrap">
              <Button variant="secondary" onClick={handleSaveBackup} disabled={backupBusy}>
                <Save size={16} className="mr-2" />
                Guardar backup
              </Button>
              <Button variant="secondary" onClick={handleOpenBackup} disabled={backupBusy}>
                <Upload size={16} className="mr-2" />
                Abrir backup
              </Button>
            </div>
            {backupMessage && (
              <p className="text-sm text-[var(--color-green)] mt-4">{backupMessage}</p>
            )}
          </Panel>

          <div className="grid grid-cols-3 gap-4 mb-6">
            {formats.map((format) => (
              <motion.div
                key={format.id}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleExport(format.id)}
                className={`p-6 rounded-2xl cursor-pointer transition-all ${
                  selectedFormat === format.id
                    ? 'bg-[var(--color-surface)] border-2'
                    : 'bg-[var(--color-surface)]/50 border border-transparent hover:border-white/20'
                }`}
                style={{
                  borderColor: selectedFormat === format.id ? format.color : undefined,
                }}
              >
                <format.icon
                  size={48}
                  style={{ color: format.color }}
                  className="mb-4"
                />
                <h3 className="text-xl font-bold text-[var(--color-white)] mb-1">
                  {format.label}
                </h3>
                <p className="text-sm text-[var(--color-white)] opacity-60">
                  {format.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {exporting && (
            <Panel className="p-6 text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="inline-block mb-4"
              >
                <Download size={32} className="text-[var(--color-cyan)]" />
              </motion.div>
              <p className="text-[var(--color-white)]">Exportando...</p>
            </Panel>
          )}

          {exported && !exporting && (
            <Panel className="p-6 text-center border-[var(--color-green)]">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-green)]/20 mb-4"
              >
                <Download size={32} className="text-[var(--color-green)]" />
              </motion.div>
              <p className="text-lg text-[var(--color-white)] mb-2">
                  Exportación Completa!
                </p>
              <p className="text-sm text-[var(--color-white)] opacity-60 mb-4">
                Archivo guardado exitosamente
              </p>
              <Button
                variant="secondary"
                onClick={async () => {
                  try {
                    await invoke('open_downloads_folder');
                  } catch (err) {
                    console.error('Error al abrir carpeta:', err);
                  }
                }}
              >
                <FolderOpen size={16} className="mr-2" />
                Abrir Carpeta
              </Button>
            </Panel>
          )}
        </div>

        <div className="w-96">
          <Panel className="p-4">
            <h2 className="text-lg font-semibold mb-4 text-[var(--color-white)]">
              Vista Previa
            </h2>
            <div className="bg-[var(--color-surface-2)] rounded-xl p-4 font-mono text-xs text-[var(--color-white)] overflow-hidden">
              <pre className="whitespace-pre-wrap">{getPreview()}</pre>
              {missingCount > 5 && (
                <p className="text-[var(--color-white)] opacity-40 mt-2">
                  ... y {missingCount - 5} más
                </p>
              )}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-[var(--color-white)] opacity-60">
                Total faltantes
              </span>
              <Badge variant="red">{missingCount}</Badge>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
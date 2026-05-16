## 1. Scripts de Parsing

- [x] 1.1 Crear scripts/parse-stickers.js para parsear HTML a CSV
- [x] 1.2 Crear scripts/normalize-types.js para asignar tipos
- [x] 1.3 Ejecutar scripts y verificar output en src/data/stickers.csv

## 2. Actualización de StickerType

- [x] 2.1 Expandir enum StickerType con 14 valores
- [x] 2.2 Añadir getLabel() con etiquetas en español
- [x] 2.3 Añadir fromString() para parsing de CSV
- [x] 2.4 Añadir isValid() para validación

## 3. Actualización de StickerId

- [x] 3.1 Actualizar parsing para nuevos formatos (FWC1, CC-US1, MC-1, etc.)
- [x] 3.2 Manejar variantes Extra (-b, -s, -g)
- [x] 3.3 Validar IDs según nuevos patrones

## 4. Simplificación de Sticker

- [x] 4.1 Eliminar campos obsoletos (number, teamCode, group, extraVariant)
- [x] 4.2 Mantener solo: id, name, team, type
- [x] 4.3 Actualizar constructor e interfaz StickerData
- [x] 4.4 Actualizar toString() y toJSON()

## 5. Actualización de stickers.ts Loader

- [x] 5.1 Actualizar parseCSV() para nuevo formato
- [x] 5.2 Actualizar loadStickersFromCsv() para nuevos campos
- [x] 5.3 Añadir función getStickersByType(type)
- [x] 5.4 Verificar TOTAL_STICKERS actualizado

## 6. Terminología CLI - MarkDuplicateMenu

- [x] 6.1 Cambiar "duplicado" → "repetido" en prompt título
- [x] 6.2 Cambiar "duplicado" → "repetida" en mensajes de ayuda
- [x] 6.3 Verificar mensajes de éxito

## 7. Terminología CLI - StatisticsDisplay

- [x] 7.1 Cambiar "Duplicadas" → "Repetidas" en estadísticas
- [x] 7.2 Verificar top duplicates display

## 8. Terminología CLI - ViewCollectionMenu

- [x] 8.1 Cambiar "Ver repetidas" en opciones de filtro
- [x] 8.2 Verificar status icon para repetidos

## 9. Terminología CLI - MainMenu

- [x] 9.1 Verificar y actualizar menciones de "repetidas"

## 10. Terminología CLI - ExportMenu

- [x] 10.1 Verificar y actualizar menciones de "repetidas"

## 11. Terminología CLI - SearchInterface

- [x] 11.1 Verificar y actualizar menciones de "repetidas"

## 12. Actualización de Exporters

- [x] 12.1 Añadir columna type a CsvExporter
- [x] 12.2 Verificar PdfExporter (solo muestra id, name, team)
- [x] 12.3 Verificar TxtExporter (agrupa por team)

## 13. Terminología GUI - Screens

- [x] 13.1 Actualizar MarkDuplicate.tsx: "duplicada" → "repetida"
- [x] 13.2 Actualizar Statistics.tsx: "duplicadas" → "repetidas"
- [x] 13.3 Actualizar ViewCollection.tsx: "duplicada" → "repetida"
- [x] 13.4 Verificar Search.tsx si aplica
- [x] 13.5 Verificar Export.tsx si aplica
- [x] 13.6 Verificar MarkOwned.tsx si aplica

## 14. Terminología GUI - Sidebar

- [x] 14.1 Cambiar "Marcar Duplicada" → "Marcar Repetida" en navegación

## 15. Regenerar stickers.json para GUI

- [x] 15.1 Generar src/gui/src/data/stickers.json desde CSV actualizado
- [x] 15.2 Verificar que todos los tipos están correctamente mapeados

## 16. Actualizar CollectionStore de GUI

- [x] 16.1 Verificar lógica de repetidos (owned >= 2 = repeated)
- [x] 16.2 Verificar que reset() limpia correctamente

## 17. Reinicio de Colección

- [x] 17.1 Limpiar ~/.config/panini-stickers/collection.json
- [x] 17.2 Limpiar localStorage (panini-collection) en GUI

## 18. Verificación y Testing

- [x] 18.1 Ejecutar bun test y verificar todos los tests
- [x] 18.2 Ejecutar bun run typecheck y verificar tipos
- [x] 18.3 Ejecutar npm run lint en GUI
- [x] 18.4 Verificación manual de CLI (todos los menús)
- [x] 18.5 Verificación manual de GUI (todas las pantallas)
- [x] 18.6 Verificar exports (PDF, CSV, TXT)
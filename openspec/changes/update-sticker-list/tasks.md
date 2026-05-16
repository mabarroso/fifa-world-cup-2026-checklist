## 1. Scripts de Parsing

- [ ] 1.1 Crear scripts/parse-stickers.js para parsear HTML a CSV
- [ ] 1.2 Crear scripts/normalize-types.js para asignar tipos
- [ ] 1.3 Ejecutar scripts y verificar output en src/data/stickers.csv

## 2. Actualización de StickerType

- [ ] 2.1 Expandir enum StickerType con 14 valores
- [ ] 2.2 Añadir getLabel() con etiquetas en español
- [ ] 2.3 Añadir fromString() para parsing de CSV
- [ ] 2.4 Añadir isValid() para validación

## 3. Actualización de StickerId

- [ ] 3.1 Actualizar parsing para nuevos formatos (FWC1, CC-US1, MC-1, etc.)
- [ ] 3.2 Manejar variantes Extra (-b, -s, -g)
- [ ] 3.3 Validar IDs según nuevos patrones

## 4. Simplificación de Sticker

- [ ] 4.1 Eliminar campos obsoletos (number, teamCode, group, extraVariant)
- [ ] 4.2 Mantener solo: id, name, team, type
- [ ] 4.3 Actualizar constructor e interfaz StickerData
- [ ] 4.4 Actualizar toString() y toJSON()

## 5. Actualización de stickers.ts Loader

- [ ] 5.1 Actualizar parseCSV() para nuevo formato
- [ ] 5.2 Actualizar loadStickersFromCsv() para nuevos campos
- [ ] 5.3 Añadir función getStickersByType(type)
- [ ] 5.4 Verificar TOTAL_STICKERS actualizado

## 6. Terminología CLI - MarkDuplicateMenu

- [ ] 6.1 Cambiar "duplicado" → "repetido" en prompt título
- [ ] 6.2 Cambiar "duplicado" → "repetida" en mensajes de ayuda
- [ ] 6.3 Verificar mensajes de éxito

## 7. Terminología CLI - StatisticsDisplay

- [ ] 7.1 Cambiar "Duplicadas" → "Repetidas" en estadísticas
- [ ] 7.2 Verificar top duplicates display

## 8. Terminología CLI - ViewCollectionMenu

- [ ] 8.1 Cambiar "Ver repetidas" en opciones de filtro
- [ ] 8.2 Verificar status icon para repetidos

## 9. Terminología CLI - MainMenu

- [ ] 9.1 Verificar y actualizar menciones de "repetidas"

## 10. Terminología CLI - ExportMenu

- [ ] 10.1 Verificar y actualizar menciones de "repetidas"

## 11. Terminología CLI - SearchInterface

- [ ] 11.1 Verificar y actualizar menciones de "repetidas"

## 12. Actualización de Exporters

- [ ] 12.1 Añadir columna type a CsvExporter
- [ ] 12.2 Verificar PdfExporter (solo muestra id, name, team)
- [ ] 12.3 Verificar TxtExporter (agrupa por team)

## 13. Terminología GUI - Screens

- [ ] 13.1 Actualizar MarkDuplicate.tsx: "duplicada" → "repetida"
- [ ] 13.2 Actualizar Statistics.tsx: "duplicadas" → "repetidas"
- [ ] 13.3 Actualizar ViewCollection.tsx: "duplicada" → "repetida"
- [ ] 13.4 Verificar Search.tsx si aplica
- [ ] 13.5 Verificar Export.tsx si aplica
- [ ] 13.6 Verificar MarkOwned.tsx si aplica

## 14. Terminología GUI - Sidebar

- [ ] 14.1 Cambiar "Marcar Duplicada" → "Marcar Repetida" en navegación

## 15. Regenerar stickers.json para GUI

- [ ] 15.1 Generar src/gui/src/data/stickers.json desde CSV actualizado
- [ ] 15.2 Verificar que todos los tipos están correctamente mapeados

## 16. Actualizar CollectionStore de GUI

- [ ] 16.1 Verificar lógica de repetidos (owned >= 2 = repeated)
- [ ] 16.2 Verificar que reset() limpia correctamente

## 17. Reinicio de Colección

- [ ] 17.1 Limpiar ~/.config/panini-stickers/collection.json
- [ ] 17.2 Limpiar localStorage (panini-collection) en GUI

## 18. Verificación y Testing

- [ ] 18.1 Ejecutar bun test y verificar todos los tests
- [ ] 18.2 Ejecutar bun run typecheck y verificar tipos
- [ ] 18.3 Ejecutar npm run lint en GUI
- [ ] 18.4 Verificación manual de CLI (todos los menús)
- [ ] 18.5 Verificación manual de GUI (todas las pantallas)
- [ ] 18.6 Verificar exports (PDF, CSV, TXT)
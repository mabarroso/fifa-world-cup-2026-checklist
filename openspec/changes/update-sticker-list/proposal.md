## Why

La lista actual de cromos (912 cromos) no refleja el catálogo completo del álbum Panini FIFA World Cup 2026. El nuevo archivo `docs/stickers.csv` contiene información actualizada con ~897 cromos organizados en nuevas categorías (Coca-Cola por regiones, McDonald's, Extra en variantes Base/Bronze/Silver/Gold). Además, la terminología actual usa "duplicado" cuando debería usar "repetido" para mayor claridad en español.

## What Changes

- **Nueva lista de cromos**: Parsear `docs/stickers.csv` (formato HTML) y actualizar `src/data/stickers.csv` con formato simplificado (id, name, team, type)
- **Nuevas categorías de cromos**:
  - Panini Normal (logo, FWC, equipos)
  - Panini Extra (sufijo 's')
  - Coca-Cola USA/Canada (CC-US)
  - Coca-Cola Latin America (CC-LAM)
  - Coca-Cola Rest of World (CC-RW)
  - Coca-Cola Europe (CC-EU)
  - McDonald's (MC-)
  - Extra Base, Bronze, Silver, Gold
- **Nuevo tipo de cromo (StickerType)**: Expandir enum con todos los tipos nuevos
- **Cambio de terminología**: "duplicado" → "repetido" en toda la aplicación (CLI y GUI)
- **Reinicio de progreso**: Limpiar colección existente (nueva lista de cromos, incompatible con anterior)
- **Actualización de exports**: Añadir columna `type` a exports CSV
- **BREAKING**: Eliminación de campos obsoletos en Sticker (number, teamCode, group, extraVariant)

## Capabilities

### New Capabilities
- `sticker-categories`: Sistema de categorías para cromos Panini, Coca-Cola, McDonald's y Extra
- `sticker-type-enum`: Enum expandido con tipos específicos por categoría
- `terminology-update`: Actualización de terminología de "duplicado" a "repetido"

### Modified Capabilities
- `sticker-collection`: Cambios en la estructura de StickerData (campos eliminados)
- `collection-state`: Lógica de negocio ajustada para el nuevo modelo

## Impact

### Code
- `src/domain/entities/Sticker.ts`: Simplificación de campos
- `src/domain/value-objects/StickerType.ts`: Nuevos tipos
- `src/domain/value-objects/StickerId.ts`: Parsing de nuevos formatos
- `src/data/stickers.ts`: Nuevo loader desde CSV actualizado
- `src/infrastructure/cli/*.ts`: Terminología actualizada
- `src/gui/src/data/stickers.json`: Regenerado con nuevos tipos
- `src/gui/src/stores/collectionStore.ts`: Ajustes
- `src/gui/src/screens/*.tsx`: Terminología actualizada
- `src/infrastructure/exporters/*.ts`: Añadir columna type

### Data
- `src/data/stickers.csv`: ~897 cromos con nuevo formato
- `~/.config/panini-stickers/collection.json`: Reinicio requerido

### Scripts
- `scripts/parse-stickers.js`: Parsear HTML a CSV limpio
- `scripts/normalize-types.js`: Asignar tipos correctos a cada cromo
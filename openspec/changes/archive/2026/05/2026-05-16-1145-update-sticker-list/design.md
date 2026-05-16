## Context

### Current State
- Lista actual de cromos: 912 cromos en formato CSV (`src/data/stickers.csv`)
- Estructura: `id,number,name,team,teamCode,group,type,extraVariant`
- Terminología actual: "duplicado"/"duplicada" para cromos repetidos
- Colección guardada en `~/.config/panini-stickers/collection.json`

### Target State
- Nueva lista de cromos: ~897 cromos desde `docs/stickers.csv` (formato HTML)
- Estructura simplificada: `id,name,team,type`
- Terminología: "repetido"/"repetida" para cromos repetidos
- Nuevas categorías: Panini, Coca-Cola (4 regiones), McDonald's, Extra (4 variantes)
- Reinicio de colección requerido (incompatible)

### Constraints
- Mantener IDs como vienen (FWC1, no FWC-01)
- Mapear foil/-/b/s/g a nuevos tipos de colección
- No mantener compatibilidad con datos de colección anteriores
- CLI y GUI deben actualizarse sincronizadamente

## Goals / Non-Goals

**Goals:**
- Actualizar lista de cromos desde `docs/stickers.csv`
- Expandir StickerType con categorías completas
- Simplificar estructura de StickerData
- Actualizar terminología CLI/GUI (duplicado → repetido)
- Añadir columna `type` a exports CSV
- Reiniciar progreso de colección

**Non-Goals:**
- Mantener backwards compatibility con colección existente
- Migrar datos de colección antiguos
- Cambiar arquitectura de aplicación
- Añadir nuevas funcionalidades más allá de categorización

## Decisions

### 1. Estructura de StickerData simplificada

| Opción | Decisión | Justificación |
|--------|----------|---------------|
| Mantener: id, name, team, type | ✅ Seleccionado | Suficiente para UI y lógica de negocio |
| Eliminar: number, teamCode, group, extraVariant | ✅ Eliminados | No necesarios para categorización, simplifica modelo |

**Alternativa descartada:** Mantener campos adicionales para compatibilidad futura
- **Razón:** Complejidad innecesaria, la UI solo necesita los 4 campos

### 2. Nuevo StickerType enum

```typescript
export enum StickerType {
  LOGO = 'logo',                    // Panini Logo (id: 0)
  FWC_SPECIAL = 'fwc_special',      // FWC1-FWC8
  TEAM_BADGE = 'team_badge',        // Escudos (primera fila de cada equipo)
  PLAYER = 'player',                // Jugadores (resto de filas)
  PANINI_EXTRA = 'panini_extra',    // Sufijo 's' en Panini
  COCA_COLA_US = 'cocacola_us',     // CC-US1-12
  COCA_COLA_LAM = 'cocacola_lam',   // CC-LAM1-14
  COCA_COLA_RW = 'cocacola_rw',     // CC-RW1-14
  COCA_COLA_EU = 'cocacola_eu',     // CC-EU1-12
  MC_DONALDS = 'mcdonalds',         // MC-1-7
  EXTRA_BASE = 'extra_base',        // Sin sufijo (Extra)
  EXTRA_BRONZE = 'extra_bronze',     // Sufijo -b
  EXTRA_SILVER = 'extra_silver',     // Sufijo -s
  EXTRA_GOLD = 'extra_gold',         // Sufijo -g
}
```

**Alternativa descartada:** Usar tipos genéricos (panini, cocacola, extra)
- **Razón:** Necesidad de distinguir subcategorías para estadísticas y filtros

### 3. Parsing de IDs para asignación de tipos

| Prefijo ID | Tipo | Regla |
|------------|------|-------|
| `0` | LOGO | ID exacto |
| `FWC` | FWC_SPECIAL | Prefijo FWC |
| `{TEAM}1` con teambadge | TEAM_BADGE | Primera fila de cada equipo |
| `{TEAM}2-20` | PLAYER | Jugadores |
| `{TEAM}s` (Panini) | PANINI_EXTRA | Sufijo 's' en equipos |
| `CC-US` | COCA_COLA_US | Prefijo CC-US |
| `CC-LAM` | COCA_COLA_LAM | Prefijo CC-LAM |
| `CC-RW` | COCA_COLA_RW | Prefijo CC-RW |
| `CC-EU` | COCA_COLA_EU | Prefijo CC-EU |
| `MC-` | MC_DONALDS | Prefijo MC- |
| `{TEAM}` (Extra) | EXTRA_BASE | Sin sufijo en Extra |
| `{TEAM}-b` | EXTRA_BRONZE | Sufijo -b |
| `{TEAM}-s` (Extra) | EXTRA_SILVER | Sufijo -s en Extra |
| `{TEAM}-g` | EXTRA_GOLD | Sufijo -g |

### 4. Scripts de conversión

| Script | Función |
|--------|---------|
| `scripts/parse-stickers.js` | Parsear HTML → CSV limpio |
| `scripts/normalize-types.js` | Asignar tipos a cada cromo |

**Alternativa descartada:** Hacer parsing en runtime
- **Razón:** Necesidad de tener datos estáticos para offline, performance

### 5. Orden de categorías para UI

```
1. Panini Normal (logo, FWC, equipos)
2. Panini Extra (sufijo 's')
3. Coca-Cola USA/Canada (CC-US)
4. Coca-Cola Latin America (CC-LAM)
5. Coca-Cola Rest of World (CC-RW)
6. Coca-Cola Europe (CC-EU)
7. McDonald's (MC-)
8. Extra Base
9. Extra Bronze (-b)
10. Extra Silver (-s)
11. Extra Gold (-g)
```

## Risks / Trade-offs

| Riesgo | Mitigación |
|--------|------------|
| Datos de colección perdidos al reiniciar | Confirmar con usuario antes de proceder |
| Incompatibilidad con datos existentes de GUI | Limpiar localStorage al actualizar |
| Errors en parsing de HTML | Validar output con script de verificación |
| Cambios no detectados en exports | Revisar PdfExporter, CsvExporter, TxtExporter |

## Migration Plan

### Fase 1: Scripts de parsing
1. Crear `scripts/parse-stickers.js`
2. Ejecutar y verificar output en `src/data/stickers.csv`
3. Crear `scripts/normalize-types.js`
4. Asignar tipos correctos

### Fase 2: Domain updates
1. Actualizar `StickerType.ts` con nuevos tipos
2. Actualizar `StickerId.ts` para parsing de nuevos formatos
3. Simplificar `Sticker.ts` (eliminar campos obsoletos)
4. Actualizar `stickers.ts` loader

### Fase 3: Terminología
1. Actualizar CLI (todos los archivos en `src/infrastructure/cli/`)
2. Actualizar GUI (screens y store)

### Fase 4: Exports y datos
1. Añadir columna `type` a CsvExporter
2. Limpiar colección existente (CLI y GUI)
3. Regenerar `src/gui/src/data/stickers.json`

### Fase 5: Verificación
1. Ejecutar `bun test`
2. Ejecutar `bun run typecheck`
3. Ejecutar `npm run lint` (GUI)
4. Verificación manual

## Open Questions

| Pregunta | Estado | Decisión |
|----------|--------|----------|
| ¿Mantener compatibilidad con CLI antiguo? | ✅ Resuelto | No - BREAKING CHANGE |
| ¿Regex para parsing de IDs? | ✅ Resuelto | Usar prefijos como en tabla de decisiones |
| ¿Orden de grupos en UI? | ✅ Resuelto | Ver sección de orden de categorías |
| ¿Mensaje de reinicio? | ✅ Resuelto | Confirmar con usuario |

## Files to Modify

### Domain
- `src/domain/value-objects/StickerType.ts`
- `src/domain/value-objects/StickerId.ts`
- `src/domain/entities/Sticker.ts`
- `src/domain/entities/CollectionState.ts` (si aplica)

### Data
- `src/data/stickers.csv` (regenerar)
- `src/data/stickers.ts`

### CLI
- `src/infrastructure/cli/MainMenu.ts`
- `src/infrastructure/cli/ViewCollectionMenu.ts`
- `src/infrastructure/cli/MarkOwnedMenu.ts`
- `src/infrastructure/cli/MarkDuplicateMenu.ts`
- `src/infrastructure/cli/StatisticsDisplay.ts`
- `src/infrastructure/cli/ExportMenu.ts`
- `src/infrastructure/cli/SearchInterface.ts`

### Exporters
- `src/infrastructure/exporters/CsvExporter.ts` (añadir type)
- `src/infrastructure/exporters/PdfExporter.ts` (verificar)
- `src/infrastructure/exporters/TxtExporter.ts` (verificar)

### GUI
- `src/gui/src/data/stickers.json` (regenerar)
- `src/gui/src/stores/collectionStore.ts`
- `src/gui/src/screens/ViewCollection.tsx`
- `src/gui/src/screens/MarkOwned.tsx`
- `src/gui/src/screens/MarkDuplicate.tsx`
- `src/gui/src/screens/Statistics.tsx`
- `src/gui/src/screens/Search.tsx`
- `src/gui/src/screens/Export.tsx`

### Scripts
- `scripts/parse-stickers.js` (nuevo)
- `scripts/normalize-types.js` (nuevo)
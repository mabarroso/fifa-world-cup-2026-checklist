## 1. Actualización de Tokens CSS

- [x] 1.1 Reescribir index.css con nuevos tokens de ui_theme.md
- [x] 1.2 Añadir --font-body: Poppins en @theme
- [x] 1.3 Añadir background con formas geométricas (::before, ::after)
- [x] 1.4 Mantener backward compatibility con --color-* tokens
- [x] 1.5 Definir --radius: 20px

## 2. Actualización de HTML

- [x] 2.1 Actualizar index.html para cargar Poppins de Google Fonts

## 3. Actualización de Componentes

- [x] 3.1 Actualizar Button.tsx para usar .button de ui_theme
- [x] 3.2 Actualizar Badge.tsx con variantes: completed, in-progress, pending
- [x] 3.3 Verificar Card.tsx usa .match-card con border-radius 20px
- [x] 3.4 Verificar Panel.tsx usa .panel
- [x] 3.5 Verificar Input.tsx usa .input-gui

## 4. Actualización de Layout

- [x] 4.1 Actualizar AppLayout.tsx con clase .app y padding 24px
- [x] 4.2 Actualizar Header.tsx para usar .header style (28px, font-weight 800)
- [x] 4.3 Actualizar Sidebar.tsx con nuevos colores de ui_theme

## 5. Actualización de Screens

- [x] 5.1 Actualizar ViewCollection.tsx con nuevas variantes de Badge
- [x] 5.2 Actualizar MarkDuplicate.tsx con nuevas variantes de Badge
- [x] 5.3 Actualizar MarkOwned.tsx con nuevas variantes de Badge
- [x] 5.4 Actualizar Statistics.tsx con nuevas variantes de Badge
- [x] 5.5 Actualizar Search.tsx con nuevas variantes de Badge
- [x] 5.6 Actualizar Export.tsx con nuevas variantes de Badge

## 6. Verificación

- [x] 6.1 Ejecutar bun run build en GUI
- [x] 6.2 Verificar visuales en navegador
- [x] 6.3 Verificar que todos los componentes funcionan correctamente
- [x] 6.4 Ejecutar bun run lint en GUI
- [x] 6.5 Verificar formas geométricas en background
- [x] 6.6 Verificar fuente Poppins cargada
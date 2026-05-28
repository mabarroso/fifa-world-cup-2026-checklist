## 1. ThemeContext Type and State Changes

- [x] 1.1 Add `ThemeSetting` type (`'auto' | 'dark' | 'light'`) and `ActualTheme` type (`'dark' | 'light'`)
- [x] 1.2 Update `ThemeContextValue` interface to expose `themeSetting` and `actualTheme` instead of single `theme`
- [x] 1.3 Change initial state to read from localStorage or default to `'auto'`
- [x] 1.4 Add `useCallback`-based `getActualTheme()` function that computes actual theme from setting
- [x] 1.5 Add `matchMedia('(prefers-color-scheme: dark)')` listener to react to device changes
- [x] 1.6 Update `toggleTheme` to cycle: auto → light → dark → auto

## 2. Header Menu Update

- [x] 2.1 Update theme button label to show "Tema: Auto", "Tema: Claro", or "Tema: Oscuro"
- [x] 2.2 Update icon logic: Sun when actual theme is dark, Moon when actual theme is light

## 3. Spec Update

- [x] 3.1 Update `openspec/specs/theme-system/spec.md` main spec with modified requirements for 3-mode switching and auto default

## 4. Verification

- [x] 4.1 Run `bun test`
- [x] 4.2 Run `bun run typecheck`

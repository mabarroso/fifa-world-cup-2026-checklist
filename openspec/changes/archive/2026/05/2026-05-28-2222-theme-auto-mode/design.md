## Context

The current theme system stores a simple `'dark' | 'light'` string in localStorage under the key `theme`. On init, it reads this value or defaults to `'dark'`. The toggle just flips between the two. There is no concept of "follow device preference".

Users on macOS, iOS, Android, and modern Linux desktops can set a system-wide light/dark preference via `prefers-color-scheme`. The app should respect this by default.

## Goals / Non-Goals

**Goals:**
- Add `'auto'` as a third theme setting value
- On first load (no localStorage value), default to `'auto'`
- When setting is `'auto'`, read `window.matchMedia('(prefers-color-scheme: dark)')` and apply the result
- Listen for `change` events on the media query to update the applied theme in real time
- Update theme toggle to cycle: auto → light → dark → auto
- Persist the setting (auto/light/dark) to localStorage under the existing `theme` key

**Non-Goals:**
- No changes to CSS custom properties or visual tokens
- No changes to the `data-theme` attribute mechanism
- No migration logic for existing users (their saved `'dark'` or `'light'` will continue to work as before)

## Decisions

1. **New type `ThemeSetting`**: Introduce a union type `ThemeSetting = 'auto' | 'dark' | 'light'` for the user's persistent preference. Keep a derived `ActualTheme = 'dark' | 'light'` for the applied theme. This separation mirrors the pattern used in many design-system libraries.

2. **localStorage key unchanged**: Reuse the `theme` key. Existing users with `'dark'` or `'light'` stored will see those values respected. New users get `'auto'` by default. No migration needed.

3. **`useCallback` for `getActualTheme`**: Use a memoized function to compute the actual theme from the setting to avoid unnecessary recalculations. This function is stable across renders via `useCallback`.

4. **Media query listener**: Register a `change` event listener on the `matchMedia` object. When the setting is `'auto'`, update `actualTheme` reactively. Clean up the listener on unmount.

5. **Toggle cycle**: `auto → light → dark → auto`. This makes it easy for users to explore all three modes with repeated clicks.

6. **Header labels**: Show "Tema: Auto", "Tema: Claro", or "Tema: Oscuro" based on the current `themeSetting`. Show Sun icon when `actualTheme` is dark, Moon when light — this reflects what the user actually sees, regardless of setting.

## Risks / Trade-offs

- **Existing users with `'dark'` saved**: They'll keep dark mode, no change. This is correct behavior — they explicitly chose it.
- **SSR/SSG**: The app is client-side only (Vite SPA), so `window` and `localStorage` are always available for the init logic.
- **`useCallback` dependency**: `themeSetting` is a state value in the same component, so the callback is recreated on every setting change. This is fine — the effect that calls it also depends on `themeSetting`.
- **Missing `prefers-color-scheme` support**: Very old browsers might not support the media query. In that case, `auto` falls back to a light theme (since the query returns `false` for `matches`). This is an acceptable degradation.

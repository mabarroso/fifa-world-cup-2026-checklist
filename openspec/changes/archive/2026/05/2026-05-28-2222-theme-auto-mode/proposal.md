## Why

The theme system currently defaults to dark mode and only offers two options (Claro/Oscuro), ignoring the user's device-level preference. Users expect the app to respect their system-wide light/dark setting until they explicitly choose otherwise.

## What Changes

1. **Auto mode**: Add a third theme setting "Auto" that follows the device's `prefers-color-scheme` media query
2. **Default changed**: First-time users will default to "Auto" instead of "Dark"
3. **3-way toggle**: Theme toggle in the menu cycles through Auto → Claro → Oscuro → Auto
4. **Live updates**: When in "Auto" mode, changing the device preference immediately updates the app theme
5. **Menu labels**: Update menu item to show "Tema: Auto", "Tema: Claro", or "Tema: Oscuro" reflecting the current setting

## Capabilities

### New Capabilities
- (none)

### Modified Capabilities
- `theme-system`: Theme switching from 2 modes (dark/light) to 3 modes (auto/dark/light). Default theme from 'dark' to 'auto'. Option labels from "Claro/Oscuro" to "Auto/Claro/Oscuro".

## Impact

- `src/gui/src/stores/ThemeContext.tsx` — Change `Theme` type from `'dark' | 'light'` to `'auto' | 'dark' | 'light'`. Update initialization to default to 'auto'. Add `window.matchMedia('(prefers-color-scheme: dark)')` listener. Compute actual applied theme based on setting. Update `toggleTheme` to cycle through 3 states.
- `src/gui/src/components/Header.tsx` — Update theme menu button label and icon logic to reflect the current setting and actual theme. Show "Tema: Auto/Claro/Oscuro".
- `openspec/specs/theme-system/spec.md` — Update requirements to reflect 3 modes, auto default, device preference detection.

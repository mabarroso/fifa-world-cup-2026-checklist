## 1. Project Setup

- [ ] 1.1 Initialize React + TypeScript project with Vite
- [ ] 1.2 Configure TailwindCSS with custom theme tokens
- [ ] 1.3 Install Framer Motion for animations
- [ ] 1.4 Set up Tauri project with Rust backend
- [ ] 1.5 Configure Tauri IPC for storage access
- [ ] 1.6 Verify dev server runs correctly

## 2. Design System Components

- [ ] 2.1 Create global CSS variables (colors, spacing)
- [ ] 2.2 Add Google Fonts (Bebas Neue, Inter, Montserrat)
- [ ] 2.3 Create Button component (primary, secondary variants)
- [ ] 2.4 Create Panel component with glassmorphism
- [ ] 2.5 Create Card component base
- [ ] 2.6 Create Input component with focus states
- [ ] 2.7 Create Progress Ring component
- [ ] 2.8 Create Badge/Tag components

## 3. Application Shell

- [ ] 3.1 Create main App layout with sidebar + content
- [ ] 3.2 Implement navigation sidebar component
- [ ] 3.3 Add router for screen navigation
- [ ] 3.4 Create Header/Topbar component
- [ ] 3.5 Implement keyboard navigation (1-6 shortcuts)
- [ ] 3.6 Add screen transition animations

## 4. Main Menu Screen

- [ ] 4.1 Create MainMenu screen component
- [ ] 4.2 Build sidebar navigation with active states
- [ ] 4.3 Implement hero area with placeholder card
- [ ] 4.4 Create progress widget with completion ring
- [ ] 4.5 Add hover animations on menu items
- [ ] 4.6 Implement live progress updates

## 5. View Collection Screen

- [ ] 5.1 Create ViewCollection screen component
- [ ] 5.2 Build toolbar with filter buttons
- [ ] 5.3 Implement responsive card grid
- [ ] 5.4 Create StickerCard component with all states
- [ ] 5.5 Implement click-to-toggle ownership
- [ ] 5.6 Add quantity badge and controls
- [ ] 5.7 Implement search/filter in grid
- [ ] 5.8 Add card hover animations
- [ ] 5.9 Keyboard navigation in grid

## 6. Search Screen

- [ ] 6.1 Create Search screen component
- [ ] 6.2 Build search input with autocomplete
- [ ] 6.3 Implement instant search results
- [ ] 6.4 Create preview panel with large card
- [ ] 6.5 Add filter chips (Team/Group/Type)
- [ ] 6.6 Implement keyboard navigation
- [ ] 6.7 Add Ctrl+F shortcut to focus

## 7. Statistics Screen

- [ ] 7.1 Create Statistics screen component
- [ ] 7.2 Build giant circular progress ring
- [ ] 7.3 Implement animated number counters
- [ ] 7.4 Create group completion bars
- [ ] 7.5 Add type breakdown chart
- [ ] 7.6 Build top duplicates podium
- [ ] 7.7 Add refresh and export buttons

## 8. Export Screen

- [ ] 8.1 Create Export screen component
- [ ] 8.2 Build export format cards (PDF/CSV/TXT)
- [ ] 8.3 Implement preview panel
- [ ] 8.4 Add export location selector
- [ ] 8.5 Implement export via Tauri commands
- [ ] 8.6 Add progress indicator
- [ ] 8.7 Show success notification
- [ ] 8.8 Add "Open folder" button

## 9. Mark Owned Screen

- [ ] 9.1 Create MarkOwned screen component
- [ ] 9.2 Build giant input with autocomplete
- [ ] 9.3 Implement quantity selector
- [ ] 9.4 Create recently added list
- [ ] 9.5 Add submit with validation
- [ ] 9.6 Implement success animation
- [ ] 9.7 Add undo functionality
- [ ] 9.8 Keyboard shortcuts (+/- for quantity)

## 10. Integration & Polish

- [ ] 10.1 Connect all screens to Tauri storage
- [ ] 10.2 Sync state between screens
- [ ] 10.3 Add loading states and skeletons
- [ ] 10.4 Implement error handling
- [ ] 10.5 Polish animations (Framer Motion)
- [ ] 10.6 Add keyboard shortcuts globally
- [ ] 10.7 Test all screen transitions
- [ ] 10.8 Responsive layout adjustments

## 11. Build & Distribution

- [ ] 11.1 Configure Tauri for production build
- [ ] 11.2 Build Windows .exe
- [ ] 11.3 Build macOS .app
- [ ] 11.4 Build Linux AppImage
- [ ] 11.5 Add app icon and metadata
- [ ] 11.6 Test native file dialogs
- [ ] 11.7 Verify exports save correctly

## 12. Verification

- [ ] 12.1 Run all unit tests (bun test)
- [ ] 12.2 TypeScript typecheck passes
- [ ] 12.3 ESLint passes
- [ ] 12.4 Manual testing all screens
- [ ] 12.5 Test keyboard navigation
- [ ] 12.6 Test mouse interactions
- [ ] 12.7 Test export functionality
- [ ] 12.8 Test on different resolutions
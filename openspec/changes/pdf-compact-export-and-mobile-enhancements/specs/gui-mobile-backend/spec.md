# gui-mobile-backend Specification

## Purpose
Rust backend adaptations for mobile platforms (Android/iOS), including file path resolution, command gating, and capabilities.

## Requirements

### Requirement: Mobile-safe file paths for exports
The system SHALL use `app.path()` to resolve the app document directory on mobile platforms instead of `dirs::download_dir()`.

#### Scenario: App data dir used on Android
- **WHEN** `export_pdf`, `export_csv`, or `export_txt` is invoked on Android
- **THEN** the file is saved to the app's document directory via `app.path().app_data_dir()`

#### Scenario: App data dir used on iOS
- **WHEN** `export_pdf`, `export_csv`, or `export_txt` is invoked on iOS
- **THEN** the file is saved to the app's document directory via `app.path().app_data_dir()`

### Requirement: open_downloads_folder guarded on mobile
The system SHALL disable the `open_downloads_folder` command on mobile platforms where system file explorer is not accessible.

#### Scenario: Command returns error on mobile
- **WHEN** `open_downloads_folder` is invoked on Android or iOS
- **THEN** the command returns an error message indicating the feature is not available on mobile

### Requirement: Mobile-compatible capabilities
The system SHALL use mobile-compatible capability schemas for Android and iOS.

#### Scenario: Android capability schema
- **WHEN** the app runs on Android
- **THEN** the capability uses the `android-schema.json` or a platform-agnostic schema
- **AND** `fs:default` and `dialog:default` permissions are granted

#### Scenario: iOS capability schema
- **WHEN** the app runs on iOS
- **THEN** the capability uses the `ios-schema.json` or a platform-agnostic schema
- **AND** `fs:default` and `dialog:default` permissions are granted

## ADDED Requirements

### Requirement: PDF export command accepts mode parameter
The system SHALL accept a `mode` parameter in the `export_pdf` Tauri command to switch between full and ID-only output.

#### Scenario: Full mode generates 2-column layout
- **WHEN** `export_pdf` is called with `mode: "full"`
- **THEN** the PDF uses 2 columns with `[id] name - team` format
- **AND** the layout matches current behavior

#### Scenario: ID-only mode generates compact layout
- **WHEN** `export_pdf` is called with `mode: "ids-only"`
- **THEN** the PDF uses maximum columns (6+) with only checkbox + ID text

### Requirement: Share plugin registered
The system SHALL include `tauri-plugin-share` as a dependency and register it in the app builder.

#### Scenario: Share plugin is initialized
- **WHEN** the Tauri app starts
- **THEN** `tauri_plugin_share` is initialized via `.plugin(tauri_plugin_share::init())`

#### Scenario: Share permissions in capabilities
- **WHEN** capabilities are loaded
- **THEN** share permissions are included for Android platform

### Requirement: copy_to_documents command for mobile
The system SHALL provide a `copy_to_documents` Tauri command that copies a file to the device's public Documents folder on Android.

#### Scenario: File copied to public Documents
- **WHEN** `copy_to_documents` is called with a valid file path on Android
- **THEN** the file is copied to the device's external public Documents directory
- **AND** the destination path is returned

#### Scenario: copy_to_documents desktop fallback
- **WHEN** `copy_to_documents` is called on desktop (Linux/Windows/macOS)
- **THEN** the command returns the original path without copying
- **AND** a log message indicates the operation is a no-op on desktop

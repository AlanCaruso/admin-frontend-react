# Changelog

## [0.2.5] - 2025-02-18

### Added

- Implemented a dark mode theme with a toggle button.
- Created `ThemeContext` to manage theme state globally.
- Stored user theme preference in `localStorage` for persistence.

### Changed

- Updated styles in `style.css` to support light and dark themes.
- Modified `Nav` component to include the theme toggle button.
- Modified CSS to use `:root` for defining light and dark mode styles.

### Enhanced

- Improved user experience by allowing seamless switching between light and dark modes.
- Optimized CSS for better readability in both themes.
- Optimized performance by using CSS variables instead of applying multiple class overrides.

## [0.2.4] - 2025-02-01

### Changed

- Updated UI design to prepare for light/dark theme toggle.
- Modified header, text, and login component to ensure a uniform light theme.
- Adjusted spacing and fixed minor layout inconsistencies for better visual alignment.
- Improved mobile navigation layout for better responsiveness.

## [0.2.3] - 2025-01-31

### Added

- Implemented a `Category` model in the backend to store and manage item categories.
- Created new API routes to fetch and create categories.

### Changed

- Replaced the category input field in `ItemForm` with a dropdown selector.
- Categories are now dynamically fetched from the backend.
- Items can now be assigned to existing categories when created or updated.

### Enhanced

- Improved user experience by preventing manual category entry and ensuring data consistency.
- Backend now supports category management, laying the foundation for further enhancements.

## [0.2.2] - 2025-01-30

### Added

- Introduced a `category` field in `ItemForm` to allow users to categorize items.
- Updated API interactions in `ItemForm` to support the new `category` field.
- Adjusted the UI to include an input field for category selection.

### Changed

- Renamed the `About` route to `Categories`. This will be used to manage item categories.
- Updated navigation links and routing to reflect the change.

### Enhanced

- Improved item management by allowing categorization, enabling better organization and filtering in future updates.

## [0.2.1] - 2024-10-27

### Changes

Edit Access Control in `ItemList`:

- Implemented conditional rendering in `ItemList` to restrict editing options.
- Added a prop isLoggedIn to control the visibility of edit buttons, ensuring they only appear when the user is authenticated.
- Enhanced user experience by providing clear access boundaries between authenticated and non-authenticated users.

### Enhanced

- Passed isLoggedIn as a prop to `ItemList` for seamless control over editing functionalities.
- Improved routing and component interaction to ensure consistent access control across the application.

## [0.2.0] - 2024-10-25

### Added

- Removed the Home component and made ItemList the default route.
- Navigation menu with dynamic `Login` and `Logout` buttons.
- Public `ItemList` page accessible without login.
- Protected routes for `About` only accessible when logged in.
- Redirect to `ItemList` after login.

### Enhanced

- Nav component shows Login or Logout button based on authentication status.
- Refactored navigation based on the user's login status.
- Added functionality to show Login button when the user is not authenticated.

## [0.1.0] - 2024-06-19

### Added

- First version of the Application.
- Basic login and logout functionality.
- Added Home and About pages.
- Private `ItemList` page accessible with login.

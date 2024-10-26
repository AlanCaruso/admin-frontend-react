# Changelog

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

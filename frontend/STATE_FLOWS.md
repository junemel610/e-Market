# App state flows

This document records the state transitions currently represented in the app. Keep it updated when a screen gains a new request, persistence layer, or navigation transition.

## Account and recovery

| Flow | States and transitions | Persistence / boundary |
| --- | --- | --- |
| Sign in (`Input`, `SignIn`) | Idle → validating → submitting → signed in or recoverable error. Repeated submissions are ignored while submitting. | Both screens store the returned JWT in AsyncStorage before navigating. The API accepts a username or email as `username`. |
| Create account | Editing → validating → submitting → sign-in screen or recoverable error. | The screen only advances when the API returns `success: true`. |
| Password recovery | Email entry → code sent → code entry → verified → password reset. Invalid/expired codes return to code entry; successful reset consumes verification. | Code and verified state live in the backend process memory and expire after ten minutes. A process restart or multi-instance deployment can interrupt recovery; move these records to shared storage before scaling the API. |
| Session/logout | JWT present → authenticated screens; logout confirmation → token removed → sign-in. | Token is stored locally. The app does not currently rehydrate/validate it at startup, and logout behavior is implemented in both Home and Settings. |

## Marketplace and profile

| Flow | Current states | Known boundary |
| --- | --- | --- |
| Add listing | Form draft → permission request on image-pick intent → picker or recoverable error; submit → local draft confirmation. | The screen does not persist an item or submit to an API. Its confirmation says publishing is not connected. |
| Search | Query empty/non-empty → filtered list or empty state; plus action → explanatory modal. | Search uses one hard-coded item. Adding to bag is not connected to `MyBag`, and the UI states this clearly. |
| My Bag | Hard-coded item list → remove confirmation → item removed from component state; empty list → empty message. | Changes are in-memory and reset when the screen remounts. |
| Profile | Loading user data → display or retryable error → edit draft → saving → display on success or editable draft on failure. | Saved items are hard-coded. Profile data is fetched from the API. |
| Settings | Local dark-mode and policy toggles; feedback draft → notice while preserving the draft; logout confirmation. | Preferences and feedback are not persisted. Dark mode changes only this screen, and the UI identifies that scope. |

The home shortcuts now show text labels, and authentication fields expose labels and password-manager content types. These changes improve navigation and screen-reader use without changing the app's routes.

## Transition rules

- Network actions should expose a pending state, prevent duplicate submissions, and leave the user in a recoverable state on failure.
- Navigation after a mutation should happen only after the server confirms success.
- A client confirmation must correspond to a real persisted change; mock data and local-only behavior should be labeled as such until connected to storage.
- Any state that protects an account action must be enforced by the backend, not only by screen navigation.

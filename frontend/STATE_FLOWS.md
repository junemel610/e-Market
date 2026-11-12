# App state flows

This document records the state transitions currently represented in the app. Keep it updated when a screen gains a new request, persistence layer, or navigation transition.

## Account and recovery

| Flow | States and transitions | Persistence / boundary |
| --- | --- | --- |
| Sign in (`Input`, `SignIn`) | Idle → validating → submitting → signed in or recoverable error. Repeated submissions are ignored while submitting. | Local-only mock sign-in; no backend. Navigates to Homepage on success. |
| Create account | Editing → validating → submitting → sign-in screen or recoverable error. | Local-only; advances after a simulated delay without an API call. |
| Password recovery | Email entry → code sent → code entry → verified → password reset. Invalid/expired codes return to code entry; successful reset consumes verification. | Local-only simulation; no email is sent and no codes are stored server-side. |
| Session/logout | Authenticated screens; logout confirmation → sign-in. | No JWT or token is used; logout clears local navigation state only. |

## Marketplace and profile

| Flow | Current states | Known boundary |
| --- | --- | --- |
| Add listing | Form draft → permission request on image-pick intent → picker or recoverable error; submit → local draft confirmation. | The screen does not persist an item or submit to an API. Its confirmation says publishing is not connected. |
| Search | Query empty/non-empty → filtered list or empty state; plus action → explanatory modal. | Search uses one hard-coded item. Adding to bag is not connected to `MyBag`, and the UI states this clearly. |
| My Bag | Hard-coded item list → remove confirmation → item removed from component state; empty list → empty message. | Changes are in-memory and reset when the screen remounts. |
| Profile | Loading user data → display or retryable error → edit draft → saving → display on success or editable draft on failure. | Saved items and profile data are local mock state; no API is called. |
| Settings | Local dark-mode and policy toggles; feedback draft → notice while preserving the draft; logout confirmation. | Preferences and feedback are not persisted. Dark mode changes only this screen, and the UI identifies that scope. |

The home shortcuts now show text labels, and authentication fields expose labels and password-manager content types. These changes improve navigation and screen-reader use without changing the app's routes.

## Transition rules

- Actions should expose a pending state, prevent duplicate submissions, and leave the user in a recoverable state on failure.
- Navigation after a mutation should happen only after the simulated operation completes.
- A client confirmation should correspond to a real local change; mock data and local-only behavior are labeled as such until connected to storage.
- Any state that protects an account action is enforced locally in this build; the backend will own enforcement when reconnected.

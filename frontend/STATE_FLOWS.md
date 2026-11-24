# App state flows

This document records the state transitions currently represented in the app. Keep it updated when a screen gains a new request, persistence layer, or navigation transition.

## Account and recovery

| Flow | States and transitions | Persistence / boundary |
| --- | --- | --- |
| Sign in (`Input`, `SignIn`) | Idle → validating → submitting → token stored and Homepage, or recoverable error. Repeated submissions are ignored while submitting. | Calls the local backend (`EXPO_PUBLIC_BACKEND_URL`, default `http://localhost:8000`) and stores its token in AsyncStorage. |
| Create account | Editing → validating → submitting → sign-in screen or recoverable error. | Calls `POST /create-user`; the account is stored by the backend. |
| Password recovery | Email entry → request sent → code entry → server verification → password update. Invalid/expired codes return an error; reset requires prior verification. | Calls `/send-code`, `/verify-code`, and `/reset-password`. Code verification state is held in backend process memory. |
| Session/startup/logout | App boot → saved token check → Homepage or welcome; logout confirmation → token removed → sign-in. A rejected token returns to welcome; a local API outage does not block a saved session from opening. | JWT is stored locally; profile endpoints use it. Backend returns HTTP 401 for missing, invalid, and expired tokens. |

## Marketplace and profile

| Flow | Current states | Known boundary |
| --- | --- | --- |
| Add listing | Form draft → permission request on image-pick intent → picker or recoverable error; submit → local draft confirmation. | The screen does not persist an item or submit to an API. Its confirmation says publishing is not connected. |
| Search | Query empty/non-empty → filtered catalog or empty state; add action → shared bag state → optional bag navigation. | Catalog is local sample data; bag state is shared in the signed-in navigation session. |
| My Bag | Shared item list → quantity update or remove confirmation → updated totals; empty list → Search. | Bag changes are in-memory and reset when the app session restarts. Checkout is explicitly unavailable. |
| Profile | Loading user data → display or recoverable error → edit draft → saving → display on success or editable draft on failure. | Profile uses authenticated backend endpoints. Saved items remain sample data. |
| Settings | Policy disclosure open/closed; feedback draft → honest not-sent notice; logout confirmation → session token cleared. | Policies are static. Feedback is not connected to an endpoint and remains a local draft. |

The home shortcuts now show text labels, and authentication fields expose labels and password-manager content types. These changes improve navigation and screen-reader use without changing the app's routes.

## Transition rules

- Actions should expose a pending state, prevent duplicate submissions, and leave the user in a recoverable state on failure.
- Navigation after a mutation should happen only after the API/local operation completes.
- A client confirmation should correspond to a real local change; mock data and local-only behavior are labeled as such until connected to storage.
- Backend configuration is local-development-only by default; set `EXPO_PUBLIC_BACKEND_URL` for another development host.

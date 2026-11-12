# e-Market development workspace

The app is split into independent frontend and backend projects. Deployment configuration is not part of this setup.

## Frontend

The Expo / React Native app is in `frontend/`.

```sh
cd frontend
npm install
cp .env.example .env
npm start
```

The default API address is `http://localhost:8000`. For a physical phone, set `EXPO_PUBLIC_BACKEND_URL` in `frontend/.env` to your development computer's LAN address, such as `http://192.168.1.20:8000`.

## Backend

The Express API is in `backend/`.

```sh
cd backend
npm install
cp .env.example .env
npm run dev
```

Fill in local MongoDB and email credentials in `backend/.env`. Keep that file private; `.env.example` is the safe template.

## Prototype

`backend/prototypes/item-list/` preserves the earlier standalone item-list experiment. It is not wired into the Expo app or the active API.

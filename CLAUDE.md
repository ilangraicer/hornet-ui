# hornet-ui — fork of OpenTAKServer-UI for Project Hornet

Web app (React 18 + Mantine + Vite + TS) for the Hornet wildlife tracker. Fork of
[brian7704/OpenTAKServer-UI](https://github.com/brian7704/OpenTAKServer-UI); `origin` = ilangraicer/hornet-ui, `upstream` = brian7704.

**Master plan:** `~/Desktop/hornet/01 Tracker/Firmware & Software/Web App Plan.md`
**Security plan:** `.../Web App Security Plan.md`

## Project decisions

- Web-only product (no EUD support). Backend = hornet-ots (sibling repo) on :8081.
- KEEP pages: login, live map, minimal user admin.
- STRIP pages: video streams, ADS-B/AIS, Mumble, plugin update server, data packages, missions, EUD management, cert enrollment; Meshtastic admin → read-only status.
- ADD pages: animal list/detail (last seen, battery), track history playback (Traccar via hornet-ots proxy), geofence editor + alert log, chat (web ↔ mesh), fleet health.
- Rebrand to Hornet (name/logo/dark map style) once stripping is done.

## Dev (Mac, working as of Jul 11 2026)

```bash
corepack yarn install
corepack yarn dev        # http://localhost:5173 (kill stale node if vite jumps to 5174)
```

- Vite dev proxy (our commit in `vite.config.mjs`) forwards `/api`, `/Marti`, `/login`, `/logout`, `/socket.io` (ws) → http://127.0.0.1:8081. Axios uses relative URLs (`src/axios_config.tsx`), so prod stays same-origin behind one server.
- Start hornet-ots first (see its CLAUDE.md). Dev login: `administrator`/`password`.
- Routes live in `src/routes.tsx`, pages in `src/pages/`, API paths in `src/apiRoutes.tsx` — stripping = removing route + page + navbar entry per feature.

## Conventions

Same as hornet-ots: keep upstream mergeable, one feature per commit, GitHub ops from the Mac (not the Cowork sandbox).

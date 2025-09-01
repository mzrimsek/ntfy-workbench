# Copilot Instructions for ntfy-workbench

## Project Overview

- **ntfy-workbench** is a web app for managing [ntfy.sh](https://ntfy.sh) topics, supporting topic and tag-based views, message counters, and color-coded messages.
- The app is built with TypeScript, React (likely Remix or Vite), and Tailwind CSS. It is designed for both desktop and mobile use, with dark/light mode support.

## Key Architecture & Patterns

- **App Structure:**
  - `app/` contains all main code: entry points, components, containers, enums, models, routes, services, and utils.
  - **Components** (`app/components/`): Pure UI elements (e.g., `Menu.component.tsx`, `TopicMessageList.component.tsx`).
  - **Containers** (`app/containers/`): Compose components and handle data logic (e.g., `MessagesByTag.component.tsx`).
  - **Services** (`app/services/`): API and backend communication (e.g., `ntfy.service.ts` for ntfy.sh integration).
  - **Models** (`app/models/`): TypeScript types/interfaces for config, topics, messages, etc.
  - **Enums** (`app/enums/`): Centralized enums for display state and other constants.
  - **Utils** (`app/utils/`): Utility functions (e.g., color generation, topic helpers).
  - **Routes** (`app/routes/`): Route handlers (Remix-style, e.g., `_index.tsx`).
- **Config:**
  - App configuration is loaded from a `config.json` file (see README for schema). Place this in the `config/` directory for local dev.
- **Styling:**
  - Uses Tailwind CSS (`tailwind.config.ts`, `postcss.config.js`).
  - Color assignment for topics/messages is handled in `app/utils/color.utils.ts`.

## Developer Workflows

- **Local Development:**
  - Install dependencies: `npm install`
  - Start dev server: `npm run dev`
  - Place `config.json` in `config/`.
- **Docker:**
  - See README for Docker and Docker Compose instructions. Mount your config directory to `/app/config`.
- **Build:**
  - Standard Vite/Remix build process (see `vite.config.ts`, `tsconfig.json`).
- **No explicit test setup** is documented; add tests in a `tests/` directory if needed.

## Project Conventions

- **File Naming:**
  - Components and containers use `.component.tsx` suffix.
  - Models use `.models.ts` suffix.
  - Enums use `.enum.ts` suffix.
- **TypeScript:**
  - All code is TypeScript-first; use strong typing for models and service responses.
- **Separation of Concerns:**
  - Keep UI, data logic, and service/API code in their respective folders.
- **Color Logic:**
  - Topic/message color assignment is deterministic and based on topic name (see `color.utils.ts`).

## Integration Points

- **ntfy.sh:**
  - All topic/message data is fetched from or sent to ntfy.sh via `ntfy.service.ts`.
- **Webhooks:**
  - Planned feature: webhook configuration via `webhook.service.ts`.
- **Configurable via `config.json`** for topics, tags, and ntfy.sh API details.

## Examples

- To add a new topic model, update `app/models/topics.models.ts` and reference it in `config.json`.
- To add a new view, create a container in `app/containers/` and compose with components from `app/components/`.

---

For more details, see `README.md` and the `app/` directory structure.

my-it-online.com – Frontend Overview

This project is a Vite + React + TypeScript single‑page application styled with Chakra UI. It demonstrates a lightweight authentication demo, a reusable navigation system, animated visuals, and several feature pages (Home, Login, Register, Contact, FAQ) built with a clean, component‑driven architecture.

How the site is made

1) Application shell
- Vite bootstraps the app and provides fast HMR. The root is rendered in React 18 using StrictMode. React Router manages client‑side routes.
- A global ChakraProvider injects the custom theme, color‑mode configuration, and component style overrides.
- The app uses a shared NavBar component at the top and a slim fixed Footer at the bottom.

2) State and auth demo
- A minimal AuthContext stores an email string in localStorage to simulate login/logout and auth gating. The Home page is public; Login and Register use the context to set or clear the “session”.

3) Theming and styling
- Chakra UI supplies design tokens, layout primitives (Box, Flex, Stack, Grid), and accessible components.
- A custom theme enables color‑mode (light/dark), sets global body colors, and adds a subtle hover/press animation for Button.
- The NavBar adapts to color mode and exposes slots for dynamic actions and right‑side content (profile menu).

4) Animations
- Framer Motion powers entrance transitions and animated decorative background blobs.
- The AnimatedBackground component uses motion values to move and blur abstract shapes behind the UI.

5) Pages
- Home: “World IT News” presented in a professional card grid with images, headlines, and badges. Articles are procedurally generated (unique titles, summaries, sources, dates). Images come from curated Unsplash tech themes with a seeded fallback to avoid duplicates and faces.
- Login / Register: Centered card forms with Chakra inputs, toggled password visibility, toasts, and navigation. Register includes a password strength progress bar based on required criteria.
- Contact: One‑container layout using a responsive grid with a “Send us an email” form and an embedded Google Map pointing to the UK.
- FAQ: A large, filterable FAQ with search, status badges (New, Important, Up to date), tag filtering, results count, and accordion display. Filters include quick‑pick chips; results are capped for compact viewing.

6) Components
- NavBar: Reusable, with hoverable route links, color‑mode toggle, notification icon, and profile dropdown.
- ProfileMenu: Avatar/menu with profile and logout entries.
- PasswordStrength: Chakra Progress‑based meter with informative label.
- Footer: Fixed, translucent bar with © 2025 my-it-online.com.

7) Build and configuration
- TypeScript strict mode, path aliasing via tsconfig, and separate node tsconfig for Vite config typing.
- A project‑oriented .gitignore covers node_modules, build outputs, editor files, caches, and env files.

Resources used

- React 18 (UI), React Router 6 (routing), Vite 5 (dev/build), TypeScript 5 (types).
- Chakra UI (component library) with @emotion for styling and @chakra-ui/icons for icons.
- Framer Motion (animations).
- Google Maps Embed for the Contact page map.
- Unsplash imagery for technology‑themed, face‑free photos (servers, code screens, circuit boards, datacenters). Images are requested via curated URLs and seeded fallbacks to increase visual variety.

Notes

- The authentication is for demonstration only; no network calls are made.
- Content on the Home page is randomly generated each load to create unique, realistic‑feeling headlines and summaries.


# Research website and working portals

## Direction
A graphite research product site: compact Inter typography, large dark working surfaces, restrained colored backplates, angled live UI, generous vertical gaps. The reference is https://clawsgo.ai/. Layout and interactions are independently implemented. Long-form copy is original; this is a visual study, not an affiliated service.

## Stack
React 19 + TypeScript + Vite 6 + Motion + Lucide + self-hosted Inter. The primary delivery target is an independent Node.js 24 server with SQLite, with a Docker configuration. The original Worker adapter remains available for compatibility.

## Architecture
The React application owns the homepage and hash routes for the model directory, eight documents, six gallery studies, eight Skills and catalog administration. Existing legacy deep links forward to the new routes. Long-form document rendering and the tested installation tutorial are bundled as local modules under src/portal/legacy; their surrounding navigation and dark theme are React components.

Catalog storage uses the same API for SQLite self-hosting and hosted D1. Imported RMB prices are stored per group and model with a reference multiplier. A shared calculator handles that mode separately from USD/divisor pricing. The dated import is merged with existing custom records once, and subsequent owner saves preserve changes and deletions. The admin uses revision conflicts plus draft generations so an older save response cannot overwrite later local edits.

## Page composition
1. Header and angled workspace hero
2. Moving research community wordmarks
3. Three product capability cards
4. Model choices
5. Vertical question-to-output timeline
6. Browser, LaTeX, figure revision and GPU workspaces
7. Three deliverable cards
8. Six use-case surfaces
9. Team statement and footer

## Interactions
Scroll-linked workspace perspective, viewport-triggered task sequences, running status trails, working tabs, animation pause, model selection, document preview modal, figure revisions, example selection and responsive navigation.

## Handoff
The project contains the full homepage and integrated model directory, documentation, gallery and administration. The reference-style homepage retains illustrative research demonstrations. Get started opens the workspace preview; Sign in retains the reference destination and can be changed in src/App.tsx. Independent deployments persist the catalog in SQLite; the hosted adapter uses D1. The downloadable project includes source, the price snapshot, a prebuilt client, Docker configuration and deployment instructions. The existing private Site is updated from the same source state.

# Oxalá
Formal digital menu initiative for Restaurante Oxalá (Ovar). The project delivers a consistent, multilingual presentation of the gastronomic offer and wine list, ensuring guests receive accurate, up-to-date information while staff can maintain content centrally. The frontend is built with Next.js (App Router), Tailwind CSS and TypeScript; content is structured and localized in Sanity, covering dishes and wines in PT/EN/FR/ES.

## Repository structure
- `oxala-site/`: Next.js 16 / React 19 application rendering the main menu (`/` and `/ementa`) and wine list (`/vinhos`), sourcing data from Sanity.
- `sanity/`: Sanity Studio with internationalization to manage categories, subcategories, dishes and wines.

## Run the site (Next.js)
1. `cd oxala-site`
2. `npm install`
3. `npm run dev` and open http://localhost:3000
4. Production build: `npm run build` then `npm start`
5. Quality checks: `npm run lint`

## Run the Sanity Studio
1. `cd sanity`
2. `npm install`
3. `npm run dev` and open http://localhost:3333 to manage content
4. Optional Studio deploy: `npm run deploy`

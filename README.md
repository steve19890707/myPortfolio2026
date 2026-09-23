# The Neon Room

A pixel-art, true-isometric interactive resume. Built with React, TypeScript, Vite, PixiJS, @pixi/react, NES.css, Zustand, i18next, Framer Motion and Howler.

## Local development

Requires Node 22.12+ and npm.

```sh
npm install
npm run dev
npm run build
npm run preview
```

The server prints its available local URL. If the default port is occupied, Vite selects another one.

## Replace content

| Content | Location |
| --- | --- |
| Names, biography, skills, interests, work history, projects, UI copy | `src/content/en.ts` |
| Avatar and PDF paths, contact destinations, project links, audio paths | `src/content/config.ts` |
| Furniture hit areas and panel mapping | `src/content/config.ts` (`hotspots`) |
| Procedural room geometry, furniture and pixel persona | `src/scene/art.ts` |
| Window parallax and gentle four-second neon cycle | `src/scene/Room.tsx` |
| Language resources | `src/i18n.ts` |
| Interface colors and responsive layout | `src/styles.css` |
| Replaceable audio | `public/audio/` |

All five languages intentionally use English content until the source copy is approved. Language selection is saved locally. Audio always starts muted.

Scene graphics and the avatar are drawn locally in code. Fonts are bundled locally. No image CDN or external image resources are required. Furniture uses separate raster layers with a shared pixel density. The camera stays fixed; only the city in the northwest window shifts. The animation loop is capped at 30 FPS and paused in hidden tabs.

Empty project/contact URLs are displayed as pending rather than linked to fictional destinations. Set `assets.resumePdf` to a file under `public/` once the complete, professionally formatted PDF is ready. Set `assets.avatar` to a file under `public/` to override the procedural fictional cyberpunk persona.

## Audio

```sh
npm run audio:generate
```

The initial sounds are deterministic synthesized placeholders, not AI-generated music. Regeneration overwrites the four placeholder WAV files. The BGM is a calm, low synth texture with a seamless 64-second loop. Replace the files or update the paths in `config.ts` after listening. Assets load only after the sound control is activated.

Suggested future music-generation prompt: "A quiet mysterious cyberpunk personal studio at night. Slow ambient synth pads, low warm bass, subtle luminous electronic notes, no vocals, no sharp percussion, no dramatic build-up. Seamless 64-second loop. Understated and suitable for reading."

## GitHub Pages

The build uses relative asset paths and no client-side routes, so a repository subpath works without changing the app. After creating a GitHub repository and configuring its `origin` remote:

```sh
npm run deploy
```

`predeploy` builds the site, and `gh-pages` publishes `dist`. In GitHub Pages settings, use the `gh-pages` branch root. Repository creation, pushing, and public deployment have not been performed automatically.

## Verification

```sh
npx playwright install chromium
npm test
```

Tests cover furniture and quick-access panels, keyboard focus, all language choices, narrow layouts, reduced motion, actual canvas pixels, animation, silent initial audio and audio playback.

## Rendering references

- https://react.pixijs.io/components/application/
- https://react.pixijs.io/hooks/useApplication/
- https://pixijs.com/8.x/guides/components/ticker

Optional GSAP and @pixi/layout remain deferred: the current animation and scene layout do not require them.

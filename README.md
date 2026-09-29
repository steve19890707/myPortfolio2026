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



## GitHub Pages

The build uses relative asset paths and no client-side routes, so a repository subpath works without changing the app.

GitHub Pages is deployed by GitHub Actions from `main`. Push changes to `main`, and `.github/workflows/deploy-pages.yml` builds the project and publishes the generated `dist` artifact through the official Pages deployment action.

In GitHub Pages settings, set the source to `GitHub Actions`.

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

Audio includes three locally synthesized, replaceable UI effects and a new original game-style loop at `public/audio/game-loop.wav`. Playback is disabled until the sound control is enabled. Run `npm run audio:generate` to regenerate UI effects, or `npm run audio:music` for the music. The music is 51.43 seconds at 112 BPM, based on an estimated rhythmic pulse from the supplied recording, without sampling its audio or transcribing its melody. Hidden tabs pause playback. Replace the music through `assets.audio.bgm` in `src/content/config.ts`.

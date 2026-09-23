# H5 Web Resume Planning

## Goal

Build an H5 resume website with React, PixiJS, and NES.css.

The site should feel like a pixel-art cyberpunk game interface, while still working as a clear, readable resume. Visual richness is welcome, but key information must remain easy to find.

Current phase: first prototype implementation authorized. The project root is `/Users/steveliu/Documents/ChatGPT/myPortfolio2026`.

## Core Direction

- Format: interactive H5 web resume
- Tech stack: React + PixiJS + NES.css
- Default language: English
- Supported languages: English, Traditional Chinese, Simplified Chinese, Japanese, Korean
- Devices: mobile and desktop
- Style: pixel art, cyberpunk, retro game UI
- Priority: clear resume information over visual effects

## User Experience

The visitor enters a pixel-art scene instead of a standard resume page.

The scene can feel like a small RPG, cyberpunk room, city block, or personal base. Interactive objects open resume sections.

Main sections:

- Profile
- Skills
- Experience
- Projects
- Contact

Important rule: users should not need to solve the scene to read the resume. Main information must always be directly reachable.

## Main Scene Concept

Primary direction: a true-isometric 2.5D pixel-art room with a calm cyberpunk atmosphere.

Use `merigold-finalroom400.jpg` as the primary base reference for the 2.5D room feeling and overall style direction. Treat it as a composition and mood reference only. Do not copy its exact objects, symbols, signatures, or unique marks.

Scene elements:

- True-isometric 2.5D room perspective
- Corner-room composition with two visible walls and an open front floor edge
- Thick pixel outlines, readable object silhouettes, and clear furniture layers
- Neon trim lights around walls, furniture, screens, and selected props
- Dark empty outer background to make the room feel like a contained interactive diorama
- A large window showing the outside city
- The window should be placed on the northwest wall
- Outside view: high-rise buildings, neon signs, distant lights, subtle city motion
- Neon lights should continuously flicker with gentle fade-in/fade-out motion
- Click sound effects and a looping BGM field should be prepared, with audio disabled until user activation
- Furniture and props: TV, sofa, desk, side lamp, plants, shelves, screens, and personal items
- Large furniture objects act as main interaction points
- Clicking a main object opens a dialog/panel with resume information

Initial object-to-content mapping:

- TV: avatar image, name, and self-introduction
- Desk: development skills such as React, Cocos, Golang, CSP, and other tools, presented as pixel-style tool icons
- Sofa: personal interests
- Large wall poster: work experience
- Futuristic jukebox: portfolio links to real web projects

Future furniture and props can be added later as the content structure grows.

Initial furniture placement:

- TV: against the northeast wall
- Large wall poster: against the northeast wall, visually inspired by cyberpunk anime/CG mood such as Ghost in the Shell, without copying protected artwork
- Sofa: against the southwest side
- Desk: near the northwest wall, aligned close to the outside window
- Side lamp, plants, and side table: place freely in room corners or secondary empty areas to balance the composition
- Rug: centered on the floor as the main visual anchor

Window/parallax decision:

- Use parallax only for the outside city view inside the window.
- Keep the room itself stable. The true-isometric scene should not move too much because it may make furniture interactions harder to recognize.
- Use 2 to 3 lightweight parallax layers only inside the window view.
- Example layers: distant skyline, mid-rise neon signs, foreground window glow/reflection.
- On mobile, parallax should be reduced or disabled if it hurts performance or readability.

Mood:

- Mysterious
- Quiet
- Calm
- Slightly futuristic
- Not overly noisy or chaotic

The scene should feel alive through subtle animation, not constant distraction.

## Page Structure

### Opening Screen

- Name, target role, short tagline
- NES-style Start button
- Language switcher
- Optional pixel character idle animation
- Optional audio toggle, off by default

### Main Scene

- PixiJS canvas for the visual scene
- Interactive objects for resume sections
- Desktop can support richer exploration
- Mobile must support touch-first navigation

### Resume Panels

- NES.css-inspired dialog/window style
- Clear titles and readable text
- Support different text lengths across languages
- Avoid tiny text boxes for long content
- Dialogs should feel like pixel-game pause/menu windows with cyberpunk neon styling
- Use the existing cyberpunk palette, not the exact colors from the dialog reference image

### Projects

- Display each project as a mission card, data chip, game cartridge, or city/room object
- Include project name, role, tech stack, outcome, and links
- Support Demo, GitHub, or Case Study buttons

### Contact

- Clear contact CTA
- Can be styled as a terminal, communication device, NPC dialog, or exit point

### Downloadable PDF Resume

- Include a downloadable PDF resume.
- The downloaded PDF should be a complete, formal, traditional resume document.
- PDF layout should prioritize professional readability over game styling.
- The web resume can stay interactive and cyberpunk-themed, but the PDF should feel suitable for recruiters, HR systems, and formal applications.
- PDF content can be prepared later after the resume information is confirmed.

## Visual References

Desired scene style:

- Primary base reference: `merigold-finalroom400.jpg`
- Pixel-art cyberpunk city at night
- Neon signs, tall buildings, flying vehicles, purple-blue sky
- Dense street facade with signs, windows, cables, devices, and reflections
- Isometric cyberpunk room or personal studio
- Side-view room with city window, bed, shelves, instruments, devices, and personal objects

Base-reference takeaways:

- True-isometric room with two walls and open front edge
- Cozy cyberpunk personal studio rather than a loud arcade scene
- Large readable furniture shapes
- Strong neon edge lighting
- Dark purple background and walls
- Cyan, magenta, yellow, and green accents
- Decorative objects can create richness, but main interactive furniture must stay visually obvious
- The scene should feel like an interactive diorama

Pixel-style consistency rules:

- All scene assets should share a consistent pixel-art resolution, outline weight, lighting direction, and color treatment.
- Avoid mixing assets that look like different games, different pixel densities, or different rendering styles.
- Furniture, UI panels, icons, character/avatar, city view, and decorative props should feel like they belong to the same world.
- If placeholder assets are used early, replace or restyle them before final delivery so the scene does not feel visually mismatched.

Visual language:

- Base colors: deep purple, blue-black, dark navy
- Accent colors: cyan, magenta, neon green, yellow, small red highlights
- Lighting: screen glow, neon signs, rim light, window light
- Mood: cyberpunk, cozy tech room, retro game interface
- Layout: rich background, but clean readable information panels

Do not directly copy logos, text, characters, or unique marks from reference images.

## Panel / Dialog Visual Style

Use `d256a83c-6e2b-407d-ba5e-b04e64bafeb2.webp` as a reference for information popup structure and pixel UI feeling.

Apply the structure, not the exact color palette.

Panel direction:

- Pixel-game menu / pause-window feeling
- Dark interior surface for readability
- Thick pixel border with neon glow
- Cyan border as the main readable edge
- Magenta, yellow, and neon green accents based on the existing palette
- Rounded-corner illusion can be built from stepped pixel corners, not soft modern border radius
- Top-right close button
- Clear panel title
- Strong selected/active button state
- Secondary and disabled button states
- Slight glow behind active controls
- Optional small decorative circuit lines, corner cuts, or pixel notches

Panel behavior:

- Clicking a large furniture object opens the related panel
- Panel should animate in with a short cyberpunk UI transition
- Background scene may dim slightly while a panel is open
- Text must stay readable and not blend into neon effects
- Close action must be obvious on desktop and mobile
- Mobile panels can become near-fullscreen if needed for readability

Do not copy the skull icon, exact text, watermark, or unique layout details from the reference image.

## Information Clarity

- First screen must quickly show who this is, what role they target, and where to start
- Section names should stay direct: Profile, Skills, Experience, Projects, Contact
- Important links must clearly look clickable
- Visual effects must not cover text
- Mobile layout should be simpler than desktop
- Main resume content should not exist only inside canvas

## Collaboration Rule

- Do not explain problems, actions, or implementation details by default.
- Only explain when an error occurs, a decision is required, or the user asks.

## Responsive Design

- Desktop can use a wider city scene or isometric room
- Mobile should still allow direct tapping on room objects
- Add a quick-access area for main sections, but do not rely on it as the only navigation path
- All features must work with touch
- Click targets must be large enough on mobile
- Text and panels must not overflow after translation

## Internationalization

- Default language: English
- First supported languages:
  - English
  - Traditional Chinese
  - Simplified Chinese
  - Japanese
  - Korean
- All visible content should be translatable
- Language switcher should be easy to find but not distract from the main scene
- Layout must account for different text lengths between languages
- Content strategy: write and validate the English source content first.
- Before final translation, non-English languages can temporarily reuse the same English placeholder/source content.
- After final content is confirmed, translate all supported languages in one pass.

## Target Role Tags

Important role tags for positioning:

- Frontend Web Engineer
- Web Engineer
- H5 Web Game Developer
- Full-Stack Engineer
- Senior Engineer

Use these tags to guide technical emphasis, profile copy, skills ordering, and project framing.

Skill icons can remain adjustable. The final list and ordering of technical icons will be refined later based on role positioning.

## Placeholder Content

Use the following fake copy as the default content until real resume data is ready. Keep the structure stable so the UI can be built and adjusted before final content replacement.

## Replaceable Content Checklist

These items are intentionally temporary or expected to change later. Keep them easy to update from clear data files, translation files, asset paths, or config fields.

### Text Content

- Opening screen name, target role, tagline, button labels, and hints
- Profile name, role, avatar, intro, and CTA
- Skills groups and skill icon labels
- Interests list
- Experience roles, dates, companies, and responsibilities
- Project names, descriptions, reserved links, and button states
- Contact email, GitHub, LinkedIn, and CTA
- Downloadable PDF resume content and file path
- System messages, loading text, empty state text, hover hints, and mobile hints
- All translations for English, Traditional Chinese, Simplified Chinese, Japanese, and Korean

### Visual Assets

- Profile avatar placeholder pixel user icon
- TV/profile screen graphics
- Skill tool icons on the desk
- Wall poster image, inspired by cyberpunk anime/CG mood without copying protected artwork
- Project/jukebox item artwork
- Furniture sprites and decorative props
- Window city parallax layers
- Neon light sprites or glow overlays
- Panel corner/circuit decorative elements

### Audio Assets

- Click sound effect
- Panel open sound
- Panel close sound
- Looping BGM
- Optional room ambience
- Initial audio can be generated directly from the current audio direction prompts
- Audio files are replaceable assets and can be regenerated later if the mood changes

### Audio Asset Rules

- Initial audio generation can use the current prompt direction directly.
- If the generated result does not match the desired mood, regenerate and replace the file later.
- If direct audio generation is unavailable in the working environment, prepare prompts and file specs for external audio tools.
- Keep all sounds subtle, calm, and compatible with the quiet cyberpunk room mood.
- Audio must not feel loud, comedic, arcade-chaotic, or distracting.
- Audio playback remains off by default until the user enables sound.

Initial audio files:

- `click-ui-soft.wav`: short cyberpunk UI beep, around 80-150ms
- `panel-open.wav`: soft electronic opening sound, around 300-600ms
- `panel-close.wav`: short electronic closing sound, around 200-400ms
- `room-bgm-loop.mp3` or `room-bgm-loop.ogg`: quiet mysterious synth loop, around 45-90 seconds

BGM direction:

- Calm
- Mysterious
- Low synth texture
- Slow tempo
- Seamless loop
- Suitable for a neon cyberpunk personal studio
- Final BGM direction should be adjusted after listening to the first generated version

### Configurable Layout

- Furniture hotspot positions and hit areas
- Mobile tap target sizes
- Optional mobile gesture/swipe behavior
- Quick-access helper visibility and placement
- Panel size rules for desktop, tablet, and mobile
- Neon flicker timing and intensity
- Window parallax speed and mobile fallback
- Portfolio project link positions and presentation style
- Final skill icon list and ordering

No conflict found with the current plan. The only rule to preserve is that replacements must keep the same pixel-art style, color system, and readable information structure.

### Opening Screen

- Name: Alex Lin
- Target role: Creative Frontend Engineer
- Tagline: I build interactive web experiences with code, motion, and a little neon.
- Primary button: Enter Room
- Secondary hint: Tap a glowing object to explore the resume.
- Audio toggle off: Sound Off
- Audio toggle on: Sound On
- Language label: Language

### Main Scene Hints

- TV hint: Profile Signal
- Desk hint: Skill Console
- Sofa hint: Personal Mode
- Wall poster hint: Career Archive
- Jukebox hint: Project Playlist
- Window hint: City View
- Quick access label: Quick Access
- Close button: Close
- Back button: Back
- Next button: Next
- Loading text: Booting room...
- Empty state: Data not available yet.

### TV / Profile Panel

- Title: Profile
- Name: Alex Lin
- Role: Creative Frontend Engineer
- Avatar: use a generated pixel-style fictional cyberpunk persona as the placeholder profile image
- Avatar can be user-inspired later, but the final style should still remain fictional cyberpunk persona
- Avatar asset is temporary and must be easy to replace later from a clearly named file/path
- Intro:
  - I am a web developer focused on building clear, responsive, and interactive digital experiences.
  - I enjoy combining frontend engineering, animation, and product thinking to turn ideas into usable interfaces.
  - This room is a playable version of my resume. Each object contains a different part of my story.
- CTA: View Skills

### Desk / Skills Panel

- Title: Development Skills
- Intro: Tools and technologies I use to build web products, interactive scenes, and backend services.
- Skill groups:
  - Frontend: React, TypeScript, Vite, Styled Components, Responsive UI
  - Interactive: PixiJS, Cocos, Canvas, Animation, Game UI
  - Backend: Golang, Gin, REST API, Redis, PostgreSQL
  - Workflow: Git, GitHub, Deployment, Debugging, Performance Tuning
  - Other: CSP, i18n, Accessibility, API Integration
- CTA: View Projects

### Sofa / Interests Panel

- Title: Personal Interests
- Intro: A quiet corner for the things that shape how I think and create.
- Items:
  - Pixel art and retro game interfaces
  - Cyberpunk visual worlds
  - Interactive storytelling
  - Web experiments
  - Learning backend systems
  - Calm, focused workspace design
- CTA: View Experience

### Wall Poster / Experience Panel

- Title: Work Experience
- Intro: Places, projects, and roles that helped shape my development process.
- Placeholder roles:
  - Frontend Developer, Neon Studio, 2024 - Present
  - Web Developer, Pixel Lab, 2022 - 2024
  - Junior Developer, Interface Works, 2021 - 2022
- Placeholder responsibilities:
  - Built responsive user interfaces for web products
  - Integrated APIs and managed frontend state
  - Improved UI clarity, performance, and interaction quality
  - Collaborated with designers and backend engineers
- CTA: View Projects

### Futuristic Jukebox / Projects Panel

- Title: Project Playlist
- Intro: Selected web projects and experiments.
- Real project links are reserved fields and will be added later with exact positions and presentation details.
- Placeholder projects:
  - Neon Dashboard: A responsive analytics dashboard with animated panels
  - Pixel Portfolio: A retro-style personal website with interactive scenes
  - API Control Room: A backend-connected admin interface
  - Game UI Prototype: A Cocos/Pixi-style interface exploration
- Project buttons:
  - Demo
  - GitHub
  - Case Study
- CTA: Contact Me

### Contact Panel

- Title: Contact
- Intro: Open a channel if you want to build something together.
- Email: alex@example.com
- GitHub: github.com/alex-placeholder
- LinkedIn: linkedin.com/in/alex-placeholder
- CTA: Send Message

### System Messages

- Panel open: Signal connected.
- Panel close: Signal closed.
- Audio enable prompt: Enable sound for room ambience and UI feedback?
- Audio enabled: Audio channel active.
- Audio disabled: Audio muted.
- Language changed: Language updated.
- Mobile tap hint: Tap glowing objects or use Quick Access.
- Desktop hover hint: Hover over glowing furniture to inspect.

## Tech Notes

## Recommended Tools

### Core

- React: page structure, resume panels, UI state, and content rendering
- Vite: frontend build tool
- TypeScript: safer component, data, and interaction contracts
- PixiJS: main 2D canvas scene, pixel-art environment, animation, and interactive objects
- @pixi/react: React integration for PixiJS, allowing Pixi scenes to be managed with JSX
- NES.css: retro UI base for buttons, dialogs, panels, and form-like elements

### Local Development

- Vite dev server: local preview and development server
- npm scripts:
  - `dev`: run local server
  - `build`: production build
  - `preview`: local production preview
- Browser devtools: inspect canvas performance, layout, assets, and audio loading

### State and Content

- zustand: lightweight global state for current language, active panel, selected scene object, start state, and audio setting
- i18next: internationalization engine
- react-i18next: React integration for translated text and language switching

### Motion and Feedback

- framer-motion: React DOM animations for dialogs, panels, transitions, hover states, and overlays
- howler: optional audio layer for click sounds, ambient loops, UI beeps, and user-triggered background audio

### Visual Effects

- GSAP: optional timeline-based animation helper for neon flicker sequences, camera-like transitions, or coordinated scene motion

### Optional Pixi Scene Layout

- @pixi/layout: optional layout helper if the Pixi canvas needs complex responsive HUD or internal UI layout

### Deployment

- gh-pages: npm package for publishing Vite `dist` output to GitHub Pages
- GitHub Pages: static hosting target
- GitHub Actions: not needed for the first deployment path

## Architecture Direction

Use PixiJS for the visual scene and interactive environment. Use React DOM with NES.css for readable resume content.

This keeps the game-like feeling while preserving accessibility, responsive behavior, SEO, and text readability.

## Asset Strategy

First prototype should not rely on external image assets.

Use code-generated pixel-style scene assets for the initial build:

- PixiJS generated geometry and textures for room layers
- Pixel-style furniture blocks
- Generated neon strips and glow overlays
- Generated window city layers
- Generated simple skill icons if needed
- Generated placeholder pixel user icon for the profile avatar

CSS and React DOM should handle readable UI, panels, text, layout, and responsive behavior.

External or hand-drawn pixel assets can be added later only as replaceable upgrades.

Benefits:

- No external image dependency for the first prototype
- Lower copyright risk
- More consistent pixel-art style
- Easier color control
- Faster iteration for layout and interaction
- Better fit with the replaceable-asset workflow

Tradeoffs:

- Code-generated pixel art will be less detailed than hand-drawn art
- Furniture must rely on clear silhouettes, block shapes, outlines, and neon edges
- Final polish may still benefit from selected custom pixel assets later

## Feasibility Walkthrough

The current direction is feasible for a first prototype.

Recommended implementation flow:

1. Build a static React layout with placeholder content first.
2. Add the PixiJS isometric room scene as a visual layer.
3. Add clickable hotspots for the TV, desk, sofa, wall poster, and jukebox.
4. Open React DOM panels when hotspots are clicked.
5. Add language switching after the panel structure is stable.
6. Add gentle neon flicker and window-only parallax.
7. Add click sound and looping BGM fields after the user-controlled audio toggle is implemented.

Core feasibility:

- True-isometric 2.5D room: feasible with PixiJS sprites or layered pixel-art images.
- Clickable furniture: feasible with transparent hotspot polygons or invisible Pixi hit areas.
- Dialog panels: feasible with React DOM, NES.css, custom cyberpunk CSS, and framer-motion.
- Neon flicker: feasible with CSS, Pixi ticker, or GSAP.
- Window-only parallax: feasible as 2 to 3 layers clipped inside the window area.
- Multi-language text: feasible with i18next and stable content keys.
- Mobile direct tapping: feasible, but needs larger furniture hit areas. Quick access remains a helper only.

Current stack is enough. No required tool is missing for the first version.

Local server feasibility:

- Vite is enough for local development.
- Expected local flow: `npm run dev`, then preview in browser.
- Expected production check: `npm run build` and `npm run preview`.
- PixiJS, React DOM panels, i18n, audio assets, and static sprites can all run through Vite.

GitHub Pages feasibility:

- Feasible as a static site if all content is frontend-only.
- Vite needs a correct `base` path when deployed under a GitHub Pages repository subpath.
- Built assets should be referenced through Vite-managed imports or public paths.
- Audio, image, and sprite assets can be deployed with the static build.
- Browser autoplay restrictions are fine because audio is user-enabled.
- If using React Router later, prefer hash routing or configure static fallback carefully.
- No backend is currently required, so GitHub Pages is suitable.

Optional additions:

- GSAP if animation timing becomes more complex.
- @pixi/layout only if Pixi needs internal UI/HUD layout.
- A small asset pipeline later if custom spritesheets become necessary.
- gh-pages will be used for manual GitHub Pages deployment from npm scripts.

## Concrete Instructions Needed

Before development starts, the following should be made more concrete:

### Scene Layout

- Use adaptive proportional scaling across desktop, tablet, and mobile.
- Mobile can include gesture-based swiping to reveal or inspect other parts of the scene if the full room becomes too dense.
- Window wall: northwest wall.
- Furniture positions:
  - TV on the northeast wall.
  - Large poster on the northeast wall.
  - Sofa on the southwest side.
  - Desk near the northwest wall, close to the outside window.
  - Side lamp, plants, and side table can be distributed freely in corners or secondary empty areas.
  - Rug in the room center.
- Build the room from multiple sprite layers, not one flat background image.
- Main room/furniture layers should cover about 60% to 80% of visual importance.
- Secondary decoration, ambient effects, and background layers should stay lighter in visual weight.

Recommended first prototype: use layered placeholder shapes/sprites with separate clickable hotspot overlays.

### Interaction Hotspots

- Each main furniture object needs a stable `id`, label, panel target, and hit area.
- Hotspots should glow or pulse gently on hover/focus.
- Desktop should support hover hints.
- Mobile interaction should primarily work by tapping the target furniture directly.
- A quick-access section can exist, but furniture tapping remains the expected interaction.

Initial hotspot ids:

- `tv-profile`
- `desk-skills`
- `sofa-interests`
- `poster-experience`
- `jukebox-projects`

### Panel Content

- Each panel needs a fixed content schema before real content is added.
- Text should live in translation files, not directly inside components.
- Panels should support scrolling if translated text becomes longer.

Initial panel ids:

- `profile`
- `skills`
- `interests`
- `experience`
- `projects`
- `contact`

### Animation Rules

- Neon flicker is continuous but slow and gentle.
- Flicker should use fade-in/fade-out motion, not strobe-like flashes.
- Room camera should stay static.
- Only window city layers can use parallax.
- Panel open/close animations should be short and readable.

### Audio Rules

- Audio is off by default.
- Audio starts only after user action.
- Prepare fields for click sound effects.
- Prepare a field for looping BGM.
- BGM style can be decided later.
- Separate audio channels are useful later: BGM, ambience, UI click, panel open, panel close.

### Mobile Rules

- Mobile should still allow direct furniture tapping.
- Add a quick-access section only as a helper, not as the main interaction.
- Optional gesture swiping can reveal or inspect other parts of the room if needed.
- Panels may become near-fullscreen for readability.
- If parallax hurts performance, reduce or disable it on mobile.

## Gap Check

Current recommended stack is enough for the first prototype.

Likely additions:

- GSAP may be useful if neon flicker, room light pulses, and panel transitions need reusable timelines.
- A pixel-art asset workflow is needed later: custom sprites, sprite sheets, or generated placeholder assets.
- A sound plan is needed for BGM, click sounds, and optional ambience. Audio must stay off until the user enables it.

Resolved decisions:

- Use true-isometric 2.5D as the main scene perspective.
- Use the first furniture mapping: TV, desk, sofa, wall poster, and futuristic jukebox.
- Keep audio disabled by default and require user activation.
- Use continuous gentle neon flicker with fade-in/fade-out motion.
- Mobile should primarily support direct furniture tapping, with quick access only as a helper.
- Use window-only parallax for the outside city view. Keep the isometric room static.
- Use adaptive proportional scaling across desktop, tablet, and mobile.
- Place the window on the northwest wall.
- Use layered sprites for the scene, with the main room/furniture taking 60% to 80% of visual importance.
- Prepare audio fields for click effects and looping BGM, while keeping playback user-activated.
- Write English source content first, then translate all supported languages after final content confirmation.
- Positioning should prioritize frontend web engineering, web engineering, H5 web game development, full-stack engineering, and senior engineering.
- Keep project links as reserved fields for later exact placement and presentation.
- Use `gh-pages` npm script for GitHub Pages deployment.
- Avatar direction should always be fictional cyberpunk persona, whether or not it becomes user-inspired later.
- BGM mood is not a blocking decision. Generate an initial version from the current direction, then adjust after listening.

Implementation risks:

- Too many animated light sources may affect mobile performance.
- Flickering effects must be subtle to avoid visual discomfort.
- Important content should appear in React DOM panels, not only inside the Pixi canvas.
- Clickable objects need visible hover/focus/active states.
- Mobile users need clear tappable furniture areas. Quick access can help, but should not replace direct tapping.
- GitHub Pages subpath deployment requires setting Vite `base` correctly.
- Large image, audio, or sprite assets may slow first load and need compression.
- If routing is added later, direct URL refresh on GitHub Pages needs a routing strategy.

### React

- Page structure
- UI state
- Resume data
- Language state
- Reusable content components

### PixiJS

- Main canvas scene
- Character/object animation
- Scene interaction
- Visual effects
- Performance-conscious mobile rendering

### NES.css

- Buttons
- Dialogs
- Panels
- Lists
- Retro UI elements

NES.css should support the retro feel, but custom styling is still needed for cyberpunk layout and responsive behavior.

## MVP Scope

First version:

- Opening screen
- Main scene
- Profile panel
- Skills panel
- Experience panel
- Projects panel
- Contact panel
- Downloadable PDF resume link/field
- Language switcher
- Mobile touch navigation
- Click sound fields
- Looping BGM field
- Local Vite dev server
- Production build and preview script
- GitHub Pages deployment-ready static build

Avoid in the first version:

- Complex combat/game system
- Full quest system
- Too many scene transitions
- Auto-playing music
- Heavy custom asset pipeline
- Backend-only features that cannot run on GitHub Pages

## Open Questions

No blocking open questions for the first prototype.

## Next Step

Build and verify the first interactive prototype in the project root. Keep all placeholder content and assets replaceable. GitHub publishing will follow once the repository destination is provided.

## First Prototype Status

- Project files and dependencies now live in `/Users/steveliu/Documents/ChatGPT/myPortfolio2026`.
- Implemented the layered procedural isometric room, five furniture hotspots, six content panels, quick access, five language options, a fictional pixel persona, window-only parallax, and gentle neon animation.
- English placeholders are intentionally shared across all language choices.
- Added locally synthesized, replaceable click/open/close sounds and a 64-second BGM placeholder. These are not AI music service outputs; final direction remains subject to listening.
- Audio starts muted; hidden tabs pause BGM and rendering. Reduced motion stops scene animation updates.
- Formal PDF and real contact/project destinations remain reserved fields until supplied.
- Production build and seven browser tests passed, including 320px/390px mobile, tablet, desktop, dialog focus, language persistence, audio playback, and animated/static canvas pixels.
- GitHub Pages deployment scripts and relative asset paths are prepared. No GitHub repository, commit, or public deployment has been created.
- Content replacement instructions are in `README.md`, with data in `src/content/en.ts` and asset/link/hotspot configuration in `src/content/config.ts`.

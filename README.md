## About

This is a web-app that generates experiences similar to the social media trend of "information + Minecraft parkour video on the back".

The goal is to have something in the background to keep you focused on the screen while listening to the information and accompanying it by the subtitles.

## See it live

http://WixeI.github.io/focus-parkour

## Demonstration

![demonstration-gif](./demonstration.gif)

## This project used:

### On Components

- Props extending HTML tags and with component name as prefix
- Ref forwarding
- Arias: busy & disabled,
- Props order: "rest & ref", "arias", "props"
- ConditionalStatements & Returns section
- Maps

### On Styles and Theming

- Tailwind Css
- Started using Stitches but changed across the project

### As libs

- TypeScript
- React Icons
- Tailwind Css
- Framer Motion
- Immer (and use-immer)
- Typescript
- Jest, React Testing Library, User Event and MSW (Mock Service Worker)
- Prettier and ESLint (ESLint Plugin Jest included)
- React Hook Form
- React Player

## Folder Structure inside Global and Pages:

### Rules

- Folders must have category names or descriptive names
- Use index files for entry points of folders
- When next to index file, other files must have category names, otherwise they can be descriptive names
- Aggregator files gather contents to export as one

### Categories:

- components: holds React components
- constants: holds data that does not change
- contexts: holds React contexts
- hooks: holds React hooks
- resources: holds media files (images, vectors, videos, subtitles, music, sfx, 3d, rigs)
- styles: holds stylization files
- tests: holds test files
- types: holds type files
- utilities: holds pure functions
- animations: holds animation-related files
- services: holds request-related files
- translations: holds translation-related files

Ps: Group in folders based on functionality first, and then on categories inside these functionalities

## Reference Links

- https://www.assemblyai.com/blog/react-text-to-speech-simplified/
- https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/voice
- https://www.npmjs.com/package/react-player#config-prop
- https://developers.google.com/youtube/player_parameters?playerVersion=HTML5
- https://react-hook-form.com/get-started/
- https://www.radix-ui.com/docs/primitives/components/slider#slider
- https://www.framer.com/docs/introduction/

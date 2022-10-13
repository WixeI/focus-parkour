# About

# See it live

# Screenshots

# To-Do

- To remove youtube branding:
  - Create default background to stay in place when video thumbnail would appear (React Player has something for this)
  - Create loading background to stay in place when video loads (even if stays a little more than necessary)

# Reference Links

- https://www.assemblyai.com/blog/react-text-to-speech-simplified/
- https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/voice
- https://www.npmjs.com/package/react-player#config-prop
- https://developers.google.com/youtube/player_parameters?playerVersion=HTML5
- https://react-hook-form.com/get-started/
- https://www.radix-ui.com/docs/primitives/components/slider#slider
- https://www.framer.com/docs/introduction/

# This project used:

## In General

- Folder organization in which content is in a descriptive folder with index file and optional files
  - Types are kept in types.ts
  - Styles are kept in styles.ts
  - Tests are kept in tests.ts
  - Local components are kept in /components local folder with same structure
  - Local hooks are kept in /hooks local folder
  - Local translations are kept in /localization local folder

## On Components

- Props extending HTML tags and with component name as prefix
- Ref forwarding
- Arias: busy & disabled,
- Props order: "rest & ref", "arias", "props"
- ConditionalStatements & Returns section
- Maps
- Styled Component
- "S" namespace for Styled Components
- Styles with propStyles variable

## On Styles and Theming

- DefaultStyles variable & file
- ResetStyles variable & file
- Animations variable & file
- Global Styles
- MUI Custom Theming

## On Context

- Error handling
- "value" variable with "get" and "set" objects to organize better
- Memo to memoize "value" and help with unecessary re-renders
- Categorized content sections as "Utility Information" and others by necessity

## As libs

- React Icons
- Styled Components
- Material UI (with Styled Component support libs)
- Framer Motion
- Immer (and use-immer)
- Typescript
- Jest, React Testing Library, User Event and MSW (Mock Service Worker)
- Prettier and ESLint (ESLint Plugin Jest included)
- i18n (i18next)
- Craco (to override Create React App configuration and allow Styled Components with MUI)

# Useful Specific Libs

- Routes handling: npm i react-router-dom
- Requests Handling: npm i axios
- Form Handling: npm i react-hook-form
- Manipulating Tab Text: npm i react-helmet-async
- Date Operations: npm i date-fns
- Calendar/Date Picker: npm i react-day-picker
- Dropzone: npm i react-dropzone
- Text Editor: npm i react-draft-wysiwyg draft-js
- Menus: npm i @szhsin/react-menu (if MUI is not satisfactory, use this one)
- Tutorials: npm i reactour (needs Styled Components)
- Complex Animations: npm i react-lottie (After Effects style)
- Chart Creation: npm i react-chartjs-2 chart.js

# Folder Structure inside Global and Pages:

## Rules

- Folders must have category names or descriptive names
- Use index files for entry points of folders
- When next to index file, other files must have category names, otherwise they can be descriptive names
- Aggregator files gather contents to export as one

## Categories:

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

# Component Structure

## Components can be of:

- Functionality: globals (No notation)
- Piece/Part/Portion: locals ("P" notation)
- Style: locals ("S" notation)

PS: Page components are special no notation Part Components

## Applying notation:

### In styles.ts:

- const S = {styles}

### In index.ts:

- const P = {parts}

PS: Parts are in index because they come from different files. If styles were the same way, they would be an object in index too.

## Rules:

- Inline styling only to apply conditionals
- Use common sense to break into Parts. Don't over-engineer it

## FAQ

- Why not inline styling? Because DRY is not good in it, and creating components defeats the purpose of inline style being faster to read and write

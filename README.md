# Example of Chuck's Jokes API usage

This is an example application showcasing the usage of https://api.chucknorris.io/ public API to retrieve some funny Chuck Norris based jokes either by category or through a freetext phrase. One joke is always displayed, starting with a random one upon render.
API Calls used:

- Get Categories (for a dropdown)
- Get Random Joke (upon initial render)
- Get Joke by Category (search button)
- Get Joke by Phrase (search button)

## Technologies used


React, Typescript, Yarn, Next.js (with Webpack)

MUI, Tailwind, Redux, Prettier, Playwright


Appropriate scripts for Prettier & Playwright can be found in the package.json

## Testing - Playwright


yarn test -> yarn playwright test - Headless mode

yarn test:ui -> yarn playwright test --ui - Playwright UI runner

yarn test:debug -> yarn playwright test --debug - Line-by-line debugging

## Dev/Build/Start


yarn dev

yarn build

yarn start

## Steps to reproduce:
1. Run `npm install && npm run fix-ionic && npm run build:all`
2. Then serve the app `ng serve —projects operations-mobile` , open `https://localhost:6003/` (if there are console errors refresh the page)
3. Click the icon in the top right corner to open a modal, focus the first input this will emit an event form the input and send it to the parent component. This can be seen in the console. Change the value in the input, this also triggers and event in the input and is received by the parent component (again can be seen in the console).
4. In the `package.json` change the stencil version to 0.9.8 and run `npm run reset:modules && npm run fix-ionic && npm run build:all`
5. Repeat steps 3 and 4. This time the parent component does not receive the events as can be seen in the console.
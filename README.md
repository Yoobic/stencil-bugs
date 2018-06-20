## Steps to reproduce:
1. Run `npm install && npm run fix-ionic && npm run build:all`
2. Then serve the app `ng serve —projects operations-mobile` , open `https://localhost:6003/`
3. Click the icon in the top right corner to open a modal, focus the first input this will emit an event form the input and send it to the parent component. The first event can be seen in the console but it does not get recieved by the parent component. Change the value in the input, this also triggers an event in the input and but it is not received by the parent component (again can be seen in the console).
## Steps to reproduce:
1. run `git checkout broken-events-shared`
2. Run `npm install && npm run fix-ionic && npm run build:all`
3. Then serve the app `ng serve —projects operations-mobile` , open `https://localhost:6003/`
4. Click the icon in the top right corner to open a modal, focus the first input:

 - When the input in `form-input.tsx` is focused it triggers the `onInputFocused()` method (`design-system/stencil/src/components/form/form-input/form-input.tsx`, line `126`). 
 - The `onInputfocused()` method is stored inside `design-system/stencil/src/utils/helpers/form-input-helpers.ts` line `99`, this emits the `inputFocused` event. This method triggers a console log of `input focused event being emitted`. 
 - This event is being listened to inside `form-dynamic.tsx` (`design-system/stencil/src/components/form/form-input/form-dynamic.tsx`, line `419`).
 - It should call the `onFieldFocused()` method (`design-system/stencil/src/components/form/form-input/form-dynamic.tsx`, line `125`) and result in a console log of `field focused being recieved`, it does not.

5. Change the value in the input:

 - When the input in `form-input.tsx` is changed it triggers the `onInputChanged()` method (`design-system/stencil/src/components/form/form-input/form-input.tsx`, line `64`). This calls `setValueAndValidateInput()`.
 - The `setValueAndValidateInput()` method is stored inside `design-system/stencil/src/utils/helpers/form-input-helpers.ts` line `126`, this emits the `inputChanged` event. This method triggers a console log of `input change event being emited`. 
 - This event is being listened to inside `form-dynamic.tsx` (`design-system/stencil/src/components/form/form-input/form-dynamic.tsx`, line `417`).
 - It should call the `onFieldChanged()` method (`design-system/stencil/src/components/form/form-input/form-dynamic.tsx`, line `97`) and result in a console log of `field data changed being recieved`, it does not.



## Summary
It can be seen through the console logs highlighted in steps `3` & `4` that the child component is emitting an event but the parent component does not recieve the event.
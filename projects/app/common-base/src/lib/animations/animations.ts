
import { Animation } from '@ionic/core';

export function mdEnterAnimation(animation: Animation, baseEl: HTMLElement): Promise<Animation> {
  const baseAnimation = new animation();

  const backdropAnimation = new animation();
  backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));

  const wrapperAnimation = new animation();
  wrapperAnimation.addElement(baseEl.querySelector('.modal-wrapper'));

  wrapperAnimation
    .fromTo('opacity', 0.01, 1)
    .fromTo('translateY', '-40px', '0px');

  backdropAnimation.fromTo('opacity', 0.01, 0.4);

  return Promise.resolve(baseAnimation
    .addElement(baseEl)
    .easing('cubic-bezier(0.36,0.66,0.04,1)')
    .duration(280)
    .beforeAddClass('show-modal')
    .add(backdropAnimation)
    .add(wrapperAnimation));
}

export function slideXEnterAnimation(animation: Animation, baseEl: HTMLElement): Promise<Animation> {
  const baseAnimation = new animation();

  const backdropAnimation = new animation();
  backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));

  const wrapperAnimation = new animation();
  wrapperAnimation.addElement(baseEl.querySelector('.modal-wrapper'));

  wrapperAnimation
    .fromTo('opacity', 0.01, 1)
    .fromTo('translateX', '100%', '0%');

  backdropAnimation.fromTo('opacity', 0.01, 0.4);

  return Promise.resolve(baseAnimation
    .addElement(baseEl)
    .easing('cubic-bezier(0.36,0.66,0.04,1)')
    .duration(400)
    .beforeAddClass('show-modal')
    .add(backdropAnimation)
    .add(wrapperAnimation));
}

export function slideXLeaveAnimation(animation: Animation, baseEl: HTMLElement): Promise<Animation> {
  const baseAnimation = new animation();

  const backdropAnimation = new animation();
  backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));

  const wrapperAnimation = new animation();
  const wrapperEl = baseEl.querySelector('.modal-wrapper');

  wrapperAnimation.addElement(wrapperEl);
  const wrapperElRect = wrapperEl.getBoundingClientRect();

  wrapperAnimation.beforeStyles({ 'opacity': 1 })
    .fromTo('translateX', '0%', `${window.innerHeight - wrapperElRect.top}px`);

  backdropAnimation.fromTo('opacity', 0.4, 0.0);

  return Promise.resolve(baseAnimation
    .addElement(baseEl)
    .easing('ease-out')
    .duration(250)
    .add(backdropAnimation)
    .add(wrapperAnimation));
}
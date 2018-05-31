import { keyframes, trigger, style, animate, transition, query, stagger, state, AnimationTriggerMetadata } from '@angular/animations';

export const bounceAnimation: AnimationTriggerMetadata[] = [
            trigger('bounce', [
            state('atRest', style({
                transform: 'translateX(0px)'
            })),
            transition('atRest => rightSwipe', animate('700ms ease-out', keyframes([
                style({ transform: 'translateX(0px)', offset: 0 }),
                style({ transform: 'translateX(-65px)', offset: 0.3 }),
                style({ transform: 'translateX(0px)', offset: 1.0 })
            ]))),
            transition('atRest => leftSwipe', animate('700ms ease-out', keyframes([
                style({ transform: 'translateX(0px)', offset: 0 }),
                style({ transform: 'translateX(65px)', offset: 0.3 }),
                style({ transform: 'translateX(0px)', offset: 1.0 })
            ])))
        ])
];

export const enterLeaveAnimation: AnimationTriggerMetadata[] = [
    trigger('routeAnimation', [
        transition(':enter', [
            animate('500ms ease-in', keyframes([
                style({ opacity: 0, transform: 'translateX(-100%)', offset: 0 }),
                style({ opacity: 0.3, transform: 'translateX(15px)', offset: 0.3 }),
                style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 })
            ]))
        ]),
        transition(':leave', [
            animate('500ms ease-out', keyframes([
                style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
                style({ opacity: 0.3, transform: 'translateX(-15px)', offset: 0.7 }),
                style({ opacity: 0, transform: 'translateX(100%)', offset: 1.0 })
            ]))
        ])
    ])
];

export const fadeRouteAnimation: AnimationTriggerMetadata[] = [
    trigger('routeAnimation', [
        transition(':enter', [
            animate('300ms ease-in', keyframes([
                style({ opacity: 0, offset: 0 }),
                style({ opacity: 1, offset: 1.0 })
            ]))
        ]),
        transition(':leave', [
            animate('500ms ease-out', keyframes([
                style({ opacity: 1, offset: 0 }),
                style({ opacity: 0, offset: 1.0 })
            ]))
        ])
    ])
];

export const slideInOutAnimation: AnimationTriggerMetadata[] = [
    trigger('slideInOut', [
        transition(':enter', [
            style({ transform: 'translateX(100%)', opacity: 0 }),
            animate('300ms', style({
                transform: 'translateX(0)',
                opacity: 1
            }))
        ]),
        transition('* => *', [
            style({ transform: 'translateX(100%)', opacity: 0 }),
            animate('300ms', style({
                transform: 'translateX(0)',
                opacity: 1
            }))
        ]),
        transition(':leave', [
            style({ transform: 'translateX(0)', 'opacity': 1 }),
            animate('300ms', style({
                transform: 'translateX(100%)',
                opacity: 0
            }))
        ])
    ])
];

export const slideYInOutAnimation: AnimationTriggerMetadata[] = [
    trigger('slideYInOut', [
        transition(':enter', [
            style({ transform: 'translateY(50%)', opacity: 0 }),
            animate('150ms', style({
                transform: 'translateY(20%)',
                opacity: 0.3
            })),
            animate('300ms', style({
                transform: 'translateY(0)',
                opacity: 1
            }))
        ]),
        transition('0 => 1', [
            style({ transform: 'translateY(50%)', opacity: 0 }),
            animate('150ms', style({
                transform: 'translateY(20%)',
                opacity: 0.3
            })),
            animate('300ms', style({
                transform: 'translateY(0)',
                opacity: 1
            }))
        ]),
        transition(':leave', [
            style({ transform: 'translateY(0)', 'opacity': 1 }),
            animate('300ms', style({
                transform: 'translateY(50%)',
                opacity: 0
            }))
        ])
    ])
];

export const fadeInOutAnimation: AnimationTriggerMetadata[] = [
    trigger('fadeInOut', [
        transition(':enter', [
            style({ opacity: 0.3 }),
            animate('300ms', style({
                opacity: 1
            }))
        ]),
        transition(':leave', [
            style({ 'opacity': 1 }),
            animate('300ms', style({
                opacity: 0
            }))
        ])
    ])
];

export const slideInStaggeredAnimationIonic: AnimationTriggerMetadata[] = [
    trigger('slideInStaggeredAnimationCard', [
        transition(':enter', [
            query('.card', style({ transform: 'translateX(200px)', opacity: 0 }), { optional: true }),
            query('.card', [
                stagger(50, [animate('400ms cubic-bezier(.35,0,.25,1)', style('*'))]
                )], { optional: true })
        ])
    ]),
    trigger('slideInStaggeredAnimationList', [
        transition(':enter', [
            query('.list ', style({ transform: 'translateX(350px)' }), { optional: true }),
            query('.list ', [
                stagger(40, [animate('300ms cubic-bezier(.35,0,.25,1)', style('*'))]
                )], { optional: true })
        ])
    ])
];

export const slideInStaggeredAnimationWeb: AnimationTriggerMetadata[] = [
    trigger('slideInStaggeredAnimationCard', [
        transition('* => *', [
            query('.cardExtended', style({ transform: 'translateY(-50px)', opacity: 0 }), { optional: true }),
            query('.cardExtended', [
                stagger(50, [animate('400ms cubic-bezier(.35,0,.25,1)', style('*'))]
                )], { optional: true })
        ])
    ]),
    trigger('slideInStaggeredAnimationList', [
        transition('* => *', [
            query('.list', style({ transform: 'translateX(-100%)', opacity: 0 }), { optional: true }),
            query('.list', [
                stagger(40, [animate('400ms cubic-bezier(.35,0,.25,1)', style('*'))]
                )], { optional: true })
        ])
    ])
];

export const COMMON_ANIMATIONS = [
    enterLeaveAnimation,
    fadeRouteAnimation,
    slideInOutAnimation,
    fadeInOutAnimation,
    slideInStaggeredAnimationWeb,
    slideInStaggeredAnimationIonic,
    bounceAnimation
];
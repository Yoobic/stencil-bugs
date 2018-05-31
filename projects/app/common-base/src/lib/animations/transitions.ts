import { sequence, trigger, animate, style, group, query, transition, animateChild, AnimationTriggerMetadata, stagger } from '@angular/animations';

export const routerTransition: AnimationTriggerMetadata = trigger('routerTransition', [
    transition('* => *', [
        query(':enter, :leave', style({ position: 'absolute', width: '100%' }), { optional: true }),
        query(':enter', style({ transform: 'translateX(100%)' }), { optional: true }),
        sequence([
            query(':leave', animateChild(), { optional: true }),
            group([
                query(':leave', [
                    style({ transform: 'translateX(0%)' }),
                    animate('500ms cubic-bezier(.75,-0.48,.26,1.52)', style({ transform: 'translateX(-100%)' }))
                ], { optional: true }),
                query(':enter', [
                    style({ transform: 'translateX(100%)' }),
                    animate('500ms cubic-bezier(.75,-0.48,.26,1.52)',
                        style({ transform: 'translateX(0%)' }))
                ], { optional: true })
            ]),
            query(':enter', animateChild(), { optional: true })
        ])
    ])
]);

export const gridPageTransition: AnimationTriggerMetadata = trigger('gridPageTransition', [
    transition(':enter', [
        query('app-grid', style({ opacity: 0 }), { optional: true }),
        query('app-grid', stagger(300, [
            style({ transform: 'translateY(100px)' }),
            animate('500ms cubic-bezier(.75,-0.48,.26,1.52)', style({ transform: 'translateY(0px)', opacity: 1 }))
        ]), { optional: true })
    ]),
    transition(':leave', [
        query('app-grid', stagger(300, [
            style({ transform: 'translateY(0px)', opacity: 1 }),
            animate('500ms cubic-bezier(.75,-0.48,.26,1.52)', style({ transform: 'translateY(100px)', opacity: 0 }))
        ]), { optional: true })
    ])
]);

export const slideInTransition: AnimationTriggerMetadata = trigger('slideInTransition', [
    transition(':enter', [
        style({ transform: '{{enter}}', opacity: 0 }),
        animate('500ms cubic-bezier(.75,-0.48,.26,1.52)', style({ transform: 'translateX(0)', opacity: 1 }))
    ]),
    transition(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate('500ms cubic-bezier(.75,-0.48,.26,1.52)', style({ transform: '{{leave}}', opacity: 0}))
    ])
]);
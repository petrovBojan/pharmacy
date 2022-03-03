import { trigger, style, transition, animate } from '@angular/animations';

export const FadeInOutAnimation = [
  trigger(
    'fadeInOut',
    [
      transition(
      ':enter', [
        style({opacity: 0}),
        animate('150ms', style({ opacity: 1}))
      ]
    ),
    transition(
      ':leave', [
        style({opacity: 1}),
        animate('150ms', style({opacity: 0})),
      ]
    )]
  )
];

export const SlideFromLeftAnimation = [
  trigger(
    'slideFromLeft',
    [
      transition(
      ':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('350ms ease-in-out', style({transform: 'translateX(0)'}))
      ]
    ),
    transition(
      ':leave', [
        style({transform: 'translateX(0)'}),
        animate('350ms ease-in-out', style({transform: 'translateX(-100%)'})),
      ]
    )]
  )
];
export const SlideFromRightAnimation = [
  trigger(
    'slideFromRight',
    [
      transition(
      ':enter', [
        style({transform: 'translateX(100%)'}),
        animate('350ms ease-in-out', style({transform: 'translateX(0)'}))
      ]
    ),
    transition(
      ':leave', [
        style({transform: 'translateX(0)'}),
        animate('350ms ease-in-out', style({transform: 'translateX(100%)'})),
      ]
    )]
  )
];

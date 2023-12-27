export const direction = Object.freeze({
  left: 'LEFT',
  right: 'RIGHT',
  up: 'UP',
  down: 'DOWN',
  none: 'NONE',
});

export type Direction = (typeof direction)[keyof typeof direction];

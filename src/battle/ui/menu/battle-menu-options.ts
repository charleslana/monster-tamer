export const battleMenuOptions = Object.freeze({
  fight: 'FIGHT',
  switch: 'SWITCH',
  item: 'ITEM',
  flee: 'FLEE',
});

export type BattleMenuOptions = typeof battleMenuOptions;

const attackMoveOptions = Object.freeze({
  move1: 'MOVE_1',
  move2: 'MOVE_2',
  move3: 'MOVE_3',
  move4: 'MOVE_4',
});

export type AttackMoveOptions = typeof attackMoveOptions;

const activeBattleMenu = Object.freeze({
  battleMain: 'BATTLE_MAIN',
  battleMoveSelect: 'BATTLE_MOVE_SELECT',
  battleItem: 'BATTLE_ITEM',
  battleSwitch: 'BATTLE_SWITCH',
  battleFlee: 'BATTLE_FLEE',
});

export type ActiveBattleMenu = typeof activeBattleMenu;

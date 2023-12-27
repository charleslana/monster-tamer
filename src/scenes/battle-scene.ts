import * as Phaser from 'phaser';
import { BattleMenu } from '../battle/ui/menu/battle-menu';
import { Direction, direction } from '../common/direction';
import { PlayerInputEnum } from '../enums/PlayerInputEnum';
import { sceneKeys } from './scene-keys';
import {
  battleAssetsKeys,
  battleBackgroundAssetsKeys,
  healthBarAssetKeys,
  monsterAssetsKeys,
} from '../assets/asset-keys';

export class BattledScene extends Phaser.Scene {
  constructor() {
    super({
      key: sceneKeys.battleScene,
    });
  }

  private battleMenu: BattleMenu;
  private cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;

  create(): void {
    this.add.image(0, 0, battleBackgroundAssetsKeys.forest).setOrigin(0);
    this.add.image(256, 316, monsterAssetsKeys.iguanignite, 0).setFlipX(true);
    this.add.image(768, 144, monsterAssetsKeys.carnodusk, 0);
    const playerMonsterName = this.add.text(30, 20, monsterAssetsKeys.iguanignite, {
      color: '#7e3d3f',
      fontSize: '32px',
    });
    this.add.container(556, 318, [
      this.add.image(0, 0, battleAssetsKeys.healthBarBackground).setOrigin(0),
      playerMonsterName,
      this.createHealthBar(34, 34),
      this.add.text(playerMonsterName.width + 35, 23, 'L5', {
        color: '#ed474b',
        fontSize: '28px',
      }),
      this.add.text(30, 55, 'HP', {
        color: '#ff6505',
        fontSize: '24px',
        fontStyle: 'italic',
      }),
      this.add
        .text(443, 80, '25/25', {
          color: '#7e3d3f',
          fontSize: '16px',
        })
        .setOrigin(1, 0),
    ]);
    const enemyMonsterName = this.add.text(30, 20, monsterAssetsKeys.carnodusk, {
      color: '#7e3d3f',
      fontSize: '32px',
    });
    this.add.container(0, 0, [
      this.add.image(0, 0, battleAssetsKeys.healthBarBackground).setOrigin(0).setScale(1, 0.8),
      enemyMonsterName,
      this.createHealthBar(34, 34),
      this.add.text(enemyMonsterName.width + 35, 23, 'L5', {
        color: '#ed474b',
        fontSize: '28px',
      }),
      this.add.text(30, 55, 'HP', {
        color: '#ff6505',
        fontSize: '24px',
        fontStyle: 'italic',
      }),
    ]);
    this.battleMenu = new BattleMenu(this);
    this.battleMenu.showMainBattleMenu();
    this.cursorKeys = this.input.keyboard.createCursorKeys();
  }

  update(): void {
    const wasSpaceKeyPressed = Phaser.Input.Keyboard.JustDown(this.cursorKeys.space);
    if (wasSpaceKeyPressed) {
      this.battleMenu.handlePlayerInput(PlayerInputEnum.Ok);
      return;
    }
    if (Phaser.Input.Keyboard.JustDown(this.cursorKeys.shift)) {
      this.battleMenu.handlePlayerInput(PlayerInputEnum.Cancel);
      return;
    }
    let selectedDirection: Direction = direction.none;
    if (this.cursorKeys.left.isDown) {
      selectedDirection = direction.left;
    } else if (this.cursorKeys.right.isDown) {
      selectedDirection = direction.right;
    } else if (this.cursorKeys.up.isDown) {
      selectedDirection = direction.up;
    } else if (this.cursorKeys.down.isDown) {
      selectedDirection = direction.down;
    }
    if (selectedDirection !== direction.none) {
      this.battleMenu.handlePlayerInput(selectedDirection);
    }
  }

  private createHealthBar(x: number, y: number): Phaser.GameObjects.Container {
    const scaleY = 0.7;
    const leftCap = this.add
      .image(x, y, healthBarAssetKeys.leftCap)
      .setOrigin(0, 0.5)
      .setScale(1, scaleY);
    const middleCap = this.add
      .image(leftCap.x + leftCap.width, y, healthBarAssetKeys.middle)
      .setOrigin(0, 0.5)
      .setScale(1, scaleY);
    middleCap.displayWidth = 360;
    const rightCap = this.add
      .image(middleCap.x + middleCap.displayWidth, y, healthBarAssetKeys.rightCap)
      .setOrigin(0, 0.5)
      .setScale(1, scaleY);
    return this.add.container(x, y, [leftCap, middleCap, rightCap]);
  }
}

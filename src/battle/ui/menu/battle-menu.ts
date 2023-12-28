import * as Phaser from 'phaser';
import { battleUiTextStyle } from './battle-menu-config';
import { Direction } from '../../../common/direction';
import { exhaustiveGuard } from '../../../utils/guard';
import { monsterAssetsKeys, uiAssetKeys } from '../../../assets/asset-keys';
import { PlayerInputEnum } from '../../../enums/PlayerInputEnum';
import {
  ActiveBattleMenu,
  AttackMoveOptions,
  BattleMenuOptions,
  battleMenuOptions,
} from './battle-menu-options';

const battleMenuCursorPosition = Object.freeze({
  x: 42,
  y: 38,
});

const attackMenuCursorPosition = Object.freeze({
  x: 42,
  y: 38,
});

export class BattleMenu {
  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.activeBattleMenu = 'battleMain';
    this.selectedBattleMenuOption = 'fight';
    this.selectedAttackMenuOption = 'move1';
    this.createMainInfoPane();
    this.createMainBattleMenu();
    this.createMonsterAttackSubMenu();
  }

  private scene: Phaser.Scene;
  private mainBattleMenuPhaserContainerGameObject: Phaser.GameObjects.Container;
  private moveSelectionSubBattleMenuPhaserContainerGameObject: Phaser.GameObjects.Container;
  private battleTextGameObjectLine1: Phaser.GameObjects.Text;
  private battleTextGameObjectLine2: Phaser.GameObjects.Text;
  private mainBattleMenuCursorPhaserImageGameObject: Phaser.GameObjects.Image;
  private attackBattleMenuCursorPhaserImageGameObject: Phaser.GameObjects.Image;
  private selectedBattleMenuOption: keyof BattleMenuOptions;
  private selectedAttackMenuOption: keyof AttackMoveOptions;
  private activeBattleMenu: keyof ActiveBattleMenu;

  public showMainBattleMenu(): void {
    this.activeBattleMenu = 'battleMain';
    this.battleTextGameObjectLine1.setText('what should');
    this.mainBattleMenuPhaserContainerGameObject.setAlpha(1);
    this.battleTextGameObjectLine1.setAlpha(1);
    this.battleTextGameObjectLine2.setAlpha(1);
    this.selectedBattleMenuOption = 'fight';
    this.mainBattleMenuCursorPhaserImageGameObject.setPosition(
      battleMenuCursorPosition.x,
      battleMenuCursorPosition.y
    );
  }

  public hideMainBattleMenu(): void {
    this.mainBattleMenuPhaserContainerGameObject.setAlpha(0);
    this.battleTextGameObjectLine1.setAlpha(0);
    this.battleTextGameObjectLine2.setAlpha(0);
  }

  public showMonsterAttackSubMenu(): void {
    this.activeBattleMenu = 'battleMoveSelect';
    this.moveSelectionSubBattleMenuPhaserContainerGameObject.setAlpha(1);
  }

  public hideMonsterAttackSubMenu(): void {
    this.moveSelectionSubBattleMenuPhaserContainerGameObject.setAlpha(0);
  }

  public handlePlayerInput(input: PlayerInputEnum | Direction): void {
    if (input === PlayerInputEnum.Cancel) {
      this.hideMonsterAttackSubMenu();
      this.showMainBattleMenu();
      return;
    }
    if (input === PlayerInputEnum.Ok) {
      this.hideMainBattleMenu();
      this.showMonsterAttackSubMenu();
      return;
    }
    this.updateSelectedBattleMenuOptionFromInput(input);
    this.moveMainBattleMenuCursor();
    this.updateSelectedMoveMenuOptionFromInput(input);
    this.moveMoveSelectBattleMenuCursor();
  }

  private createMainBattleMenu(): void {
    this.battleTextGameObjectLine1 = this.scene.add.text(20, 468, 'what should', battleUiTextStyle);
    this.battleTextGameObjectLine2 = this.scene.add.text(
      20,
      512,
      `${monsterAssetsKeys.iguanignite} do next`,
      battleUiTextStyle
    );
    this.mainBattleMenuCursorPhaserImageGameObject = this.scene.add
      .image(battleMenuCursorPosition.x, battleMenuCursorPosition.y, uiAssetKeys.cursor, 0)
      .setOrigin(0.5)
      .setScale(2.5);
    this.mainBattleMenuPhaserContainerGameObject = this.scene.add.container(520, 448, [
      this.createMainInfoSubPane(),
      this.scene.add.text(55, 22, battleMenuOptions.fight, battleUiTextStyle),
      this.scene.add.text(240, 22, battleMenuOptions.switch, battleUiTextStyle),
      this.scene.add.text(55, 70, battleMenuOptions.item, battleUiTextStyle),
      this.scene.add.text(240, 70, battleMenuOptions.flee, battleUiTextStyle),
      this.mainBattleMenuCursorPhaserImageGameObject,
    ]);
    this.hideMainBattleMenu();
  }

  private createMonsterAttackSubMenu(): void {
    this.attackBattleMenuCursorPhaserImageGameObject = this.scene.add
      .image(attackMenuCursorPosition.x, attackMenuCursorPosition.y, uiAssetKeys.cursor, 0)
      .setOrigin(0.5)
      .setScale(2.5);
    this.moveSelectionSubBattleMenuPhaserContainerGameObject = this.scene.add.container(0, 448, [
      this.scene.add.text(55, 22, 'slash', battleUiTextStyle),
      this.scene.add.text(240, 22, 'growl', battleUiTextStyle),
      this.scene.add.text(55, 70, '-', battleUiTextStyle),
      this.scene.add.text(240, 70, '-', battleUiTextStyle),
      this.attackBattleMenuCursorPhaserImageGameObject,
    ]);
    this.hideMonsterAttackSubMenu();
  }

  private createMainInfoPane(): void {
    const padding = 4;
    const rectHeight = 124;
    this.scene.add
      .rectangle(
        padding,
        this.scene.scale.height - rectHeight - padding,
        this.scene.scale.width - padding * 2,
        rectHeight,
        0xede4f3,
        1
      )
      .setOrigin(0)
      .setStrokeStyle(8, 0xe4434a, 1);
  }

  private createMainInfoSubPane(): Phaser.GameObjects.Rectangle {
    const recWidth = 500;
    const rectHeight = 124;
    return this.scene.add
      .rectangle(0, 0, recWidth, rectHeight, 0xede4f3, 1)
      .setOrigin(0)
      .setStrokeStyle(8, 0x905ac2, 1);
  }

  private updateSelectedBattleMenuOptionFromInput(direction: Direction): void {
    if (this.activeBattleMenu !== 'battleMain') {
      return;
    }
    if (this.selectedBattleMenuOption === 'fight') {
      switch (direction) {
        case 'RIGHT':
          this.selectedBattleMenuOption = 'switch';
          return;
        case 'DOWN':
          this.selectedBattleMenuOption = 'item';
          return;
        case 'LEFT':
        case 'UP':
        case 'NONE':
          return;
        default:
          exhaustiveGuard(direction);
      }
      return;
    }
    if (this.selectedBattleMenuOption === 'switch') {
      switch (direction) {
        case 'LEFT':
          this.selectedBattleMenuOption = 'fight';
          return;
        case 'DOWN':
          this.selectedBattleMenuOption = 'flee';
          return;
        case 'RIGHT':
        case 'UP':
        case 'NONE':
          return;
        default:
          exhaustiveGuard(direction);
      }
      return;
    }
    if (this.selectedBattleMenuOption === 'item') {
      switch (direction) {
        case 'RIGHT':
          this.selectedBattleMenuOption = 'flee';
          return;
        case 'UP':
          this.selectedBattleMenuOption = 'fight';
          return;
        case 'LEFT':
        case 'DOWN':
        case 'NONE':
          return;
        default:
          exhaustiveGuard(direction);
      }
      return;
    }
    if (this.selectedBattleMenuOption === 'flee') {
      switch (direction) {
        case 'LEFT':
          this.selectedBattleMenuOption = 'item';
          return;
        case 'UP':
          this.selectedBattleMenuOption = 'switch';
          return;
        case 'RIGHT':
        case 'DOWN':
        case 'NONE':
          return;
        default:
          exhaustiveGuard(direction);
      }
      return;
    }
    exhaustiveGuard(this.selectedBattleMenuOption);
  }

  private moveMainBattleMenuCursor(): void {
    if (this.activeBattleMenu !== 'battleMain') {
      return;
    }
    switch (this.selectedBattleMenuOption) {
      case 'fight':
        this.mainBattleMenuCursorPhaserImageGameObject.setPosition(
          battleMenuCursorPosition.x,
          battleMenuCursorPosition.y
        );
        return;
      case 'switch':
        this.mainBattleMenuCursorPhaserImageGameObject.setPosition(228, battleMenuCursorPosition.y);
        return;
      case 'item':
        this.mainBattleMenuCursorPhaserImageGameObject.setPosition(42, 86);
        return;
      case 'flee':
        this.mainBattleMenuCursorPhaserImageGameObject.setPosition(228, 86);
        return;
      default:
        exhaustiveGuard(this.selectedBattleMenuOption);
    }
  }

  private updateSelectedMoveMenuOptionFromInput(direction: Direction): void {
    if (this.activeBattleMenu !== 'battleMoveSelect') {
      return;
    }
    if (this.selectedAttackMenuOption === 'move1') {
      switch (direction) {
        case 'RIGHT':
          this.selectedAttackMenuOption = 'move2';
          return;
        case 'DOWN':
          this.selectedAttackMenuOption = 'move3';
          return;
        case 'LEFT':
        case 'UP':
        case 'NONE':
          return;
        default:
          exhaustiveGuard(direction);
      }
      return;
    }
    if (this.selectedAttackMenuOption === 'move2') {
      switch (direction) {
        case 'LEFT':
          this.selectedAttackMenuOption = 'move1';
          return;
        case 'DOWN':
          this.selectedAttackMenuOption = 'move4';
          return;
        case 'RIGHT':
        case 'UP':
        case 'NONE':
          return;
        default:
          exhaustiveGuard(direction);
      }
      return;
    }
    if (this.selectedAttackMenuOption === 'move3') {
      switch (direction) {
        case 'RIGHT':
          this.selectedAttackMenuOption = 'move4';
          return;
        case 'UP':
          this.selectedAttackMenuOption = 'move1';
          return;
        case 'LEFT':
        case 'DOWN':
        case 'NONE':
          return;
        default:
          exhaustiveGuard(direction);
      }
      return;
    }
    if (this.selectedAttackMenuOption === 'move4') {
      switch (direction) {
        case 'LEFT':
          this.selectedAttackMenuOption = 'move3';
          return;
        case 'UP':
          this.selectedAttackMenuOption = 'move2';
          return;
        case 'RIGHT':
        case 'DOWN':
        case 'NONE':
          return;
        default:
          exhaustiveGuard(direction);
      }
      return;
    }
    exhaustiveGuard(this.selectedAttackMenuOption);
  }

  private moveMoveSelectBattleMenuCursor(): void {
    if (this.activeBattleMenu !== 'battleMoveSelect') {
      return;
    }
    switch (this.selectedAttackMenuOption) {
      case 'move1':
        this.attackBattleMenuCursorPhaserImageGameObject.setPosition(
          attackMenuCursorPosition.x,
          attackMenuCursorPosition.y
        );
        return;
      case 'move2':
        this.attackBattleMenuCursorPhaserImageGameObject.setPosition(
          228,
          attackMenuCursorPosition.y
        );
        return;
      case 'move3':
        this.attackBattleMenuCursorPhaserImageGameObject.setPosition(
          attackMenuCursorPosition.x,
          86
        );
        return;
      case 'move4':
        this.attackBattleMenuCursorPhaserImageGameObject.setPosition(228, 86);
        return;
      default:
        exhaustiveGuard(this.selectedAttackMenuOption);
    }
  }
}

import * as Phaser from 'phaser';
import { sceneKeys } from './scene-keys';
import {
  battleAssetsKeys,
  battleBackgroundAssetsKeys,
  healthBarAssetKeys,
  monsterAssetsKeys,
  uiAssetKeys,
} from '../assets/asset-keys';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({
      key: sceneKeys.preloadScene,
    });
  }

  preload(): void {
    const monsterTamerAssetPath = './assets/images/monster-tamer';
    const kenneysAssetPath = './assets/images/kenneys-assets';
    this.load.image(
      battleBackgroundAssetsKeys.forest,
      `${monsterTamerAssetPath}/battle-backgrounds/forest-background.png`
    );
    this.load.image(
      battleAssetsKeys.healthBarBackground,
      `${kenneysAssetPath}/ui-space-expansion/custom-ui.png`
    );
    this.load.image(
      healthBarAssetKeys.leftCap,
      `${kenneysAssetPath}/ui-space-expansion/barHorizontal_green_left.png`
    );
    this.load.image(
      healthBarAssetKeys.middle,
      `${kenneysAssetPath}/ui-space-expansion/barHorizontal_green_mid.png`
    );
    this.load.image(
      healthBarAssetKeys.rightCap,
      `${kenneysAssetPath}/ui-space-expansion/barHorizontal_green_right.png`
    );
    this.load.image(
      monsterAssetsKeys.iguanignite,
      `${monsterTamerAssetPath}/monsters/iguanignite.png`
    );
    this.load.image(monsterAssetsKeys.carnodusk, `${monsterTamerAssetPath}/monsters/carnodusk.png`);
    this.load.image(uiAssetKeys.cursor, `${monsterTamerAssetPath}/ui/cursor.png`);
  }

  create(): void {
    this.scene.start(sceneKeys.battleScene);
  }
}

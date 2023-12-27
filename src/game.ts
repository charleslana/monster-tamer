import * as Phaser from 'phaser';
import { BattledScene } from './scenes/battle-scene';
import { PreloadScene } from './scenes/preload-scene';
import { sceneKeys } from './scenes/scene-keys';

// const config: Phaser.Types.Core.GameConfig = {
//   type: Phaser.AUTO,
//   backgroundColor: '#125555',
//   width: 800,
//   height: 640,
//   scene: Game,
//   physics: {
//     default: 'arcade',
//     arcade: {
//       gravity: { y: 0 },
//     },
//   },
// };

const game = new Phaser.Game({
  type: Phaser.CANVAS,
  pixelArt: false,
  backgroundColor: '#000000',
  scale: {
    width: 1024,
    height: 576,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
});

game.scene.add(sceneKeys.preloadScene, PreloadScene);
game.scene.add(sceneKeys.battleScene, BattledScene);
game.scene.start(sceneKeys.preloadScene);

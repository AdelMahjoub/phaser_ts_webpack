/// <reference path="../node_modules/phaser/typescript/phaser.comments.d.ts"/>
/// <reference path="./globals.d.ts"/>

import { Boot } from './states/Boot';
import { Preload } from './states/Preload';
import { Menu } from './states/Menu';

class Game extends Phaser.Game {

    constructor(config: IGameConfig) {
        super(config.width, config.height, config.renderer);
        this.state.add('Boot', Boot);
        this.state.add('Preload', Preload);
        this.state.add('Menu', Menu);
    }

    /**
     * @param {*} params Additional parameters that will be passed to the State.init function (if it has one)
     * @memberof App
     */
    run (params?: any) {
        this.state.start('Boot', true, false, params);
    }
}

const config: IGameConfig = {
    width: 640,
    height: 360,
    renderer: Phaser.AUTO
};

(<any>window).game = new Game(config);

if (!(<any>window).cordova) {
    window.addEventListener('load', function() {
        (<any>window).game.run();
    });
} else {
    document.addEventListener('deviceready', function() {
        (<any>window).game.run();
    }, false);
}
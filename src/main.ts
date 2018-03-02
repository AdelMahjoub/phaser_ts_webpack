/// <reference path="../node_modules/phaser/typescript/phaser.comments.d.ts"/>

import Boot from './states/Boot';
import Preload from './states/Preload';
import Title from './states/Title';

interface IGameConfig {
    width: number;
    height: number;
    renderer: number;
    parent?: string|HTMLElement;
    state?: Phaser.State;
    transparent?: boolean;
    antialias?: boolean;
}

class App extends Phaser.Game {
    constructor(config: IGameConfig) {
        super(config.width, config.height, config.renderer);
        this.state.add('Boot', Boot);
        this.state.add('Preload', Preload);
        this.state.add('Title', Title);
    }

    /**
     * @param {*} params Additional parameters that will be passed to the State.init function (if it has one)
     * @memberof App
     */
    run (params?: any) {
        this.state.start('Boot', true, false, params);
    }
}

window.addEventListener('load', function() {

    const config: IGameConfig = {
        width: 640,
        height: 360,
        renderer: Phaser.AUTO
    };

    const app = new App(config);

    app.run();
});
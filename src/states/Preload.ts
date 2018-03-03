class Preload extends Phaser.State {
    constructor() {
        super();
    }

    init() {
        console.log(`State ${this.key} -> init`);
    }

    preload() {
    }

    create() {
        this.game.state.start('Title');
    }
}

export default Preload;
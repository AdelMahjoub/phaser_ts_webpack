class Boot extends Phaser.State {
    constructor() {
        super();
    }

    init() {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.setMinMax(256, 144, 1024, 576);
    }

    preload() {
        this.load.bitmapFont('amiga_forever', 'assets/fonts/Amiga_Forever.png', 'assets/fonts/Amiga_Forever.xml');
    }

    create() {
        this.game.state.start('Preload');
    }
}

export default Boot;

class Boot extends Phaser.State {

    constructor() {
        super();
    }

    init() {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.setMinMax(254, 144, 1280, 720);
        this.game.renderer.renderSession.roundPixels = true;
    }

    preload() {
        this.load.bitmapFont('Vermin_Vibes_1989', 'assets/fonts/Vermin_Vibes_1989.png', 'assets/fonts/Vermin_Vibes_1989.xml');
    }

    create() {
        this.game.state.start('Preload');
    }
}

export { Boot };
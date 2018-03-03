class Title extends Phaser.State {
    constructor() {
        super();
    }

    init() {
        console.log(`State ${this.key} -> init`);
    }

    preload() {
    }

    create() {
        let title: Phaser.BitmapText = this.add.bitmapText(this.world.centerX, this.world.centerY, 'Vermin_Vibes 1989', 'Phaser Sandbox', 34);
        title.anchor.setTo(0.5);
        title.align = 'center';
    }
}

export default Title;
class Menu extends Phaser.State {
    constructor() {
        super();
    }

    init() {
        console.log(`State ${this.key} -> init`);
    }

    preload() {
    }

    create() {
        let title: Phaser.BitmapText = this.add.bitmapText(this.world.centerX, this.world.centerY, 'Vermin_Vibes_1989', 'Phaser Ts Webpack', 34);
        title.anchor.setTo(0.5);
    }
}

export {Menu};
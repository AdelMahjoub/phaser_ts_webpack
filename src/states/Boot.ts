
class Boot extends Phaser.State {

    /**
     * Image to display if the device is in an incorrect orientation
     * @type {Phaser.Image}
     * @memberof Boot
     */
    __screenOrientationMessage: Phaser.Image|null = null;

    /**
     * `GAME SIZE | VIEW PORT` min, max dimensions
     * @type {IGameMinMaxDimensions}
     * @memberof Boot
     */
    __minMaxDimensions: IGameMinMaxDimensions = {
        minWidth: __DEFAULT_MIN_GAME_WIDTH__,
        minHeight: __DEFAULT_MIN_GAME_HEIGHT__,
        maxWidth: __DEFAULT_MAX_GAME_WIDTH__,
        maxHeight: __DEFAULT_MAX_GAME_HEIGHT__
    };

    constructor() {
        super();
    }

    init() {
        this.__setScreenScalingStrategy();
        this.__handleScreenOrientation();
    }

    preload() {
        this.load.bitmapFont('Vermin_Vibes 1989', 'assets/fonts/Vermin_Vibes 1989.png', 'assets/fonts/Vermin_Vibes 1989.xml');
        this.load.image('ForceLandscape', 'assets/images/ForceLandscape.png');
        this.load.image('ForcePortrait', 'assets/images/ForcePortrait.png');
    }

    create() {
        this.game.state.start('Preload');
    }

    __setScreenScalingStrategy(): void {
        this.scale.scaleMode = __DEFAULT_SCALE_MODE__;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.setMinMax(
            this.__minMaxDimensions.minWidth, this.__minMaxDimensions.minHeight,
            this.__minMaxDimensions.maxWidth, this.__minMaxDimensions.maxHeight
        );
    }

    __handleScreenOrientation(): void {
        if (this.game.device.desktop) {
            return;
        }
        this.scale.forceOrientation(this.game.scale.isGameLandscape, this.game.scale.isGamePortrait);
        this.scale.enterIncorrectOrientation.add(this.__onIncorrectScreenOrientation, this);
        this.scale.leaveIncorrectOrientation.add(this.__onIncorrectScreenOrientation, this);
    }

    __onIncorrectScreenOrientation(): void {
        if (this.scale.incorrectOrientation) {
            if (!this.__screenOrientationMessage) {
                let image: string|null = null;
                if (this.scale.forceLandscape && !this.scale.isLandscape && this.scale.isGameLandscape) {
                    image = 'ForceLandscape';
                } else if (this.scale.forcePortrait && !this.scale.isPortrait && this.scale.isGamePortrait) {
                    image = 'ForcePortrait';
                }
                if (!image) {
                    return;
                }
                this.__screenOrientationMessage = this.game.make.image(0, 0, image);
            }
            this.__screenOrientationMessage.scale.setTo(this.scale.sourceAspectRatio, 1 / this.scale.sourceAspectRatio);
            this.stage.addChild(this.__screenOrientationMessage);
            this.game.paused = true;
        } else {
            this.game.paused = false;
            if (this.__screenOrientationMessage) {
                this.stage.removeChild(this.__screenOrientationMessage);
            }
        }
    }
}

export default Boot;
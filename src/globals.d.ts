declare const __DEV__       : boolean;

interface IGameConfig {
    width: number;
    height: number;
    renderer: number;
    parent?: string|HTMLElement;
    state?: Phaser.State;
    transparent?: boolean;
    antialias?: boolean;
    [key: string]: any;
}
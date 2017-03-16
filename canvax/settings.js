export default {
    //设备分辨率
    RESOLUTION: window.devicePixelRatio || 1,


    /**
     * Target frames per millisecond.
     *
     * @static
     * @memberof PIXI.settings
     * @type {number}
     * @default 0.06
     */
    TARGET_FPMS: 0.06,

    /**
     * If set to true WebGL will attempt make textures mimpaped by default.
     * Mipmapping will only succeed if the base texture uploaded has power of two dimensions.
     *
     * @static
     * @memberof PIXI.settings
     * @type {boolean}
     * @default true
     */
    MIPMAP_TEXTURES: true,

    /**
     * Default filter resolution.
     *
     * @static
     * @memberof PIXI.settings
     * @type {number}
     * @default 1
     */
    FILTER_RESOLUTION: 1,


    // TODO: maybe change to SPRITE.BATCH_SIZE: 2000
    // TODO: maybe add PARTICLE.BATCH_SIZE: 15000

    /**
     * The default sprite batch size.
     *
     * The default aims to balance desktop and mobile devices.
     *
     * @static
     * @memberof PIXI.settings
     * @type {number}
     * @default 4096
     */
    SPRITE_BATCH_SIZE: 4096,

    /**
     * The prefix that denotes a URL is for a retina asset.
     *
     * @static
     * @memberof PIXI.settings
     * @type {RegExp|string}
     * @example `@2x`
     * @default /@(.+)x/
     */
    RETINA_PREFIX: /@(.+)x/,

    /**
     * The default render options if none are supplied to {@link PIXI.WebGLRenderer}
     * or {@link PIXI.CanvasRenderer}.
     *
     * @static
     * @constant
     * @memberof PIXI.settings
     * @type {object}
     * @property {HTMLCanvasElement} view=null
     * @property {number} resolution=1
     * @property {boolean} antialias=false
     * @property {boolean} forceFXAA=false
     * @property {boolean} autoResize=false
     * @property {boolean} transparent=false
     * @property {number} backgroundColor=0x000000
     * @property {boolean} clearBeforeRender=true
     * @property {boolean} preserveDrawingBuffer=false
     * @property {boolean} roundPixels=false
     */
    RENDER_OPTIONS: {
        view: null,
        antialias: true,
        forceFXAA: false,
        autoResize: false,
        transparent: true,
        backgroundColor: 0x000000,
        clearBeforeRender: true,
        preserveDrawingBuffer: false,
        roundPixels: false,
    },

    /**
     * Default transform type.
     *
     * @static
     * @memberof PIXI.settings
     * @type {PIXI.TRANSFORM_MODE}
     * @default PIXI.TRANSFORM_MODE.STATIC
     */
    TRANSFORM_MODE: 0,

    /**
     * Default Garbage Collection mode.
     *
     * @static
     * @memberof PIXI.settings
     * @type {PIXI.GC_MODES}
     * @default PIXI.GC_MODES.AUTO
     */
    GC_MODE: 0,

    /**
     * Default Garbage Collection max idle.
     *
     * @static
     * @memberof PIXI.settings
     * @type {number}
     * @default 3600
     */
    GC_MAX_IDLE: 60 * 60,

    /**
     * Default Garbage Collection maximum check count.
     *
     * @static
     * @memberof PIXI.settings
     * @type {number}
     * @default 600
     */
    GC_MAX_CHECK_COUNT: 60 * 10,

    /**
     * Default wrap modes that are supported by pixi.
     *
     * @static
     * @memberof PIXI.settings
     * @type {PIXI.WRAP_MODES}
     * @default PIXI.WRAP_MODES.CLAMP
     */
    WRAP_MODE: 0,

    /**
     * The scale modes that are supported by pixi.
     *
     * @static
     * @memberof PIXI.settings
     * @type {PIXI.SCALE_MODES}
     * @default PIXI.SCALE_MODES.LINEAR
     */
    SCALE_MODE: 0,

    /**
     * Default specify float precision in shaders.
     *
     * @static
     * @memberof PIXI.settings
     * @type {PIXI.PRECISION}
     * @default PIXI.PRECISION.MEDIUM
     */
    PRECISION: 'mediump',

};
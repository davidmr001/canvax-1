var Canvax = (function () {
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var _$1 = {};
var breaker = {};
var ArrayProto = Array.prototype;
var ObjProto = Object.prototype;
var toString = ObjProto.toString;
var hasOwnProperty = ObjProto.hasOwnProperty;

var nativeForEach = ArrayProto.forEach;
var nativeFilter = ArrayProto.filter;
var nativeIndexOf = ArrayProto.indexOf;
var nativeIsArray = Array.isArray;
var nativeKeys = Object.keys;

_$1.values = function (obj) {
  var keys = _$1.keys(obj);
  var length = keys.length;
  var values = new Array(length);
  for (var i = 0; i < length; i++) {
    values[i] = obj[keys[i]];
  }
  return values;
};

_$1.keys = nativeKeys || function (obj) {
  if (obj !== Object(obj)) throw new TypeError('Invalid object');
  var keys = [];
  for (var key in obj) {
    if (_$1.has(obj, key)) keys.push(key);
  }return keys;
};

_$1.has = function (obj, key) {
  return hasOwnProperty.call(obj, key);
};

var each = _$1.each = _$1.forEach = function (obj, iterator, context) {
  if (obj == null) return;
  if (nativeForEach && obj.forEach === nativeForEach) {
    obj.forEach(iterator, context);
  } else if (obj.length === +obj.length) {
    for (var i = 0, length = obj.length; i < length; i++) {
      if (iterator.call(context, obj[i], i, obj) === breaker) return;
    }
  } else {
    var keys = _$1.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
    }
  }
};

_$1.compact = function (array) {
  return _$1.filter(array, _$1.identity);
};

_$1.filter = _$1.select = function (obj, iterator, context) {
  var results = [];
  if (obj == null) return results;
  if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
  each(obj, function (value, index, list) {
    if (iterator.call(context, value, index, list)) results.push(value);
  });
  return results;
};

each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function (name) {
  _$1['is' + name] = function (obj) {
    return toString.call(obj) == '[object ' + name + ']';
  };
});

{
  _$1.isFunction = function (obj) {
    return typeof obj === 'function';
  };
}

_$1.isFinite = function (obj) {
  return isFinite(obj) && !isNaN(parseFloat(obj));
};

_$1.isNaN = function (obj) {
  return _$1.isNumber(obj) && obj != +obj;
};

_$1.isBoolean = function (obj) {
  return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
};

_$1.isNull = function (obj) {
  return obj === null;
};

_$1.isEmpty = function (obj) {
  if (obj == null) return true;
  if (_$1.isArray(obj) || _$1.isString(obj)) return obj.length === 0;
  for (var key in obj) {
    if (_$1.has(obj, key)) return false;
  }return true;
};

_$1.isElement = function (obj) {
  return !!(obj && obj.nodeType === 1);
};

_$1.isArray = nativeIsArray || function (obj) {
  return toString.call(obj) == '[object Array]';
};

_$1.isObject = function (obj) {
  return obj === Object(obj);
};

_$1.identity = function (value) {
  return value;
};

_$1.indexOf = function (array, item, isSorted) {
  if (array == null) return -1;
  var i = 0,
      length = array.length;
  if (isSorted) {
    if (typeof isSorted == 'number') {
      i = isSorted < 0 ? Math.max(0, length + isSorted) : isSorted;
    } else {
      i = _$1.sortedIndex(array, item);
      return array[i] === item ? i : -1;
    }
  }
  if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
  for (; i < length; i++) {
    if (array[i] === item) return i;
  }return -1;
};

_$1.isWindow = function (obj) {
  return obj != null && obj == obj.window;
};
_$1.isPlainObject = function (obj) {
  // Because of IE, we also have to check the presence of the constructor property.
  // Make sure that DOM nodes and window objects don't pass through, as well
  if (!obj || (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== "object" || obj.nodeType || _$1.isWindow(obj)) {
    return false;
  }
  try {
    // Not own constructor property must be Object
    if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
      return false;
    }
  } catch (e) {
    // IE8,9 Will throw exceptions on certain host objects #9897
    return false;
  }
  // Own properties are enumerated firstly, so to speed up,
  // if last one is own, then all properties are own.
  var key;
  for (key in obj) {}

  return key === undefined || hasOwn.call(obj, key);
};

/**
*
*如果是深度extend，第一个参数就设置为true
*/
_$1.extend = function () {
  var options,
      name,
      src,
      copy,
      copyIsArray,
      clone,
      target = arguments[0] || {},
      i = 1,
      length = arguments.length,
      deep = false;
  if (typeof target === "boolean") {
    deep = target;
    target = arguments[1] || {};
    i = 2;
  }
  if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) !== "object" && !_$1.isFunction(target)) {
    target = {};
  }
  if (length === i) {
    target = this;
    --i;
  }
  for (; i < length; i++) {
    if ((options = arguments[i]) != null) {
      for (name in options) {
        src = target[name];
        copy = options[name];
        if (target === copy) {
          continue;
        }
        if (deep && copy && (_$1.isPlainObject(copy) || (copyIsArray = _$1.isArray(copy)))) {
          if (copyIsArray) {
            copyIsArray = false;
            clone = src && _$1.isArray(src) ? src : [];
          } else {
            clone = src && _$1.isPlainObject(src) ? src : {};
          }
          target[name] = _$1.extend(deep, clone, copy);
        } else if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }
  }
  return target;
};
_$1.clone = function (obj) {
  if (!_$1.isObject(obj)) return obj;
  return _$1.isArray(obj) ? obj.slice() : _$1.extend(true, {}, obj);
};

/**
 * Canvax
 *
 * @author 释剑 (李涛, litao.lt@alibaba-inc.com 
*/
var Utils = {
    mainFrameRate: 60, //默认主帧率
    now: 0,
    /*像素检测专用*/
    _pixelCtx: null,
    __emptyFunc: function __emptyFunc() {},
    //retina 屏幕优化
    _devicePixelRatio: window.devicePixelRatio || 1,
    _UID: 0, //该值为向上的自增长整数值
    getUID: function getUID() {
        return this._UID++;
    },
    createId: function createId(name) {
        if (!name) {
            debugger;
        }
        //if end with a digit, then append an undersBase before appending
        var charCode = name.charCodeAt(name.length - 1);
        if (charCode >= 48 && charCode <= 57) name += "_";
        return name + Utils.getUID();
    },
    canvasSupport: function canvasSupport() {
        return !!document.createElement('canvas').getContext;
    },
    createObject: function createObject(proto, constructor) {
        var newProto;
        var ObjectCreate = Object.create;
        if (ObjectCreate) {
            newProto = ObjectCreate(proto);
        } else {
            Utils.__emptyFunc.prototype = proto;
            newProto = new Utils.__emptyFunc();
        }
        newProto.constructor = constructor;
        return newProto;
    },
    creatClass: function creatClass(r, s, px) {
        if (!s || !r) {
            return r;
        }
        var sp = s.prototype,
            rp;
        // add prototype chain
        rp = Utils.createObject(sp, r);
        r.prototype = _$1.extend(rp, r.prototype);
        r.superclass = Utils.createObject(sp, s);
        // add prototype overrides
        if (px) {
            _$1.extend(rp, px);
        }
        return r;
    },
    initElement: function initElement(canvas) {
        if (window.FlashCanvas && FlashCanvas.initElement) {
            FlashCanvas.initElement(canvas);
        }
    },
    //做一次简单的opt参数校验，保证在用户不传opt的时候 或者传了opt但是里面没有context的时候报错
    checkOpt: function checkOpt(opt) {
        if (!opt) {
            return {
                context: {}
            };
        } else if (opt && !opt.context) {
            opt.context = {};
            return opt;
        } else {
            return opt;
        }
    },

    /**
     * 按照css的顺序，返回一个[上,右,下,左]
     */
    getCssOrderArr: function getCssOrderArr(r) {
        var r1;
        var r2;
        var r3;
        var r4;

        if (typeof r === 'number') {
            r1 = r2 = r3 = r4 = r;
        } else if (r instanceof Array) {
            if (r.length === 1) {
                r1 = r2 = r3 = r4 = r[0];
            } else if (r.length === 2) {
                r1 = r3 = r[0];
                r2 = r4 = r[1];
            } else if (r.length === 3) {
                r1 = r[0];
                r2 = r4 = r[1];
                r3 = r[2];
            } else {
                r1 = r[0];
                r2 = r[1];
                r3 = r[2];
                r4 = r[3];
            }
        } else {
            r1 = r2 = r3 = r4 = 0;
        }
        return [r1, r2, r3, r4];
    },

    isWebGLSupported: function isWebGLSupported() {
        var contextOptions = { stencil: true };
        try {
            if (!window.WebGLRenderingContext) //不存在直接return
                {
                    return false;
                }
            var canvas = document.createElement('canvas'),
                gl = canvas.getContext('webgl', contextOptions) || canvas.getContext('experimental-webgl', contextOptions);
            return !!(gl && gl.getContextAttributes().stencil); //还要确实检测是否支持webGL模式
        } catch (e) {
            return false;
        }
    }
};

/**
 * Point
 *
 * @author 释剑 (李涛, litao.lt@alibaba-inc.com)
 */
var Point = function () {
    function Point() {
        var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        classCallCheck(this, Point);

        if (arguments.length == 1 && _typeof(arguments[0]) == 'object') {
            var arg = arguments[0];
            if ("x" in arg && "y" in arg) {
                this.x = arg.x * 1;
                this.y = arg.y * 1;
            } else {
                var i = 0;
                for (var p in arg) {
                    if (i == 0) {
                        this.x = arg[p] * 1;
                    } else {
                        this.y = arg[p] * 1;
                        break;
                    }
                    i++;
                }
            }
        } else {
            this.x = x * 1;
            this.y = y * 1;
        }
    }

    createClass(Point, [{
        key: "toArray",
        value: function toArray$$1() {
            return [this.x, this.y];
        }
    }]);
    return Point;
}();

/**
 * Canvax
 *
 * @author 释剑 (李涛, litao.lt@alibaba-inc.com)
 *
 * canvas 上委托的事件管理
 */
var CanvaxEvent = function CanvaxEvent(evt, params) {

    var eventType = "CanvaxEvent";
    if (_$1.isString(evt)) {
        eventType = evt;
    }
    if (_$1.isObject(evt) && evt.type) {
        eventType = evt.type;
    }

    this.target = null;
    this.currentTarget = null;
    this.type = eventType;
    this.point = null;

    this._stopPropagation = false; //默认不阻止事件冒泡
};
CanvaxEvent.prototype = {
    stopPropagation: function stopPropagation() {
        this._stopPropagation = true;
    }
};

var settings = {
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
    roundPixels: false
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
  PRECISION: 'mediump'

};

var addOrRmoveEventHand = function addOrRmoveEventHand(domHand, ieHand) {
    if (document[domHand]) {
        var _ret = function () {
            var eventDomFn = function eventDomFn(el, type, fn) {
                if (el.length) {
                    for (var i = 0; i < el.length; i++) {
                        eventDomFn(el[i], type, fn);
                    }
                } else {
                    el[domHand](type, fn, false);
                }
            };

            
            return {
                v: eventDomFn
            };
        }();

        if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
    } else {
        var _ret2 = function () {
            var eventFn = function eventFn(el, type, fn) {
                if (el.length) {
                    for (var i = 0; i < el.length; i++) {
                        eventFn(el[i], type, fn);
                    }
                } else {
                    el[ieHand]("on" + type, function () {
                        return fn.call(el, window.event);
                    });
                }
            };

            
            return {
                v: eventFn
            };
        }();

        if ((typeof _ret2 === "undefined" ? "undefined" : _typeof(_ret2)) === "object") return _ret2.v;
    }
};

var $ = {
    // dom操作相关代码
    query: function query(el) {
        if (_$1.isString(el)) {
            return document.getElementById(el);
        }
        if (el.nodeType == 1) {
            //则为一个element本身
            return el;
        }
        if (el.length) {
            return el[0];
        }
        return null;
    },
    offset: function offset(el) {
        var box = el.getBoundingClientRect(),
            doc = el.ownerDocument,
            body = doc.body,
            docElem = doc.documentElement,


        // for ie  
        clientTop = docElem.clientTop || body.clientTop || 0,
            clientLeft = docElem.clientLeft || body.clientLeft || 0,


        // In Internet Explorer 7 getBoundingClientRect property is treated as physical, 
        // while others are logical. Make all logical, like in IE8. 
        zoom = 1;
        if (body.getBoundingClientRect) {
            var bound = body.getBoundingClientRect();
            zoom = (bound.right - bound.left) / body.clientWidth;
        }
        if (zoom > 1) {
            clientTop = 0;
            clientLeft = 0;
        }
        var top = box.top / zoom + (window.pageYOffset || docElem && docElem.scrollTop / zoom || body.scrollTop / zoom) - clientTop,
            left = box.left / zoom + (window.pageXOffset || docElem && docElem.scrollLeft / zoom || body.scrollLeft / zoom) - clientLeft;

        return {
            top: top,
            left: left
        };
    },
    addEvent: addOrRmoveEventHand("addEventListener", "attachEvent"),
    removeEvent: addOrRmoveEventHand("removeEventListener", "detachEvent"),
    pageX: function pageX(e) {
        if (e.pageX) return e.pageX;else if (e.clientX) return e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);else return null;
    },
    pageY: function pageY(e) {
        if (e.pageY) return e.pageY;else if (e.clientY) return e.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);else return null;
    },
    /**
     * 创建dom
     * @param {string} id dom id 待用
     * @param {string} type : dom type， such as canvas, div etc.
     */
    createCanvas: function createCanvas(_width, _height, id) {
        var canvas = document.createElement("canvas");
        canvas.style.position = 'absolute';
        canvas.style.width = _width + 'px';
        canvas.style.height = _height + 'px';
        canvas.style.left = 0;
        canvas.style.top = 0;
        canvas.setAttribute('width', _width * settings.RESOLUTION);
        canvas.setAttribute('height', _height * settings.RESOLUTION);
        canvas.setAttribute('id', id);
        return canvas;
    },
    createView: function createView(_width, _height, id) {
        var view = document.createElement("div");
        view.className = "canvax-view";
        view.style.cssText += "position:relative;width:" + _width + "px;height:" + _height + "px;";

        var stage_c = document.createElement("div");
        view.style.cssText += "position:absolute;width:" + _width + "px;height:" + _height + "px;";

        //用来存放一些dom元素
        var dom_c = document.createElement("div");
        view.style.cssText += "position:absolute;width:" + _width + "px;height:" + _height + "px;";

        view.appendChild(stage_c);
        view.appendChild(dom_c);

        return {
            view: view,
            stage_c: stage_c,
            dom_c: dom_c
        };
    }
    //dom相关代码结束
};

/**
 * Canvax
 *
 * @author 释剑 (李涛, litao.lt@alibaba-inc.com)
 *
 */
var _mouseEventTypes = ["click", "dblclick", "mousedown", "mousemove", "mouseup", "mouseout"];
var _hammerEventTypes = ["pan", "panstart", "panmove", "panend", "pancancel", "panleft", "panright", "panup", "pandown", "press", "pressup", "swipe", "swipeleft", "swiperight", "swipeup", "swipedown", "tap"];

var EventHandler = function EventHandler(canvax, opt) {
    this.canvax = canvax;

    this.curPoints = [new Point(0, 0)]; //X,Y 的 point 集合, 在touch下面则为 touch的集合，只是这个touch被添加了对应的x，y
    //当前激活的点对应的obj，在touch下可以是个数组,和上面的 curPoints 对应
    this.curPointsTarget = [];

    this._touching = false;
    //正在拖动，前提是_touching=true
    this._draging = false;

    //当前的鼠标状态
    this._cursor = "default";

    this.target = this.canvax.view;
    this.types = [];

    //mouse体统中不需要配置drag,touch中会用到第三方的touch库，每个库的事件名称可能不一样，
    //就要这里配置，默认实现的是hammerjs的,所以默认可以在项目里引入hammerjs http://hammerjs.github.io/
    this.drag = {
        start: "panstart",
        move: "panmove",
        end: "panend"
    };

    _$1.extend(true, this, opt);
};

//这样的好处是document.compareDocumentPosition只会在定义的时候执行一次。
var contains = document.compareDocumentPosition ? function (parent, child) {
    if (!child) {
        return false;
    }
    return !!(parent.compareDocumentPosition(child) & 16);
} : function (parent, child) {
    if (!child) {
        return false;
    }
    return child !== child && (parent.contains ? parent.contains(child) : true);
};

EventHandler.prototype = {
    init: function init() {

        //依次添加上浏览器的自带事件侦听
        var me = this;
        if (me.target.nodeType == undefined) {
            //如果target.nodeType没有的话， 说明该target为一个jQuery对象 or kissy 对象or hammer对象
            //即为第三方库，那么就要对接第三方库的事件系统。默认实现hammer的大部分事件系统
            if (!me.types || me.types.length == 0) {
                me.types = _hammerEventTypes;
            }
        } else if (me.target.nodeType == 1) {
            me.types = _mouseEventTypes;
        }

        _$1.each(me.types, function (type) {
            //不再关心浏览器环境是否 'ontouchstart' in window 
            //而是直接只管传给事件模块的是一个原生dom还是 jq对象 or hammer对象等
            if (me.target.nodeType == 1) {
                $.addEvent(me.target, type, function (e) {
                    me.__mouseHandler(e);
                });
            } else {
                me.target.on(type, function (e) {
                    me.__libHandler(e);
                });
            }
        });
    },
    /*
    * 原生事件系统------------------------------------------------begin
    * 鼠标事件处理函数
    **/
    __mouseHandler: function __mouseHandler(e) {
        var me = this;
        var root = me.canvax;

        root.updateViewOffset();

        me.curPoints = [new Point($.pageX(e) - root.viewOffset.left, $.pageY(e) - root.viewOffset.top)];

        //理论上来说，这里拿到point了后，就要计算这个point对应的target来push到curPointsTarget里，
        //但是因为在drag的时候其实是可以不用计算对应target的。
        //所以放在了下面的me.__getcurPointsTarget( e , curMousePoint );常规mousemove中执行

        var curMousePoint = me.curPoints[0];
        var curMouseTarget = me.curPointsTarget[0];

        //模拟drag,mouseover,mouseout 部分代码 begin-------------------------------------------------

        //mousedown的时候 如果 curMouseTarget.dragEnabled 为true。就要开始准备drag了
        if (e.type == "mousedown") {
            //如果curTarget 的数组为空或者第一个为false ，，，
            if (!curMouseTarget) {
                var obj = root.getObjectsUnderPoint(curMousePoint, 1)[0];
                if (obj) {
                    me.curPointsTarget = [obj];
                }
            }
            curMouseTarget = me.curPointsTarget[0];
            if (curMouseTarget && curMouseTarget.dragEnabled) {
                //鼠标事件已经摸到了一个
                me._touching = true;
            }
        }

        if (e.type == "mouseup" || e.type == "mouseout" && !contains(root.view, e.toElement || e.relatedTarget)) {
            if (me._draging == true) {
                //说明刚刚在拖动
                me._dragEnd(e, curMouseTarget, 0);
                curMouseTarget.fire("dragend");
            }
            me._draging = false;
            me._touching = false;
        }

        if (e.type == "mouseout") {
            if (!contains(root.view, e.toElement || e.relatedTarget)) {
                me.__getcurPointsTarget(e, curMousePoint);
            }
        } else if (e.type == "mousemove") {
            //|| e.type == "mousedown" ){
            //拖动过程中就不在做其他的mouseover检测，drag优先
            if (me._touching && e.type == "mousemove" && curMouseTarget) {
                //说明正在拖动啊
                if (!me._draging) {
                    //begin drag
                    curMouseTarget.fire("dragstart");
                    //先把本尊给隐藏了
                    curMouseTarget.context.globalAlpha = 0;
                    //然后克隆一个副本到activeStage

                    var cloneObject = me._clone2hoverStage(curMouseTarget, 0);
                    cloneObject.context.globalAlpha = curMouseTarget._globalAlpha;
                } else {
                    //drag move ing
                    me._dragMoveHander(e, curMouseTarget, 0);
                }
                me._draging = true;
            } else {
                //常规mousemove检测
                //move事件中，需要不停的搜索target，这个开销挺大，
                //后续可以优化，加上和帧率相当的延迟处理
                me.__getcurPointsTarget(e, curMousePoint);
            }
        } else {
            //其他的事件就直接在target上面派发事件
            var child = curMouseTarget;
            if (!child) {
                child = root;
            }
            me.__dispatchEventInChilds(e, [child]);
            me._cursorHander(child);
        }

        if (root.preventDefault) {
            //阻止默认浏览器动作(W3C) 
            if (e && e.preventDefault) {
                e.preventDefault();
            } else {
                window.event.returnValue = false;
            }
        }
    },
    __getcurPointsTarget: function __getcurPointsTarget(e, point) {
        var me = this;
        var root = me.canvax;
        var oldObj = me.curPointsTarget[0];

        if (oldObj && !oldObj.context) {
            oldObj = null;
        }

        var e = new CanvaxEvent(e);

        if (e.type == "mousemove" && oldObj && oldObj._hoverClass && oldObj.pointChkPriority && oldObj.getChildInPoint(point)) {
            //小优化,鼠标move的时候。计算频率太大，所以。做此优化
            //如果有target存在，而且当前元素正在hoverStage中，而且当前鼠标还在target内,就没必要取检测整个displayList了
            //开发派发常规mousemove事件
            e.target = e.currentTarget = oldObj;
            e.point = oldObj.globalToLocal(point);
            oldObj.dispatchEvent(e);
            return;
        }
        var obj = root.getObjectsUnderPoint(point, 1)[0];

        if (oldObj && oldObj != obj || e.type == "mouseout") {
            if (oldObj && oldObj.context) {
                me.curPointsTarget[0] = null;
                e.type = "mouseout";
                e.toTarget = obj;
                e.target = e.currentTarget = oldObj;
                e.point = oldObj.globalToLocal(point);
                oldObj.dispatchEvent(e);
            }
        }

        if (obj && oldObj != obj) {
            //&& obj._hoverable 已经 干掉了
            me.curPointsTarget[0] = obj;
            e.type = "mouseover";
            e.fromTarget = oldObj;
            e.target = e.currentTarget = obj;
            e.point = obj.globalToLocal(point);
            obj.dispatchEvent(e);
        }

        if (e.type == "mousemove" && obj) {
            e.target = e.currentTarget = oldObj;
            e.point = oldObj.globalToLocal(point);
            oldObj.dispatchEvent(e);
        }
        me._cursorHander(obj, oldObj);
    },
    _cursorHander: function _cursorHander(obj, oldObj) {
        if (!obj && !oldObj) {
            this._setCursor("default");
        }
        if (obj && oldObj != obj && obj.context) {
            this._setCursor(obj.context.cursor);
        }
    },
    _setCursor: function _setCursor(cursor) {
        if (this._cursor == cursor) {
            //如果两次要设置的鼠标状态是一样的
            return;
        }
        this.canvax.view.style.cursor = cursor;
        this._cursor = cursor;
    },
    /*
    * 原生事件系统------------------------------------------------end
    */

    /*
     *第三方库的事件系统------------------------------------------------begin
     *触屏事件处理函数
     * */
    __libHandler: function __libHandler(e) {
        var me = this;
        var root = me.canvax;
        root.updateViewOffset();
        // touch 下的 curPointsTarget 从touches中来
        //获取canvax坐标系统里面的坐标
        me.curPoints = me.__getCanvaxPointInTouchs(e);
        if (!me._draging) {
            //如果在draging的话，target已经是选中了的，可以不用 检测了
            me.curPointsTarget = me.__getChildInTouchs(me.curPoints);
        }
        if (me.curPointsTarget.length > 0) {
            //drag开始
            if (e.type == me.drag.start) {
                //dragstart的时候touch已经准备好了target， curPointsTarget 里面只要有一个是有效的
                //就认为drags开始
                _$1.each(me.curPointsTarget, function (child, i) {
                    if (child && child.dragEnabled) {
                        //只要有一个元素就认为正在准备drag了
                        me._draging = true;
                        //然后克隆一个副本到activeStage
                        me._clone2hoverStage(child, i);
                        //先把本尊给隐藏了
                        child.context.globalAlpha = 0;

                        child.fire("dragstart");

                        return false;
                    }
                });
            }

            //dragIng
            if (e.type == me.drag.move) {
                if (me._draging) {
                    _$1.each(me.curPointsTarget, function (child, i) {
                        if (child && child.dragEnabled) {
                            me._dragMoveHander(e, child, i);
                        }
                    });
                }
            }

            //drag结束
            if (e.type == me.drag.end) {
                if (me._draging) {
                    _$1.each(me.curPointsTarget, function (child, i) {
                        if (child && child.dragEnabled) {
                            me._dragEnd(e, child, 0);
                            child.fire("dragend");
                        }
                    });
                    me._draging = false;
                }
            }
            me.__dispatchEventInChilds(e, me.curPointsTarget);
        } else {
            //如果当前没有一个target，就把事件派发到canvax上面
            me.__dispatchEventInChilds(e, [root]);
        }
    },
    //从touchs中获取到对应touch , 在上面添加上canvax坐标系统的x，y
    __getCanvaxPointInTouchs: function __getCanvaxPointInTouchs(e) {
        var me = this;
        var root = me.canvax;
        var curTouchs = [];
        _$1.each(e.point, function (touch) {
            curTouchs.push({
                x: CanvaxEvent.pageX(touch) - root.viewOffset.left,
                y: CanvaxEvent.pageY(touch) - root.viewOffset.top
            });
        });
        return curTouchs;
    },
    __getChildInTouchs: function __getChildInTouchs(touchs) {
        var me = this;
        var root = me.canvax;
        var touchesTarget = [];
        _$1.each(touchs, function (touch) {
            touchesTarget.push(root.getObjectsUnderPoint(touch, 1)[0]);
        });
        return touchesTarget;
    },
    /*
    *第三方库的事件系统------------------------------------------------begin
    */

    /*
     *@param {array} childs 
     * */
    __dispatchEventInChilds: function __dispatchEventInChilds(e, childs) {
        if (!childs && !("length" in childs)) {
            return false;
        }
        var me = this;
        var hasChild = false;
        _$1.each(childs, function (child, i) {
            if (child) {
                hasChild = true;
                var ce = new CanvaxEvent(e);
                ce.target = ce.currentTarget = child || this;
                ce.stagePoint = me.curPoints[i];
                ce.point = ce.target.globalToLocal(ce.stagePoint);
                child.dispatchEvent(ce);
            }
        });
        return hasChild;
    },
    //克隆一个元素到hover stage中去
    _clone2hoverStage: function _clone2hoverStage(target, i) {
        var me = this;
        var root = me.canvax;
        var _dragDuplicate = root._bufferStage.getChildById(target.id);
        if (!_dragDuplicate) {
            _dragDuplicate = target.clone(true);
            _dragDuplicate._transform = target.getConcatenatedMatrix();

            /**
             *TODO: 因为后续可能会有手动添加的 元素到_bufferStage 里面来
             *比如tips
             *这类手动添加进来的肯定是因为需要显示在最外层的。在hover元素之上。
             *所有自动添加的hover元素都默认添加在_bufferStage的最底层
             **/
            root._bufferStage.addChildAt(_dragDuplicate, 0);
        }
        _dragDuplicate.context.globalAlpha = target._globalAlpha;
        target._dragPoint = target.globalToLocal(me.curPoints[i]);
        return _dragDuplicate;
    },
    //drag 中 的处理函数
    _dragMoveHander: function _dragMoveHander(e, target, i) {
        var me = this;
        var root = me.canvax;
        var _point = target.globalToLocal(me.curPoints[i]);

        //要对应的修改本尊的位置，但是要告诉引擎不要watch这个时候的变化
        target._notWatch = true;
        var _moveStage = target.moveing;
        target.moveing = true;
        target.context.x += _point.x - target._dragPoint.x;
        target.context.y += _point.y - target._dragPoint.y;
        target.fire("dragmove");
        target.moveing = _moveStage;
        target._notWatch = false;
        //同步完毕本尊的位置

        //这里只能直接修改_transform 。 不能用下面的修改x，y的方式。
        var _dragDuplicate = root._bufferStage.getChildById(target.id);
        _dragDuplicate._transform = target.getConcatenatedMatrix();
        //以为直接修改的_transform不会出发心跳上报， 渲染引擎不制动这个stage需要绘制。
        //所以要手动出发心跳包
        _dragDuplicate.heartBeat();
    },
    //drag结束的处理函数
    _dragEnd: function _dragEnd(e, target, i) {
        var me = this;
        var root = me.canvax;

        //_dragDuplicate 复制在_bufferStage 中的副本
        var _dragDuplicate = root._bufferStage.getChildById(target.id);
        _dragDuplicate.destroy();

        target.context.globalAlpha = target._globalAlpha;
    }
};

/**
 * Canvax
 *
 * @author 释剑 (李涛, litao.lt@alibaba-inc.com)
 *
 * 事件管理类
 */
/**
 * 构造函数.
 * @name EventDispatcher
 * @class EventDispatcher类是可调度事件的类的基类，它允许显示列表上的任何对象都是一个事件目标。
 */
var EventManager = function EventManager() {
    //事件映射表，格式为：{type1:[listener1, listener2], type2:[listener3, listener4]}
    this._eventMap = {};
};

EventManager.prototype = {
    /*
     * 注册事件侦听器对象，以使侦听器能够接收事件通知。
     */
    _addEventListener: function _addEventListener(type, listener) {

        if (typeof listener != "function") {
            //listener必须是个function呐亲
            return false;
        }
        var addResult = true;
        var self = this;
        _$1.each(type.split(" "), function (type) {
            var map = self._eventMap[type];
            if (!map) {
                map = self._eventMap[type] = [];
                map.push(listener);
                self._eventEnabled = true;
                return true;
            }

            if (_$1.indexOf(map, listener) == -1) {
                map.push(listener);
                self._eventEnabled = true;
                return true;
            }

            addResult = false;
        });
        return addResult;
    },
    /**
     * 删除事件侦听器。
     */
    _removeEventListener: function _removeEventListener(type, listener) {
        if (arguments.length == 1) return this.removeEventListenerByType(type);

        var map = this._eventMap[type];
        if (!map) {
            return false;
        }

        for (var i = 0; i < map.length; i++) {
            var li = map[i];
            if (li === listener) {
                map.splice(i, 1);
                if (map.length == 0) {
                    delete this._eventMap[type];
                    //如果这个如果这个时候child没有任何事件侦听
                    if (_$1.isEmpty(this._eventMap)) {
                        //那么该元素不再接受事件的检测
                        this._eventEnabled = false;
                    }
                }
                return true;
            }
        }

        return false;
    },
    /**
     * 删除指定类型的所有事件侦听器。
     */
    _removeEventListenerByType: function _removeEventListenerByType(type) {
        var map = this._eventMap[type];
        if (!map) {
            delete this._eventMap[type];

            //如果这个如果这个时候child没有任何事件侦听
            if (_$1.isEmpty(this._eventMap)) {
                //那么该元素不再接受事件的检测
                this._eventEnabled = false;
            }

            return true;
        }
        return false;
    },
    /**
     * 删除所有事件侦听器。
     */
    _removeAllEventListeners: function _removeAllEventListeners() {
        this._eventMap = {};
        this._eventEnabled = false;
    },
    /**
    * 派发事件，调用事件侦听器。
    */
    _dispatchEvent: function _dispatchEvent(e) {
        var map = this._eventMap[e.type];

        if (map) {
            if (!e.target) e.target = this;
            map = map.slice();

            for (var i = 0; i < map.length; i++) {
                var listener = map[i];
                if (typeof listener == "function") {
                    listener.call(this, e);
                }
            }
        }

        if (!e._stopPropagation) {
            //向上冒泡
            if (this.parent) {
                e.currentTarget = this.parent;
                this.parent._dispatchEvent(e);
            }
        }
        return true;
    },
    /**
       * 检查是否为指定事件类型注册了任何侦听器。
       */
    _hasEventListener: function _hasEventListener(type) {
        var map = this._eventMap[type];
        return map != null && map.length > 0;
    }
};

/**
 * Canvax
 *
 * @author 释剑 (李涛, litao.lt@alibaba-inc.com)
 *
 * 事件派发类
 */
var EventDispatcher = function EventDispatcher() {
    EventDispatcher.superclass.constructor.call(this, name);
};

Utils.creatClass(EventDispatcher, EventManager, {
    on: function on(type, listener) {
        this._addEventListener(type, listener);
        return this;
    },
    addEventListener: function addEventListener(type, listener) {
        this._addEventListener(type, listener);
        return this;
    },
    un: function un(type, listener) {
        this._removeEventListener(type, listener);
        return this;
    },
    removeEventListener: function removeEventListener(type, listener) {
        this._removeEventListener(type, listener);
        return this;
    },
    removeEventListenerByType: function removeEventListenerByType(type) {
        this._removeEventListenerByType(type);
        return this;
    },
    removeAllEventListeners: function removeAllEventListeners() {
        this._removeAllEventListeners();
        return this;
    },

    //params 要传给evt的eventhandler处理函数的参数，会被merge到Canvax event中
    fire: function fire(eventType, params) {
        var e = new CanvaxEvent(eventType);

        if (params) {
            for (var p in params) {
                if (p in e) {
                    //params中的数据不能覆盖event属性
                    console.log(p + "属性不能覆盖CanvaxEvent属性");
                } else {
                    e[p] = params[p];
                }
            }
        }

        var me = this;
        _$1.each(eventType.split(" "), function (eType) {
            e.currentTarget = me;
            me.dispatchEvent(e);
        });
        return this;
    },
    dispatchEvent: function dispatchEvent(event) {
        //this instanceof DisplayObjectContainer ==> this.children
        //TODO: 这里import DisplayObjectContainer 的话，在displayObject里面的import EventDispatcher from "../event/EventDispatcher";
        //会得到一个undefined，感觉是成了一个循环依赖的问题，所以这里换用简单的判断来判断自己是一个容易，拥有children
        if (this.children && event.point) {
            var target = this.getObjectsUnderPoint(event.point, 1)[0];
            if (target) {
                target.dispatchEvent(event);
            }
            return;
        }

        if (this.context && event.type == "mouseover") {
            //记录dispatchEvent之前的心跳
            var preHeartBeat = this._heartBeatNum;
            var pregAlpha = this.context.globalAlpha;
            this._dispatchEvent(event);
            if (preHeartBeat != this._heartBeatNum) {
                this._hoverClass = true;
                if (this.hoverClone) {
                    var canvax = this.getStage().parent;
                    //然后clone一份obj，添加到_bufferStage 中
                    var activShape = this.clone(true);
                    activShape._transform = this.getConcatenatedMatrix();
                    canvax._bufferStage.addChildAt(activShape, 0);
                    //然后把自己隐藏了
                    this._globalAlpha = pregAlpha;
                    this.context.globalAlpha = 0;
                }
            }
            return;
        }

        this._dispatchEvent(event);

        if (this.context && event.type == "mouseout") {
            if (this._hoverClass) {
                //说明刚刚over的时候有添加样式
                var canvax = this.getStage().parent;
                this._hoverClass = false;

                canvax._bufferStage.removeChildById(this.id);

                if (this._globalAlpha) {
                    this.context.globalAlpha = this._globalAlpha;
                    delete this._globalAlpha;
                }
            }
        }

        return this;
    },
    hasEvent: function hasEvent(type) {
        return this._hasEventListener(type);
    },
    hasEventListener: function hasEventListener(type) {
        return this._hasEventListener(type);
    },
    hover: function hover(overFun, outFun) {
        this.on("mouseover", overFun);
        this.on("mouseout", outFun);
        return this;
    },
    once: function once(type, listener) {
        var me = this;
        var onceHandle = function onceHandle() {
            listener.apply(me, arguments);
            this.un(type, onceHandle);
        };
        this.on(type, onceHandle);
        return this;
    }
});

/**
 * Canvax
 *
 * @author 释剑 (李涛, litao.lt@alibaba-inc.com)
 *
 * | a | c | tx|
 * | b | d | ty|
 * | 0 | 0 | 1 |
 *
 * @class
 * @memberof PIXI
 *
 *
 * Matrix 矩阵库 用于整个系统的几何变换计算
 */

var Matrix = function Matrix(a, b, c, d, tx, ty) {
    this.a = a != undefined ? a : 1;
    this.b = b != undefined ? b : 0;
    this.c = c != undefined ? c : 0;
    this.d = d != undefined ? d : 1;
    this.tx = tx != undefined ? tx : 0;
    this.ty = ty != undefined ? ty : 0;
    this.array = null;
};

Matrix.prototype = {
    concat: function concat(mtx) {
        var a = this.a;
        var c = this.c;
        var tx = this.tx;

        this.a = a * mtx.a + this.b * mtx.c;
        this.b = a * mtx.b + this.b * mtx.d;
        this.c = c * mtx.a + this.d * mtx.c;
        this.d = c * mtx.b + this.d * mtx.d;
        this.tx = tx * mtx.a + this.ty * mtx.c + mtx.tx;
        this.ty = tx * mtx.b + this.ty * mtx.d + mtx.ty;
        return this;
    },
    concatTransform: function concatTransform(x, y, scaleX, scaleY, rotation) {
        var cos = 1;
        var sin = 0;
        if (rotation % 360) {
            var r = rotation * Math.PI / 180;
            cos = Math.cos(r);
            sin = Math.sin(r);
        }

        this.concat(new Matrix(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, x, y));
        return this;
    },
    rotate: function rotate(angle) {
        //目前已经提供对顺时针逆时针两个方向旋转的支持
        var cos = Math.cos(angle);
        var sin = Math.sin(angle);

        var a = this.a;
        var c = this.c;
        var tx = this.tx;

        if (angle > 0) {
            this.a = a * cos - this.b * sin;
            this.b = a * sin + this.b * cos;
            this.c = c * cos - this.d * sin;
            this.d = c * sin + this.d * cos;
            this.tx = tx * cos - this.ty * sin;
            this.ty = tx * sin + this.ty * cos;
        } else {
            var st = Math.sin(Math.abs(angle));
            var ct = Math.cos(Math.abs(angle));

            this.a = a * ct + this.b * st;
            this.b = -a * st + this.b * ct;
            this.c = c * ct + this.d * st;
            this.d = -c * st + ct * this.d;
            this.tx = ct * tx + st * this.ty;
            this.ty = ct * this.ty - st * tx;
        }
        return this;
    },
    scale: function scale(sx, sy) {
        this.a *= sx;
        this.d *= sy;
        this.tx *= sx;
        this.ty *= sy;
        return this;
    },
    translate: function translate(dx, dy) {
        this.tx += dx;
        this.ty += dy;
        return this;
    },
    identity: function identity() {
        //初始化
        this.a = this.d = 1;
        this.b = this.c = this.tx = this.ty = 0;
        return this;
    },
    invert: function invert() {
        //逆向矩阵
        var a = this.a;
        var b = this.b;
        var c = this.c;
        var d = this.d;
        var tx = this.tx;
        var i = a * d - b * c;

        this.a = d / i;
        this.b = -b / i;
        this.c = -c / i;
        this.d = a / i;
        this.tx = (c * this.ty - d * tx) / i;
        this.ty = -(a * this.ty - b * tx) / i;
        return this;
    },
    clone: function clone() {
        return new Matrix(this.a, this.b, this.c, this.d, this.tx, this.ty);
    },
    toArray: function toArray(transpose, out) {
        if (arguments.length == 0) {
            //canvas2d 中不会有任何的参数传入
            return [this.a, this.b, this.c, this.d, this.tx, this.ty];
        }

        //webgl的glsl需要用的时候，需要传入transpose 来转换为一个3*3完整矩阵
        if (!this.array) {
            this.array = new Float32Array(9);
        }

        var array = out || this.array;

        if (transpose) {
            array[0] = this.a;
            array[1] = this.b;
            array[2] = 0;
            array[3] = this.c;
            array[4] = this.d;
            array[5] = 0;
            array[6] = this.tx;
            array[7] = this.ty;
            array[8] = 1;
        } else {
            array[0] = this.a;
            array[1] = this.c;
            array[2] = this.tx;
            array[3] = this.b;
            array[4] = this.d;
            array[5] = this.ty;
            array[6] = 0;
            array[7] = 0;
            array[8] = 1;
        }

        return array;
    },
    /**
     * 矩阵左乘向量
     */
    mulVector: function mulVector(v) {
        var aa = this.a,
            ac = this.c,
            atx = this.tx;
        var ab = this.b,
            ad = this.d,
            aty = this.ty;

        var out = [0, 0];
        out[0] = v[0] * aa + v[1] * ac + atx;
        out[1] = v[0] * ab + v[1] * ad + aty;

        return out;
    }
};

/**
 * Tween.js - Licensed under the MIT license
 * https://github.com/tweenjs/tween.js
 * ----------------------------------------------
 *
 * See https://github.com/tweenjs/tween.js/graphs/contributors for the full list of contributors.
 * Thank you all, you're awesome!
 */

var TWEEN = TWEEN || function () {

	var _tweens = [];

	return {

		getAll: function getAll() {

			return _tweens;
		},

		removeAll: function removeAll() {

			_tweens = [];
		},

		add: function add(tween) {

			_tweens.push(tween);
		},

		remove: function remove(tween) {

			var i = _$1.indexOf(_tweens, tween); //_tweens.indexOf(tween);

			if (i !== -1) {
				_tweens.splice(i, 1);
			}
		},

		update: function update(time, preserve) {

			if (_tweens.length === 0) {
				return false;
			}

			var i = 0;

			time = time !== undefined ? time : TWEEN.now();

			while (i < _tweens.length) {

				/* old 
    if (_tweens[i].update(time) || preserve) {
    i++;
    } else {
    _tweens.splice(i, 1);
    }
    */

				//new code
				//in real world, tween.update has chance to remove itself, so we have to handle this situation.
				//in certain cases, onUpdateCallback will remove instances in _tweens, which make _tweens.splice(i, 1) fail
				//@litao.lt@alibaba-inc.com
				var _t = _tweens[i];
				var _updateRes = _t.update(time);

				if (!_tweens[i]) {
					break;
				}
				if (_t === _tweens[i]) {
					if (_updateRes || preserve) {
						i++;
					} else {
						_tweens.splice(i, 1);
					}
				}
			}

			return true;
		}
	};
}();

// Include a performance.now polyfill.
// In node.js, use process.hrtime.
if (typeof window === 'undefined' && typeof process !== 'undefined') {
	TWEEN.now = function () {
		var time = process.hrtime();

		// Convert [seconds, nanoseconds] to milliseconds.
		return time[0] * 1000 + time[1] / 1000000;
	};
}
// In a browser, use window.performance.now if it is available.
else if (typeof window !== 'undefined' && window.performance !== undefined && window.performance.now !== undefined) {
		// This must be bound, because directly assigning this function
		// leads to an invocation exception in Chrome.
		TWEEN.now = window.performance.now.bind(window.performance);
	}
	// Use Date.now if it is available.
	else if (Date.now !== undefined) {
			TWEEN.now = Date.now;
		}
		// Otherwise, use 'new Date().getTime()'.
		else {
				TWEEN.now = function () {
					return new Date().getTime();
				};
			}

TWEEN.Tween = function (object) {

	var _object = object;
	var _valuesStart = {};
	var _valuesEnd = {};
	var _valuesStartRepeat = {};
	var _duration = 1000;
	var _repeat = 0;
	var _repeatDelayTime;
	var _yoyo = false;
	var _isPlaying = false;
	var _reversed = false;
	var _delayTime = 0;
	var _startTime = null;
	var _easingFunction = TWEEN.Easing.Linear.None;
	var _interpolationFunction = TWEEN.Interpolation.Linear;
	var _chainedTweens = [];
	var _onStartCallback = null;
	var _onStartCallbackFired = false;
	var _onUpdateCallback = null;
	var _onCompleteCallback = null;
	var _onStopCallback = null;

	this.to = function (properties, duration) {

		_valuesEnd = properties;

		if (duration !== undefined) {
			_duration = duration;
		}

		return this;
	};

	this.start = function (time) {

		TWEEN.add(this);

		_isPlaying = true;

		_onStartCallbackFired = false;

		_startTime = time !== undefined ? time : TWEEN.now();
		_startTime += _delayTime;

		for (var property in _valuesEnd) {

			// Check if an Array was provided as property value
			if (_valuesEnd[property] instanceof Array) {

				if (_valuesEnd[property].length === 0) {
					continue;
				}

				// Create a local copy of the Array with the start value at the front
				_valuesEnd[property] = [_object[property]].concat(_valuesEnd[property]);
			}

			// If `to()` specifies a property that doesn't exist in the source object,
			// we should not set that property in the object
			if (_object[property] === undefined) {
				continue;
			}

			// Save the starting value.
			_valuesStart[property] = _object[property];

			if (_valuesStart[property] instanceof Array === false) {
				_valuesStart[property] *= 1.0; // Ensures we're using numbers, not strings
			}

			_valuesStartRepeat[property] = _valuesStart[property] || 0;
		}

		return this;
	};

	this.stop = function () {

		if (!_isPlaying) {
			return this;
		}

		TWEEN.remove(this);
		_isPlaying = false;

		if (_onStopCallback !== null) {
			_onStopCallback.call(_object, _object);
		}

		this.stopChainedTweens();
		return this;
	};

	this.end = function () {

		this.update(_startTime + _duration);
		return this;
	};

	this.stopChainedTweens = function () {

		for (var i = 0, numChainedTweens = _chainedTweens.length; i < numChainedTweens; i++) {
			_chainedTweens[i].stop();
		}
	};

	this.delay = function (amount) {

		_delayTime = amount;
		return this;
	};

	this.repeat = function (times) {

		_repeat = times;
		return this;
	};

	this.repeatDelay = function (amount) {

		_repeatDelayTime = amount;
		return this;
	};

	this.yoyo = function (yoyo) {

		_yoyo = yoyo;
		return this;
	};

	this.easing = function (easing) {

		_easingFunction = easing;
		return this;
	};

	this.interpolation = function (interpolation) {

		_interpolationFunction = interpolation;
		return this;
	};

	this.chain = function () {

		_chainedTweens = arguments;
		return this;
	};

	this.onStart = function (callback) {

		_onStartCallback = callback;
		return this;
	};

	this.onUpdate = function (callback) {

		_onUpdateCallback = callback;
		return this;
	};

	this.onComplete = function (callback) {

		_onCompleteCallback = callback;
		return this;
	};

	this.onStop = function (callback) {

		_onStopCallback = callback;
		return this;
	};

	this.update = function (time) {

		var property;
		var elapsed;
		var value;

		if (time < _startTime) {
			return true;
		}

		if (_onStartCallbackFired === false) {

			if (_onStartCallback !== null) {
				_onStartCallback.call(_object, _object);
			}

			_onStartCallbackFired = true;
		}

		elapsed = (time - _startTime) / _duration;
		elapsed = elapsed > 1 ? 1 : elapsed;

		value = _easingFunction(elapsed);

		for (property in _valuesEnd) {

			// Don't update properties that do not exist in the source object
			if (_valuesStart[property] === undefined) {
				continue;
			}

			var start = _valuesStart[property] || 0;
			var end = _valuesEnd[property];

			if (end instanceof Array) {

				_object[property] = _interpolationFunction(end, value);
			} else {

				// Parses relative end values with start as base (e.g.: +10, -3)
				if (typeof end === 'string') {

					if (end.charAt(0) === '+' || end.charAt(0) === '-') {
						end = start + parseFloat(end);
					} else {
						end = parseFloat(end);
					}
				}

				// Protect against non numeric properties.
				if (typeof end === 'number') {
					_object[property] = start + (end - start) * value;
				}
			}
		}

		if (_onUpdateCallback !== null) {
			_onUpdateCallback.call(_object, value);
		}

		if (elapsed === 1) {

			if (_repeat > 0) {

				if (isFinite(_repeat)) {
					_repeat--;
				}

				// Reassign starting values, restart by making startTime = now
				for (property in _valuesStartRepeat) {

					if (typeof _valuesEnd[property] === 'string') {
						_valuesStartRepeat[property] = _valuesStartRepeat[property] + parseFloat(_valuesEnd[property]);
					}

					if (_yoyo) {
						var tmp = _valuesStartRepeat[property];

						_valuesStartRepeat[property] = _valuesEnd[property];
						_valuesEnd[property] = tmp;
					}

					_valuesStart[property] = _valuesStartRepeat[property];
				}

				if (_yoyo) {
					_reversed = !_reversed;
				}

				if (_repeatDelayTime !== undefined) {
					_startTime = time + _repeatDelayTime;
				} else {
					_startTime = time + _delayTime;
				}

				return true;
			} else {

				if (_onCompleteCallback !== null) {

					_onCompleteCallback.call(_object, _object);
				}

				for (var i = 0, numChainedTweens = _chainedTweens.length; i < numChainedTweens; i++) {
					// Make the chained tweens start exactly at the time they should,
					// even if the `update()` method was called way past the duration of the tween
					_chainedTweens[i].start(_startTime + _duration);
				}

				return false;
			}
		}

		return true;
	};
};

TWEEN.Easing = {

	Linear: {

		None: function None(k) {

			return k;
		}

	},

	Quadratic: {

		In: function In(k) {

			return k * k;
		},

		Out: function Out(k) {

			return k * (2 - k);
		},

		InOut: function InOut(k) {

			if ((k *= 2) < 1) {
				return 0.5 * k * k;
			}

			return -0.5 * (--k * (k - 2) - 1);
		}

	},

	Cubic: {

		In: function In(k) {

			return k * k * k;
		},

		Out: function Out(k) {

			return --k * k * k + 1;
		},

		InOut: function InOut(k) {

			if ((k *= 2) < 1) {
				return 0.5 * k * k * k;
			}

			return 0.5 * ((k -= 2) * k * k + 2);
		}

	},

	Quartic: {

		In: function In(k) {

			return k * k * k * k;
		},

		Out: function Out(k) {

			return 1 - --k * k * k * k;
		},

		InOut: function InOut(k) {

			if ((k *= 2) < 1) {
				return 0.5 * k * k * k * k;
			}

			return -0.5 * ((k -= 2) * k * k * k - 2);
		}

	},

	Quintic: {

		In: function In(k) {

			return k * k * k * k * k;
		},

		Out: function Out(k) {

			return --k * k * k * k * k + 1;
		},

		InOut: function InOut(k) {

			if ((k *= 2) < 1) {
				return 0.5 * k * k * k * k * k;
			}

			return 0.5 * ((k -= 2) * k * k * k * k + 2);
		}

	},

	Sinusoidal: {

		In: function In(k) {

			return 1 - Math.cos(k * Math.PI / 2);
		},

		Out: function Out(k) {

			return Math.sin(k * Math.PI / 2);
		},

		InOut: function InOut(k) {

			return 0.5 * (1 - Math.cos(Math.PI * k));
		}

	},

	Exponential: {

		In: function In(k) {

			return k === 0 ? 0 : Math.pow(1024, k - 1);
		},

		Out: function Out(k) {

			return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
		},

		InOut: function InOut(k) {

			if (k === 0) {
				return 0;
			}

			if (k === 1) {
				return 1;
			}

			if ((k *= 2) < 1) {
				return 0.5 * Math.pow(1024, k - 1);
			}

			return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
		}

	},

	Circular: {

		In: function In(k) {

			return 1 - Math.sqrt(1 - k * k);
		},

		Out: function Out(k) {

			return Math.sqrt(1 - --k * k);
		},

		InOut: function InOut(k) {

			if ((k *= 2) < 1) {
				return -0.5 * (Math.sqrt(1 - k * k) - 1);
			}

			return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
		}

	},

	Elastic: {

		In: function In(k) {

			if (k === 0) {
				return 0;
			}

			if (k === 1) {
				return 1;
			}

			return -Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
		},

		Out: function Out(k) {

			if (k === 0) {
				return 0;
			}

			if (k === 1) {
				return 1;
			}

			return Math.pow(2, -10 * k) * Math.sin((k - 0.1) * 5 * Math.PI) + 1;
		},

		InOut: function InOut(k) {

			if (k === 0) {
				return 0;
			}

			if (k === 1) {
				return 1;
			}

			k *= 2;

			if (k < 1) {
				return -0.5 * Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
			}

			return 0.5 * Math.pow(2, -10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI) + 1;
		}

	},

	Back: {

		In: function In(k) {

			var s = 1.70158;

			return k * k * ((s + 1) * k - s);
		},

		Out: function Out(k) {

			var s = 1.70158;

			return --k * k * ((s + 1) * k + s) + 1;
		},

		InOut: function InOut(k) {

			var s = 1.70158 * 1.525;

			if ((k *= 2) < 1) {
				return 0.5 * (k * k * ((s + 1) * k - s));
			}

			return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
		}

	},

	Bounce: {

		In: function In(k) {

			return 1 - TWEEN.Easing.Bounce.Out(1 - k);
		},

		Out: function Out(k) {

			if (k < 1 / 2.75) {
				return 7.5625 * k * k;
			} else if (k < 2 / 2.75) {
				return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75;
			} else if (k < 2.5 / 2.75) {
				return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375;
			} else {
				return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
			}
		},

		InOut: function InOut(k) {

			if (k < 0.5) {
				return TWEEN.Easing.Bounce.In(k * 2) * 0.5;
			}

			return TWEEN.Easing.Bounce.Out(k * 2 - 1) * 0.5 + 0.5;
		}

	}

};

TWEEN.Interpolation = {

	Linear: function Linear(v, k) {

		var m = v.length - 1;
		var f = m * k;
		var i = Math.floor(f);
		var fn = TWEEN.Interpolation.Utils.Linear;

		if (k < 0) {
			return fn(v[0], v[1], f);
		}

		if (k > 1) {
			return fn(v[m], v[m - 1], m - f);
		}

		return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);
	},

	Bezier: function Bezier(v, k) {

		var b = 0;
		var n = v.length - 1;
		var pw = Math.pow;
		var bn = TWEEN.Interpolation.Utils.Bernstein;

		for (var i = 0; i <= n; i++) {
			b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
		}

		return b;
	},

	CatmullRom: function CatmullRom(v, k) {

		var m = v.length - 1;
		var f = m * k;
		var i = Math.floor(f);
		var fn = TWEEN.Interpolation.Utils.CatmullRom;

		if (v[0] === v[m]) {

			if (k < 0) {
				i = Math.floor(f = m * (1 + k));
			}

			return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);
		} else {

			if (k < 0) {
				return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);
			}

			if (k > 1) {
				return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
			}

			return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);
		}
	},

	Utils: {

		Linear: function Linear(p0, p1, t) {

			return (p1 - p0) * t + p0;
		},

		Bernstein: function Bernstein(n, i) {

			var fc = TWEEN.Interpolation.Utils.Factorial;

			return fc(n) / fc(i) / fc(n - i);
		},

		Factorial: function () {

			var a = [1];

			return function (n) {

				var s = 1;

				if (a[n]) {
					return a[n];
				}

				for (var i = n; i > 1; i--) {
					s *= i;
				}

				a[n] = s;
				return s;
			};
		}(),

		CatmullRom: function CatmullRom(p0, p1, p2, p3, t) {

			var v0 = (p2 - p0) * 0.5;
			var v1 = (p3 - p1) * 0.5;
			var t2 = t * t;
			var t3 = t * t2;

			return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
		}

	}

};

/**
 * 设置 AnimationFrame begin
 */
var lastTime = 0;
var vendors = ['ms', 'moz', 'webkit', 'o'];
for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
}
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function () {
            callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };
}
if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function (id) {
        clearTimeout(id);
    };
}

//管理所有图表的渲染任务
var _taskList = []; //[{ id : task: }...]
var _requestAid = null;

function enabledAnimationFrame() {
    if (!_requestAid) {
        _requestAid = requestAnimationFrame(function () {
            //console.log("frame__" + _taskList.length);
            //if ( Tween.getAll().length ) {
            TWEEN.update(); //tween自己会做length判断
            //};
            var currTaskList = _taskList;
            _taskList = [];
            _requestAid = null;
            while (currTaskList.length > 0) {
                currTaskList.shift().task();
            }
        });
    }
    return _requestAid;
}

/*
 * @param task 要加入到渲染帧队列中的任务
 * @result frameid
 */
function registFrame($frame) {
    if (!$frame) {
        return;
    }
    _taskList.push($frame);
    return enabledAnimationFrame();
}

/*
 *  @param task 要从渲染帧队列中删除的任务
 */
function destroyFrame($frame) {
    var d_result = false;
    for (var i = 0, l = _taskList.length; i < l; i++) {
        if (_taskList[i].id === $frame.id) {
            d_result = true;
            _taskList.splice(i, 1);
            i--;
            l--;
        }
    }
    if (_taskList.length == 0) {
        cancelAnimationFrame(_requestAid);
        _requestAid = null;
    }
    return d_result;
}

/* 
 * @param opt {from , to , onUpdate , onComplete , ......}
 * @result tween
 */
function registTween(options) {
    var opt = _$1.extend({
        from: null,
        to: null,
        duration: 500,
        onStart: function onStart() {},
        onUpdate: function onUpdate() {},
        onComplete: function onComplete() {},
        onStop: function onStop() {},
        repeat: 0,
        delay: 0,
        easing: 'Linear.None',
        desc: '' //动画描述，方便查找bug
    }, options);

    var tween = {};
    var tid = "tween_" + Utils.getUID();
    opt.id && (tid = tid + "_" + opt.id);

    if (opt.from && opt.to) {
        (function () {
            var animate = function animate() {

                if (tween._isCompleteed || tween._isStoped) {
                    tween = null;
                    return;
                }
                registFrame({
                    id: tid,
                    task: animate,
                    desc: opt.desc,
                    tween: tween
                });
            };

            tween = new TWEEN.Tween(opt.from).to(opt.to, opt.duration).onStart(function () {
                opt.onStart.apply(this);
            }).onUpdate(function () {
                opt.onUpdate.apply(this);
            }).onComplete(function () {
                destroyFrame({
                    id: tid
                });
                tween._isCompleteed = true;
                opt.onComplete.apply(this, [this]); //执行用户的conComplete
            }).onStop(function () {
                destroyFrame({
                    id: tid
                });
                tween._isStoped = true;
                opt.onStop.apply(this, [this]);
            }).repeat(opt.repeat).delay(opt.delay).easing(TWEEN.Easing[opt.easing.split(".")[0]][opt.easing.split(".")[1]]);

            tween.id = tid;
            tween.start();

            
            animate();
        })();
    }
    return tween;
}
/*
 * @param tween
 * @result void(0)
 */
function destroyTween(tween, msg) {
    tween.stop();
}

var AnimationFrame = {
    registFrame: registFrame,
    destroyFrame: destroyFrame,
    registTween: registTween,
    destroyTween: destroyTween
};

/**
 * Canvax
 *
 * @author 释剑 (李涛, litao.lt@alibaba-inc.com)
 *
 * 属性工厂，ie下面用VBS提供支持
 * 来给整个引擎提供心跳包的触发机制
 */
//定义封装好的兼容大部分浏览器的defineProperties 的 属性工厂
var unwatchOne = {
    "$skipArray": 0,
    "$watch": 1,
    "$fire": 2, //主要是get set 显性设置的 触发
    "$model": 3,
    "$accessor": 4,
    "$owner": 5,
    //"path"       : 6, //这个应该是唯一一个不用watch的不带$的成员了吧，因为地图等的path是在太大
    "$parent": 7 //用于建立数据的关系链
};

function Observe(scope, model, watchMore) {

    var stopRepeatAssign = true;

    var skipArray = scope.$skipArray,
        //要忽略监控的属性名列表
    pmodel = {},
        //要返回的对象
    accessores = {},
        //内部用于转换的对象
    VBPublics = _$1.keys(unwatchOne); //用于IE6-8

    model = model || {}; //这是pmodel上的$model属性
    watchMore = watchMore || {}; //以$开头但要强制监听的属性
    skipArray = _$1.isArray(skipArray) ? skipArray.concat(VBPublics) : VBPublics;

    function loop(name, val) {
        if (!unwatchOne[name] || unwatchOne[name] && name.charAt(0) !== "$") {
            model[name] = val;
        }
        var valueType = typeof val === "undefined" ? "undefined" : _typeof(val);
        if (valueType === "function") {
            if (!unwatchOne[name]) {
                VBPublics.push(name); //函数无需要转换
            }
        } else {
            if (_$1.indexOf(skipArray, name) !== -1 || name.charAt(0) === "$" && !watchMore[name]) {
                return VBPublics.push(name);
            }
            var accessor = function accessor(neo) {
                //创建监控属性或数组，自变量，由用户触发其改变
                var value = accessor.value,
                    preValue = value,
                    complexValue;

                if (arguments.length) {
                    //写操作
                    //set 的 值的 类型
                    var neoType = typeof neo === "undefined" ? "undefined" : _typeof(neo);

                    if (stopRepeatAssign) {
                        return; //阻止重复赋值
                    }
                    if (value !== neo) {
                        if (neo && neoType === "object" && !(neo instanceof Array) && !neo.addColorStop // neo instanceof CanvasGradient
                        ) {
                                value = neo.$model ? neo : Observe(neo, neo);
                                complexValue = value.$model;
                            } else {
                            //如果是其他数据类型
                            //if( neoType === "array" ){
                            //    value = _.clone(neo);
                            //} else {
                            value = neo;
                            //}
                        }
                        accessor.value = value;
                        model[name] = complexValue ? complexValue : value; //更新$model中的值
                        if (!complexValue) {
                            pmodel.$fire && pmodel.$fire(name, value, preValue);
                        }
                        if (valueType != neoType) {
                            //如果set的值类型已经改变，
                            //那么也要把对应的valueType修改为对应的neoType
                            valueType = neoType;
                        }
                        var hasWatchModel = pmodel;
                        //所有的赋值都要触发watch的监听事件
                        if (!pmodel.$watch) {
                            while (hasWatchModel.$parent) {
                                hasWatchModel = hasWatchModel.$parent;
                            }
                        }
                        if (hasWatchModel.$watch) {
                            hasWatchModel.$watch.call(hasWatchModel, name, value, preValue);
                        }
                    }
                } else {
                    //读操作
                    //读的时候，发现value是个obj，而且还没有defineProperty
                    //那么就临时defineProperty一次
                    if (value && valueType === "object" && !(value instanceof Array) && !value.$model && !value.addColorStop) {
                        //建立和父数据节点的关系
                        value.$parent = pmodel;
                        value = Observe(value, value);

                        //accessor.value 重新复制为defineProperty过后的对象
                        accessor.value = value;
                    }
                    return value;
                }
            };
            accessor.value = val;

            accessores[name] = {
                set: accessor,
                get: accessor,
                enumerable: true
            };
        }
    }

    for (var i in scope) {
        loop(i, scope[i]);
    }

    pmodel = defineProperties(pmodel, accessores, VBPublics); //生成一个空的ViewModel

    _$1.forEach(VBPublics, function (name) {
        if (scope[name]) {
            //先为函数等不被监控的属性赋值
            if (typeof scope[name] == "function") {
                pmodel[name] = function () {
                    scope[name].apply(this, arguments);
                };
            } else {
                pmodel[name] = scope[name];
            }
        }
    });

    pmodel.$model = model;
    pmodel.$accessor = accessores;

    pmodel.hasOwnProperty = function (name) {
        return name in pmodel.$model;
    };

    stopRepeatAssign = false;

    return pmodel;
}
var defineProperty$1 = Object.defineProperty;
//如果浏览器不支持ecma262v5的Object.defineProperties或者存在BUG，比如IE8
//标准浏览器使用__defineGetter__, __defineSetter__实现
try {
    defineProperty$1({}, "_", {
        value: "x"
    });
    var defineProperties = Object.defineProperties;
} catch (e) {
    if ("__defineGetter__" in Object) {
        defineProperty$1 = function defineProperty$$1(obj, prop, desc) {
            if ('value' in desc) {
                obj[prop] = desc.value;
            }
            if ('get' in desc) {
                obj.__defineGetter__(prop, desc.get);
            }
            if ('set' in desc) {
                obj.__defineSetter__(prop, desc.set);
            }
            return obj;
        };
        defineProperties = function defineProperties(obj, descs) {
            for (var prop in descs) {
                if (descs.hasOwnProperty(prop)) {
                    defineProperty$1(obj, prop, descs[prop]);
                }
            }
            return obj;
        };
    }
}
//IE6-8使用VBScript类的set get语句实现
if (!defineProperties && window.VBArray) {
    (function () {
        var VBMediator = function VBMediator(description, name, value) {
            var fn = description[name] && description[name].set;
            if (arguments.length === 3) {
                fn(value);
            } else {
                return fn();
            }
        };

        window.execScript(["Function parseVB(code)", "\tExecuteGlobal(code)", "End Function"].join("\n"), "VBScript");

        
        defineProperties = function defineProperties(publics, description, array) {
            publics = array.slice(0);
            publics.push("hasOwnProperty");
            var className = "VBClass" + setTimeout("1"),
                owner = {},
                buffer = [];
            buffer.push("Class " + className, "\tPrivate [__data__], [__proxy__]", "\tPublic Default Function [__const__](d, p)", "\t\tSet [__data__] = d: set [__proxy__] = p", "\t\tSet [__const__] = Me", //链式调用
            "\tEnd Function");
            _$1.forEach(publics, function (name) {
                //添加公共属性,如果此时不加以后就没机会了
                if (owner[name] !== true) {
                    owner[name] = true; //因为VBScript对象不能像JS那样随意增删属性
                    buffer.push("\tPublic [" + name + "]"); //你可以预先放到skipArray中
                }
            });
            for (var name in description) {
                owner[name] = true;
                buffer.push(
                //由于不知对方会传入什么,因此set, let都用上
                "\tPublic Property Let [" + name + "](val)", //setter
                "\t\tCall [__proxy__]([__data__], \"" + name + "\", val)", "\tEnd Property", "\tPublic Property Set [" + name + "](val)", //setter
                "\t\tCall [__proxy__]([__data__], \"" + name + "\", val)", "\tEnd Property", "\tPublic Property Get [" + name + "]", //getter
                "\tOn Error Resume Next", //必须优先使用set语句,否则它会误将数组当字符串返回
                "\t\tSet[" + name + "] = [__proxy__]([__data__],\"" + name + "\")", "\tIf Err.Number <> 0 Then", "\t\t[" + name + "] = [__proxy__]([__data__],\"" + name + "\")", "\tEnd If", "\tOn Error Goto 0", "\tEnd Property");
            }
            buffer.push("End Class"); //类定义完毕
            buffer.push("Function " + className + "Factory(a, b)", //创建实例并传入两个关键的参数
            "\tDim o", "\tSet o = (New " + className + ")(a, b)", "\tSet " + className + "Factory = o", "End Function");
            window.parseVB(buffer.join("\r\n")); //先创建一个VB类工厂
            return window[className + "Factory"](description, VBMediator); //得到其产品
        };
    })();
}

var RENDERER_TYPE = {
    UNKNOWN: 0,
    WEBGL: 1,
    CANVAS: 2
};

var DRAW_MODES = {
    POINTS: 0,
    LINES: 1,
    LINE_LOOP: 2,
    LINE_STRIP: 3,
    TRIANGLES: 4,
    TRIANGLE_STRIP: 5,
    TRIANGLE_FAN: 6
};

var SHAPES = {
    POLY: 0,
    RECT: 1,
    CIRC: 2,
    ELIP: 3,
    RREC: 4
};

var SCALE_MODES = {
    LINEAR: 0,
    NEAREST: 1
};

var CONTEXT_DEFAULT = {
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    scaleX: 1,
    scaleY: 1,
    scaleOrigin: {
        x: 0,
        y: 0
    },
    rotation: 0,
    rotateOrigin: {
        x: 0,
        y: 0
    },
    visible: true,
    globalAlpha: 1

};
var SHAPE_CONTEXT_DEFAULT = {
    cursor: "default",

    fillAlpha: 1, //context2d里没有，自定义
    fillStyle: null, //"#000000",

    lineCap: null, //默认都是直角
    lineJoin: null, //这两个目前webgl里面没实现
    miterLimit: null, //miterLimit 属性设置或返回最大斜接长度,只有当 lineJoin 属性为 "miter" 时，miterLimit 才有效。

    lineAlpha: 1, //context2d里没有，自定义
    strokeStyle: null,
    lineType: "solid", //context2d里没有，自定义线条的type，默认为实线
    lineWidth: null
};

/**
 * Canvax
 *
 * @author 释剑 (李涛, litao.lt@alibaba-inc.com)
 *
 * 模拟as3 DisplayList 的 现实对象基类
 */
var DisplayObject = function DisplayObject(opt) {
    DisplayObject.superclass.constructor.apply(this, arguments);

    //如果用户没有传入context设置，就默认为空的对象
    opt = Utils.checkOpt(opt);

    //相对父级元素的矩阵
    this._transform = null;

    //心跳次数
    this._heartBeatNum = 0;

    //元素对应的stage元素
    this.stage = null;

    //元素的父元素
    this.parent = null;

    this._eventEnabled = false; //是否响应事件交互,在添加了事件侦听后会自动设置为true

    this.dragEnabled = true; //"dragEnabled" in opt ? opt.dragEnabled : false;   //是否启用元素的拖拽

    this.xyToInt = "xyToInt" in opt ? opt.xyToInt : true; //是否对xy坐标统一int处理，默认为true，但是有的时候可以由外界用户手动指定是否需要计算为int，因为有的时候不计算比较好，比如，进度图表中，再sector的两端添加两个圆来做圆角的进度条的时候，圆circle不做int计算，才能和sector更好的衔接

    this.moveing = false; //如果元素在最轨道运动中的时候，最好把这个设置为true，这样能保证轨迹的丝搬顺滑，否则因为xyToInt的原因，会有跳跃

    //创建好context
    this._createContext(opt);

    this.id = Utils.createId(this.type || "displayObject");

    this.init.apply(this, arguments);

    //所有属性准备好了后，先要计算一次this._updateTransform()得到_tansform
    this._updateTransform();
};

Utils.creatClass(DisplayObject, EventDispatcher, {
    init: function init() {},
    _createContext: function _createContext(opt) {
        var self = this;
        //所有显示对象，都有一个类似canvas.context类似的 context属性
        //用来存取改显示对象所有和显示有关的属性，坐标，样式等。
        //该对象为Coer.Observe()工厂函数生成
        self.context = null;

        //提供给Coer.Observe() 来 给 self.context 设置 propertys
        //这里不能用_.extend， 因为要保证_contextATTRS的纯粹，只覆盖下面已有的属性
        var _contextATTRS = _$1.extend(_$1.clone(CONTEXT_DEFAULT), opt.context, true);

        //有些引擎内部设置context属性的时候是不用上报心跳的，比如做热点检测的时候
        self._notWatch = false;

        _contextATTRS.$owner = self;
        _contextATTRS.$watch = function (name, value, preValue) {

            //下面的这些属性变化，都会需要重新组织矩阵属性 _transform 
            var transFormProps = ["x", "y", "scaleX", "scaleY", "rotation", "scaleOrigin", "rotateOrigin, lineWidth"];

            if (_$1.indexOf(transFormProps, name) >= 0) {
                this.$owner._updateTransform();
            }

            if (this.$owner._notWatch) {
                return;
            }

            if (this.$owner.$watch) {
                this.$owner.$watch(name, value, preValue);
            }

            this.$owner.heartBeat({
                convertType: "context",
                shape: this.$owner,
                name: name,
                value: value,
                preValue: preValue
            });
        };

        //执行init之前，应该就根据参数，把context组织好线
        self.context = Observe(_contextATTRS);
    },
    /* @myself 是否生成自己的镜像 
     * 克隆又两种，一种是镜像，另外一种是绝对意义上面的新个体
     * 默认为绝对意义上面的新个体，新对象id不能相同
     * 镜像基本上是框架内部在实现  镜像的id相同 主要用来把自己画到另外的stage里面，比如
     * mouseover和mouseout的时候调用*/
    clone: function clone(myself) {
        var conf = {
            id: this.id,
            context: _$1.clone(this.context.$model)
        };

        var newObj;
        if (this.type == 'text') {
            newObj = new this.constructor(this.text, conf);
        } else {
            newObj = new this.constructor(conf);
        }

        newObj.id = conf.id;

        if (this.children) {
            newObj.children = this.children;
        }

        if (!myself) {
            newObj.id = Utils.createId(newObj.type);
        }
        return newObj;
    },
    heartBeat: function heartBeat(opt) {
        //stage存在，才说self代表的display已经被添加到了displayList中，绘图引擎需要知道其改变后
        //的属性，所以，通知到stage.displayAttrHasChange
        var stage = this.getStage();
        if (stage) {
            this._heartBeatNum++;
            stage.heartBeat && stage.heartBeat(opt);
        }
    },
    getCurrentWidth: function getCurrentWidth() {
        return Math.abs(this.context.width * this.context.scaleX);
    },
    getCurrentHeight: function getCurrentHeight() {
        return Math.abs(this.context.height * this.context.scaleY);
    },
    getStage: function getStage() {
        if (this.stage) {
            return this.stage;
        }
        var p = this;
        if (p.type != "stage") {
            while (p.parent) {
                p = p.parent;
                if (p.type == "stage") {
                    break;
                }
            }
            if (p.type !== "stage") {
                //如果得到的顶点display 的type不是Stage,也就是说不是stage元素
                //那么只能说明这个p所代表的顶端display 还没有添加到displayList中，也就是没有没添加到
                //stage舞台的childen队列中，不在引擎渲染范围内
                return false;
            }
        }
        //一直回溯到顶层object， 即是stage， stage的parent为null
        this.stage = p;
        return p;
    },
    localToGlobal: function localToGlobal(point, container) {
        !point && (point = new Point(0, 0));
        var cm = this.getConcatenatedMatrix(container);

        if (cm == null) return Point(0, 0);
        var m = new Matrix(1, 0, 0, 1, point.x, point.y);
        m.concat(cm);
        return new Point(m.tx, m.ty); //{x:m.tx, y:m.ty};
    },
    globalToLocal: function globalToLocal(point, container) {
        !point && (point = new Point(0, 0));

        if (this.type == "stage") {
            return point;
        }
        var cm = this.getConcatenatedMatrix(container);

        if (cm == null) return new Point(0, 0); //{x:0, y:0};
        cm.invert();
        var m = new Matrix(1, 0, 0, 1, point.x, point.y);
        m.concat(cm);
        return new Point(m.tx, m.ty); //{x:m.tx, y:m.ty};
    },
    localToTarget: function localToTarget(point, target) {
        var p = localToGlobal(point);
        return target.globalToLocal(p);
    },
    getConcatenatedMatrix: function getConcatenatedMatrix(container) {
        var cm = new Matrix();
        for (var o = this; o != null; o = o.parent) {
            cm.concat(o._transform);
            if (!o.parent || container && o.parent && o.parent == container || o.parent && o.parent.type == "stage") {
                //if( o.type == "stage" || (o.parent && container && o.parent.type == container.type ) ) {
                return cm; //break;
            }
        }
        return cm;
    },
    /*
     *设置元素的是否响应事件检测
     *@bool  Boolean 类型
     */
    setEventEnable: function setEventEnable(bool) {
        if (_$1.isBoolean(bool)) {
            this._eventEnabled = bool;
            return true;
        }
        return false;
    },
    /*
     *查询自己在parent的队列中的位置
     */
    getIndex: function getIndex() {
        if (!this.parent) {
            return;
        }
        return _$1.indexOf(this.parent.children, this);
    },
    /*
     *元素在z轴方向向下移动
     *@num 移动的层级
     */
    toBack: function toBack(num) {
        if (!this.parent) {
            return;
        }
        var fromIndex = this.getIndex();
        var toIndex = 0;

        if (_$1.isNumber(num)) {
            if (num == 0) {
                //原地不动
                return;
            }
            toIndex = fromIndex - num;
        }
        var me = this.parent.children.splice(fromIndex, 1)[0];
        if (toIndex < 0) {
            toIndex = 0;
        }
        this.parent.addChildAt(me, toIndex);
    },
    /*
     *元素在z轴方向向上移动
     *@num 移动的层数量 默认到顶端
     */
    toFront: function toFront(num) {
        if (!this.parent) {
            return;
        }
        var fromIndex = this.getIndex();
        var pcl = this.parent.children.length;
        var toIndex = pcl;

        if (_$1.isNumber(num)) {
            if (num == 0) {
                //原地不动
                return;
            }
            toIndex = fromIndex + num + 1;
        }
        var me = this.parent.children.splice(fromIndex, 1)[0];
        if (toIndex > pcl) {
            toIndex = pcl;
        }
        this.parent.addChildAt(me, toIndex - 1);
    },
    _updateTransform: function _updateTransform() {
        var _transform = new Matrix();
        _transform.identity();
        var context = this.context;
        //是否需要Transform
        if (context.scaleX !== 1 || context.scaleY !== 1) {
            //如果有缩放
            //缩放的原点坐标
            var origin = new Point(context.scaleOrigin);
            if (origin.x || origin.y) {
                _transform.translate(-origin.x, -origin.y);
            }
            _transform.scale(context.scaleX, context.scaleY);
            if (origin.x || origin.y) {
                _transform.translate(origin.x, origin.y);
            }
        }

        var rotation = context.rotation;
        if (rotation) {
            //如果有旋转
            //旋转的原点坐标
            var origin = new Point(context.rotateOrigin);
            if (origin.x || origin.y) {
                _transform.translate(-origin.x, -origin.y);
            }
            _transform.rotate(rotation % 360 * Math.PI / 180);
            if (origin.x || origin.y) {
                _transform.translate(origin.x, origin.y);
            }
        }

        //如果有位移
        var x, y;
        if (this.xyToInt && !this.moveing) {
            //当这个元素在做轨迹运动的时候，比如drag，animation如果实时的调整这个x ， y
            //那么该元素的轨迹会有跳跃的情况发生。所以加个条件过滤，
            var x = parseInt(context.x);
            var y = parseInt(context.y);

            if (parseInt(context.lineWidth, 10) % 2 == 1 && context.strokeStyle) {
                x += 0.5;
                y += 0.5;
            }
        } else {
            x = context.x;
            y = context.y;
        }

        if (x != 0 || y != 0) {
            _transform.translate(x, y);
        }
        this._transform = _transform;
        return _transform;
    },
    //显示对象的选取检测处理函数
    getChildInPoint: function getChildInPoint(point) {

        var result = false; //检测的结果

        //第一步，吧glob的point转换到对应的obj的层级内的坐标系统
        if (this.type != "stage" && this.parent && this.parent.type != "stage") {
            point = this.parent.globalToLocal(point);
        }

        var x = point.x;
        var y = point.y;

        //对鼠标的坐标也做相同的变换
        if (this._transform) {
            var inverseMatrix = this._transform.clone().invert();
            var originPos = [x, y];
            originPos = inverseMatrix.mulVector(originPos);

            x = originPos[0];
            y = originPos[1];
        }

        if (this.graphics) {
            result = this.graphics.containsPoint({ x: x, y: y });
        }

        return result;
    },
    /*
    * animate
    * @param toContent 要动画变形到的属性集合
    * @param options tween 动画参数
    */
    animate: function animate(toContent, options) {
        var to = toContent;
        var from = {};
        for (var p in to) {
            from[p] = this.context[p];
        }
        !options && (options = {});
        options.from = from;
        options.to = to;

        var self = this;
        var upFun = function upFun() {};
        if (options.onUpdate) {
            upFun = options.onUpdate;
        }
        var tween;
        options.onUpdate = function () {
            //如果context不存在说明该obj已经被destroy了，那么要把他的tween给destroy
            if (!self.context && tween) {
                AnimationFrame.destroyTween(tween);
                tween = null;
                return;
            }
            for (var p in this) {
                self.context[p] = this[p];
            }
            upFun.apply(self, [this]);
        };
        var compFun = function compFun() {};
        if (options.onComplete) {
            compFun = options.onComplete;
        }
        options.onComplete = function (opt) {
            compFun.apply(self, arguments);
        };
        tween = AnimationFrame.registTween(options);
        return tween;
    },

    //渲染相关部分，迁移到renderers中去
    _render: function _render(ctx) {
        if (!this.context.visible || this.context.globalAlpha <= 0) {
            return;
        }
        ctx.save();

        var transForm = this._transform;
        if (!transForm) {
            transForm = this._updateTransform();
        }
        //运用矩阵开始变形
        ctx.transform.apply(ctx, transForm.toArray());

        //设置样式，文本有自己的设置样式方式
        if (this.type != "text") {
            var style = this.context.$model;
            for (var p in style) {
                if (p != "textBaseline" && p in ctx) {
                    if (style[p] || _$1.isNumber(style[p])) {
                        if (p == "globalAlpha") {
                            //透明度要从父节点继承
                            ctx[p] *= style[p];
                        } else {
                            ctx[p] = style[p];
                        }
                    }
                }
            }
        }

        this.render(ctx);
        ctx.restore();
    },
    render: function render(ctx) {
        //基类不提供render的具体实现，由后续具体的派生类各自实现
    },
    //从树中删除
    remove: function remove() {
        if (this.parent) {
            this.parent.removeChild(this);
            this.parent = null;
        }
    },
    //元素的自我销毁
    destroy: function destroy() {
        this.remove();
        this.fire("destroy");
        //把自己从父节点中删除了后做自我清除，释放内存
        this.context = null;
        delete this.context;
    }
});

/**
 * Canvax
 *
 * @author 释剑 (李涛, litao.lt@alibaba-inc.com)
 *
 * 模拟as3的DisplayList 中的容器类
 */
var DisplayObjectContainer = function DisplayObjectContainer(opt) {
    var self = this;
    self.children = [];
    self.mouseChildren = [];
    DisplayObjectContainer.superclass.constructor.apply(this, arguments);

    //所有的容器默认支持event 检测，因为 可能有里面的shape是eventEnable是true的
    //如果用户有强制的需求让容器下的所有元素都 不可检测，可以调用
    //DisplayObjectContainer的 setEventEnable() 方法
    self._eventEnabled = true;
};

Utils.creatClass(DisplayObjectContainer, DisplayObject, {
    addChild: function addChild(child) {
        if (!child) {
            return;
        }
        if (this.getChildIndex(child) != -1) {
            child.parent = this;
            return child;
        }
        //如果他在别的子元素中，那么就从别人那里删除了
        if (child.parent) {
            child.parent.removeChild(child);
        }
        this.children.push(child);
        child.parent = this;
        if (this.heartBeat) {
            this.heartBeat({
                convertType: "children",
                target: child,
                src: this
            });
        }

        if (this._afterAddChild) {
            this._afterAddChild(child);
        }

        return child;
    },
    addChildAt: function addChildAt(child, index) {
        if (this.getChildIndex(child) != -1) {
            child.parent = this;
            return child;
        }
        if (child.parent) {
            child.parent.removeChild(child);
        }
        this.children.splice(index, 0, child);
        child.parent = this;

        //上报children心跳
        if (this.heartBeat) {
            this.heartBeat({
                convertType: "children",
                target: child,
                src: this
            });
        }

        if (this._afterAddChild) {
            this._afterAddChild(child, index);
        }

        return child;
    },
    removeChild: function removeChild(child) {
        return this.removeChildAt(_$1.indexOf(this.children, child));
    },
    removeChildAt: function removeChildAt(index) {
        if (index < 0 || index > this.children.length - 1) {
            return false;
        }
        var child = this.children[index];
        if (child != null) {
            child.parent = null;
        }
        this.children.splice(index, 1);

        if (this.heartBeat) {
            this.heartBeat({
                convertType: "children",
                target: child,
                src: this
            });
        }

        if (this._afterDelChild) {
            this._afterDelChild(child, index);
        }

        return child;
    },
    removeChildById: function removeChildById(id) {
        for (var i = 0, len = this.children.length; i < len; i++) {
            if (this.children[i].id == id) {
                return this.removeChildAt(i);
            }
        }
        return false;
    },
    removeAllChildren: function removeAllChildren() {
        while (this.children.length > 0) {
            this.removeChildAt(0);
        }
    },
    //集合类的自我销毁
    destroy: function destroy() {
        if (this.parent) {
            this.parent.removeChild(this);
            this.parent = null;
        }
        this.fire("destroy");
        //依次销毁所有子元素
        for (var i = 0, l = this.children.length; i < l; i++) {
            this.getChildAt(i).destroy();
            i--;
            l--;
        }
    },
    /*
     *@id 元素的id
     *@boolen 是否深度查询，默认就在第一层子元素中查询
     **/
    getChildById: function getChildById(id, boolen) {
        if (!boolen) {
            for (var i = 0, len = this.children.length; i < len; i++) {
                if (this.children[i].id == id) {
                    return this.children[i];
                }
            }
        } else {
            //深度查询
            //TODO:暂时未实现
            return null;
        }
        return null;
    },
    getChildAt: function getChildAt(index) {
        if (index < 0 || index > this.children.length - 1) return null;
        return this.children[index];
    },
    getChildIndex: function getChildIndex(child) {
        return _$1.indexOf(this.children, child);
    },
    setChildIndex: function setChildIndex(child, index) {
        if (child.parent != this) return;
        var oldIndex = _$1.indexOf(this.children, child);
        if (index == oldIndex) return;
        this.children.splice(oldIndex, 1);
        this.children.splice(index, 0, child);
    },
    getNumChildren: function getNumChildren() {
        return this.children.length;
    },
    //获取x,y点上的所有object  num 需要返回的obj数量
    getObjectsUnderPoint: function getObjectsUnderPoint(point, num) {
        var result = [];

        for (var i = this.children.length - 1; i >= 0; i--) {
            var child = this.children[i];

            if (child == null || !child._eventEnabled && !child.dragEnabled || !child.context.visible) {
                continue;
            }
            if (child instanceof DisplayObjectContainer) {
                //是集合
                if (child.mouseChildren && child.getNumChildren() > 0) {
                    var objs = child.getObjectsUnderPoint(point);
                    if (objs.length > 0) {
                        result = result.concat(objs);
                    }
                }
            } else {
                //非集合，可以开始做getChildInPoint了
                if (child.getChildInPoint(point)) {
                    result.push(child);
                    if (num != undefined && !isNaN(num)) {
                        if (result.length == num) {
                            return result;
                        }
                    }
                }
            }
        }
        return result;
    }
});

/**
 * Canvax
 *
 * @author 释剑 (李涛, litao.lt@alibaba-inc.com)
 *
 * stage 类， 再as3中，stage则代表整个舞台。是唯一的根节点
 * 但是再canvax中，因为分层设计的需要。stage 舞台 同样代表一个canvas元素，但是不是再整个引擎设计
 * 里面， 不是唯一的根节点。而是会交由canvax类来统一管理其层级
 */
var Stage = function Stage() {
    var self = this;
    self.type = "stage";
    self.canvas = null;
    self.ctx = null; //渲染的时候由renderer决定,这里不做初始值
    //stage正在渲染中
    self.stageRending = false;
    self._isReady = false;
    Stage.superclass.constructor.apply(this, arguments);
};
Utils.creatClass(Stage, DisplayObjectContainer, {
    init: function init() {},
    //由canvax的afterAddChild 回调
    initStage: function initStage(canvas, width, height) {
        var self = this;
        self.canvas = canvas;
        self.context.width = width;
        self.context.height = height;
        self.context.scaleX = Utils._devicePixelRatio;
        self.context.scaleY = Utils._devicePixelRatio;
        self._isReady = true;
    },
    heartBeat: function heartBeat(opt) {
        //shape , name , value , preValue 
        //displayList中某个属性改变了
        if (!this._isReady) {
            //在stage还没初始化完毕的情况下，无需做任何处理
            return;
        }
        opt || (opt = {}); //如果opt为空，说明就是无条件刷新
        opt.stage = this;

        //TODO临时先这么处理
        this.parent && this.parent.heartBeat(opt);
    }
});

var SystemRenderer = function () {
    function SystemRenderer() {
        var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : RENDERER_TYPE.UNKNOWN;
        var app = arguments[1];
        var options = arguments[2];
        classCallCheck(this, SystemRenderer);

        this.type = type; //2canvas,1webgl
        this.app = app;

        // prepare options
        if (options) {
            for (var i in settings.RENDER_OPTIONS) {
                if (typeof options[i] === 'undefined') {
                    options[i] = settings.RENDER_OPTIONS[i];
                }
            }
        } else {
            options = settings.RENDER_OPTIONS;
        }

        this.options = options;

        this.requestAid = null;

        this._heartBeat = false; //心跳，默认为false，即false的时候引擎处于静默状态 true则启动渲染

        this._preRenderTime = 0;
    }

    //如果引擎处于静默状态的话，就会启动


    createClass(SystemRenderer, [{
        key: 'startEnter',
        value: function startEnter() {
            var self = this;
            if (!self.requestAid) {
                self.requestAid = AnimationFrame.registFrame({
                    id: "enterFrame", //同时肯定只有一个enterFrame的task
                    task: function task() {
                        self.enterFrame.apply(self);
                    }
                });
            }
        }
    }, {
        key: 'enterFrame',
        value: function enterFrame() {
            var self = this;
            //不管怎么样，enterFrame执行了就要把
            //requestAid null 掉
            self.requestAid = null;
            Utils.now = new Date().getTime();
            if (self._heartBeat) {

                var _begin = new Date().getTime();
                self.render(this.app);
                var _end = new Date().getTime();
                console.log(_end - _begin);

                self._heartBeat = false;
                //渲染完了，打上最新时间挫
                self._preRenderTime = new Date().getTime();
            }
        }
    }, {
        key: '_convertCanvax',
        value: function _convertCanvax(opt) {
            var me = this;
            _$1.each(me.app.children, function (stage) {
                stage.context[opt.name] = opt.value;
            });
        }
    }, {
        key: 'heartBeat',
        value: function heartBeat(opt) {
            //displayList中某个属性改变了
            var self = this;
            if (opt) {
                //心跳包有两种，一种是某元素的可视属性改变了。一种是children有变动
                //分别对应convertType  为 context  and children
                if (opt.convertType == "context") {
                    var stage = opt.stage;
                    var shape = opt.shape;
                    var name = opt.name;
                    var value = opt.value;
                    var preValue = opt.preValue;

                    if (shape.type == "canvax") {
                        self._convertCanvax(opt);
                    } else {
                        if (!self.app.convertStages[stage.id]) {
                            self.app.convertStages[stage.id] = {
                                stage: stage,
                                convertShapes: {}
                            };
                        }
                        if (shape) {
                            if (!self.app.convertStages[stage.id].convertShapes[shape.id]) {
                                self.app.convertStages[stage.id].convertShapes[shape.id] = {
                                    shape: shape,
                                    convertType: opt.convertType
                                };
                            } else {
                                //如果已经上报了该 shape 的心跳。
                                return;
                            }
                        }
                    }
                }

                if (opt.convertType == "children") {
                    //元素结构变化，比如addchild removeChild等
                    var target = opt.target;
                    var stage = opt.src.getStage();
                    if (stage || target.type == "stage") {
                        //如果操作的目标元素是Stage
                        stage = stage || target;
                        if (!self.app.convertStages[stage.id]) {
                            self.app.convertStages[stage.id] = {
                                stage: stage,
                                convertShapes: {}
                            };
                        }
                    }
                }

                if (!opt.convertType) {
                    //无条件要求刷新
                    var stage = opt.stage;
                    if (!self.app.convertStages[stage.id]) {
                        self.app.convertStages[stage.id] = {
                            stage: stage,
                            convertShapes: {}
                        };
                    }
                }
            } else {
                //无条件要求全部刷新，一般用在resize等。
                _$1.each(self.app.children, function (stage, i) {
                    self.app.convertStages[stage.id] = {
                        stage: stage,
                        convertShapes: {}
                    };
                });
            }
            if (!self._heartBeat) {
                //如果发现引擎在静默状态，那么就唤醒引擎
                self._heartBeat = true;
                self.startEnter();
            } else {
                //否则智慧继续确认心跳
                self._heartBeat = true;
            }
        }
    }]);
    return SystemRenderer;
}();

var CanvasGraphicsRenderer = function () {
    function CanvasGraphicsRenderer(renderer) {
        classCallCheck(this, CanvasGraphicsRenderer);

        this.renderer = renderer;
    }

    /**
    * @param displayObject
    * @stage 也可以displayObject.getStage()获取。
    */


    createClass(CanvasGraphicsRenderer, [{
        key: 'render',
        value: function render(displayObject, stage) {

            var graphics = displayObject.graphics;
            var renderer = this.renderer;
            var ctx = stage.ctx;
            var context = displayObject.context;

            if (displayObject.parent) {
                context.globalAlpha *= displayObject.parent.context.globalAlpha;
            }

            for (var i = 0; i < graphics.graphicsData.length; i++) {
                var data = graphics.graphicsData[i];
                var shape = data.shape;

                var fillStyle = data.fillStyle;
                var strokeStyle = data.strokeStyle;

                ctx.lineWidth = data.lineWidth;

                if (data.type === SHAPES.POLY) {
                    ctx.beginPath();

                    this.renderPolygon(shape.points, shape.closed, ctx);

                    if (data.hasFill()) {
                        ctx.globalAlpha = data.fillAlpha;
                        ctx.fillStyle = fillStyle;
                        ctx.fill();
                    }
                    if (data.hasLine()) {
                        ctx.globalAlpha = data.lineAlpha;
                        ctx.strokeStyle = strokeStyle;
                        ctx.stroke();
                    }
                } else if (data.type === SHAPES.RECT) {
                    if (data.hasFill()) {
                        ctx.globalAlpha = data.fillAlpha;
                        ctx.fillStyle = fillStyle;
                        ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
                    }
                    if (data.hasLine()) {
                        ctx.globalAlpha = data.lineAlpha;
                        ctx.strokeStyle = strokeStyle;
                        ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
                    }
                } else if (data.type === SHAPES.CIRC) {

                    // TODO - need to be Undefined!
                    ctx.beginPath();
                    ctx.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI);
                    ctx.closePath();

                    if (data.hasFill()) {
                        ctx.globalAlpha = data.fillAlpha;
                        ctx.fillStyle = fillStyle;
                        ctx.fill();
                    }
                    if (data.hasLine()) {
                        ctx.globalAlpha = data.lineAlpha;
                        ctx.strokeStyle = strokeStyle;
                        ctx.stroke();
                    }
                } else if (data.type === SHAPES.ELIP) {
                    var w = shape.width * 2;
                    var h = shape.height * 2;

                    var x = shape.x - w / 2;
                    var y = shape.y - h / 2;

                    ctx.beginPath();

                    var kappa = 0.5522848;
                    var ox = w / 2 * kappa; // control point offset horizontal
                    var oy = h / 2 * kappa; // control point offset vertical
                    var xe = x + w; // x-end
                    var ye = y + h; // y-end
                    var xm = x + w / 2; // x-middle
                    var ym = y + h / 2; // y-middle

                    ctx.moveTo(x, ym);
                    ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
                    ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
                    ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
                    ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);

                    ctx.closePath();

                    if (data.hasFill()) {
                        ctx.globalAlpha = data.fillAlpha;
                        ctx.fillStyle = fillStyle;
                        ctx.fill();
                    }
                    if (data.hasLine()) {
                        ctx.globalAlpha = data.lineAlpha;
                        ctx.strokeStyle = strokeStyle;
                        ctx.stroke();
                    }
                }
            }
        }
    }, {
        key: 'renderPolygon',
        value: function renderPolygon(points, close, ctx) {
            ctx.moveTo(points[0], points[1]);

            for (var j = 1; j < points.length / 2; ++j) {
                ctx.lineTo(points[j * 2], points[j * 2 + 1]);
            }

            if (close) {
                ctx.closePath();
            }
        }
    }]);
    return CanvasGraphicsRenderer;
}();

var CanvasRenderer = function (_SystemRenderer) {
    inherits(CanvasRenderer, _SystemRenderer);

    function CanvasRenderer(app) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        classCallCheck(this, CanvasRenderer);

        var _this = possibleConstructorReturn(this, (CanvasRenderer.__proto__ || Object.getPrototypeOf(CanvasRenderer)).call(this, RENDERER_TYPE.CANVAS, app, options));

        _this.CGR = new CanvasGraphicsRenderer(_this);
        return _this;
    }

    createClass(CanvasRenderer, [{
        key: 'render',
        value: function render(app) {
            var me = this;
            me.app = app;
            _$1.each(_$1.values(app.convertStages), function (convertStage) {
                me.renderStage(convertStage.stage);
            });
            app.convertStages = {};
        }
    }, {
        key: 'renderStage',
        value: function renderStage(stage) {
            if (!stage.ctx) {
                stage.ctx = stage.canvas.getContext("2d");
            }
            stage.stageRending = true;
            this._clear(stage);
            this._render(stage);
            stage.stageRending = false;
        }
    }, {
        key: '_render',
        value: function _render(stage, displayObject) {
            if (!displayObject) {
                displayObject = stage;
            }

            if (!displayObject.context.visible || displayObject.context.globalAlpha <= 0) {
                return;
            }

            var ctx = stage.ctx;

            ctx.save();

            var transForm = displayObject._transform;
            if (!transForm) {
                transForm = displayObject._updateTransform();
            }
            //运用矩阵开始变形
            ctx.transform.apply(ctx, transForm.toArray());

            if (displayObject.graphics) {
                this.CGR.render(displayObject, stage);
            }

            if (displayObject.children) {
                for (var i = 0, len = displayObject.children.length; i < len; i++) {
                    this._render(stage, displayObject.children[i]);
                }
            }

            ctx.restore();
        }
    }, {
        key: '_clear',
        value: function _clear(stage) {
            //TODO:这里有点 奇怪， 之前的版本clearRect的时候，不需要 *RESOLUTION（分辨率）
            stage.ctx.clearRect(0, 0, this.app.width * settings.RESOLUTION, this.app.height * settings.RESOLUTION);
        }
    }]);
    return CanvasRenderer;
}(SystemRenderer);

/**
 * The Point object represents a location in a two-dimensional coordinate system, where x represents
 * the horizontal axis and y represents the vertical axis.
 *
 * @class
 * @memberof PIXI
 */
var Point$2 = function () {
  /**
   * @param {number} [x=0] - position of the point on the x axis
   * @param {number} [y=0] - position of the point on the y axis
   */
  function Point() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    classCallCheck(this, Point);

    /**
     * @member {number}
     * @default 0
     */
    this.x = x;

    /**
     * @member {number}
     * @default 0
     */
    this.y = y;
  }

  /**
   * Creates a clone of this point
   *
   * @return {PIXI.Point} a copy of the point
   */


  createClass(Point, [{
    key: "clone",
    value: function clone() {
      return new Point(this.x, this.y);
    }

    /**
     * Copies x and y from the given point
     *
     * @param {PIXI.Point} p - The point to copy.
     */

  }, {
    key: "copy",
    value: function copy(p) {
      this.set(p.x, p.y);
    }

    /**
     * Returns true if the given point is equal to this point
     *
     * @param {PIXI.Point} p - The point to check
     * @returns {boolean} Whether the given point equal to this point
     */

  }, {
    key: "equals",
    value: function equals(p) {
      return p.x === this.x && p.y === this.y;
    }

    /**
     * Sets the point to a new x and y position.
     * If y is omitted, both x and y will be set to x.
     *
     * @param {number} [x=0] - position of the point on the x axis
     * @param {number} [y=0] - position of the point on the y axis
     */

  }, {
    key: "set",
    value: function set$$1(x, y) {
      this.x = x || 0;
      this.y = y || (y !== 0 ? this.x : 0);
    }
  }]);
  return Point;
}();

/**
 * The pixi Matrix class as an object, which makes it a lot faster,
 * here is a representation of it :
 * | a | b | tx|
 * | c | d | ty|
 * | 0 | 0 | 1 |
 *
 * @class
 * @memberof PIXI
 */

var Matrix$2 = function () {
    /**
     *
     */
    function Matrix() {
        classCallCheck(this, Matrix);

        /**
         * @member {number}
         * @default 1
         */
        this.a = 1;

        /**
         * @member {number}
         * @default 0
         */
        this.b = 0;

        /**
         * @member {number}
         * @default 0
         */
        this.c = 0;

        /**
         * @member {number}
         * @default 1
         */
        this.d = 1;

        /**
         * @member {number}
         * @default 0
         */
        this.tx = 0;

        /**
         * @member {number}
         * @default 0
         */
        this.ty = 0;

        this.array = null;
    }

    /**
     * Creates a Matrix object based on the given array. The Element to Matrix mapping order is as follows:
     *
     * a = array[0]
     * b = array[1]
     * c = array[3]
     * d = array[4]
     * tx = array[2]
     * ty = array[5]
     *
     * @param {number[]} array - The array that the matrix will be populated from.
     */


    createClass(Matrix, [{
        key: 'fromArray',
        value: function fromArray(array) {
            this.a = array[0];
            this.b = array[1];
            this.c = array[3];
            this.d = array[4];
            this.tx = array[2];
            this.ty = array[5];
        }

        /**
         * sets the matrix properties
         *
         * @param {number} a - Matrix component
         * @param {number} b - Matrix component
         * @param {number} c - Matrix component
         * @param {number} d - Matrix component
         * @param {number} tx - Matrix component
         * @param {number} ty - Matrix component
         *
         * @return {PIXI.Matrix} This matrix. Good for chaining method calls.
         */

    }, {
        key: 'set',
        value: function set$$1(a, b, c, d, tx, ty) {
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            this.tx = tx;
            this.ty = ty;

            return this;
        }

        /**
         * Creates an array from the current Matrix object.
         *
         * @param {boolean} transpose - Whether we need to transpose the matrix or not
         * @param {Float32Array} [out=new Float32Array(9)] - If provided the array will be assigned to out
         * @return {number[]} the newly created array which contains the matrix
         */

    }, {
        key: 'toArray',
        value: function toArray$$1(transpose, out) {
            if (!this.array) {
                this.array = new Float32Array(9);
            }

            var array = out || this.array;

            if (transpose) {
                array[0] = this.a;
                array[1] = this.b;
                array[2] = 0;
                array[3] = this.c;
                array[4] = this.d;
                array[5] = 0;
                array[6] = this.tx;
                array[7] = this.ty;
                array[8] = 1;
            } else {
                array[0] = this.a;
                array[1] = this.c;
                array[2] = this.tx;
                array[3] = this.b;
                array[4] = this.d;
                array[5] = this.ty;
                array[6] = 0;
                array[7] = 0;
                array[8] = 1;
            }

            return array;
        }

        /**
         * Get a new position with the current transformation applied.
         * Can be used to go from a child's coordinate space to the world coordinate space. (e.g. rendering)
         *
         * @param {PIXI.Point} pos - The origin
         * @param {PIXI.Point} [newPos] - The point that the new position is assigned to (allowed to be same as input)
         * @return {PIXI.Point} The new point, transformed through this matrix
         */

    }, {
        key: 'apply',
        value: function apply(pos, newPos) {
            newPos = newPos || new Point$2();

            var x = pos.x;
            var y = pos.y;

            newPos.x = this.a * x + this.c * y + this.tx;
            newPos.y = this.b * x + this.d * y + this.ty;

            return newPos;
        }

        /**
         * Get a new position with the inverse of the current transformation applied.
         * Can be used to go from the world coordinate space to a child's coordinate space. (e.g. input)
         *
         * @param {PIXI.Point} pos - The origin
         * @param {PIXI.Point} [newPos] - The point that the new position is assigned to (allowed to be same as input)
         * @return {PIXI.Point} The new point, inverse-transformed through this matrix
         */

    }, {
        key: 'applyInverse',
        value: function applyInverse(pos, newPos) {
            newPos = newPos || new Point$2();

            var id = 1 / (this.a * this.d + this.c * -this.b);

            var x = pos.x;
            var y = pos.y;

            newPos.x = this.d * id * x + -this.c * id * y + (this.ty * this.c - this.tx * this.d) * id;
            newPos.y = this.a * id * y + -this.b * id * x + (-this.ty * this.a + this.tx * this.b) * id;

            return newPos;
        }

        /**
         * Translates the matrix on the x and y.
         *
         * @param {number} x How much to translate x by
         * @param {number} y How much to translate y by
         * @return {PIXI.Matrix} This matrix. Good for chaining method calls.
         */

    }, {
        key: 'translate',
        value: function translate(x, y) {
            this.tx += x;
            this.ty += y;

            return this;
        }

        /**
         * Applies a scale transformation to the matrix.
         *
         * @param {number} x The amount to scale horizontally
         * @param {number} y The amount to scale vertically
         * @return {PIXI.Matrix} This matrix. Good for chaining method calls.
         */

    }, {
        key: 'scale',
        value: function scale(x, y) {
            this.a *= x;
            this.d *= y;
            this.c *= x;
            this.b *= y;
            this.tx *= x;
            this.ty *= y;

            return this;
        }

        /**
         * Applies a rotation transformation to the matrix.
         *
         * @param {number} angle - The angle in radians.
         * @return {PIXI.Matrix} This matrix. Good for chaining method calls.
         */

    }, {
        key: 'rotate',
        value: function rotate(angle) {
            var cos = Math.cos(angle);
            var sin = Math.sin(angle);

            var a1 = this.a;
            var c1 = this.c;
            var tx1 = this.tx;

            this.a = a1 * cos - this.b * sin;
            this.b = a1 * sin + this.b * cos;
            this.c = c1 * cos - this.d * sin;
            this.d = c1 * sin + this.d * cos;
            this.tx = tx1 * cos - this.ty * sin;
            this.ty = tx1 * sin + this.ty * cos;

            return this;
        }

        /**
         * Appends the given Matrix to this Matrix.
         *
         * @param {PIXI.Matrix} matrix - The matrix to append.
         * @return {PIXI.Matrix} This matrix. Good for chaining method calls.
         */

    }, {
        key: 'append',
        value: function append(matrix) {
            var a1 = this.a;
            var b1 = this.b;
            var c1 = this.c;
            var d1 = this.d;

            this.a = matrix.a * a1 + matrix.b * c1;
            this.b = matrix.a * b1 + matrix.b * d1;
            this.c = matrix.c * a1 + matrix.d * c1;
            this.d = matrix.c * b1 + matrix.d * d1;

            this.tx = matrix.tx * a1 + matrix.ty * c1 + this.tx;
            this.ty = matrix.tx * b1 + matrix.ty * d1 + this.ty;

            return this;
        }

        /**
         * Sets the matrix based on all the available properties
         *
         * @param {number} x - Position on the x axis
         * @param {number} y - Position on the y axis
         * @param {number} pivotX - Pivot on the x axis
         * @param {number} pivotY - Pivot on the y axis
         * @param {number} scaleX - Scale on the x axis
         * @param {number} scaleY - Scale on the y axis
         * @param {number} rotation - Rotation in radians
         * @param {number} skewX - Skew on the x axis
         * @param {number} skewY - Skew on the y axis
         * @return {PIXI.Matrix} This matrix. Good for chaining method calls.
         */

    }, {
        key: 'setTransform',
        value: function setTransform(x, y, pivotX, pivotY, scaleX, scaleY, rotation, skewX, skewY) {
            var sr = Math.sin(rotation);
            var cr = Math.cos(rotation);
            var cy = Math.cos(skewY);
            var sy = Math.sin(skewY);
            var nsx = -Math.sin(skewX);
            var cx = Math.cos(skewX);

            var a = cr * scaleX;
            var b = sr * scaleX;
            var c = -sr * scaleY;
            var d = cr * scaleY;

            this.a = cy * a + sy * c;
            this.b = cy * b + sy * d;
            this.c = nsx * a + cx * c;
            this.d = nsx * b + cx * d;

            this.tx = x + (pivotX * a + pivotY * c);
            this.ty = y + (pivotX * b + pivotY * d);

            return this;
        }

        /**
         * Prepends the given Matrix to this Matrix.
         *
         * @param {PIXI.Matrix} matrix - The matrix to prepend
         * @return {PIXI.Matrix} This matrix. Good for chaining method calls.
         */

    }, {
        key: 'prepend',
        value: function prepend(matrix) {
            var tx1 = this.tx;

            if (matrix.a !== 1 || matrix.b !== 0 || matrix.c !== 0 || matrix.d !== 1) {
                var a1 = this.a;
                var c1 = this.c;

                this.a = a1 * matrix.a + this.b * matrix.c;
                this.b = a1 * matrix.b + this.b * matrix.d;
                this.c = c1 * matrix.a + this.d * matrix.c;
                this.d = c1 * matrix.b + this.d * matrix.d;
            }

            this.tx = tx1 * matrix.a + this.ty * matrix.c + matrix.tx;
            this.ty = tx1 * matrix.b + this.ty * matrix.d + matrix.ty;

            return this;
        }

        /**
         * Decomposes the matrix (x, y, scaleX, scaleY, and rotation) and sets the properties on to a transform.
         *
         * @param {PIXI.Transform|PIXI.TransformStatic} transform - The transform to apply the properties to.
         * @return {PIXI.Transform|PIXI.TransformStatic} The transform with the newly applied properties
         */

    }, {
        key: 'decompose',
        value: function decompose(transform) {
            // sort out rotation / skew..
            var a = this.a;
            var b = this.b;
            var c = this.c;
            var d = this.d;

            var skewX = -Math.atan2(-c, d);
            var skewY = Math.atan2(b, a);

            var delta = Math.abs(skewX + skewY);

            if (delta < 0.00001) {
                transform.rotation = skewY;

                if (a < 0 && d >= 0) {
                    transform.rotation += transform.rotation <= 0 ? Math.PI : -Math.PI;
                }

                transform.skew.x = transform.skew.y = 0;
            } else {
                transform.skew.x = skewX;
                transform.skew.y = skewY;
            }

            // next set scale
            transform.scale.x = Math.sqrt(a * a + b * b);
            transform.scale.y = Math.sqrt(c * c + d * d);

            // next set position
            transform.position.x = this.tx;
            transform.position.y = this.ty;

            return transform;
        }

        /**
         * Inverts this matrix
         *
         * @return {PIXI.Matrix} This matrix. Good for chaining method calls.
         */

    }, {
        key: 'invert',
        value: function invert() {
            var a1 = this.a;
            var b1 = this.b;
            var c1 = this.c;
            var d1 = this.d;
            var tx1 = this.tx;
            var n = a1 * d1 - b1 * c1;

            this.a = d1 / n;
            this.b = -b1 / n;
            this.c = -c1 / n;
            this.d = a1 / n;
            this.tx = (c1 * this.ty - d1 * tx1) / n;
            this.ty = -(a1 * this.ty - b1 * tx1) / n;

            return this;
        }

        /**
         * Resets this Matix to an identity (default) matrix.
         *
         * @return {PIXI.Matrix} This matrix. Good for chaining method calls.
         */

    }, {
        key: 'identity',
        value: function identity() {
            this.a = 1;
            this.b = 0;
            this.c = 0;
            this.d = 1;
            this.tx = 0;
            this.ty = 0;

            return this;
        }

        /**
         * Creates a new Matrix object with the same values as this one.
         *
         * @return {PIXI.Matrix} A copy of this matrix. Good for chaining method calls.
         */

    }, {
        key: 'clone',
        value: function clone() {
            var matrix = new Matrix();

            matrix.a = this.a;
            matrix.b = this.b;
            matrix.c = this.c;
            matrix.d = this.d;
            matrix.tx = this.tx;
            matrix.ty = this.ty;

            return matrix;
        }

        /**
         * Changes the values of the given matrix to be the same as the ones in this matrix
         *
         * @param {PIXI.Matrix} matrix - The matrix to copy from.
         * @return {PIXI.Matrix} The matrix given in parameter with its values updated.
         */

    }, {
        key: 'copy',
        value: function copy(matrix) {
            matrix.a = this.a;
            matrix.b = this.b;
            matrix.c = this.c;
            matrix.d = this.d;
            matrix.tx = this.tx;
            matrix.ty = this.ty;

            return matrix;
        }

        /**
         * A default (identity) matrix
         *
         * @static
         * @const
         */

    }], [{
        key: 'IDENTITY',
        get: function get$$1() {
            return new Matrix();
        }

        /**
         * A temp matrix
         *
         * @static
         * @const
         */

    }, {
        key: 'TEMP_MATRIX',
        get: function get$$1() {
            return new Matrix();
        }
    }]);
    return Matrix;
}();

// Your friendly neighbour https://en.wikipedia.org/wiki/Dihedral_group of order 16
var ux = [1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1, 0, 1];
var uy = [0, 1, 1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1];
var vx = [0, -1, -1, -1, 0, 1, 1, 1, 0, 1, 1, 1, 0, -1, -1, -1];
var vy = [1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, 1, 1, 1, 0, -1];
var tempMatrices = [];

var mul = [];

function signum(x) {
    if (x < 0) {
        return -1;
    }
    if (x > 0) {
        return 1;
    }

    return 0;
}

function init() {
    for (var i = 0; i < 16; i++) {
        var row = [];

        mul.push(row);

        for (var j = 0; j < 16; j++) {
            var _ux = signum(ux[i] * ux[j] + vx[i] * uy[j]);
            var _uy = signum(uy[i] * ux[j] + vy[i] * uy[j]);
            var _vx = signum(ux[i] * vx[j] + vx[i] * vy[j]);
            var _vy = signum(uy[i] * vx[j] + vy[i] * vy[j]);

            for (var k = 0; k < 16; k++) {
                if (ux[k] === _ux && uy[k] === _uy && vx[k] === _vx && vy[k] === _vy) {
                    row.push(k);
                    break;
                }
            }
        }
    }

    for (var _i = 0; _i < 16; _i++) {
        var mat = new Matrix$2();

        mat.set(ux[_i], uy[_i], vx[_i], vy[_i], 0, 0);
        tempMatrices.push(mat);
    }
}

init();

var arcToSegmentsCache = {};
var segmentToBezierCache = {};
var boundsOfCurveCache = {};
var _join = Array.prototype.join;

/* Adapted from http://dxr.mozilla.org/mozilla-central/source/content/svg/content/src/nsSVGPathDataParser.cpp
 * by Andrea Bogazzi code is under MPL. if you don't have a copy of the license you can take it here
 * http://mozilla.org/MPL/2.0/
 */
function arcToSegments(toX, toY, rx, ry, large, sweep, rotateX) {
  var argsString = _join.call(arguments);
  if (arcToSegmentsCache[argsString]) {
    return arcToSegmentsCache[argsString];
  }

  var PI = Math.PI,
      th = rotateX * PI / 180,
      sinTh = Math.sin(th),
      cosTh = Math.cos(th),
      fromX = 0,
      fromY = 0;

  rx = Math.abs(rx);
  ry = Math.abs(ry);

  var px = -cosTh * toX * 0.5 - sinTh * toY * 0.5,
      py = -cosTh * toY * 0.5 + sinTh * toX * 0.5,
      rx2 = rx * rx,
      ry2 = ry * ry,
      py2 = py * py,
      px2 = px * px,
      pl = rx2 * ry2 - rx2 * py2 - ry2 * px2,
      root = 0;

  if (pl < 0) {
    var s = Math.sqrt(1 - pl / (rx2 * ry2));
    rx *= s;
    ry *= s;
  } else {
    root = (large === sweep ? -1.0 : 1.0) * Math.sqrt(pl / (rx2 * py2 + ry2 * px2));
  }

  var cx = root * rx * py / ry,
      cy = -root * ry * px / rx,
      cx1 = cosTh * cx - sinTh * cy + toX * 0.5,
      cy1 = sinTh * cx + cosTh * cy + toY * 0.5,
      mTheta = calcVectorAngle(1, 0, (px - cx) / rx, (py - cy) / ry),
      dtheta = calcVectorAngle((px - cx) / rx, (py - cy) / ry, (-px - cx) / rx, (-py - cy) / ry);

  if (sweep === 0 && dtheta > 0) {
    dtheta -= 2 * PI;
  } else if (sweep === 1 && dtheta < 0) {
    dtheta += 2 * PI;
  }

  // Convert into cubic bezier segments <= 90deg
  var segments = Math.ceil(Math.abs(dtheta / PI * 2)),
      result = [],
      mDelta = dtheta / segments,
      mT = 8 / 3 * Math.sin(mDelta / 4) * Math.sin(mDelta / 4) / Math.sin(mDelta / 2),
      th3 = mTheta + mDelta;

  for (var i = 0; i < segments; i++) {
    result[i] = segmentToBezier(mTheta, th3, cosTh, sinTh, rx, ry, cx1, cy1, mT, fromX, fromY);
    fromX = result[i][4];
    fromY = result[i][5];
    mTheta = th3;
    th3 += mDelta;
  }
  arcToSegmentsCache[argsString] = result;
  return result;
}

function segmentToBezier(th2, th3, cosTh, sinTh, rx, ry, cx1, cy1, mT, fromX, fromY) {
  var argsString2 = _join.call(arguments);
  if (segmentToBezierCache[argsString2]) {
    return segmentToBezierCache[argsString2];
  }

  var costh2 = Math.cos(th2),
      sinth2 = Math.sin(th2),
      costh3 = Math.cos(th3),
      sinth3 = Math.sin(th3),
      toX = cosTh * rx * costh3 - sinTh * ry * sinth3 + cx1,
      toY = sinTh * rx * costh3 + cosTh * ry * sinth3 + cy1,
      cp1X = fromX + mT * (-cosTh * rx * sinth2 - sinTh * ry * costh2),
      cp1Y = fromY + mT * (-sinTh * rx * sinth2 + cosTh * ry * costh2),
      cp2X = toX + mT * (cosTh * rx * sinth3 + sinTh * ry * costh3),
      cp2Y = toY + mT * (sinTh * rx * sinth3 - cosTh * ry * costh3);

  segmentToBezierCache[argsString2] = [cp1X, cp1Y, cp2X, cp2Y, toX, toY];
  return segmentToBezierCache[argsString2];
}

/*
 * Private
 */
function calcVectorAngle(ux, uy, vx, vy) {
  var ta = Math.atan2(uy, ux),
      tb = Math.atan2(vy, vx);
  if (tb >= ta) {
    return tb - ta;
  } else {
    return 2 * Math.PI - (ta - tb);
  }
}

/**
 * Draws arc
 * @param {graphics} graphics
 * @param {Number} fx
 * @param {Number} fy
 * @param {Array} coords
 */
var drawArc = function drawArc(graphics, fx, fy, coords) {
  var rx = coords[0],
      ry = coords[1],
      rot = coords[2],
      large = coords[3],
      sweep = coords[4],
      tx = coords[5],
      ty = coords[6],
      segs = [[], [], [], []],
      segsNorm = arcToSegments(tx - fx, ty - fy, rx, ry, large, sweep, rot);

  for (var i = 0, len = segsNorm.length; i < len; i++) {
    segs[i][0] = segsNorm[i][0] + fx;
    segs[i][1] = segsNorm[i][1] + fy;
    segs[i][2] = segsNorm[i][2] + fx;
    segs[i][3] = segsNorm[i][3] + fy;
    segs[i][4] = segsNorm[i][4] + fx;
    segs[i][5] = segsNorm[i][5] + fy;
    graphics.bezierCurveTo.apply(graphics, segs[i]);
  }
};

/**
 * Calculate bounding box of a elliptic-arc
 * @param {Number} fx start point of arc
 * @param {Number} fy
 * @param {Number} rx horizontal radius
 * @param {Number} ry vertical radius
 * @param {Number} rot angle of horizontal axe
 * @param {Number} large 1 or 0, whatever the arc is the big or the small on the 2 points
 * @param {Number} sweep 1 or 0, 1 clockwise or counterclockwise direction
 * @param {Number} tx end point of arc
 * @param {Number} ty
 */
var getBoundsOfArc = function getBoundsOfArc(fx, fy, rx, ry, rot, large, sweep, tx, ty) {

  var fromX = 0,
      fromY = 0,
      bound,
      bounds = [],
      segs = arcToSegments(tx - fx, ty - fy, rx, ry, large, sweep, rot);

  for (var i = 0, len = segs.length; i < len; i++) {
    bound = getBoundsOfCurve(fromX, fromY, segs[i][0], segs[i][1], segs[i][2], segs[i][3], segs[i][4], segs[i][5]);
    bounds.push({ x: bound[0].x + fx, y: bound[0].y + fy });
    bounds.push({ x: bound[1].x + fx, y: bound[1].y + fy });
    fromX = segs[i][4];
    fromY = segs[i][5];
  }
  return bounds;
};

/**
 * Calculate bounding box of a beziercurve
 * @param {Number} x0 starting point
 * @param {Number} y0
 * @param {Number} x1 first control point
 * @param {Number} y1
 * @param {Number} x2 secondo control point
 * @param {Number} y2
 * @param {Number} x3 end of beizer
 * @param {Number} y3
 */
// taken from http://jsbin.com/ivomiq/56/edit  no credits available for that.
function getBoundsOfCurve(x0, y0, x1, y1, x2, y2, x3, y3) {
  var argsString = _join.call(arguments);
  if (boundsOfCurveCache[argsString]) {
    return boundsOfCurveCache[argsString];
  }

  var sqrt = Math.sqrt,
      min = Math.min,
      max = Math.max,
      abs = Math.abs,
      tvalues = [],
      bounds = [[], []],
      a,
      b,
      c,
      t,
      t1,
      t2,
      b2ac,
      sqrtb2ac;

  b = 6 * x0 - 12 * x1 + 6 * x2;
  a = -3 * x0 + 9 * x1 - 9 * x2 + 3 * x3;
  c = 3 * x1 - 3 * x0;

  for (var i = 0; i < 2; ++i) {
    if (i > 0) {
      b = 6 * y0 - 12 * y1 + 6 * y2;
      a = -3 * y0 + 9 * y1 - 9 * y2 + 3 * y3;
      c = 3 * y1 - 3 * y0;
    }

    if (abs(a) < 1e-12) {
      if (abs(b) < 1e-12) {
        continue;
      }
      t = -c / b;
      if (0 < t && t < 1) {
        tvalues.push(t);
      }
      continue;
    }
    b2ac = b * b - 4 * c * a;
    if (b2ac < 0) {
      continue;
    }
    sqrtb2ac = sqrt(b2ac);
    t1 = (-b + sqrtb2ac) / (2 * a);
    if (0 < t1 && t1 < 1) {
      tvalues.push(t1);
    }
    t2 = (-b - sqrtb2ac) / (2 * a);
    if (0 < t2 && t2 < 1) {
      tvalues.push(t2);
    }
  }

  var x,
      y,
      j = tvalues.length,
      jlen = j,
      mt;
  while (j--) {
    t = tvalues[j];
    mt = 1 - t;
    x = mt * mt * mt * x0 + 3 * mt * mt * t * x1 + 3 * mt * t * t * x2 + t * t * t * x3;
    bounds[0][j] = x;

    y = mt * mt * mt * y0 + 3 * mt * mt * t * y1 + 3 * mt * t * t * y2 + t * t * t * y3;
    bounds[1][j] = y;
  }

  bounds[0][jlen] = x0;
  bounds[1][jlen] = y0;
  bounds[0][jlen + 1] = x3;
  bounds[1][jlen + 1] = y3;
  var result = [{
    x: min.apply(null, bounds[0]),
    y: min.apply(null, bounds[1])
  }, {
    x: max.apply(null, bounds[0]),
    y: max.apply(null, bounds[1])
  }];
  boundsOfCurveCache[argsString] = result;
  return result;
}

var Arc = {
  drawArc: drawArc,
  getBoundsOfCurve: getBoundsOfCurve,
  getBoundsOfArc: getBoundsOfArc
};

/**
 * Rectangle object is an area defined by its position, as indicated by its top-left corner
 * point (x, y) and by its width and its height.
 *
 * @class
 * @memberof PIXI
 */

var Rectangle = function () {
    /**
     * @param {number} [x=0] - The X coordinate of the upper-left corner of the rectangle
     * @param {number} [y=0] - The Y coordinate of the upper-left corner of the rectangle
     * @param {number} [width=0] - The overall width of this rectangle
     * @param {number} [height=0] - The overall height of this rectangle
     */
    function Rectangle() {
        var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
        classCallCheck(this, Rectangle);

        /**
         * @member {number}
         * @default 0
         */
        this.x = x;

        /**
         * @member {number}
         * @default 0
         */
        this.y = y;

        /**
         * @member {number}
         * @default 0
         */
        this.width = width;

        /**
         * @member {number}
         * @default 0
         */
        this.height = height;

        /**
         * The type of the object, mainly used to avoid `instanceof` checks
         *
         * @member {number}
         * @readOnly
         * @default PIXI.SHAPES.RECT
         * @see PIXI.SHAPES
         */
        this.type = SHAPES.RECT;
    }

    /**
     * returns the left edge of the rectangle
     *
     * @member {number}
     */


    createClass(Rectangle, [{
        key: 'clone',


        /**
         * Creates a clone of this Rectangle
         *
         * @return {PIXI.Rectangle} a copy of the rectangle
         */
        value: function clone() {
            return new Rectangle(this.x, this.y, this.width, this.height);
        }

        /**
         * Copies another rectangle to this one.
         *
         * @param {PIXI.Rectangle} rectangle - The rectangle to copy.
         * @return {PIXI.Rectangle} Returns itself.
         */

    }, {
        key: 'copy',
        value: function copy(rectangle) {
            this.x = rectangle.x;
            this.y = rectangle.y;
            this.width = rectangle.width;
            this.height = rectangle.height;

            return this;
        }

        /**
         * Checks whether the x and y coordinates given are contained within this Rectangle
         *
         * @param {number} x - The X coordinate of the point to test
         * @param {number} y - The Y coordinate of the point to test
         * @return {boolean} Whether the x/y coordinates are within this Rectangle
         */

    }, {
        key: 'contains',
        value: function contains(x, y) {
            if (this.width <= 0 || this.height <= 0) {
                return false;
            }

            if (x >= this.x && x < this.x + this.width) {
                if (y >= this.y && y < this.y + this.height) {
                    return true;
                }
            }

            return false;
        }

        /**
         * Pads the rectangle making it grow in all directions.
         *
         * @param {number} paddingX - The horizontal padding amount.
         * @param {number} paddingY - The vertical padding amount.
         */

    }, {
        key: 'pad',
        value: function pad(paddingX, paddingY) {
            paddingX = paddingX || 0;
            paddingY = paddingY || (paddingY !== 0 ? paddingX : 0);

            this.x -= paddingX;
            this.y -= paddingY;

            this.width += paddingX * 2;
            this.height += paddingY * 2;
        }

        /**
         * Fits this rectangle around the passed one.
         *
         * @param {PIXI.Rectangle} rectangle - The rectangle to fit.
         */

    }, {
        key: 'fit',
        value: function fit(rectangle) {
            if (this.x < rectangle.x) {
                this.width += this.x;
                if (this.width < 0) {
                    this.width = 0;
                }

                this.x = rectangle.x;
            }

            if (this.y < rectangle.y) {
                this.height += this.y;
                if (this.height < 0) {
                    this.height = 0;
                }
                this.y = rectangle.y;
            }

            if (this.x + this.width > rectangle.x + rectangle.width) {
                this.width = rectangle.width - this.x;
                if (this.width < 0) {
                    this.width = 0;
                }
            }

            if (this.y + this.height > rectangle.y + rectangle.height) {
                this.height = rectangle.height - this.y;
                if (this.height < 0) {
                    this.height = 0;
                }
            }
        }

        /**
         * Enlarges this rectangle to include the passed rectangle.
         *
         * @param {PIXI.Rectangle} rectangle - The rectangle to include.
         */

    }, {
        key: 'enlarge',
        value: function enlarge(rectangle) {
            var x1 = Math.min(this.x, rectangle.x);
            var x2 = Math.max(this.x + this.width, rectangle.x + rectangle.width);
            var y1 = Math.min(this.y, rectangle.y);
            var y2 = Math.max(this.y + this.height, rectangle.y + rectangle.height);

            this.x = x1;
            this.width = x2 - x1;
            this.y = y1;
            this.height = y2 - y1;
        }
    }, {
        key: 'left',
        get: function get$$1() {
            return this.x;
        }

        /**
         * returns the right edge of the rectangle
         *
         * @member {number}
         */

    }, {
        key: 'right',
        get: function get$$1() {
            return this.x + this.width;
        }

        /**
         * returns the top edge of the rectangle
         *
         * @member {number}
         */

    }, {
        key: 'top',
        get: function get$$1() {
            return this.y;
        }

        /**
         * returns the bottom edge of the rectangle
         *
         * @member {number}
         */

    }, {
        key: 'bottom',
        get: function get$$1() {
            return this.y + this.height;
        }

        /**
         * A constant empty rectangle.
         *
         * @static
         * @constant
         */

    }], [{
        key: 'EMPTY',
        get: function get$$1() {
            return new Rectangle(0, 0, 0, 0);
        }
    }]);
    return Rectangle;
}();

/**
 * The Circle object can be used to specify a hit area for displayObjects
 *
 * @class
 * @memberof PIXI
 */

var Circle = function () {
  /**
   * @param {number} [x=0] - The X coordinate of the center of this circle
   * @param {number} [y=0] - The Y coordinate of the center of this circle
   * @param {number} [radius=0] - The radius of the circle
   */
  function Circle() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var radius = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    classCallCheck(this, Circle);

    /**
     * @member {number}
     * @default 0
     */
    this.x = x;

    /**
     * @member {number}
     * @default 0
     */
    this.y = y;

    /**
     * @member {number}
     * @default 0
     */
    this.radius = radius;

    /**
     * The type of the object, mainly used to avoid `instanceof` checks
     *
     * @member {number}
     * @readOnly
     * @default PIXI.SHAPES.CIRC
     * @see PIXI.SHAPES
     */
    this.type = SHAPES.CIRC;

    this.closed = true;
  }

  /**
   * Creates a clone of this Circle instance
   *
   * @return {PIXI.Circle} a copy of the Circle
   */


  createClass(Circle, [{
    key: 'clone',
    value: function clone() {
      return new Circle(this.x, this.y, this.radius);
    }

    /**
     * Checks whether the x and y coordinates given are contained within this circle
     *
     * @param {number} x - The X coordinate of the point to test
     * @param {number} y - The Y coordinate of the point to test
     * @return {boolean} Whether the x/y coordinates are within this Circle
     */

  }, {
    key: 'contains',
    value: function contains(x, y) {
      if (this.radius <= 0) {
        return false;
      }

      var r2 = this.radius * this.radius;
      var dx = this.x - x;
      var dy = this.y - y;

      dx *= dx;
      dy *= dy;

      return dx + dy <= r2;
    }

    /**
    * Returns the framing rectangle of the circle as a Rectangle object
    *
    * @return {PIXI.Rectangle} the framing rectangle
    */

  }, {
    key: 'getBounds',
    value: function getBounds() {
      return new Rectangle(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
    }
  }]);
  return Circle;
}();

/**
 * The Ellipse object can be used to specify a hit area for displayObjects
 *
 * @class
 * @memberof PIXI
 */

var Ellipse = function () {
  /**
   * @param {number} [x=0] - The X coordinate of the center of this circle
   * @param {number} [y=0] - The Y coordinate of the center of this circle
   * @param {number} [width=0] - The half width of this ellipse
   * @param {number} [height=0] - The half height of this ellipse
   */
  function Ellipse() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    classCallCheck(this, Ellipse);

    /**
     * @member {number}
     * @default 0
     */
    this.x = x;

    /**
     * @member {number}
     * @default 0
     */
    this.y = y;

    /**
     * @member {number}
     * @default 0
     */
    this.width = width;

    /**
     * @member {number}
     * @default 0
     */
    this.height = height;

    /**
     * The type of the object, mainly used to avoid `instanceof` checks
     *
     * @member {number}
     * @readOnly
     * @default PIXI.SHAPES.ELIP
     * @see PIXI.SHAPES
     */
    this.type = SHAPES.ELIP;

    this.closed = true;
  }

  /**
   * Creates a clone of this Ellipse instance
   *
   * @return {PIXI.Ellipse} a copy of the ellipse
   */


  createClass(Ellipse, [{
    key: 'clone',
    value: function clone() {
      return new Ellipse(this.x, this.y, this.width, this.height);
    }

    /**
     * Checks whether the x and y coordinates given are contained within this ellipse
     *
     * @param {number} x - The X coordinate of the point to test
     * @param {number} y - The Y coordinate of the point to test
     * @return {boolean} Whether the x/y coords are within this ellipse
     */

  }, {
    key: 'contains',
    value: function contains(x, y) {
      if (this.width <= 0 || this.height <= 0) {
        return false;
      }

      // normalize the coords to an ellipse with center 0,0
      var normx = (x - this.x) / this.width;
      var normy = (y - this.y) / this.height;

      normx *= normx;
      normy *= normy;

      return normx + normy <= 1;
    }

    /**
     * Returns the framing rectangle of the ellipse as a Rectangle object
     *
     * @return {PIXI.Rectangle} the framing rectangle
     */

  }, {
    key: 'getBounds',
    value: function getBounds() {
      return new Rectangle(this.x - this.width, this.y - this.height, this.width, this.height);
    }
  }]);
  return Ellipse;
}();

/**
 * @class
 * @memberof PIXI
 */

var Polygon = function () {
    /**
     * @param {PIXI.Point[]|number[]} points - This can be an array of Points
     *  that form the polygon, a flat array of numbers that will be interpreted as [x,y, x,y, ...], or
     *  the arguments passed can be all the points of the polygon e.g.
     *  `new PIXI.Polygon(new PIXI.Point(), new PIXI.Point(), ...)`, or the arguments passed can be flat
     *  x,y values e.g. `new Polygon(x,y, x,y, x,y, ...)` where `x` and `y` are Numbers.
     */
    function Polygon() {
        for (var _len = arguments.length, points = Array(_len), _key = 0; _key < _len; _key++) {
            points[_key] = arguments[_key];
        }

        classCallCheck(this, Polygon);

        if (Array.isArray(points[0])) {
            points = points[0];
        }

        // if this is an array of points, convert it to a flat array of numbers
        if (points[0] instanceof Point$2) {
            var p = [];

            for (var i = 0, il = points.length; i < il; i++) {
                p.push(points[i].x, points[i].y);
            }

            points = p;
        }

        this.closed = true;

        /**
         * An array of the points of this polygon
         *
         * @member {number[]}
         */
        this.points = points;

        /**
         * The type of the object, mainly used to avoid `instanceof` checks
         *
         * @member {number}
         * @readOnly
         * @default PIXI.SHAPES.POLY
         * @see PIXI.SHAPES
         */
        this.type = SHAPES.POLY;
    }

    /**
     * Creates a clone of this polygon
     *
     * @return {PIXI.Polygon} a copy of the polygon
     */


    createClass(Polygon, [{
        key: 'clone',
        value: function clone() {
            return new Polygon(this.points.slice());
        }

        /**
         * Closes the polygon, adding points if necessary.
         *
         */

    }, {
        key: 'close',
        value: function close() {
            var points = this.points;
            if (points[0] !== points[points.length - 2] || points[1] !== points[points.length - 1]) {
                points.push(points[0], points[1]);
            }
            this.closed = true;
        }
    }, {
        key: 'contains',
        value: function contains(x, y) {
            return this._isInsidePolygon_WindingNumber(x, y);
        }

        /**
         * 多边形包含判断 Nonzero Winding Number Rule
         */

    }, {
        key: '_isInsidePolygon_WindingNumber',
        value: function _isInsidePolygon_WindingNumber(x, y) {
            var points = this.points;
            var wn = 0;
            for (var shiftP, shift = points[1] > y, i = 3; i < points.length; i += 2) {
                shiftP = shift;
                shift = points[i] > y;
                if (shiftP != shift) {
                    var n = (shiftP ? 1 : 0) - (shift ? 1 : 0);
                    if (n * ((points[i - 3] - x) * (points[i - 0] - y) - (points[i - 2] - y) * (points[i - 1] - x)) > 0) {
                        wn += n;
                    }
                }
            }
            return wn;
        }
    }]);
    return Polygon;
}();

/**
 * Math classes and utilities mixed into PIXI namespace.
 *
 * @lends PIXI
 */

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/**
 * Helper class to create a webGL Context
 *
 * @class
 * @memberof PIXI.glCore
 * @param canvas {HTMLCanvasElement} the canvas element that we will get the context from
 * @param options {Object} An options object that gets passed in to the canvas element containing the context attributes,
 *                         see https://developer.mozilla.org/en/docs/Web/API/HTMLCanvasElement/getContext for the options available
 * @return {WebGLRenderingContext} the WebGL context
 */
var createContext = function(canvas, options)
{
    var gl = canvas.getContext('webgl', options) || 
         canvas.getContext('experimental-webgl', options);

    if (!gl)
    {
        // fail, not able to get a context
        throw new Error('This browser does not support webGL. Try using the canvas renderer');
    }

    return gl;
};

var createContext_1 = createContext;

// var GL_MAP = {};

/**
 * @param gl {WebGLRenderingContext} The current WebGL context
 * @param attribs {*}
 * @param state {*}
 */
var setVertexAttribArrays = function (gl, attribs, state)
{
    var i;
    if(state)
    {
        var tempAttribState = state.tempAttribState,
            attribState = state.attribState;

        for (i = 0; i < tempAttribState.length; i++)
        {
            tempAttribState[i] = false;
        }

        // set the new attribs
        for (i = 0; i < attribs.length; i++)
        {
            tempAttribState[attribs[i].attribute.location] = true;
        }

        for (i = 0; i < attribState.length; i++)
        {
            if (attribState[i] !== tempAttribState[i])
            {
                attribState[i] = tempAttribState[i];

                if (state.attribState[i])
                {
                    gl.enableVertexAttribArray(i);
                }
                else
                {
                    gl.disableVertexAttribArray(i);
                }
            }
        }

    }
    else
    {
        for (i = 0; i < attribs.length; i++)
        {
            var attrib = attribs[i];
            gl.enableVertexAttribArray(attrib.attribute.location);
        }
    }
};

var setVertexAttribArrays_1 = setVertexAttribArrays;

var EMPTY_ARRAY_BUFFER = new ArrayBuffer(0);

/**
 * Helper class to create a webGL buffer
 *
 * @class
 * @memberof PIXI.glCore
 * @param gl {WebGLRenderingContext} The current WebGL rendering context
 * @param type {gl.ARRAY_BUFFER | gl.ELEMENT_ARRAY_BUFFER} @mat
 * @param data {ArrayBuffer| SharedArrayBuffer|ArrayBufferView} an array of data
 * @param drawType {gl.STATIC_DRAW|gl.DYNAMIC_DRAW|gl.STREAM_DRAW}
 */
var Buffer = function(gl, type, data, drawType)
{

	/**
     * The current WebGL rendering context
     *
     * @member {WebGLRenderingContext}
     */
	this.gl = gl;

	/**
     * The WebGL buffer, created upon instantiation
     *
     * @member {WebGLBuffer}
     */
	this.buffer = gl.createBuffer();

	/**
     * The type of the buffer
     *
     * @member {gl.ARRAY_BUFFER|gl.ELEMENT_ARRAY_BUFFER}
     */
	this.type = type || gl.ARRAY_BUFFER;

	/**
     * The draw type of the buffer
     *
     * @member {gl.STATIC_DRAW|gl.DYNAMIC_DRAW|gl.STREAM_DRAW}
     */
	this.drawType = drawType || gl.STATIC_DRAW;

	/**
     * The data in the buffer, as a typed array
     *
     * @member {ArrayBuffer| SharedArrayBuffer|ArrayBufferView}
     */
	this.data = EMPTY_ARRAY_BUFFER;

	if(data)
	{
		this.upload(data);
	}

	this._updateID = 0;
};

/**
 * Uploads the buffer to the GPU
 * @param data {ArrayBuffer| SharedArrayBuffer|ArrayBufferView} an array of data to upload
 * @param offset {Number} if only a subset of the data should be uploaded, this is the amount of data to subtract
 * @param dontBind {Boolean} whether to bind the buffer before uploading it
 */
Buffer.prototype.upload = function(data, offset, dontBind)
{
	// todo - needed?
	if(!dontBind) this.bind();

	var gl = this.gl;

	data = data || this.data;
	offset = offset || 0;

	if(this.data.byteLength >= data.byteLength)
	{
		gl.bufferSubData(this.type, offset, data);
	}
	else
	{
		gl.bufferData(this.type, data, this.drawType);
	}

	this.data = data;
};
/**
 * Binds the buffer
 *
 */
Buffer.prototype.bind = function()
{
	var gl = this.gl;
	gl.bindBuffer(this.type, this.buffer);
};

Buffer.createVertexBuffer = function(gl, data, drawType)
{
	return new Buffer(gl, gl.ARRAY_BUFFER, data, drawType);
};

Buffer.createIndexBuffer = function(gl, data, drawType)
{
	return new Buffer(gl, gl.ELEMENT_ARRAY_BUFFER, data, drawType);
};

Buffer.create = function(gl, type, data, drawType)
{
	return new Buffer(gl, type, data, drawType);
};

/**
 * Destroys the buffer
 *
 */
Buffer.prototype.destroy = function(){
	this.gl.deleteBuffer(this.buffer);
};

var GLBuffer = Buffer;

/**
 * Helper class to create a WebGL Texture
 *
 * @class
 * @memberof PIXI.glCore
 * @param gl {WebGLRenderingContext} The current WebGL context
 * @param width {number} the width of the texture
 * @param height {number} the height of the texture
 * @param format {number} the pixel format of the texture. defaults to gl.RGBA
 * @param type {number} the gl type of the texture. defaults to gl.UNSIGNED_BYTE
 */
var Texture = function(gl, width, height, format, type)
{
	/**
	 * The current WebGL rendering context
	 *
	 * @member {WebGLRenderingContext}
	 */
	this.gl = gl;


	/**
	 * The WebGL texture
	 *
	 * @member {WebGLTexture}
	 */
	this.texture = gl.createTexture();

	/**
	 * If mipmapping was used for this texture, enable and disable with enableMipmap()
	 *
	 * @member {Boolean}
	 */
	// some settings..
	this.mipmap = false;


	/**
	 * Set to true to enable pre-multiplied alpha
	 *
	 * @member {Boolean}
	 */
	this.premultiplyAlpha = false;

	/**
	 * The width of texture
	 *
	 * @member {Number}
	 */
	this.width = width || -1;
	/**
	 * The height of texture
	 *
	 * @member {Number}
	 */
	this.height = height || -1;

	/**
	 * The pixel format of the texture. defaults to gl.RGBA
	 *
	 * @member {Number}
	 */
	this.format = format || gl.RGBA;

	/**
	 * The gl type of the texture. defaults to gl.UNSIGNED_BYTE
	 *
	 * @member {Number}
	 */
	this.type = type || gl.UNSIGNED_BYTE;


};

/**
 * Uploads this texture to the GPU
 * @param source {HTMLImageElement|ImageData|HTMLVideoElement} the source image of the texture
 */
Texture.prototype.upload = function(source)
{
	this.bind();

	var gl = this.gl;


	gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha);

	var newWidth = source.videoWidth || source.width;
	var newHeight = source.videoHeight || source.height;

	if(newHeight !== this.height || newWidth !== this.width)
	{
		gl.texImage2D(gl.TEXTURE_2D, 0, this.format, this.format, this.type, source);
	}
	else
	{
    	gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, this.format, this.type, source);
	}

	// if the source is a video, we need to use the videoWidth / videoHeight properties as width / height will be incorrect.
	this.width = newWidth;
	this.height = newHeight;

};

var FLOATING_POINT_AVAILABLE = false;

/**
 * Use a data source and uploads this texture to the GPU
 * @param data {TypedArray} the data to upload to the texture
 * @param width {number} the new width of the texture
 * @param height {number} the new height of the texture
 */
Texture.prototype.uploadData = function(data, width, height)
{
	this.bind();

	var gl = this.gl;


	if(data instanceof Float32Array)
	{
		if(!FLOATING_POINT_AVAILABLE)
		{
			var ext = gl.getExtension("OES_texture_float");

			if(ext)
			{
				FLOATING_POINT_AVAILABLE = true;
			}
			else
			{
				throw new Error('floating point textures not available');
			}
		}

		this.type = gl.FLOAT;
	}
	else
	{
		// TODO support for other types
		this.type = this.type || gl.UNSIGNED_BYTE;
	}

	// what type of data?
	gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha);


	if(width !== this.width || height !== this.height)
	{
		gl.texImage2D(gl.TEXTURE_2D, 0, this.format,  width, height, 0, this.format, this.type, data || null);
	}
	else
	{
		gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, width, height, this.format, this.type, data || null);
	}

	this.width = width;
	this.height = height;


//	texSubImage2D
};

/**
 * Binds the texture
 * @param  location
 */
Texture.prototype.bind = function(location)
{
	var gl = this.gl;

	if(location !== undefined)
	{
		gl.activeTexture(gl.TEXTURE0 + location);
	}

	gl.bindTexture(gl.TEXTURE_2D, this.texture);
};

/**
 * Unbinds the texture
 */
Texture.prototype.unbind = function()
{
	var gl = this.gl;
	gl.bindTexture(gl.TEXTURE_2D, null);
};

/**
 * @param linear {Boolean} if we want to use linear filtering or nearest neighbour interpolation
 */
Texture.prototype.minFilter = function( linear )
{
	var gl = this.gl;

	this.bind();

	if(this.mipmap)
	{
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, linear ? gl.LINEAR_MIPMAP_LINEAR : gl.NEAREST_MIPMAP_NEAREST);
	}
	else
	{
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, linear ? gl.LINEAR : gl.NEAREST);
	}
};

/**
 * @param linear {Boolean} if we want to use linear filtering or nearest neighbour interpolation
 */
Texture.prototype.magFilter = function( linear )
{
	var gl = this.gl;

	this.bind();

	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, linear ? gl.LINEAR : gl.NEAREST);
};

/**
 * Enables mipmapping
 */
Texture.prototype.enableMipmap = function()
{
	var gl = this.gl;

	this.bind();

	this.mipmap = true;

	gl.generateMipmap(gl.TEXTURE_2D);
};

/**
 * Enables linear filtering
 */
Texture.prototype.enableLinearScaling = function()
{
	this.minFilter(true);
	this.magFilter(true);
};

/**
 * Enables nearest neighbour interpolation
 */
Texture.prototype.enableNearestScaling = function()
{
	this.minFilter(false);
	this.magFilter(false);
};

/**
 * Enables clamping on the texture so WebGL will not repeat it
 */
Texture.prototype.enableWrapClamp = function()
{
	var gl = this.gl;

	this.bind();

	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
};

/**
 * Enable tiling on the texture
 */
Texture.prototype.enableWrapRepeat = function()
{
	var gl = this.gl;

	this.bind();

	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
};

Texture.prototype.enableWrapMirrorRepeat = function()
{
	var gl = this.gl;

	this.bind();

	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);
};


/**
 * Destroys this texture
 */
Texture.prototype.destroy = function()
{
	var gl = this.gl;
	//TODO
	gl.deleteTexture(this.texture);
};

/**
 * @static
 * @param gl {WebGLRenderingContext} The current WebGL context
 * @param source {HTMLImageElement|ImageData} the source image of the texture
 * @param premultiplyAlpha {Boolean} If we want to use pre-multiplied alpha
 */
Texture.fromSource = function(gl, source, premultiplyAlpha)
{
	var texture = new Texture(gl);
	texture.premultiplyAlpha = premultiplyAlpha || false;
	texture.upload(source);

	return texture;
};

/**
 * @static
 * @param gl {WebGLRenderingContext} The current WebGL context
 * @param data {TypedArray} the data to upload to the texture
 * @param width {number} the new width of the texture
 * @param height {number} the new height of the texture
 */
Texture.fromData = function(gl, data, width, height)
{
	//console.log(data, width, height);
	var texture = new Texture(gl);
	texture.uploadData(data, width, height);

	return texture;
};


var GLTexture = Texture;

/**
 * Helper class to create a webGL Framebuffer
 *
 * @class
 * @memberof PIXI.glCore
 * @param gl {WebGLRenderingContext} The current WebGL rendering context
 * @param width {Number} the width of the drawing area of the frame buffer
 * @param height {Number} the height of the drawing area of the frame buffer
 */
var Framebuffer = function(gl, width, height)
{
    /**
     * The current WebGL rendering context
     *
     * @member {WebGLRenderingContext}
     */
    this.gl = gl;

    /**
     * The frame buffer
     *
     * @member {WebGLFramebuffer}
     */
    this.framebuffer = gl.createFramebuffer();

    /**
     * The stencil buffer
     *
     * @member {WebGLRenderbuffer}
     */
    this.stencil = null;

    /**
     * The stencil buffer
     *
     * @member {PIXI.glCore.GLTexture}
     */
    this.texture = null;

    /**
     * The width of the drawing area of the buffer
     *
     * @member {Number}
     */
    this.width = width || 100;
    /**
     * The height of the drawing area of the buffer
     *
     * @member {Number}
     */
    this.height = height || 100;
};

/**
 * Adds a texture to the frame buffer
 * @param texture {PIXI.glCore.GLTexture}
 */
Framebuffer.prototype.enableTexture = function(texture)
{
    var gl = this.gl;

    this.texture = texture || new GLTexture(gl);

    this.texture.bind();

    //gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA,  this.width, this.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

    this.bind();

    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture.texture, 0);
};

/**
 * Initialises the stencil buffer
 */
Framebuffer.prototype.enableStencil = function()
{
    if(this.stencil)return;

    var gl = this.gl;

    this.stencil = gl.createRenderbuffer();

    gl.bindRenderbuffer(gl.RENDERBUFFER, this.stencil);

    // TODO.. this is depth AND stencil?
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.RENDERBUFFER, this.stencil);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_STENCIL,  this.width  , this.height );


};

/**
 * Erases the drawing area and fills it with a colour
 * @param  r {Number} the red value of the clearing colour
 * @param  g {Number} the green value of the clearing colour
 * @param  b {Number} the blue value of the clearing colour
 * @param  a {Number} the alpha value of the clearing colour
 */
Framebuffer.prototype.clear = function( r, g, b, a )
{
    this.bind();

    var gl = this.gl;

    gl.clearColor(r, g, b, a);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
};

/**
 * Binds the frame buffer to the WebGL context
 */
Framebuffer.prototype.bind = function()
{
    var gl = this.gl;
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer );
};

/**
 * Unbinds the frame buffer to the WebGL context
 */
Framebuffer.prototype.unbind = function()
{
    var gl = this.gl;
    gl.bindFramebuffer(gl.FRAMEBUFFER, null );
};
/**
 * Resizes the drawing area of the buffer to the given width and height
 * @param  width  {Number} the new width
 * @param  height {Number} the new height
 */
Framebuffer.prototype.resize = function(width, height)
{
    var gl = this.gl;

    this.width = width;
    this.height = height;

    if ( this.texture )
    {
        this.texture.uploadData(null, width, height);
    }

    if ( this.stencil )
    {
        // update the stencil buffer width and height
        gl.bindRenderbuffer(gl.RENDERBUFFER, this.stencil);
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_STENCIL, width, height);
    }
};

/**
 * Destroys this buffer
 */
Framebuffer.prototype.destroy = function()
{
    var gl = this.gl;

    //TODO
    if(this.texture)
    {
        this.texture.destroy();
    }

    gl.deleteFramebuffer(this.framebuffer);

    this.gl = null;

    this.stencil = null;
    this.texture = null;
};

/**
 * Creates a frame buffer with a texture containing the given data
 * @static
 * @param gl {WebGLRenderingContext} The current WebGL rendering context
 * @param width {Number} the width of the drawing area of the frame buffer
 * @param height {Number} the height of the drawing area of the frame buffer
 * @param data {ArrayBuffer| SharedArrayBuffer|ArrayBufferView} an array of data
 */
Framebuffer.createRGBA = function(gl, width, height, data)
{
    var texture = GLTexture.fromData(gl, null, width, height);
    texture.enableNearestScaling();
    texture.enableWrapClamp();

    //now create the framebuffer object and attach the texture to it.
    var fbo = new Framebuffer(gl, width, height);
    fbo.enableTexture(texture);

    //fbo.enableStencil(); // get this back on soon!

    fbo.unbind();

    return fbo;
};

/**
 * Creates a frame buffer with a texture containing the given data
 * @static
 * @param gl {WebGLRenderingContext} The current WebGL rendering context
 * @param width {Number} the width of the drawing area of the frame buffer
 * @param height {Number} the height of the drawing area of the frame buffer
 * @param data {ArrayBuffer| SharedArrayBuffer|ArrayBufferView} an array of data
 */
Framebuffer.createFloat32 = function(gl, width, height, data)
{
    // create a new texture..
    var texture = new GLTexture.fromData(gl, data, width, height);
    texture.enableNearestScaling();
    texture.enableWrapClamp();

    //now create the framebuffer object and attach the texture to it.
    var fbo = new Framebuffer(gl, width, height);
    fbo.enableTexture(texture);

    fbo.unbind();

    return fbo;
};

var GLFramebuffer$1 = Framebuffer;

/**
 * @class
 * @memberof PIXI.glCore.shader
 * @param gl {WebGLRenderingContext} The current WebGL context {WebGLProgram}
 * @param vertexSrc {string|string[]} The vertex shader source as an array of strings.
 * @param fragmentSrc {string|string[]} The fragment shader source as an array of strings.
 * @param attributeLocations {Object} An attribute location map that lets you manually set the attribute locations
 * @return {WebGLProgram} the shader program
 */
var compileProgram = function(gl, vertexSrc, fragmentSrc, attributeLocations)
{
    var glVertShader = compileShader(gl, gl.VERTEX_SHADER, vertexSrc);
    var glFragShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSrc);

    var program = gl.createProgram();

    gl.attachShader(program, glVertShader);
    gl.attachShader(program, glFragShader);

    // optionally, set the attributes manually for the program rather than letting WebGL decide..
    if(attributeLocations)
    {
        for(var i in attributeLocations)
        {
            gl.bindAttribLocation(program, attributeLocations[i], i);
        }
    }


    gl.linkProgram(program);

    // if linking fails, then log and cleanup
    if (!gl.getProgramParameter(program, gl.LINK_STATUS))
    {
        console.error('Pixi.js Error: Could not initialize shader.');
        console.error('gl.VALIDATE_STATUS', gl.getProgramParameter(program, gl.VALIDATE_STATUS));
        console.error('gl.getError()', gl.getError());

        // if there is a program info log, log it
        if (gl.getProgramInfoLog(program) !== '')
        {
            console.warn('Pixi.js Warning: gl.getProgramInfoLog()', gl.getProgramInfoLog(program));
        }

        gl.deleteProgram(program);
        program = null;
    }

    // clean up some shaders
    gl.deleteShader(glVertShader);
    gl.deleteShader(glFragShader);

    return program;
};

/**
 * @private
 * @param gl {WebGLRenderingContext} The current WebGL context {WebGLProgram}
 * @param type {Number} the type, can be either VERTEX_SHADER or FRAGMENT_SHADER
 * @param vertexSrc {string|string[]} The vertex shader source as an array of strings.
 * @return {WebGLShader} the shader
 */
var compileShader = function (gl, type, src)
{
    var shader = gl.createShader(type);

    gl.shaderSource(shader, src);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
    {
        console.log(gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
};

var compileProgram_1 = compileProgram;

var mapSize = function(gl, type) 
{
    if(!GL_TABLE) 
    {
        var typeNames = Object.keys(GL_TO_GLSL_TYPES);

        GL_TABLE = {};

        for(var i = 0; i < typeNames.length; ++i) 
        {
            var tn = typeNames[i];
            GL_TABLE[ gl[tn] ] = GL_TO_GLSL_TYPES[tn];
        }
    }

  return GL_TABLE[type];
};

var GL_TABLE = null;

var GL_TO_GLSL_TYPES = {
  'FLOAT':       'float',
  'FLOAT_VEC2':  'vec2',
  'FLOAT_VEC3':  'vec3',
  'FLOAT_VEC4':  'vec4',

  'INT':         'int',
  'INT_VEC2':    'ivec2',
  'INT_VEC3':    'ivec3',
  'INT_VEC4':    'ivec4',
  
  'BOOL':        'bool',
  'BOOL_VEC2':   'bvec2',
  'BOOL_VEC3':   'bvec3',
  'BOOL_VEC4':   'bvec4',
  
  'FLOAT_MAT2':  'mat2',
  'FLOAT_MAT3':  'mat3',
  'FLOAT_MAT4':  'mat4',
  
  'SAMPLER_2D':  'sampler2D'  
};

var mapType = mapSize;

/**
 * @class
 * @memberof PIXI.glCore.shader
 * @param type {String}
 * @return {Number}
 */
var mapSize$1 = function(type) 
{ 
    return GLSL_TO_SIZE[type];
};


var GLSL_TO_SIZE = {
    'float':    1,
    'vec2':     2,
    'vec3':     3,
    'vec4':     4,

    'int':      1,
    'ivec2':    2,
    'ivec3':    3,
    'ivec4':    4,

    'bool':     1,
    'bvec2':    2,
    'bvec3':    3,
    'bvec4':    4,

    'mat2':     4,
    'mat3':     9,
    'mat4':     16,

    'sampler2D':  1
};

var mapSize_1 = mapSize$1;

/**
 * Extracts the attributes
 * @class
 * @memberof PIXI.glCore.shader
 * @param gl {WebGLRenderingContext} The current WebGL rendering context
 * @param program {WebGLProgram} The shader program to get the attributes from
 * @return attributes {Object}
 */
var extractAttributes = function(gl, program)
{
    var attributes = {};

    var totalAttributes = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);

    for (var i = 0; i < totalAttributes; i++)
    {
        var attribData = gl.getActiveAttrib(program, i);
        var type = mapType(gl, attribData.type);

        attributes[attribData.name] = {
            type:type,
            size:mapSize_1(type),
            location:gl.getAttribLocation(program, attribData.name),
            //TODO - make an attribute object
            pointer: pointer
        };
    }

    return attributes;
};

var pointer = function(type, normalized, stride, start){
    // console.log(this.location)
    gl.vertexAttribPointer(this.location,this.size, type || gl.FLOAT, normalized || false, stride || 0, start || 0);
};

var extractAttributes_1 = extractAttributes;

/**
 * @class
 * @memberof PIXI.glCore.shader
 * @param type {String} Type of value
 * @param size {Number}
 */
var defaultValue = function(type, size) 
{
    switch (type)
    {
        case 'float':
            return 0;

        case 'vec2': 
            return new Float32Array(2 * size);

        case 'vec3':
            return new Float32Array(3 * size);

        case 'vec4':     
            return new Float32Array(4 * size);
            
        case 'int':
        case 'sampler2D':
            return 0;

        case 'ivec2':   
            return new Int32Array(2 * size);

        case 'ivec3':
            return new Int32Array(3 * size);

        case 'ivec4': 
            return new Int32Array(4 * size);

        case 'bool':     
            return false;

        case 'bvec2':

            return booleanArray( 2 * size);

        case 'bvec3':
            return booleanArray(3 * size);

        case 'bvec4':
            return booleanArray(4 * size);

        case 'mat2':
            return new Float32Array([1, 0,
                                     0, 1]);

        case 'mat3': 
            return new Float32Array([1, 0, 0,
                                     0, 1, 0,
                                     0, 0, 1]);

        case 'mat4':
            return new Float32Array([1, 0, 0, 0,
                                     0, 1, 0, 0,
                                     0, 0, 1, 0,
                                     0, 0, 0, 1]);
    }
};

var booleanArray = function(size)
{
    var array = new Array(size);

    for (var i = 0; i < array.length; i++) 
    {
        array[i] = false;
    }

    return array;
};

var defaultValue_1 = defaultValue;

/**
 * Extracts the uniforms
 * @class
 * @memberof PIXI.glCore.shader
 * @param gl {WebGLRenderingContext} The current WebGL rendering context
 * @param program {WebGLProgram} The shader program to get the uniforms from
 * @return uniforms {Object}
 */
var extractUniforms = function(gl, program)
{
	var uniforms = {};

    var totalUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);

    for (var i = 0; i < totalUniforms; i++)
    {
    	var uniformData = gl.getActiveUniform(program, i);
    	var name = uniformData.name.replace(/\[.*?\]/, "");
        var type = mapType(gl, uniformData.type );

    	uniforms[name] = {
    		type:type,
    		size:uniformData.size,
    		location:gl.getUniformLocation(program, name),
    		value:defaultValue_1(type, uniformData.size)
    	};
    }

	return uniforms;
};

var extractUniforms_1 = extractUniforms;

/**
 * Sets the float precision on the shader. If the precision is already present this function will do nothing
 * @param {string} src       the shader source
 * @param {string} precision The float precision of the shader. Options are 'lowp', 'mediump' or 'highp'.
 *
 * @return {string} modified shader source
 */
var setPrecision = function(src, precision)
{
    if(src.substring(0, 9) !== 'precision')
    {
        return 'precision ' + precision + ' float;\n' + src;
    }

    return src;
};

var setPrecision_1 = setPrecision;

/**
 * Extracts the attributes
 * @class
 * @memberof PIXI.glCore.shader
 * @param gl {WebGLRenderingContext} The current WebGL rendering context
 * @param uniforms {Array} @mat ?
 * @return attributes {Object}
 */
var generateUniformAccessObject = function(gl, uniformData)
{
    // this is the object we will be sending back.
    // an object hierachy will be created for structs
    var uniforms = {data:{}};

    uniforms.gl = gl;

    var uniformKeys= Object.keys(uniformData);

    for (var i = 0; i < uniformKeys.length; i++)
    {
        var fullName = uniformKeys[i];

        var nameTokens = fullName.split('.');
        var name = nameTokens[nameTokens.length - 1];


        var uniformGroup = getUniformGroup(nameTokens, uniforms);

        var uniform =  uniformData[fullName];
        uniformGroup.data[name] = uniform;

        uniformGroup.gl = gl;

        Object.defineProperty(uniformGroup, name, {
            get: generateGetter(name),
            set: generateSetter(name, uniform)
        });
    }

    return uniforms;
};

var generateGetter = function(name)
{
	var template = getterTemplate.replace('%%', name);
	return new Function(template); // jshint ignore:line
};

var generateSetter = function(name, uniform)
{
    var template = setterTemplate.replace(/%%/g, name);
    var setTemplate;

    if(uniform.size === 1)
    {
        setTemplate = GLSL_TO_SINGLE_SETTERS[uniform.type];
    }
    else
    {
        setTemplate = GLSL_TO_ARRAY_SETTERS[uniform.type];
    }

    if(setTemplate)
    {
        template += "\nthis.gl." + setTemplate + ";";
    }

  	return new Function('value', template); // jshint ignore:line
};

var getUniformGroup = function(nameTokens, uniform)
{
    var cur = uniform;

    for (var i = 0; i < nameTokens.length - 1; i++)
    {
        var o = cur[nameTokens[i]] || {data:{}};
        cur[nameTokens[i]] = o;
        cur = o;
    }

    return cur;
};

var getterTemplate = [
    'return this.data.%%.value;',
].join('\n');

var setterTemplate = [
    'this.data.%%.value = value;',
    'var location = this.data.%%.location;'
].join('\n');


var GLSL_TO_SINGLE_SETTERS = {

    'float':    'uniform1f(location, value)',

    'vec2':     'uniform2f(location, value[0], value[1])',
    'vec3':     'uniform3f(location, value[0], value[1], value[2])',
    'vec4':     'uniform4f(location, value[0], value[1], value[2], value[3])',

    'int':      'uniform1i(location, value)',
    'ivec2':    'uniform2i(location, value[0], value[1])',
    'ivec3':    'uniform3i(location, value[0], value[1], value[2])',
    'ivec4':    'uniform4i(location, value[0], value[1], value[2], value[3])',

    'bool':     'uniform1i(location, value)',
    'bvec2':    'uniform2i(location, value[0], value[1])',
    'bvec3':    'uniform3i(location, value[0], value[1], value[2])',
    'bvec4':    'uniform4i(location, value[0], value[1], value[2], value[3])',

    'mat2':     'uniformMatrix2fv(location, false, value)',
    'mat3':     'uniformMatrix3fv(location, false, value)',
    'mat4':     'uniformMatrix4fv(location, false, value)',

    'sampler2D':'uniform1i(location, value)'
};

var GLSL_TO_ARRAY_SETTERS = {

    'float':    'uniform1fv(location, value)',

    'vec2':     'uniform2fv(location, value)',
    'vec3':     'uniform3fv(location, value)',
    'vec4':     'uniform4fv(location, value)',

    'int':      'uniform1iv(location, value)',
    'ivec2':    'uniform2iv(location, value)',
    'ivec3':    'uniform3iv(location, value)',
    'ivec4':    'uniform4iv(location, value)',

    'bool':     'uniform1iv(location, value)',
    'bvec2':    'uniform2iv(location, value)',
    'bvec3':    'uniform3iv(location, value)',
    'bvec4':    'uniform4iv(location, value)',

    'sampler2D':'uniform1iv(location, value)'
};

var generateUniformAccessObject_1 = generateUniformAccessObject;

/**
 * Helper class to create a webGL Shader
 *
 * @class
 * @memberof PIXI.glCore
 * @param gl {WebGLRenderingContext}
 * @param vertexSrc {string|string[]} The vertex shader source as an array of strings.
 * @param fragmentSrc {string|string[]} The fragment shader source as an array of strings.
 * @param precision {precision]} The float precision of the shader. Options are 'lowp', 'mediump' or 'highp'.
 * @param attributeLocations {object} A key value pair showing which location eact attribute should sit eg {position:0, uvs:1}
 */
var Shader = function(gl, vertexSrc, fragmentSrc, precision, attributeLocations)
{
	/**
	 * The current WebGL rendering context
	 *
	 * @member {WebGLRenderingContext}
	 */
	this.gl = gl;

	if(precision)
	{
		vertexSrc = setPrecision_1(vertexSrc, precision);
		fragmentSrc = setPrecision_1(fragmentSrc, precision);
	}

	/**
	 * The shader program
	 *
	 * @member {WebGLProgram}
	 */
	// First compile the program..
	this.program = compileProgram_1(gl, vertexSrc, fragmentSrc, attributeLocations);

	/**
	 * The attributes of the shader as an object containing the following properties
	 * {
	 * 	type,
	 * 	size,
	 * 	location,
	 * 	pointer
	 * }
	 * @member {Object}
	 */
	// next extract the attributes
	this.attributes = extractAttributes_1(gl, this.program);

    this.uniformData = extractUniforms_1(gl, this.program);

	/**
	 * The uniforms of the shader as an object containing the following properties
	 * {
	 * 	gl,
	 * 	data
	 * }
	 * @member {Object}
	 */
	this.uniforms = generateUniformAccessObject_1( gl, this.uniformData );

};
/**
 * Uses this shader
 */
Shader.prototype.bind = function()
{
	this.gl.useProgram(this.program);
};

/**
 * Destroys this shader
 * TODO
 */
Shader.prototype.destroy = function()
{
	this.attributes = null;
	this.uniformData = null;
	this.uniforms = null;

	var gl = this.gl;
	gl.deleteProgram(this.program);
};


var GLShader = Shader;

// state object//


/**
 * Helper class to work with WebGL VertexArrayObjects (vaos)
 * Only works if WebGL extensions are enabled (they usually are)
 *
 * @class
 * @memberof PIXI.glCore
 * @param gl {WebGLRenderingContext} The current WebGL rendering context
 */
function VertexArrayObject(gl, state)
{
    this.nativeVaoExtension = null;

    if(!VertexArrayObject.FORCE_NATIVE)
    {
        this.nativeVaoExtension = gl.getExtension('OES_vertex_array_object') ||
                                  gl.getExtension('MOZ_OES_vertex_array_object') ||
                                  gl.getExtension('WEBKIT_OES_vertex_array_object');
    }

    this.nativeState = state;

    if(this.nativeVaoExtension)
    {
        this.nativeVao = this.nativeVaoExtension.createVertexArrayOES();

        var maxAttribs = gl.getParameter(gl.MAX_VERTEX_ATTRIBS);

        // VAO - overwrite the state..
        this.nativeState = {
            tempAttribState: new Array(maxAttribs),
            attribState: new Array(maxAttribs)
        };
    }

    /**
     * The current WebGL rendering context
     *
     * @member {WebGLRenderingContext}
     */
    this.gl = gl;

    /**
     * An array of attributes
     *
     * @member {Array}
     */
    this.attributes = [];

    /**
     * @member {PIXI.glCore.GLBuffer}
     */
    this.indexBuffer = null;

    /**
     * A boolean flag
     *
     * @member {Boolean}
     */
    this.dirty = false;
}

VertexArrayObject.prototype.constructor = VertexArrayObject;
var VertexArrayObject_1 = VertexArrayObject;

/**
* Some devices behave a bit funny when using the newer extensions (im looking at you ipad 2!)
* If you find on older devices that things have gone a bit weird then set this to true.
*/
/**
 * Lets the VAO know if you should use the WebGL extension or the native methods.
 * Some devices behave a bit funny when using the newer extensions (im looking at you ipad 2!)
 * If you find on older devices that things have gone a bit weird then set this to true.
 * @static
 * @property {Boolean} FORCE_NATIVE
 */
VertexArrayObject.FORCE_NATIVE = false;

/**
 * Binds the buffer
 */
VertexArrayObject.prototype.bind = function()
{
    if(this.nativeVao)
    {
        this.nativeVaoExtension.bindVertexArrayOES(this.nativeVao);

        if(this.dirty)
        {
            this.dirty = false;
            this.activate();
        }
    }
    else
    {

        this.activate();
    }

    return this;
};

/**
 * Unbinds the buffer
 */
VertexArrayObject.prototype.unbind = function()
{
    if(this.nativeVao)
    {
        this.nativeVaoExtension.bindVertexArrayOES(null);
    }

    return this;
};

/**
 * Uses this vao
 */
VertexArrayObject.prototype.activate = function()
{

    var gl = this.gl;
    var lastBuffer = null;

    for (var i = 0; i < this.attributes.length; i++)
    {
        var attrib = this.attributes[i];

        if(lastBuffer !== attrib.buffer)
        {
            attrib.buffer.bind();
            lastBuffer = attrib.buffer;
        }

        gl.vertexAttribPointer(attrib.attribute.location,
                               attrib.attribute.size,
                               attrib.type || gl.FLOAT,
                               attrib.normalized || false,
                               attrib.stride || 0,
                               attrib.start || 0);
    }

    setVertexAttribArrays_1(gl, this.attributes, this.nativeState);

    if(this.indexBuffer)
    {
        this.indexBuffer.bind();
    }

    return this;
};

/**
 *
 * @param buffer     {PIXI.gl.GLBuffer}
 * @param attribute  {*}
 * @param type       {String}
 * @param normalized {Boolean}
 * @param stride     {Number}
 * @param start      {Number}
 */
VertexArrayObject.prototype.addAttribute = function(buffer, attribute, type, normalized, stride, start)
{
    this.attributes.push({
        buffer:     buffer,
        attribute:  attribute,

        location:   attribute.location,
        type:       type || this.gl.FLOAT,
        normalized: normalized || false,
        stride:     stride || 0,
        start:      start || 0
    });

    this.dirty = true;

    return this;
};

/**
 *
 * @param buffer   {PIXI.gl.GLBuffer}
 */
VertexArrayObject.prototype.addIndex = function(buffer/*, options*/)
{
    this.indexBuffer = buffer;

    this.dirty = true;

    return this;
};

/**
 * Unbinds this vao and disables it
 */
VertexArrayObject.prototype.clear = function()
{
    // var gl = this.gl;

    // TODO - should this function unbind after clear?
    // for now, no but lets see what happens in the real world!
    if(this.nativeVao)
    {
        this.nativeVaoExtension.bindVertexArrayOES(this.nativeVao);
    }

    this.attributes.length = 0;
    this.indexBuffer = null;

    return this;
};

/**
 * @param type  {Number}
 * @param size  {Number}
 * @param start {Number}
 */
VertexArrayObject.prototype.draw = function(type, size, start)
{
    var gl = this.gl;

    if(this.indexBuffer)
    {
        gl.drawElements(type, size || this.indexBuffer.data.length, gl.UNSIGNED_SHORT, (start || 0) * 2 );
    }
    else
    {
        // TODO need a better way to calculate size..
        gl.drawArrays(type, start, size || this.getSize());
    }

    return this;
};

/**
 * Destroy this vao
 */
VertexArrayObject.prototype.destroy = function()
{
    // lose references
    this.gl = null;
    this.indexBuffer = null;
    this.attributes = null;
    this.nativeState = null;

    if(this.nativeVao)
    {
        this.nativeVaoExtension.deleteVertexArrayOES(this.nativeVao);
    }

    this.nativeVaoExtension = null;
    this.nativeVao = null;
};

VertexArrayObject.prototype.getSize = function()
{
    var attrib = this.attributes[0];
    return attrib.buffer.data.length / (( attrib.stride/4 ) || attrib.attribute.size);
};

var index$1 = {
    compileProgram: compileProgram_1,
    defaultValue: defaultValue_1,
    extractAttributes: extractAttributes_1,
    extractUniforms: extractUniforms_1,
    generateUniformAccessObject: generateUniformAccessObject_1,
    setPrecision: setPrecision_1,
    mapSize: mapSize_1,
    mapType: mapType
};

var index = createCommonjsModule(function (module) {
var gl = {
    createContext:          createContext_1,
    setVertexAttribArrays:  setVertexAttribArrays_1,
    GLBuffer:               GLBuffer,
    GLFramebuffer:          GLFramebuffer$1,
    GLShader:               GLShader,
    GLTexture:              GLTexture,
    VertexArrayObject:      VertexArrayObject_1,
    shader:                 index$1
};

// Export for Node-compatible environments
if ('object' !== 'undefined' && module.exports)
{
    // Export the module
    module.exports = gl;
}

// Add to the browser window pixi.gl
if (typeof window !== 'undefined')
{
    // add the window object
    window.PIXI = window.PIXI || {};
    window.PIXI.glCore = gl;
}
});

var GLFramebuffer = index.GLFramebuffer;

var RenderTarget = function () {
    function RenderTarget(gl, width, height, scaleMode, resolution, root) {
        classCallCheck(this, RenderTarget);


        this.gl = gl;

        //framebuffer是WebGL渲染的终点。当你看屏幕时，其他就是在看framebuffer中的内容。
        this.frameBuffer = null;

        this.clearColor = [0, 0, 0, 0];

        this.size = new Rectangle(0, 0, 1, 1);

        /**
         * 设备分辨率
         */
        this.resolution = resolution || settings.RESOLUTION;

        //投影矩阵，把所有的顶点投射到webgl的[-1,1]的坐标系内
        this.projectionMatrix = new Matrix();

        this.frame = null;

        this.defaultFrame = new Rectangle();
        this.destinationFrame = null;
        this.sourceFrame = null;

        debugger;
        /**
         * The scale mode.
         *
         * @member {number}
         * @default PIXI.settings.SCALE_MODE
         * @see PIXI.SCALE_MODES
         */
        this.scaleMode = scaleMode || settings.SCALE_MODE;

        /**
         * Whether this object is the root element or not
         *
         * @member {boolean}
         */
        this.root = root;

        if (!this.root) {
            this.frameBuffer = GLFramebuffer.createRGBA(gl, 100, 100);

            if (this.scaleMode === SCALE_MODES.NEAREST) {
                this.frameBuffer.texture.enableNearestScaling();
            } else {
                this.frameBuffer.texture.enableLinearScaling();
            }
        } else {
            // make it a null framebuffer..
            this.frameBuffer = new GLFramebuffer(gl, 100, 100);
            this.frameBuffer.framebuffer = null;
        }

        this.setFrame();

        this.resize(width, height);
    }

    /**
     * Clears the filter texture.
     *
     * @param {number[]} [clearColor=this.clearColor] - Array of [r,g,b,a] to clear the framebuffer
     */


    createClass(RenderTarget, [{
        key: 'clear',
        value: function clear(clearColor) {
            var cc = clearColor || this.clearColor;

            this.frameBuffer.clear(cc[0], cc[1], cc[2], cc[3]); // r,g,b,a);
        }

        /**
         * Binds the stencil buffer.
         *
         */

    }, {
        key: 'attachStencilBuffer',
        value: function attachStencilBuffer() {
            // TODO check if stencil is done?
            /**
             * The stencil buffer is used for masking in pixi
             * lets create one and then add attach it to the framebuffer..
             */
            if (!this.root) {
                this.frameBuffer.enableStencil();
            }
        }

        /**
         * Sets the frame of the render target.
         *
         * @param {Rectangle} destinationFrame - The destination frame.
         * @param {Rectangle} sourceFrame - The source frame.
         */

    }, {
        key: 'setFrame',
        value: function setFrame(destinationFrame, sourceFrame) {
            this.destinationFrame = destinationFrame || this.destinationFrame || this.defaultFrame;
            this.sourceFrame = sourceFrame || this.sourceFrame || destinationFrame;
        }

        /**
         * Binds the buffers and initialises the viewport.
         *
         */

    }, {
        key: 'activate',
        value: function activate() {
            // TOOD refactor usage of frame..
            var gl = this.gl;

            // make sure the texture is unbound!
            this.frameBuffer.bind();

            this.calculateProjection(this.destinationFrame, this.sourceFrame);

            // TODO add a check as them may be the same!
            if (this.destinationFrame !== this.sourceFrame) {
                gl.enable(gl.SCISSOR_TEST);
                gl.scissor(this.destinationFrame.x | 0, this.destinationFrame.y | 0, this.destinationFrame.width * this.resolution | 0, this.destinationFrame.height * this.resolution | 0);
            } else {
                gl.disable(gl.SCISSOR_TEST);
            }

            // TODO - does not need to be updated all the time??
            gl.viewport(this.destinationFrame.x | 0, this.destinationFrame.y | 0, this.destinationFrame.width * this.resolution | 0, this.destinationFrame.height * this.resolution | 0);
        }

        /**
         * Updates the projection matrix based on a projection frame (which is a rectangle)
         *
         * @param {Rectangle} destinationFrame - The destination frame.
         * @param {Rectangle} sourceFrame - The source frame.
         */

    }, {
        key: 'calculateProjection',
        value: function calculateProjection(destinationFrame, sourceFrame) {
            var pm = this.projectionMatrix;

            sourceFrame = sourceFrame || destinationFrame;

            pm.identity();

            // TODO: make dest scale source
            if (!this.root) {
                pm.a = 1 / destinationFrame.width * 2;
                pm.d = 1 / destinationFrame.height * 2;

                pm.tx = -1 - sourceFrame.x * pm.a;
                pm.ty = -1 - sourceFrame.y * pm.d;
            } else {
                pm.a = 1 / destinationFrame.width * 2;
                pm.d = -1 / destinationFrame.height * 2;

                pm.tx = -1 - sourceFrame.x * pm.a;
                pm.ty = 1 - sourceFrame.y * pm.d;
            }
        }

        /**
         * Resizes the texture to the specified width and height
         *
         * @param {number} width - the new width of the texture
         * @param {number} height - the new height of the texture
         */

    }, {
        key: 'resize',
        value: function resize(width, height) {
            width = width | 0;
            height = height | 0;

            if (this.size.width === width && this.size.height === height) {
                return;
            }

            this.size.width = width;
            this.size.height = height;

            this.defaultFrame.width = width;
            this.defaultFrame.height = height;

            this.frameBuffer.resize(width * this.resolution, height * this.resolution);

            var projectionFrame = this.frame || this.size;

            this.calculateProjection(projectionFrame);
        }

        /**
         * Destroys the render target.
         *
         */

    }, {
        key: 'destroy',
        value: function destroy() {
            this.frameBuffer.destroy();
            this.frameBuffer = null;
        }
    }]);
    return RenderTarget;
}();

var ObjectRenderer = function () {
    function ObjectRenderer(renderer) {
        classCallCheck(this, ObjectRenderer);

        this.renderer = renderer;
    }

    createClass(ObjectRenderer, [{
        key: 'start',
        value: function start() {}
    }, {
        key: 'stop',
        value: function stop() {
            this.flush();
        }
    }, {
        key: 'flush',
        value: function flush() {}
    }, {
        key: 'destroy',
        value: function destroy() {
            this.renderer.off('context', this.onContextChange, this);

            this.renderer = null;
        }
    }, {
        key: 'render',
        value: function render(object) {}
    }]);
    return ObjectRenderer;
}();

var DEPTH_TEST = 1;
var FRONT_FACE = 2;
var CULL_FACE = 3;

/**
 * A WebGL state machines
 *
 * @memberof PIXI
 * @class
 */

var WebGLState = function () {
    /**
     * @param {WebGLRenderingContext} gl - The current WebGL rendering context
     */
    function WebGLState(gl) {
        classCallCheck(this, WebGLState);

        /**
         * The current active state
         *
         * @member {Uint8Array}
         */
        this.activeState = new Uint8Array(16);

        /**
         * The default state
         *
         * @member {Uint8Array}
         */
        this.defaultState = new Uint8Array(16);

        // default blend mode..
        this.defaultState[0] = 1;

        /**
         * The current state index in the stack
         *
         * @member {number}
         * @private
         */
        this.stackIndex = 0;

        /**
         * The stack holding all the different states
         *
         * @member {Array<*>}
         * @private
         */
        this.stack = [];

        /**
         * The current WebGL rendering context
         *
         * @member {WebGLRenderingContext}
         */
        this.gl = gl;

        this.maxAttribs = gl.getParameter(gl.MAX_VERTEX_ATTRIBS);

        this.attribState = {
            tempAttribState: new Array(this.maxAttribs),
            attribState: new Array(this.maxAttribs)
        };

        // check we have vao..
        this.nativeVaoExtension = gl.getExtension('OES_vertex_array_object') || gl.getExtension('MOZ_OES_vertex_array_object') || gl.getExtension('WEBKIT_OES_vertex_array_object');
    }

    /**
     * Pushes a new active state
     */


    createClass(WebGLState, [{
        key: 'push',
        value: function push() {
            // next state..
            var state = this.stack[++this.stackIndex];

            if (!state) {
                state = this.stack[this.stackIndex] = new Uint8Array(16);
            }

            // copy state..
            // set active state so we can force overrides of gl state
            for (var i = 0; i < this.activeState.length; i++) {
                this.activeState[i] = state[i];
            }
        }

        /**
         * Pops a state out
         */

    }, {
        key: 'pop',
        value: function pop() {
            var state = this.stack[--this.stackIndex];

            this.setState(state);
        }

        /**
         * Sets the current state
         *
         * @param {*} state - The state to set.
         */

    }, {
        key: 'setState',
        value: function setState(state) {
            this.setDepthTest(state[DEPTH_TEST]);
            this.setFrontFace(state[FRONT_FACE]);
            this.setCullFace(state[CULL_FACE]);
        }

        /**
         * Sets whether to enable or disable depth test.
         *
         * @param {boolean} value - Turn on or off webgl depth testing.
         */

    }, {
        key: 'setDepthTest',
        value: function setDepthTest(value) {
            value = value ? 1 : 0;

            if (this.activeState[DEPTH_TEST] === value) {
                return;
            }

            this.activeState[DEPTH_TEST] = value;
            this.gl[value ? 'enable' : 'disable'](this.gl.DEPTH_TEST);
        }

        /**
         * Sets whether to enable or disable cull face.
         *
         * @param {boolean} value - Turn on or off webgl cull face.
         */

    }, {
        key: 'setCullFace',
        value: function setCullFace(value) {
            value = value ? 1 : 0;

            if (this.activeState[CULL_FACE] === value) {
                return;
            }

            this.activeState[CULL_FACE] = value;
            this.gl[value ? 'enable' : 'disable'](this.gl.CULL_FACE);
        }

        /**
         * Sets the gl front face.
         *
         * @param {boolean} value - true is clockwise and false is counter-clockwise
         */

    }, {
        key: 'setFrontFace',
        value: function setFrontFace(value) {
            value = value ? 1 : 0;

            if (this.activeState[FRONT_FACE] === value) {
                return;
            }

            this.activeState[FRONT_FACE] = value;
            this.gl.frontFace(this.gl[value ? 'CW' : 'CCW']);
        }

        /**
         * Disables all the vaos in use
         *
         */

    }, {
        key: 'resetAttributes',
        value: function resetAttributes() {
            for (var i = 0; i < this.attribState.tempAttribState.length; i++) {
                this.attribState.tempAttribState[i] = 0;
            }

            for (var _i = 0; _i < this.attribState.attribState.length; _i++) {
                this.attribState.attribState[_i] = 0;
            }

            // im going to assume one is always active for performance reasons.
            for (var _i2 = 1; _i2 < this.maxAttribs; _i2++) {
                this.gl.disableVertexAttribArray(_i2);
            }
        }

        // used
        /**
         * Resets all the logic and disables the vaos
         */

    }, {
        key: 'resetToDefault',
        value: function resetToDefault() {
            // unbind any VAO if they exist..
            if (this.nativeVaoExtension) {
                this.nativeVaoExtension.bindVertexArrayOES(null);
            }

            // reset all attributes..
            this.resetAttributes();

            // set active state so we can force overrides of gl state
            for (var i = 0; i < this.activeState.length; ++i) {
                this.activeState[i] = 32;
            }

            this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, false);

            this.setState(this.defaultState);
        }
    }]);
    return WebGLState;
}();

function hex2rgb(hex, out) {
    out = out || [];

    out[0] = (hex >> 16 & 0xFF) / 255;
    out[1] = (hex >> 8 & 0xFF) / 255;
    out[2] = (hex & 0xFF) / 255;

    return out;
}

/**
 * An object containing WebGL specific properties to be used by the WebGL renderer
 *
 * @class
 * @private
 * @memberof PIXI
 */

var WebGLGraphicsData = function () {
  /**
   * @param {WebGLRenderingContext} gl - The current WebGL drawing context
   * @param {PIXI.Shader} shader - The shader
   * @param {object} attribsState - The state for the VAO
   */
  function WebGLGraphicsData(gl, shader, attribsState) {
    classCallCheck(this, WebGLGraphicsData);

    /**
     * The current WebGL drawing context
     *
     * @member {WebGLRenderingContext}
     */
    this.gl = gl;

    // TODO does this need to be split before uploading??
    /**
     * An array of color components (r,g,b)
     * @member {number[]}
     */
    this.color = [0, 0, 0]; // color split!

    /**
     * An array of points to draw
     * @member {PIXI.Point[]}
     */
    this.points = [];

    /**
     * The indices of the vertices
     * @member {number[]}
     */
    this.indices = [];
    /**
     * The main buffer
     * @member {WebGLBuffer}
     */
    this.buffer = index.GLBuffer.createVertexBuffer(gl);

    /**
     * The index buffer
     * @member {WebGLBuffer}
     */
    this.indexBuffer = index.GLBuffer.createIndexBuffer(gl);

    /**
     * Whether this graphics is dirty or not
     * @member {boolean}
     */
    this.dirty = true;

    this.glPoints = null;
    this.glIndices = null;

    /**
     *
     * @member {PIXI.Shader}
     */
    this.shader = shader;

    this.vao = new index.VertexArrayObject(gl, attribsState).addIndex(this.indexBuffer).addAttribute(this.buffer, shader.attributes.aVertexPosition, gl.FLOAT, false, 4 * 6, 0).addAttribute(this.buffer, shader.attributes.aColor, gl.FLOAT, false, 4 * 6, 2 * 4);
  }

  /**
   * Resets the vertices and the indices
   */


  createClass(WebGLGraphicsData, [{
    key: 'reset',
    value: function reset() {
      this.points.length = 0;
      this.indices.length = 0;
    }

    /**
     * Binds the buffers and uploads the data
     */

  }, {
    key: 'upload',
    value: function upload() {
      this.glPoints = new Float32Array(this.points);
      this.buffer.upload(this.glPoints);

      this.glIndices = new Uint16Array(this.indices);
      this.indexBuffer.upload(this.glIndices);

      this.dirty = false;
    }

    /**
     * Empties all the data
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      this.color = null;
      this.points = null;
      this.indices = null;

      this.vao.destroy();
      this.buffer.destroy();
      this.indexBuffer.destroy();

      this.gl = null;

      this.buffer = null;
      this.indexBuffer = null;

      this.glPoints = null;
      this.glIndices = null;
    }
  }]);
  return WebGLGraphicsData;
}();

var PRECISION = settings.PRECISION;

var GLShader$2 = index.GLShader;

function checkPrecision(src) {
    if (src instanceof Array) {
        if (src[0].substring(0, 9) !== 'precision') {
            var copy = src.slice(0);

            copy.unshift('precision ' + PRECISION + ' float;');

            return copy;
        }
    } else if (src.substring(0, 9) !== 'precision') {
        return 'precision ' + PRECISION + ' float;\n' + src;
    }

    return src;
}

/**
 * Wrapper class, webGL Shader for Pixi.
 * Adds precision string if vertexSrc or fragmentSrc have no mention of it.
 *
 * @class
 * @extends GLShader
 * @memberof PIXI
 */

var Shader$1 = function (_GLShader) {
    inherits(Shader, _GLShader);

    /**
     *
     * @param {WebGLRenderingContext} gl - The current WebGL rendering context
     * @param {string|string[]} vertexSrc - The vertex shader source as an array of strings.
     * @param {string|string[]} fragmentSrc - The fragment shader source as an array of strings.
     */
    function Shader(gl, vertexSrc, fragmentSrc) {
        classCallCheck(this, Shader);
        return possibleConstructorReturn(this, (Shader.__proto__ || Object.getPrototypeOf(Shader)).call(this, gl, checkPrecision(vertexSrc), checkPrecision(fragmentSrc)));
    }

    return Shader;
}(GLShader$2);

/**
 * This shader is used to draw simple primitive shapes for {@link PIXI.Graphics}.
 *
 * @class
 * @memberof PIXI
 * @extends PIXI.Shader
 */

var PrimitiveShader = function (_Shader) {
    inherits(PrimitiveShader, _Shader);

    /**
     * @param {WebGLRenderingContext} gl - The webgl shader manager this shader works for.
     */
    function PrimitiveShader(gl) {
        classCallCheck(this, PrimitiveShader);
        return possibleConstructorReturn(this, (PrimitiveShader.__proto__ || Object.getPrototypeOf(PrimitiveShader)).call(this, gl,
        // vertex shader
        ['attribute vec2 aVertexPosition;', 'attribute vec4 aColor;', 'uniform mat3 translationMatrix;', 'uniform mat3 projectionMatrix;', 'uniform float alpha;', 'uniform vec3 tint;', 'varying vec4 vColor;', 'void main(void){', '   gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);', '   vColor = aColor * vec4(tint * alpha, alpha);', '}'].join('\n'),
        // fragment shader
        ['varying vec4 vColor;', 'void main(void){', '   gl_FragColor = vColor;', '}'].join('\n')));
    }

    return PrimitiveShader;
}(Shader$1);

/**
 * Builds a line to draw
 *
 * Ignored from docs since it is not directly exposed.
 *
 * @ignore
 * @private
 * @param {PIXI.WebGLGraphicsData} graphicsData - The graphics object containing all the necessary properties
 * @param {object} webGLData - an object containing all the webGL-specific information to create this shape
 */
function buildLine(graphicsData, webGLData) {
    // TODO OPTIMISE!
    var points = graphicsData.points;

    if (points.length === 0) {
        return;
    }
    // if the line width is an odd number add 0.5 to align to a whole pixel
    // commenting this out fixes #711 and #1620
    // if (graphicsData.lineWidth%2)
    // {
    //     for (i = 0; i < points.length; i++)
    //     {
    //         points[i] += 0.5;
    //     }
    // }

    // get first and last point.. figure out the middle!
    var firstPoint = new Point$2(points[0], points[1]);
    var lastPoint = new Point$2(points[points.length - 2], points[points.length - 1]);

    // if the first point is the last point - gonna have issues :)
    if (firstPoint.x === lastPoint.x && firstPoint.y === lastPoint.y) {
        // need to clone as we are going to slightly modify the shape..
        points = points.slice();

        points.pop();
        points.pop();

        lastPoint = new Point$2(points[points.length - 2], points[points.length - 1]);

        var midPointX = lastPoint.x + (firstPoint.x - lastPoint.x) * 0.5;
        var midPointY = lastPoint.y + (firstPoint.y - lastPoint.y) * 0.5;

        points.unshift(midPointX, midPointY);
        points.push(midPointX, midPointY);
    }

    var verts = webGLData.points;
    var indices = webGLData.indices;
    var length = points.length / 2;
    var indexCount = points.length;
    var indexStart = verts.length / 6;

    // DRAW the Line
    var width = graphicsData.lineWidth / 2;

    // sort color
    var color = hex2rgb(graphicsData.strokeStyle);
    var alpha = graphicsData.lineAlpha;
    var r = color[0] * alpha;
    var g = color[1] * alpha;
    var b = color[2] * alpha;

    var p1x = points[0];
    var p1y = points[1];
    var p2x = points[2];
    var p2y = points[3];
    var p3x = 0;
    var p3y = 0;

    var perpx = -(p1y - p2y);
    var perpy = p1x - p2x;
    var perp2x = 0;
    var perp2y = 0;
    var perp3x = 0;
    var perp3y = 0;

    var dist = Math.sqrt(perpx * perpx + perpy * perpy);

    perpx /= dist;
    perpy /= dist;
    perpx *= width;
    perpy *= width;

    // start
    verts.push(p1x - perpx, p1y - perpy, r, g, b, alpha);

    verts.push(p1x + perpx, p1y + perpy, r, g, b, alpha);

    for (var i = 1; i < length - 1; ++i) {
        p1x = points[(i - 1) * 2];
        p1y = points[(i - 1) * 2 + 1];

        p2x = points[i * 2];
        p2y = points[i * 2 + 1];

        p3x = points[(i + 1) * 2];
        p3y = points[(i + 1) * 2 + 1];

        perpx = -(p1y - p2y);
        perpy = p1x - p2x;

        dist = Math.sqrt(perpx * perpx + perpy * perpy);
        perpx /= dist;
        perpy /= dist;
        perpx *= width;
        perpy *= width;

        perp2x = -(p2y - p3y);
        perp2y = p2x - p3x;

        dist = Math.sqrt(perp2x * perp2x + perp2y * perp2y);
        perp2x /= dist;
        perp2y /= dist;
        perp2x *= width;
        perp2y *= width;

        var a1 = -perpy + p1y - (-perpy + p2y);
        var b1 = -perpx + p2x - (-perpx + p1x);
        var c1 = (-perpx + p1x) * (-perpy + p2y) - (-perpx + p2x) * (-perpy + p1y);
        var a2 = -perp2y + p3y - (-perp2y + p2y);
        var b2 = -perp2x + p2x - (-perp2x + p3x);
        var c2 = (-perp2x + p3x) * (-perp2y + p2y) - (-perp2x + p2x) * (-perp2y + p3y);

        var denom = a1 * b2 - a2 * b1;

        if (Math.abs(denom) < 0.1) {
            denom += 10.1;
            verts.push(p2x - perpx, p2y - perpy, r, g, b, alpha);

            verts.push(p2x + perpx, p2y + perpy, r, g, b, alpha);

            continue;
        }

        var px = (b1 * c2 - b2 * c1) / denom;
        var py = (a2 * c1 - a1 * c2) / denom;
        var pdist = (px - p2x) * (px - p2x) + (py - p2y) * (py - p2y);

        if (pdist > 196 * width * width) {
            perp3x = perpx - perp2x;
            perp3y = perpy - perp2y;

            dist = Math.sqrt(perp3x * perp3x + perp3y * perp3y);
            perp3x /= dist;
            perp3y /= dist;
            perp3x *= width;
            perp3y *= width;

            verts.push(p2x - perp3x, p2y - perp3y);
            verts.push(r, g, b, alpha);

            verts.push(p2x + perp3x, p2y + perp3y);
            verts.push(r, g, b, alpha);

            verts.push(p2x - perp3x, p2y - perp3y);
            verts.push(r, g, b, alpha);

            indexCount++;
        } else {
            verts.push(px, py);
            verts.push(r, g, b, alpha);

            verts.push(p2x - (px - p2x), p2y - (py - p2y));
            verts.push(r, g, b, alpha);
        }
    }

    p1x = points[(length - 2) * 2];
    p1y = points[(length - 2) * 2 + 1];

    p2x = points[(length - 1) * 2];
    p2y = points[(length - 1) * 2 + 1];

    perpx = -(p1y - p2y);
    perpy = p1x - p2x;

    dist = Math.sqrt(perpx * perpx + perpy * perpy);
    perpx /= dist;
    perpy /= dist;
    perpx *= width;
    perpy *= width;

    verts.push(p2x - perpx, p2y - perpy);
    verts.push(r, g, b, alpha);

    verts.push(p2x + perpx, p2y + perpy);
    verts.push(r, g, b, alpha);

    indices.push(indexStart);

    for (var _i = 0; _i < indexCount; ++_i) {
        indices.push(indexStart++);
    }

    indices.push(indexStart - 1);
}

var earcut_1 = earcut;

function earcut(data, holeIndices, dim) {

    dim = dim || 2;

    var hasHoles = holeIndices && holeIndices.length,
        outerLen = hasHoles ? holeIndices[0] * dim : data.length,
        outerNode = linkedList(data, 0, outerLen, dim, true),
        triangles = [];

    if (!outerNode) return triangles;

    var minX, minY, maxX, maxY, x, y, size;

    if (hasHoles) outerNode = eliminateHoles(data, holeIndices, outerNode, dim);

    // if the shape is not too simple, we'll use z-order curve hash later; calculate polygon bbox
    if (data.length > 80 * dim) {
        minX = maxX = data[0];
        minY = maxY = data[1];

        for (var i = dim; i < outerLen; i += dim) {
            x = data[i];
            y = data[i + 1];
            if (x < minX) minX = x;
            if (y < minY) minY = y;
            if (x > maxX) maxX = x;
            if (y > maxY) maxY = y;
        }

        // minX, minY and size are later used to transform coords into integers for z-order calculation
        size = Math.max(maxX - minX, maxY - minY);
    }

    earcutLinked(outerNode, triangles, dim, minX, minY, size);

    return triangles;
}

// create a circular doubly linked list from polygon points in the specified winding order
function linkedList(data, start, end, dim, clockwise) {
    var i, last;

    if (clockwise === (signedArea(data, start, end, dim) > 0)) {
        for (i = start; i < end; i += dim) last = insertNode(i, data[i], data[i + 1], last);
    } else {
        for (i = end - dim; i >= start; i -= dim) last = insertNode(i, data[i], data[i + 1], last);
    }

    if (last && equals(last, last.next)) {
        removeNode(last);
        last = last.next;
    }

    return last;
}

// eliminate colinear or duplicate points
function filterPoints(start, end) {
    if (!start) return start;
    if (!end) end = start;

    var p = start,
        again;
    do {
        again = false;

        if (!p.steiner && (equals(p, p.next) || area(p.prev, p, p.next) === 0)) {
            removeNode(p);
            p = end = p.prev;
            if (p === p.next) return null;
            again = true;

        } else {
            p = p.next;
        }
    } while (again || p !== end);

    return end;
}

// main ear slicing loop which triangulates a polygon (given as a linked list)
function earcutLinked(ear, triangles, dim, minX, minY, size, pass) {
    if (!ear) return;

    // interlink polygon nodes in z-order
    if (!pass && size) indexCurve(ear, minX, minY, size);

    var stop = ear,
        prev, next;

    // iterate through ears, slicing them one by one
    while (ear.prev !== ear.next) {
        prev = ear.prev;
        next = ear.next;

        if (size ? isEarHashed(ear, minX, minY, size) : isEar(ear)) {
            // cut off the triangle
            triangles.push(prev.i / dim);
            triangles.push(ear.i / dim);
            triangles.push(next.i / dim);

            removeNode(ear);

            // skipping the next vertice leads to less sliver triangles
            ear = next.next;
            stop = next.next;

            continue;
        }

        ear = next;

        // if we looped through the whole remaining polygon and can't find any more ears
        if (ear === stop) {
            // try filtering points and slicing again
            if (!pass) {
                earcutLinked(filterPoints(ear), triangles, dim, minX, minY, size, 1);

            // if this didn't work, try curing all small self-intersections locally
            } else if (pass === 1) {
                ear = cureLocalIntersections(ear, triangles, dim);
                earcutLinked(ear, triangles, dim, minX, minY, size, 2);

            // as a last resort, try splitting the remaining polygon into two
            } else if (pass === 2) {
                splitEarcut(ear, triangles, dim, minX, minY, size);
            }

            break;
        }
    }
}

// check whether a polygon node forms a valid ear with adjacent nodes
function isEar(ear) {
    var a = ear.prev,
        b = ear,
        c = ear.next;

    if (area(a, b, c) >= 0) return false; // reflex, can't be an ear

    // now make sure we don't have other points inside the potential ear
    var p = ear.next.next;

    while (p !== ear.prev) {
        if (pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&
            area(p.prev, p, p.next) >= 0) return false;
        p = p.next;
    }

    return true;
}

function isEarHashed(ear, minX, minY, size) {
    var a = ear.prev,
        b = ear,
        c = ear.next;

    if (area(a, b, c) >= 0) return false; // reflex, can't be an ear

    // triangle bbox; min & max are calculated like this for speed
    var minTX = a.x < b.x ? (a.x < c.x ? a.x : c.x) : (b.x < c.x ? b.x : c.x),
        minTY = a.y < b.y ? (a.y < c.y ? a.y : c.y) : (b.y < c.y ? b.y : c.y),
        maxTX = a.x > b.x ? (a.x > c.x ? a.x : c.x) : (b.x > c.x ? b.x : c.x),
        maxTY = a.y > b.y ? (a.y > c.y ? a.y : c.y) : (b.y > c.y ? b.y : c.y);

    // z-order range for the current triangle bbox;
    var minZ = zOrder(minTX, minTY, minX, minY, size),
        maxZ = zOrder(maxTX, maxTY, minX, minY, size);

    // first look for points inside the triangle in increasing z-order
    var p = ear.nextZ;

    while (p && p.z <= maxZ) {
        if (p !== ear.prev && p !== ear.next &&
            pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&
            area(p.prev, p, p.next) >= 0) return false;
        p = p.nextZ;
    }

    // then look for points in decreasing z-order
    p = ear.prevZ;

    while (p && p.z >= minZ) {
        if (p !== ear.prev && p !== ear.next &&
            pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&
            area(p.prev, p, p.next) >= 0) return false;
        p = p.prevZ;
    }

    return true;
}

// go through all polygon nodes and cure small local self-intersections
function cureLocalIntersections(start, triangles, dim) {
    var p = start;
    do {
        var a = p.prev,
            b = p.next.next;

        if (!equals(a, b) && intersects(a, p, p.next, b) && locallyInside(a, b) && locallyInside(b, a)) {

            triangles.push(a.i / dim);
            triangles.push(p.i / dim);
            triangles.push(b.i / dim);

            // remove two nodes involved
            removeNode(p);
            removeNode(p.next);

            p = start = b;
        }
        p = p.next;
    } while (p !== start);

    return p;
}

// try splitting polygon into two and triangulate them independently
function splitEarcut(start, triangles, dim, minX, minY, size) {
    // look for a valid diagonal that divides the polygon into two
    var a = start;
    do {
        var b = a.next.next;
        while (b !== a.prev) {
            if (a.i !== b.i && isValidDiagonal(a, b)) {
                // split the polygon in two by the diagonal
                var c = splitPolygon(a, b);

                // filter colinear points around the cuts
                a = filterPoints(a, a.next);
                c = filterPoints(c, c.next);

                // run earcut on each half
                earcutLinked(a, triangles, dim, minX, minY, size);
                earcutLinked(c, triangles, dim, minX, minY, size);
                return;
            }
            b = b.next;
        }
        a = a.next;
    } while (a !== start);
}

// link every hole into the outer loop, producing a single-ring polygon without holes
function eliminateHoles(data, holeIndices, outerNode, dim) {
    var queue = [],
        i, len, start, end, list;

    for (i = 0, len = holeIndices.length; i < len; i++) {
        start = holeIndices[i] * dim;
        end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
        list = linkedList(data, start, end, dim, false);
        if (list === list.next) list.steiner = true;
        queue.push(getLeftmost(list));
    }

    queue.sort(compareX);

    // process holes from left to right
    for (i = 0; i < queue.length; i++) {
        eliminateHole(queue[i], outerNode);
        outerNode = filterPoints(outerNode, outerNode.next);
    }

    return outerNode;
}

function compareX(a, b) {
    return a.x - b.x;
}

// find a bridge between vertices that connects hole with an outer ring and and link it
function eliminateHole(hole, outerNode) {
    outerNode = findHoleBridge(hole, outerNode);
    if (outerNode) {
        var b = splitPolygon(outerNode, hole);
        filterPoints(b, b.next);
    }
}

// David Eberly's algorithm for finding a bridge between hole and outer polygon
function findHoleBridge(hole, outerNode) {
    var p = outerNode,
        hx = hole.x,
        hy = hole.y,
        qx = -Infinity,
        m;

    // find a segment intersected by a ray from the hole's leftmost point to the left;
    // segment's endpoint with lesser x will be potential connection point
    do {
        if (hy <= p.y && hy >= p.next.y) {
            var x = p.x + (hy - p.y) * (p.next.x - p.x) / (p.next.y - p.y);
            if (x <= hx && x > qx) {
                qx = x;
                if (x === hx) {
                    if (hy === p.y) return p;
                    if (hy === p.next.y) return p.next;
                }
                m = p.x < p.next.x ? p : p.next;
            }
        }
        p = p.next;
    } while (p !== outerNode);

    if (!m) return null;

    if (hx === qx) return m.prev; // hole touches outer segment; pick lower endpoint

    // look for points inside the triangle of hole point, segment intersection and endpoint;
    // if there are no points found, we have a valid connection;
    // otherwise choose the point of the minimum angle with the ray as connection point

    var stop = m,
        mx = m.x,
        my = m.y,
        tanMin = Infinity,
        tan;

    p = m.next;

    while (p !== stop) {
        if (hx >= p.x && p.x >= mx &&
                pointInTriangle(hy < my ? hx : qx, hy, mx, my, hy < my ? qx : hx, hy, p.x, p.y)) {

            tan = Math.abs(hy - p.y) / (hx - p.x); // tangential

            if ((tan < tanMin || (tan === tanMin && p.x > m.x)) && locallyInside(p, hole)) {
                m = p;
                tanMin = tan;
            }
        }

        p = p.next;
    }

    return m;
}

// interlink polygon nodes in z-order
function indexCurve(start, minX, minY, size) {
    var p = start;
    do {
        if (p.z === null) p.z = zOrder(p.x, p.y, minX, minY, size);
        p.prevZ = p.prev;
        p.nextZ = p.next;
        p = p.next;
    } while (p !== start);

    p.prevZ.nextZ = null;
    p.prevZ = null;

    sortLinked(p);
}

// Simon Tatham's linked list merge sort algorithm
// http://www.chiark.greenend.org.uk/~sgtatham/algorithms/listsort.html
function sortLinked(list) {
    var i, p, q, e, tail, numMerges, pSize, qSize,
        inSize = 1;

    do {
        p = list;
        list = null;
        tail = null;
        numMerges = 0;

        while (p) {
            numMerges++;
            q = p;
            pSize = 0;
            for (i = 0; i < inSize; i++) {
                pSize++;
                q = q.nextZ;
                if (!q) break;
            }

            qSize = inSize;

            while (pSize > 0 || (qSize > 0 && q)) {

                if (pSize === 0) {
                    e = q;
                    q = q.nextZ;
                    qSize--;
                } else if (qSize === 0 || !q) {
                    e = p;
                    p = p.nextZ;
                    pSize--;
                } else if (p.z <= q.z) {
                    e = p;
                    p = p.nextZ;
                    pSize--;
                } else {
                    e = q;
                    q = q.nextZ;
                    qSize--;
                }

                if (tail) tail.nextZ = e;
                else list = e;

                e.prevZ = tail;
                tail = e;
            }

            p = q;
        }

        tail.nextZ = null;
        inSize *= 2;

    } while (numMerges > 1);

    return list;
}

// z-order of a point given coords and size of the data bounding box
function zOrder(x, y, minX, minY, size) {
    // coords are transformed into non-negative 15-bit integer range
    x = 32767 * (x - minX) / size;
    y = 32767 * (y - minY) / size;

    x = (x | (x << 8)) & 0x00FF00FF;
    x = (x | (x << 4)) & 0x0F0F0F0F;
    x = (x | (x << 2)) & 0x33333333;
    x = (x | (x << 1)) & 0x55555555;

    y = (y | (y << 8)) & 0x00FF00FF;
    y = (y | (y << 4)) & 0x0F0F0F0F;
    y = (y | (y << 2)) & 0x33333333;
    y = (y | (y << 1)) & 0x55555555;

    return x | (y << 1);
}

// find the leftmost node of a polygon ring
function getLeftmost(start) {
    var p = start,
        leftmost = start;
    do {
        if (p.x < leftmost.x) leftmost = p;
        p = p.next;
    } while (p !== start);

    return leftmost;
}

// check if a point lies within a convex triangle
function pointInTriangle(ax, ay, bx, by, cx, cy, px, py) {
    return (cx - px) * (ay - py) - (ax - px) * (cy - py) >= 0 &&
           (ax - px) * (by - py) - (bx - px) * (ay - py) >= 0 &&
           (bx - px) * (cy - py) - (cx - px) * (by - py) >= 0;
}

// check if a diagonal between two polygon nodes is valid (lies in polygon interior)
function isValidDiagonal(a, b) {
    return a.next.i !== b.i && a.prev.i !== b.i && !intersectsPolygon(a, b) &&
           locallyInside(a, b) && locallyInside(b, a) && middleInside(a, b);
}

// signed area of a triangle
function area(p, q, r) {
    return (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
}

// check if two points are equal
function equals(p1, p2) {
    return p1.x === p2.x && p1.y === p2.y;
}

// check if two segments intersect
function intersects(p1, q1, p2, q2) {
    if ((equals(p1, q1) && equals(p2, q2)) ||
        (equals(p1, q2) && equals(p2, q1))) return true;
    return area(p1, q1, p2) > 0 !== area(p1, q1, q2) > 0 &&
           area(p2, q2, p1) > 0 !== area(p2, q2, q1) > 0;
}

// check if a polygon diagonal intersects any polygon segments
function intersectsPolygon(a, b) {
    var p = a;
    do {
        if (p.i !== a.i && p.next.i !== a.i && p.i !== b.i && p.next.i !== b.i &&
                intersects(p, p.next, a, b)) return true;
        p = p.next;
    } while (p !== a);

    return false;
}

// check if a polygon diagonal is locally inside the polygon
function locallyInside(a, b) {
    return area(a.prev, a, a.next) < 0 ?
        area(a, b, a.next) >= 0 && area(a, a.prev, b) >= 0 :
        area(a, b, a.prev) < 0 || area(a, a.next, b) < 0;
}

// check if the middle point of a polygon diagonal is inside the polygon
function middleInside(a, b) {
    var p = a,
        inside = false,
        px = (a.x + b.x) / 2,
        py = (a.y + b.y) / 2;
    do {
        if (((p.y > py) !== (p.next.y > py)) && (px < (p.next.x - p.x) * (py - p.y) / (p.next.y - p.y) + p.x))
            inside = !inside;
        p = p.next;
    } while (p !== a);

    return inside;
}

// link two polygon vertices with a bridge; if the vertices belong to the same ring, it splits polygon into two;
// if one belongs to the outer ring and another to a hole, it merges it into a single ring
function splitPolygon(a, b) {
    var a2 = new Node(a.i, a.x, a.y),
        b2 = new Node(b.i, b.x, b.y),
        an = a.next,
        bp = b.prev;

    a.next = b;
    b.prev = a;

    a2.next = an;
    an.prev = a2;

    b2.next = a2;
    a2.prev = b2;

    bp.next = b2;
    b2.prev = bp;

    return b2;
}

// create a node and optionally link it with previous one (in a circular doubly linked list)
function insertNode(i, x, y, last) {
    var p = new Node(i, x, y);

    if (!last) {
        p.prev = p;
        p.next = p;

    } else {
        p.next = last.next;
        p.prev = last;
        last.next.prev = p;
        last.next = p;
    }
    return p;
}

function removeNode(p) {
    p.next.prev = p.prev;
    p.prev.next = p.next;

    if (p.prevZ) p.prevZ.nextZ = p.nextZ;
    if (p.nextZ) p.nextZ.prevZ = p.prevZ;
}

function Node(i, x, y) {
    // vertice index in coordinates array
    this.i = i;

    // vertex coordinates
    this.x = x;
    this.y = y;

    // previous and next vertice nodes in a polygon ring
    this.prev = null;
    this.next = null;

    // z-order curve value
    this.z = null;

    // previous and next nodes in z-order
    this.prevZ = null;
    this.nextZ = null;

    // indicates whether this is a steiner point
    this.steiner = false;
}

// return a percentage difference between the polygon area and its triangulation area;
// used to verify correctness of triangulation
earcut.deviation = function (data, holeIndices, dim, triangles) {
    var hasHoles = holeIndices && holeIndices.length;
    var outerLen = hasHoles ? holeIndices[0] * dim : data.length;

    var polygonArea = Math.abs(signedArea(data, 0, outerLen, dim));
    if (hasHoles) {
        for (var i = 0, len = holeIndices.length; i < len; i++) {
            var start = holeIndices[i] * dim;
            var end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
            polygonArea -= Math.abs(signedArea(data, start, end, dim));
        }
    }

    var trianglesArea = 0;
    for (i = 0; i < triangles.length; i += 3) {
        var a = triangles[i] * dim;
        var b = triangles[i + 1] * dim;
        var c = triangles[i + 2] * dim;
        trianglesArea += Math.abs(
            (data[a] - data[c]) * (data[b + 1] - data[a + 1]) -
            (data[a] - data[b]) * (data[c + 1] - data[a + 1]));
    }

    return polygonArea === 0 && trianglesArea === 0 ? 0 :
        Math.abs((trianglesArea - polygonArea) / polygonArea);
};

function signedArea(data, start, end, dim) {
    var sum = 0;
    for (var i = start, j = end - dim; i < end; i += dim) {
        sum += (data[j] - data[i]) * (data[i + 1] + data[j + 1]);
        j = i;
    }
    return sum;
}

// turn a polygon in a multi-dimensional array form (e.g. as in GeoJSON) into a form Earcut accepts
earcut.flatten = function (data) {
    var dim = data[0][0].length,
        result = {vertices: [], holes: [], dimensions: dim},
        holeIndex = 0;

    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].length; j++) {
            for (var d = 0; d < dim; d++) result.vertices.push(data[i][j][d]);
        }
        if (i > 0) {
            holeIndex += data[i - 1].length;
            result.holes.push(holeIndex);
        }
    }
    return result;
};

/**
 * Builds a polygon to draw
 *
 * Ignored from docs since it is not directly exposed.
 *
 * @ignore
 * @private
 * @param {PIXI.WebGLGraphicsData} graphicsData - The graphics object containing all the necessary properties
 * @param {object} webGLData - an object containing all the webGL-specific information to create this shape
 */
function buildPoly(graphicsData, webGLData) {
    graphicsData.points = graphicsData.shape.points.slice();

    var points = graphicsData.points;

    if (graphicsData.fill && points.length >= 6) {
        var holeArray = [];
        // Process holes..
        var holes = graphicsData.holes;

        for (var i = 0; i < holes.length; i++) {
            var hole = holes[i];

            holeArray.push(points.length / 2);

            points = points.concat(hole.points);
        }

        // get first and last point.. figure out the middle!
        var verts = webGLData.points;
        var indices = webGLData.indices;

        var length = points.length / 2;

        // sort color
        var color = hex2rgb(graphicsData.fillStyle);
        var alpha = graphicsData.fillAlpha;
        var r = color[0] * alpha;
        var g = color[1] * alpha;
        var b = color[2] * alpha;

        var triangles = earcut_1(points, holeArray, 2);

        if (!triangles) {
            return;
        }

        var vertPos = verts.length / 6;

        for (var _i = 0; _i < triangles.length; _i += 3) {
            indices.push(triangles[_i] + vertPos);
            indices.push(triangles[_i] + vertPos);
            indices.push(triangles[_i + 1] + vertPos);
            indices.push(triangles[_i + 2] + vertPos);
            indices.push(triangles[_i + 2] + vertPos);
        }

        for (var _i2 = 0; _i2 < length; _i2++) {
            verts.push(points[_i2 * 2], points[_i2 * 2 + 1], r, g, b, alpha);
        }
    }

    if (graphicsData.lineWidth > 0) {
        buildLine(graphicsData, webGLData);
    }
}

/**
 * Builds a rectangle to draw
 *
 * Ignored from docs since it is not directly exposed.
 *
 * @ignore
 * @private
 * @param {PIXI.WebGLGraphicsData} graphicsData - The graphics object containing all the necessary properties
 * @param {object} webGLData - an object containing all the webGL-specific information to create this shape
 */
function buildRectangle(graphicsData, webGLData) {
    // --- //
    // need to convert points to a nice regular data
    //
    var rectData = graphicsData.shape;
    var x = rectData.x;
    var y = rectData.y;
    var width = rectData.width;
    var height = rectData.height;

    if (graphicsData.fill) {
        var color = hex2rgb(graphicsData.fillStyle);
        var alpha = graphicsData.fillAlpha;

        var r = color[0] * alpha;
        var g = color[1] * alpha;
        var b = color[2] * alpha;

        var verts = webGLData.points;
        var indices = webGLData.indices;

        var vertPos = verts.length / 6;

        // start
        verts.push(x, y);
        verts.push(r, g, b, alpha);

        verts.push(x + width, y);
        verts.push(r, g, b, alpha);

        verts.push(x, y + height);
        verts.push(r, g, b, alpha);

        verts.push(x + width, y + height);
        verts.push(r, g, b, alpha);

        // insert 2 dead triangles..
        indices.push(vertPos, vertPos, vertPos + 1, vertPos + 2, vertPos + 3, vertPos + 3);
    }

    if (graphicsData.lineWidth) {
        var tempPoints = graphicsData.points;

        graphicsData.points = [x, y, x + width, y, x + width, y + height, x, y + height, x, y];

        buildLine(graphicsData, webGLData);

        graphicsData.points = tempPoints;
    }
}

/**
 * Builds a rounded rectangle to draw
 *
 * Ignored from docs since it is not directly exposed.
 *
 * @ignore
 * @private
 * @param {PIXI.WebGLGraphicsData} graphicsData - The graphics object containing all the necessary properties
 * @param {object} webGLData - an object containing all the webGL-specific information to create this shape
 */
function buildRoundedRectangle(graphicsData, webGLData) {
    var rrectData = graphicsData.shape;
    var x = rrectData.x;
    var y = rrectData.y;
    var width = rrectData.width;
    var height = rrectData.height;

    var radius = rrectData.radius;

    var recPoints = [];

    recPoints.push(x, y + radius);
    quadraticBezierCurve(x, y + height - radius, x, y + height, x + radius, y + height, recPoints);
    quadraticBezierCurve(x + width - radius, y + height, x + width, y + height, x + width, y + height - radius, recPoints);
    quadraticBezierCurve(x + width, y + radius, x + width, y, x + width - radius, y, recPoints);
    quadraticBezierCurve(x + radius, y, x, y, x, y + radius + 0.0000000001, recPoints);

    // this tiny number deals with the issue that occurs when points overlap and earcut fails to triangulate the item.
    // TODO - fix this properly, this is not very elegant.. but it works for now.

    if (graphicsData.fill) {
        var color = hex2rgb(graphicsData.fillStyle);
        var alpha = graphicsData.fillAlpha;

        var r = color[0] * alpha;
        var g = color[1] * alpha;
        var b = color[2] * alpha;

        var verts = webGLData.points;
        var indices = webGLData.indices;

        var vecPos = verts.length / 6;

        var triangles = earcut_1(recPoints, null, 2);

        for (var i = 0, j = triangles.length; i < j; i += 3) {
            indices.push(triangles[i] + vecPos);
            indices.push(triangles[i] + vecPos);
            indices.push(triangles[i + 1] + vecPos);
            indices.push(triangles[i + 2] + vecPos);
            indices.push(triangles[i + 2] + vecPos);
        }

        for (var _i = 0, _j = recPoints.length; _i < _j; _i++) {
            verts.push(recPoints[_i], recPoints[++_i], r, g, b, alpha);
        }
    }

    if (graphicsData.lineWidth) {
        var tempPoints = graphicsData.points;

        graphicsData.points = recPoints;

        buildLine(graphicsData, webGLData);

        graphicsData.points = tempPoints;
    }
}

/**
 * Calculate the points for a quadratic bezier curve. (helper function..)
 * Based on: https://stackoverflow.com/questions/785097/how-do-i-implement-a-bezier-curve-in-c
 *
 * Ignored from docs since it is not directly exposed.
 *
 * @ignore
 * @private
 * @param {number} fromX - Origin point x
 * @param {number} fromY - Origin point x
 * @param {number} cpX - Control point x
 * @param {number} cpY - Control point y
 * @param {number} toX - Destination point x
 * @param {number} toY - Destination point y
 * @param {number[]} [out=[]] - The output array to add points into. If not passed, a new array is created.
 * @return {number[]} an array of points
 */
function quadraticBezierCurve(fromX, fromY, cpX, cpY, toX, toY) {
    var out = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : [];

    var n = 20;
    var points = out;

    var xa = 0;
    var ya = 0;
    var xb = 0;
    var yb = 0;
    var x = 0;
    var y = 0;

    function getPt(n1, n2, perc) {
        var diff = n2 - n1;

        return n1 + diff * perc;
    }

    for (var i = 0, j = 0; i <= n; ++i) {
        j = i / n;

        // The Green Line
        xa = getPt(fromX, cpX, j);
        ya = getPt(fromY, cpY, j);
        xb = getPt(cpX, toX, j);
        yb = getPt(cpY, toY, j);

        // The Black Dot
        x = getPt(xa, xb, j);
        y = getPt(ya, yb, j);

        points.push(x, y);
    }

    return points;
}

/**
 * Builds a circle to draw
 *
 * Ignored from docs since it is not directly exposed.
 *
 * @ignore
 * @private
 * @param {PIXI.WebGLGraphicsData} graphicsData - The graphics object to draw
 * @param {object} webGLData - an object containing all the webGL-specific information to create this shape
 */
function buildCircle(graphicsData, webGLData) {

    // need to convert points to a nice regular data
    var circleData = graphicsData.shape;
    var x = circleData.x;
    var y = circleData.y;
    var width = void 0;
    var height = void 0;

    // TODO - bit hacky??
    if (graphicsData.type === SHAPES.CIRC) {
        width = circleData.radius;
        height = circleData.radius;
    } else {
        width = circleData.width;
        height = circleData.height;
    }

    var totalSegs = Math.floor(30 * Math.sqrt(circleData.radius)) || Math.floor(15 * Math.sqrt(circleData.width + circleData.height));

    var seg = Math.PI * 2 / totalSegs;

    if (graphicsData.fill) {
        var color = hex2rgb(graphicsData.fillStyle);
        var alpha = graphicsData.fillAlpha;

        var r = color[0] * alpha;
        var g = color[1] * alpha;
        var b = color[2] * alpha;

        var verts = webGLData.points;
        var indices = webGLData.indices;

        var vecPos = verts.length / 6;

        indices.push(vecPos);

        for (var i = 0; i < totalSegs + 1; i++) {
            verts.push(x, y, r, g, b, alpha);

            verts.push(x + Math.sin(seg * i) * width, y + Math.cos(seg * i) * height, r, g, b, alpha);

            indices.push(vecPos++, vecPos++);
        }

        indices.push(vecPos - 1);
    }

    if (graphicsData.lineWidth) {
        var tempPoints = graphicsData.points;

        graphicsData.points = [];

        for (var _i = 0; _i < totalSegs + 1; _i++) {
            graphicsData.points.push(x + Math.sin(seg * _i) * width, y + Math.cos(seg * _i) * height);
        }

        buildLine(graphicsData, webGLData);

        graphicsData.points = tempPoints;
    }
}

var GraphicsRenderer = function (_ObjectRenderer) {
    inherits(GraphicsRenderer, _ObjectRenderer);

    /**
     * @param {PIXI.WebGLRenderer} renderer - The renderer this object renderer works for.
     */
    function GraphicsRenderer(renderer) {
        classCallCheck(this, GraphicsRenderer);

        var _this = possibleConstructorReturn(this, (GraphicsRenderer.__proto__ || Object.getPrototypeOf(GraphicsRenderer)).call(this, renderer));

        _this.graphicsDataPool = [];

        _this.primitiveShader = null;

        _this.gl = renderer.gl;

        // easy access!
        _this.CONTEXT_UID = 0;
        return _this;
    }

    /**
     * Called when there is a WebGL context change
     *
     * @private
     *
     */


    createClass(GraphicsRenderer, [{
        key: 'onContextChange',
        value: function onContextChange() {
            this.gl = this.renderer.gl;
            this.CONTEXT_UID = this.renderer.CONTEXT_UID;
            this.primitiveShader = new PrimitiveShader(this.gl);
        }

        /**
         * Destroys this renderer.
         *
         */

    }, {
        key: 'destroy',
        value: function destroy() {
            ObjectRenderer.prototype.destroy.call(this);

            for (var i = 0; i < this.graphicsDataPool.length; ++i) {
                this.graphicsDataPool[i].destroy();
            }

            this.graphicsDataPool = null;
        }

        /**
         * Renders a graphics object.
         *
         * @param {PIXI.Graphics} graphics - The graphics object to render.
         */

    }, {
        key: 'render',
        value: function render(displayObject) {
            var graphics = displayObject.graphics;
            var renderer = this.renderer;
            var gl = renderer.gl;

            var webGLData = void 0;
            var webGL = graphics._webGL[this.CONTEXT_UID];

            if (!webGL || graphics.dirty !== webGL.dirty) {
                this.updateGraphics(graphics);

                webGL = graphics._webGL[this.CONTEXT_UID];
            }

            // This  could be speeded up for sure!
            var shader = this.primitiveShader;

            renderer.bindShader(shader);

            for (var i = 0, n = webGL.data.length; i < n; i++) {
                webGLData = webGL.data[i];
                var shaderTemp = webGLData.shader;

                renderer.bindShader(shaderTemp);

                var globalMatrix = displayObject.getConcatenatedMatrix().toArray(true);
                shaderTemp.uniforms.translationMatrix = globalMatrix;
                shaderTemp.uniforms.tint = hex2rgb(graphics.tint);
                shaderTemp.uniforms.alpha = graphics.worldAlpha;

                renderer.bindVao(webGLData.vao);
                webGLData.vao.draw(gl.TRIANGLE_STRIP, webGLData.indices.length);
            }
        }

        /**
         * Updates the graphics object
         *
         * @private
         * @param {PIXI.Graphics} graphics - The graphics object to update
         */

    }, {
        key: 'updateGraphics',
        value: function updateGraphics(graphics) {
            var gl = this.renderer.gl;

            // get the contexts graphics object
            var webGL = graphics._webGL[this.CONTEXT_UID];

            // if the graphics object does not exist in the webGL context time to create it!
            if (!webGL) {
                webGL = graphics._webGL[this.CONTEXT_UID] = { lastIndex: 0, data: [], gl: gl, clearDirty: -1, dirty: -1 };
            }

            // flag the graphics as not dirty as we are about to update it...
            webGL.dirty = graphics.dirty;

            // if the user cleared the graphics object we will need to clear every object
            if (graphics.clearDirty !== webGL.clearDirty) {
                webGL.clearDirty = graphics.clearDirty;

                // loop through and return all the webGLDatas to the object pool so than can be reused later on
                for (var i = 0; i < webGL.data.length; i++) {
                    this.graphicsDataPool.push(webGL.data[i]);
                }

                // clear the array and reset the index..
                webGL.data.length = 0;
                webGL.lastIndex = 0;
            }

            var webGLData = void 0;

            // loop through the graphics datas and construct each one..
            // if the object is a complex fill then the new stencil buffer technique will be used
            // other wise graphics objects will be pushed into a batch..
            for (var _i = webGL.lastIndex; _i < graphics.graphicsData.length; _i++) {
                var data = graphics.graphicsData[_i];

                // TODO - this can be simplified
                webGLData = this.getWebGLData(webGL, 0);

                if (data.type === SHAPES.POLY) {
                    buildPoly(data, webGLData);
                }
                if (data.type === SHAPES.RECT) {
                    buildRectangle(data, webGLData);
                } else if (data.type === SHAPES.CIRC || data.type === SHAPES.ELIP) {
                    buildCircle(data, webGLData);
                } else if (data.type === SHAPES.RREC) {
                    buildRoundedRectangle(data, webGLData);
                }

                webGL.lastIndex++;
            }

            this.renderer.bindVao(null);

            // upload all the dirty data...
            for (var _i2 = 0; _i2 < webGL.data.length; _i2++) {
                webGLData = webGL.data[_i2];

                if (webGLData.dirty) {
                    webGLData.upload();
                }
            }
        }

        /**
         *
         * @private
         * @param {WebGLRenderingContext} gl - the current WebGL drawing context
         * @param {number} type - TODO @Alvin
         * @return {*} TODO
         */

    }, {
        key: 'getWebGLData',
        value: function getWebGLData(gl, type) {
            var webGLData = gl.data[gl.data.length - 1];

            if (!webGLData || webGLData.points.length > 320000) {
                webGLData = this.graphicsDataPool.pop() || new WebGLGraphicsData(this.renderer.gl, this.primitiveShader, this.renderer.state.attribsState);

                webGLData.reset(type);
                gl.data.push(webGLData);
            }

            webGLData.dirty = true;

            return webGLData;
        }
    }]);
    return GraphicsRenderer;
}(ObjectRenderer);

var CONTEXT_UID = 0;

var WebGLStageRenderer = function () {
    function WebGLStageRenderer(stage, app) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        classCallCheck(this, WebGLStageRenderer);

        this.type = RENDERER_TYPE.WEBGL;
        this.width = app.width;
        this.height = app.height;
        this.canvas = stage.canvas;

        /*
        * 处理上下文丢失和恢复
        * 你的WebGL程序必须有一个用于处理上下文丢失（Lost Context）的机制
        * 导致上下文丢失的原因：
        * 移动设备电力不足
        * 其他外因导致GPU重置
        * 当浏览器标签页处于后台时，浏览器抛弃了上下文
        * 耗费资源过多，浏览器抛弃了上下文
        */
        this.handleContextLost = this.handleContextLost.bind(this);
        this.handleContextRestored = this.handleContextRestored.bind(this);
        this.canvas.addEventListener('webglcontextlost', this.handleContextLost, false);
        this.canvas.addEventListener('webglcontextrestored', this.handleContextRestored, false);

        this._backgroundColor = 0x000000;
        this._backgroundColorRgba = [0, 0, 0, 0];
        this._backgroundColorString = '#000000';
        this.backgroundColor = options.backgroundColor || this._backgroundColor;

        this._contextOptions = {
            alpha: options.transparent,
            antialias: options.antialias,
            premultipliedAlpha: options.transparent && options.transparent !== 'notMultiplied',
            stencil: true,
            preserveDrawingBuffer: options.preserveDrawingBuffer
        };

        this.emptyRenderer = new ObjectRenderer(this);

        this.currentRenderer = this.emptyRenderer;

        this.gl = options.context || index.createContext(this.canvas, this._contextOptions);

        this.CONTEXT_UID = CONTEXT_UID++;

        this.state = new WebGLState(this.gl);

        this.renderingToScreen = true;

        /**
         * Holds the current shader
         *
         * @member {PIXI.Shader}
         */
        this._activeShader = null;

        this._activeVao = null;

        /**
         * Holds the current render target
         *
         * @member {PIXI.RenderTarget}
         */
        this._activeRenderTarget = null;

        // map some webGL blend and drawmodes..
        this.drawModes = this.mapWebGLDrawModes();

        this.webglGR = new GraphicsRenderer(this);

        this._initContext();
    }

    /**
     * Creates the WebGL context
     *
     * @private
     */


    createClass(WebGLStageRenderer, [{
        key: '_initContext',
        value: function _initContext() {
            var gl = this.gl;

            // restore a context if it was previously lost
            if (gl.isContextLost() && gl.getExtension('WEBGL_lose_context')) {
                gl.getExtension('WEBGL_lose_context').restoreContext();
            }

            this.state.resetToDefault();

            this.rootRenderTarget = new RenderTarget(gl, this.width, this.height, null, settings.RESOLUTION, true);
            this.rootRenderTarget.clearColor = this._backgroundColorRgba;

            this.bindRenderTarget(this.rootRenderTarget);

            this.webglGR.onContextChange();
        }
    }, {
        key: 'render',
        value: function render(displayObject) {
            // can be handy to know!
            this.renderingToScreen = true;

            if (!this.gl || this.gl.isContextLost()) {
                return;
            }

            this.currentRenderer.start();

            this._activeRenderTarget.clear();

            this.webglGR.render(displayObject);
            //displayObject.renderWebGL(this);

            // apply transform..
            this.currentRenderer.flush();
        }

        /**
         * Changes the current renderer to the one given in parameter
         *
         * @param {PIXI.ObjectRenderer} objectRenderer - The object renderer to use.
         */

    }, {
        key: 'setObjectRenderer',
        value: function setObjectRenderer(objectRenderer) {
            if (this.currentRenderer === objectRenderer) {
                return;
            }

            this.currentRenderer.stop();
            this.currentRenderer = objectRenderer;
            this.currentRenderer.start();
        }

        /**
         * This should be called if you wish to do some custom rendering
         * It will basically render anything that may be batched up such as sprites
         *
         */

    }, {
        key: 'flush',
        value: function flush() {
            this.setObjectRenderer(this.emptyRenderer);
        }

        /**
         * Resizes the webGL view to the specified width and height.
         *
         * @param {number} width - the new width of the webGL view
         * @param {number} height - the new height of the webGL view
         */

    }, {
        key: 'resize',
        value: function resize(width, height) {
            //  if(width * this.resolution === this.width && height * this.resolution === this.height)return;

            this.rootRenderTarget.resize(width, height);

            if (this._activeRenderTarget === this.rootRenderTarget) {
                this.rootRenderTarget.activate();

                if (this._activeShader) {
                    this._activeShader.uniforms.projectionMatrix = this.rootRenderTarget.projectionMatrix.toArray(true);
                }
            }
        }

        /**
         * Erases the active render target and fills the drawing area with a colour
         *
         * @param {number} [clearColor] - The colour
         */

    }, {
        key: 'clear',
        value: function clear(clearColor) {
            this._activeRenderTarget.clear(clearColor);
        }

        /**
         * Changes the current render target to the one given in parameter
         *
         * @param {PIXI.RenderTarget} renderTarget - the new render target
         * @return {PIXI.WebGLRenderer} Returns itself.
         */

    }, {
        key: 'bindRenderTarget',
        value: function bindRenderTarget(renderTarget) {
            if (renderTarget !== this._activeRenderTarget) {
                this._activeRenderTarget = renderTarget;
                renderTarget.activate();

                if (this._activeShader) {
                    this._activeShader.uniforms.projectionMatrix = renderTarget.projectionMatrix.toArray(true);
                }
            }
            return this;
        }

        /**
         * Changes the current shader to the one given in parameter
         *
         * @param {PIXI.Shader} shader - the new shader
         * @return {PIXI.WebGLRenderer} Returns itself.
         */

    }, {
        key: 'bindShader',
        value: function bindShader(shader) {
            // TODO cache
            if (this._activeShader !== shader) {
                this._activeShader = shader;
                shader.bind();
                // automatically set the projection matrix
                shader.uniforms.projectionMatrix = this._activeRenderTarget.projectionMatrix.toArray(true);
            }

            return this;
        }

        /**
         * Creates a new VAO from this renderer's context and state.
         *
         * @return {VertexArrayObject} The new VAO.
         */

    }, {
        key: 'createVao',
        value: function createVao() {
            return new index.VertexArrayObject(this.gl, this.state.attribState);
        }

        /**
         * Changes the current Vao to the one given in parameter
         *
         * @param {PIXI.VertexArrayObject} vao - the new Vao
         * @return {PIXI.WebGLRenderer} Returns itself.
         */

    }, {
        key: 'bindVao',
        value: function bindVao(vao) {
            if (this._activeVao === vao) {
                return this;
            }

            if (vao) {
                vao.bind();
            } else if (this._activeVao) {
                // TODO this should always be true i think?
                this._activeVao.unbind();
            }

            this._activeVao = vao;

            return this;
        }

        /**
         * Resets the WebGL state so you can render things however you fancy!
         *
         * @return {PIXI.WebGLRenderer} Returns itself.
         */

    }, {
        key: 'reset',
        value: function reset() {
            this.setObjectRenderer(this.emptyRenderer);

            this._activeShader = null;
            this._activeRenderTarget = this.rootRenderTarget;

            // bind the main frame buffer (the screen);
            this.rootRenderTarget.activate();

            this.state.resetToDefault();

            return this;
        }

        /**
         * Handles a lost webgl context
         *
         * @private
         * @param {WebGLContextEvent} event - The context lost event.
         */

    }, {
        key: 'handleContextLost',
        value: function handleContextLost(event) {
            event.preventDefault();
        }

        /**
         * Handles a restored webgl context
         *
         * @private
         */

    }, {
        key: 'handleContextRestored',
        value: function handleContextRestored() {
            this._initContext();
            this.textureManager.removeAll();
        }
    }, {
        key: 'mapWebGLDrawModes',
        value: function mapWebGLDrawModes() {
            var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            object[DRAW_MODES.POINTS] = this.gl.POINTS;
            object[DRAW_MODES.LINES] = this.gl.LINES;
            object[DRAW_MODES.LINE_LOOP] = this.gl.LINE_LOOP;
            object[DRAW_MODES.LINE_STRIP] = this.gl.LINE_STRIP;
            object[DRAW_MODES.TRIANGLES] = this.gl.TRIANGLES;
            object[DRAW_MODES.TRIANGLE_STRIP] = this.gl.TRIANGLE_STRIP;
            object[DRAW_MODES.TRIANGLE_FAN] = this.gl.TRIANGLE_FAN;

            return object;
        }

        /**
         * Removes everything from the renderer (event listeners, spritebatch, etc...)
         *
         * @param {boolean} [removeView=false] - Removes the Canvas element from the DOM.
         *  See: https://github.com/pixijs/pixi.js/issues/2233
         */

    }, {
        key: 'destroy',
        value: function destroy(removeView) {
            this.destroyPlugins();

            // remove listeners
            this.view.removeEventListener('webglcontextlost', this.handleContextLost);
            this.view.removeEventListener('webglcontextrestored', this.handleContextRestored);

            // call base destroy
            get(WebGLStageRenderer.prototype.__proto__ || Object.getPrototypeOf(WebGLStageRenderer.prototype), 'destroy', this).call(this, removeView);

            this.uid = 0;

            this.currentRenderer = null;

            this.handleContextLost = null;
            this.handleContextRestored = null;

            this._contextOptions = null;
            this.gl.useProgram(null);

            if (this.gl.getExtension('WEBGL_lose_context')) {
                this.gl.getExtension('WEBGL_lose_context').loseContext();
            }

            this.gl = null;
        }
    }]);
    return WebGLStageRenderer;
}();

var WebGLRenderer = function (_SystemRenderer) {
    inherits(WebGLRenderer, _SystemRenderer);

    function WebGLRenderer(app) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        classCallCheck(this, WebGLRenderer);
        return possibleConstructorReturn(this, (WebGLRenderer.__proto__ || Object.getPrototypeOf(WebGLRenderer)).call(this, RENDERER_TYPE.CANVAS, app, options));
    }

    createClass(WebGLRenderer, [{
        key: 'render',
        value: function render(app) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            var me = this;

            me.app = app;
            _$1.extend(this.options, options);

            _$1.each(_$1.values(app.convertStages), function (convertStage) {
                me.renderStage(convertStage.stage);
            });

            app.convertStages = {};
        }
    }, {
        key: 'renderStage',
        value: function renderStage(stage) {
            if (!stage.webGLStageRenderer) {
                stage.webGLStageRenderer = new WebGLStageRenderer(stage, app, this.options);
            }
            stage.stageRending = true;
            this._clear(stage);
            this._render(stage);
            stage.stageRending = false;
        }
    }, {
        key: '_render',
        value: function _render(stage, displayObject) {
            if (!displayObject) {
                displayObject = stage;
            }

            if (!displayObject.context.visible || displayObject.context.globalAlpha <= 0) {
                return;
            }

            if (displayObject.graphics) {
                stage.webGLStageRenderer.render(displayObject);
            }

            if (displayObject.children) {
                for (var i = 0, len = displayObject.children.length; i < len; i++) {
                    this._render(stage, displayObject.children[i]);
                }
            }
        }
    }, {
        key: '_clear',
        value: function _clear(stage) {
            stage.webGLStageRenderer.clear();
        }
    }]);
    return WebGLRenderer;
}(SystemRenderer);

function autoRenderer(app, options) {
    if (!app.noWebGL && Utils.isWebGLSupported()) {
        return new WebGLRenderer(app, options);
    }

    return new CanvasRenderer(app, options);
}

/**
 * Application {{PKG_VERSION}}
 *
 * @author 释剑 (李涛, litao.lt@alibaba-inc.com)
 *
 * 主引擎 类
 *
 * 负责所有canvas的层级管理，和心跳机制的实现,捕获到心跳包后 
 * 分发到对应的stage(canvas)来绘制对应的改动
 * 然后 默认有实现了shape的 mouseover  mouseout  drag 事件
 *
 **/

//utils
var Application = function Application(opt) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    this.type = "canvax";
    this._cid = new Date().getTime() + "_" + Math.floor(Math.random() * 100);

    this.el = $.query(opt.el);

    this.width = parseInt("width" in opt || this.el.offsetWidth, 10);
    this.height = parseInt("height" in opt || this.el.offsetHeight, 10);

    var viewObj = $.createView(this.width, this.height, this._cid);
    this.view = viewObj.view;
    this.stage_c = viewObj.stage_c;
    this.dom_c = viewObj.dom_c;

    this.el.innerHTML = "";
    this.el.appendChild(this.view);

    this.viewOffset = $.offset(this.view);
    this.lastGetRO = 0; //最后一次获取 viewOffset 的时间

    this.noWebGL = opt.noWebGL;
    this.renderer = autoRenderer(this, options);

    this.event = null;

    this._bufferStage = null;

    //是否阻止浏览器默认事件的执行
    this.preventDefault = true;
    if (opt.preventDefault === false) {
        this.preventDefault = false;
    }

    //该属性在systenRender里面操作，每帧由心跳上报的 需要重绘的stages 列表
    this.convertStages = {};

    Application.superclass.constructor.apply(this, arguments);
};

Utils.creatClass(Application, DisplayObjectContainer, {
    init: function init() {
        this.context.width = this.width;
        this.context.height = this.height;

        //然后创建一个用于绘制激活 shape 的 stage 到activation
        this._creatHoverStage();

        //创建一个如果要用像素检测的时候的容器
        this._createPixelContext();
    },
    registEvent: function registEvent(opt) {
        //初始化事件委托到root元素上面
        this.event = new EventHandler(this, opt);
        this.event.init();
        return this.event;
    },
    resize: function resize(opt) {
        //重新设置坐标系统 高宽 等。
        this.width = parseInt(opt && "width" in opt || this.el.offsetWidth, 10);
        this.height = parseInt(opt && "height" in opt || this.el.offsetHeight, 10);

        this.view.style.width = this.width + "px";
        this.view.style.height = this.height + "px";

        this.viewOffset = $.offset(this.view);
        this._notWatch = true;
        this.context.width = this.width;
        this.context.height = this.height;
        this._notWatch = false;

        var me = this;
        var reSizeCanvas = function reSizeCanvas(ctx) {
            var canvas = ctx.canvas;
            canvas.style.width = me.width + "px";
            canvas.style.height = me.height + "px";
            canvas.setAttribute("width", me.width * Utils._devicePixelRatio);
            canvas.setAttribute("height", me.height * Utils._devicePixelRatio);

            //如果是swf的话就还要调用这个方法。
            if (ctx.resize) {
                ctx.resize(me.width, me.height);
            }
        };
        _$1.each(this.children, function (s, i) {
            s._notWatch = true;
            s.context.width = me.width;
            s.context.height = me.height;
            reSizeCanvas(s.canvas);
            s._notWatch = false;
        });

        this.dom_c.style.width = this.width + "px";
        this.dom_c.style.height = this.height + "px";

        this.heartBeat();
    },
    getHoverStage: function getHoverStage() {
        return this._bufferStage;
    },
    _creatHoverStage: function _creatHoverStage() {
        //TODO:创建stage的时候一定要传入width height  两个参数
        this._bufferStage = new Stage({
            id: "activCanvas" + new Date().getTime(),
            context: {
                width: this.context.width,
                height: this.context.height
            }
        });
        //该stage不参与事件检测
        this._bufferStage._eventEnabled = false;
        this.addChild(this._bufferStage);
    },
    /**
     * 用来检测文本width height 
     * @return {Object} 上下文
    */
    _createPixelContext: function _createPixelContext() {
        var _pixelCanvas = $.query("_pixelCanvas");
        if (!_pixelCanvas) {
            _pixelCanvas = $.createCanvas(0, 0, "_pixelCanvas");
        } else {
            //如果又的话 就不需要在创建了
            return;
        }
        document.body.appendChild(_pixelCanvas);
        Utils.initElement(_pixelCanvas);
        if (Utils.canvasSupport()) {
            //canvas的话，哪怕是display:none的页可以用来左像素检测和measureText文本width检测
            _pixelCanvas.style.display = "none";
        } else {
            //flashCanvas 的话，swf如果display:none了。就做不了measureText 文本宽度 检测了
            _pixelCanvas.style.zIndex = -1;
            _pixelCanvas.style.position = "absolute";
            _pixelCanvas.style.left = -this.context.width + "px";
            _pixelCanvas.style.top = -this.context.height + "px";
            _pixelCanvas.style.visibility = "hidden";
        }
        Utils._pixelCtx = _pixelCanvas.getContext('2d');
    },

    updateViewOffset: function updateViewOffset() {
        var now = new Date().getTime();
        if (now - this.lastGetRO > 1000) {
            this.viewOffset = $.offset(this.view);
            this.lastGetRO = now;
        }
    },

    _afterAddChild: function _afterAddChild(stage, index) {
        var canvas;

        if (!stage.canvas) {
            canvas = $.createCanvas(this.context.width, this.context.height, stage.id);
        } else {
            canvas = stage.canvas;
        }

        if (this.children.length == 1) {
            this.stage_c.appendChild(canvas);
        } else if (this.children.length > 1) {
            if (index == undefined) {
                //如果没有指定位置，那么就放到_bufferStage的下面。
                this.stage_c.insertBefore(canvas, this._bufferStage.canvas);
            } else {
                //如果有指定的位置，那么就指定的位置来
                if (index >= this.children.length - 1) {
                    this.stage_c.appendChild(canvas);
                } else {
                    this.stage_c.insertBefore(canvas, this.children[index].canvas);
                }
            }
        }

        Utils.initElement(canvas);
        stage.initStage(canvas, this.context.width, this.context.height);
    },
    _afterDelChild: function _afterDelChild(stage) {
        this.stage_c.removeChild(stage.canvas);
    },

    heartBeat: function heartBeat(opt) {
        this.renderer.heartBeat(opt);
    }
});

/**
 * Canvax
 *
 * @author 释剑 (李涛, litao.lt@alibaba-inc.com)
 *
 * 模拟as3 中 的sprite类，目前还只是个简单的容易。
 */
var Sprite = function Sprite() {
    this.type = "sprite";
    Sprite.superclass.constructor.apply(this, arguments);
};

Utils.creatClass(Sprite, DisplayObjectContainer, {
    init: function init() {}
});

var GraphicsData = function () {
    function GraphicsData(lineWidth, strokeStyle, lineAlpha, fillStyle, fillAlpha, shape) {
        classCallCheck(this, GraphicsData);

        this.lineWidth = lineWidth;
        this.strokeStyle = strokeStyle;
        this.lineAlpha = lineAlpha;

        this.fillStyle = fillStyle;
        this.fillAlpha = fillAlpha;

        this.shape = shape;
        this.type = shape.type;

        this.holes = [];

        //这两个可以被后续修改， 具有一票否决权
        //比如polygon的 虚线描边。必须在fill的poly上面设置line为false
        this.fill = true;
        this.line = true;
    }

    createClass(GraphicsData, [{
        key: "clone",
        value: function clone() {
            return new GraphicsData(this.lineWidth, this.strokeStyle, this.lineAlpha, this.fillStyle, this.fillAlpha, this.shape);
        }
    }, {
        key: "addHole",
        value: function addHole(shape) {
            this.holes.push(shape);
        }

        //从宿主graphics中同步最新的style属性

    }, {
        key: "synsStyle",
        value: function synsStyle(graphics) {
            //从shape中把绘图需要的style属性同步过来
            this.lineWidth = graphics.lineWidth;
            this.strokeStyle = graphics.strokeStyle;
            this.lineAlpha = graphics.lineAlpha;

            this.fillStyle = graphics.fillStyle;
            this.fillAlpha = graphics.fillAlpha;
        }
    }, {
        key: "hasFill",
        value: function hasFill() {
            return this.fillStyle && this.fill && this.shape.closed !== undefined && this.shape.closed && this.fillAlpha;
        }
    }, {
        key: "hasLine",
        value: function hasLine() {
            return this.strokeStyle && this.lineWidth && this.lineAlpha && this.line;
        }
    }, {
        key: "destroy",
        value: function destroy() {
            this.shape = null;
            this.holes = null;
        }
    }]);
    return GraphicsData;
}();

/**
 * Calculate the points for a bezier curve and then draws it.
 *
 * Ignored from docs since it is not directly exposed.
 *
 * @ignore
 * @param {number} fromX - Starting point x
 * @param {number} fromY - Starting point y
 * @param {number} cpX - Control point x
 * @param {number} cpY - Control point y
 * @param {number} cpX2 - Second Control point x
 * @param {number} cpY2 - Second Control point y
 * @param {number} toX - Destination point x
 * @param {number} toY - Destination point y
 * @param {number[]} [path=[]] - Path array to push points into
 * @return {number[]} Array of points of the curve
 */
function bezierCurveTo(fromX, fromY, cpX, cpY, cpX2, cpY2, toX, toY) {
    var path = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : [];

    var n = 20;
    var dt = 0;
    var dt2 = 0;
    var dt3 = 0;
    var t2 = 0;
    var t3 = 0;

    path.push(fromX, fromY);

    for (var i = 1, j = 0; i <= n; ++i) {
        j = i / n;

        dt = 1 - j;
        dt2 = dt * dt;
        dt3 = dt2 * dt;

        t2 = j * j;
        t3 = t2 * j;

        path.push(dt3 * fromX + 3 * dt2 * j * cpX + 3 * dt * t2 * cpX2 + t3 * toX, dt3 * fromY + 3 * dt2 * j * cpY + 3 * dt * t2 * cpY2 + t3 * toY);
    }

    return path;
}

/**
 * 线段包含判断
 * @points [0,0,0,0]
 */
var _isInsideLine = function _isInsideLine(points, x, y, lineWidth) {
    var x0 = points[0];
    var y0 = points[1];
    var x1 = points[2];
    var y1 = points[3];
    var _l = Math.max(lineWidth, 3);
    var _a = 0;
    var _b = x0;

    if (y > y0 + _l && y > y1 + _l || y < y0 - _l && y < y1 - _l || x > x0 + _l && x > x1 + _l || x < x0 - _l && x < x1 - _l) {
        return false;
    }

    if (x0 !== x1) {
        _a = (y0 - y1) / (x0 - x1);
        _b = (x0 * y1 - x1 * y0) / (x0 - x1);
    } else {
        return Math.abs(x - x0) <= _l / 2;
    }

    var _s = (_a * x - y + _b) * (_a * x - y + _b) / (_a * _a + 1);
    return _s <= _l / 2 * _l / 2;
};

function insideLine(data, x, y, line) {
    var points = data.shape.points;
    var lineWidth = data.lineWidth;
    var insideCatch = false;
    for (var i = 0; i < points.length; ++i) {
        insideCatch = _isInsideLine(points.slice(i, i + 4), x, y, lineWidth);
        if (insideCatch) {
            break;
        }
        i += 1;
    }
    return insideCatch;
}

/*
* Graphics绘图法则
* 单个grahics实例里的fill line 样式属性，都从对应shape.context中获取
* 
*/

var Graphics = function () {
    function Graphics(shape) {
        classCallCheck(this, Graphics);

        this.shape = shape;

        this.lineWidth = 1;
        this.strokeStyle = null;
        this.lineAlpha = 1;
        this.fillStyle = null;
        this.fillAlpha = 1;

        this.graphicsData = [];
        this.currentPath = null;

        this.synsStyle();

        this.dirty = 0; //脏数据
        this._webGL = {};
        this.worldAlpha = 1;
        this.tint = 0xFFFFFF; //目标对象附加颜色
    }

    createClass(Graphics, [{
        key: 'synsStyle',
        value: function synsStyle() {
            //从shape中把绘图需要的style属性同步过来
            var sctx = this.shape.context;
            this.lineWidth = sctx.lineWidth;
            this.strokeStyle = sctx.strokeStyle;
            this.lineAlpha = sctx.lineAlpha * sctx.globalAlpha;

            this.fillStyle = sctx.fillStyle;
            this.fillAlpha = sctx.fillAlpha * sctx.globalAlpha;

            //如果graphicsData有多分组的情况下，如果以为shape的 style 属性改变调用的synsStyle
            //则会覆盖全部的 graphicsData 元素
            for (var i = 0; i < this.graphicsData.length; ++i) {
                this.graphicsData[i].synsStyle(this);
            }
        }
    }, {
        key: 'clone',
        value: function clone() {
            var clone = new Graphics();

            clone.dirty = 0;

            // copy graphics data
            for (var i = 0; i < this.graphicsData.length; ++i) {
                clone.graphicsData.push(this.graphicsData[i].clone());
            }

            clone.currentPath = clone.graphicsData[clone.graphicsData.length - 1];
            return clone;
        }
    }, {
        key: 'moveTo',
        value: function moveTo(x, y) {
            var shape = new Polygon([x, y]);

            shape.closed = false;
            this.drawShape(shape);

            return this;
        }
    }, {
        key: 'lineTo',
        value: function lineTo(x, y) {
            if (this.currentPath) {
                this.currentPath.shape.points.push(x, y);
                this.dirty++;
            } else {
                this.moveTo(0, 0);
            }
            return this;
        }
    }, {
        key: 'quadraticCurveTo',
        value: function quadraticCurveTo(cpX, cpY, toX, toY) {
            if (this.currentPath) {
                if (this.currentPath.shape.points.length === 0) {
                    this.currentPath.shape.points = [0, 0];
                }
            } else {
                this.moveTo(0, 0);
            }

            var n = 20;
            var points = this.currentPath.shape.points;
            var xa = 0;
            var ya = 0;

            if (points.length === 0) {
                this.moveTo(0, 0);
            }

            var fromX = points[points.length - 2];
            var fromY = points[points.length - 1];

            for (var i = 1; i <= n; ++i) {
                var j = i / n;

                xa = fromX + (cpX - fromX) * j;
                ya = fromY + (cpY - fromY) * j;

                points.push(xa + (cpX + (toX - cpX) * j - xa) * j, ya + (cpY + (toY - cpY) * j - ya) * j);
            }

            this.dirty++;

            return this;
        }
    }, {
        key: 'bezierCurveTo',
        value: function bezierCurveTo$$1(cpX, cpY, cpX2, cpY2, toX, toY) {
            if (this.currentPath) {
                if (this.currentPath.shape.points.length === 0) {
                    this.currentPath.shape.points = [0, 0];
                }
            } else {
                this.moveTo(0, 0);
            }

            var points = this.currentPath.shape.points;

            var fromX = points[points.length - 2];
            var fromY = points[points.length - 1];

            points.length -= 2;

            bezierCurveTo(fromX, fromY, cpX, cpY, cpX2, cpY2, toX, toY, points);

            this.dirty++;

            return this;
        }
    }, {
        key: 'arcTo',
        value: function arcTo(x1, y1, x2, y2, radius) {
            if (this.currentPath) {
                if (this.currentPath.shape.points.length === 0) {
                    this.currentPath.shape.points.push(x1, y1);
                }
            } else {
                this.moveTo(x1, y1);
            }

            var points = this.currentPath.shape.points;
            var fromX = points[points.length - 2];
            var fromY = points[points.length - 1];
            var a1 = fromY - y1;
            var b1 = fromX - x1;
            var a2 = y2 - y1;
            var b2 = x2 - x1;
            var mm = Math.abs(a1 * b2 - b1 * a2);

            if (mm < 1.0e-8 || radius === 0) {
                if (points[points.length - 2] !== x1 || points[points.length - 1] !== y1) {
                    points.push(x1, y1);
                }
            } else {
                var dd = a1 * a1 + b1 * b1;
                var cc = a2 * a2 + b2 * b2;
                var tt = a1 * a2 + b1 * b2;
                var k1 = radius * Math.sqrt(dd) / mm;
                var k2 = radius * Math.sqrt(cc) / mm;
                var j1 = k1 * tt / dd;
                var j2 = k2 * tt / cc;
                var cx = k1 * b2 + k2 * b1;
                var cy = k1 * a2 + k2 * a1;
                var px = b1 * (k2 + j1);
                var py = a1 * (k2 + j1);
                var qx = b2 * (k1 + j2);
                var qy = a2 * (k1 + j2);
                var startAngle = Math.atan2(py - cy, px - cx);
                var endAngle = Math.atan2(qy - cy, qx - cx);

                this.arc(cx + x1, cy + y1, radius, startAngle, endAngle, b1 * a2 > b2 * a1);
            }

            this.dirty++;

            return this;
        }
    }, {
        key: 'arc',
        value: function arc(cx, cy, radius, startAngle, endAngle) {
            var anticlockwise = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

            if (startAngle === endAngle) {
                return this;
            }

            if (!anticlockwise && endAngle <= startAngle) {
                endAngle += Math.PI * 2;
            } else if (anticlockwise && startAngle <= endAngle) {
                startAngle += Math.PI * 2;
            }

            var sweep = endAngle - startAngle;
            var segs = Math.ceil(Math.abs(sweep) / (Math.PI * 2)) * 40;

            if (sweep === 0) {
                return this;
            }

            var startX = cx + Math.cos(startAngle) * radius;
            var startY = cy + Math.sin(startAngle) * radius;

            // If the currentPath exists, take its points. Otherwise call `moveTo` to start a path.
            var points = this.currentPath ? this.currentPath.shape.points : null;

            if (points) {
                if (points[points.length - 2] !== startX || points[points.length - 1] !== startY) {
                    points.push(startX, startY);
                }
            } else {
                this.moveTo(startX, startY);
                points = this.currentPath.shape.points;
            }

            var theta = sweep / (segs * 2);
            var theta2 = theta * 2;

            var cTheta = Math.cos(theta);
            var sTheta = Math.sin(theta);

            var segMinus = segs - 1;

            var remainder = segMinus % 1 / segMinus;

            for (var i = 0; i <= segMinus; ++i) {
                var real = i + remainder * i;

                var angle = theta + startAngle + theta2 * real;

                var c = Math.cos(angle);
                var s = -Math.sin(angle);

                points.push((cTheta * c + sTheta * s) * radius + cx, (cTheta * -s + sTheta * c) * radius + cy);
            }

            this.dirty++;

            return this;
        }
    }, {
        key: 'drawRect',
        value: function drawRect(x, y, width, height) {
            this.drawShape(new Rectangle(x, y, width, height));
            return this;
        }
    }, {
        key: 'drawCircle',
        value: function drawCircle(x, y, radius) {
            this.drawShape(new Circle(x, y, radius));

            return this;
        }
    }, {
        key: 'drawEllipse',
        value: function drawEllipse(x, y, width, height) {
            this.drawShape(new Ellipse(x, y, width, height));

            return this;
        }
    }, {
        key: 'drawPolygon',
        value: function drawPolygon(path) {
            // prevents an argument assignment deopt
            // see section 3.1: https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#3-managing-arguments
            var points = path;

            var closed = true;

            if (points instanceof Polygon) {
                closed = points.closed;
                points = points.points;
            }

            if (!Array.isArray(points)) {
                // prevents an argument leak deopt
                // see section 3.2: https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#3-managing-arguments
                points = new Array(arguments.length);

                for (var i = 0; i < points.length; ++i) {
                    points[i] = arguments[i]; // eslint-disable-line prefer-rest-params
                }
            }

            var shape = new Polygon(points);

            shape.closed = closed;

            this.drawShape(shape);

            return this;
        }
    }, {
        key: 'clear',
        value: function clear() {
            if (this.graphicsData.length > 0) {
                this.dirty++;
                this.graphicsData.length = 0;
            }

            this.currentPath = null;

            return this;
        }
    }, {
        key: 'drawShape',
        value: function drawShape(shape) {
            if (this.currentPath) {
                if (this.currentPath.shape.points.length <= 2) {
                    this.graphicsData.pop();
                }
            }

            this.currentPath = null;

            var data = new GraphicsData(this.lineWidth, this.strokeStyle, this.lineAlpha, this.fillStyle, this.fillAlpha, shape);

            this.graphicsData.push(data);

            if (data.type === SHAPES.POLY) {
                data.shape.closed = data.shape.closed;
                this.currentPath = data;
            }

            this.dirty++;

            return data;
        }
    }, {
        key: 'closePath',
        value: function closePath() {
            var currentPath = this.currentPath;

            if (currentPath && currentPath.shape) {
                currentPath.shape.close();
            }

            return this;
        }

        /**
         * Tests if a point is inside this graphics object
         *
         * @param {PIXI.Point} point - the point to test
         * @return {boolean} the result of the test
         */

    }, {
        key: 'containsPoint',
        value: function containsPoint(point) {
            var graphicsData = this.graphicsData;
            var inside = false;
            for (var i = 0; i < graphicsData.length; ++i) {
                var data = graphicsData[i];
                if (data.shape) {
                    //先检测fill， fill的检测概率大些。
                    //像circle,ellipse这样的shape 就直接把lineWidth算在fill里面计算就好了，所以他们是没有insideLine的
                    if (data.hasFill() && data.shape.contains(point.x, point.y)) {
                        inside = true;
                        if (inside) {
                            break;
                        }
                    }

                    //circle,ellipse等就没有points
                    if (data.hasLine() && data.shape.points) {
                        //然后检测是否和描边碰撞
                        inside = insideLine(data, point.x, point.y);
                        if (inside) {
                            break;
                        }
                    }
                }
            }

            return inside;
        }

        /**
        * Update the bounds of the object
        *
        */

    }, {
        key: 'updateLocalBounds',
        value: function updateLocalBounds() {
            var minX = Infinity;
            var maxX = -Infinity;

            var minY = Infinity;
            var maxY = -Infinity;

            if (this.graphicsData.length) {
                var shape = 0;
                var x = 0;
                var y = 0;
                var w = 0;
                var h = 0;

                for (var i = 0; i < this.graphicsData.length; i++) {
                    var data = this.graphicsData[i];
                    var type = data.type;
                    var lineWidth = data.lineWidth;

                    shape = data.shape;

                    if (type === SHAPES.RECT || type === SHAPES.RREC) {
                        x = shape.x - lineWidth / 2;
                        y = shape.y - lineWidth / 2;
                        w = shape.width + lineWidth;
                        h = shape.height + lineWidth;

                        minX = x < minX ? x : minX;
                        maxX = x + w > maxX ? x + w : maxX;

                        minY = y < minY ? y : minY;
                        maxY = y + h > maxY ? y + h : maxY;
                    } else if (type === SHAPES.CIRC) {
                        x = shape.x;
                        y = shape.y;
                        w = shape.radius + lineWidth / 2;
                        h = shape.radius + lineWidth / 2;

                        minX = x - w < minX ? x - w : minX;
                        maxX = x + w > maxX ? x + w : maxX;

                        minY = y - h < minY ? y - h : minY;
                        maxY = y + h > maxY ? y + h : maxY;
                    } else if (type === SHAPES.ELIP) {
                        x = shape.x;
                        y = shape.y;
                        w = shape.width + lineWidth / 2;
                        h = shape.height + lineWidth / 2;

                        minX = x - w < minX ? x - w : minX;
                        maxX = x + w > maxX ? x + w : maxX;

                        minY = y - h < minY ? y - h : minY;
                        maxY = y + h > maxY ? y + h : maxY;
                    } else {
                        // POLY
                        var points = shape.points;
                        var x2 = 0;
                        var y2 = 0;
                        var dx = 0;
                        var dy = 0;
                        var rw = 0;
                        var rh = 0;
                        var cx = 0;
                        var cy = 0;

                        for (var j = 0; j + 2 < points.length; j += 2) {
                            x = points[j];
                            y = points[j + 1];
                            x2 = points[j + 2];
                            y2 = points[j + 3];
                            dx = Math.abs(x2 - x);
                            dy = Math.abs(y2 - y);
                            h = lineWidth;
                            w = Math.sqrt(dx * dx + dy * dy);

                            if (w < 1e-9) {
                                continue;
                            }

                            rw = (h / w * dy + dx) / 2;
                            rh = (h / w * dx + dy) / 2;
                            cx = (x2 + x) / 2;
                            cy = (y2 + y) / 2;

                            minX = cx - rw < minX ? cx - rw : minX;
                            maxX = cx + rw > maxX ? cx + rw : maxX;

                            minY = cy - rh < minY ? cy - rh : minY;
                            maxY = cy + rh > maxY ? cy + rh : maxY;
                        }
                    }
                }
            } else {
                minX = 0;
                maxX = 0;
                minY = 0;
                maxY = 0;
            }

            this.Bound.minX = minX;
            this.Bound.maxX = maxX;

            this.Bound.minY = minY;
            this.Bound.maxY = maxY;
        }
    }, {
        key: 'destroy',
        value: function destroy(options) {
            get(Graphics.prototype.__proto__ || Object.getPrototypeOf(Graphics.prototype), 'destroy', this).call(this, options);

            for (var i = 0; i < this.graphicsData.length; ++i) {
                this.graphicsData[i].destroy();
            }
            for (var id in this._webgl) {
                for (var j = 0; j < this._webgl[id].data.length; ++j) {
                    this._webgl[id].data[j].destroy();
                }
            }

            this.graphicsData = null;
            this.currentPath = null;
            this._webgl = null;
        }
    }]);
    return Graphics;
}();

/**
 * Canvax
 *
 * @author 释剑 (李涛, litao.lt@alibaba-inc.com)
 *
 * 模拟as3 DisplayList 中的shape 类
 */
var Shape = function (_DisplayObject) {
    inherits(Shape, _DisplayObject);

    function Shape(opt) {
        classCallCheck(this, Shape);


        opt = Utils.checkOpt(opt);
        var _context = _$1.extend(_$1.clone(SHAPE_CONTEXT_DEFAULT), opt.context);
        opt.context = _context;

        var _this = possibleConstructorReturn(this, (Shape.__proto__ || Object.getPrototypeOf(Shape)).call(this, opt));

        _this.graphics = new Graphics(_this);

        //元素是否有hover事件 和 chick事件，由addEvenetLister和remiveEventLister来触发修改
        _this._hoverable = false;
        _this._clickable = false;

        //over的时候如果有修改样式，就为true
        _this._hoverClass = false;
        _this.hoverClone = true; //是否开启在hover的时候clone一份到active stage 中 
        _this.pointChkPriority = true; //在鼠标mouseover到该节点，然后mousemove的时候，是否优先检测该节点

        //拖拽drag的时候显示在activShape的副本
        _this._dragDuplicate = null;

        //元素是否 开启 drag 拖动，这个有用户设置传入
        //self.draggable = opt.draggable || false;

        _this.type = _this.type || "shape";
        opt.draw && (_this.draw = opt.draw);

        //处理所有的图形一些共有的属性配置,把除开id,context之外的所有属性，全部挂载到this上面
        _this.initCompProperty(opt);

        _this._rect = null;
        return _this;
    }

    createClass(Shape, [{
        key: "init",
        value: function init() {}
    }, {
        key: "draw",
        value: function draw() {}
    }, {
        key: "initCompProperty",
        value: function initCompProperty(opt) {
            for (var i in opt) {
                if (i != "id" && i != "context") {
                    this[i] = opt[i];
                }
            }
        }

        /*
         * 画虚线
         */

    }, {
        key: "dashedLineTo",
        value: function dashedLineTo(x1, y1, x2, y2, dashLength) {
            dashLength = typeof dashLength == 'undefined' ? 3 : dashLength;
            dashLength = Math.max(dashLength, this.context.lineWidth);
            var deltaX = x2 - x1;
            var deltaY = y2 - y1;
            var numDashes = Math.floor(Math.sqrt(deltaX * deltaX + deltaY * deltaY) / dashLength);
            for (var i = 0; i < numDashes; ++i) {
                var x = parseInt(x1 + deltaX / numDashes * i);
                var y = parseInt(y1 + deltaY / numDashes * i);
                this.graphics[i % 2 === 0 ? 'moveTo' : 'lineTo'](x, y);
                if (i == numDashes - 1 && i % 2 === 0) {
                    this.graphics.lineTo(x2, y2);
                }
            }
        }

        /*
         *从cpl节点中获取到4个方向的边界节点
         *@param  context 
         *
         **/

    }, {
        key: "getRectFormPointList",
        value: function getRectFormPointList(context) {
            var minX = Number.MAX_VALUE;
            var maxX = Number.MIN_VALUE;
            var minY = Number.MAX_VALUE;
            var maxY = Number.MIN_VALUE;

            var cpl = context.pointList; //this.getcpl();
            for (var i = 0, l = cpl.length; i < l; i++) {
                if (cpl[i][0] < minX) {
                    minX = cpl[i][0];
                }
                if (cpl[i][0] > maxX) {
                    maxX = cpl[i][0];
                }
                if (cpl[i][1] < minY) {
                    minY = cpl[i][1];
                }
                if (cpl[i][1] > maxY) {
                    maxY = cpl[i][1];
                }
            }

            var lineWidth;
            if (context.strokeStyle || context.fillStyle) {
                lineWidth = context.lineWidth || 1;
            } else {
                lineWidth = 0;
            }
            return {
                x: Math.round(minX - lineWidth / 2),
                y: Math.round(minY - lineWidth / 2),
                width: maxX - minX + lineWidth,
                height: maxY - minY + lineWidth
            };
        }
    }]);
    return Shape;
}(DisplayObject);

/**
 * Canvax--Text
 *
 * @author 释剑 (李涛, litao.lt@alibaba-inc.com)
 *
 * 文本 类
 **/
var Text = function Text(text, opt) {
    var self = this;
    self.type = "text";
    self._reNewline = /\r?\n/;
    self.fontProperts = ["fontStyle", "fontVariant", "fontWeight", "fontSize", "fontFamily"];

    //做一次简单的opt参数校验，保证在用户不传opt的时候 或者传了opt但是里面没有context的时候报错
    opt = Utils.checkOpt(opt);

    self._context = _$1.extend({
        fontSize: 13, //字体大小默认13
        fontWeight: "normal",
        fontFamily: "微软雅黑,sans-serif",
        textDecoration: null,
        fillStyle: 'blank',
        strokeStyle: null,
        lineWidth: 0,
        lineHeight: 1.2,
        backgroundColor: null,
        textBackgroundColor: null
    }, opt.context);

    self._context.font = self._getFontDeclaration();

    self.text = text.toString();

    Text.superclass.constructor.apply(this, [opt]);
};

Utils.creatClass(Text, DisplayObject, {
    $watch: function $watch(name, value, preValue) {
        //context属性有变化的监听函数
        if (_$1.indexOf(this.fontProperts, name) >= 0) {
            this._context[name] = value;
            //如果修改的是font的某个内容，就重新组装一遍font的值，
            //然后通知引擎这次对context的修改不需要上报心跳
            this._notWatch = false;
            this.context.font = this._getFontDeclaration();
            this.context.width = this.getTextWidth();
            this.context.height = this.getTextHeight();
        }
    },
    init: function init(text, opt) {
        var self = this;
        var c = this.context;
        c.width = this.getTextWidth();
        c.height = this.getTextHeight();
    },
    render: function render(ctx) {
        for (var p in this.context.$model) {
            if (p in ctx) {
                if (p != "textBaseline" && this.context.$model[p]) {
                    ctx[p] = this.context.$model[p];
                }
            }
        }
        this._renderText(ctx, this._getTextLines());
    },
    resetText: function resetText(text) {
        this.text = text.toString();
        this.heartBeat();
    },
    getTextWidth: function getTextWidth() {
        var width = 0;
        Utils._pixelCtx.save();
        Utils._pixelCtx.font = this.context.font;
        width = this._getTextWidth(Utils._pixelCtx, this._getTextLines());
        Utils._pixelCtx.restore();
        return width;
    },
    getTextHeight: function getTextHeight() {
        return this._getTextHeight(Utils._pixelCtx, this._getTextLines());
    },
    _getTextLines: function _getTextLines() {
        return this.text.split(this._reNewline);
    },
    _renderText: function _renderText(ctx, textLines) {
        ctx.save();
        this._renderTextStroke(ctx, textLines);
        this._renderTextFill(ctx, textLines);
        ctx.restore();
    },
    _getFontDeclaration: function _getFontDeclaration() {
        var self = this;
        var fontArr = [];

        _$1.each(this.fontProperts, function (p) {
            var fontP = self._context[p];
            if (p == "fontSize") {
                fontP = parseFloat(fontP) + "px";
            }
            fontP && fontArr.push(fontP);
        });

        return fontArr.join(' ');
    },
    _renderTextFill: function _renderTextFill(ctx, textLines) {
        if (!this.context.fillStyle) return;

        this._boundaries = [];
        var lineHeights = 0;

        for (var i = 0, len = textLines.length; i < len; i++) {
            var heightOfLine = this._getHeightOfLine(ctx, i, textLines);
            lineHeights += heightOfLine;

            this._renderTextLine('fillText', ctx, textLines[i], 0, //this._getLeftOffset(),
            this._getTopOffset() + lineHeights, i);
        }
    },
    _renderTextStroke: function _renderTextStroke(ctx, textLines) {
        if (!this.context.strokeStyle || !this.context.lineWidth) return;

        var lineHeights = 0;

        ctx.save();
        if (this.strokeDashArray) {
            if (1 & this.strokeDashArray.length) {
                this.strokeDashArray.push.apply(this.strokeDashArray, this.strokeDashArray);
            }
            supportsLineDash && ctx.setLineDash(this.strokeDashArray);
        }

        ctx.beginPath();
        for (var i = 0, len = textLines.length; i < len; i++) {
            var heightOfLine = this._getHeightOfLine(ctx, i, textLines);
            lineHeights += heightOfLine;

            this._renderTextLine('strokeText', ctx, textLines[i], 0, //this._getLeftOffset(),
            this._getTopOffset() + lineHeights, i);
        }
        ctx.closePath();
        ctx.restore();
    },
    _renderTextLine: function _renderTextLine(method, ctx, line, left, top, lineIndex) {
        top -= this._getHeightOfLine() / 4;
        if (this.context.textAlign !== 'justify') {
            this._renderChars(method, ctx, line, left, top, lineIndex);
            return;
        }
        var lineWidth = ctx.measureText(line).width;
        var totalWidth = this.context.width;

        if (totalWidth > lineWidth) {
            var words = line.split(/\s+/);
            var wordsWidth = ctx.measureText(line.replace(/\s+/g, '')).width;
            var widthDiff = totalWidth - wordsWidth;
            var numSpaces = words.length - 1;
            var spaceWidth = widthDiff / numSpaces;

            var leftOffset = 0;
            for (var i = 0, len = words.length; i < len; i++) {
                this._renderChars(method, ctx, words[i], left + leftOffset, top, lineIndex);
                leftOffset += ctx.measureText(words[i]).width + spaceWidth;
            }
        } else {
            this._renderChars(method, ctx, line, left, top, lineIndex);
        }
    },
    _renderChars: function _renderChars(method, ctx, chars, left, top) {
        ctx[method](chars, 0, top);
    },
    _getHeightOfLine: function _getHeightOfLine() {
        return this.context.fontSize * this.context.lineHeight;
    },
    _getTextWidth: function _getTextWidth(ctx, textLines) {
        var maxWidth = ctx.measureText(textLines[0] || '|').width;
        for (var i = 1, len = textLines.length; i < len; i++) {
            var currentLineWidth = ctx.measureText(textLines[i]).width;
            if (currentLineWidth > maxWidth) {
                maxWidth = currentLineWidth;
            }
        }
        return maxWidth;
    },
    _getTextHeight: function _getTextHeight(ctx, textLines) {
        return this.context.fontSize * textLines.length * this.context.lineHeight;
    },

    /**
     * @private
     * @return {Number} Top offset
     */
    _getTopOffset: function _getTopOffset() {
        var t = 0;
        switch (this.context.textBaseline) {
            case "top":
                t = 0;
                break;
            case "middle":
                t = -this.context.height / 2;
                break;
            case "bottom":
                t = -this.context.height;
                break;
        }
        return t;
    },
    getRect: function getRect() {
        var c = this.context;
        var x = 0;
        var y = 0;
        //更具textAlign 和 textBaseline 重新矫正 xy
        if (c.textAlign == "center") {
            x = -c.width / 2;
        }
        if (c.textAlign == "right") {
            x = -c.width;
        }
        if (c.textBaseline == "middle") {
            y = -c.height / 2;
        }
        if (c.textBaseline == "bottom") {
            y = -c.height;
        }

        return {
            x: x,
            y: y,
            width: c.width,
            height: c.height
        };
    }
});

/**
 * Canvax
 *
 * @author 释剑 (李涛, litao.lt@alibaba-inc.com)
 *
 * 向量操作类
 * */
function Vector(x, y) {
    var vx = 0,
        vy = 0;
    if (arguments.length == 1 && _$1.isObject(x)) {
        var arg = arguments[0];
        if (_$1.isArray(arg)) {
            vx = arg[0];
            vy = arg[1];
        } else if (arg.hasOwnProperty("x") && arg.hasOwnProperty("y")) {
            vx = arg.x;
            vy = arg.y;
        }
    }
    this._axes = [vx, vy];
}
Vector.prototype = {
    distance: function distance(v) {
        var x = this._axes[0] - v._axes[0];
        var y = this._axes[1] - v._axes[1];

        return Math.sqrt(x * x + y * y);
    }
};

/**
 * Canvax
 *
 * @author 释剑 (李涛, litao.lt@alibaba-inc.com)
 *
 * 处理为平滑线条
 */
/**
 * @inner
 */
function interpolate(p0, p1, p2, p3, t, t2, t3) {
    var v0 = (p2 - p0) * 0.25;
    var v1 = (p3 - p1) * 0.25;
    return (2 * (p1 - p2) + v0 + v1) * t3 + (-3 * (p1 - p2) - 2 * v0 - v1) * t2 + v0 * t + p1;
}
/**
 * 多线段平滑曲线 
 * opt ==> points , isLoop
 */
var SmoothSpline = function (opt) {
    var points = opt.points;
    var isLoop = opt.isLoop;
    var smoothFilter = opt.smoothFilter;

    var len = points.length;
    if (len == 1) {
        return points;
    }
    var ret = [];
    var distance = 0;
    var preVertor = new Vector(points[0]);
    var iVtor = null;
    for (var i = 1; i < len; i++) {
        iVtor = new Vector(points[i]);
        distance += preVertor.distance(iVtor);
        preVertor = iVtor;
    }

    preVertor = null;
    iVtor = null;

    //基本上等于曲率
    var segs = distance / 6;

    segs = segs < len ? len : segs;
    for (var i = 0; i < segs; i++) {
        var pos = i / (segs - 1) * (isLoop ? len : len - 1);
        var idx = Math.floor(pos);

        var w = pos - idx;

        var p0;
        var p1 = points[idx % len];
        var p2;
        var p3;
        if (!isLoop) {
            p0 = points[idx === 0 ? idx : idx - 1];
            p2 = points[idx > len - 2 ? len - 1 : idx + 1];
            p3 = points[idx > len - 3 ? len - 1 : idx + 2];
        } else {
            p0 = points[(idx - 1 + len) % len];
            p2 = points[(idx + 1) % len];
            p3 = points[(idx + 2) % len];
        }

        var w2 = w * w;
        var w3 = w * w2;

        var rp = [interpolate(p0[0], p1[0], p2[0], p3[0], w, w2, w3), interpolate(p0[1], p1[1], p2[1], p3[1], w, w2, w3)];

        _$1.isFunction(smoothFilter) && smoothFilter(rp);

        ret.push(rp);
    }
    return ret;
};

/**
 * Canvax
 *
 * @author 释剑 (李涛, litao.lt@alibaba-inc.com)
 *
 * 数学 类
 *
 **/

var _cache = {
    sin: {}, //sin缓存
    cos: {} //cos缓存
};
var _radians = Math.PI / 180;

/**
 * @param angle 弧度（角度）参数
 * @param isDegrees angle参数是否为角度计算，默认为false，angle为以弧度计量的角度
 */
function sin(angle, isDegrees) {
    angle = (isDegrees ? angle * _radians : angle).toFixed(4);
    if (typeof _cache.sin[angle] == 'undefined') {
        _cache.sin[angle] = Math.sin(angle);
    }
    return _cache.sin[angle];
}

/**
 * @param radians 弧度参数
 */
function cos(angle, isDegrees) {
    angle = (isDegrees ? angle * _radians : angle).toFixed(4);
    if (typeof _cache.cos[angle] == 'undefined') {
        _cache.cos[angle] = Math.cos(angle);
    }
    return _cache.cos[angle];
}

/**
 * 角度转弧度
 * @param {Object} angle
 */
function degreeToRadian(angle) {
    return angle * _radians;
}

/**
 * 弧度转角度
 * @param {Object} angle
 */
function radianToDegree(angle) {
    return angle / _radians;
}

/*
 * 校验角度到360度内
 * @param {angle} number
 */
function degreeTo360(angle) {
    var reAng = (360 + angle % 360) % 360; //Math.abs(360 + Math.ceil( angle ) % 360) % 360;
    if (reAng == 0 && angle !== 0) {
        reAng = 360;
    }
    return reAng;
}

function getIsgonPointList(n, r) {
    var pointList = [];
    var dStep = 2 * Math.PI / n;
    var beginDeg = -Math.PI / 2;
    var deg = beginDeg;
    for (var i = 0, end = n; i < end; i++) {
        pointList.push([r * Math.cos(deg), r * Math.sin(deg)]);
        deg += dStep;
    }
    return pointList;
}

function getSmoothPointList(pList, smoothFilter) {
    //smoothFilter -- 比如在折线图中。会传一个smoothFilter过来做point的纠正。
    //让y不能超过底部的原点
    var obj = {
        points: pList
    };
    if (_.isFunction(smoothFilter)) {
        obj.smoothFilter = smoothFilter;
    }

    var currL = SmoothSpline(obj);
    if (pList && pList.length > 0) {
        currL.push(pList[pList.length - 1]);
    }

    return currL;
}

var myMath = {
    PI: Math.PI,
    sin: sin,
    cos: cos,
    degreeToRadian: degreeToRadian,
    radianToDegree: radianToDegree,
    degreeTo360: degreeTo360,
    getIsgonPointList: getIsgonPointList,
    getSmoothPointList: getSmoothPointList
};

/**
 * Canvax
 *
 * @author 释剑 (李涛, litao.lt@alibaba-inc.com)
 *
 * 折线 类
 *
 * 对应context的属性有
 * @pointList 各个顶角坐标
 **/
var BrokenLine = function (_Shape) {
    inherits(BrokenLine, _Shape);

    function BrokenLine(opt, atype) {
        classCallCheck(this, BrokenLine);

        opt = Utils.checkOpt(opt);
        var _context = _$1.extend({
            lineType: null,
            smooth: false,
            pointList: [], //{Array}  // 必须，各个顶角坐标
            smoothFilter: Utils.__emptyFunc
        }, opt.context);

        if (atype !== "clone" && _context.smooth) {
            _context.pointList = myMath.getSmoothPointList(_context.pointList);
        }

        opt.context = _context;

        var _this = possibleConstructorReturn(this, (BrokenLine.__proto__ || Object.getPrototypeOf(BrokenLine)).call(this, opt));

        _this.type = "brokenline";
        _this.id = Utils.createId(_this.type);

        _this.setGraphics();
        return _this;
    }

    createClass(BrokenLine, [{
        key: "$watch",
        value: function $watch(name, value, preValue) {
            if (name == "pointList" || name == "smooth" || name == "lineType") {
                this.setGraphics();
            }
        }
    }, {
        key: "setGraphics",
        value: function setGraphics() {
            this.graphics.clear();

            var context = this.context;
            var pointList = context.pointList;
            if (pointList.length < 2) {
                //少于2个点就不画了~
                return this;
            }
            if (!context.lineType || context.lineType == 'solid') {
                //默认为实线
                //TODO:目前如果 有设置smooth 的情况下是不支持虚线的
                this.graphics.moveTo(pointList[0][0], pointList[0][1]);
                for (var i = 1, l = pointList.length; i < l; i++) {
                    this.graphics.lineTo(pointList[i][0], pointList[i][1]);
                }
            } else if (context.lineType == 'dashed' || context.lineType == 'dotted') {
                if (context.smooth) {
                    for (var si = 0, sl = pointList.length; si < sl; si++) {
                        if (si == sl - 1) {
                            break;
                        }
                        this.graphics.moveTo(pointList[si][0], pointList[si][1]);
                        this.graphics.lineTo(pointList[si + 1][0], pointList[si + 1][1]);
                        si += 1;
                    }
                } else {
                    //画虚线的方法  
                    this.graphics.moveTo(pointList[0][0], pointList[0][1]);
                    for (var i = 1, l = pointList.length; i < l; i++) {
                        var fromX = pointList[i - 1][0];
                        var toX = pointList[i][0];
                        var fromY = pointList[i - 1][1];
                        var toY = pointList[i][1];
                        this.dashedLineTo(fromX, fromY, toX, toY, 5);
                    }
                }
            }
            return this;
        }
    }]);
    return BrokenLine;
}(Shape);

/**
 * Canvax
 *
 * @author 释剑 (李涛, litao.lt@alibaba-inc.com)
 *
 * 圆形 类
 *
 * 坐标原点再圆心
 *
 * 对应context的属性有
 * @r 圆半径
 **/
var Circle$2 = function (_Shape) {
    inherits(Circle, _Shape);

    function Circle(opt) {
        classCallCheck(this, Circle);

        opt = Utils.checkOpt(opt);
        //默认情况下面，circle不需要把xy进行parentInt转换
        "xyToInt" in opt || (opt.xyToInt = false);
        var _context = _$1.extend({
            r: 0 //{number},  // 必须，圆半径
        }, opt.context);

        opt.context = _context;

        var _this = possibleConstructorReturn(this, (Circle.__proto__ || Object.getPrototypeOf(Circle)).call(this, opt));

        _this.type = "circle";
        _this.id = Utils.createId(_this.type);

        _this.setGraphics();
        return _this;
    }

    createClass(Circle, [{
        key: "$watch",
        value: function $watch(name, value, preValue) {
            if (name == "r") {
                this.setGraphics();
            }
        }
    }, {
        key: "setGraphics",
        value: function setGraphics() {
            this.graphics.clear();
            //this.graphics.arc(0 , 0, this.context.r, 0, Math.PI * 2, true);
            this.graphics.drawCircle(0, 0, this.context.r);
        }
    }]);
    return Circle;
}(Shape);

/**
 * Canvax
 *
 * @author 释剑 (李涛, litao.lt@alibaba-inc.com)
 *
 * Path 类，Path主要用于把svgpath 字符串转换为pointList，然后构建graphicsData
 *
 * 对应context的属性有
 * @path path串
 **/
var Path = function (_Shape) {
    inherits(Path, _Shape);

    function Path(opt) {
        classCallCheck(this, Path);


        opt = Utils.checkOpt(opt);
        var _context = _$1.extend({
            pointList: [], //从下面的path中计算得到的边界点的集合
            path: "" //字符串 必须，路径。例如:M 0 0 L 0 10 L 10 10 Z (一个三角形)
            //M = moveto
            //L = lineto
            //H = horizontal lineto
            //V = vertical lineto
            //C = curveto
            //S = smooth curveto
            //Q = quadratic Belzier curve
            //T = smooth quadratic Belzier curveto
            //Z = closepath
        }, opt.context);
        opt.context = _context;

        var _this = possibleConstructorReturn(this, (Path.__proto__ || Object.getPrototypeOf(Path)).call(this, opt));

        if ("drawTypeOnly" in opt) {
            _this.drawTypeOnly = opt.drawTypeOnly;
        }

        _this.__parsePathData = null;

        _this.type = "path";
        _this.id = Utils.createId(_this.type);

        _this.setGraphics();

        return _this;
    }

    createClass(Path, [{
        key: "$watch",
        value: function $watch(name, value, preValue) {
            if (name == "path") {
                //如果path有变动，需要自动计算新的pointList
                this.setGraphics();
            }
        }
    }, {
        key: "_parsePathData",
        value: function _parsePathData(data) {
            if (this.__parsePathData) {
                return this.__parsePathData;
            }
            if (!data) {
                return [];
            }
            //分拆子分组
            this.__parsePathData = [];
            var paths = _$1.compact(data.replace(/[Mm]/g, "\\r$&").split('\\r'));
            var me = this;
            _$1.each(paths, function (pathStr) {
                me.__parsePathData.push(me._parseChildPathData(pathStr));
            });
            return this.__parsePathData;
        }
    }, {
        key: "_parseChildPathData",
        value: function _parseChildPathData(data) {
            // command string
            var cs = data;
            // command chars
            var cc = ['m', 'M', 'l', 'L', 'v', 'V', 'h', 'H', 'z', 'Z', 'c', 'C', 'q', 'Q', 't', 'T', 's', 'S', 'a', 'A'];
            cs = cs.replace(/  /g, ' ');
            cs = cs.replace(/ /g, ',');
            //cs = cs.replace(/(.)-/g, "$1,-");
            cs = cs.replace(/(\d)-/g, '$1,-');
            cs = cs.replace(/,,/g, ',');
            var n;
            // create pipes so that we can split the data
            for (n = 0; n < cc.length; n++) {
                cs = cs.replace(new RegExp(cc[n], 'g'), '|' + cc[n]);
            }
            // create array
            var arr = cs.split('|');
            var ca = [];
            // init context point
            var cpx = 0;
            var cpy = 0;
            for (n = 1; n < arr.length; n++) {
                var str = arr[n];
                var c = str.charAt(0);
                str = str.slice(1);
                str = str.replace(new RegExp('e,-', 'g'), 'e-');

                //有的时候，比如“22，-22” 数据可能会经常的被写成22-22，那么需要手动修改
                //str = str.replace(new RegExp('-', 'g'), ',-');
                //str = str.replace(/(.)-/g, "$1,-")
                var p = str.split(',');

                if (p.length > 0 && p[0] === '') {
                    p.shift();
                }

                for (var i = 0; i < p.length; i++) {
                    p[i] = parseFloat(p[i]);
                }
                while (p.length > 0) {
                    if (isNaN(p[0])) {
                        break;
                    }
                    var cmd = null;
                    var points = [];

                    var ctlPtx;
                    var ctlPty;
                    var prevCmd;

                    var rx;
                    var ry;
                    var psi;
                    var fa;
                    var fs;

                    var x1 = cpx;
                    var y1 = cpy;

                    // convert l, H, h, V, and v to L
                    switch (c) {
                        case 'l':
                            cpx += p.shift();
                            cpy += p.shift();
                            cmd = 'L';
                            points.push(cpx, cpy);
                            break;
                        case 'L':
                            cpx = p.shift();
                            cpy = p.shift();
                            points.push(cpx, cpy);
                            break;
                        case 'm':
                            cpx += p.shift();
                            cpy += p.shift();
                            cmd = 'M';
                            points.push(cpx, cpy);
                            c = 'l';
                            break;
                        case 'M':
                            cpx = p.shift();
                            cpy = p.shift();
                            cmd = 'M';
                            points.push(cpx, cpy);
                            c = 'L';
                            break;

                        case 'h':
                            cpx += p.shift();
                            cmd = 'L';
                            points.push(cpx, cpy);
                            break;
                        case 'H':
                            cpx = p.shift();
                            cmd = 'L';
                            points.push(cpx, cpy);
                            break;
                        case 'v':
                            cpy += p.shift();
                            cmd = 'L';
                            points.push(cpx, cpy);
                            break;
                        case 'V':
                            cpy = p.shift();
                            cmd = 'L';
                            points.push(cpx, cpy);
                            break;
                        case 'C':
                            points.push(p.shift(), p.shift(), p.shift(), p.shift());
                            cpx = p.shift();
                            cpy = p.shift();
                            points.push(cpx, cpy);
                            break;
                        case 'c':
                            points.push(cpx + p.shift(), cpy + p.shift(), cpx + p.shift(), cpy + p.shift());
                            cpx += p.shift();
                            cpy += p.shift();
                            cmd = 'C';
                            points.push(cpx, cpy);
                            break;
                        case 'S':
                            ctlPtx = cpx;
                            ctlPty = cpy;
                            prevCmd = ca[ca.length - 1];
                            if (prevCmd.command === 'C') {
                                ctlPtx = cpx + (cpx - prevCmd.points[2]);
                                ctlPty = cpy + (cpy - prevCmd.points[3]);
                            }
                            points.push(ctlPtx, ctlPty, p.shift(), p.shift());
                            cpx = p.shift();
                            cpy = p.shift();
                            cmd = 'C';
                            points.push(cpx, cpy);
                            break;
                        case 's':
                            ctlPtx = cpx, ctlPty = cpy;
                            prevCmd = ca[ca.length - 1];
                            if (prevCmd.command === 'C') {
                                ctlPtx = cpx + (cpx - prevCmd.points[2]);
                                ctlPty = cpy + (cpy - prevCmd.points[3]);
                            }
                            points.push(ctlPtx, ctlPty, cpx + p.shift(), cpy + p.shift());
                            cpx += p.shift();
                            cpy += p.shift();
                            cmd = 'C';
                            points.push(cpx, cpy);
                            break;
                        case 'Q':
                            points.push(p.shift(), p.shift());
                            cpx = p.shift();
                            cpy = p.shift();
                            points.push(cpx, cpy);
                            break;
                        case 'q':
                            points.push(cpx + p.shift(), cpy + p.shift());
                            cpx += p.shift();
                            cpy += p.shift();
                            cmd = 'Q';
                            points.push(cpx, cpy);
                            break;
                        case 'T':
                            ctlPtx = cpx, ctlPty = cpy;
                            prevCmd = ca[ca.length - 1];
                            if (prevCmd.command === 'Q') {
                                ctlPtx = cpx + (cpx - prevCmd.points[0]);
                                ctlPty = cpy + (cpy - prevCmd.points[1]);
                            }
                            cpx = p.shift();
                            cpy = p.shift();
                            cmd = 'Q';
                            points.push(ctlPtx, ctlPty, cpx, cpy);
                            break;
                        case 't':
                            ctlPtx = cpx, ctlPty = cpy;
                            prevCmd = ca[ca.length - 1];
                            if (prevCmd.command === 'Q') {
                                ctlPtx = cpx + (cpx - prevCmd.points[0]);
                                ctlPty = cpy + (cpy - prevCmd.points[1]);
                            }
                            cpx += p.shift();
                            cpy += p.shift();
                            cmd = 'Q';
                            points.push(ctlPtx, ctlPty, cpx, cpy);
                            break;
                        case 'A':
                            rx = p.shift(); //x半径
                            ry = p.shift(); //y半径
                            psi = p.shift(); //旋转角度
                            fa = p.shift(); //角度大小 
                            fs = p.shift(); //时针方向

                            x1 = cpx, y1 = cpy;
                            cpx = p.shift(), cpy = p.shift();
                            cmd = 'A';
                            points = [rx, ry, psi, fa, fs, cpx, cpy, x1, y1];
                            break;
                        case 'a':
                            rx = p.shift();
                            ry = p.shift();
                            psi = p.shift();
                            fa = p.shift();
                            fs = p.shift();

                            x1 = cpx, y1 = cpy;
                            cpx += p.shift();
                            cpy += p.shift();
                            cmd = 'A';
                            points = [rx, ry, psi, fa, fs, cpx, cpy, x1, y1];
                            break;

                    }

                    ca.push({
                        command: cmd || c,
                        points: points
                    });
                }

                if (c === 'z' || c === 'Z') {
                    ca.push({
                        command: 'z',
                        points: []
                    });
                }
            }
            return ca;
        }

        //重新根的path绘制graphics

    }, {
        key: "setGraphics",
        value: function setGraphics() {

            this.graphics.clear();
            this.__parsePathData = null;
            this.context.pointList = [];

            var pathArray = this._parsePathData(this.context.path);

            for (var g = 0, gl = pathArray.length; g < gl; g++) {
                for (var i = 0, l = pathArray[g].length; i < l; i++) {
                    var c = pathArray[g][i].command,
                        p = pathArray[g][i].points;
                    switch (c) {
                        case 'L':
                            this.graphics.lineTo(p[0], p[1]);
                            break;
                        case 'M':
                            this.graphics.moveTo(p[0], p[1]);
                            break;
                        case 'C':
                            this.graphics.bezierCurveTo(p[0], p[1], p[2], p[3], p[4], p[5]);
                            break;
                        case 'Q':
                            this.graphics.quadraticCurveTo(p[0], p[1], p[2], p[3]);
                            break;
                        case 'A':
                            //前面6个元素用来放path的A 6个参数，path A命令详见
                            Arc.drawArc(this.graphics, p[7], p[8], p);
                            break;
                        case 'z':
                            this.graphics.closePath();
                            break;
                    }
                }
            }
            return this;
        }
    }]);
    return Path;
}(Shape);

/**
 * Canvax
 * @author 释剑 (李涛, litao.lt@alibaba-inc.com)
 *
 * 水滴形 类
 * 派生自Path类
 *
 * 对应context的属性有
 * @hr 水滴横宽（中心到水平边缘最宽处距离）
 * @vr 水滴纵高（中心到尖端距离）
 **/
var Droplet = function (_Path) {
    inherits(Droplet, _Path);

    function Droplet(opt) {
        var _this;

        classCallCheck(this, Droplet);

        opt = Utils.checkOpt(opt);
        var _context = _$1.extend({
            hr: 0, //{number},  // 必须，水滴横宽（中心到水平边缘最宽处距离）
            vr: 0 //{number},  // 必须，水滴纵高（中心到尖端距离）
        }, opt.context);

        opt.context = _context;

        var my = (_this = possibleConstructorReturn(this, (Droplet.__proto__ || Object.getPrototypeOf(Droplet)).call(this, opt)), _this);

        _this.type = "droplet";
        _this.id = Utils.createId(_this.type);

        _this.context.path = _this._createPath();
        return _this;
    }

    createClass(Droplet, [{
        key: "$watch",
        value: function $watch(name, value, preValue) {
            if (name == "hr" || name == "vr") {
                this.context.path = this._createPath();
            }

            if (name == "path") {
                this.setGraphics();
            }
        }
    }, {
        key: "_createPath",
        value: function _createPath() {
            var context = this.context;
            var ps = "M 0 " + context.hr + " C " + context.hr + " " + context.hr + " " + context.hr * 3 / 2 + " " + -context.hr / 3 + " 0 " + -context.vr;
            ps += " C " + -context.hr * 3 / 2 + " " + -context.hr / 3 + " " + -context.hr + " " + context.hr + " 0 " + context.hr + "z";
            return ps;
        }
    }]);
    return Droplet;
}(Path);

/**
 * Canvax
 *
 * @author 释剑 (李涛, litao.lt@alibaba-inc.com)
 *
 * 椭圆形 类
 *
 * 对应context的属性有 
 *
 * @hr 椭圆横轴半径
 * @vr 椭圆纵轴半径
 */
var Ellipse$2 = function (_Shape) {
    inherits(Ellipse, _Shape);

    function Ellipse(opt) {
        classCallCheck(this, Ellipse);

        opt = Utils.checkOpt(opt);
        var _context = _$1.extend({
            //x             : 0 , //{number},  // 丢弃
            //y             : 0 , //{number},  // 丢弃，原因同circle
            hr: 0, //{number},  // 必须，椭圆横轴半径
            vr: 0 //{number},  // 必须，椭圆纵轴半径
        }, opt.context);

        opt.context = _context;

        var _this = possibleConstructorReturn(this, (Ellipse.__proto__ || Object.getPrototypeOf(Ellipse)).call(this, opt));

        _this.type = "ellipse";
        _this.id = Utils.createId(_this.type);

        _this.setGraphics();
        return _this;
    }

    createClass(Ellipse, [{
        key: "$watch",
        value: function $watch(name, value, preValue) {
            if (name == "hr" || name == "vr") {
                this.setGraphics();
            }
        }
    }, {
        key: "setGraphics",
        value: function setGraphics() {
            this.graphics.clear();
            this.graphics.drawEllipse(0, 0, this.context.hr * 2, this.context.vr * 2);
        }
    }]);
    return Ellipse;
}(Shape);

/**
 * Canvax
 *
 * @author 释剑 (李涛, litao.lt@alibaba-inc.com)
 *
 * 多边形 类  （不规则）
 *
 * 对应context的属性有
 * @pointList 多边形各个顶角坐标
 **/
var Polygon$2 = function (_Shape) {
    inherits(Polygon, _Shape);

    function Polygon(opt, atype) {
        classCallCheck(this, Polygon);

        opt = Utils.checkOpt(opt);
        var _context = _$1.extend({
            lineType: null,
            smooth: false,
            pointList: [], //{Array}  // 必须，各个顶角坐标
            smoothFilter: Utils.__emptyFunc
        }, opt.context);

        if (atype !== "clone") {
            var start = _context.pointList[0];
            var end = _context.pointList.slice(-1)[0];
            if (_context.smooth) {
                _context.pointList.unshift(end);
                _context.pointList = myMath.getSmoothPointList(_context.pointList);
            }
            //else {
            //    _context.pointList.push( start );
            //}
        }

        opt.context = _context;

        var _this = possibleConstructorReturn(this, (Polygon.__proto__ || Object.getPrototypeOf(Polygon)).call(this, opt, atype));

        _this._drawTypeOnly = null;
        _this.type = "polygon";
        _this.id = Utils.createId(_this.type);

        _this.setGraphics();
        return _this;
    }

    createClass(Polygon, [{
        key: "$watch",
        value: function $watch(name, value, preValue) {
            //调用parent的setGraphics
            if (name == "pointList" || name == "smooth" || name == "lineType") {
                this.setGraphics();
            }
        }
    }, {
        key: "setGraphics",
        value: function setGraphics() {
            this.graphics.clear();

            var context = this.context;
            var pointList = context.pointList;
            if (pointList.length < 2) {
                //少于2个点就不画了~
                return;
            }

            this.graphics.moveTo(pointList[0][0], pointList[0][1]);
            for (var i = 1, l = pointList.length; i < l; i++) {
                this.graphics.lineTo(pointList[i][0], pointList[i][1]);
            }
            this.graphics.closePath();

            //如果为虚线
            if (context.lineType == 'dashed' || context.lineType == 'dotted') {
                //首先把前面的draphicsData设置为fill only
                //也就是把line强制设置为false，这点很重要，否则你虚线画不出来，会和这个实现重叠了
                this.graphics.currentPath.line = false;

                if (context.smooth) {
                    //如果是smooth，本身已经被用曲率打散过了，不需要采用间隔法
                    for (var si = 0, sl = pointList.length; si < sl; si++) {
                        if (si == sl - 1) {
                            break;
                        }
                        this.graphics.moveTo(pointList[si][0], pointList[si][1]);
                        this.graphics.lineTo(pointList[si + 1][0], pointList[si + 1][1]);
                        si += 1;
                    }
                } else {
                    //画虚线的方法  
                    this.graphics.moveTo(pointList[0][0], pointList[0][1]);
                    for (var i = 1, l = pointList.length; i < l; i++) {
                        var fromX = pointList[i - 1][0];
                        var toX = pointList[i][0];
                        var fromY = pointList[i - 1][1];
                        var toY = pointList[i][1];
                        this.dashedLineTo(fromX, fromY, toX, toY, 5);
                    }
                }
            }
            return;
        }
    }]);
    return Polygon;
}(Shape);

/**
 * Canvax
 *
 * @author 释剑 (李涛, litao.lt@alibaba-inc.com)
 *
 * 正n边形（n>=3）
 *
 * 对应context的属性有 
 *
 * @r 正n边形外接圆半径
 * @r 指明正几边形
 *
 * @pointList 私有，从上面的r和n计算得到的边界值的集合
 */
var Isogon = function (_Polygon) {
    inherits(Isogon, _Polygon);

    function Isogon(opt) {
        classCallCheck(this, Isogon);

        opt = Utils.checkOpt(opt);
        var _context = _$1.extend({
            pointList: [], //从下面的r和n计算得到的边界值的集合
            r: 0, //{number},  // 必须，正n边形外接圆半径
            n: 0 //{number},  // 必须，指明正几边形
        }, opt.context);
        _context.pointList = myMath.getIsgonPointList(_context.n, _context.r);

        opt.context = _context;

        var _this = possibleConstructorReturn(this, (Isogon.__proto__ || Object.getPrototypeOf(Isogon)).call(this, opt));

        _this.type = "isogon";
        _this.id = Utils.createId(_this.type);
        return _this;
    }

    createClass(Isogon, [{
        key: "$watch",
        value: function $watch(name, value, preValue) {
            if (name == "r" || name == "n") {
                //如果path有变动，需要自动计算新的pointList
                this.context.pointList = myMath.getIsgonPointList(style.n, style.r);
            }

            if (name == "pointList" || name == "smooth" || name == "lineType") {
                this.setGraphics();
                this.graphics.closePath();
            }
        }
    }]);
    return Isogon;
}(Polygon$2);

/**
 * Canvax
 *
 * @author 释剑 (李涛, litao.lt@alibaba-inc.com)
 *
 * 线条 类
 *
 *
 * 对应context的属性有
 * @lineType  可选 虚线 实现 的 类型
 * @xStart    必须，起点横坐标
 * @yStart    必须，起点纵坐标
 * @xEnd      必须，终点横坐标
 * @yEnd      必须，终点纵坐标
 **/
var Line = function (_Shape) {
    inherits(Line, _Shape);

    function Line(opt) {
        classCallCheck(this, Line);

        opt = Utils.checkOpt(opt);
        var _context = _$1.extend({
            lineType: null, //可选 虚线 实现 的 类型
            start: {
                x: 0, // 必须，起点横坐标
                y: 0 // 必须，起点纵坐标
            },
            end: {
                x: 0, // 必须，终点横坐标
                y: 0 // 必须，终点纵坐标
            },
            dashLength: 3 // 虚线间隔
        }, opt.context);
        opt.context = _context;

        var _this = possibleConstructorReturn(this, (Line.__proto__ || Object.getPrototypeOf(Line)).call(this, opt));

        _this.setGraphics();

        _this.type = "line";
        _this.id = Utils.createId(_this.type);
        return _this;
    }

    createClass(Line, [{
        key: "$watch",
        value: function $watch(name, value, preValue) {
            //并不清楚是start.x 还是end.x， 当然，这并不重要
            if (name == "x" || name == "y") {
                this.setGraphics();
            }
        }
    }, {
        key: "setGraphics",
        value: function setGraphics() {
            this.graphics.clear();
            var context = this.context;
            if (!context.lineType || context.lineType == 'solid') {
                this.graphics.moveTo(context.start.x, context.start.y);
                this.graphics.lineTo(context.end.x, context.end.y);
            } else if (context.lineType == 'dashed' || context.lineType == 'dotted') {
                this.dashedLineTo(context.start.x, context.start.y, context.end.x, context.end.y, this.context.dashLength);
            }
            return this;
        }
    }]);
    return Line;
}(Shape);

/**
 * Canvax
 *
 * @author 释剑 (李涛, litao.lt@alibaba-inc.com)
 *
 * 矩现 类  （不规则）
 *
 *
 * 对应context的属性有
 * @width 宽度
 * @height 高度
 * @radius 如果是圆角的，则为【上右下左】顺序的圆角半径数组
 **/
var Rect = function (_Shape) {
    inherits(Rect, _Shape);

    function Rect(opt) {
        classCallCheck(this, Rect);

        opt = Utils.checkOpt(opt);
        var _context = _$1.extend({
            width: 0,
            height: 0,
            radius: []
        }, opt.context);
        opt.context = _context;

        var _this = possibleConstructorReturn(this, (Rect.__proto__ || Object.getPrototypeOf(Rect)).call(this, opt));

        _this.type = "rect";
        _this.id = Utils.createId(_this.type);

        _this.setGraphics();
        return _this;
    }

    createClass(Rect, [{
        key: "$watch",
        value: function $watch(name, value, preValue) {
            if (name == "width" || name == "height" || name == "radius") {
                this.setGraphics();
            }
        }

        /**
         * 绘制圆角矩形
         */

    }, {
        key: "_buildRadiusPath",
        value: function _buildRadiusPath() {
            var context = this.context;
            //左上、右上、右下、左下角的半径依次为r1、r2、r3、r4
            //r缩写为1         相当于 [1, 1, 1, 1]
            //r缩写为[1]       相当于 [1, 1, 1, 1]
            //r缩写为[1, 2]    相当于 [1, 2, 1, 2]
            //r缩写为[1, 2, 3] 相当于 [1, 2, 3, 2]
            var x = 0;
            var y = 0;
            var width = this.context.width;
            var height = this.context.height;

            var r = Utils.getCssOrderArr(context.radius);
            var G = this.graphics;

            G.moveTo(parseInt(x + r[0]), parseInt(y));
            G.lineTo(parseInt(x + width - r[1]), parseInt(y));
            r[1] !== 0 && G.quadraticCurveTo(x + width, y, x + width, y + r[1]);
            G.lineTo(parseInt(x + width), parseInt(y + height - r[2]));
            r[2] !== 0 && G.quadraticCurveTo(x + width, y + height, x + width - r[2], y + height);
            G.lineTo(parseInt(x + r[3]), parseInt(y + height));
            r[3] !== 0 && G.quadraticCurveTo(x, y + height, x, y + height - r[3]);
            G.lineTo(parseInt(x), parseInt(y + r[0]));
            r[0] !== 0 && G.quadraticCurveTo(x, y, x + r[0], y);
        }
        /**
         * 创建矩形路径
         * @param {Context2D} ctx Canvas 2D上下文
         * @param {Object} context 样式
         */

    }, {
        key: "setGraphics",
        value: function setGraphics() {
            this.graphics.clear();
            if (!this.context.radius.length) {
                this.graphics.drawRect(0, 0, this.context.width, this.context.height);
            } else {
                this._buildRadiusPath();
            }
            this.graphics.closePath();
            return;
        }
    }]);
    return Rect;
}(Shape);

/**
 * Canvax
 *
 * @author 释剑 (李涛, litao.lt@alibaba-inc.com)
 *
 * 扇形 类
 *
 * 坐标原点再圆心
 *
 * 对应context的属性有
 * @r0 默认为0，内圆半径指定后将出现内弧，同时扇边长度 = r - r0
 * @r  必须，外圆半径
 * @startAngle 起始角度(0, 360)
 * @endAngle   结束角度(0, 360)
 **/
var Sector = function (_Shape) {
    inherits(Sector, _Shape);

    function Sector(opt) {
        classCallCheck(this, Sector);

        opt = Utils.checkOpt(opt);
        var _context = _$1.extend({
            pointList: [], //边界点的集合,私有，从下面的属性计算的来
            r0: 0, // 默认为0，内圆半径指定后将出现内弧，同时扇边长度 = r - r0
            r: 0, //{number},  // 必须，外圆半径
            startAngle: 0, //{number},  // 必须，起始角度[0, 360)
            endAngle: 0, //{number},  // 必须，结束角度(0, 360]
            clockwise: false //是否顺时针，默认为false(顺时针)
        }, opt.context);

        opt.context = _context;

        var _this = possibleConstructorReturn(this, (Sector.__proto__ || Object.getPrototypeOf(Sector)).call(this, opt));

        _this.regAngle = [];
        _this.isRing = false; //是否为一个圆环
        _this.type = "sector";
        _this.id = Utils.createId(_this.type);

        _this.setGraphics();
        return _this;
    }

    createClass(Sector, [{
        key: "$watch",
        value: function $watch(name, value, preValue) {
            if (name == "r0" || name == "r" || name == "startAngle" || name == "endAngle" || name == "clockwise") {
                this.setGraphics();
            }
        }
    }, {
        key: "setGraphics",
        value: function setGraphics() {
            var context = this.context;
            // 形内半径[0,r)
            var r0 = typeof context.r0 == 'undefined' ? 0 : context.r0;
            var r = context.r; // 扇形外半径(0,r]
            var startAngle = myMath.degreeTo360(context.startAngle); // 起始角度[0,360)
            var endAngle = myMath.degreeTo360(context.endAngle); // 结束角度(0,360]

            //var isRing     = false;                       //是否为圆环

            //if( startAngle != endAngle && Math.abs(startAngle - endAngle) % 360 == 0 ) {
            if (startAngle == endAngle && context.startAngle != context.endAngle) {
                //如果两个角度相等，那么就认为是个圆环了
                this.isRing = true;
                startAngle = 0;
                endAngle = 360;
            }

            startAngle = myMath.degreeToRadian(startAngle);
            endAngle = myMath.degreeToRadian(endAngle);

            //处理下极小夹角的情况
            if (endAngle - startAngle < 0.025) {
                startAngle -= 0.003;
            }

            var G = this.graphics;

            G.arc(0, 0, r, startAngle, endAngle, this.context.clockwise);
            if (r0 !== 0) {
                if (this.isRing) {
                    //加上这个isRing的逻辑是为了兼容flashcanvas下绘制圆环的的问题
                    //不加这个逻辑flashcanvas会绘制一个大圆 ， 而不是圆环
                    G.moveTo(r0, 0);
                    G.arc(0, 0, r0, startAngle, endAngle, !this.context.clockwise);
                } else {
                    G.arc(0, 0, r0, endAngle, startAngle, !this.context.clockwise);
                }
            } else {
                //TODO:在r0为0的时候，如果不加lineTo(0,0)来把路径闭合，会出现有搞笑的一个bug
                //整个圆会出现一个以每个扇形两端为节点的镂空，我可能描述不清楚，反正这个加上就好了
                G.lineTo(0, 0);
            }

            G.closePath();
        }
    }, {
        key: "getRegAngle",
        value: function getRegAngle() {
            this.regIn = true; //如果在start和end的数值中，end大于start而且是顺时针则regIn为true
            var c = this.context;
            var startAngle = myMath.degreeTo360(c.startAngle); // 起始角度[0,360)
            var endAngle = myMath.degreeTo360(c.endAngle); // 结束角度(0,360]

            if (startAngle > endAngle && !c.clockwise || startAngle < endAngle && c.clockwise) {
                this.regIn = false; //out
            }
            //度的范围，从小到大
            this.regAngle = [Math.min(startAngle, endAngle), Math.max(startAngle, endAngle)];
        }
    }, {
        key: "getRect",
        value: function getRect(context) {
            var context = context ? context : this.context;
            var r0 = typeof context.r0 == 'undefined' // 形内半径[0,r)
            ? 0 : context.r0;
            var r = context.r; // 扇形外半径(0,r]

            this.getRegAngle();

            var startAngle = myMath.degreeTo360(context.startAngle); // 起始角度[0,360)
            var endAngle = myMath.degreeTo360(context.endAngle); // 结束角度(0,360]

            var pointList = [];

            var p4Direction = {
                "90": [0, r],
                "180": [-r, 0],
                "270": [0, -r],
                "360": [r, 0]
            };

            for (var d in p4Direction) {
                var inAngleReg = parseInt(d) > this.regAngle[0] && parseInt(d) < this.regAngle[1];
                if (this.isRing || inAngleReg && this.regIn || !inAngleReg && !this.regIn) {
                    pointList.push(p4Direction[d]);
                }
            }

            if (!this.isRing) {
                startAngle = myMath.degreeToRadian(startAngle);
                endAngle = myMath.degreeToRadian(endAngle);

                pointList.push([myMath.cos(startAngle) * r0, myMath.sin(startAngle) * r0]);

                pointList.push([myMath.cos(startAngle) * r, myMath.sin(startAngle) * r]);

                pointList.push([myMath.cos(endAngle) * r, myMath.sin(endAngle) * r]);

                pointList.push([myMath.cos(endAngle) * r0, myMath.sin(endAngle) * r0]);
            }

            context.pointList = pointList;
            return this.getRectFormPointList(context);
        }
    }]);
    return Sector;
}(Shape);

//shapes
var Canvax = {
    App: Application
};

Canvax.Display = {
    DisplayObject: DisplayObject,
    DisplayObjectContainer: DisplayObjectContainer,
    Stage: Stage,
    Sprite: Sprite,
    Shape: Shape,
    Point: Point,
    Text: Text
};

Canvax.Shapes = {
    BrokenLine: BrokenLine,
    Circle: Circle$2,
    Droplet: Droplet,
    Ellipse: Ellipse$2,
    Isogon: Isogon,
    Line: Line,
    Path: Path,
    Polygon: Polygon$2,
    Rect: Rect,
    Sector: Sector
};

Canvax.Event = {
    EventDispatcher: EventDispatcher,
    EventManager: EventManager
};

return Canvax;

}());
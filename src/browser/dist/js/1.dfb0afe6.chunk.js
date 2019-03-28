(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(23)('wks');
var uid = __webpack_require__(14);
var Symbol = __webpack_require__(1).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(6);
var IE8_DOM_DEFINE = __webpack_require__(28);
var toPrimitive = __webpack_require__(20);
var dP = Object.defineProperty;

exports.f = __webpack_require__(3) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(10)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var core = __webpack_require__(12);
var hide = __webpack_require__(5);
var redefine = __webpack_require__(7);
var ctx = __webpack_require__(30);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(2);
var createDesc = __webpack_require__(13);
module.exports = __webpack_require__(3) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(9);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var hide = __webpack_require__(5);
var has = __webpack_require__(8);
var SRC = __webpack_require__(14)('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(12).inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),
/* 8 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(49);
var defined = __webpack_require__(16);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 16 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(33);
var enumBugKeys = __webpack_require__(24);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 19 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(9);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(23)('keys');
var uid = __webpack_require__(14);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(12);
var global = __webpack_require__(1);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(17) ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 24 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(2).f;
var has = __webpack_require__(8);
var TAG = __webpack_require__(0)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 26 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(17);
var $export = __webpack_require__(4);
var redefine = __webpack_require__(7);
var hide = __webpack_require__(5);
var Iterators = __webpack_require__(15);
var $iterCreate = __webpack_require__(47);
var setToStringTag = __webpack_require__(25);
var getPrototypeOf = __webpack_require__(53);
var ITERATOR = __webpack_require__(0)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(3) && !__webpack_require__(10)(function () {
  return Object.defineProperty(__webpack_require__(29)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(9);
var document = __webpack_require__(1).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(31);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(6);
var dPs = __webpack_require__(48);
var enumBugKeys = __webpack_require__(24);
var IE_PROTO = __webpack_require__(22)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(29)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(52).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(8);
var toIObject = __webpack_require__(11);
var arrayIndexOf = __webpack_require__(50)(false);
var IE_PROTO = __webpack_require__(22)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(19);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(16);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(21);
var TAG = __webpack_require__(0)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__(6);
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var core = __webpack_require__(12);
var LIBRARY = __webpack_require__(17);
var wksExt = __webpack_require__(39);
var defineProperty = __webpack_require__(2).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(0);


/***/ }),
/* 40 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(21);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(33);
var hiddenKeys = __webpack_require__(24).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**!
 * Sortable
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */

(function sortableModule(factory) {
	"use strict";

	if (true) {
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}
	else {}
})(function sortableFactory() {
	"use strict";

	if (typeof window === "undefined" || !window.document) {
		return function sortableError() {
			throw new Error("Sortable.js requires a window with a document");
		};
	}

	var dragEl,
		parentEl,
		ghostEl,
		cloneEl,
		rootEl,
		nextEl,
		lastDownEl,

		scrollEl,
		scrollParentEl,
		scrollCustomFn,

		oldIndex,
		newIndex,

		activeGroup,
		putSortable,

		autoScrolls = [],
		scrolling = false,

		awaitingDragStarted = false,
		ignoreNextClick = false,
		sortables = [],

		pointerElemChangedInterval,
		lastPointerElemX,
		lastPointerElemY,

		tapEvt,
		touchEvt,

		moved,


		lastTarget,
		lastDirection,
		pastFirstInvertThresh = false,
		isCircumstantialInvert = false,
		lastMode, // 'swap' or 'insert'

		targetMoveDistance,

		// For positioning ghost absolutely
		ghostRelativeParent,
		ghostRelativeParentInitialScroll = [], // (left, top)


		forRepaintDummy,
		realDragElRect, // dragEl rect after current animation

		/** @const */
		R_SPACE = /\s+/g,

		expando = 'Sortable' + (new Date).getTime(),

		win = window,
		document = win.document,
		parseInt = win.parseInt,
		setTimeout = win.setTimeout,

		$ = win.jQuery || win.Zepto,
		Polymer = win.Polymer,

		captureMode = {
			capture: false,
			passive: false
		},

		IE11OrLess = !!navigator.userAgent.match(/(?:Trident.*rv[ :]?11\.|msie|iemobile)/i),
		Edge = !!navigator.userAgent.match(/Edge/i),
		FireFox = !!navigator.userAgent.match(/firefox/i),
		Safari = !!(navigator.userAgent.match(/safari/i) && !navigator.userAgent.match(/chrome/i) && !navigator.userAgent.match(/android/i)),
		IOS = !!(navigator.userAgent.match(/iP(ad|od|hone)/i)),

		PositionGhostAbsolutely = IOS,

		CSSFloatProperty = Edge || IE11OrLess ? 'cssFloat' : 'float',

		// This will not pass for IE9, because IE9 DnD only works on anchors
		supportDraggable = ('draggable' in document.createElement('div')),

		supportCssPointerEvents = (function() {
			// false when <= IE11
			if (IE11OrLess) {
				return false;
			}
			var el = document.createElement('x');
			el.style.cssText = 'pointer-events:auto';
			return el.style.pointerEvents === 'auto';
		})(),

		_silent = false,
		_alignedSilent = false,

		abs = Math.abs,
		min = Math.min,
		max = Math.max,

		savedInputChecked = [],

		_detectDirection = function(el, options) {
			var elCSS = _css(el),
				elWidth = parseInt(elCSS.width)
					- parseInt(elCSS.paddingLeft)
					- parseInt(elCSS.paddingRight)
					- parseInt(elCSS.borderLeftWidth)
					- parseInt(elCSS.borderRightWidth),
				child1 = _getChild(el, 0, options),
				child2 = _getChild(el, 1, options),
				firstChildCSS = child1 && _css(child1),
				secondChildCSS = child2 && _css(child2),
				firstChildWidth = firstChildCSS && parseInt(firstChildCSS.marginLeft) + parseInt(firstChildCSS.marginRight) + _getRect(child1).width,
				secondChildWidth = secondChildCSS && parseInt(secondChildCSS.marginLeft) + parseInt(secondChildCSS.marginRight) + _getRect(child2).width;

			if (elCSS.display === 'flex') {
				return elCSS.flexDirection === 'column' || elCSS.flexDirection === 'column-reverse'
				? 'vertical' : 'horizontal';
			}

			if (elCSS.display === 'grid') {
				return elCSS.gridTemplateColumns.split(' ').length <= 1 ? 'vertical' : 'horizontal';
			}

			if (child1 && firstChildCSS.float !== 'none') {
				var touchingSideChild2 = firstChildCSS.float === 'left' ? 'left' : 'right';

				return child2 && (secondChildCSS.clear === 'both' || secondChildCSS.clear === touchingSideChild2) ?
					'vertical' : 'horizontal';
			}

			return (child1 &&
				(
					firstChildCSS.display === 'block' ||
					firstChildCSS.display === 'flex' ||
					firstChildCSS.display === 'table' ||
					firstChildCSS.display === 'grid' ||
					firstChildWidth >= elWidth &&
					elCSS[CSSFloatProperty] === 'none' ||
					child2 &&
					elCSS[CSSFloatProperty] === 'none' &&
					firstChildWidth + secondChildWidth > elWidth
				) ?
				'vertical' : 'horizontal'
			);
		},

		/**
		 * Detects first nearest empty sortable to X and Y position using emptyInsertThreshold.
		 * @param  {Number} x      X position
		 * @param  {Number} y      Y position
		 * @return {HTMLElement}   Element of the first found nearest Sortable
		 */
		_detectNearestEmptySortable = function(x, y) {
			for (var i = 0; i < sortables.length; i++) {
				if (_lastChild(sortables[i])) continue;

				var rect = _getRect(sortables[i]),
					threshold = sortables[i][expando].options.emptyInsertThreshold,
					insideHorizontally = x >= (rect.left - threshold) && x <= (rect.right + threshold),
					insideVertically = y >= (rect.top - threshold) && y <= (rect.bottom + threshold);

				if (insideHorizontally && insideVertically) {
					return sortables[i];
				}
			}
		},

		_isClientInRowColumn = function(x, y, el, axis, options) {
			var targetRect = _getRect(el),
				targetS1Opp = axis === 'vertical' ? targetRect.left : targetRect.top,
				targetS2Opp = axis === 'vertical' ? targetRect.right : targetRect.bottom,
				mouseOnOppAxis = axis === 'vertical' ? x : y;

			return targetS1Opp < mouseOnOppAxis && mouseOnOppAxis < targetS2Opp;
		},

		_isElInRowColumn = function(el1, el2, axis) {
			var el1Rect = el1 === dragEl && realDragElRect || _getRect(el1),
				el2Rect = el2 === dragEl && realDragElRect || _getRect(el2),
				el1S1Opp = axis === 'vertical' ? el1Rect.left : el1Rect.top,
				el1S2Opp = axis === 'vertical' ? el1Rect.right : el1Rect.bottom,
				el1OppLength = axis === 'vertical' ? el1Rect.width : el1Rect.height,
				el2S1Opp = axis === 'vertical' ? el2Rect.left : el2Rect.top,
				el2S2Opp = axis === 'vertical' ? el2Rect.right : el2Rect.bottom,
				el2OppLength = axis === 'vertical' ? el2Rect.width : el2Rect.height;

			return (
				el1S1Opp === el2S1Opp ||
				el1S2Opp === el2S2Opp ||
				(el1S1Opp + el1OppLength / 2) === (el2S1Opp + el2OppLength / 2)
			);
		},

		_getParentAutoScrollElement = function(el, includeSelf) {
			// skip to window
			if (!el || !el.getBoundingClientRect) return _getWindowScrollingElement();

			var elem = el;
			var gotSelf = false;
			do {
				// we don't need to get elem css if it isn't even overflowing in the first place (performance)
				if (elem.clientWidth < elem.scrollWidth || elem.clientHeight < elem.scrollHeight) {
					var elemCSS = _css(elem);
					if (
						elem.clientWidth < elem.scrollWidth && (elemCSS.overflowX == 'auto' || elemCSS.overflowX == 'scroll') ||
						elem.clientHeight < elem.scrollHeight && (elemCSS.overflowY == 'auto' || elemCSS.overflowY == 'scroll')
					) {
						if (!elem || !elem.getBoundingClientRect || elem === document.body) return _getWindowScrollingElement();

						if (gotSelf || includeSelf) return elem;
						gotSelf = true;
					}
				}
			/* jshint boss:true */
			} while (elem = elem.parentNode);

			return _getWindowScrollingElement();
		},

		_getWindowScrollingElement = function() {
			if (IE11OrLess) {
				return document.documentElement;
			} else {
				return document.scrollingElement;
			}
		},

		_scrollBy = function(el, x, y) {
			el.scrollLeft += x;
			el.scrollTop += y;
		},

		_autoScroll = _throttle(function (/**Event*/evt, /**Object*/options, /**HTMLElement*/rootEl, /**Boolean*/isFallback) {
			// Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=505521
			if (options.scroll) {
				var _this = rootEl ? rootEl[expando] : window,
					sens = options.scrollSensitivity,
					speed = options.scrollSpeed,

					x = evt.clientX,
					y = evt.clientY,

					winScroller = _getWindowScrollingElement(),

					scrollThisInstance = false;

				// Detect scrollEl
				if (scrollParentEl !== rootEl) {
					_clearAutoScrolls();

					scrollEl = options.scroll;
					scrollCustomFn = options.scrollFn;

					if (scrollEl === true) {
						scrollEl = _getParentAutoScrollElement(rootEl, true);
						scrollParentEl = scrollEl;
					}
				}


				var layersOut = 0;
				var currentParent = scrollEl;
				do {
					var	el = currentParent,
						rect = _getRect(el),

						top = rect.top,
						bottom = rect.bottom,
						left = rect.left,
						right = rect.right,

						width = rect.width,
						height = rect.height,

						scrollWidth,
						scrollHeight,

						css,

						vx,
						vy,

						canScrollX,
						canScrollY,

						scrollPosX,
						scrollPosY;


					scrollWidth = el.scrollWidth;
					scrollHeight = el.scrollHeight;

					css = _css(el);

					scrollPosX = el.scrollLeft;
					scrollPosY = el.scrollTop;

					if (el === winScroller) {
						canScrollX = width < scrollWidth && (css.overflowX === 'auto' || css.overflowX === 'scroll' || css.overflowX === 'visible');
						canScrollY = height < scrollHeight && (css.overflowY === 'auto' || css.overflowY === 'scroll' || css.overflowY === 'visible');
					} else {
						canScrollX = width < scrollWidth && (css.overflowX === 'auto' || css.overflowX === 'scroll');
						canScrollY = height < scrollHeight && (css.overflowY === 'auto' || css.overflowY === 'scroll');
					}

					vx = canScrollX && (abs(right - x) <= sens && (scrollPosX + width) < scrollWidth) - (abs(left - x) <= sens && !!scrollPosX);

					vy = canScrollY && (abs(bottom - y) <= sens && (scrollPosY + height) < scrollHeight) - (abs(top - y) <= sens && !!scrollPosY);


					if (!autoScrolls[layersOut]) {
						for (var i = 0; i <= layersOut; i++) {
							if (!autoScrolls[i]) {
								autoScrolls[i] = {};
							}
						}
					}

					if (autoScrolls[layersOut].vx != vx || autoScrolls[layersOut].vy != vy || autoScrolls[layersOut].el !== el) {
						autoScrolls[layersOut].el = el;
						autoScrolls[layersOut].vx = vx;
						autoScrolls[layersOut].vy = vy;

						clearInterval(autoScrolls[layersOut].pid);

						if (el && (vx != 0 || vy != 0)) {
							scrollThisInstance = true;
							/* jshint loopfunc:true */
							autoScrolls[layersOut].pid = setInterval((function () {
								// emulate drag over during autoscroll (fallback), emulating native DnD behaviour
								if (isFallback && this.layer === 0) {
									Sortable.active._emulateDragOver(true);
									Sortable.active._onTouchMove(touchEvt, true);
								}
								var scrollOffsetY = autoScrolls[this.layer].vy ? autoScrolls[this.layer].vy * speed : 0;
								var scrollOffsetX = autoScrolls[this.layer].vx ? autoScrolls[this.layer].vx * speed : 0;

								if ('function' === typeof(scrollCustomFn)) {
									if (scrollCustomFn.call(_this, scrollOffsetX, scrollOffsetY, evt, touchEvt, autoScrolls[this.layer].el) !== 'continue') {
										return;
									}
								}

								_scrollBy(autoScrolls[this.layer].el, scrollOffsetX, scrollOffsetY);
							}).bind({layer: layersOut}), 24);
						}
					}
					layersOut++;
				} while (options.bubbleScroll && currentParent !== winScroller && (currentParent = _getParentAutoScrollElement(currentParent, false)));
				scrolling = scrollThisInstance; // in case another function catches scrolling as false in between when it is not
			}
		}, 30),

		_clearAutoScrolls = function () {
			autoScrolls.forEach(function(autoScroll) {
				clearInterval(autoScroll.pid);
			});
			autoScrolls = [];
		},

		_prepareGroup = function (options) {
			function toFn(value, pull) {
				return function(to, from, dragEl, evt) {
					var sameGroup = to.options.group.name &&
									from.options.group.name &&
									to.options.group.name === from.options.group.name;

					if (value == null && (pull || sameGroup)) {
						// Default pull value
						// Default pull and put value if same group
						return true;
					} else if (value == null || value === false) {
						return false;
					} else if (pull && value === 'clone') {
						return value;
					} else if (typeof value === 'function') {
						return toFn(value(to, from, dragEl, evt), pull)(to, from, dragEl, evt);
					} else {
						var otherGroup = (pull ? to : from).options.group.name;

						return (value === true ||
						(typeof value === 'string' && value === otherGroup) ||
						(value.join && value.indexOf(otherGroup) > -1));
					}
				};
			}

			var group = {};
			var originalGroup = options.group;

			if (!originalGroup || typeof originalGroup != 'object') {
				originalGroup = {name: originalGroup};
			}

			group.name = originalGroup.name;
			group.checkPull = toFn(originalGroup.pull, true);
			group.checkPut = toFn(originalGroup.put);
			group.revertClone = originalGroup.revertClone;

			options.group = group;
		},

		_checkAlignment = function(evt) {
			if (!dragEl || !dragEl.parentNode) return;
			dragEl.parentNode[expando] && dragEl.parentNode[expando]._computeIsAligned(evt);
		},

		_isTrueParentSortable = function(el, target) {
			var trueParent = target;
			while (!trueParent[expando]) {
				trueParent = trueParent.parentNode;
			}

			return el === trueParent;
		},

		_artificalBubble = function(sortable, originalEvt, method) {
			// Artificial IE bubbling
			var nextParent = sortable.parentNode;
			while (nextParent && !nextParent[expando]) {
				nextParent = nextParent.parentNode;
			}

			if (nextParent) {
				nextParent[expando][method](_extend(originalEvt, {
					artificialBubble: true
				}));
			}
		},

		_hideGhostForTarget = function() {
			if (!supportCssPointerEvents && ghostEl) {
				_css(ghostEl, 'display', 'none');
			}
		},

		_unhideGhostForTarget = function() {
			if (!supportCssPointerEvents && ghostEl) {
				_css(ghostEl, 'display', '');
			}
		};


	// #1184 fix - Prevent click event on fallback if dragged but item not changed position
	document.addEventListener('click', function(evt) {
		if (ignoreNextClick) {
			evt.preventDefault();
			evt.stopPropagation && evt.stopPropagation();
			evt.stopImmediatePropagation && evt.stopImmediatePropagation();
			ignoreNextClick = false;
			return false;
		}
	}, true);

	var nearestEmptyInsertDetectEvent = function(evt) {
		evt = evt.touches ? evt.touches[0] : evt;
		if (dragEl) {
			var nearest = _detectNearestEmptySortable(evt.clientX, evt.clientY);

			if (nearest) {
				nearest[expando]._onDragOver({
					clientX: evt.clientX,
					clientY: evt.clientY,
					target: nearest,
					rootEl: nearest
				});
			}
		}
	};
	// We do not want this to be triggered if completed (bubbling canceled), so only define it here
	_on(document, 'dragover', nearestEmptyInsertDetectEvent);
	_on(document, 'mousemove', nearestEmptyInsertDetectEvent);
	_on(document, 'touchmove', nearestEmptyInsertDetectEvent);

	/**
	 * @class  Sortable
	 * @param  {HTMLElement}  el
	 * @param  {Object}       [options]
	 */
	function Sortable(el, options) {
		if (!(el && el.nodeType && el.nodeType === 1)) {
			throw 'Sortable: `el` must be HTMLElement, not ' + {}.toString.call(el);
		}

		this.el = el; // root element
		this.options = options = _extend({}, options);


		// Export instance
		el[expando] = this;

		// Default options
		var defaults = {
			group: null,
			sort: true,
			disabled: false,
			store: null,
			handle: null,
			scroll: true,
			scrollSensitivity: 30,
			scrollSpeed: 10,
			bubbleScroll: true,
			draggable: /[uo]l/i.test(el.nodeName) ? '>li' : '>*',
			swapThreshold: 1, // percentage; 0 <= x <= 1
			invertSwap: false, // invert always
			invertedSwapThreshold: null, // will be set to same as swapThreshold if default
			removeCloneOnHide: true,
			direction: function() {
				return _detectDirection(el, this.options);
			},
			ghostClass: 'sortable-ghost',
			chosenClass: 'sortable-chosen',
			dragClass: 'sortable-drag',
			ignore: 'a, img',
			filter: null,
			preventOnFilter: true,
			animation: 0,
			easing: null,
			setData: function (dataTransfer, dragEl) {
				dataTransfer.setData('Text', dragEl.textContent);
			},
			dropBubble: false,
			dragoverBubble: false,
			dataIdAttr: 'data-id',
			delay: 0,
			touchStartThreshold: parseInt(window.devicePixelRatio, 10) || 1,
			forceFallback: false,
			fallbackClass: 'sortable-fallback',
			fallbackOnBody: false,
			fallbackTolerance: 0,
			fallbackOffset: {x: 0, y: 0},
			supportPointer: Sortable.supportPointer !== false && (
				('PointerEvent' in window) ||
				window.navigator && ('msPointerEnabled' in window.navigator) // microsoft
			),
			emptyInsertThreshold: 5
		};


		// Set default options
		for (var name in defaults) {
			!(name in options) && (options[name] = defaults[name]);
		}

		_prepareGroup(options);

		// Bind all private methods
		for (var fn in this) {
			if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
				this[fn] = this[fn].bind(this);
			}
		}

		// Setup drag mode
		this.nativeDraggable = options.forceFallback ? false : supportDraggable;

		if (this.nativeDraggable) {
			// Touch start threshold cannot be greater than the native dragstart threshold
			this.options.touchStartThreshold = 1;
		}

		// Bind events
		if (options.supportPointer) {
			_on(el, 'pointerdown', this._onTapStart);
		} else {
			_on(el, 'mousedown', this._onTapStart);
			_on(el, 'touchstart', this._onTapStart);
		}

		if (this.nativeDraggable) {
			_on(el, 'dragover', this);
			_on(el, 'dragenter', this);
		}

		sortables.push(this.el);

		// Restore sorting
		options.store && options.store.get && this.sort(options.store.get(this) || []);
	}

	Sortable.prototype = /** @lends Sortable.prototype */ {
		constructor: Sortable,

		_computeIsAligned: function(evt) {
			var target;

			if (ghostEl && !supportCssPointerEvents) {
				_hideGhostForTarget();
				target = document.elementFromPoint(evt.clientX, evt.clientY);
				_unhideGhostForTarget();
			} else {
				target = evt.target;
			}

			target = _closest(target, this.options.draggable, this.el, false);
			if (_alignedSilent) return;
			if (!dragEl || dragEl.parentNode !== this.el) return;

			var children = this.el.children;
			for (var i = 0; i < children.length; i++) {
				// Don't change for target in case it is changed to aligned before onDragOver is fired
				if (_closest(children[i], this.options.draggable, this.el, false) && children[i] !== target) {
					children[i].sortableMouseAligned = _isClientInRowColumn(evt.clientX, evt.clientY, children[i], this._getDirection(evt, null), this.options);
				}
			}
			// Used for nulling last target when not in element, nothing to do with checking if aligned
			if (!_closest(target, this.options.draggable, this.el, true)) {
				lastTarget = null;
			}

			_alignedSilent = true;
			setTimeout(function() {
				_alignedSilent = false;
			}, 30);

		},

		_getDirection: function(evt, target) {
			return (typeof this.options.direction === 'function') ? this.options.direction.call(this, evt, target, dragEl) : this.options.direction;
		},

		_onTapStart: function (/** Event|TouchEvent */evt) {
			if (!evt.cancelable) return;
			var _this = this,
				el = this.el,
				options = this.options,
				preventOnFilter = options.preventOnFilter,
				type = evt.type,
				touch = evt.touches && evt.touches[0],
				target = (touch || evt).target,
				originalTarget = evt.target.shadowRoot && ((evt.path && evt.path[0]) || (evt.composedPath && evt.composedPath()[0])) || target,
				filter = options.filter,
				startIndex;

			_saveInputCheckedState(el);


			// IE: Calls events in capture mode if event element is nested. This ensures only correct element's _onTapStart goes through.
			// This process is also done in _onDragOver
			if (IE11OrLess && !evt.artificialBubble && !_isTrueParentSortable(el, target)) {
				return;
			}

			// Don't trigger start event when an element is been dragged, otherwise the evt.oldindex always wrong when set option.group.
			if (dragEl) {
				return;
			}

			if (/mousedown|pointerdown/.test(type) && evt.button !== 0 || options.disabled) {
				return; // only left button and enabled
			}

			// cancel dnd if original target is content editable
			if (originalTarget.isContentEditable) {
				return;
			}

			target = _closest(target, options.draggable, el, false);

			if (!target) {
				if (IE11OrLess) {
					_artificalBubble(el, evt, '_onTapStart');
				}
				return;
			}

			if (lastDownEl === target) {
				// Ignoring duplicate `down`
				return;
			}

			// Get the index of the dragged element within its parent
			startIndex = _index(target, options.draggable);

			// Check filter
			if (typeof filter === 'function') {
				if (filter.call(this, evt, target, this)) {
					_dispatchEvent(_this, originalTarget, 'filter', target, el, el, startIndex);
					preventOnFilter && evt.cancelable && evt.preventDefault();
					return; // cancel dnd
				}
			}
			else if (filter) {
				filter = filter.split(',').some(function (criteria) {
					criteria = _closest(originalTarget, criteria.trim(), el, false);

					if (criteria) {
						_dispatchEvent(_this, criteria, 'filter', target, el, el, startIndex);
						return true;
					}
				});

				if (filter) {
					preventOnFilter && evt.cancelable && evt.preventDefault();
					return; // cancel dnd
				}
			}

			if (options.handle && !_closest(originalTarget, options.handle, el, false)) {
				return;
			}

			// Prepare `dragstart`
			this._prepareDragStart(evt, touch, target, startIndex);
		},


		_handleAutoScroll: function(evt, fallback) {
			if (!dragEl || !this.options.scroll) return;
			var x = evt.clientX,
				y = evt.clientY,

				elem = document.elementFromPoint(x, y),
				_this = this;

			// IE does not seem to have native autoscroll,
			// Edge's autoscroll seems too conditional,
			// MACOS Safari does not have autoscroll,
			// Firefox and Chrome are good
			if (fallback || Edge || IE11OrLess || Safari) {
				_autoScroll(evt, _this.options, elem, fallback);

				// Listener for pointer element change
				var ogElemScroller = _getParentAutoScrollElement(elem, true);
				if (
					scrolling &&
					(
						!pointerElemChangedInterval ||
						x !== lastPointerElemX ||
						y !== lastPointerElemY
					)
				) {

					pointerElemChangedInterval && clearInterval(pointerElemChangedInterval);
					// Detect for pointer elem change, emulating native DnD behaviour
					pointerElemChangedInterval = setInterval(function() {
						if (!dragEl) return;
						// could also check if scroll direction on newElem changes due to parent autoscrolling
						var newElem = _getParentAutoScrollElement(document.elementFromPoint(x, y), true);
						if (newElem !== ogElemScroller) {
							ogElemScroller = newElem;
							_clearAutoScrolls();
							_autoScroll(evt, _this.options, ogElemScroller, fallback);
						}
					}, 10);
					lastPointerElemX = x;
					lastPointerElemY = y;
				}

			} else {
				// if DnD is enabled (and browser has good autoscrolling), first autoscroll will already scroll, so get parent autoscroll of first autoscroll
				if (!_this.options.bubbleScroll || _getParentAutoScrollElement(elem, true) === _getWindowScrollingElement()) {
					_clearAutoScrolls();
					return;
				}
				_autoScroll(evt, _this.options, _getParentAutoScrollElement(elem, false), false);
			}
		},

		_prepareDragStart: function (/** Event */evt, /** Touch */touch, /** HTMLElement */target, /** Number */startIndex) {
			var _this = this,
				el = _this.el,
				options = _this.options,
				ownerDocument = el.ownerDocument,
				dragStartFn;

			if (target && !dragEl && (target.parentNode === el)) {
				rootEl = el;
				dragEl = target;
				parentEl = dragEl.parentNode;
				nextEl = dragEl.nextSibling;
				lastDownEl = target;
				activeGroup = options.group;
				oldIndex = startIndex;

				tapEvt = {
					target: dragEl,
					clientX: (touch || evt).clientX,
					clientY: (touch || evt).clientY
				};

				this._lastX = (touch || evt).clientX;
				this._lastY = (touch || evt).clientY;

				dragEl.style['will-change'] = 'all';
				// undo animation if needed
				dragEl.style.transition = '';
				dragEl.style.transform = '';

				dragStartFn = function () {
					// Delayed drag has been triggered
					// we can re-enable the events: touchmove/mousemove
					_this._disableDelayedDragEvents();

					if (!FireFox && _this.nativeDraggable) {
						dragEl.draggable = true;
					}

					// Bind the events: dragstart/dragend
					_this._triggerDragStart(evt, touch);

					// Drag start event
					_dispatchEvent(_this, rootEl, 'choose', dragEl, rootEl, rootEl, oldIndex);

					// Chosen item
					_toggleClass(dragEl, options.chosenClass, true);
				};

				// Disable "draggable"
				options.ignore.split(',').forEach(function (criteria) {
					_find(dragEl, criteria.trim(), _disableDraggable);
				});

				if (options.supportPointer) {
					_on(ownerDocument, 'pointerup', _this._onDrop);
				} else {
					_on(ownerDocument, 'mouseup', _this._onDrop);
					_on(ownerDocument, 'touchend', _this._onDrop);
					_on(ownerDocument, 'touchcancel', _this._onDrop);
				}

				// Make dragEl draggable (must be before delay for FireFox)
				if (FireFox && this.nativeDraggable) {
					this.options.touchStartThreshold = 4;
					dragEl.draggable = true;
				}

				// Delay is impossible for native DnD in Edge or IE
				if (options.delay && (!this.nativeDraggable || !(Edge || IE11OrLess))) {
					// If the user moves the pointer or let go the click or touch
					// before the delay has been reached:
					// disable the delayed drag
					_on(ownerDocument, 'mouseup', _this._disableDelayedDrag);
					_on(ownerDocument, 'touchend', _this._disableDelayedDrag);
					_on(ownerDocument, 'touchcancel', _this._disableDelayedDrag);
					_on(ownerDocument, 'mousemove', _this._delayedDragTouchMoveHandler);
					_on(ownerDocument, 'touchmove', _this._delayedDragTouchMoveHandler);
					options.supportPointer && _on(ownerDocument, 'pointermove', _this._delayedDragTouchMoveHandler);

					_this._dragStartTimer = setTimeout(dragStartFn, options.delay);
				} else {
					dragStartFn();
				}
			}
		},

		_delayedDragTouchMoveHandler: function (/** TouchEvent|PointerEvent **/e) {
			var touch = e.touches ? e.touches[0] : e;
			if (max(abs(touch.clientX - this._lastX), abs(touch.clientY - this._lastY))
					>= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1))
			) {
				this._disableDelayedDrag();
			}
		},

		_disableDelayedDrag: function () {
			dragEl && _disableDraggable(dragEl);
			clearTimeout(this._dragStartTimer);

			this._disableDelayedDragEvents();
		},

		_disableDelayedDragEvents: function () {
			var ownerDocument = this.el.ownerDocument;
			_off(ownerDocument, 'mouseup', this._disableDelayedDrag);
			_off(ownerDocument, 'touchend', this._disableDelayedDrag);
			_off(ownerDocument, 'touchcancel', this._disableDelayedDrag);
			_off(ownerDocument, 'mousemove', this._delayedDragTouchMoveHandler);
			_off(ownerDocument, 'touchmove', this._delayedDragTouchMoveHandler);
			_off(ownerDocument, 'pointermove', this._delayedDragTouchMoveHandler);
		},

		_triggerDragStart: function (/** Event */evt, /** Touch */touch) {
			touch = touch || (evt.pointerType == 'touch' ? evt : null);

			if (!this.nativeDraggable || touch) {
				if (this.options.supportPointer) {
					_on(document, 'pointermove', this._onTouchMove);
				} else if (touch) {
					_on(document, 'touchmove', this._onTouchMove);
				} else {
					_on(document, 'mousemove', this._onTouchMove);
				}
			} else {
				_on(dragEl, 'dragend', this);
				_on(rootEl, 'dragstart', this._onDragStart);
			}

			try {
				if (document.selection) {
					// Timeout neccessary for IE9
					_nextTick(function () {
						document.selection.empty();
					});
				} else {
					window.getSelection().removeAllRanges();
				}
			} catch (err) {
			}
		},

		_dragStarted: function (fallback, evt) {
			awaitingDragStarted = false;
			if (rootEl && dragEl) {
				if (this.nativeDraggable) {
					_on(document, 'dragover', this._handleAutoScroll);
					_on(document, 'dragover', _checkAlignment);
				}
				var options = this.options;

				// Apply effect
				!fallback && _toggleClass(dragEl, options.dragClass, false);
				_toggleClass(dragEl, options.ghostClass, true);

				// In case dragging an animated element
				_css(dragEl, 'transform', '');

				Sortable.active = this;

				fallback && this._appendGhost();

				// Drag start event
				_dispatchEvent(this, rootEl, 'start', dragEl, rootEl, rootEl, oldIndex, undefined, evt);
			} else {
				this._nulling();
			}
		},

		_emulateDragOver: function (forAutoScroll) {
			if (touchEvt) {
				if (this._lastX === touchEvt.clientX && this._lastY === touchEvt.clientY && !forAutoScroll) {
					return;
				}
				this._lastX = touchEvt.clientX;
				this._lastY = touchEvt.clientY;

				_hideGhostForTarget();

				var target = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
				var parent = target;

				while (target && target.shadowRoot) {
					target = target.shadowRoot.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
					parent = target;
				}

				if (parent) {
					do {
						if (parent[expando]) {
							var inserted;

							inserted = parent[expando]._onDragOver({
								clientX: touchEvt.clientX,
								clientY: touchEvt.clientY,
								target: target,
								rootEl: parent
							});

							if (inserted && !this.options.dragoverBubble) {
								break;
							}
						}

						target = parent; // store last element
					}
					/* jshint boss:true */
					while (parent = parent.parentNode);
				}
				dragEl.parentNode[expando]._computeIsAligned(touchEvt);

				_unhideGhostForTarget();
			}
		},


		_onTouchMove: function (/**TouchEvent*/evt, forAutoScroll) {
			if (tapEvt) {
				var	options = this.options,
					fallbackTolerance = options.fallbackTolerance,
					fallbackOffset = options.fallbackOffset,
					touch = evt.touches ? evt.touches[0] : evt,
					matrix = ghostEl && _matrix(ghostEl),
					scaleX = ghostEl && matrix && matrix.a,
					scaleY = ghostEl && matrix && matrix.d,
					relativeScrollOffset = PositionGhostAbsolutely && ghostRelativeParent && _getRelativeScrollOffset(ghostRelativeParent),
					dx = ((touch.clientX - tapEvt.clientX)
							+ fallbackOffset.x) / (scaleX || 1)
							+ (relativeScrollOffset ? (relativeScrollOffset[0] - ghostRelativeParentInitialScroll[0]) : 0) / (scaleX || 1),
					dy = ((touch.clientY - tapEvt.clientY)
							+ fallbackOffset.y) / (scaleY || 1)
							+ (relativeScrollOffset ? (relativeScrollOffset[1] - ghostRelativeParentInitialScroll[1]) : 0) / (scaleY || 1),
					translate3d = evt.touches ? 'translate3d(' + dx + 'px,' + dy + 'px,0)' : 'translate(' + dx + 'px,' + dy + 'px)';

				// only set the status to dragging, when we are actually dragging
				if (!Sortable.active && !awaitingDragStarted) {
					if (fallbackTolerance &&
						min(abs(touch.clientX - this._lastX), abs(touch.clientY - this._lastY)) < fallbackTolerance
					) {
						return;
					}
					this._onDragStart(evt, true);
				}

				!forAutoScroll && this._handleAutoScroll(touch, true);

				moved = true;
				touchEvt = touch;

				_css(ghostEl, 'webkitTransform', translate3d);
				_css(ghostEl, 'mozTransform', translate3d);
				_css(ghostEl, 'msTransform', translate3d);
				_css(ghostEl, 'transform', translate3d);

				evt.cancelable && evt.preventDefault();
			}
		},

		_appendGhost: function () {
			// Bug if using scale(): https://stackoverflow.com/questions/2637058
			// Not being adjusted for
			if (!ghostEl) {
				var container = this.options.fallbackOnBody ? document.body : rootEl,
					rect = _getRect(dragEl, true, container, !PositionGhostAbsolutely),
					css = _css(dragEl),
					options = this.options;

				// Position absolutely
				if (PositionGhostAbsolutely) {
					// Get relatively positioned parent
					ghostRelativeParent = container;

					while (
						_css(ghostRelativeParent, 'position') === 'static' &&
						_css(ghostRelativeParent, 'transform') === 'none' &&
						ghostRelativeParent !== document
					) {
						ghostRelativeParent = ghostRelativeParent.parentNode;
					}

					if (ghostRelativeParent !== document) {
						var ghostRelativeParentRect = _getRect(ghostRelativeParent, true);

						rect.top -= ghostRelativeParentRect.top;
						rect.left -= ghostRelativeParentRect.left;
					}

					if (ghostRelativeParent !== document.body && ghostRelativeParent !== document.documentElement) {
						if (ghostRelativeParent === document) ghostRelativeParent = _getWindowScrollingElement();

						rect.top += ghostRelativeParent.scrollTop;
						rect.left += ghostRelativeParent.scrollLeft;
					} else {
						ghostRelativeParent = _getWindowScrollingElement();
					}
					ghostRelativeParentInitialScroll = _getRelativeScrollOffset(ghostRelativeParent);
				}


				ghostEl = dragEl.cloneNode(true);

				_toggleClass(ghostEl, options.ghostClass, false);
				_toggleClass(ghostEl, options.fallbackClass, true);
				_toggleClass(ghostEl, options.dragClass, true);

				_css(ghostEl, 'box-sizing', 'border-box');
				_css(ghostEl, 'margin', 0);
				_css(ghostEl, 'top', rect.top);
				_css(ghostEl, 'left', rect.left);
				_css(ghostEl, 'width', rect.width);
				_css(ghostEl, 'height', rect.height);
				_css(ghostEl, 'opacity', '0.8');
				_css(ghostEl, 'position', (PositionGhostAbsolutely ? 'absolute' : 'fixed'));
				_css(ghostEl, 'zIndex', '100000');
				_css(ghostEl, 'pointerEvents', 'none');

				container.appendChild(ghostEl);
			}
		},

		_onDragStart: function (/**Event*/evt, /**boolean*/fallback) {
			var _this = this;
			var dataTransfer = evt.dataTransfer;
			var options = _this.options;

			// Setup clone
			cloneEl = _clone(dragEl);

			cloneEl.draggable = false;
			cloneEl.style['will-change'] = '';

			this._hideClone();

			_toggleClass(cloneEl, _this.options.chosenClass, false);


			// #1143: IFrame support workaround
			_this._cloneId = _nextTick(function () {
				if (!_this.options.removeCloneOnHide) {
					rootEl.insertBefore(cloneEl, dragEl);
				}
				_dispatchEvent(_this, rootEl, 'clone', dragEl);
			});


			!fallback && _toggleClass(dragEl, options.dragClass, true);

			// Set proper drop events
			if (fallback) {
				ignoreNextClick = true;
				_this._loopId = setInterval(_this._emulateDragOver, 50);
			} else {
				// Undo what was set in _prepareDragStart before drag started
				_off(document, 'mouseup', _this._onDrop);
				_off(document, 'touchend', _this._onDrop);
				_off(document, 'touchcancel', _this._onDrop);

				if (dataTransfer) {
					dataTransfer.effectAllowed = 'move';
					options.setData && options.setData.call(_this, dataTransfer, dragEl);
				}

				_on(document, 'drop', _this);

				// #1276 fix:
				_css(dragEl, 'transform', 'translateZ(0)');
			}

			awaitingDragStarted = true;

			_this._dragStartId = _nextTick(_this._dragStarted.bind(_this, fallback, evt));
			_on(document, 'selectstart', _this);
			if (Safari) {
				_css(document.body, 'user-select', 'none');
			}
		},


		// Returns true - if no further action is needed (either inserted or another condition)
		_onDragOver: function (/**Event*/evt) {
			var el = this.el,
				target = evt.target,
				dragRect,
				targetRect,
				revert,
				options = this.options,
				group = options.group,
				activeSortable = Sortable.active,
				isOwner = (activeGroup === group),
				canSort = options.sort,
				_this = this;

			if (_silent) return;

			// IE event order fix
			if (IE11OrLess && !evt.rootEl && !evt.artificialBubble && !_isTrueParentSortable(el, target)) {
				return;
			}

			// Return invocation when dragEl is inserted (or completed)
			function completed(insertion) {
				if (insertion) {
					if (isOwner) {
						activeSortable._hideClone();
					} else {
						activeSortable._showClone(_this);
					}

					if (activeSortable) {
						// Set ghost class to new sortable's ghost class
						_toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : activeSortable.options.ghostClass, false);
						_toggleClass(dragEl, options.ghostClass, true);
					}

					if (putSortable !== _this && _this !== Sortable.active) {
						putSortable = _this;
					} else if (_this === Sortable.active) {
						putSortable = null;
					}

					// Animation
					dragRect && _this._animate(dragRect, dragEl);
					target && targetRect && _this._animate(targetRect, target);
				}


				// Null lastTarget if it is not inside a previously swapped element
				if ((target === dragEl && !dragEl.animated) || (target === el && !target.animated)) {
					lastTarget = null;
				}
				// no bubbling and not fallback
				if (!options.dragoverBubble && !evt.rootEl && target !== document) {
					_this._handleAutoScroll(evt);
					dragEl.parentNode[expando]._computeIsAligned(evt);
				}

				!options.dragoverBubble && evt.stopPropagation && evt.stopPropagation();

				return true;
			}

			// Call when dragEl has been inserted
			function changed() {
				_dispatchEvent(_this, rootEl, 'change', target, el, rootEl, oldIndex, _index(dragEl, options.draggable), evt);
			}


			if (evt.preventDefault !== void 0) {
				evt.cancelable && evt.preventDefault();
			}


			moved = true;

			target = _closest(target, options.draggable, el, true);

			// target is dragEl or target is animated
			if (!!_closest(evt.target, null, dragEl, true) || target.animated) {
				return completed(false);
			}

			if (target !== dragEl) {
				ignoreNextClick = false;
			}

			if (activeSortable && !options.disabled &&
				(isOwner
					? canSort || (revert = !rootEl.contains(dragEl)) // Reverting item into the original list
					: (
						putSortable === this ||
						(
							(this.lastPutMode = activeGroup.checkPull(this, activeSortable, dragEl, evt)) &&
							group.checkPut(this, activeSortable, dragEl, evt)
						)
					)
				)
			) {
				var axis = this._getDirection(evt, target);

				dragRect = _getRect(dragEl);

				if (revert) {
					this._hideClone();
					parentEl = rootEl; // actualization

					if (nextEl) {
						rootEl.insertBefore(dragEl, nextEl);
					} else {
						rootEl.appendChild(dragEl);
					}

					return completed(true);
				}

				var elLastChild = _lastChild(el);

				if (!elLastChild || _ghostIsLast(evt, axis, el) && !elLastChild.animated) {
					// assign target only if condition is true
					if (elLastChild && el === evt.target) {
						target = elLastChild;
					}

					if (target) {
						targetRect = _getRect(target);
					}

					if (isOwner) {
						activeSortable._hideClone();
					} else {
						activeSortable._showClone(this);
					}

					if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, !!target) !== false) {
						el.appendChild(dragEl);
						parentEl = el; // actualization
						realDragElRect = null;

						changed();
						return completed(true);
					}
				}
				else if (target && target !== dragEl && target.parentNode === el) {
					var direction = 0,
						targetBeforeFirstSwap,
						aligned = target.sortableMouseAligned,
						differentLevel = dragEl.parentNode !== el,
						side1 = axis === 'vertical' ? 'top' : 'left',
						scrolledPastTop = _isScrolledPast(target, 'top') || _isScrolledPast(dragEl, 'top'),
						scrollBefore = scrolledPastTop ? scrolledPastTop.scrollTop : void 0;


					if (lastTarget !== target) {
						lastMode = null;
						targetBeforeFirstSwap = _getRect(target)[side1];
						pastFirstInvertThresh = false;
					}

					// Reference: https://www.lucidchart.com/documents/view/10fa0e93-e362-4126-aca2-b709ee56bd8b/0
					if (
						_isElInRowColumn(dragEl, target, axis) && aligned ||
						differentLevel ||
						scrolledPastTop ||
						options.invertSwap ||
						lastMode === 'insert' ||
						// Needed, in the case that we are inside target and inserted because not aligned... aligned will stay false while inside
						// and lastMode will change to 'insert', but we must swap
						lastMode === 'swap'
					) {
						// New target that we will be inside
						if (lastMode !== 'swap') {
							isCircumstantialInvert = options.invertSwap || differentLevel;
						}

						direction = _getSwapDirection(evt, target, axis,
							options.swapThreshold, options.invertedSwapThreshold == null ? options.swapThreshold : options.invertedSwapThreshold,
							isCircumstantialInvert,
							lastTarget === target);
						lastMode = 'swap';
					} else {
						// Insert at position
						direction = _getInsertDirection(target);
						lastMode = 'insert';
					}
					if (direction === 0) return completed(false);

					realDragElRect = null;
					lastTarget = target;

					lastDirection = direction;

					targetRect = _getRect(target);

					var nextSibling = target.nextElementSibling,
						after = false;

					after = direction === 1;

					var moveVector = _onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, after);

					if (moveVector !== false) {
						if (moveVector === 1 || moveVector === -1) {
							after = (moveVector === 1);
						}

						_silent = true;
						setTimeout(_unsilent, 30);

						if (isOwner) {
							activeSortable._hideClone();
						} else {
							activeSortable._showClone(this);
						}

						if (after && !nextSibling) {
							el.appendChild(dragEl);
						} else {
							target.parentNode.insertBefore(dragEl, after ? nextSibling : target);
						}

						// Undo chrome's scroll adjustment
						if (scrolledPastTop) {
							_scrollBy(scrolledPastTop, 0, scrollBefore - scrolledPastTop.scrollTop);
						}

						parentEl = dragEl.parentNode; // actualization

						// must be done before animation
						if (targetBeforeFirstSwap !== undefined && !isCircumstantialInvert) {
							targetMoveDistance = abs(targetBeforeFirstSwap - _getRect(target)[side1]);
						}
						changed();

						return completed(true);
					}
				}

				if (el.contains(dragEl)) {
					return completed(false);
				}
			}

			if (IE11OrLess && !evt.rootEl) {
				_artificalBubble(el, evt, '_onDragOver');
			}

			return false;
		},

		_animate: function (prevRect, target) {
			var ms = this.options.animation;

			if (ms) {
				var currentRect = _getRect(target);

				if (target === dragEl) {
					realDragElRect = currentRect;
				}

				if (prevRect.nodeType === 1) {
					prevRect = _getRect(prevRect);
				}

				// Check if actually moving position
				if ((prevRect.left + prevRect.width / 2) !== (currentRect.left + currentRect.width / 2)
					|| (prevRect.top + prevRect.height / 2) !== (currentRect.top + currentRect.height / 2)
				) {
					var matrix = _matrix(this.el),
						scaleX = matrix && matrix.a,
						scaleY = matrix && matrix.d;

					_css(target, 'transition', 'none');
					_css(target, 'transform', 'translate3d('
						+ (prevRect.left - currentRect.left) / (scaleX ? scaleX : 1) + 'px,'
						+ (prevRect.top - currentRect.top) / (scaleY ? scaleY : 1) + 'px,0)'
					);

					forRepaintDummy = target.offsetWidth; // repaint
					_css(target, 'transition', 'transform ' + ms + 'ms' + (this.options.easing ? ' ' + this.options.easing : ''));
					_css(target, 'transform', 'translate3d(0,0,0)');
				}

				(typeof target.animated === 'number') && clearTimeout(target.animated);
				target.animated = setTimeout(function () {
					_css(target, 'transition', '');
					_css(target, 'transform', '');
					target.animated = false;
				}, ms);
			}
		},

		_offUpEvents: function () {
			var ownerDocument = this.el.ownerDocument;

			_off(document, 'touchmove', this._onTouchMove);
			_off(document, 'pointermove', this._onTouchMove);
			_off(ownerDocument, 'mouseup', this._onDrop);
			_off(ownerDocument, 'touchend', this._onDrop);
			_off(ownerDocument, 'pointerup', this._onDrop);
			_off(ownerDocument, 'touchcancel', this._onDrop);
			_off(document, 'selectstart', this);
		},

		_onDrop: function (/**Event*/evt) {
			var el = this.el,
				options = this.options;
			awaitingDragStarted = false;
			scrolling = false;
			isCircumstantialInvert = false;
			pastFirstInvertThresh = false;

			clearInterval(this._loopId);

			clearInterval(pointerElemChangedInterval);
			_clearAutoScrolls();
			_cancelThrottle();

			clearTimeout(this._dragStartTimer);

			_cancelNextTick(this._cloneId);
			_cancelNextTick(this._dragStartId);

			// Unbind events
			_off(document, 'mousemove', this._onTouchMove);


			if (this.nativeDraggable) {
				_off(document, 'drop', this);
				_off(el, 'dragstart', this._onDragStart);
				_off(document, 'dragover', this._handleAutoScroll);
				_off(document, 'dragover', _checkAlignment);
			}

			if (Safari) {
				_css(document.body, 'user-select', '');
			}

			this._offUpEvents();

			if (evt) {
				if (moved) {
					evt.cancelable && evt.preventDefault();
					!options.dropBubble && evt.stopPropagation();
				}

				ghostEl && ghostEl.parentNode && ghostEl.parentNode.removeChild(ghostEl);

				if (rootEl === parentEl || (putSortable && putSortable.lastPutMode !== 'clone')) {
					// Remove clone
					cloneEl && cloneEl.parentNode && cloneEl.parentNode.removeChild(cloneEl);
				}

				if (dragEl) {
					if (this.nativeDraggable) {
						_off(dragEl, 'dragend', this);
					}

					_disableDraggable(dragEl);
					dragEl.style['will-change'] = '';

					// Remove class's
					_toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : this.options.ghostClass, false);
					_toggleClass(dragEl, this.options.chosenClass, false);

					// Drag stop event
					_dispatchEvent(this, rootEl, 'unchoose', dragEl, parentEl, rootEl, oldIndex, null, evt);

					if (rootEl !== parentEl) {
						newIndex = _index(dragEl, options.draggable);

						if (newIndex >= 0) {
							// Add event
							_dispatchEvent(null, parentEl, 'add', dragEl, parentEl, rootEl, oldIndex, newIndex, evt);

							// Remove event
							_dispatchEvent(this, rootEl, 'remove', dragEl, parentEl, rootEl, oldIndex, newIndex, evt);

							// drag from one list and drop into another
							_dispatchEvent(null, parentEl, 'sort', dragEl, parentEl, rootEl, oldIndex, newIndex, evt);
							_dispatchEvent(this, rootEl, 'sort', dragEl, parentEl, rootEl, oldIndex, newIndex, evt);
						}

						putSortable && putSortable.save();
					}
					else {
						if (dragEl.nextSibling !== nextEl) {
							// Get the index of the dragged element within its parent
							newIndex = _index(dragEl, options.draggable);

							if (newIndex >= 0) {
								// drag & drop within the same list
								_dispatchEvent(this, rootEl, 'update', dragEl, parentEl, rootEl, oldIndex, newIndex, evt);
								_dispatchEvent(this, rootEl, 'sort', dragEl, parentEl, rootEl, oldIndex, newIndex, evt);
							}
						}
					}

					if (Sortable.active) {
						/* jshint eqnull:true */
						if (newIndex == null || newIndex === -1) {
							newIndex = oldIndex;
						}
						_dispatchEvent(this, rootEl, 'end', dragEl, parentEl, rootEl, oldIndex, newIndex, evt);

						// Save sorting
						this.save();
					}
				}

			}
			this._nulling();
		},

		_nulling: function() {
			rootEl =
			dragEl =
			parentEl =
			ghostEl =
			nextEl =
			cloneEl =
			lastDownEl =

			scrollEl =
			scrollParentEl =
			autoScrolls.length =

			pointerElemChangedInterval =
			lastPointerElemX =
			lastPointerElemY =

			tapEvt =
			touchEvt =

			moved =
			newIndex =
			oldIndex =

			lastTarget =
			lastDirection =

			forRepaintDummy =
			realDragElRect =

			putSortable =
			activeGroup =
			Sortable.active = null;

			savedInputChecked.forEach(function (el) {
				el.checked = true;
			});

			savedInputChecked.length = 0;
		},

		handleEvent: function (/**Event*/evt) {
			switch (evt.type) {
				case 'drop':
				case 'dragend':
					this._onDrop(evt);
					break;

				case 'dragenter':
				case 'dragover':
					if (dragEl) {
						this._onDragOver(evt);
						_globalDragOver(evt);
					}
					break;

				case 'selectstart':
					evt.preventDefault();
					break;
			}
		},


		/**
		 * Serializes the item into an array of string.
		 * @returns {String[]}
		 */
		toArray: function () {
			var order = [],
				el,
				children = this.el.children,
				i = 0,
				n = children.length,
				options = this.options;

			for (; i < n; i++) {
				el = children[i];
				if (_closest(el, options.draggable, this.el, false)) {
					order.push(el.getAttribute(options.dataIdAttr) || _generateId(el));
				}
			}

			return order;
		},


		/**
		 * Sorts the elements according to the array.
		 * @param  {String[]}  order  order of the items
		 */
		sort: function (order) {
			var items = {}, rootEl = this.el;

			this.toArray().forEach(function (id, i) {
				var el = rootEl.children[i];

				if (_closest(el, this.options.draggable, rootEl, false)) {
					items[id] = el;
				}
			}, this);

			order.forEach(function (id) {
				if (items[id]) {
					rootEl.removeChild(items[id]);
					rootEl.appendChild(items[id]);
				}
			});
		},


		/**
		 * Save the current sorting
		 */
		save: function () {
			var store = this.options.store;
			store && store.set && store.set(this);
		},


		/**
		 * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
		 * @param   {HTMLElement}  el
		 * @param   {String}       [selector]  default: `options.draggable`
		 * @returns {HTMLElement|null}
		 */
		closest: function (el, selector) {
			return _closest(el, selector || this.options.draggable, this.el, false);
		},


		/**
		 * Set/get option
		 * @param   {string} name
		 * @param   {*}      [value]
		 * @returns {*}
		 */
		option: function (name, value) {
			var options = this.options;

			if (value === void 0) {
				return options[name];
			} else {
				options[name] = value;

				if (name === 'group') {
					_prepareGroup(options);
				}
			}
		},


		/**
		 * Destroy
		 */
		destroy: function () {
			var el = this.el;

			el[expando] = null;

			_off(el, 'mousedown', this._onTapStart);
			_off(el, 'touchstart', this._onTapStart);
			_off(el, 'pointerdown', this._onTapStart);

			if (this.nativeDraggable) {
				_off(el, 'dragover', this);
				_off(el, 'dragenter', this);
			}
			// Remove draggable attributes
			Array.prototype.forEach.call(el.querySelectorAll('[draggable]'), function (el) {
				el.removeAttribute('draggable');
			});

			this._onDrop();

			sortables.splice(sortables.indexOf(this.el), 1);

			this.el = el = null;
		},

		_hideClone: function() {
			if (!cloneEl.cloneHidden) {
				_css(cloneEl, 'display', 'none');
				cloneEl.cloneHidden = true;
				if (cloneEl.parentNode && this.options.removeCloneOnHide) {
					cloneEl.parentNode.removeChild(cloneEl);
				}
			}
		},

		_showClone: function(putSortable) {
			if (putSortable.lastPutMode !== 'clone') {
				this._hideClone();
				return;
			}

			if (cloneEl.cloneHidden) {
				// show clone at dragEl or original position
				if (rootEl.contains(dragEl) && !this.options.group.revertClone) {
					rootEl.insertBefore(cloneEl, dragEl);
				} else if (nextEl) {
					rootEl.insertBefore(cloneEl, nextEl);
				} else {
					rootEl.appendChild(cloneEl);
				}

				if (this.options.group.revertClone) {
					this._animate(dragEl, cloneEl);
				}
				_css(cloneEl, 'display', '');
				cloneEl.cloneHidden = false;
			}
		}
	};

	function _closest(/**HTMLElement*/el, /**String*/selector, /**HTMLElement*/ctx, includeCTX) {
		if (el) {
			ctx = ctx || document;

			do {
				if (
					selector != null &&
					(
						selector[0] === '>' && el.parentNode === ctx && _matches(el, selector.substring(1)) ||
						_matches(el, selector)
					) ||
					includeCTX && el === ctx
				) {
					return el;
				}

				if (el === ctx) break;
				/* jshint boss:true */
			} while (el = _getParentOrHost(el));
		}

		return null;
	}


	function _getParentOrHost(el) {
		return (el.host && el !== document && el.host.nodeType)
			? el.host
			: el.parentNode;
	}


	function _globalDragOver(/**Event*/evt) {
		if (evt.dataTransfer) {
			evt.dataTransfer.dropEffect = 'move';
		}
		evt.cancelable && evt.preventDefault();
	}


	function _on(el, event, fn) {
		el.addEventListener(event, fn, captureMode);
	}


	function _off(el, event, fn) {
		el.removeEventListener(event, fn, captureMode);
	}


	function _toggleClass(el, name, state) {
		if (el && name) {
			if (el.classList) {
				el.classList[state ? 'add' : 'remove'](name);
			}
			else {
				var className = (' ' + el.className + ' ').replace(R_SPACE, ' ').replace(' ' + name + ' ', ' ');
				el.className = (className + (state ? ' ' + name : '')).replace(R_SPACE, ' ');
			}
		}
	}


	function _css(el, prop, val) {
		var style = el && el.style;

		if (style) {
			if (val === void 0) {
				if (document.defaultView && document.defaultView.getComputedStyle) {
					val = document.defaultView.getComputedStyle(el, '');
				}
				else if (el.currentStyle) {
					val = el.currentStyle;
				}

				return prop === void 0 ? val : val[prop];
			}
			else {
				if (!(prop in style) && prop.indexOf('webkit') === -1) {
					prop = '-webkit-' + prop;
				}

				style[prop] = val + (typeof val === 'string' ? '' : 'px');
			}
		}
	}

	function _matrix(el) {
		var appliedTransforms = '';
		do {
			var transform = _css(el, 'transform');

			if (transform && transform !== 'none') {
				appliedTransforms = transform + ' ' + appliedTransforms;
			}
			/* jshint boss:true */
		} while (el = el.parentNode);

		if (window.DOMMatrix) {
			return new DOMMatrix(appliedTransforms);
		} else if (window.WebKitCSSMatrix) {
			return new WebKitCSSMatrix(appliedTransforms);
		} else if (window.CSSMatrix) {
			return new CSSMatrix(appliedTransforms);
		}
	}


	function _find(ctx, tagName, iterator) {
		if (ctx) {
			var list = ctx.getElementsByTagName(tagName), i = 0, n = list.length;

			if (iterator) {
				for (; i < n; i++) {
					iterator(list[i], i);
				}
			}

			return list;
		}

		return [];
	}



	function _dispatchEvent(sortable, rootEl, name, targetEl, toEl, fromEl, startIndex, newIndex, originalEvt) {
		sortable = (sortable || rootEl[expando]);
		var evt,
			options = sortable.options,
			onName = 'on' + name.charAt(0).toUpperCase() + name.substr(1);
		// Support for new CustomEvent feature
		if (window.CustomEvent && !IE11OrLess && !Edge) {
			evt = new CustomEvent(name, {
				bubbles: true,
				cancelable: true
			});
		} else {
			evt = document.createEvent('Event');
			evt.initEvent(name, true, true);
		}

		evt.to = toEl || rootEl;
		evt.from = fromEl || rootEl;
		evt.item = targetEl || rootEl;
		evt.clone = cloneEl;

		evt.oldIndex = startIndex;
		evt.newIndex = newIndex;

		evt.originalEvent = originalEvt;
		evt.pullMode = putSortable ? putSortable.lastPutMode : undefined;

		if (rootEl) {
			rootEl.dispatchEvent(evt);
		}

		if (options[onName]) {
			options[onName].call(sortable, evt);
		}
	}


	function _onMove(fromEl, toEl, dragEl, dragRect, targetEl, targetRect, originalEvt, willInsertAfter) {
		var evt,
			sortable = fromEl[expando],
			onMoveFn = sortable.options.onMove,
			retVal;
		// Support for new CustomEvent feature
		if (window.CustomEvent && !IE11OrLess && !Edge) {
			evt = new CustomEvent('move', {
				bubbles: true,
				cancelable: true
			});
		} else {
			evt = document.createEvent('Event');
			evt.initEvent('move', true, true);
		}

		evt.to = toEl;
		evt.from = fromEl;
		evt.dragged = dragEl;
		evt.draggedRect = dragRect;
		evt.related = targetEl || toEl;
		evt.relatedRect = targetRect || _getRect(toEl);
		evt.willInsertAfter = willInsertAfter;

		evt.originalEvent = originalEvt;

		fromEl.dispatchEvent(evt);

		if (onMoveFn) {
			retVal = onMoveFn.call(sortable, evt, originalEvt);
		}

		return retVal;
	}

	function _disableDraggable(el) {
		el.draggable = false;
	}

	function _unsilent() {
		_silent = false;
	}

	/**
	 * Gets nth child of el, ignoring hidden children, sortable's elements (does not ignore clone if it's visible)
	 * and non-draggable elements
	 * @param  {HTMLElement} el       The parent element
	 * @param  {Number} childNum      The index of the child
	 * @param  {Object} options       Parent Sortable's options
	 * @return {HTMLElement}          The child at index childNum, or null if not found
	 */
	function _getChild(el, childNum, options) {
		var currentChild = 0,
			i = 0,
			children = el.children;

		while (i < children.length) {
			if (
				children[i].style.display !== 'none' &&
				children[i] !== ghostEl &&
				children[i] !== dragEl &&
				_closest(children[i], options.draggable, el, false)
			) {
				if (currentChild === childNum) {
					return children[i];
				}
				currentChild++;
			}

			i++;
		}
		return null;
	}

	/**
	 * Gets the last child in the el, ignoring ghostEl or invisible elements (clones)
	 * @param  {HTMLElement} el       Parent element
	 * @return {HTMLElement}          The last child, ignoring ghostEl
	 */
	function _lastChild(el) {
		var last = el.lastElementChild;

		while (last && (last === ghostEl || last.style.display === 'none')) {
			last = last.previousElementSibling;
		}

		return last || null;
	}

	function _ghostIsLast(evt, axis, el) {
		var elRect = _getRect(_lastChild(el)),
			mouseOnAxis = axis === 'vertical' ? evt.clientY : evt.clientX,
			mouseOnOppAxis = axis === 'vertical' ? evt.clientX : evt.clientY,
			targetS2 = axis === 'vertical' ? elRect.bottom : elRect.right,
			targetS1Opp = axis === 'vertical' ? elRect.left : elRect.top,
			targetS2Opp = axis === 'vertical' ? elRect.right : elRect.bottom,
			spacer = 10;

		return (
			axis === 'vertical' ?
				(mouseOnOppAxis > targetS2Opp + spacer || mouseOnOppAxis <= targetS2Opp && mouseOnAxis > targetS2 && mouseOnOppAxis >= targetS1Opp) :
				(mouseOnAxis > targetS2 && mouseOnOppAxis > targetS1Opp || mouseOnAxis <= targetS2 && mouseOnOppAxis > targetS2Opp + spacer)
		);
	}

	function _getSwapDirection(evt, target, axis, swapThreshold, invertedSwapThreshold, invertSwap, isLastTarget) {
		var targetRect = _getRect(target),
			mouseOnAxis = axis === 'vertical' ? evt.clientY : evt.clientX,
			targetLength = axis === 'vertical' ? targetRect.height : targetRect.width,
			targetS1 = axis === 'vertical' ? targetRect.top : targetRect.left,
			targetS2 = axis === 'vertical' ? targetRect.bottom : targetRect.right,
			dragRect = _getRect(dragEl),
			invert = false;


		if (!invertSwap) {
			// Never invert or create dragEl shadow when target movemenet causes mouse to move past the end of regular swapThreshold
			if (isLastTarget && targetMoveDistance < targetLength * swapThreshold) { // multiplied only by swapThreshold because mouse will already be inside target by (1 - threshold) * targetLength / 2
				// check if past first invert threshold on side opposite of lastDirection
				if (!pastFirstInvertThresh &&
					(lastDirection === 1 ?
						(
							mouseOnAxis > targetS1 + targetLength * invertedSwapThreshold / 2
						) :
						(
							mouseOnAxis < targetS2 - targetLength * invertedSwapThreshold / 2
						)
					)
				)
				{
					// past first invert threshold, do not restrict inverted threshold to dragEl shadow
					pastFirstInvertThresh = true;
				}

				if (!pastFirstInvertThresh) {
					var dragS1 = axis === 'vertical' ? dragRect.top : dragRect.left,
						dragS2 = axis === 'vertical' ? dragRect.bottom : dragRect.right;
					// dragEl shadow (target move distance shadow)
					if (
						lastDirection === 1 ?
						(
							mouseOnAxis < targetS1 + targetMoveDistance // over dragEl shadow
						) :
						(
							mouseOnAxis > targetS2 - targetMoveDistance
						)
					)
					{
						return lastDirection * -1;
					}
				} else {
					invert = true;
				}
			} else {
				// Regular
				if (
					mouseOnAxis > targetS1 + (targetLength * (1 - swapThreshold) / 2) &&
					mouseOnAxis < targetS2 - (targetLength * (1 - swapThreshold) / 2)
				) {
					return _getInsertDirection(target);
				}
			}
		}

		invert = invert || invertSwap;

		if (invert) {
			// Invert of regular
			if (
				mouseOnAxis < targetS1 + (targetLength * invertedSwapThreshold / 2) ||
				mouseOnAxis > targetS2 - (targetLength * invertedSwapThreshold / 2)
			)
			{
				return ((mouseOnAxis > targetS1 + targetLength / 2) ? 1 : -1);
			}
		}

		return 0;
	}

	/**
	 * Gets the direction dragEl must be swapped relative to target in order to make it
	 * seem that dragEl has been "inserted" into that element's position
	 * @param  {HTMLElement} target       The target whose position dragEl is being inserted at
	 * @return {Number}                   Direction dragEl must be swapped
	 */
	function _getInsertDirection(target) {
		var dragElIndex = _index(dragEl),
			targetIndex = _index(target);

		if (dragElIndex < targetIndex) {
			return 1;
		} else {
			return -1;
		}
	}


	/**
	 * Generate id
	 * @param   {HTMLElement} el
	 * @returns {String}
	 * @private
	 */
	function _generateId(el) {
		var str = el.tagName + el.className + el.src + el.href + el.textContent,
			i = str.length,
			sum = 0;

		while (i--) {
			sum += str.charCodeAt(i);
		}

		return sum.toString(36);
	}

	/**
	 * Returns the index of an element within its parent for a selected set of
	 * elements
	 * @param  {HTMLElement} el
	 * @param  {selector} selector
	 * @return {number}
	 */
	function _index(el, selector) {
		var index = 0;

		if (!el || !el.parentNode) {
			return -1;
		}

		while (el && (el = el.previousElementSibling)) {
			if ((el.nodeName.toUpperCase() !== 'TEMPLATE') && el !== cloneEl) {
				index++;
			}
		}

		return index;
	}

	function _matches(/**HTMLElement*/el, /**String*/selector) {
		if (el) {
			try {
				if (el.matches) {
					return el.matches(selector);
				} else if (el.msMatchesSelector) {
					return el.msMatchesSelector(selector);
				} else if (el.webkitMatchesSelector) {
					return el.webkitMatchesSelector(selector);
				}
			} catch(_) {
				return false;
			}
		}

		return false;
	}

	var _throttleTimeout;
	function _throttle(callback, ms) {
		return function () {
			if (!_throttleTimeout) {
				var args = arguments,
					_this = this;

				_throttleTimeout = setTimeout(function () {
					if (args.length === 1) {
						callback.call(_this, args[0]);
					} else {
						callback.apply(_this, args);
					}

					_throttleTimeout = void 0;
				}, ms);
			}
		};
	}

	function _cancelThrottle() {
		clearTimeout(_throttleTimeout);
		_throttleTimeout = void 0;
	}

	function _extend(dst, src) {
		if (dst && src) {
			for (var key in src) {
				if (src.hasOwnProperty(key)) {
					dst[key] = src[key];
				}
			}
		}

		return dst;
	}

	function _clone(el) {
		if (Polymer && Polymer.dom) {
			return Polymer.dom(el).cloneNode(true);
		}
		else if ($) {
			return $(el).clone(true)[0];
		}
		else {
			return el.cloneNode(true);
		}
	}

	function _saveInputCheckedState(root) {
		savedInputChecked.length = 0;

		var inputs = root.getElementsByTagName('input');
		var idx = inputs.length;

		while (idx--) {
			var el = inputs[idx];
			el.checked && savedInputChecked.push(el);
		}
	}

	function _nextTick(fn) {
		return setTimeout(fn, 0);
	}

	function _cancelNextTick(id) {
		return clearTimeout(id);
	}


	/**
	 * Returns the "bounding client rect" of given element
	 * @param  {HTMLElement} el                The element whose boundingClientRect is wanted
	 * @param  {[HTMLElement]} container       the parent the element will be placed in
	 * @param  {[Boolean]} adjustForTransform  Whether the rect should compensate for parent's transform
	 * @return {Object}                        The boundingClientRect of el
	 */
	function _getRect(el, adjustForTransform, container, adjustForFixed) {
		if (!el.getBoundingClientRect && el !== win) return;

		var elRect,
			top,
			left,
			bottom,
			right,
			height,
			width;

		if (el !== win && el !== _getWindowScrollingElement()) {
			elRect = el.getBoundingClientRect();
			top = elRect.top;
			left = elRect.left;
			bottom = elRect.bottom;
			right = elRect.right;
			height = elRect.height;
			width = elRect.width;
		} else {
			top = 0;
			left = 0;
			bottom = window.innerHeight;
			right = window.innerWidth;
			height = window.innerHeight;
			width = window.innerWidth;
		}

		if (adjustForFixed && el !== win) {
			// Adjust for translate()
			container = container || el.parentNode;

			// solves #1123 (see: https://stackoverflow.com/a/37953806/6088312)
			// Not needed on <= IE11
			if (!IE11OrLess) {
				do {
					if (container && container.getBoundingClientRect && _css(container, 'transform') !== 'none') {
						var containerRect = container.getBoundingClientRect();

						// Set relative to edges of padding box of container
						top -= containerRect.top + parseInt(_css(container, 'border-top-width'));
						left -= containerRect.left + parseInt(_css(container, 'border-left-width'));
						bottom = top + elRect.height;
						right = left + elRect.width;

						break;
					}
					/* jshint boss:true */
				} while (container = container.parentNode);
			}
		}

		if (adjustForTransform && el !== win) {
			// Adjust for scale()
			var matrix = _matrix(container || el),
				scaleX = matrix && matrix.a,
				scaleY = matrix && matrix.d;

			if (matrix) {
				top /= scaleY;
				left /= scaleX;

				width /= scaleX;
				height /= scaleY;

				bottom = top + height;
				right = left + width;
			}
		}

		return {
			top: top,
			left: left,
			bottom: bottom,
			right: right,
			width: width,
			height: height
		};
	}


	/**
	 * Checks if a side of an element is scrolled past a side of it's parents
	 * @param  {HTMLElement}  el       The element who's side being scrolled out of view is in question
	 * @param  {String}       side     Side of the element in question ('top', 'left', 'right', 'bottom')
	 * @return {HTMLElement}           The parent scroll element that the el's side is scrolled past, or null if there is no such element
	 */
	function _isScrolledPast(el, side) {
		var parent = _getParentAutoScrollElement(el, true),
			elSide = _getRect(el)[side];

		/* jshint boss:true */
		while (parent) {
			var parentSide = _getRect(parent)[side],
				visible;

			if (side === 'top' || side === 'left') {
				visible = elSide >= parentSide;
			} else {
				visible = elSide <= parentSide;
			}

			if (!visible) return parent;

			if (parent === _getWindowScrollingElement()) break;

			parent = _getParentAutoScrollElement(parent, false);
		}

		return false;
	}

	/**
	 * Returns the scroll offset of the given element, added with all the scroll offsets of parent elements.
	 * The value is returned in real pixels.
	 * @param  {HTMLElement} el
	 * @return {Array}             Offsets in the format of [left, top]
	 */
	function _getRelativeScrollOffset(el) {
		var offsetLeft = 0,
			offsetTop = 0,
			winScroller = _getWindowScrollingElement();

		if (el) {
			do {
				var matrix = _matrix(el),
					scaleX = matrix.a,
					scaleY = matrix.d;

				offsetLeft += el.scrollLeft * scaleX;
				offsetTop += el.scrollTop * scaleY;
			} while (el !== winScroller && (el = el.parentNode));
		}

		return [offsetLeft, offsetTop];
	}

	// Fixed #973:
	_on(document, 'touchmove', function(evt) {
		if ((Sortable.active || awaitingDragStarted) && evt.cancelable) {
			evt.preventDefault();
		}
	});


	// Export utils
	Sortable.utils = {
		on: _on,
		off: _off,
		css: _css,
		find: _find,
		is: function (el, selector) {
			return !!_closest(el, selector, el, false);
		},
		extend: _extend,
		throttle: _throttle,
		closest: _closest,
		toggleClass: _toggleClass,
		clone: _clone,
		index: _index,
		nextTick: _nextTick,
		cancelNextTick: _cancelNextTick,
		detectDirection: _detectDirection,
		getChild: _getChild
	};


	/**
	 * Create sortable instance
	 * @param {HTMLElement}  el
	 * @param {Object}      [options]
	 */
	Sortable.create = function (el, options) {
		return new Sortable(el, options);
	};


	// Export
	Sortable.version = '1.8.4';
	return Sortable;
});


/***/ }),
/* 44 */,
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(46)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(27)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(19);
var defined = __webpack_require__(16);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(32);
var descriptor = __webpack_require__(13);
var setToStringTag = __webpack_require__(25);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(5)(IteratorPrototype, __webpack_require__(0)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(2);
var anObject = __webpack_require__(6);
var getKeys = __webpack_require__(18);

module.exports = __webpack_require__(3) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(21);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(11);
var toLength = __webpack_require__(34);
var toAbsoluteIndex = __webpack_require__(51);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(19);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(1).document;
module.exports = document && document.documentElement;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(8);
var toObject = __webpack_require__(35);
var IE_PROTO = __webpack_require__(22)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(30);
var $export = __webpack_require__(4);
var toObject = __webpack_require__(35);
var call = __webpack_require__(55);
var isArrayIter = __webpack_require__(56);
var toLength = __webpack_require__(34);
var createProperty = __webpack_require__(57);
var getIterFn = __webpack_require__(58);

$export($export.S + $export.F * !__webpack_require__(59)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(6);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(15);
var ITERATOR = __webpack_require__(0)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(2);
var createDesc = __webpack_require__(13);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(36);
var ITERATOR = __webpack_require__(0)('iterator');
var Iterators = __webpack_require__(15);
module.exports = __webpack_require__(12).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(0)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(61);
var anObject = __webpack_require__(6);
var $flags = __webpack_require__(37);
var DESCRIPTORS = __webpack_require__(3);
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  __webpack_require__(7)(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (__webpack_require__(10)(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__(3) && /./g.flags != 'g') __webpack_require__(2).f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__(37)
});


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var DateProto = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var $toString = DateProto[TO_STRING];
var getTime = DateProto.getTime;
if (new Date(NaN) + '' != INVALID_DATE) {
  __webpack_require__(7)(DateProto, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(36);
var test = {};
test[__webpack_require__(0)('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  __webpack_require__(7)(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(38)('asyncIterator');


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(1);
var has = __webpack_require__(8);
var DESCRIPTORS = __webpack_require__(3);
var $export = __webpack_require__(4);
var redefine = __webpack_require__(7);
var META = __webpack_require__(66).KEY;
var $fails = __webpack_require__(10);
var shared = __webpack_require__(23);
var setToStringTag = __webpack_require__(25);
var uid = __webpack_require__(14);
var wks = __webpack_require__(0);
var wksExt = __webpack_require__(39);
var wksDefine = __webpack_require__(38);
var enumKeys = __webpack_require__(67);
var isArray = __webpack_require__(41);
var anObject = __webpack_require__(6);
var isObject = __webpack_require__(9);
var toIObject = __webpack_require__(11);
var toPrimitive = __webpack_require__(20);
var createDesc = __webpack_require__(13);
var _create = __webpack_require__(32);
var gOPNExt = __webpack_require__(68);
var $GOPD = __webpack_require__(69);
var $DP = __webpack_require__(2);
var $keys = __webpack_require__(18);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(42).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(26).f = $propertyIsEnumerable;
  __webpack_require__(40).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(17)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(5)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(14)('meta');
var isObject = __webpack_require__(9);
var has = __webpack_require__(8);
var setDesc = __webpack_require__(2).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(10)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(18);
var gOPS = __webpack_require__(40);
var pIE = __webpack_require__(26);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(11);
var gOPN = __webpack_require__(42).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(26);
var createDesc = __webpack_require__(13);
var toIObject = __webpack_require__(11);
var toPrimitive = __webpack_require__(20);
var has = __webpack_require__(8);
var IE8_DOM_DEFINE = __webpack_require__(28);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(3) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__(71);
var getKeys = __webpack_require__(18);
var redefine = __webpack_require__(7);
var global = __webpack_require__(1);
var hide = __webpack_require__(5);
var Iterators = __webpack_require__(15);
var wks = __webpack_require__(0);
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(72);
var step = __webpack_require__(73);
var Iterators = __webpack_require__(15);
var toIObject = __webpack_require__(11);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(27)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(0)('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(5)(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),
/* 73 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__(4);

$export($export.S, 'Array', { isArray: __webpack_require__(41) });


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.1.3.25 String.prototype.trim()
__webpack_require__(76)('trim', function ($trim) {
  return function trim() {
    return $trim(this, 3);
  };
});


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(4);
var defined = __webpack_require__(16);
var fails = __webpack_require__(10);
var spaces = __webpack_require__(77);
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),
/* 77 */
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(4);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(3), 'Object', { defineProperty: __webpack_require__(2).f });


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = __webpack_require__(4);

$export($export.P, 'Function', { bind: __webpack_require__(80) });


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__(31);
var isObject = __webpack_require__(9);
var invoke = __webpack_require__(81);
var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};


/***/ }),
/* 81 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ })
]]);
//# sourceMappingURL=1.dfb0afe6.chunk.js.map
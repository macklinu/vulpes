(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('styled-components')) :
	typeof define === 'function' && define.amd ? define(['exports', 'styled-components'], factory) :
	(factory((global.vulpes = {}),global.styled));
}(this, (function (exports,styled) { 'use strict';

	var styled__default = 'default' in styled ? styled['default'] : styled;

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */

	function makeEmptyFunction(arg) {
	  return function () {
	    return arg;
	  };
	}

	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	var emptyFunction = function emptyFunction() {};

	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function () {
	  return this;
	};
	emptyFunction.thatReturnsArgument = function (arg) {
	  return arg;
	};

	var emptyFunction_1 = emptyFunction;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var validateFormat = function validateFormat(format) {};

	{
	  validateFormat = function validateFormat(format) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  };
	}

	function invariant(condition, format, a, b, c, d, e, f) {
	  validateFormat(format);

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	}

	var invariant_1 = invariant;

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = emptyFunction_1;

	{
	  var printWarning = function printWarning(format) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    var argIndex = 0;
	    var message = 'Warning: ' + format.replace(/%s/g, function () {
	      return args[argIndex++];
	    });
	    if (typeof console !== 'undefined') {
	      console.error(message);
	    }
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  };

	  warning = function warning(condition, format) {
	    if (format === undefined) {
	      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
	    }

	    if (format.indexOf('Failed Composite propType: ') === 0) {
	      return; // Ignore CompositeComponent proptype check.
	    }

	    if (!condition) {
	      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	        args[_key2 - 2] = arguments[_key2];
	      }

	      printWarning.apply(undefined, [format].concat(args));
	    }
	  };
	}

	var warning_1 = warning;

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

	var ReactPropTypesSecret_1 = ReactPropTypesSecret;

	{
	  var invariant$1 = invariant_1;
	  var warning$1 = warning_1;
	  var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;
	  var loggedTypeFailures = {};
	}

	/**
	 * Assert that the values match with the type specs.
	 * Error messages are memorized and will only be shown once.
	 *
	 * @param {object} typeSpecs Map of name to a ReactPropType
	 * @param {object} values Runtime values that need to be type-checked
	 * @param {string} location e.g. "prop", "context", "child context"
	 * @param {string} componentName Name of the component for error messages.
	 * @param {?Function} getStack Returns the component stack.
	 * @private
	 */
	function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
	  {
	    for (var typeSpecName in typeSpecs) {
	      if (typeSpecs.hasOwnProperty(typeSpecName)) {
	        var error;
	        // Prop type validation may throw. In case they do, we don't want to
	        // fail the render phase where it didn't fail before. So we log it.
	        // After these have been cleaned up, we'll let them throw.
	        try {
	          // This is intentionally an invariant that gets caught. It's the same
	          // behavior as without this statement except with a better message.
	          invariant$1(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
	          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$1);
	        } catch (ex) {
	          error = ex;
	        }
	        warning$1(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
	        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
	          // Only monitor this failure once because there tends to be a lot of the
	          // same error.
	          loggedTypeFailures[error.message] = true;

	          var stack = getStack ? getStack() : '';

	          warning$1(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
	        }
	      }
	    }
	  }
	}

	var checkPropTypes_1 = checkPropTypes;

	var factoryWithTypeCheckers = function(isValidElement, throwOnDirectAccess) {
	  /* global Symbol */
	  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

	  /**
	   * Returns the iterator method function contained on the iterable object.
	   *
	   * Be sure to invoke the function with the iterable as context:
	   *
	   *     var iteratorFn = getIteratorFn(myIterable);
	   *     if (iteratorFn) {
	   *       var iterator = iteratorFn.call(myIterable);
	   *       ...
	   *     }
	   *
	   * @param {?object} maybeIterable
	   * @return {?function}
	   */
	  function getIteratorFn(maybeIterable) {
	    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
	    if (typeof iteratorFn === 'function') {
	      return iteratorFn;
	    }
	  }

	  /**
	   * Collection of methods that allow declaration and validation of props that are
	   * supplied to React components. Example usage:
	   *
	   *   var Props = require('ReactPropTypes');
	   *   var MyArticle = React.createClass({
	   *     propTypes: {
	   *       // An optional string prop named "description".
	   *       description: Props.string,
	   *
	   *       // A required enum prop named "category".
	   *       category: Props.oneOf(['News','Photos']).isRequired,
	   *
	   *       // A prop named "dialog" that requires an instance of Dialog.
	   *       dialog: Props.instanceOf(Dialog).isRequired
	   *     },
	   *     render: function() { ... }
	   *   });
	   *
	   * A more formal specification of how these methods are used:
	   *
	   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
	   *   decl := ReactPropTypes.{type}(.isRequired)?
	   *
	   * Each and every declaration produces a function with the same signature. This
	   * allows the creation of custom validation functions. For example:
	   *
	   *  var MyLink = React.createClass({
	   *    propTypes: {
	   *      // An optional string or URI prop named "href".
	   *      href: function(props, propName, componentName) {
	   *        var propValue = props[propName];
	   *        if (propValue != null && typeof propValue !== 'string' &&
	   *            !(propValue instanceof URI)) {
	   *          return new Error(
	   *            'Expected a string or an URI for ' + propName + ' in ' +
	   *            componentName
	   *          );
	   *        }
	   *      }
	   *    },
	   *    render: function() {...}
	   *  });
	   *
	   * @internal
	   */

	  var ANONYMOUS = '<<anonymous>>';

	  // Important!
	  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
	  var ReactPropTypes = {
	    array: createPrimitiveTypeChecker('array'),
	    bool: createPrimitiveTypeChecker('boolean'),
	    func: createPrimitiveTypeChecker('function'),
	    number: createPrimitiveTypeChecker('number'),
	    object: createPrimitiveTypeChecker('object'),
	    string: createPrimitiveTypeChecker('string'),
	    symbol: createPrimitiveTypeChecker('symbol'),

	    any: createAnyTypeChecker(),
	    arrayOf: createArrayOfTypeChecker,
	    element: createElementTypeChecker(),
	    instanceOf: createInstanceTypeChecker,
	    node: createNodeChecker(),
	    objectOf: createObjectOfTypeChecker,
	    oneOf: createEnumTypeChecker,
	    oneOfType: createUnionTypeChecker,
	    shape: createShapeTypeChecker,
	    exact: createStrictShapeTypeChecker,
	  };

	  /**
	   * inlined Object.is polyfill to avoid requiring consumers ship their own
	   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	   */
	  /*eslint-disable no-self-compare*/
	  function is(x, y) {
	    // SameValue algorithm
	    if (x === y) {
	      // Steps 1-5, 7-10
	      // Steps 6.b-6.e: +0 != -0
	      return x !== 0 || 1 / x === 1 / y;
	    } else {
	      // Step 6.a: NaN == NaN
	      return x !== x && y !== y;
	    }
	  }
	  /*eslint-enable no-self-compare*/

	  /**
	   * We use an Error-like object for backward compatibility as people may call
	   * PropTypes directly and inspect their output. However, we don't use real
	   * Errors anymore. We don't inspect their stack anyway, and creating them
	   * is prohibitively expensive if they are created too often, such as what
	   * happens in oneOfType() for any type before the one that matched.
	   */
	  function PropTypeError(message) {
	    this.message = message;
	    this.stack = '';
	  }
	  // Make `instanceof Error` still work for returned errors.
	  PropTypeError.prototype = Error.prototype;

	  function createChainableTypeChecker(validate) {
	    {
	      var manualPropTypeCallCache = {};
	      var manualPropTypeWarningCount = 0;
	    }
	    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
	      componentName = componentName || ANONYMOUS;
	      propFullName = propFullName || propName;

	      if (secret !== ReactPropTypesSecret_1) {
	        if (throwOnDirectAccess) {
	          // New behavior only for users of `prop-types` package
	          invariant_1(
	            false,
	            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	            'Use `PropTypes.checkPropTypes()` to call them. ' +
	            'Read more at http://fb.me/use-check-prop-types'
	          );
	        } else if ("development" !== 'production' && typeof console !== 'undefined') {
	          // Old behavior for people using React.PropTypes
	          var cacheKey = componentName + ':' + propName;
	          if (
	            !manualPropTypeCallCache[cacheKey] &&
	            // Avoid spamming the console because they are often not actionable except for lib authors
	            manualPropTypeWarningCount < 3
	          ) {
	            warning_1(
	              false,
	              'You are manually calling a React.PropTypes validation ' +
	              'function for the `%s` prop on `%s`. This is deprecated ' +
	              'and will throw in the standalone `prop-types` package. ' +
	              'You may be seeing this warning due to a third-party PropTypes ' +
	              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
	              propFullName,
	              componentName
	            );
	            manualPropTypeCallCache[cacheKey] = true;
	            manualPropTypeWarningCount++;
	          }
	        }
	      }
	      if (props[propName] == null) {
	        if (isRequired) {
	          if (props[propName] === null) {
	            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
	          }
	          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
	        }
	        return null;
	      } else {
	        return validate(props, propName, componentName, location, propFullName);
	      }
	    }

	    var chainedCheckType = checkType.bind(null, false);
	    chainedCheckType.isRequired = checkType.bind(null, true);

	    return chainedCheckType;
	  }

	  function createPrimitiveTypeChecker(expectedType) {
	    function validate(props, propName, componentName, location, propFullName, secret) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== expectedType) {
	        // `propValue` being instance of, say, date/regexp, pass the 'object'
	        // check, but we can offer a more precise error message here rather than
	        // 'of type `object`'.
	        var preciseType = getPreciseType(propValue);

	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createAnyTypeChecker() {
	    return createChainableTypeChecker(emptyFunction_1.thatReturnsNull);
	  }

	  function createArrayOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
	      }
	      var propValue = props[propName];
	      if (!Array.isArray(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
	      }
	      for (var i = 0; i < propValue.length; i++) {
	        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret_1);
	        if (error instanceof Error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createElementTypeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      if (!isValidElement(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createInstanceTypeChecker(expectedClass) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!(props[propName] instanceof expectedClass)) {
	        var expectedClassName = expectedClass.name || ANONYMOUS;
	        var actualClassName = getClassName(props[propName]);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createEnumTypeChecker(expectedValues) {
	    if (!Array.isArray(expectedValues)) {
	      warning_1(false, 'Invalid argument supplied to oneOf, expected an instance of array.');
	      return emptyFunction_1.thatReturnsNull;
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      for (var i = 0; i < expectedValues.length; i++) {
	        if (is(propValue, expectedValues[i])) {
	          return null;
	        }
	      }

	      var valuesString = JSON.stringify(expectedValues);
	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createObjectOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
	      }
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
	      }
	      for (var key in propValue) {
	        if (propValue.hasOwnProperty(key)) {
	          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
	          if (error instanceof Error) {
	            return error;
	          }
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createUnionTypeChecker(arrayOfTypeCheckers) {
	    if (!Array.isArray(arrayOfTypeCheckers)) {
	      warning_1(false, 'Invalid argument supplied to oneOfType, expected an instance of array.');
	      return emptyFunction_1.thatReturnsNull;
	    }

	    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	      var checker = arrayOfTypeCheckers[i];
	      if (typeof checker !== 'function') {
	        warning_1(
	          false,
	          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
	          'received %s at index %s.',
	          getPostfixForTypeWarning(checker),
	          i
	        );
	        return emptyFunction_1.thatReturnsNull;
	      }
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	        var checker = arrayOfTypeCheckers[i];
	        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret_1) == null) {
	          return null;
	        }
	      }

	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createNodeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!isNode(props[propName])) {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      for (var key in shapeTypes) {
	        var checker = shapeTypes[key];
	        if (!checker) {
	          continue;
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createStrictShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      // We need to check all keys in case some are required but missing from
	      // props.
	      var allKeys = objectAssign({}, props[propName], shapeTypes);
	      for (var key in allKeys) {
	        var checker = shapeTypes[key];
	        if (!checker) {
	          return new PropTypeError(
	            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
	            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
	            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
	          );
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }

	    return createChainableTypeChecker(validate);
	  }

	  function isNode(propValue) {
	    switch (typeof propValue) {
	      case 'number':
	      case 'string':
	      case 'undefined':
	        return true;
	      case 'boolean':
	        return !propValue;
	      case 'object':
	        if (Array.isArray(propValue)) {
	          return propValue.every(isNode);
	        }
	        if (propValue === null || isValidElement(propValue)) {
	          return true;
	        }

	        var iteratorFn = getIteratorFn(propValue);
	        if (iteratorFn) {
	          var iterator = iteratorFn.call(propValue);
	          var step;
	          if (iteratorFn !== propValue.entries) {
	            while (!(step = iterator.next()).done) {
	              if (!isNode(step.value)) {
	                return false;
	              }
	            }
	          } else {
	            // Iterator will provide entry [k,v] tuples rather than values.
	            while (!(step = iterator.next()).done) {
	              var entry = step.value;
	              if (entry) {
	                if (!isNode(entry[1])) {
	                  return false;
	                }
	              }
	            }
	          }
	        } else {
	          return false;
	        }

	        return true;
	      default:
	        return false;
	    }
	  }

	  function isSymbol(propType, propValue) {
	    // Native Symbol.
	    if (propType === 'symbol') {
	      return true;
	    }

	    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
	    if (propValue['@@toStringTag'] === 'Symbol') {
	      return true;
	    }

	    // Fallback for non-spec compliant Symbols which are polyfilled.
	    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
	      return true;
	    }

	    return false;
	  }

	  // Equivalent of `typeof` but with special handling for array and regexp.
	  function getPropType(propValue) {
	    var propType = typeof propValue;
	    if (Array.isArray(propValue)) {
	      return 'array';
	    }
	    if (propValue instanceof RegExp) {
	      // Old webkits (at least until Android 4.0) return 'function' rather than
	      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
	      // passes PropTypes.object.
	      return 'object';
	    }
	    if (isSymbol(propType, propValue)) {
	      return 'symbol';
	    }
	    return propType;
	  }

	  // This handles more types than `getPropType`. Only used for error messages.
	  // See `createPrimitiveTypeChecker`.
	  function getPreciseType(propValue) {
	    if (typeof propValue === 'undefined' || propValue === null) {
	      return '' + propValue;
	    }
	    var propType = getPropType(propValue);
	    if (propType === 'object') {
	      if (propValue instanceof Date) {
	        return 'date';
	      } else if (propValue instanceof RegExp) {
	        return 'regexp';
	      }
	    }
	    return propType;
	  }

	  // Returns a string that is postfixed to a warning about an invalid type.
	  // For example, "undefined" or "of type array"
	  function getPostfixForTypeWarning(value) {
	    var type = getPreciseType(value);
	    switch (type) {
	      case 'array':
	      case 'object':
	        return 'an ' + type;
	      case 'boolean':
	      case 'date':
	      case 'regexp':
	        return 'a ' + type;
	      default:
	        return type;
	    }
	  }

	  // Returns class name of the object, if any.
	  function getClassName(propValue) {
	    if (!propValue.constructor || !propValue.constructor.name) {
	      return ANONYMOUS;
	    }
	    return propValue.constructor.name;
	  }

	  ReactPropTypes.checkPropTypes = checkPropTypes_1;
	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};

	var propTypes = createCommonjsModule(function (module) {
	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	{
	  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
	    Symbol.for &&
	    Symbol.for('react.element')) ||
	    0xeac7;

	  var isValidElement = function(object) {
	    return typeof object === 'object' &&
	      object !== null &&
	      object.$$typeof === REACT_ELEMENT_TYPE;
	  };

	  // By explicitly using `prop-types` you are opting into new development behavior.
	  // http://fb.me/prop-types-in-prod
	  var throwOnDirectAccess = true;
	  module.exports = factoryWithTypeCheckers(isValidElement, throwOnDirectAccess);
	}
	});

	var constants = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var breakpoints = exports.breakpoints = ['40em', '52em', '64em'];

	var space = exports.space = [0, 4, 8, 16, 32, 64, 128, 256, 512];

	var fontSizes = exports.fontSizes = [12, 14, 16, 20, 24, 32, 48, 64, 72];

	exports.default = {
	  breakpoints: breakpoints,
	  space: space,
	  fontSizes: fontSizes
	};
	});

	unwrapExports(constants);
	var constants_1 = constants.breakpoints;
	var constants_2 = constants.space;
	var constants_3 = constants.fontSizes;

	var util = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.complexStyle = exports.themeGet = exports.pseudoStyle = exports.responsiveStyle = exports.style = exports.getValue = exports.merge = exports.media = exports.dec = exports.breaks = exports.fallbackTheme = exports.mq = exports.get = exports.getWidth = exports.arr = exports.neg = exports.px = exports.num = exports.is = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



	var _propTypes2 = _interopRequireDefault(propTypes);



	var _constants2 = _interopRequireDefault(constants);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var propTypes$$1 = {
	  responsive: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string, _propTypes2.default.array]),
	  numberOrString: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])
	};

	var is = exports.is = function is(n) {
	  return n !== undefined && n !== null;
	};
	var num = exports.num = function num(n) {
	  return typeof n === 'number' && !isNaN(n);
	};
	var px = exports.px = function px(n) {
	  return num(n) ? n + 'px' : n;
	};
	var neg = exports.neg = function neg(n) {
	  return n < 0;
	};
	var arr = exports.arr = function arr(n) {
	  return Array.isArray(n) ? n : [n];
	};

	var getWidth = exports.getWidth = function getWidth(n) {
	  return !num(n) || n > 1 ? px(n) : n * 100 + '%';
	};
	var get = exports.get = function get(obj, path, fallback) {
	  return path.split('.').reduce(function (a, b) {
	    return a && a[b] ? a[b] : null;
	  }, obj) || fallback;
	};

	var mq = exports.mq = function mq(n) {
	  return '@media screen and (min-width: ' + px(n) + ')';
	};

	var fallbackTheme = exports.fallbackTheme = function fallbackTheme(props) {
	  return _extends({}, _constants2.default, get(props, 'theme'));
	};

	var breaks = exports.breaks = function breaks(props) {
	  return [null].concat(_toConsumableArray(get(props, 'theme.breakpoints', constants.breakpoints).map(mq)));
	};

	var dec = exports.dec = function dec(props) {
	  return function (val) {
	    return arr(props).reduce(function (acc, prop) {
	      return acc[prop] = val, acc;
	    }, {});
	  };
	};

	var media = exports.media = function media(bp) {
	  return function (d, i) {
	    return is(d) ? bp[i] ? _defineProperty({}, bp[i], d) : d : null;
	  };
	};

	var merge = exports.merge = function merge(a, b) {
	  return Object.assign({}, a, b, Object.keys(b).reduce(function (obj, key) {
	    return Object.assign(obj, _defineProperty({}, key, a[key] !== null && _typeof(a[key]) === 'object' ? merge(a[key], b[key]) : b[key]));
	  }, {}));
	};

	var getValue = exports.getValue = function getValue(val, getter, toPx) {
	  return typeof getter === 'function' ? getter(val) : toPx ? px(val) : val;
	};

	var style = exports.style = function style(_ref2) {
	  var prop = _ref2.prop,
	      cssProperty = _ref2.cssProperty,
	      alias = _ref2.alias,
	      key = _ref2.key,
	      getter = _ref2.getter,
	      numberToPx = _ref2.numberToPx;

	  var fn = function fn(props) {
	    cssProperty = cssProperty || prop;
	    var n = is(props[prop]) ? props[prop] : props[alias];
	    var th = fallbackTheme(props);
	    if (!is(n)) return null;
	    var value = getValue(get(th, [key, n].join('.'), n), getter, numberToPx);

	    return _defineProperty({}, cssProperty, value);
	  };
	  fn.propTypes = _defineProperty({}, prop, propTypes$$1.numberOrString);
	  if (alias) {
	    fn.propTypes[alias] = propTypes$$1.numberOrString;
	  }
	  return fn;
	};

	var responsiveStyle = exports.responsiveStyle = function responsiveStyle(_ref4) {
	  var prop = _ref4.prop,
	      cssProperty = _ref4.cssProperty,
	      alias = _ref4.alias,
	      key = _ref4.key,
	      getter = _ref4.getter,
	      numberToPx = _ref4.numberToPx;

	  var fn = function fn(props) {
	    cssProperty = cssProperty || prop;
	    var n = is(props[prop]) ? props[prop] : props[alias];
	    if (!is(n)) return null;

	    var bp = breaks(props);
	    var th = fallbackTheme(props);
	    var sx = function sx(n) {
	      return getValue(get(th, [key || prop, n].join('.'), n), getter, numberToPx);
	    };

	    if (!Array.isArray(n)) {
	      return _defineProperty({}, cssProperty, sx(n));
	    }

	    var val = arr(n);
	    return val.map(sx).map(dec(cssProperty)).map(media(bp)).reduce(merge, {});
	  };

	  // add propTypes object to returned function
	  fn.propTypes = _defineProperty({}, prop, propTypes$$1.responsive);
	  if (alias) {
	    fn.propTypes[alias] = propTypes$$1.responsive;
	  }

	  return fn;
	};

	var pseudoStyle = exports.pseudoStyle = function pseudoStyle(_ref6) {
	  var prop = _ref6.prop,
	      alias = _ref6.alias,
	      pseudoclass = _ref6.pseudoclass,
	      _ref6$keys = _ref6.keys,
	      keys = _ref6$keys === undefined ? {} : _ref6$keys,
	      _ref6$getters = _ref6.getters,
	      getters = _ref6$getters === undefined ? {} : _ref6$getters,
	      _ref6$numberToPx = _ref6.numberToPx,
	      numberToPx = _ref6$numberToPx === undefined ? {} : _ref6$numberToPx;

	  var fn = function fn(props) {
	    var style = props[prop] || props[alias];
	    pseudoclass = pseudoclass || prop;
	    var th = fallbackTheme(props);
	    for (var key in style) {
	      var toPx = numberToPx[key];
	      if (!keys[key] && !getters[key] && !toPx) continue;
	      var themeKey = [keys[key], style[key]].join('.');
	      style[key] = getValue(get(th, themeKey, style[key]), getters[key], toPx);
	    }

	    return _defineProperty({}, '&:' + pseudoclass, style);
	  };
	  fn.propTypes = _defineProperty({}, prop, _propTypes2.default.object);
	  return fn;
	};

	// todo: consider alternative names
	var themeGet = exports.themeGet = function themeGet(keys, fallback) {
	  return function (props) {
	    return get(props.theme, keys, fallback);
	  };
	};

	var getBooleans = function getBooleans(props) {
	  var bools = [];
	  for (var key in props) {
	    if (props[key] !== true) continue;
	    bools.push(key);
	  }
	  return bools;
	};

	var complexStyle = exports.complexStyle = function complexStyle(_ref8) {
	  var prop = _ref8.prop,
	      key = _ref8.key,
	      alias = _ref8.alias;

	  var fn = function fn(props) {
	    var style = get(props, ['theme', key, get(props, prop, props[alias])].join('.'), {});
	    var bools = getBooleans(props);
	    bools.forEach(function (name) {
	      style = _extends({}, style, get(props, ['theme', key, name].join('.'), {}));
	    });
	    return style;
	  };

	  fn.propTypes = _defineProperty({}, prop, _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]));

	  if (alias) {
	    fn.propTypes[alias] = _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]);
	  }

	  return fn;
	};
	});

	unwrapExports(util);
	var util_1 = util.complexStyle;
	var util_2 = util.themeGet;
	var util_3 = util.pseudoStyle;
	var util_4 = util.responsiveStyle;
	var util_5 = util.style;
	var util_6 = util.getValue;
	var util_7 = util.merge;
	var util_8 = util.media;
	var util_9 = util.dec;
	var util_10 = util.breaks;
	var util_11 = util.fallbackTheme;
	var util_12 = util.mq;
	var util_13 = util.get;
	var util_14 = util.getWidth;
	var util_15 = util.arr;
	var util_16 = util.neg;
	var util_17 = util.px;
	var util_18 = util.num;
	var util_19 = util.is;

	var space_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.space = undefined;

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();



	var _propTypes2 = _interopRequireDefault(propTypes);





	var _constants2 = _interopRequireDefault(constants);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var REG = /^[mp][trblxy]?$/;

	var space = exports.space = function space(props) {
	  var keys = Object.keys(props).filter(function (key) {
	    return REG.test(key);
	  }).sort();
	  var bp = (0, util.breaks)(props);
	  var sc = (0, util.get)(props, 'theme.space', _constants2.default.space);

	  return keys.map(function (key) {
	    var val = props[key];
	    var p = getProperties(key);

	    if (!Array.isArray(val)) {
	      return p.reduce(function (a, b) {
	        return Object.assign(a, _defineProperty({}, b, mx(sc)(val)));
	      }, {});
	    }

	    return (0, util.arr)(val).map(mx(sc)).map((0, util.dec)(p)).map((0, util.media)(bp)).reduce(util.merge, {});
	  }).reduce(util.merge, {});
	};

	var mx = function mx(scale) {
	  return function (n) {
	    if (!(0, util.num)(n)) {
	      return n;
	    }

	    var value = scale[Math.abs(n)] || Math.abs(n);
	    if (!(0, util.num)(value)) {
	      return (0, util.neg)(n) ? '-' + value : value;
	    }

	    return (0, util.px)(value * ((0, util.neg)(n) ? -1 : 1));
	  };
	};

	var getProperties = function getProperties(key) {
	  var _key$split = key.split(''),
	      _key$split2 = _slicedToArray(_key$split, 2),
	      a = _key$split2[0],
	      b = _key$split2[1];

	  var prop = properties[a];
	  var dirs = directions[b] || [''];
	  return dirs.map(function (dir) {
	    return prop + dir;
	  });
	};

	var properties = {
	  m: 'margin',
	  p: 'padding'
	};

	var directions = {
	  t: ['Top'],
	  r: ['Right'],
	  b: ['Bottom'],
	  l: ['Left'],
	  x: ['Left', 'Right'],
	  y: ['Top', 'Bottom']
	};

	var responsive = _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string, _propTypes2.default.array]);

	space.propTypes = {
	  m: responsive,
	  mt: responsive,
	  mr: responsive,
	  mb: responsive,
	  ml: responsive,
	  mx: responsive,
	  my: responsive,
	  p: responsive,
	  pt: responsive,
	  pr: responsive,
	  pb: responsive,
	  pl: responsive,
	  px: responsive,
	  py: responsive
	};

	exports.default = space;
	});

	unwrapExports(space_1);
	var space_2 = space_1.space;

	var styles = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.borderWidth = exports.buttonStyle = exports.colorStyle = exports.textStyle = exports.disabled = exports.active = exports.focus = exports.hover = exports.left = exports.bottom = exports.right = exports.top = exports.zIndex = exports.position = exports.backgroundRepeat = exports.backgroundPosition = exports.backgroundSize = exports.backgroundImage = exports.background = exports.boxShadow = exports.borderRadius = exports.borderColor = exports.borders = exports.borderLeft = exports.borderBottom = exports.borderRight = exports.borderTop = exports.border = exports.gridTemplateRows = exports.gridTemplateColumns = exports.gridAutoRows = exports.gridAutoColumns = exports.gridAutoFlow = exports.gridRow = exports.gridColumn = exports.gridRowGap = exports.gridColumnGap = exports.gridGap = exports.order = exports.alignSelf = exports.justifySelf = exports.flex = exports.flexDirection = exports.flexBasis = exports.flexWrap = exports.justifyContent = exports.alignContent = exports.alignItems = exports.ratio = exports.ratioPadding = exports.size = exports.sizeHeight = exports.sizeWidth = exports.minHeight = exports.maxHeight = exports.height = exports.minWidth = exports.maxWidth = exports.display = exports.letterSpacing = exports.fontWeight = exports.lineHeight = exports.textAlign = exports.fontFamily = exports.color = exports.bgColor = exports.textColor = exports.fontSize = exports.width = exports.space = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



	Object.defineProperty(exports, 'space', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(space_1).default;
	  }
	});



	var util$$1 = _interopRequireWildcard(util);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var width = exports.width = (0, util.responsiveStyle)({
	  prop: 'width',
	  alias: 'w',
	  getter: util.getWidth
	});

	var fontSize = exports.fontSize = (0, util.responsiveStyle)({
	  prop: 'fontSize',
	  alias: 'f',
	  key: 'fontSizes',
	  numberToPx: true
	});

	var textColor = exports.textColor = (0, util.responsiveStyle)({
	  prop: 'color',
	  key: 'colors'
	});

	var bgColor = exports.bgColor = (0, util.responsiveStyle)({
	  prop: 'bg',
	  cssProperty: 'backgroundColor',
	  key: 'colors'
	});

	var color = exports.color = function color(props) {
	  return _extends({}, textColor(props), bgColor(props));
	};
	color.propTypes = _extends({}, textColor.propTypes, bgColor.propTypes);

	// typography
	var fontFamily = exports.fontFamily = (0, util.style)({
	  prop: 'fontFamily',
	  alias: 'font',
	  key: 'fonts'
	});

	var textAlign = exports.textAlign = (0, util.responsiveStyle)({
	  prop: 'textAlign',
	  // for backwards compatibility - will cause bugs when used with alignItems
	  alias: 'align'
	});

	var lineHeight = exports.lineHeight = (0, util.style)({
	  prop: 'lineHeight',
	  key: 'lineHeights'
	});

	var fontWeight = exports.fontWeight = (0, util.style)({
	  prop: 'fontWeight',
	  key: 'fontWeights'
	});

	var letterSpacing = exports.letterSpacing = (0, util.style)({
	  prop: 'letterSpacing',
	  key: 'letterSpacings',
	  numberToPx: true
	});

	// layout
	var display = exports.display = (0, util.responsiveStyle)({
	  prop: 'display'
	});

	var maxWidth = exports.maxWidth = (0, util.responsiveStyle)({
	  prop: 'maxWidth',
	  key: 'maxWidths',
	  numberToPx: true
	});

	var minWidth = exports.minWidth = (0, util.responsiveStyle)({
	  prop: 'minWidth',
	  key: 'minWidths',
	  numberToPx: true
	});

	var height = exports.height = (0, util.responsiveStyle)({
	  prop: 'height',
	  key: 'heights',
	  numberToPx: true
	});

	var maxHeight = exports.maxHeight = (0, util.responsiveStyle)({
	  prop: 'maxHeight',
	  key: 'maxHeights',
	  numberToPx: true
	});

	var minHeight = exports.minHeight = (0, util.responsiveStyle)({
	  prop: 'minHeight',
	  key: 'minHeights',
	  numberToPx: true
	});

	var sizeWidth = exports.sizeWidth = (0, util.responsiveStyle)({
	  prop: 'size',
	  cssProperty: 'width',
	  numberToPx: true
	});

	var sizeHeight = exports.sizeHeight = (0, util.responsiveStyle)({
	  prop: 'size',
	  cssProperty: 'height',
	  numberToPx: true
	});

	var size = exports.size = function size(props) {
	  return _extends({}, sizeWidth(props), sizeHeight(props));
	};
	size.propTypes = _extends({}, sizeWidth.propTypes, sizeHeight.propTypes);

	var ratioPadding = exports.ratioPadding = (0, util.style)({
	  prop: 'ratio',
	  cssProperty: 'paddingBottom',
	  getter: function getter(n) {
	    return n * 100 + '%';
	  }
	});

	var ratio = exports.ratio = function ratio(props) {
	  return props.ratio ? _extends({
	    height: 0
	  }, ratioPadding(props)) : null;
	};
	ratio.propTypes = _extends({}, ratioPadding.propTypes);

	// flexbox
	var alignItems = exports.alignItems = (0, util.responsiveStyle)({
	  prop: 'alignItems',
	  // for backwards compatibility - will cause bugs when used with textAlign
	  alias: 'align'
	});

	var alignContent = exports.alignContent = (0, util.responsiveStyle)({
	  prop: 'alignContent'
	});

	var justifyContent = exports.justifyContent = (0, util.responsiveStyle)({
	  prop: 'justifyContent',
	  // for backwards compatibility
	  alias: 'justify'
	});

	// for backwards compatibility
	var flexWrapShim = function flexWrapShim(n) {
	  return n === true ? 'wrap' : n;
	};
	var flexWrap = exports.flexWrap = (0, util.responsiveStyle)({
	  prop: 'flexWrap',
	  alias: 'wrap',
	  getter: flexWrapShim
	});

	var flexBasis = exports.flexBasis = (0, util.responsiveStyle)({
	  prop: 'flexBasis',
	  getter: util.getWidth
	});

	var flexDirection = exports.flexDirection = (0, util.responsiveStyle)({
	  prop: 'flexDirection'
	});

	var flex = exports.flex = (0, util.responsiveStyle)({
	  prop: 'flex'
	});

	var justifySelf = exports.justifySelf = (0, util.responsiveStyle)({
	  prop: 'justifySelf'
	});

	var alignSelf = exports.alignSelf = (0, util.responsiveStyle)({
	  prop: 'alignSelf'
	});

	var order = exports.order = (0, util.responsiveStyle)({
	  prop: 'order'
	});

	// grid
	var gridGap = exports.gridGap = (0, util.responsiveStyle)({
	  prop: 'gridGap',
	  numberToPx: true,
	  key: 'space'
	});

	var gridColumnGap = exports.gridColumnGap = (0, util.responsiveStyle)({
	  prop: 'gridColumnGap',
	  numberToPx: true,
	  key: 'space'
	});

	var gridRowGap = exports.gridRowGap = (0, util.responsiveStyle)({
	  prop: 'gridRowGap',
	  numberToPx: true,
	  key: 'space'
	});

	var gridColumn = exports.gridColumn = (0, util.responsiveStyle)({
	  prop: 'gridColumn'
	});

	var gridRow = exports.gridRow = (0, util.responsiveStyle)({
	  prop: 'gridRow'
	});

	var gridAutoFlow = exports.gridAutoFlow = (0, util.style)({
	  prop: 'gridAutoFlow'
	});

	var gridAutoColumns = exports.gridAutoColumns = (0, util.style)({
	  prop: 'gridAutoColumns'
	});

	var gridAutoRows = exports.gridAutoRows = (0, util.style)({
	  prop: 'gridAutoRows'
	});

	var gridTemplateColumns = exports.gridTemplateColumns = (0, util.responsiveStyle)({
	  prop: 'gridTemplateColumns'
	});

	var gridTemplateRows = exports.gridTemplateRows = (0, util.responsiveStyle)({
	  prop: 'gridTemplateRows'
	});

	// borders
	var getBorder = function getBorder(n) {
	  return util$$1.num(n) && n > 0 ? n + 'px solid' : n;
	};

	var border = exports.border = (0, util.responsiveStyle)({
	  prop: 'border',
	  key: 'borders',
	  getter: getBorder
	});

	var borderTop = exports.borderTop = (0, util.responsiveStyle)({
	  prop: 'borderTop',
	  key: 'borders',
	  getter: getBorder
	});

	var borderRight = exports.borderRight = (0, util.responsiveStyle)({
	  prop: 'borderRight',
	  key: 'borders',
	  getter: getBorder
	});

	var borderBottom = exports.borderBottom = (0, util.responsiveStyle)({
	  prop: 'borderBottom',
	  key: 'borders',
	  getter: getBorder
	});

	var borderLeft = exports.borderLeft = (0, util.responsiveStyle)({
	  prop: 'borderLeft',
	  key: 'borders',
	  getter: getBorder
	});

	var borders = exports.borders = function borders(props) {
	  return _extends({}, border(props), borderTop(props), borderRight(props), borderBottom(props), borderLeft(props));
	};
	borders.propTypes = _extends({}, border.propTypes, borderTop.propTypes, borderRight.propTypes, borderBottom.propTypes, borderLeft.propTypes);

	var borderColor = exports.borderColor = (0, util.style)({
	  prop: 'borderColor',
	  key: 'colors'
	});

	var borderRadius = exports.borderRadius = (0, util.style)({
	  prop: 'borderRadius',
	  key: 'radii',
	  numberToPx: true
	});

	var boxShadow = exports.boxShadow = (0, util.style)({
	  prop: 'boxShadow',
	  key: 'shadows'
	});

	// backgrounds
	var background = exports.background = (0, util.style)({
	  prop: 'background'
	});

	var backgroundImage = exports.backgroundImage = (0, util.style)({
	  prop: 'backgroundImage',
	  alias: 'bgImage',
	  getter: function getter(n) {
	    return 'url(' + n + ')';
	  }
	});

	var backgroundSize = exports.backgroundSize = (0, util.style)({
	  prop: 'backgroundSize',
	  alias: 'bgSize'
	});

	var backgroundPosition = exports.backgroundPosition = (0, util.style)({
	  prop: 'backgroundPosition',
	  alias: 'bgPosition'
	});

	var backgroundRepeat = exports.backgroundRepeat = (0, util.style)({
	  prop: 'backgroundRepeat',
	  alias: 'bgRepeat'
	});

	// position
	var position = exports.position = (0, util.responsiveStyle)({
	  prop: 'position'
	});

	var zIndex = exports.zIndex = (0, util.style)({
	  prop: 'zIndex'
	});

	var top = exports.top = (0, util.responsiveStyle)({
	  prop: 'top',
	  numberToPx: true
	});

	var right = exports.right = (0, util.responsiveStyle)({
	  prop: 'right',
	  numberToPx: true
	});

	var bottom = exports.bottom = (0, util.responsiveStyle)({
	  prop: 'bottom',
	  numberToPx: true
	});

	var left = exports.left = (0, util.responsiveStyle)({
	  prop: 'left',
	  numberToPx: true
	});

	// pseudos
	var hover = exports.hover = (0, util.pseudoStyle)({
	  prop: 'hover',
	  pseudoclass: 'hover',
	  keys: {
	    color: 'colors',
	    backgroundColor: 'colors',
	    borderColor: 'colors',
	    boxShadow: 'shadows'
	  }
	});

	var focus = exports.focus = (0, util.pseudoStyle)({
	  prop: 'focus',
	  keys: {
	    color: 'colors',
	    backgroundColor: 'colors',
	    borderColor: 'colors',
	    boxShadow: 'shadows'
	  }
	});

	var active = exports.active = (0, util.pseudoStyle)({
	  prop: 'active',
	  keys: {
	    color: 'colors',
	    backgroundColor: 'colors',
	    borderColor: 'colors',
	    boxShadow: 'shadows'
	  }
	});

	var disabled = exports.disabled = (0, util.pseudoStyle)({
	  prop: 'disabledStyle',
	  pseudoclass: 'disabled',
	  keys: {
	    color: 'colors',
	    backgroundColor: 'colors',
	    borderColor: 'colors',
	    boxShadow: 'shadows'
	  }
	});

	var textStyle = exports.textStyle = (0, util.complexStyle)({
	  prop: 'textStyle',
	  key: 'textStyles'
	});

	var colorStyle = exports.colorStyle = (0, util.complexStyle)({
	  prop: 'colors',
	  key: 'colorStyles'
	});

	var buttonStyle = exports.buttonStyle = (0, util.complexStyle)({
	  prop: 'buttonStyle',
	  key: 'buttons'
	});

	// for backwards-compatibility
	// these will be removed in v3
	var __DEV__ = "development" !== 'production';

	var borderWidth = exports.borderWidth = (0, util.style)({
	  prop: 'borderWidth',
	  cssProperty: 'border',
	  key: 'borderWidths',
	  getter: function getter(v) {
	    if (__DEV__) {
	      console.warn('borderWidth is deprecated. Please use the `borders` utility instead');
	    }
	    return getBorder(v);
	  }
	});
	});

	unwrapExports(styles);
	var styles_1 = styles.borderWidth;
	var styles_2 = styles.buttonStyle;
	var styles_3 = styles.colorStyle;
	var styles_4 = styles.textStyle;
	var styles_5 = styles.disabled;
	var styles_6 = styles.active;
	var styles_7 = styles.focus;
	var styles_8 = styles.hover;
	var styles_9 = styles.left;
	var styles_10 = styles.bottom;
	var styles_11 = styles.right;
	var styles_12 = styles.top;
	var styles_13 = styles.zIndex;
	var styles_14 = styles.position;
	var styles_15 = styles.backgroundRepeat;
	var styles_16 = styles.backgroundPosition;
	var styles_17 = styles.backgroundSize;
	var styles_18 = styles.backgroundImage;
	var styles_19 = styles.background;
	var styles_20 = styles.boxShadow;
	var styles_21 = styles.borderRadius;
	var styles_22 = styles.borderColor;
	var styles_23 = styles.borders;
	var styles_24 = styles.borderLeft;
	var styles_25 = styles.borderBottom;
	var styles_26 = styles.borderRight;
	var styles_27 = styles.borderTop;
	var styles_28 = styles.border;
	var styles_29 = styles.gridTemplateRows;
	var styles_30 = styles.gridTemplateColumns;
	var styles_31 = styles.gridAutoRows;
	var styles_32 = styles.gridAutoColumns;
	var styles_33 = styles.gridAutoFlow;
	var styles_34 = styles.gridRow;
	var styles_35 = styles.gridColumn;
	var styles_36 = styles.gridRowGap;
	var styles_37 = styles.gridColumnGap;
	var styles_38 = styles.gridGap;
	var styles_39 = styles.order;
	var styles_40 = styles.alignSelf;
	var styles_41 = styles.justifySelf;
	var styles_42 = styles.flex;
	var styles_43 = styles.flexDirection;
	var styles_44 = styles.flexBasis;
	var styles_45 = styles.flexWrap;
	var styles_46 = styles.justifyContent;
	var styles_47 = styles.alignContent;
	var styles_48 = styles.alignItems;
	var styles_49 = styles.ratio;
	var styles_50 = styles.ratioPadding;
	var styles_51 = styles.size;
	var styles_52 = styles.sizeHeight;
	var styles_53 = styles.sizeWidth;
	var styles_54 = styles.minHeight;
	var styles_55 = styles.maxHeight;
	var styles_56 = styles.height;
	var styles_57 = styles.minWidth;
	var styles_58 = styles.maxWidth;
	var styles_59 = styles.display;
	var styles_60 = styles.letterSpacing;
	var styles_61 = styles.fontWeight;
	var styles_62 = styles.lineHeight;
	var styles_63 = styles.textAlign;
	var styles_64 = styles.fontFamily;
	var styles_65 = styles.color;
	var styles_66 = styles.bgColor;
	var styles_67 = styles.textColor;
	var styles_68 = styles.fontSize;
	var styles_69 = styles.width;
	var styles_70 = styles.space;

	var dist = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.propTypes = exports.util = exports.theme = exports.themeGet = exports.complexStyle = exports.responsiveStyle = exports.pseudoStyle = exports.style = exports.borderWidth = exports.buttonStyle = exports.colorStyle = exports.textStyle = exports.disabled = exports.active = exports.focus = exports.hover = exports.left = exports.bottom = exports.right = exports.top = exports.zIndex = exports.position = exports.backgroundRepeat = exports.backgroundPosition = exports.backgroundSize = exports.backgroundImage = exports.background = exports.boxShadow = exports.borderRadius = exports.borderColor = exports.borders = exports.borderLeft = exports.borderBottom = exports.borderRight = exports.borderTop = exports.border = exports.gridTemplateRows = exports.gridTemplateColumns = exports.gridAutoRows = exports.gridAutoColumns = exports.gridAutoFlow = exports.gridRow = exports.gridColumn = exports.gridRowGap = exports.gridColumnGap = exports.gridGap = exports.order = exports.alignSelf = exports.justifySelf = exports.flexBasis = exports.flex = exports.flexDirection = exports.flexWrap = exports.justifyContent = exports.alignContent = exports.alignItems = exports.ratio = exports.size = exports.minHeight = exports.maxHeight = exports.height = exports.minWidth = exports.maxWidth = exports.display = exports.letterSpacing = exports.fontWeight = exports.lineHeight = exports.textAlign = exports.fontFamily = exports.color = exports.bgColor = exports.textColor = exports.fontSize = exports.width = exports.space = exports.styles = undefined;



	Object.defineProperty(exports, 'space', {
	  enumerable: true,
	  get: function get() {
	    return styles.space;
	  }
	});
	Object.defineProperty(exports, 'width', {
	  enumerable: true,
	  get: function get() {
	    return styles.width;
	  }
	});
	Object.defineProperty(exports, 'fontSize', {
	  enumerable: true,
	  get: function get() {
	    return styles.fontSize;
	  }
	});
	Object.defineProperty(exports, 'textColor', {
	  enumerable: true,
	  get: function get() {
	    return styles.textColor;
	  }
	});
	Object.defineProperty(exports, 'bgColor', {
	  enumerable: true,
	  get: function get() {
	    return styles.bgColor;
	  }
	});
	Object.defineProperty(exports, 'color', {
	  enumerable: true,
	  get: function get() {
	    return styles.color;
	  }
	});
	Object.defineProperty(exports, 'fontFamily', {
	  enumerable: true,
	  get: function get() {
	    return styles.fontFamily;
	  }
	});
	Object.defineProperty(exports, 'textAlign', {
	  enumerable: true,
	  get: function get() {
	    return styles.textAlign;
	  }
	});
	Object.defineProperty(exports, 'lineHeight', {
	  enumerable: true,
	  get: function get() {
	    return styles.lineHeight;
	  }
	});
	Object.defineProperty(exports, 'fontWeight', {
	  enumerable: true,
	  get: function get() {
	    return styles.fontWeight;
	  }
	});
	Object.defineProperty(exports, 'letterSpacing', {
	  enumerable: true,
	  get: function get() {
	    return styles.letterSpacing;
	  }
	});
	Object.defineProperty(exports, 'display', {
	  enumerable: true,
	  get: function get() {
	    return styles.display;
	  }
	});
	Object.defineProperty(exports, 'maxWidth', {
	  enumerable: true,
	  get: function get() {
	    return styles.maxWidth;
	  }
	});
	Object.defineProperty(exports, 'minWidth', {
	  enumerable: true,
	  get: function get() {
	    return styles.minWidth;
	  }
	});
	Object.defineProperty(exports, 'height', {
	  enumerable: true,
	  get: function get() {
	    return styles.height;
	  }
	});
	Object.defineProperty(exports, 'maxHeight', {
	  enumerable: true,
	  get: function get() {
	    return styles.maxHeight;
	  }
	});
	Object.defineProperty(exports, 'minHeight', {
	  enumerable: true,
	  get: function get() {
	    return styles.minHeight;
	  }
	});
	Object.defineProperty(exports, 'size', {
	  enumerable: true,
	  get: function get() {
	    return styles.size;
	  }
	});
	Object.defineProperty(exports, 'ratio', {
	  enumerable: true,
	  get: function get() {
	    return styles.ratio;
	  }
	});
	Object.defineProperty(exports, 'alignItems', {
	  enumerable: true,
	  get: function get() {
	    return styles.alignItems;
	  }
	});
	Object.defineProperty(exports, 'alignContent', {
	  enumerable: true,
	  get: function get() {
	    return styles.alignContent;
	  }
	});
	Object.defineProperty(exports, 'justifyContent', {
	  enumerable: true,
	  get: function get() {
	    return styles.justifyContent;
	  }
	});
	Object.defineProperty(exports, 'flexWrap', {
	  enumerable: true,
	  get: function get() {
	    return styles.flexWrap;
	  }
	});
	Object.defineProperty(exports, 'flexDirection', {
	  enumerable: true,
	  get: function get() {
	    return styles.flexDirection;
	  }
	});
	Object.defineProperty(exports, 'flex', {
	  enumerable: true,
	  get: function get() {
	    return styles.flex;
	  }
	});
	Object.defineProperty(exports, 'flexBasis', {
	  enumerable: true,
	  get: function get() {
	    return styles.flexBasis;
	  }
	});
	Object.defineProperty(exports, 'justifySelf', {
	  enumerable: true,
	  get: function get() {
	    return styles.justifySelf;
	  }
	});
	Object.defineProperty(exports, 'alignSelf', {
	  enumerable: true,
	  get: function get() {
	    return styles.alignSelf;
	  }
	});
	Object.defineProperty(exports, 'order', {
	  enumerable: true,
	  get: function get() {
	    return styles.order;
	  }
	});
	Object.defineProperty(exports, 'gridGap', {
	  enumerable: true,
	  get: function get() {
	    return styles.gridGap;
	  }
	});
	Object.defineProperty(exports, 'gridColumnGap', {
	  enumerable: true,
	  get: function get() {
	    return styles.gridColumnGap;
	  }
	});
	Object.defineProperty(exports, 'gridRowGap', {
	  enumerable: true,
	  get: function get() {
	    return styles.gridRowGap;
	  }
	});
	Object.defineProperty(exports, 'gridColumn', {
	  enumerable: true,
	  get: function get() {
	    return styles.gridColumn;
	  }
	});
	Object.defineProperty(exports, 'gridRow', {
	  enumerable: true,
	  get: function get() {
	    return styles.gridRow;
	  }
	});
	Object.defineProperty(exports, 'gridAutoFlow', {
	  enumerable: true,
	  get: function get() {
	    return styles.gridAutoFlow;
	  }
	});
	Object.defineProperty(exports, 'gridAutoColumns', {
	  enumerable: true,
	  get: function get() {
	    return styles.gridAutoColumns;
	  }
	});
	Object.defineProperty(exports, 'gridAutoRows', {
	  enumerable: true,
	  get: function get() {
	    return styles.gridAutoRows;
	  }
	});
	Object.defineProperty(exports, 'gridTemplateColumns', {
	  enumerable: true,
	  get: function get() {
	    return styles.gridTemplateColumns;
	  }
	});
	Object.defineProperty(exports, 'gridTemplateRows', {
	  enumerable: true,
	  get: function get() {
	    return styles.gridTemplateRows;
	  }
	});
	Object.defineProperty(exports, 'border', {
	  enumerable: true,
	  get: function get() {
	    return styles.border;
	  }
	});
	Object.defineProperty(exports, 'borderTop', {
	  enumerable: true,
	  get: function get() {
	    return styles.borderTop;
	  }
	});
	Object.defineProperty(exports, 'borderRight', {
	  enumerable: true,
	  get: function get() {
	    return styles.borderRight;
	  }
	});
	Object.defineProperty(exports, 'borderBottom', {
	  enumerable: true,
	  get: function get() {
	    return styles.borderBottom;
	  }
	});
	Object.defineProperty(exports, 'borderLeft', {
	  enumerable: true,
	  get: function get() {
	    return styles.borderLeft;
	  }
	});
	Object.defineProperty(exports, 'borders', {
	  enumerable: true,
	  get: function get() {
	    return styles.borders;
	  }
	});
	Object.defineProperty(exports, 'borderColor', {
	  enumerable: true,
	  get: function get() {
	    return styles.borderColor;
	  }
	});
	Object.defineProperty(exports, 'borderRadius', {
	  enumerable: true,
	  get: function get() {
	    return styles.borderRadius;
	  }
	});
	Object.defineProperty(exports, 'boxShadow', {
	  enumerable: true,
	  get: function get() {
	    return styles.boxShadow;
	  }
	});
	Object.defineProperty(exports, 'background', {
	  enumerable: true,
	  get: function get() {
	    return styles.background;
	  }
	});
	Object.defineProperty(exports, 'backgroundImage', {
	  enumerable: true,
	  get: function get() {
	    return styles.backgroundImage;
	  }
	});
	Object.defineProperty(exports, 'backgroundSize', {
	  enumerable: true,
	  get: function get() {
	    return styles.backgroundSize;
	  }
	});
	Object.defineProperty(exports, 'backgroundPosition', {
	  enumerable: true,
	  get: function get() {
	    return styles.backgroundPosition;
	  }
	});
	Object.defineProperty(exports, 'backgroundRepeat', {
	  enumerable: true,
	  get: function get() {
	    return styles.backgroundRepeat;
	  }
	});
	Object.defineProperty(exports, 'position', {
	  enumerable: true,
	  get: function get() {
	    return styles.position;
	  }
	});
	Object.defineProperty(exports, 'zIndex', {
	  enumerable: true,
	  get: function get() {
	    return styles.zIndex;
	  }
	});
	Object.defineProperty(exports, 'top', {
	  enumerable: true,
	  get: function get() {
	    return styles.top;
	  }
	});
	Object.defineProperty(exports, 'right', {
	  enumerable: true,
	  get: function get() {
	    return styles.right;
	  }
	});
	Object.defineProperty(exports, 'bottom', {
	  enumerable: true,
	  get: function get() {
	    return styles.bottom;
	  }
	});
	Object.defineProperty(exports, 'left', {
	  enumerable: true,
	  get: function get() {
	    return styles.left;
	  }
	});
	Object.defineProperty(exports, 'hover', {
	  enumerable: true,
	  get: function get() {
	    return styles.hover;
	  }
	});
	Object.defineProperty(exports, 'focus', {
	  enumerable: true,
	  get: function get() {
	    return styles.focus;
	  }
	});
	Object.defineProperty(exports, 'active', {
	  enumerable: true,
	  get: function get() {
	    return styles.active;
	  }
	});
	Object.defineProperty(exports, 'disabled', {
	  enumerable: true,
	  get: function get() {
	    return styles.disabled;
	  }
	});
	Object.defineProperty(exports, 'textStyle', {
	  enumerable: true,
	  get: function get() {
	    return styles.textStyle;
	  }
	});
	Object.defineProperty(exports, 'colorStyle', {
	  enumerable: true,
	  get: function get() {
	    return styles.colorStyle;
	  }
	});
	Object.defineProperty(exports, 'buttonStyle', {
	  enumerable: true,
	  get: function get() {
	    return styles.buttonStyle;
	  }
	});
	Object.defineProperty(exports, 'borderWidth', {
	  enumerable: true,
	  get: function get() {
	    return styles.borderWidth;
	  }
	});



	Object.defineProperty(exports, 'style', {
	  enumerable: true,
	  get: function get() {
	    return util.style;
	  }
	});
	Object.defineProperty(exports, 'pseudoStyle', {
	  enumerable: true,
	  get: function get() {
	    return util.pseudoStyle;
	  }
	});
	Object.defineProperty(exports, 'responsiveStyle', {
	  enumerable: true,
	  get: function get() {
	    return util.responsiveStyle;
	  }
	});
	Object.defineProperty(exports, 'complexStyle', {
	  enumerable: true,
	  get: function get() {
	    return util.complexStyle;
	  }
	});
	Object.defineProperty(exports, 'themeGet', {
	  enumerable: true,
	  get: function get() {
	    return util.themeGet;
	  }
	});
	Object.defineProperty(exports, 'theme', {
	  enumerable: true,
	  get: function get() {
	    return util.themeGet;
	  }
	});

	var styles$$1 = _interopRequireWildcard(styles);

	var _styles = _interopRequireWildcard(styles);

	var _util = _interopRequireWildcard(util);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	exports.styles = _styles;
	exports.util = _util;
	var propTypes = exports.propTypes = {};

	Object.keys(styles$$1).forEach(function (key) {
	  propTypes[key] = styles$$1[key].propTypes;
	});

	styles$$1.propTypes = propTypes;

	exports.default = styles$$1;
	});

	unwrapExports(dist);
	var dist_1 = dist.propTypes;
	var dist_2 = dist.util;
	var dist_3 = dist.theme;
	var dist_4 = dist.themeGet;
	var dist_5 = dist.complexStyle;
	var dist_6 = dist.responsiveStyle;
	var dist_7 = dist.pseudoStyle;
	var dist_8 = dist.style;
	var dist_9 = dist.borderWidth;
	var dist_10 = dist.buttonStyle;
	var dist_11 = dist.colorStyle;
	var dist_12 = dist.textStyle;
	var dist_13 = dist.disabled;
	var dist_14 = dist.active;
	var dist_15 = dist.focus;
	var dist_16 = dist.hover;
	var dist_17 = dist.left;
	var dist_18 = dist.bottom;
	var dist_19 = dist.right;
	var dist_20 = dist.top;
	var dist_21 = dist.zIndex;
	var dist_22 = dist.position;
	var dist_23 = dist.backgroundRepeat;
	var dist_24 = dist.backgroundPosition;
	var dist_25 = dist.backgroundSize;
	var dist_26 = dist.backgroundImage;
	var dist_27 = dist.background;
	var dist_28 = dist.boxShadow;
	var dist_29 = dist.borderRadius;
	var dist_30 = dist.borderColor;
	var dist_31 = dist.borders;
	var dist_32 = dist.borderLeft;
	var dist_33 = dist.borderBottom;
	var dist_34 = dist.borderRight;
	var dist_35 = dist.borderTop;
	var dist_36 = dist.border;
	var dist_37 = dist.gridTemplateRows;
	var dist_38 = dist.gridTemplateColumns;
	var dist_39 = dist.gridAutoRows;
	var dist_40 = dist.gridAutoColumns;
	var dist_41 = dist.gridAutoFlow;
	var dist_42 = dist.gridRow;
	var dist_43 = dist.gridColumn;
	var dist_44 = dist.gridRowGap;
	var dist_45 = dist.gridColumnGap;
	var dist_46 = dist.gridGap;
	var dist_47 = dist.order;
	var dist_48 = dist.alignSelf;
	var dist_49 = dist.justifySelf;
	var dist_50 = dist.flexBasis;
	var dist_51 = dist.flex;
	var dist_52 = dist.flexDirection;
	var dist_53 = dist.flexWrap;
	var dist_54 = dist.justifyContent;
	var dist_55 = dist.alignContent;
	var dist_56 = dist.alignItems;
	var dist_57 = dist.ratio;
	var dist_58 = dist.size;
	var dist_59 = dist.minHeight;
	var dist_60 = dist.maxHeight;
	var dist_61 = dist.height;
	var dist_62 = dist.minWidth;
	var dist_63 = dist.maxWidth;
	var dist_64 = dist.display;
	var dist_65 = dist.letterSpacing;
	var dist_66 = dist.fontWeight;
	var dist_67 = dist.lineHeight;
	var dist_68 = dist.textAlign;
	var dist_69 = dist.fontFamily;
	var dist_70 = dist.color;
	var dist_71 = dist.bgColor;
	var dist_72 = dist.textColor;
	var dist_73 = dist.fontSize;
	var dist_74 = dist.width;
	var dist_75 = dist.space;
	var dist_76 = dist.styles;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var emptyObject = {};

	{
	  Object.freeze(emptyObject);
	}

	var emptyObject_1 = emptyObject;

	var r="function"===typeof Symbol&&Symbol["for"],t=r?Symbol["for"]("react.element"):60103,u=r?Symbol["for"]("react.portal"):60106,v=r?Symbol["for"]("react.fragment"):60107,w=r?Symbol["for"]("react.strict_mode"):60108,x=r?Symbol["for"]("react.provider"):60109,y=r?Symbol["for"]("react.context"):60110,z=r?Symbol["for"]("react.async_mode"):60111,A=r?Symbol["for"]("react.forward_ref"):
	60112,B="function"===typeof Symbol&&Symbol.iterator;function C(a){for(var b=arguments.length-1,e="http://reactjs.org/docs/error-decoder.html?invariant\x3d"+a,c=0;c<b;c++)e+="\x26args[]\x3d"+encodeURIComponent(arguments[c+1]);invariant_1(!1,"Minified React error #"+a+"; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ",e);}var D={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}};
	function E(a,b,e){this.props=a;this.context=b;this.refs=emptyObject_1;this.updater=e||D;}E.prototype.isReactComponent={};E.prototype.setState=function(a,b){"object"!==typeof a&&"function"!==typeof a&&null!=a?C("85"):void 0;this.updater.enqueueSetState(this,a,b,"setState");};E.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate");};function F(){}F.prototype=E.prototype;function G(a,b,e){this.props=a;this.context=b;this.refs=emptyObject_1;this.updater=e||D;}var H=G.prototype=new F;
	H.constructor=G;objectAssign(H,E.prototype);H.isPureReactComponent=!0;var I={current:null},J=Object.prototype.hasOwnProperty,K={key:!0,ref:!0,__self:!0,__source:!0};
	function L(a,b,e){var c=void 0,d={},g=null,h=null;if(null!=b)for(c in void 0!==b.ref&&(h=b.ref), void 0!==b.key&&(g=""+b.key), b)J.call(b,c)&&!K.hasOwnProperty(c)&&(d[c]=b[c]);var f=arguments.length-2;if(1===f)d.children=e;else if(1<f){for(var k=Array(f),l=0;l<f;l++)k[l]=arguments[l+2];d.children=k;}if(a&&a.defaultProps)for(c in f=a.defaultProps, f)void 0===d[c]&&(d[c]=f[c]);return{$$typeof:t,type:a,key:g,ref:h,props:d,_owner:I.current}}
	function M(a){return"object"===typeof a&&null!==a&&a.$$typeof===t}function escape(a){var b={"\x3d":"\x3d0",":":"\x3d2"};return"$"+(""+a).replace(/[=:]/g,function(a){return b[a]})}var N=/\/+/g,O=[];function P(a,b,e,c){if(O.length){var d=O.pop();d.result=a;d.keyPrefix=b;d.func=e;d.context=c;d.count=0;return d}return{result:a,keyPrefix:b,func:e,context:c,count:0}}function Q(a){a.result=null;a.keyPrefix=null;a.func=null;a.context=null;a.count=0;10>O.length&&O.push(a);}
	function R(a,b,e,c){var d=typeof a;if("undefined"===d||"boolean"===d)a=null;var g=!1;if(null===a)g=!0;else switch(d){case "string":case "number":g=!0;break;case "object":switch(a.$$typeof){case t:case u:g=!0;}}if(g)return e(c,a,""===b?"."+S(a,0):b), 1;g=0;b=""===b?".":b+":";if(Array.isArray(a))for(var h=0;h<a.length;h++){d=a[h];var f=b+S(d,h);g+=R(d,f,e,c);}else if(null===a||"undefined"===typeof a?f=null:(f=B&&a[B]||a["@@iterator"], f="function"===typeof f?f:null), "function"===typeof f)for(a=f.call(a), h=0;!(d=a.next()).done;)d=d.value, f=b+S(d,h++), g+=R(d,f,e,c);else"object"===d&&(e=""+a, C("31","[object Object]"===e?"object with keys {"+Object.keys(a).join(", ")+"}":e,""));return g}function S(a,b){return"object"===typeof a&&null!==a&&null!=a.key?escape(a.key):b.toString(36)}function T(a,b){a.func.call(a.context,b,a.count++);}
	function U(a,b,e){var c=a.result,d=a.keyPrefix;a=a.func.call(a.context,b,a.count++);Array.isArray(a)?V(a,c,e,emptyFunction_1.thatReturnsArgument):null!=a&&(M(a)&&(b=d+(!a.key||b&&b.key===a.key?"":(""+a.key).replace(N,"$\x26/")+"/")+e, a={$$typeof:t,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}), c.push(a));}function V(a,b,e,c,d){var g="";null!=e&&(g=(""+e).replace(N,"$\x26/")+"/");b=P(b,g,c,d);null==a||R(a,"",U,b);Q(b);}
	var W={Children:{map:function(a,b,e){if(null==a)return a;var c=[];V(a,c,null,b,e);return c},forEach:function(a,b,e){if(null==a)return a;b=P(null,null,b,e);null==a||R(a,"",T,b);Q(b);},count:function(a){return null==a?0:R(a,"",emptyFunction_1.thatReturnsNull,null)},toArray:function(a){var b=[];V(a,b,null,emptyFunction_1.thatReturnsArgument);return b},only:function(a){M(a)?void 0:C("143");return a}},createRef:function(){return{current:null}},Component:E,PureComponent:G,createContext:function(a,b){void 0===b&&(b=null);a={$$typeof:y,
	_calculateChangedBits:b,_defaultValue:a,_currentValue:a,_changedBits:0,Provider:null,Consumer:null};a.Provider={$$typeof:x,_context:a};return a.Consumer=a},forwardRef:function(a){return{$$typeof:A,render:a}},Fragment:v,StrictMode:w,unstable_AsyncMode:z,createElement:L,cloneElement:function(a,b,e){null===a||void 0===a?C("267",a):void 0;var c=void 0,d=objectAssign({},a.props),g=a.key,h=a.ref,f=a._owner;if(null!=b){void 0!==b.ref&&(h=b.ref, f=I.current);void 0!==b.key&&(g=""+b.key);var k=void 0;a.type&&a.type.defaultProps&&
	(k=a.type.defaultProps);for(c in b)J.call(b,c)&&!K.hasOwnProperty(c)&&(d[c]=void 0===b[c]&&void 0!==k?k[c]:b[c]);}c=arguments.length-2;if(1===c)d.children=e;else if(1<c){k=Array(c);for(var l=0;l<c;l++)k[l]=arguments[l+2];d.children=k;}return{$$typeof:t,type:a.type,key:g,ref:h,props:d,_owner:f}},createFactory:function(a){var b=L.bind(null,a);b.type=a;return b},isValidElement:M,version:"16.3.2",__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{ReactCurrentOwner:I,assign:objectAssign}},X=Object.freeze({default:W}),
	Y=X&&W||X;var react_production_min=Y["default"]?Y["default"]:Y;

	var react_development = createCommonjsModule(function (module) {



	{
	  (function() {

	var _assign = objectAssign;
	var invariant = invariant_1;
	var emptyObject = emptyObject_1;
	var warning = warning_1;
	var emptyFunction = emptyFunction_1;
	var checkPropTypes = checkPropTypes_1;

	// TODO: this is special because it gets imported during build.

	var ReactVersion = '16.3.2';

	// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
	// nor polyfill, then a plain number is used for performance.
	var hasSymbol = typeof Symbol === 'function' && Symbol['for'];

	var REACT_ELEMENT_TYPE = hasSymbol ? Symbol['for']('react.element') : 0xeac7;
	var REACT_CALL_TYPE = hasSymbol ? Symbol['for']('react.call') : 0xeac8;
	var REACT_RETURN_TYPE = hasSymbol ? Symbol['for']('react.return') : 0xeac9;
	var REACT_PORTAL_TYPE = hasSymbol ? Symbol['for']('react.portal') : 0xeaca;
	var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol['for']('react.fragment') : 0xeacb;
	var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol['for']('react.strict_mode') : 0xeacc;
	var REACT_PROVIDER_TYPE = hasSymbol ? Symbol['for']('react.provider') : 0xeacd;
	var REACT_CONTEXT_TYPE = hasSymbol ? Symbol['for']('react.context') : 0xeace;
	var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol['for']('react.async_mode') : 0xeacf;
	var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol['for']('react.forward_ref') : 0xead0;

	var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	var FAUX_ITERATOR_SYMBOL = '@@iterator';

	function getIteratorFn(maybeIterable) {
	  if (maybeIterable === null || typeof maybeIterable === 'undefined') {
	    return null;
	  }
	  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
	  if (typeof maybeIterator === 'function') {
	    return maybeIterator;
	  }
	  return null;
	}

	// Relying on the `invariant()` implementation lets us
	// have preserve the format and params in the www builds.

	/**
	 * Forked from fbjs/warning:
	 * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
	 *
	 * Only change is we use console.warn instead of console.error,
	 * and do nothing when 'console' is not supported.
	 * This really simplifies the code.
	 * ---
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var lowPriorityWarning = function () {};

	{
	  var printWarning = function (format) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    var argIndex = 0;
	    var message = 'Warning: ' + format.replace(/%s/g, function () {
	      return args[argIndex++];
	    });
	    if (typeof console !== 'undefined') {
	      console.warn(message);
	    }
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  };

	  lowPriorityWarning = function (condition, format) {
	    if (format === undefined) {
	      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
	    }
	    if (!condition) {
	      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	        args[_key2 - 2] = arguments[_key2];
	      }

	      printWarning.apply(undefined, [format].concat(args));
	    }
	  };
	}

	var lowPriorityWarning$1 = lowPriorityWarning;

	var didWarnStateUpdateForUnmountedComponent = {};

	function warnNoop(publicInstance, callerName) {
	  {
	    var _constructor = publicInstance.constructor;
	    var componentName = _constructor && (_constructor.displayName || _constructor.name) || 'ReactClass';
	    var warningKey = componentName + '.' + callerName;
	    if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
	      return;
	    }
	    warning(false, "Can't call %s on a component that is not yet mounted. " + 'This is a no-op, but it might indicate a bug in your application. ' + 'Instead, assign to `this.state` directly or define a `state = {};` ' + 'class property with the desired state in the %s component.', callerName, componentName);
	    didWarnStateUpdateForUnmountedComponent[warningKey] = true;
	  }
	}

	/**
	 * This is the abstract API for an update queue.
	 */
	var ReactNoopUpdateQueue = {
	  /**
	   * Checks whether or not this composite component is mounted.
	   * @param {ReactClass} publicInstance The instance we want to test.
	   * @return {boolean} True if mounted, false otherwise.
	   * @protected
	   * @final
	   */
	  isMounted: function (publicInstance) {
	    return false;
	  },

	  /**
	   * Forces an update. This should only be invoked when it is known with
	   * certainty that we are **not** in a DOM transaction.
	   *
	   * You may want to call this when you know that some deeper aspect of the
	   * component's state has changed but `setState` was not called.
	   *
	   * This will not invoke `shouldComponentUpdate`, but it will invoke
	   * `componentWillUpdate` and `componentDidUpdate`.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @param {?function} callback Called after component is updated.
	   * @param {?string} callerName name of the calling function in the public API.
	   * @internal
	   */
	  enqueueForceUpdate: function (publicInstance, callback, callerName) {
	    warnNoop(publicInstance, 'forceUpdate');
	  },

	  /**
	   * Replaces all of the state. Always use this or `setState` to mutate state.
	   * You should treat `this.state` as immutable.
	   *
	   * There is no guarantee that `this.state` will be immediately updated, so
	   * accessing `this.state` after calling this method may return the old value.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @param {object} completeState Next state.
	   * @param {?function} callback Called after component is updated.
	   * @param {?string} callerName name of the calling function in the public API.
	   * @internal
	   */
	  enqueueReplaceState: function (publicInstance, completeState, callback, callerName) {
	    warnNoop(publicInstance, 'replaceState');
	  },

	  /**
	   * Sets a subset of the state. This only exists because _pendingState is
	   * internal. This provides a merging strategy that is not available to deep
	   * properties which is confusing. TODO: Expose pendingState or don't use it
	   * during the merge.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @param {object} partialState Next partial state to be merged with state.
	   * @param {?function} callback Called after component is updated.
	   * @param {?string} Name of the calling function in the public API.
	   * @internal
	   */
	  enqueueSetState: function (publicInstance, partialState, callback, callerName) {
	    warnNoop(publicInstance, 'setState');
	  }
	};

	/**
	 * Base class helpers for the updating state of a component.
	 */
	function Component(props, context, updater) {
	  this.props = props;
	  this.context = context;
	  this.refs = emptyObject;
	  // We initialize the default updater but the real one gets injected by the
	  // renderer.
	  this.updater = updater || ReactNoopUpdateQueue;
	}

	Component.prototype.isReactComponent = {};

	/**
	 * Sets a subset of the state. Always use this to mutate
	 * state. You should treat `this.state` as immutable.
	 *
	 * There is no guarantee that `this.state` will be immediately updated, so
	 * accessing `this.state` after calling this method may return the old value.
	 *
	 * There is no guarantee that calls to `setState` will run synchronously,
	 * as they may eventually be batched together.  You can provide an optional
	 * callback that will be executed when the call to setState is actually
	 * completed.
	 *
	 * When a function is provided to setState, it will be called at some point in
	 * the future (not synchronously). It will be called with the up to date
	 * component arguments (state, props, context). These values can be different
	 * from this.* because your function may be called after receiveProps but before
	 * shouldComponentUpdate, and this new state, props, and context will not yet be
	 * assigned to this.
	 *
	 * @param {object|function} partialState Next partial state or function to
	 *        produce next partial state to be merged with current state.
	 * @param {?function} callback Called after state is updated.
	 * @final
	 * @protected
	 */
	Component.prototype.setState = function (partialState, callback) {
	  !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : void 0;
	  this.updater.enqueueSetState(this, partialState, callback, 'setState');
	};

	/**
	 * Forces an update. This should only be invoked when it is known with
	 * certainty that we are **not** in a DOM transaction.
	 *
	 * You may want to call this when you know that some deeper aspect of the
	 * component's state has changed but `setState` was not called.
	 *
	 * This will not invoke `shouldComponentUpdate`, but it will invoke
	 * `componentWillUpdate` and `componentDidUpdate`.
	 *
	 * @param {?function} callback Called after update is complete.
	 * @final
	 * @protected
	 */
	Component.prototype.forceUpdate = function (callback) {
	  this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
	};

	/**
	 * Deprecated APIs. These APIs used to exist on classic React classes but since
	 * we would like to deprecate them, we're not going to move them over to this
	 * modern base class. Instead, we define a getter that warns if it's accessed.
	 */
	{
	  var deprecatedAPIs = {
	    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
	    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
	  };
	  var defineDeprecationWarning = function (methodName, info) {
	    Object.defineProperty(Component.prototype, methodName, {
	      get: function () {
	        lowPriorityWarning$1(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);
	        return undefined;
	      }
	    });
	  };
	  for (var fnName in deprecatedAPIs) {
	    if (deprecatedAPIs.hasOwnProperty(fnName)) {
	      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
	    }
	  }
	}

	function ComponentDummy() {}
	ComponentDummy.prototype = Component.prototype;

	/**
	 * Convenience component with default shallow equality check for sCU.
	 */
	function PureComponent(props, context, updater) {
	  this.props = props;
	  this.context = context;
	  this.refs = emptyObject;
	  this.updater = updater || ReactNoopUpdateQueue;
	}

	var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
	pureComponentPrototype.constructor = PureComponent;
	// Avoid an extra prototype jump for these methods.
	_assign(pureComponentPrototype, Component.prototype);
	pureComponentPrototype.isPureReactComponent = true;

	// an immutable object with a single mutable value
	function createRef() {
	  var refObject = {
	    current: null
	  };
	  {
	    Object.seal(refObject);
	  }
	  return refObject;
	}

	/**
	 * Keeps track of the current owner.
	 *
	 * The current owner is the component who should own any components that are
	 * currently being constructed.
	 */
	var ReactCurrentOwner = {
	  /**
	   * @internal
	   * @type {ReactComponent}
	   */
	  current: null
	};

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	var RESERVED_PROPS = {
	  key: true,
	  ref: true,
	  __self: true,
	  __source: true
	};

	var specialPropKeyWarningShown = void 0;
	var specialPropRefWarningShown = void 0;

	function hasValidRef(config) {
	  {
	    if (hasOwnProperty.call(config, 'ref')) {
	      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
	      if (getter && getter.isReactWarning) {
	        return false;
	      }
	    }
	  }
	  return config.ref !== undefined;
	}

	function hasValidKey(config) {
	  {
	    if (hasOwnProperty.call(config, 'key')) {
	      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
	      if (getter && getter.isReactWarning) {
	        return false;
	      }
	    }
	  }
	  return config.key !== undefined;
	}

	function defineKeyPropWarningGetter(props, displayName) {
	  var warnAboutAccessingKey = function () {
	    if (!specialPropKeyWarningShown) {
	      specialPropKeyWarningShown = true;
	      warning(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
	    }
	  };
	  warnAboutAccessingKey.isReactWarning = true;
	  Object.defineProperty(props, 'key', {
	    get: warnAboutAccessingKey,
	    configurable: true
	  });
	}

	function defineRefPropWarningGetter(props, displayName) {
	  var warnAboutAccessingRef = function () {
	    if (!specialPropRefWarningShown) {
	      specialPropRefWarningShown = true;
	      warning(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
	    }
	  };
	  warnAboutAccessingRef.isReactWarning = true;
	  Object.defineProperty(props, 'ref', {
	    get: warnAboutAccessingRef,
	    configurable: true
	  });
	}

	/**
	 * Factory method to create a new React element. This no longer adheres to
	 * the class pattern, so do not use new to call it. Also, no instanceof check
	 * will work. Instead test $$typeof field against Symbol.for('react.element') to check
	 * if something is a React Element.
	 *
	 * @param {*} type
	 * @param {*} key
	 * @param {string|object} ref
	 * @param {*} self A *temporary* helper to detect places where `this` is
	 * different from the `owner` when React.createElement is called, so that we
	 * can warn. We want to get rid of owner and replace string `ref`s with arrow
	 * functions, and as long as `this` and owner are the same, there will be no
	 * change in behavior.
	 * @param {*} source An annotation object (added by a transpiler or otherwise)
	 * indicating filename, line number, and/or other information.
	 * @param {*} owner
	 * @param {*} props
	 * @internal
	 */
	var ReactElement = function (type, key, ref, self, source, owner, props) {
	  var element = {
	    // This tag allows us to uniquely identify this as a React Element
	    $$typeof: REACT_ELEMENT_TYPE,

	    // Built-in properties that belong on the element
	    type: type,
	    key: key,
	    ref: ref,
	    props: props,

	    // Record the component responsible for creating this element.
	    _owner: owner
	  };

	  {
	    // The validation flag is currently mutative. We put it on
	    // an external backing store so that we can freeze the whole object.
	    // This can be replaced with a WeakMap once they are implemented in
	    // commonly used development environments.
	    element._store = {};

	    // To make comparing ReactElements easier for testing purposes, we make
	    // the validation flag non-enumerable (where possible, which should
	    // include every environment we run tests in), so the test framework
	    // ignores it.
	    Object.defineProperty(element._store, 'validated', {
	      configurable: false,
	      enumerable: false,
	      writable: true,
	      value: false
	    });
	    // self and source are DEV only properties.
	    Object.defineProperty(element, '_self', {
	      configurable: false,
	      enumerable: false,
	      writable: false,
	      value: self
	    });
	    // Two elements created in two different places should be considered
	    // equal for testing purposes and therefore we hide it from enumeration.
	    Object.defineProperty(element, '_source', {
	      configurable: false,
	      enumerable: false,
	      writable: false,
	      value: source
	    });
	    if (Object.freeze) {
	      Object.freeze(element.props);
	      Object.freeze(element);
	    }
	  }

	  return element;
	};

	/**
	 * Create and return a new ReactElement of the given type.
	 * See https://reactjs.org/docs/react-api.html#createelement
	 */
	function createElement(type, config, children) {
	  var propName = void 0;

	  // Reserved names are extracted
	  var props = {};

	  var key = null;
	  var ref = null;
	  var self = null;
	  var source = null;

	  if (config != null) {
	    if (hasValidRef(config)) {
	      ref = config.ref;
	    }
	    if (hasValidKey(config)) {
	      key = '' + config.key;
	    }

	    self = config.__self === undefined ? null : config.__self;
	    source = config.__source === undefined ? null : config.__source;
	    // Remaining properties are added to a new props object
	    for (propName in config) {
	      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
	        props[propName] = config[propName];
	      }
	    }
	  }

	  // Children can be more than one argument, and those are transferred onto
	  // the newly allocated props object.
	  var childrenLength = arguments.length - 2;
	  if (childrenLength === 1) {
	    props.children = children;
	  } else if (childrenLength > 1) {
	    var childArray = Array(childrenLength);
	    for (var i = 0; i < childrenLength; i++) {
	      childArray[i] = arguments[i + 2];
	    }
	    {
	      if (Object.freeze) {
	        Object.freeze(childArray);
	      }
	    }
	    props.children = childArray;
	  }

	  // Resolve default props
	  if (type && type.defaultProps) {
	    var defaultProps = type.defaultProps;
	    for (propName in defaultProps) {
	      if (props[propName] === undefined) {
	        props[propName] = defaultProps[propName];
	      }
	    }
	  }
	  {
	    if (key || ref) {
	      if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE) {
	        var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
	        if (key) {
	          defineKeyPropWarningGetter(props, displayName);
	        }
	        if (ref) {
	          defineRefPropWarningGetter(props, displayName);
	        }
	      }
	    }
	  }
	  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
	}

	/**
	 * Return a function that produces ReactElements of a given type.
	 * See https://reactjs.org/docs/react-api.html#createfactory
	 */


	function cloneAndReplaceKey(oldElement, newKey) {
	  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

	  return newElement;
	}

	/**
	 * Clone and return a new ReactElement using element as the starting point.
	 * See https://reactjs.org/docs/react-api.html#cloneelement
	 */
	function cloneElement(element, config, children) {
	  !!(element === null || element === undefined) ? invariant(false, 'React.cloneElement(...): The argument must be a React element, but you passed %s.', element) : void 0;

	  var propName = void 0;

	  // Original props are copied
	  var props = _assign({}, element.props);

	  // Reserved names are extracted
	  var key = element.key;
	  var ref = element.ref;
	  // Self is preserved since the owner is preserved.
	  var self = element._self;
	  // Source is preserved since cloneElement is unlikely to be targeted by a
	  // transpiler, and the original source is probably a better indicator of the
	  // true owner.
	  var source = element._source;

	  // Owner will be preserved, unless ref is overridden
	  var owner = element._owner;

	  if (config != null) {
	    if (hasValidRef(config)) {
	      // Silently steal the ref from the parent.
	      ref = config.ref;
	      owner = ReactCurrentOwner.current;
	    }
	    if (hasValidKey(config)) {
	      key = '' + config.key;
	    }

	    // Remaining properties override existing props
	    var defaultProps = void 0;
	    if (element.type && element.type.defaultProps) {
	      defaultProps = element.type.defaultProps;
	    }
	    for (propName in config) {
	      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
	        if (config[propName] === undefined && defaultProps !== undefined) {
	          // Resolve default props
	          props[propName] = defaultProps[propName];
	        } else {
	          props[propName] = config[propName];
	        }
	      }
	    }
	  }

	  // Children can be more than one argument, and those are transferred onto
	  // the newly allocated props object.
	  var childrenLength = arguments.length - 2;
	  if (childrenLength === 1) {
	    props.children = children;
	  } else if (childrenLength > 1) {
	    var childArray = Array(childrenLength);
	    for (var i = 0; i < childrenLength; i++) {
	      childArray[i] = arguments[i + 2];
	    }
	    props.children = childArray;
	  }

	  return ReactElement(element.type, key, ref, self, source, owner, props);
	}

	/**
	 * Verifies the object is a ReactElement.
	 * See https://reactjs.org/docs/react-api.html#isvalidelement
	 * @param {?object} object
	 * @return {boolean} True if `object` is a valid component.
	 * @final
	 */
	function isValidElement(object) {
	  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
	}

	var ReactDebugCurrentFrame = {};

	{
	  // Component that is being worked on
	  ReactDebugCurrentFrame.getCurrentStack = null;

	  ReactDebugCurrentFrame.getStackAddendum = function () {
	    var impl = ReactDebugCurrentFrame.getCurrentStack;
	    if (impl) {
	      return impl();
	    }
	    return null;
	  };
	}

	var SEPARATOR = '.';
	var SUBSEPARATOR = ':';

	/**
	 * Escape and wrap key so it is safe to use as a reactid
	 *
	 * @param {string} key to be escaped.
	 * @return {string} the escaped key.
	 */
	function escape(key) {
	  var escapeRegex = /[=:]/g;
	  var escaperLookup = {
	    '=': '=0',
	    ':': '=2'
	  };
	  var escapedString = ('' + key).replace(escapeRegex, function (match) {
	    return escaperLookup[match];
	  });

	  return '$' + escapedString;
	}

	/**
	 * TODO: Test that a single child and an array with one item have the same key
	 * pattern.
	 */

	var didWarnAboutMaps = false;

	var userProvidedKeyEscapeRegex = /\/+/g;
	function escapeUserProvidedKey(text) {
	  return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
	}

	var POOL_SIZE = 10;
	var traverseContextPool = [];
	function getPooledTraverseContext(mapResult, keyPrefix, mapFunction, mapContext) {
	  if (traverseContextPool.length) {
	    var traverseContext = traverseContextPool.pop();
	    traverseContext.result = mapResult;
	    traverseContext.keyPrefix = keyPrefix;
	    traverseContext.func = mapFunction;
	    traverseContext.context = mapContext;
	    traverseContext.count = 0;
	    return traverseContext;
	  } else {
	    return {
	      result: mapResult,
	      keyPrefix: keyPrefix,
	      func: mapFunction,
	      context: mapContext,
	      count: 0
	    };
	  }
	}

	function releaseTraverseContext(traverseContext) {
	  traverseContext.result = null;
	  traverseContext.keyPrefix = null;
	  traverseContext.func = null;
	  traverseContext.context = null;
	  traverseContext.count = 0;
	  if (traverseContextPool.length < POOL_SIZE) {
	    traverseContextPool.push(traverseContext);
	  }
	}

	/**
	 * @param {?*} children Children tree container.
	 * @param {!string} nameSoFar Name of the key path so far.
	 * @param {!function} callback Callback to invoke with each child found.
	 * @param {?*} traverseContext Used to pass information throughout the traversal
	 * process.
	 * @return {!number} The number of children in this subtree.
	 */
	function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
	  var type = typeof children;

	  if (type === 'undefined' || type === 'boolean') {
	    // All of the above are perceived as null.
	    children = null;
	  }

	  var invokeCallback = false;

	  if (children === null) {
	    invokeCallback = true;
	  } else {
	    switch (type) {
	      case 'string':
	      case 'number':
	        invokeCallback = true;
	        break;
	      case 'object':
	        switch (children.$$typeof) {
	          case REACT_ELEMENT_TYPE:
	          case REACT_PORTAL_TYPE:
	            invokeCallback = true;
	        }
	    }
	  }

	  if (invokeCallback) {
	    callback(traverseContext, children,
	    // If it's the only child, treat the name as if it was wrapped in an array
	    // so that it's consistent if the number of children grows.
	    nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
	    return 1;
	  }

	  var child = void 0;
	  var nextName = void 0;
	  var subtreeCount = 0; // Count of children found in the current subtree.
	  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

	  if (Array.isArray(children)) {
	    for (var i = 0; i < children.length; i++) {
	      child = children[i];
	      nextName = nextNamePrefix + getComponentKey(child, i);
	      subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
	    }
	  } else {
	    var iteratorFn = getIteratorFn(children);
	    if (typeof iteratorFn === 'function') {
	      {
	        // Warn about using Maps as children
	        if (iteratorFn === children.entries) {
	          !didWarnAboutMaps ? warning(false, 'Using Maps as children is unsupported and will likely yield ' + 'unexpected results. Convert it to a sequence/iterable of keyed ' + 'ReactElements instead.%s', ReactDebugCurrentFrame.getStackAddendum()) : void 0;
	          didWarnAboutMaps = true;
	        }
	      }

	      var iterator = iteratorFn.call(children);
	      var step = void 0;
	      var ii = 0;
	      while (!(step = iterator.next()).done) {
	        child = step.value;
	        nextName = nextNamePrefix + getComponentKey(child, ii++);
	        subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
	      }
	    } else if (type === 'object') {
	      var addendum = '';
	      {
	        addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + ReactDebugCurrentFrame.getStackAddendum();
	      }
	      var childrenString = '' + children;
	      invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum);
	    }
	  }

	  return subtreeCount;
	}

	/**
	 * Traverses children that are typically specified as `props.children`, but
	 * might also be specified through attributes:
	 *
	 * - `traverseAllChildren(this.props.children, ...)`
	 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
	 *
	 * The `traverseContext` is an optional argument that is passed through the
	 * entire traversal. It can be used to store accumulations or anything else that
	 * the callback might find relevant.
	 *
	 * @param {?*} children Children tree object.
	 * @param {!function} callback To invoke upon traversing each child.
	 * @param {?*} traverseContext Context for traversal.
	 * @return {!number} The number of children in this subtree.
	 */
	function traverseAllChildren(children, callback, traverseContext) {
	  if (children == null) {
	    return 0;
	  }

	  return traverseAllChildrenImpl(children, '', callback, traverseContext);
	}

	/**
	 * Generate a key string that identifies a component within a set.
	 *
	 * @param {*} component A component that could contain a manual key.
	 * @param {number} index Index that is used if a manual key is not provided.
	 * @return {string}
	 */
	function getComponentKey(component, index) {
	  // Do some typechecking here since we call this blindly. We want to ensure
	  // that we don't block potential future ES APIs.
	  if (typeof component === 'object' && component !== null && component.key != null) {
	    // Explicit key
	    return escape(component.key);
	  }
	  // Implicit key determined by the index in the set
	  return index.toString(36);
	}

	function forEachSingleChild(bookKeeping, child, name) {
	  var func = bookKeeping.func,
	      context = bookKeeping.context;

	  func.call(context, child, bookKeeping.count++);
	}

	/**
	 * Iterates through children that are typically specified as `props.children`.
	 *
	 * See https://reactjs.org/docs/react-api.html#react.children.foreach
	 *
	 * The provided forEachFunc(child, index) will be called for each
	 * leaf child.
	 *
	 * @param {?*} children Children tree container.
	 * @param {function(*, int)} forEachFunc
	 * @param {*} forEachContext Context for forEachContext.
	 */
	function forEachChildren(children, forEachFunc, forEachContext) {
	  if (children == null) {
	    return children;
	  }
	  var traverseContext = getPooledTraverseContext(null, null, forEachFunc, forEachContext);
	  traverseAllChildren(children, forEachSingleChild, traverseContext);
	  releaseTraverseContext(traverseContext);
	}

	function mapSingleChildIntoContext(bookKeeping, child, childKey) {
	  var result = bookKeeping.result,
	      keyPrefix = bookKeeping.keyPrefix,
	      func = bookKeeping.func,
	      context = bookKeeping.context;


	  var mappedChild = func.call(context, child, bookKeeping.count++);
	  if (Array.isArray(mappedChild)) {
	    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
	  } else if (mappedChild != null) {
	    if (isValidElement(mappedChild)) {
	      mappedChild = cloneAndReplaceKey(mappedChild,
	      // Keep both the (mapped) and old keys if they differ, just as
	      // traverseAllChildren used to do for objects as children
	      keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
	    }
	    result.push(mappedChild);
	  }
	}

	function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
	  var escapedPrefix = '';
	  if (prefix != null) {
	    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
	  }
	  var traverseContext = getPooledTraverseContext(array, escapedPrefix, func, context);
	  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
	  releaseTraverseContext(traverseContext);
	}

	/**
	 * Maps children that are typically specified as `props.children`.
	 *
	 * See https://reactjs.org/docs/react-api.html#react.children.map
	 *
	 * The provided mapFunction(child, key, index) will be called for each
	 * leaf child.
	 *
	 * @param {?*} children Children tree container.
	 * @param {function(*, int)} func The map function.
	 * @param {*} context Context for mapFunction.
	 * @return {object} Object containing the ordered map of results.
	 */
	function mapChildren(children, func, context) {
	  if (children == null) {
	    return children;
	  }
	  var result = [];
	  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
	  return result;
	}

	/**
	 * Count the number of children that are typically specified as
	 * `props.children`.
	 *
	 * See https://reactjs.org/docs/react-api.html#react.children.count
	 *
	 * @param {?*} children Children tree container.
	 * @return {number} The number of children.
	 */
	function countChildren(children, context) {
	  return traverseAllChildren(children, emptyFunction.thatReturnsNull, null);
	}

	/**
	 * Flatten a children object (typically specified as `props.children`) and
	 * return an array with appropriately re-keyed children.
	 *
	 * See https://reactjs.org/docs/react-api.html#react.children.toarray
	 */
	function toArray(children) {
	  var result = [];
	  mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
	  return result;
	}

	/**
	 * Returns the first child in a collection of children and verifies that there
	 * is only one child in the collection.
	 *
	 * See https://reactjs.org/docs/react-api.html#react.children.only
	 *
	 * The current implementation of this function assumes that a single child gets
	 * passed without a wrapper, but the purpose of this helper function is to
	 * abstract away the particular structure of children.
	 *
	 * @param {?object} children Child collection structure.
	 * @return {ReactElement} The first and only `ReactElement` contained in the
	 * structure.
	 */
	function onlyChild(children) {
	  !isValidElement(children) ? invariant(false, 'React.Children.only expected to receive a single React element child.') : void 0;
	  return children;
	}

	function createContext(defaultValue, calculateChangedBits) {
	  if (calculateChangedBits === undefined) {
	    calculateChangedBits = null;
	  } else {
	    {
	      !(calculateChangedBits === null || typeof calculateChangedBits === 'function') ? warning(false, 'createContext: Expected the optional second argument to be a ' + 'function. Instead received: %s', calculateChangedBits) : void 0;
	    }
	  }

	  var context = {
	    $$typeof: REACT_CONTEXT_TYPE,
	    _calculateChangedBits: calculateChangedBits,
	    _defaultValue: defaultValue,
	    _currentValue: defaultValue,
	    _changedBits: 0,
	    // These are circular
	    Provider: null,
	    Consumer: null
	  };

	  context.Provider = {
	    $$typeof: REACT_PROVIDER_TYPE,
	    _context: context
	  };
	  context.Consumer = context;

	  {
	    context._currentRenderer = null;
	  }

	  return context;
	}

	function forwardRef(render) {
	  {
	    !(typeof render === 'function') ? warning(false, 'forwardRef requires a render function but was given %s.', render === null ? 'null' : typeof render) : void 0;
	  }

	  return {
	    $$typeof: REACT_FORWARD_REF_TYPE,
	    render: render
	  };
	}

	var describeComponentFrame = function (name, source, ownerName) {
	  return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
	};

	function isValidElementType(type) {
	  return typeof type === 'string' || typeof type === 'function' ||
	  // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
	  type === REACT_FRAGMENT_TYPE || type === REACT_ASYNC_MODE_TYPE || type === REACT_STRICT_MODE_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE);
	}

	function getComponentName(fiber) {
	  var type = fiber.type;

	  if (typeof type === 'function') {
	    return type.displayName || type.name;
	  }
	  if (typeof type === 'string') {
	    return type;
	  }
	  switch (type) {
	    case REACT_FRAGMENT_TYPE:
	      return 'ReactFragment';
	    case REACT_PORTAL_TYPE:
	      return 'ReactPortal';
	    case REACT_CALL_TYPE:
	      return 'ReactCall';
	    case REACT_RETURN_TYPE:
	      return 'ReactReturn';
	  }
	  if (typeof type === 'object' && type !== null) {
	    switch (type.$$typeof) {
	      case REACT_FORWARD_REF_TYPE:
	        var functionName = type.render.displayName || type.render.name || '';
	        return functionName !== '' ? 'ForwardRef(' + functionName + ')' : 'ForwardRef';
	    }
	  }
	  return null;
	}

	/**
	 * ReactElementValidator provides a wrapper around a element factory
	 * which validates the props passed to the element. This is intended to be
	 * used only in DEV and could be replaced by a static type checker for languages
	 * that support it.
	 */

	var currentlyValidatingElement = void 0;
	var propTypesMisspellWarningShown = void 0;

	var getDisplayName = function () {};
	var getStackAddendum = function () {};

	{
	  currentlyValidatingElement = null;

	  propTypesMisspellWarningShown = false;

	  getDisplayName = function (element) {
	    if (element == null) {
	      return '#empty';
	    } else if (typeof element === 'string' || typeof element === 'number') {
	      return '#text';
	    } else if (typeof element.type === 'string') {
	      return element.type;
	    } else if (element.type === REACT_FRAGMENT_TYPE) {
	      return 'React.Fragment';
	    } else {
	      return element.type.displayName || element.type.name || 'Unknown';
	    }
	  };

	  getStackAddendum = function () {
	    var stack = '';
	    if (currentlyValidatingElement) {
	      var name = getDisplayName(currentlyValidatingElement);
	      var owner = currentlyValidatingElement._owner;
	      stack += describeComponentFrame(name, currentlyValidatingElement._source, owner && getComponentName(owner));
	    }
	    stack += ReactDebugCurrentFrame.getStackAddendum() || '';
	    return stack;
	  };
	}

	function getDeclarationErrorAddendum() {
	  if (ReactCurrentOwner.current) {
	    var name = getComponentName(ReactCurrentOwner.current);
	    if (name) {
	      return '\n\nCheck the render method of `' + name + '`.';
	    }
	  }
	  return '';
	}

	function getSourceInfoErrorAddendum(elementProps) {
	  if (elementProps !== null && elementProps !== undefined && elementProps.__source !== undefined) {
	    var source = elementProps.__source;
	    var fileName = source.fileName.replace(/^.*[\\\/]/, '');
	    var lineNumber = source.lineNumber;
	    return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
	  }
	  return '';
	}

	/**
	 * Warn if there's no key explicitly set on dynamic arrays of children or
	 * object keys are not valid. This allows us to keep track of children between
	 * updates.
	 */
	var ownerHasKeyUseWarning = {};

	function getCurrentComponentErrorInfo(parentType) {
	  var info = getDeclarationErrorAddendum();

	  if (!info) {
	    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
	    if (parentName) {
	      info = '\n\nCheck the top-level render call using <' + parentName + '>.';
	    }
	  }
	  return info;
	}

	/**
	 * Warn if the element doesn't have an explicit key assigned to it.
	 * This element is in an array. The array could grow and shrink or be
	 * reordered. All children that haven't already been validated are required to
	 * have a "key" property assigned to it. Error statuses are cached so a warning
	 * will only be shown once.
	 *
	 * @internal
	 * @param {ReactElement} element Element that requires a key.
	 * @param {*} parentType element's parent's type.
	 */
	function validateExplicitKey(element, parentType) {
	  if (!element._store || element._store.validated || element.key != null) {
	    return;
	  }
	  element._store.validated = true;

	  var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
	  if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
	    return;
	  }
	  ownerHasKeyUseWarning[currentComponentErrorInfo] = true;

	  // Usually the current owner is the offender, but if it accepts children as a
	  // property, it may be the creator of the child that's responsible for
	  // assigning it a key.
	  var childOwner = '';
	  if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
	    // Give the component that originally created this child.
	    childOwner = ' It was passed a child from ' + getComponentName(element._owner) + '.';
	  }

	  currentlyValidatingElement = element;
	  {
	    warning(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.%s', currentComponentErrorInfo, childOwner, getStackAddendum());
	  }
	  currentlyValidatingElement = null;
	}

	/**
	 * Ensure that every element either is passed in a static location, in an
	 * array with an explicit keys property defined, or in an object literal
	 * with valid key property.
	 *
	 * @internal
	 * @param {ReactNode} node Statically passed child of any type.
	 * @param {*} parentType node's parent's type.
	 */
	function validateChildKeys(node, parentType) {
	  if (typeof node !== 'object') {
	    return;
	  }
	  if (Array.isArray(node)) {
	    for (var i = 0; i < node.length; i++) {
	      var child = node[i];
	      if (isValidElement(child)) {
	        validateExplicitKey(child, parentType);
	      }
	    }
	  } else if (isValidElement(node)) {
	    // This element was passed in a valid location.
	    if (node._store) {
	      node._store.validated = true;
	    }
	  } else if (node) {
	    var iteratorFn = getIteratorFn(node);
	    if (typeof iteratorFn === 'function') {
	      // Entry iterators used to provide implicit keys,
	      // but now we print a separate warning for them later.
	      if (iteratorFn !== node.entries) {
	        var iterator = iteratorFn.call(node);
	        var step = void 0;
	        while (!(step = iterator.next()).done) {
	          if (isValidElement(step.value)) {
	            validateExplicitKey(step.value, parentType);
	          }
	        }
	      }
	    }
	  }
	}

	/**
	 * Given an element, validate that its props follow the propTypes definition,
	 * provided by the type.
	 *
	 * @param {ReactElement} element
	 */
	function validatePropTypes(element) {
	  var componentClass = element.type;
	  if (typeof componentClass !== 'function') {
	    return;
	  }
	  var name = componentClass.displayName || componentClass.name;
	  var propTypes = componentClass.propTypes;
	  if (propTypes) {
	    currentlyValidatingElement = element;
	    checkPropTypes(propTypes, element.props, 'prop', name, getStackAddendum);
	    currentlyValidatingElement = null;
	  } else if (componentClass.PropTypes !== undefined && !propTypesMisspellWarningShown) {
	    propTypesMisspellWarningShown = true;
	    warning(false, 'Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', name || 'Unknown');
	  }
	  if (typeof componentClass.getDefaultProps === 'function') {
	    !componentClass.getDefaultProps.isReactClassApproved ? warning(false, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.') : void 0;
	  }
	}

	/**
	 * Given a fragment, validate that it can only be provided with fragment props
	 * @param {ReactElement} fragment
	 */
	function validateFragmentProps(fragment) {
	  currentlyValidatingElement = fragment;

	  var keys = Object.keys(fragment.props);
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (key !== 'children' && key !== 'key') {
	      warning(false, 'Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.%s', key, getStackAddendum());
	      break;
	    }
	  }

	  if (fragment.ref !== null) {
	    warning(false, 'Invalid attribute `ref` supplied to `React.Fragment`.%s', getStackAddendum());
	  }

	  currentlyValidatingElement = null;
	}

	function createElementWithValidation(type, props, children) {
	  var validType = isValidElementType(type);

	  // We warn in this case but don't throw. We expect the element creation to
	  // succeed and there will likely be errors in render.
	  if (!validType) {
	    var info = '';
	    if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
	      info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
	    }

	    var sourceInfo = getSourceInfoErrorAddendum(props);
	    if (sourceInfo) {
	      info += sourceInfo;
	    } else {
	      info += getDeclarationErrorAddendum();
	    }

	    info += getStackAddendum() || '';

	    var typeString = void 0;
	    if (type === null) {
	      typeString = 'null';
	    } else if (Array.isArray(type)) {
	      typeString = 'array';
	    } else {
	      typeString = typeof type;
	    }

	    warning(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
	  }

	  var element = createElement.apply(this, arguments);

	  // The result can be nullish if a mock or a custom function is used.
	  // TODO: Drop this when these are no longer allowed as the type argument.
	  if (element == null) {
	    return element;
	  }

	  // Skip key warning if the type isn't valid since our key validation logic
	  // doesn't expect a non-string/function type and can throw confusing errors.
	  // We don't want exception behavior to differ between dev and prod.
	  // (Rendering will throw with a helpful message and as soon as the type is
	  // fixed, the key warnings will appear.)
	  if (validType) {
	    for (var i = 2; i < arguments.length; i++) {
	      validateChildKeys(arguments[i], type);
	    }
	  }

	  if (type === REACT_FRAGMENT_TYPE) {
	    validateFragmentProps(element);
	  } else {
	    validatePropTypes(element);
	  }

	  return element;
	}

	function createFactoryWithValidation(type) {
	  var validatedFactory = createElementWithValidation.bind(null, type);
	  validatedFactory.type = type;
	  // Legacy hook: remove it
	  {
	    Object.defineProperty(validatedFactory, 'type', {
	      enumerable: false,
	      get: function () {
	        lowPriorityWarning$1(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');
	        Object.defineProperty(this, 'type', {
	          value: type
	        });
	        return type;
	      }
	    });
	  }

	  return validatedFactory;
	}

	function cloneElementWithValidation(element, props, children) {
	  var newElement = cloneElement.apply(this, arguments);
	  for (var i = 2; i < arguments.length; i++) {
	    validateChildKeys(arguments[i], newElement.type);
	  }
	  validatePropTypes(newElement);
	  return newElement;
	}

	var React = {
	  Children: {
	    map: mapChildren,
	    forEach: forEachChildren,
	    count: countChildren,
	    toArray: toArray,
	    only: onlyChild
	  },

	  createRef: createRef,
	  Component: Component,
	  PureComponent: PureComponent,

	  createContext: createContext,
	  forwardRef: forwardRef,

	  Fragment: REACT_FRAGMENT_TYPE,
	  StrictMode: REACT_STRICT_MODE_TYPE,
	  unstable_AsyncMode: REACT_ASYNC_MODE_TYPE,

	  createElement: createElementWithValidation,
	  cloneElement: cloneElementWithValidation,
	  createFactory: createFactoryWithValidation,
	  isValidElement: isValidElement,

	  version: ReactVersion,

	  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
	    ReactCurrentOwner: ReactCurrentOwner,
	    // Used by renderers to avoid bundling object-assign twice in UMD bundles:
	    assign: _assign
	  }
	};

	{
	  _assign(React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, {
	    // These should not be included in production.
	    ReactDebugCurrentFrame: ReactDebugCurrentFrame,
	    // Shim for React DOM 16.0.0 which still destructured (but not used) this.
	    // TODO: remove in React 17.0.
	    ReactComponentTreeHook: {}
	  });
	}



	var React$2 = Object.freeze({
		default: React
	});

	var React$3 = ( React$2 && React ) || React$2;

	// TODO: decide on the top-level export form.
	// This is hacky but makes it work with both Rollup and Jest.
	var react = React$3['default'] ? React$3['default'] : React$3;

	module.exports = react;
	  })();
	}
	});

	var react = createCommonjsModule(function (module) {

	{
	  module.exports = react_development;
	}
	});
	var react_1 = react.React;
	var react_2 = react.cloneElement;
	var react_3 = react.createElement;
	var react_4 = react.PropTypes;
	var react_5 = react.Children;
	var react_6 = react.Component;

	var htmlTags = [
		"a",
		"abbr",
		"address",
		"area",
		"article",
		"aside",
		"audio",
		"b",
		"base",
		"bdi",
		"bdo",
		"blockquote",
		"body",
		"br",
		"button",
		"canvas",
		"caption",
		"cite",
		"code",
		"col",
		"colgroup",
		"data",
		"datalist",
		"dd",
		"del",
		"details",
		"dfn",
		"dialog",
		"div",
		"dl",
		"dt",
		"em",
		"embed",
		"fieldset",
		"figcaption",
		"figure",
		"footer",
		"form",
		"h1",
		"h2",
		"h3",
		"h4",
		"h5",
		"h6",
		"head",
		"header",
		"hgroup",
		"hr",
		"html",
		"i",
		"iframe",
		"img",
		"input",
		"ins",
		"kbd",
		"keygen",
		"label",
		"legend",
		"li",
		"link",
		"main",
		"map",
		"mark",
		"math",
		"menu",
		"menuitem",
		"meta",
		"meter",
		"nav",
		"noscript",
		"object",
		"ol",
		"optgroup",
		"option",
		"output",
		"p",
		"param",
		"picture",
		"pre",
		"progress",
		"q",
		"rb",
		"rp",
		"rt",
		"rtc",
		"ruby",
		"s",
		"samp",
		"script",
		"section",
		"select",
		"slot",
		"small",
		"source",
		"span",
		"strong",
		"style",
		"sub",
		"summary",
		"sup",
		"svg",
		"table",
		"tbody",
		"td",
		"template",
		"textarea",
		"tfoot",
		"th",
		"thead",
		"time",
		"title",
		"tr",
		"track",
		"u",
		"ul",
		"var",
		"video",
		"wbr"
	]
	;

	var htmlTags$1 = /*#__PURE__*/Object.freeze({
		default: htmlTags
	});

	var require$$0 = ( htmlTags$1 && htmlTags ) || htmlTags$1;

	var htmlTags$2 = require$$0;

	var dist$1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Tag = exports.omit = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



	var _react2 = _interopRequireDefault(react);





	var _htmlTags2 = _interopRequireDefault(htmlTags$2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var allPropTypes = Object.keys(dist.propTypes).reduce(function (a, key) {
	  return Object.assign(a, dist.propTypes[key]);
	}, {});

	var blacklist = Object.keys(allPropTypes);

	var omit = exports.omit = function omit(obj, keys) {
	  var next = {};
	  for (var key in obj) {
	    if (keys.indexOf(key) > -1) continue;
	    next[key] = obj[key];
	  }
	  return next;
	};

	var Tag = exports.Tag = function (_React$Component) {
	  _inherits(Tag, _React$Component);

	  function Tag() {
	    _classCallCheck(this, Tag);

	    return _possibleConstructorReturn(this, (Tag.__proto__ || Object.getPrototypeOf(Tag)).apply(this, arguments));
	  }

	  _createClass(Tag, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          innerRef = _props.innerRef,
	          is = _props.is,
	          blacklist = _props.blacklist,
	          theme = _props.theme,
	          props = _objectWithoutProperties(_props, ['innerRef', 'is', 'blacklist', 'theme']);

	      var attr = omit(props, blacklist);

	      return _react2.default.createElement(is, _extends({
	        ref: innerRef
	      }, attr));
	    }
	  }]);

	  return Tag;
	}(_react2.default.Component);

	Tag.displayName = 'Clean.div';

	Tag.defaultProps = {
	  is: 'div',
	  blacklist: blacklist

	  // Trick styled-components into passing innerRef
	};Tag.styledComponentId = 'lol';

	_htmlTags2.default.forEach(function (tag) {
	  Tag[tag] = function (props) {
	    return _react2.default.createElement(Tag, _extends({ is: tag }, props));
	  };
	  Tag[tag].displayName = 'Clean.' + tag;
	});

	exports.default = Tag;
	});

	unwrapExports(dist$1);
	var dist_1$1 = dist$1.Tag;
	var dist_2$1 = dist$1.omit;

	var theme_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var breakpoints = ['40em', '52em', '64em'];

	var space = [0, 4, 8, 16, 32, 64, 128, 256, 512];

	var fontSizes = [12, 14, 16, 20, 24, 32, 48, 64, 96, 128];

	var theme = {
	  breakpoints: breakpoints,
	  space: space,
	  fontSizes: fontSizes
	};

	exports.default = theme;
	});

	unwrapExports(theme_1);

	var Box_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



	var _styledComponents2 = _interopRequireDefault(styled__default);





	var _cleanTag2 = _interopRequireDefault(dist$1);



	var _theme2 = _interopRequireDefault(theme_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Box = (0, _styledComponents2.default)(_cleanTag2.default)([], { boxSizing: 'border-box' }, dist.width, dist.space, dist.fontSize, dist.color, dist.flex, dist.order, dist.alignSelf);

	Box.displayName = 'Box';

	Box.defaultProps = {
	  theme: _theme2.default
	};

	Box.propTypes = _extends({}, dist.width.propTypes, dist.space.propTypes, dist.fontSize.propTypes, dist.color.propTypes, dist.flex.propTypes, dist.order.propTypes, dist.alignSelf.propTypes);

	exports.default = Box;
	});

	unwrapExports(Box_1);

	var Flex_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };





	var _Box2 = _interopRequireDefault(Box_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Flex = _Box2.default.extend([], { display: 'flex' }, dist.flexWrap, dist.flexDirection, dist.alignItems, dist.justifyContent);

	Flex.displayName = 'Flex';

	Flex.propTypes = _extends({}, dist.flexWrap.propTypes, dist.flexDirection.propTypes, dist.alignItems.propTypes, dist.justifyContent.propTypes);

	exports.default = Flex;
	});

	unwrapExports(Flex_1);

	var dist$3 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});



	Object.defineProperty(exports, 'Box', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(Box_1).default;
	  }
	});



	Object.defineProperty(exports, 'Flex', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(Flex_1).default;
	  }
	});



	Object.defineProperty(exports, 'theme', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(theme_1).default;
	  }
	});



	Object.defineProperty(exports, 'div', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(dist$1).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	});

	unwrapExports(dist$3);
	var dist_1$2 = dist$3.Flex;
	var dist_2$2 = dist$3.Box;

	var createMediaQuery = function createMediaQuery(n) {
	  return "@media screen and (min-width:".concat(n, "em)");
	};

	var addAliases = function addAliases(arr, aliases) {
	  return aliases.forEach(function (key, i) {
	    return Object.defineProperty(arr, key, {
	      enumerable: false,
	      get: function get() {
	        return this[i];
	      }
	    });
	  });
	};

	var breakpoints = [32, 48, 64, 80].map(function (n) {
	  return n + 'em';
	});
	var mediaQueries = breakpoints.map(createMediaQuery);
	var aliases = ['sm', 'md', 'lg', 'xl'];
	addAliases(breakpoints, aliases);
	addAliases(mediaQueries, aliases);
	var colors = {
	  black: '#000',
	  white: '#fff',
	  darken: ['rgba(0, 0, 0, 0.125)', 'rgba(0, 0, 0, 0.25)', 'rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.75)'],
	  text: '#4A4A4A',
	  red: '#D51939',
	  darkRed: '#AD1932',
	  teal: '#50A9BF',
	  maroon: '#432544',
	  green: '#3FC37F',
	  orange: '#F5A02A',
	  neonRed: '#FD6850',
	  grey: ['#F8FAFB', '#E8EDEF', '#C5CBCD', '#7B878B', '#475053', '#303739'],
	  blue: ['#D7EFFB', '#469AF4', '#0A4D6D'],
	  lightGreen: ['#91D0C2', '#46BCA9'],
	  yellow: ['#F5EBD0', '#FFD20F']
	};
	var fonts = {
	  sans: '"Lato", system-ui, sans-serif',
	  mono: '"SF Mono", "Roboto Mono", Menlo, monospace'
	};
	var fontSizes = [12, 14, 16, 20, 24, 32, 48, 64, 72, 96];
	var fontWeights = {
	  normal: 400,
	  bold: 700
	};
	var radii = [0, 2, 4];
	var borders = [0, "1px solid ".concat(colors.grey[1]), "2px solid ".concat(colors.grey[1])];
	var shadows = ['none', "inset 0 0 0 1px ".concat(colors.grey[1]), "inset 0 0 0 1px ".concat(colors.grey[1], ", 0 0 4px ").concat(colors.grey[1])];
	var boxShadows = ["0 0 2px 0 rgba(0,0,0,.08),0 1px 4px 0 rgba(0,0,0,.16)", "0 0 2px 0 rgba(0,0,0,.08),0 2px 8px 0 rgba(0,0,0,.16)", "0 0 2px 0 rgba(0,0,0,.08),0 4px 16px 0 rgba(0,0,0,.16)", "0 0 2px 0 rgba(0,0,0,.08),0 8px 32px 0 rgba(0,0,0,.16)"];
	var space$1 = [0, 4, 8, 16, 32, 64, 128];
	var theme$1 = {
	  breakpoints: breakpoints,
	  mediaQueries: mediaQueries,
	  borders: borders,
	  colors: colors,
	  fonts: fonts,
	  fontSizes: fontSizes,
	  fontWeights: fontWeights,
	  radii: radii,
	  shadows: shadows,
	  space: space$1,
	  boxShadows: boxShadows
	};

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	}

	function _extends() {
	  _extends = Object.assign || function (target) {
	    for (var i = 1; i < arguments.length; i++) {
	      var source = arguments[i];

	      for (var key in source) {
	        if (Object.prototype.hasOwnProperty.call(source, key)) {
	          target[key] = source[key];
	        }
	      }
	    }

	    return target;
	  };

	  return _extends.apply(this, arguments);
	}

	function _objectWithoutProperties(source, excluded) {
	  if (source == null) return {};
	  var target = {};
	  var sourceKeys = Object.keys(source);
	  var key, i;

	  for (i = 0; i < sourceKeys.length; i++) {
	    key = sourceKeys[i];
	    if (excluded.indexOf(key) >= 0) continue;
	    target[key] = source[key];
	  }

	  if (Object.getOwnPropertySymbols) {
	    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

	    for (i = 0; i < sourceSymbolKeys.length; i++) {
	      key = sourceSymbolKeys[i];
	      if (excluded.indexOf(key) >= 0) continue;
	      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
	      target[key] = source[key];
	    }
	  }

	  return target;
	}

	function _taggedTemplateLiteral(strings, raw) {
	  if (!raw) {
	    raw = strings.slice(0);
	  }

	  return Object.freeze(Object.defineProperties(strings, {
	    raw: {
	      value: Object.freeze(raw)
	    }
	  }));
	}

	var System_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };



	var _react2 = _interopRequireDefault(react);





	var _cleanTag2 = _interopRequireDefault(dist$1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var funcNames = Object.keys(dist.styles);
	var unique = function unique(arr) {
	  return [].concat(_toConsumableArray(new Set(arr)));
	};
	var isPOJO = function isPOJO(n) {
	  return (typeof n === 'undefined' ? 'undefined' : _typeof(n)) === 'object' && n !== null && !Array.isArray(n);
	};

	var dict = Object.keys(dist.styles).map(function (key) {
	  return {
	    key: key,
	    propNames: Object.keys(dist.styles[key].propTypes || {})
	  };
	}).reduce(function (acc, b) {
	  var vals = b.propNames.reduce(function (a, name) {
	    return _extends({}, a, _defineProperty({}, name, b.key));
	  }, {});
	  return _extends({}, acc, vals);
	}, {});

	var getPropKeys = function getPropKeys(defaultProps) {
	  return Object.keys(defaultProps || {}).map(function (key) {
	    return dict[key];
	  }).filter(function (key) {
	    return !!key;
	  });
	};

	var getFuncs = function getFuncs(keys) {
	  return keys.map(function (f) {
	    return dist.styles[f] || f;
	  }).reduce(function (a, f) {
	    return Array.isArray(f) ? [].concat(_toConsumableArray(a), _toConsumableArray(f)) : [].concat(_toConsumableArray(a), [f]);
	  }, []);
	};

	var getPropTypes = function getPropTypes(keys) {
	  return keys.filter(function (key) {
	    return typeof key === 'string';
	  }).filter(function (key) {
	    return typeof dist.styles[key] === 'function';
	  }).map(function (key) {
	    return dist.styles[key].propTypes || {};
	  }).reduce(function (a, propType) {
	    return _extends({}, a, propType);
	  }, {});
	};

	var System = function System(opts) {
	  _classCallCheck(this, System);

	  var createComponent = opts.createComponent;


	  this.create = function () {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    var first = args[0],
	        rest = args.slice(1);


	    var defaultProps = isPOJO(first) ? first : null;
	    var propKeys = getPropKeys(defaultProps);
	    var funcsOrKeys = defaultProps ? rest : args;
	    var combined = unique([].concat(_toConsumableArray(propKeys), _toConsumableArray(funcsOrKeys)));
	    var funcs = getFuncs(combined);
	    var propTypes = getPropTypes(combined);

	    var blacklist = Object.keys(propTypes);
	    if (defaultProps && Array.isArray(defaultProps.blacklist)) {
	      blacklist.push.apply(blacklist, _toConsumableArray(defaultProps.blacklist));
	      delete defaultProps.blacklist;
	    }

	    var div = function div(props) {
	      return _react2.default.createElement(_cleanTag2.default, props);
	    };
	    div.defaultProps = { blacklist: blacklist };

	    var Component = createComponent(div).apply(undefined, _toConsumableArray(funcs));

	    Component.defaultProps = defaultProps;
	    Component.propTypes = propTypes;

	    return Component;
	  };

	  return this.create;
	};

	exports.default = System;
	});

	unwrapExports(System_1);

	var dist$4 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});



	var _styledComponents2 = _interopRequireDefault(styled__default);



	var _System2 = _interopRequireDefault(System_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var create = new _System2.default({
	  createComponent: function createComponent(type) {
	    return function () {
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      return (0, _styledComponents2.default)(type).apply(undefined, [[]].concat(args));
	    };
	  }
	});

	exports.default = create;
	});

	var system = unwrapExports(dist$4);

	var Text = system({
	  m: 0
	}, 'space', 'color', 'fontSize', 'fontWeight', 'textAlign', 'lineHeight', 'borders');
	Text.displayName = 'Text';

	var Blockquote = function Blockquote(props) {
	  return react_3(Text, _extends({
	    is: "blockquote",
	    fontSize: 3,
	    m: 0,
	    pl: 2,
	    borderLeft: 2
	  }, props));
	};
	Blockquote.displayName = 'Blockquote';

	var Button = system({
	  is: 'button',
	  borderColor: 'red',
	  fontSize: 2,
	  fontWeight: 'bold',
	  lineHeight: 16 / 14,
	  m: 0,
	  px: 3,
	  py: 2,
	  borderRadius: 4
	}, function (props) {
	  return {
	    fontFamily: 'inherit',
	    WebkitFontSmoothing: 'antialiased',
	    display: 'inline-block',
	    verticalAlign: 'middle',
	    textAlign: 'center',
	    textDecoration: 'none',
	    appearance: 'none',
	    backgroundColor: props.type === 'primary' ? dist_4('colors.red')(props) : dist_4('colors.white')(props),
	    color: props.type === 'primary' ? dist_4('colors.white')(props) : dist_4('colors.red')(props),
	    '&:hover': {
	      boxShadow: "inset 0 0 0 999px ".concat(dist_4('colors.darken.0')(props))
	    },
	    '&:disabled': {
	      opacity: 1 / 4
	    }
	  };
	}, 'color');
	Button.displayName = 'Button';

	var ButtonOutline = styled__default(Button)([], function (props) {
	  return {
	    boxShadow: "inset 0 0 0 2px",
	    '&:hover': {
	      color: 'white',
	      backgroundColor: dist_4('colors.red')(props)
	    },
	    '&:focus': {
	      boxShadow: "inset 0 0 0 2px, 0 0 0 2px"
	    },
	    '&:active': {
	      color: 'white',
	      backgroundColor: dist_4('colors.red')(props),
	      boxShadow: "inset 0 0 0 2px ".concat(dist_4('colors.' + props.color)(props), ", inset 0 0 8px ").concat(dist_4('colors.darken.1')(props))
	    }
	  };
	});
	ButtonOutline.displayName = 'ButtonOutline';
	ButtonOutline.defaultProps = {
	  color: 'red',
	  bg: 'transparent'
	};

	function _templateObject() {
	  var data = _taggedTemplateLiteral(["\n  ", ";\n  ", ";\n  ", ";\n"]);

	  _templateObject = function _templateObject() {
	    return data;
	  };

	  return data;
	}

	var boxShadow = function boxShadow(props) {
	  var boxShadows = {
	    sm: {
	      'box-shadow': props.theme.boxShadows[0]
	    },
	    md: {
	      'box-shadow': props.theme.boxShadows[1]
	    },
	    lg: {
	      'box-shadow': props.theme.boxShadows[2]
	    },
	    xl: {
	      'box-shadow': props.theme.boxShadows[3]
	    }
	  };
	  return boxShadows[props.boxShadowSize];
	};

	var boxBorder = function boxBorder(props) {
	  return {
	    border: "".concat(props.borderWidth, "px solid ").concat(dist_4('colors.' + props.borderColor)(props))
	  };
	};

	var Card$$1 = styled__default(dist_2$2)(_templateObject(), boxShadow, boxBorder, dist_29);
	Card$$1.defaultProps = {
	  borderColor: 'grey.0',
	  borderRadius: 1,
	  borderWidth: 1,
	  theme: theme$1
	};
	Card$$1.displayName = 'Card';

	function _templateObject$1() {
	  var data = _taggedTemplateLiteral(["\n  font-family: 'Roboto Mono', monospace;\n  ", ";\n  ", ";\n"]);

	  _templateObject$1 = function _templateObject() {
	    return data;
	  };

	  return data;
	}
	var Code = styled__default.code(_templateObject$1(), dist_70, dist_73);
	Code.displayName = 'Code';
	Code.defaultProps = {
	  fontSize: 2,
	  color: 'blue'
	};

	var Container$$1 = system({
	  is: dist_2$2,
	  px: 3,
	  mx: 'auto',
	  maxWidth: 1024
	}, 'maxWidth');
	Container$$1.displayName = 'Container';

	var Heading = Text.withComponent('h3');
	Heading.displayName = 'Heading';
	Heading.defaultProps = {
	  regular: true,
	  fontSize: 4,
	  m: 0,
	  theme: theme$1
	};
	Heading.h1 = Heading.withComponent('h1');
	Heading.h1.defaultProps = {
	  bold: true,
	  fontSize: 6,
	  m: 0
	};
	Heading.h1.displayName = 'Heading.h1';
	Heading.h2 = Heading.withComponent('h2');
	Heading.h2.defaultProps = {
	  bold: true,
	  fontSize: 5,
	  m: 0
	};
	Heading.h2.displayName = 'Heading.h2';
	Heading.h3 = Heading.withComponent('h3');
	Heading.h3.defaultProps = {
	  regular: true,
	  fontSize: 4,
	  m: 0
	};
	Heading.h3.displayName = 'Heading.h3';
	Heading.h4 = Heading.withComponent('h4');
	Heading.h4.defaultProps = {
	  regular: true,
	  fontSize: 3,
	  m: 0
	};
	Heading.h4.displayName = 'Heading.h4';
	Heading.h5 = Heading.withComponent('h5');
	Heading.h5.defaultProps = {
	  bold: true,
	  fontSize: 2,
	  m: 0
	};
	Heading.h5.displayName = 'Heading.h5';
	Heading.h6 = Heading.withComponent('h6');
	Heading.h6.defaultProps = {
	  bold: true,
	  caps: true,
	  fontSize: 0,
	  m: 0
	};
	Heading.h6.displayName = 'Heading.h6';

	function _templateObject$2() {
	  var data = _taggedTemplateLiteral(["\n  ", ";\n  ", ";\n  ", ";\n  ", ";\n  ", ";\n"]);

	  _templateObject$2 = function _templateObject() {
	    return data;
	  };

	  return data;
	}

	var getMaxWidth = function getMaxWidth(em) {
	  return em - 0.01;
	};

	var breakpoints$1 = function breakpoints(_ref) {
	  var breakpoints = _ref.theme.breakpoints;
	  return {
	    xs: "@media screen and (max-width: ".concat(getMaxWidth(breakpoints[0]), "em)"),
	    sm: "@media screen and (min-width: ".concat(breakpoints[0], "em) and (max-width: ").concat(getMaxWidth(breakpoints[1]), "em)"),
	    md: "@media screen and (min-width: ".concat(breakpoints[1], "em) and (max-width: ").concat(getMaxWidth(breakpoints[2]), "em)"),
	    lg: "@media screen and (min-width: ".concat(breakpoints[2], "em) and (max-width: ").concat(getMaxWidth(breakpoints[3]), "em)"),
	    xl: "@media screen and (min-width: ".concat(breakpoints[3], "em)")
	  };
	};

	var hidden = function hidden(key) {
	  return function (props) {
	    return props[key] ? _defineProperty({}, breakpoints$1(props)[key], {
	      display: 'none'
	    }) : null;
	  };
	};

	var Hide$$1 = styled__default(dist_2$2)(_templateObject$2(), hidden('xs'), hidden('sm'), hidden('md'), hidden('lg'), hidden('xl'));
	Hide$$1.displayName = 'Hide';

	function _templateObject$3() {
	  var data = _taggedTemplateLiteral(["\n  appearance: none;\n  display: block;\n  width: 100%;\n  font-family: inherit;\n  color: inherit;\n  font-size: ", "px;\n  background-color: transparent;\n  border-radius: ", ";\n  border-width: 0px;\n  border-style: solid;\n  border-color: ", ";\n  padding-top: 14px;\n  padding-bottom: 14px;\n  padding-left: 12px;\n  padding-right: 12px;\n  margin: 0;\n  ::placeholder {\n    color: ", ";\n  }\n  ::-ms-clear {\n    display: none;\n  }\n  ", ";\n  ", ";\n"]);

	  _templateObject$3 = function _templateObject() {
	    return data;
	  };

	  return data;
	}

	var borders$1 = function borders(_ref) {
	  var color = _ref.color,
	      theme = _ref.theme;
	  var borderColor = color ? theme.colors[color] : theme.colors.grey[1];
	  var focusColor = color ? borderColor : theme.colors.blue[0];
	  return {
	    'border-color': borderColor,
	    'box-shadow': "0 0 0 1px ".concat(borderColor),
	    ':focus': {
	      outline: 0,
	      'border-color': focusColor,
	      'box-shadow': "0 0 0 2px ".concat(focusColor)
	    }
	  };
	};

	var Input = styled__default.input(_templateObject$3(), dist_3('fontSizes.1'), dist_3('radius'), dist_3('colors.grey.1'), dist_3('colors.gray.1'), borders$1, dist_75);
	Input.displayName = 'Input';

	function Lead(props) {
	  return react_3(Text, _extends({
	    is: "p",
	    fontSize: 3,
	    lineHeight: 1.25
	  }, props));
	}
	Lead.displayName = 'Lead';

	function _templateObject$4() {
	  var data = _taggedTemplateLiteral(["\n  cursor: pointer;\n  text-decoration: none;\n  ", ";\n  &:hover {\n    text-decoration: underline;\n  }\n"]);

	  _templateObject$4 = function _templateObject() {
	    return data;
	  };

	  return data;
	}
	var Link = styled__default.a(_templateObject$4(), dist_70);
	Link.displayName = 'Link';
	Link.propTypes = {
	  color: propTypes.string
	};
	Link.defaultProps = {
	  color: 'blue.1',
	  theme: theme$1
	};

	var Measure = system({
	  is: Text,
	  maxWidth: '32em'
	}, 'maxWidth');
	Measure.displayName = 'Measure';

	var NavLink = system({
	  is: 'a',
	  color: 'inherit',
	  bg: 'transparent',
	  fontSize: 1,
	  fontWeight: 'bold',
	  p: 2
	}, function () {
	  return {
	    display: 'inline-flex',
	    alignItems: 'center',
	    alignSelf: 'stretch',
	    textDecoration: 'none',
	    whiteSpace: 'nowrap',
	    cursor: 'pointer',
	    '&:disabled': {
	      opacity: 1 / 4
	    }
	  };
	}, 'width');
	NavLink.displayName = 'NavLink';

	var Pre = system({
	  is: 'pre',
	  fontSize: 1,
	  fontFamily: 'mono',
	  m: 0
	}, {
	  overflow: 'auto'
	}, 'fontFamily', 'space', 'color');
	Pre.displayName = 'Pre';

	var Root = system({
	  fontFamily: 'sans'
	}, 'fontFamily', {
	  '& *': {
	    boxSizing: 'border-box'
	  }
	}, 'space', 'color');
	Root.displayName = 'Root';

	var Provider = function Provider(_ref) {
	  var _ref$theme = _ref.theme,
	      theme$$1 = _ref$theme === void 0 ? {} : _ref$theme,
	      props = _objectWithoutProperties(_ref, ["theme"]);

	  return react_3(styled.ThemeProvider, {
	    theme: Object.assign({}, theme$1, theme$$1)
	  }, react_3(Root, props));
	};
	Provider.displayName = 'Vulpes.Provider';

	var Truncate = system({
	  is: Text
	}, {
	  overflow: 'hidden',
	  whiteSpace: 'nowrap',
	  textOverflow: 'ellipsis'
	});
	Truncate.displayName = 'Truncate';

	var Position = system('space', 'color', 'zIndex', 'top', 'right', 'bottom', 'left');
	Position.displayName = 'Position';
	var Relative = system({
	  is: Position
	}, {
	  position: 'relative'
	});
	Relative.displayName = 'Relative';
	var Absolute = system({
	  is: Position
	}, {
	  position: 'absolute'
	});
	Absolute.displayName = 'Absolute';
	var Fixed = system({
	  is: Position
	}, {
	  position: 'fixed'
	});
	Fixed.displayName = 'Fixed';
	var Sticky = system({
	  is: Position
	}, {
	  position: 'sticky'
	});
	Sticky.displayName = 'Sticky';

	exports.Flex = dist_1$2;
	exports.Box = dist_2$2;
	exports.theme = theme$1;
	exports.Blockquote = Blockquote;
	exports.Button = Button;
	exports.ButtonOutline = ButtonOutline;
	exports.Card = Card$$1;
	exports.Code = Code;
	exports.Container = Container$$1;
	exports.Heading = Heading;
	exports.Hide = Hide$$1;
	exports.Input = Input;
	exports.Lead = Lead;
	exports.Link = Link;
	exports.Measure = Measure;
	exports.NavLink = NavLink;
	exports.Pre = Pre;
	exports.Provider = Provider;
	exports.Root = Root;
	exports.Text = Text;
	exports.Truncate = Truncate;
	exports.Position = Position;
	exports.Relative = Relative;
	exports.Absolute = Absolute;
	exports.Fixed = Fixed;
	exports.Sticky = Sticky;

	Object.defineProperty(exports, '__esModule', { value: true });

})));

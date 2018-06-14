(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.vulpes = {})));
}(this, (function (exports) { 'use strict';

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	/*!
	 * isobject <https://github.com/jonschlinkert/isobject>
	 *
	 * Copyright (c) 2014-2017, Jon Schlinkert.
	 * Released under the MIT License.
	 */

	var isobject = function isObject(val) {
	  return val != null && typeof val === 'object' && Array.isArray(val) === false;
	};

	function isObjectObject(o) {
	  return isobject(o) === true
	    && Object.prototype.toString.call(o) === '[object Object]';
	}

	var isPlainObject = function isPlainObject(o) {
	  var ctor,prot;

	  if (isObjectObject(o) === false) return false;

	  // If has modified constructor
	  ctor = o.constructor;
	  if (typeof ctor !== 'function') return false;

	  // If has modified prototype
	  prot = ctor.prototype;
	  if (isObjectObject(prot) === false) return false;

	  // If constructor does not have an Object-specific method
	  if (prot.hasOwnProperty('isPrototypeOf') === false) {
	    return false;
	  }

	  // Most likely a plain Object
	  return true;
	};

	var stylis = createCommonjsModule(function (module, exports) {
	/*
	 *          __        ___
	 *    _____/ /___  __/ (_)____
	 *   / ___/ __/ / / / / / ___/
	 *  (__  ) /_/ /_/ / / (__  )
	 * /____/\__/\__, /_/_/____/
	 *          /____/
	 *
	 * light - weight css preprocessor @licence MIT
	 */
	(function (factory) {/* eslint-disable */
		module['exports'] = factory(null);
	}(/** @param {*=} options */function factory (options) {/* eslint-disable */

		/**
		 * Notes
		 *
		 * The ['<method name>'] pattern is used to support closure compiler
		 * the jsdoc signatures are also used to the same effect
		 *
		 * ----
		 *
		 * int + int + int === n4 [faster]
		 *
		 * vs
		 *
		 * int === n1 && int === n2 && int === n3
		 *
		 * ----
		 *
		 * switch (int) { case ints...} [faster]
		 *
		 * vs
		 *
		 * if (int == 1 && int === 2 ...)
		 *
		 * ----
		 *
		 * The (first*n1 + second*n2 + third*n3) format used in the property parser
		 * is a simple way to hash the sequence of characters
		 * taking into account the index they occur in
		 * since any number of 3 character sequences could produce duplicates.
		 *
		 * On the other hand sequences that are directly tied to the index of the character
		 * resolve a far more accurate measure, it's also faster
		 * to evaluate one condition in a switch statement
		 * than three in an if statement regardless of the added math.
		 *
		 * This allows the vendor prefixer to be both small and fast.
		 */

		var nullptn = /^\0+/g; /* matches leading null characters */
		var formatptn = /[\0\r\f]/g; /* matches new line, null and formfeed characters */
		var colonptn = /: */g; /* splits animation rules */
		var cursorptn = /zoo|gra/; /* assert cursor varient */
		var transformptn = /([,: ])(transform)/g; /* vendor prefix transform, older webkit */
		var animationptn = /,+\s*(?![^(]*[)])/g; /* splits multiple shorthand notation animations */
		var propertiesptn = / +\s*(?![^(]*[)])/g; /* animation properties */
		var elementptn = / *[\0] */g; /* selector elements */
		var selectorptn = /,\r+?/g; /* splits selectors */
		var andptn = /([\t\r\n ])*\f?&/g; /* match & */
		var escapeptn = /:global\(((?:[^\(\)\[\]]*|\[.*\]|\([^\(\)]*\))*)\)/g; /* matches :global(.*) */
		var invalidptn = /\W+/g; /* removes invalid characters from keyframes */
		var keyframeptn = /@(k\w+)\s*(\S*)\s*/; /* matches @keyframes $1 */
		var plcholdrptn = /::(place)/g; /* match ::placeholder varient */
		var readonlyptn = /:(read-only)/g; /* match :read-only varient */
		var beforeptn = /\s+(?=[{\];=:>])/g; /* matches \s before ] ; = : */
		var afterptn = /([[}=:>])\s+/g; /* matches \s after characters [ } = : */
		var tailptn = /(\{[^{]+?);(?=\})/g; /* matches tail semi-colons ;} */
		var whiteptn = /\s{2,}/g; /* matches repeating whitespace */
		var pseudoptn = /([^\(])(:+) */g; /* pseudo element */
		var writingptn = /[svh]\w+-[tblr]{2}/; /* match writing mode property values */
		var supportsptn = /\(\s*(.*)\s*\)/g; /* match supports (groups) */
		var propertyptn = /([\s\S]*?);/g; /* match properties leading semicolon */
		var selfptn = /-self|flex-/g; /* match flex- and -self in align-self: flex-*; */
		var pseudofmt = /[^]*?(:[rp][el]a[\w-]+)[^]*/; /* extrats :readonly or :placholder from selector */
		var dimensionptn = /stretch|:\s*\w+\-(?:conte|avail)/; /* match max/min/fit-content, fill-available

		/* vendors */
		var webkit = '-webkit-';
		var moz = '-moz-';
		var ms = '-ms-';

		/* character codes */
		var SEMICOLON = 59; /* ; */
		var CLOSEBRACES = 125; /* } */
		var OPENBRACES = 123; /* { */
		var OPENPARENTHESES = 40; /* ( */
		var CLOSEPARENTHESES = 41; /* ) */
		var OPENBRACKET = 91; /* [ */
		var CLOSEBRACKET = 93; /* ] */
		var NEWLINE = 10; /* \n */
		var CARRIAGE = 13; /* \r */
		var TAB = 9; /* \t */
		var AT = 64; /* @ */
		var SPACE = 32; /*   */
		var AND = 38; /* & */
		var DASH = 45; /* - */
		var UNDERSCORE = 95; /* _ */
		var STAR = 42; /* * */
		var COMMA = 44; /* , */
		var COLON = 58; /* : */
		var SINGLEQUOTE = 39; /* ' */
		var DOUBLEQUOTE = 34; /* " */
		var FOWARDSLASH = 47; /* / */
		var GREATERTHAN = 62; /* > */
		var PLUS = 43; /* + */
		var TILDE = 126; /* ~ */
		var NULL = 0; /* \0 */
		var FORMFEED = 12; /* \f */
		var VERTICALTAB = 11; /* \v */

		/* special identifiers */
		var KEYFRAME = 107; /* k */
		var MEDIA = 109; /* m */
		var SUPPORTS = 115; /* s */
		var PLACEHOLDER = 112; /* p */
		var READONLY = 111; /* o */
		var IMPORT = 169; /* <at>i */
		var CHARSET = 163; /* <at>c */
		var DOCUMENT = 100; /* <at>d */
		var PAGE = 112; /* <at>p */

		var column = 1; /* current column */
		var line = 1; /* current line numebr */
		var pattern = 0; /* :pattern */

		var cascade = 1; /* #id h1 h2 vs h1#id h2#id  */
		var prefix = 1; /* vendor prefix */
		var escape = 1; /* escape :global() pattern */
		var compress = 0; /* compress output */
		var semicolon = 0; /* no/semicolon option */
		var preserve = 0; /* preserve empty selectors */

		/* empty reference */
		var array = [];

		/* plugins */
		var plugins = [];
		var plugged = 0;
		var should = null;

		/* plugin context */
		var POSTS = -2;
		var PREPS = -1;
		var UNKWN = 0;
		var PROPS = 1;
		var BLCKS = 2;
		var ATRUL = 3;

		/* plugin newline context */
		var unkwn = 0;

		/* keyframe animation */
		var keyed = 1;
		var key = '';

		/* selector namespace */
		var nscopealt = '';
		var nscope = '';

		/**
		 * Compile
		 *
		 * @param {Array<string>} parent
		 * @param {Array<string>} current
		 * @param {string} body
		 * @param {number} id
		 * @param {number} depth
		 * @return {string}
		 */
		function compile (parent, current, body, id, depth) {
			var bracket = 0; /* brackets [] */
			var comment = 0; /* comments /* // or /* */
			var parentheses = 0; /* functions () */
			var quote = 0; /* quotes '', "" */

			var first = 0; /* first character code */
			var second = 0; /* second character code */
			var code = 0; /* current character code */
			var tail = 0; /* previous character code */
			var trail = 0; /* character before previous code */
			var peak = 0; /* previous non-whitespace code */

			var counter = 0; /* count sequence termination */
			var context = 0; /* track current context */
			var atrule = 0; /* track @at-rule context */
			var pseudo = 0; /* track pseudo token index */
			var caret = 0; /* current character index */
			var format = 0; /* control character formating context */
			var insert = 0; /* auto semicolon insertion */
			var invert = 0; /* inverted selector pattern */
			var length = 0; /* generic length address */
			var eof = body.length; /* end of file(length) */
			var eol = eof - 1; /* end of file(characters) */

			var char = ''; /* current character */
			var chars = ''; /* current buffer of characters */
			var child = ''; /* next buffer of characters */
			var out = ''; /* compiled body */
			var children = ''; /* compiled children */
			var flat = ''; /* compiled leafs */
			var selector; /* generic selector address */
			var result; /* generic address */

			// ...build body
			while (caret < eof) {
				code = body.charCodeAt(caret);

				// eof varient
				if (caret === eol) {
					// last character + noop context, add synthetic padding for noop context to terminate
					if (comment + quote + parentheses + bracket !== 0) {
						if (comment !== 0) {
							code = comment === FOWARDSLASH ? NEWLINE : FOWARDSLASH;
						}

						quote = parentheses = bracket = 0;
						eof++;
						eol++;
					}
				}

				if (comment + quote + parentheses + bracket === 0) {
					// eof varient
					if (caret === eol) {
						if (format > 0) {
							chars = chars.replace(formatptn, '');
						}

						if (chars.trim().length > 0) {
							switch (code) {
								case SPACE:
								case TAB:
								case SEMICOLON:
								case CARRIAGE:
								case NEWLINE: {
									break
								}
								default: {
									chars += body.charAt(caret);
								}
							}

							code = SEMICOLON;
						}
					}

					// auto semicolon insertion
					if (insert === 1) {
						switch (code) {
							// false flags
							case OPENBRACES:
							case CLOSEBRACES:
							case SEMICOLON:
							case DOUBLEQUOTE:
							case SINGLEQUOTE:
							case OPENPARENTHESES:
							case CLOSEPARENTHESES:
							case COMMA: {
								insert = 0;
							}
							// ignore
							case TAB:
							case CARRIAGE:
							case NEWLINE:
							case SPACE: {
								break
							}
							// valid
							default: {
								insert = 0;
								length = caret;
								first = code;
								caret--;
								code = SEMICOLON;

								while (length < eof) {
									switch (body.charCodeAt(length++)) {
										case NEWLINE:
										case CARRIAGE:
										case SEMICOLON: {
											++caret;
											code = first;
											length = eof;
											break
										}
										case COLON: {
											if (format > 0) {
												++caret;
												code = first;
											}
										}
										case OPENBRACES: {
											length = eof;
										}
									}
								}
							}
						}
					}

					// token varient
					switch (code) {
						case OPENBRACES: {
							chars = chars.trim();
							first = chars.charCodeAt(0);
							counter = 1;
							length = ++caret;

							while (caret < eof) {
								code = body.charCodeAt(caret);

								switch (code) {
									case OPENBRACES: {
										counter++;
										break
									}
									case CLOSEBRACES: {
										counter--;
										break
									}
								}

								if (counter === 0) {
									break
								}

								caret++;
							}

							child = body.substring(length, caret);

							if (first === NULL) {
								first = (chars = chars.replace(nullptn, '').trim()).charCodeAt(0);
							}

							switch (first) {
								// @at-rule
								case AT: {
									if (format > 0) {
										chars = chars.replace(formatptn, '');
									}

									second = chars.charCodeAt(1);

									switch (second) {
										case DOCUMENT:
										case MEDIA:
										case SUPPORTS:
										case DASH: {
											selector = current;
											break
										}
										default: {
											selector = array;
										}
									}

									child = compile(current, selector, child, second, depth+1);
									length = child.length;

									// preserve empty @at-rule
									if (preserve > 0 && length === 0) {
										length = chars.length;
									}

									// execute plugins, @at-rule context
									if (plugged > 0) {
										selector = select(array, chars, invert);
										result = proxy(ATRUL, child, selector, current, line, column, length, second, depth, id);
										chars = selector.join('');

										if (result !== void 0) {
											if ((length = (child = result.trim()).length) === 0) {
												second = 0;
												child = '';
											}
										}
									}

									if (length > 0) {
										switch (second) {
											case SUPPORTS: {
												chars = chars.replace(supportsptn, supports);
											}
											case DOCUMENT:
											case MEDIA:
											case DASH: {
												child = chars + '{' + child + '}';
												break
											}
											case KEYFRAME: {
												chars = chars.replace(keyframeptn, '$1 $2' + (keyed > 0 ? key : ''));
												child = chars + '{' + child + '}';

												if (prefix === 1 || (prefix === 2 && vendor('@'+child, 3))) {
													child = '@' + webkit + child + '@' + child;
												} else {
													child = '@' + child;
												}
												break
											}
											default: {
												child = chars + child;

												if (id === PAGE) {
													child = (out += child, '');
												}
											}
										}
									} else {
										child = '';
									}

									break
								}
								// selector
								default: {
									child = compile(current, select(current, chars, invert), child, id, depth+1);
								}
							}

							children += child;

							// reset
							context = 0;
							insert = 0;
							pseudo = 0;
							format = 0;
							invert = 0;
							atrule = 0;
							chars = '';
							child = '';
							code = body.charCodeAt(++caret);
							break
						}
						case CLOSEBRACES:
						case SEMICOLON: {
							chars = (format > 0 ? chars.replace(formatptn, '') : chars).trim();

							if ((length = chars.length) > 1) {
								// monkey-patch missing colon
								if (pseudo === 0) {
									first = chars.charCodeAt(0);

									// first character is a letter or dash, buffer has a space character
									if ((first === DASH || first > 96 && first < 123)) {
										length = (chars = chars.replace(' ', ':')).length;
									}
								}

								// execute plugins, property context
								if (plugged > 0) {
									if ((result = proxy(PROPS, chars, current, parent, line, column, out.length, id, depth, id)) !== void 0) {
										if ((length = (chars = result.trim()).length) === 0) {
											chars = '\0\0';
										}
									}
								}

								first = chars.charCodeAt(0);
								second = chars.charCodeAt(1);

								switch (first + second) {
									case NULL: {
										break
									}
									case IMPORT:
									case CHARSET: {
										flat += chars + body.charAt(caret);
										break
									}
									default: {
										if (chars.charCodeAt(length-1) === COLON)
											break

										out += property(chars, first, second, chars.charCodeAt(2));
									}
								}
							}

							// reset
							context = 0;
							insert = 0;
							pseudo = 0;
							format = 0;
							invert = 0;
							chars = '';
							code = body.charCodeAt(++caret);
							break
						}
					}
				}

				// parse characters
				switch (code) {
					case CARRIAGE:
					case NEWLINE: {
						// auto insert semicolon
						if (comment + quote + parentheses + bracket + semicolon === 0) {
							// valid non-whitespace characters that
							// may precede a newline
							switch (peak) {
								case CLOSEPARENTHESES:
								case SINGLEQUOTE:
								case DOUBLEQUOTE:
								case AT:
								case TILDE:
								case GREATERTHAN:
								case STAR:
								case PLUS:
								case FOWARDSLASH:
								case DASH:
								case COLON:
								case COMMA:
								case SEMICOLON:
								case OPENBRACES:
								case CLOSEBRACES: {
									break
								}
								default: {
									// current buffer has a colon
									if (pseudo > 0) {
										insert = 1;
									}
								}
							}
						}

						// terminate line comment
						if (comment === FOWARDSLASH) {
							comment = 0;
						} else if (cascade + context === 0) {
							format = 1;
							chars += '\0';
						}

						// execute plugins, newline context
						if (plugged * unkwn > 0) {
							proxy(UNKWN, chars, current, parent, line, column, out.length, id, depth, id);
						}

						// next line, reset column position
						column = 1;
						line++;
						break
					}
					case SEMICOLON:
					case CLOSEBRACES: {
						if (comment + quote + parentheses + bracket === 0) {
							column++;
							break
						}
					}
					default: {
						// increment column position
						column++;

						// current character
						char = body.charAt(caret);

						// remove comments, escape functions, strings, attributes and prepare selectors
						switch (code) {
							case TAB:
							case SPACE: {
								if (quote + bracket + comment === 0) {
									switch (tail) {
										case COMMA:
										case COLON:
										case TAB:
										case SPACE: {
											char = '';
											break
										}
										default: {
											if (code !== SPACE) {
												char = ' ';
											}
										}
									}
								}
								break
							}
							// escape breaking control characters
							case NULL: {
								char = '\\0';
								break
							}
							case FORMFEED: {
								char = '\\f';
								break
							}
							case VERTICALTAB: {
								char = '\\v';
								break
							}
							// &
							case AND: {
								// inverted selector pattern i.e html &
								if (quote + comment + bracket === 0 && cascade > 0) {
									invert = 1;
									format = 1;
									char = '\f' + char;
								}
								break
							}
							// ::p<l>aceholder, l
							// :read-on<l>y, l
							case 108: {
								if (quote + comment + bracket + pattern === 0 && pseudo > 0) {
									switch (caret - pseudo) {
										// ::placeholder
										case 2: {
											if (tail === PLACEHOLDER && body.charCodeAt(caret-3) === COLON) {
												pattern = tail;
											}
										}
										// :read-only
										case 8: {
											if (trail === READONLY) {
												pattern = trail;
											}
										}
									}
								}
								break
							}
							// :<pattern>
							case COLON: {
								if (quote + comment + bracket === 0) {
									pseudo = caret;
								}
								break
							}
							// selectors
							case COMMA: {
								if (comment + parentheses + quote + bracket === 0) {
									format = 1;
									char += '\r';
								}
								break
							}
							// quotes
							case DOUBLEQUOTE: {
								if (comment === 0) {
									quote = quote === code ? 0 : (quote === 0 ? code : quote);
								}
								break
							}
							case SINGLEQUOTE: {
								if (comment === 0) {
									quote = quote === code ? 0 : (quote === 0 ? code : quote);
								}
								break
							}
							// attributes
							case OPENBRACKET: {
								if (quote + comment + parentheses === 0) {
									bracket++;
								}
								break
							}
							case CLOSEBRACKET: {
								if (quote + comment + parentheses === 0) {
									bracket--;
								}
								break
							}
							// functions
							case CLOSEPARENTHESES: {
								if (quote + comment + bracket === 0) {
									parentheses--;
								}
								break
							}
							case OPENPARENTHESES: {
								if (quote + comment + bracket === 0) {
									if (context === 0) {
										switch (tail*2 + trail*3) {
											// :matches
											case 533: {
												break
											}
											// :global, :not, :nth-child etc...
											default: {
												counter = 0;
												context = 1;
											}
										}
									}

									parentheses++;
								}
								break
							}
							case AT: {
								if (comment + parentheses + quote + bracket + pseudo + atrule === 0) {
									atrule = 1;
								}
								break
							}
							// block/line comments
							case STAR:
							case FOWARDSLASH: {
								if (quote + bracket + parentheses > 0) {
									break
								}

								switch (comment) {
									// initialize line/block comment context
									case 0: {
										switch (code*2 + body.charCodeAt(caret+1)*3) {
											// //
											case 235: {
												comment = FOWARDSLASH;
												break
											}
											// /*
											case 220: {
												length = caret;
												comment = STAR;
												break
											}
										}
										break
									}
									// end block comment context
									case STAR: {
										if (code === FOWARDSLASH && tail === STAR) {
											// /*<!> ... */, !
											if (body.charCodeAt(length+2) === 33) {
												out += body.substring(length, caret+1);
											}
											char = '';
											comment = 0;
										}
									}
								}
							}
						}

						// ignore comment blocks
						if (comment === 0) {
							// aggressive isolation mode, divide each individual selector
							// including selectors in :not function but excluding selectors in :global function
							if (cascade + quote + bracket + atrule === 0 && id !== KEYFRAME && code !== SEMICOLON) {
								switch (code) {
									case COMMA:
									case TILDE:
									case GREATERTHAN:
									case PLUS:
									case CLOSEPARENTHESES:
									case OPENPARENTHESES: {
										if (context === 0) {
											// outside of an isolated context i.e nth-child(<...>)
											switch (tail) {
												case TAB:
												case SPACE:
												case NEWLINE:
												case CARRIAGE: {
													char = char + '\0';
													break
												}
												default: {
													char = '\0' + char + (code === COMMA ? '' : '\0');
												}
											}
											format = 1;
										} else {
											// within an isolated context, sleep untill it's terminated
											switch (code) {
												case OPENPARENTHESES: {
													context = ++counter;
													break
												}
												case CLOSEPARENTHESES: {
													if ((context = --counter) === 0) {
														format = 1;
														char += '\0';
													}
													break
												}
											}
										}
										break
									}
									case TAB:
									case SPACE: {
										switch (tail) {
											case NULL:
											case OPENBRACES:
											case CLOSEBRACES:
											case SEMICOLON:
											case COMMA:
											case FORMFEED:
											case TAB:
											case SPACE:
											case NEWLINE:
											case CARRIAGE: {
												break
											}
											default: {
												// ignore in isolated contexts
												if (context === 0) {
													format = 1;
													char += '\0';
												}
											}
										}
									}
								}
							}

							// concat buffer of characters
							chars += char;

							// previous non-whitespace character code
							if (code !== SPACE && code !== TAB) {
								peak = code;
							}
						}
					}
				}

				// tail character codes
				trail = tail;
				tail = code;

				// visit every character
				caret++;
			}

			length = out.length;

			// preserve empty selector
	 		if (preserve > 0) {
	 			if (length === 0 && children.length === 0 && (current[0].length === 0) === false) {
	 				if (id !== MEDIA || (current.length === 1 && (cascade > 0 ? nscopealt : nscope) === current[0])) {
						length = current.join(',').length + 2;
	 				}
	 			}
			}

			if (length > 0) {
				// cascade isolation mode?
				selector = cascade === 0 && id !== KEYFRAME ? isolate(current) : current;

				// execute plugins, block context
				if (plugged > 0) {
					result = proxy(BLCKS, out, selector, parent, line, column, length, id, depth, id);

					if (result !== void 0 && (out = result).length === 0) {
						return flat + out + children
					}
				}

				out = selector.join(',') + '{' + out + '}';

				if (prefix*pattern !== 0) {
					if (prefix === 2 && !vendor(out, 2))
						pattern = 0;

					switch (pattern) {
						// ::read-only
						case READONLY: {
							out = out.replace(readonlyptn, ':'+moz+'$1')+out;
							break
						}
						// ::placeholder
						case PLACEHOLDER: {
							out = (
								out.replace(plcholdrptn, '::' + webkit + 'input-$1') +
								out.replace(plcholdrptn, '::' + moz + '$1') +
								out.replace(plcholdrptn, ':' + ms + 'input-$1') + out
							);
							break
						}
					}

					pattern = 0;
				}
			}

			return flat + out + children
		}

		/**
		 * Select
		 *
		 * @param {Array<string>} parent
		 * @param {string} current
		 * @param {number} invert
		 * @return {Array<string>}
		 */
		function select (parent, current, invert) {
			var selectors = current.trim().split(selectorptn);
			var out = selectors;

			var length = selectors.length;
			var l = parent.length;

			switch (l) {
				// 0-1 parent selectors
				case 0:
				case 1: {
					for (var i = 0, selector = l === 0 ? '' : parent[0] + ' '; i < length; ++i) {
						out[i] = scope(selector, out[i], invert, l).trim();
					}
					break
				}
				// >2 parent selectors, nested
				default: {
					for (var i = 0, j = 0, out = []; i < length; ++i) {
						for (var k = 0; k < l; ++k) {
							out[j++] = scope(parent[k] + ' ', selectors[i], invert, l).trim();
						}
					}
				}
			}

			return out
		}

		/**
		 * Scope
		 *
		 * @param {string} parent
		 * @param {string} current
		 * @param {number} invert
		 * @param {number} level
		 * @return {string}
		 */
		function scope (parent, current, invert, level) {
			var selector = current;
			var code = selector.charCodeAt(0);

			// trim leading whitespace
			if (code < 33) {
				code = (selector = selector.trim()).charCodeAt(0);
			}

			switch (code) {
				// &
				case AND: {
					switch (cascade + level) {
						case 0:
						case 1: {
							if (parent.trim().length === 0) {
								break
							}
						}
						default: {
							return selector.replace(andptn, '$1'+parent.trim())
						}
					}
					break
				}
				// :
				case COLON: {
					switch (selector.charCodeAt(1)) {
						// g in :global
						case 103: {
							if (escape > 0 && cascade > 0) {
								return selector.replace(escapeptn, '$1').replace(andptn, '$1'+nscope)
							}
							break
						}
						default: {
							// :hover
							return parent.trim() + selector.replace(andptn, '$1'+parent.trim())
						}
					}
				}
				default: {
					// html &
					if (invert*cascade > 0 && selector.indexOf('\f') > 0) {
						return selector.replace(andptn, (parent.charCodeAt(0) === COLON ? '' : '$1')+parent.trim())
					}
				}
			}

			return parent + selector
		}

		/**
		 * Property
		 *
		 * @param {string} input
		 * @param {number} first
		 * @param {number} second
		 * @param {number} third
		 * @return {string}
		 */
		function property (input, first, second, third) {
			var index = 0;
			var out = input + ';';
			var hash = (first*2) + (second*3) + (third*4);
			var cache;

			// animation: a, n, i characters
			if (hash === 944) {
				return animation(out)
			} else if (prefix === 0 || (prefix === 2 && !vendor(out, 1))) {
				return out
			}

			// vendor prefix
			switch (hash) {
				// text-decoration/text-size-adjust/text-shadow/text-align/text-transform: t, e, x
				case 1015: {
					// text-shadow/text-align/text-transform, a
					return out.charCodeAt(10) === 97 ? webkit + out + out : out
				}
				// filter/fill f, i, l
				case 951: {
					// filter, t
					return out.charCodeAt(3) === 116 ? webkit + out + out : out
				}
				// color/column, c, o, l
				case 963: {
					// column, n
					return out.charCodeAt(5) === 110 ? webkit + out + out : out
				}
				// box-decoration-break, b, o, x
				case 1009: {
					if (out.charCodeAt(4) !== 100) {
						break
					}
				}
				// mask, m, a, s
				// clip-path, c, l, i
				case 969:
				case 942: {
					return webkit + out + out
				}
				// appearance: a, p, p
				case 978: {
					return webkit + out + moz + out + out
				}
				// hyphens: h, y, p
				// user-select: u, s, e
				case 1019:
				case 983: {
					return webkit + out + moz + out + ms + out + out
				}
				// background/backface-visibility, b, a, c
				case 883: {
					// backface-visibility, -
					return out.charCodeAt(8) === DASH ? webkit + out + out : out
				}
				// flex: f, l, e
				case 932: {
					if (out.charCodeAt(4) === DASH) {
						switch (out.charCodeAt(5)) {
							// flex-grow, g
							case 103: {
								return webkit + 'box-' + out.replace('-grow', '') + webkit + out + ms + out.replace('grow', 'positive') + out
							}
							// flex-shrink, s
							case 115: {
								return webkit + out + ms + out.replace('shrink', 'negative') + out
							}
							// flex-basis, b
							case 98: {
								return webkit + out + ms + out.replace('basis', 'preferred-size') + out
							}
						}
					}

					return webkit + out + ms + out + out
				}
				// order: o, r, d
				case 964: {
					return webkit + out + ms + 'flex' + '-' + out + out
				}
				// justify-items/justify-content, j, u, s
				case 1023: {
					// justify-content, c
					if (out.charCodeAt(8) !== 99) {
						break
					}

					cache = out.substring(out.indexOf(':', 15)).replace('flex-', '').replace('space-between', 'justify');
					return webkit + 'box-pack' + cache + webkit + out + ms + 'flex-pack' + cache + out
				}
				// cursor, c, u, r
				case 1005: {
					return cursorptn.test(out) ? out.replace(colonptn, ':' + webkit) + out.replace(colonptn, ':' + moz) + out : out
				}
				// writing-mode, w, r, i
				case 1000: {
					cache = out.substring(13).trim();
					index = cache.indexOf('-') + 1;

					switch (cache.charCodeAt(0)+cache.charCodeAt(index)) {
						// vertical-lr
						case 226: {
							cache = out.replace(writingptn, 'tb');
							break
						}
						// vertical-rl
						case 232: {
							cache = out.replace(writingptn, 'tb-rl');
							break
						}
						// horizontal-tb
						case 220: {
							cache = out.replace(writingptn, 'lr');
							break
						}
						default: {
							return out
						}
					}

					return webkit + out + ms + cache + out
				}
				// position: sticky
				case 1017: {
					if (out.indexOf('sticky', 9) === -1) {
						return out
					}
				}
				// display(flex/inline-flex/inline-box): d, i, s
				case 975: {
					index = (out = input).length - 10;
					cache = (out.charCodeAt(index) === 33 ? out.substring(0, index) : out).substring(input.indexOf(':', 7) + 1).trim();

					switch (hash = cache.charCodeAt(0) + (cache.charCodeAt(7)|0)) {
						// inline-
						case 203: {
							// inline-box
							if (cache.charCodeAt(8) < 111) {
								break
							}
						}
						// inline-box/sticky
						case 115: {
							out = out.replace(cache, webkit+cache)+';'+out;
							break
						}
						// inline-flex
						// flex
						case 207:
						case 102: {
							out = (
								out.replace(cache, webkit+(hash > 102 ? 'inline-' : '')+'box')+';'+
								out.replace(cache, webkit+cache)+';'+
								out.replace(cache, ms+cache+'box')+';'+
								out
							);
						}
					}

					return out + ';'
				}
				// align-items, align-center, align-self: a, l, i, -
				case 938: {
					if (out.charCodeAt(5) === DASH) {
						switch (out.charCodeAt(6)) {
							// align-items, i
							case 105: {
								cache = out.replace('-items', '');
								return webkit + out + webkit + 'box-' + cache + ms + 'flex-' + cache + out
							}
							// align-self, s
							case 115: {
								return webkit + out + ms + 'flex-item-' + out.replace(selfptn, '') + out
							}
							// align-content
							default: {
								return webkit + out + ms + 'flex-line-pack' + out.replace('align-content', '').replace(selfptn, '') + out
							}
						}
					}
					break
				}
				// min/max
				case 973:
				case 989: {
					// min-/max- height/width/block-size/inline-size
					if (out.charCodeAt(3) !== DASH || out.charCodeAt(4) === 122) {
						break
					}
				}
				// height/width: min-content / width: max-content
				case 931:
				case 953: {
					if (dimensionptn.test(input) === true) {
						// stretch
						if ((cache = input.substring(input.indexOf(':') + 1)).charCodeAt(0) === 115)
							return property(input.replace('stretch', 'fill-available'), first, second, third).replace(':fill-available', ':stretch')
						else
							return out.replace(cache, webkit + cache) + out.replace(cache, moz + cache.replace('fill-', '')) + out
					}
					break
				}
				// transform, transition: t, r, a
				case 962: {
					out = webkit + out + (out.charCodeAt(5) === 102 ? ms + out : '') + out;

					// transitions
					if (second + third === 211 && out.charCodeAt(13) === 105 && out.indexOf('transform', 10) > 0) {
						return out.substring(0, out.indexOf(';', 27) + 1).replace(transformptn, '$1' + webkit + '$2') + out
					}

					break
				}
			}

			return out
		}

		/**
		 * Vendor
		 *
		 * @param {string} content
		 * @param {number} context
		 * @return {boolean}
		 */
		function vendor (content, context) {
			var index = content.indexOf(context === 1 ? ':' : '{');
			var key = content.substring(0, context !== 3 ? index : 10);
			var value = content.substring(index + 1, content.length - 1);

			return should(context !== 2 ? key : key.replace(pseudofmt, '$1'), value, context)
		}

		/**
		 * Supports
		 *
		 * @param {string} match
		 * @param {string} group
		 * @return {string}
		 */
		function supports (match, group) {
			var out = property(group, group.charCodeAt(0), group.charCodeAt(1), group.charCodeAt(2));

			return out !== group+';' ? out.replace(propertyptn, ' or ($1)').substring(4) : '('+group+')'
		}

		/**
		 * Animation
		 *
		 * @param {string} input
		 * @return {string}
		 */
		function animation (input) {
			var length = input.length;
			var index = input.indexOf(':', 9) + 1;
			var declare = input.substring(0, index).trim();
			var out = input.substring(index, length-1).trim();

			switch (input.charCodeAt(9)*keyed) {
				case 0: {
					break
				}
				// animation-*, -
				case DASH: {
					// animation-name, n
					if (input.charCodeAt(10) !== 110) {
						break
					}
				}
				// animation/animation-name
				default: {
					// split in case of multiple animations
					var list = out.split((out = '', animationptn));

					for (var i = 0, index = 0, length = list.length; i < length; index = 0, ++i) {
						var value = list[i];
						var items = value.split(propertiesptn);

						while (value = items[index]) {
							var peak = value.charCodeAt(0);

							if (keyed === 1 && (
								// letters
								(peak > AT && peak < 90) || (peak > 96 && peak < 123) || peak === UNDERSCORE ||
								// dash but not in sequence i.e --
								(peak === DASH && value.charCodeAt(1) !== DASH)
							)) {
								// not a number/function
								switch (isNaN(parseFloat(value)) + (value.indexOf('(') !== -1)) {
									case 1: {
										switch (value) {
											// not a valid reserved keyword
											case 'infinite': case 'alternate': case 'backwards': case 'running':
											case 'normal': case 'forwards': case 'both': case 'none': case 'linear':
											case 'ease': case 'ease-in': case 'ease-out': case 'ease-in-out':
											case 'paused': case 'reverse': case 'alternate-reverse': case 'inherit':
											case 'initial': case 'unset': case 'step-start': case 'step-end': {
												break
											}
											default: {
												value += key;
											}
										}
									}
								}
							}

							items[index++] = value;
						}

						out += (i === 0 ? '' : ',') + items.join(' ');
					}
				}
			}

			out = declare + out + ';';

			if (prefix === 1 || (prefix === 2 && vendor(out, 1)))
				return webkit + out + out

			return out
		}

		/**
		 * Isolate
		 *
		 * @param {Array<string>} current
		 */
		function isolate (current) {
			for (var i = 0, length = current.length, selector = Array(length), padding, element; i < length; ++i) {
				// split individual elements in a selector i.e h1 h2 === [h1, h2]
				var elements = current[i].split(elementptn);
				var out = '';

				for (var j = 0, size = 0, tail = 0, code = 0, l = elements.length; j < l; ++j) {
					// empty element
					if ((size = (element = elements[j]).length) === 0 && l > 1) {
						continue
					}

					tail = out.charCodeAt(out.length-1);
					code = element.charCodeAt(0);
					padding = '';

					if (j !== 0) {
						// determine if we need padding
						switch (tail) {
							case STAR:
							case TILDE:
							case GREATERTHAN:
							case PLUS:
							case SPACE:
							case OPENPARENTHESES:  {
								break
							}
							default: {
								padding = ' ';
							}
						}
					}

					switch (code) {
						case AND: {
							element = padding + nscopealt;
						}
						case TILDE:
						case GREATERTHAN:
						case PLUS:
						case SPACE:
						case CLOSEPARENTHESES:
						case OPENPARENTHESES: {
							break
						}
						case OPENBRACKET: {
							element = padding + element + nscopealt;
							break
						}
						case COLON: {
							switch (element.charCodeAt(1)*2 + element.charCodeAt(2)*3) {
								// :global
								case 530: {
									if (escape > 0) {
										element = padding + element.substring(8, size - 1);
										break
									}
								}
								// :hover, :nth-child(), ...
								default: {
									if (j < 1 || elements[j-1].length < 1) {
										element = padding + nscopealt + element;
									}
								}
							}
							break
						}
						case COMMA: {
							padding = '';
						}
						default: {
							if (size > 1 && element.indexOf(':') > 0) {
								element = padding + element.replace(pseudoptn, '$1' + nscopealt + '$2');
							} else {
								element = padding + element + nscopealt;
							}
						}
					}

					out += element;
				}

				selector[i] = out.replace(formatptn, '').trim();
			}

			return selector
		}

		/**
		 * Proxy
		 *
		 * @param {number} context
		 * @param {string} content
		 * @param {Array<string>} selectors
		 * @param {Array<string>} parents
		 * @param {number} line
		 * @param {number} column
		 * @param {number} length
		 * @param {number} id
		 * @param {number} depth
		 * @param {number} at
		 * @return {(string|void|*)}
		 */
		function proxy (context, content, selectors, parents, line, column, length, id, depth, at) {
			for (var i = 0, out = content, next; i < plugged; ++i) {
				switch (next = plugins[i].call(stylis, context, out, selectors, parents, line, column, length, id, depth, at)) {
					case void 0:
					case false:
					case true:
					case null: {
						break
					}
					default: {
						out = next;
					}
				}
			}

			switch (out) {
				case void 0:
				case false:
				case true:
				case null:
				case content: {
					break
				}
				default: {
					return out
				}
			}
		}

		/**
		 * Minify
		 *
		 * @param {(string|*)} output
		 * @return {string}
		 */
		function minify (output) {
			return output
				.replace(formatptn, '')
				.replace(beforeptn, '')
				.replace(afterptn, '$1')
				.replace(tailptn, '$1')
				.replace(whiteptn, ' ')
		}

		/**
		 * Use
		 *
		 * @param {(Array<function(...?)>|function(...?)|number|void)?} plugin
		 */
		function use (plugin) {
			switch (plugin) {
				case void 0:
				case null: {
					plugged = plugins.length = 0;
					break
				}
				default: {
					switch (plugin.constructor) {
						case Array: {
							for (var i = 0, length = plugin.length; i < length; ++i) {
								use(plugin[i]);
							}
							break
						}
						case Function: {
							plugins[plugged++] = plugin;
							break
						}
						case Boolean: {
							unkwn = !!plugin|0;
						}
					}
				}
	 		}

	 		return use
		}

		/**
		 * Set
		 *
		 * @param {*} options
		 */
		function set (options) {
			for (var name in options) {
				var value = options[name];
				switch (name) {
					case 'keyframe': keyed = value|0; break
					case 'global': escape = value|0; break
					case 'cascade': cascade = value|0; break
					case 'compress': compress = value|0; break
					case 'semicolon': semicolon = value|0; break
					case 'preserve': preserve = value|0; break
					case 'prefix':
						should = null;

						if (!value) {
							prefix = 0;
						} else if (typeof value !== 'function') {
							prefix = 1;
						} else {
							prefix = 2;
							should = value;
						}
				}
			}

			return set
		}

		/**
		 * Stylis
		 *
		 * @param {string} selector
		 * @param {string} input
		 * @return {*}
		 */
		function stylis (selector, input) {
			if (this !== void 0 && this.constructor === stylis) {
				return factory(selector)
			}

			// setup
			var ns = selector;
			var code = ns.charCodeAt(0);

			// trim leading whitespace
			if (code < 33) {
				code = (ns = ns.trim()).charCodeAt(0);
			}

			// keyframe/animation namespace
			if (keyed > 0) {
				key = ns.replace(invalidptn, code === OPENBRACKET ? '' : '-');
			}

			// reset, used to assert if a plugin is moneky-patching the return value
			code = 1;

			// cascade/isolate
			if (cascade === 1) {
				nscope = ns;
			} else {
				nscopealt = ns;
			}

			var selectors = [nscope];
			var result;

			// execute plugins, pre-process context
			if (plugged > 0) {
				result = proxy(PREPS, input, selectors, selectors, line, column, 0, 0, 0, 0);

				if (result !== void 0 && typeof result === 'string') {
					input = result;
				}
			}

			// build
			var output = compile(array, selectors, input, 0, 0);

			// execute plugins, post-process context
			if (plugged > 0) {
				result = proxy(POSTS, output, selectors, selectors, line, column, output.length, 0, 0, 0);

				// bypass minification
				if (result !== void 0 && typeof(output = result) !== 'string') {
					code = 0;
				}
			}

			// reset
			key = '';
			nscope = '';
			nscopealt = '';
			pattern = 0;
			line = 1;
			column = 1;

			return compress*code === 0 ? output : minify(output)
		}

		stylis['use'] = use;
		stylis['set'] = set;

		if (options !== void 0) {
			set(options);
		}

		return stylis
	}));
	});

	var stylisRuleSheet = createCommonjsModule(function (module, exports) {
	(function (factory) {
		module['exports'] = factory();
	}(function () {

		return function (insertRule) {
			var delimiter = '/*|*/';
			var needle = delimiter+'}';

			function toSheet (block) {
				if (block)
					try {
						insertRule(block + '}');
					} catch (e) {}
			}

			return function ruleSheet (context, content, selectors, parents, line, column, length, ns, depth, at) {
				switch (context) {
					// property
					case 1:
						// @import
						if (depth === 0 && content.charCodeAt(0) === 64)
							return insertRule(content+';'), ''
						break
					// selector
					case 2:
						if (ns === 0)
							return content + delimiter
						break
					// at-rule
					case 3:
						switch (ns) {
							// @font-face, @page
							case 102:
							case 112:
								return insertRule(selectors[0]+content), ''
							default:
								return content + (at === 0 ? delimiter : '')
						}
					case -2:
						content.split(needle).forEach(toSheet);
				}
			}
		}
	}));
	});

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

	var hoistNonReactStatics = createCommonjsModule(function (module, exports) {
	/**
	 * Copyright 2015, Yahoo! Inc.
	 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
	 */
	(function (global, factory) {
	    module.exports = factory();
	}(commonjsGlobal, (function () {
	    
	    var REACT_STATICS = {
	        childContextTypes: true,
	        contextTypes: true,
	        defaultProps: true,
	        displayName: true,
	        getDefaultProps: true,
	        getDerivedStateFromProps: true,
	        mixins: true,
	        propTypes: true,
	        type: true
	    };
	    
	    var KNOWN_STATICS = {
	        name: true,
	        length: true,
	        prototype: true,
	        caller: true,
	        callee: true,
	        arguments: true,
	        arity: true
	    };
	    
	    var defineProperty = Object.defineProperty;
	    var getOwnPropertyNames = Object.getOwnPropertyNames;
	    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	    var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
	    var getPrototypeOf = Object.getPrototypeOf;
	    var objectPrototype = getPrototypeOf && getPrototypeOf(Object);
	    
	    return function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
	        if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components
	            
	            if (objectPrototype) {
	                var inheritedComponent = getPrototypeOf(sourceComponent);
	                if (inheritedComponent && inheritedComponent !== objectPrototype) {
	                    hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
	                }
	            }
	            
	            var keys = getOwnPropertyNames(sourceComponent);
	            
	            if (getOwnPropertySymbols) {
	                keys = keys.concat(getOwnPropertySymbols(sourceComponent));
	            }
	            
	            for (var i = 0; i < keys.length; ++i) {
	                var key = keys[i];
	                if (!REACT_STATICS[key] && !KNOWN_STATICS[key] && (!blacklist || !blacklist[key])) {
	                    var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
	                    try { // Avoid failures from read-only properties
	                        defineProperty(targetComponent, key, descriptor);
	                    } catch (e) {}
	                }
	            }
	            
	            return targetComponent;
	        }
	        
	        return targetComponent;
	    };
	})));
	});

	var reactIs_production_min = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports,"__esModule",{value:!0});var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.forward_ref"):60112,n=b?Symbol.for("react.timeout"):60113;
	function q(a){if("object"===typeof a&&null!==a){var p=a.$$typeof;switch(p){case c:switch(a=a.type, a){case l:case e:case g:case f:return a;default:switch(a=a&&a.$$typeof, a){case k:case m:case h:return a;default:return p}}case d:return p}}}exports.typeOf=q;exports.AsyncMode=l;exports.ContextConsumer=k;exports.ContextProvider=h;exports.Element=c;exports.ForwardRef=m;exports.Fragment=e;exports.Profiler=g;exports.Portal=d;exports.StrictMode=f;
	exports.isValidElementType=function(a){return"string"===typeof a||"function"===typeof a||a===e||a===l||a===g||a===f||a===n||"object"===typeof a&&null!==a&&(a.$$typeof===h||a.$$typeof===k||a.$$typeof===m)};exports.isAsyncMode=function(a){return q(a)===l};exports.isContextConsumer=function(a){return q(a)===k};exports.isContextProvider=function(a){return q(a)===h};exports.isElement=function(a){return"object"===typeof a&&null!==a&&a.$$typeof===c};exports.isForwardRef=function(a){return q(a)===m};
	exports.isFragment=function(a){return q(a)===e};exports.isProfiler=function(a){return q(a)===g};exports.isPortal=function(a){return q(a)===d};exports.isStrictMode=function(a){return q(a)===f};
	});

	unwrapExports(reactIs_production_min);
	var reactIs_production_min_1 = reactIs_production_min.typeOf;
	var reactIs_production_min_2 = reactIs_production_min.AsyncMode;
	var reactIs_production_min_3 = reactIs_production_min.ContextConsumer;
	var reactIs_production_min_4 = reactIs_production_min.ContextProvider;
	var reactIs_production_min_5 = reactIs_production_min.Element;
	var reactIs_production_min_6 = reactIs_production_min.ForwardRef;
	var reactIs_production_min_7 = reactIs_production_min.Fragment;
	var reactIs_production_min_8 = reactIs_production_min.Profiler;
	var reactIs_production_min_9 = reactIs_production_min.Portal;
	var reactIs_production_min_10 = reactIs_production_min.StrictMode;
	var reactIs_production_min_11 = reactIs_production_min.isValidElementType;
	var reactIs_production_min_12 = reactIs_production_min.isAsyncMode;
	var reactIs_production_min_13 = reactIs_production_min.isContextConsumer;
	var reactIs_production_min_14 = reactIs_production_min.isContextProvider;
	var reactIs_production_min_15 = reactIs_production_min.isElement;
	var reactIs_production_min_16 = reactIs_production_min.isForwardRef;
	var reactIs_production_min_17 = reactIs_production_min.isFragment;
	var reactIs_production_min_18 = reactIs_production_min.isProfiler;
	var reactIs_production_min_19 = reactIs_production_min.isPortal;
	var reactIs_production_min_20 = reactIs_production_min.isStrictMode;

	var reactIs_development = createCommonjsModule(function (module, exports) {



	{
	  (function() {

	Object.defineProperty(exports, '__esModule', { value: true });

	// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
	// nor polyfill, then a plain number is used for performance.
	var hasSymbol = typeof Symbol === 'function' && Symbol.for;

	var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
	var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
	var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
	var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
	var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
	var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
	var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace;
	var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
	var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
	var REACT_TIMEOUT_TYPE = hasSymbol ? Symbol.for('react.timeout') : 0xead1;

	function isValidElementType(type) {
	  return typeof type === 'string' || typeof type === 'function' ||
	  // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
	  type === REACT_FRAGMENT_TYPE || type === REACT_ASYNC_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_TIMEOUT_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE);
	}

	function typeOf(object) {
	  if (typeof object === 'object' && object !== null) {
	    var $$typeof = object.$$typeof;

	    switch ($$typeof) {
	      case REACT_ELEMENT_TYPE:
	        var type = object.type;

	        switch (type) {
	          case REACT_ASYNC_MODE_TYPE:
	          case REACT_FRAGMENT_TYPE:
	          case REACT_PROFILER_TYPE:
	          case REACT_STRICT_MODE_TYPE:
	            return type;
	          default:
	            var $$typeofType = type && type.$$typeof;

	            switch ($$typeofType) {
	              case REACT_CONTEXT_TYPE:
	              case REACT_FORWARD_REF_TYPE:
	              case REACT_PROVIDER_TYPE:
	                return $$typeofType;
	              default:
	                return $$typeof;
	            }
	        }
	      case REACT_PORTAL_TYPE:
	        return $$typeof;
	    }
	  }

	  return undefined;
	}

	var AsyncMode = REACT_ASYNC_MODE_TYPE;
	var ContextConsumer = REACT_CONTEXT_TYPE;
	var ContextProvider = REACT_PROVIDER_TYPE;
	var Element = REACT_ELEMENT_TYPE;
	var ForwardRef = REACT_FORWARD_REF_TYPE;
	var Fragment = REACT_FRAGMENT_TYPE;
	var Profiler = REACT_PROFILER_TYPE;
	var Portal = REACT_PORTAL_TYPE;
	var StrictMode = REACT_STRICT_MODE_TYPE;

	function isAsyncMode(object) {
	  return typeOf(object) === REACT_ASYNC_MODE_TYPE;
	}
	function isContextConsumer(object) {
	  return typeOf(object) === REACT_CONTEXT_TYPE;
	}
	function isContextProvider(object) {
	  return typeOf(object) === REACT_PROVIDER_TYPE;
	}
	function isElement(object) {
	  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
	}
	function isForwardRef(object) {
	  return typeOf(object) === REACT_FORWARD_REF_TYPE;
	}
	function isFragment(object) {
	  return typeOf(object) === REACT_FRAGMENT_TYPE;
	}
	function isProfiler(object) {
	  return typeOf(object) === REACT_PROFILER_TYPE;
	}
	function isPortal(object) {
	  return typeOf(object) === REACT_PORTAL_TYPE;
	}
	function isStrictMode(object) {
	  return typeOf(object) === REACT_STRICT_MODE_TYPE;
	}

	exports.typeOf = typeOf;
	exports.AsyncMode = AsyncMode;
	exports.ContextConsumer = ContextConsumer;
	exports.ContextProvider = ContextProvider;
	exports.Element = Element;
	exports.ForwardRef = ForwardRef;
	exports.Fragment = Fragment;
	exports.Profiler = Profiler;
	exports.Portal = Portal;
	exports.StrictMode = StrictMode;
	exports.isValidElementType = isValidElementType;
	exports.isAsyncMode = isAsyncMode;
	exports.isContextConsumer = isContextConsumer;
	exports.isContextProvider = isContextProvider;
	exports.isElement = isElement;
	exports.isForwardRef = isForwardRef;
	exports.isFragment = isFragment;
	exports.isProfiler = isProfiler;
	exports.isPortal = isPortal;
	exports.isStrictMode = isStrictMode;
	  })();
	}
	});

	unwrapExports(reactIs_development);
	var reactIs_development_1 = reactIs_development.typeOf;
	var reactIs_development_2 = reactIs_development.AsyncMode;
	var reactIs_development_3 = reactIs_development.ContextConsumer;
	var reactIs_development_4 = reactIs_development.ContextProvider;
	var reactIs_development_5 = reactIs_development.Element;
	var reactIs_development_6 = reactIs_development.ForwardRef;
	var reactIs_development_7 = reactIs_development.Fragment;
	var reactIs_development_8 = reactIs_development.Profiler;
	var reactIs_development_9 = reactIs_development.Portal;
	var reactIs_development_10 = reactIs_development.StrictMode;
	var reactIs_development_11 = reactIs_development.isValidElementType;
	var reactIs_development_12 = reactIs_development.isAsyncMode;
	var reactIs_development_13 = reactIs_development.isContextConsumer;
	var reactIs_development_14 = reactIs_development.isContextProvider;
	var reactIs_development_15 = reactIs_development.isElement;
	var reactIs_development_16 = reactIs_development.isForwardRef;
	var reactIs_development_17 = reactIs_development.isFragment;
	var reactIs_development_18 = reactIs_development.isProfiler;
	var reactIs_development_19 = reactIs_development.isPortal;
	var reactIs_development_20 = reactIs_development.isStrictMode;

	var reactIs = createCommonjsModule(function (module) {

	{
	  module.exports = reactIs_development;
	}
	});
	var reactIs_1 = reactIs.isValidElementType;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @typechecks
	 */

	var _uppercasePattern = /([A-Z])/g;

	/**
	 * Hyphenates a camelcased string, for example:
	 *
	 *   > hyphenate('backgroundColor')
	 *   < "background-color"
	 *
	 * For CSS style names, use `hyphenateStyleName` instead which works properly
	 * with all vendor prefixes, including `ms`.
	 *
	 * @param {string} string
	 * @return {string}
	 */
	function hyphenate$2(string) {
	  return string.replace(_uppercasePattern, '-$1').toLowerCase();
	}

	var hyphenate_1 = hyphenate$2;

	var hyphenate = hyphenate_1;

	var msPattern = /^ms-/;

	/**
	 * Hyphenates a camelcased CSS property name, for example:
	 *
	 *   > hyphenateStyleName('backgroundColor')
	 *   < "background-color"
	 *   > hyphenateStyleName('MozTransition')
	 *   < "-moz-transition"
	 *   > hyphenateStyleName('msTransition')
	 *   < "-ms-transition"
	 *
	 * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
	 * is converted to `-ms-`.
	 *
	 * @param {string} string
	 * @return {string}
	 */
	function hyphenateStyleName(string) {
	  return hyphenate(string).replace(msPattern, '-ms-');
	}

	var hyphenateStyleName_1 = hyphenateStyleName;

	// 
	var objToCss = function objToCss(obj, prevKey) {
	  var css = Object.keys(obj).filter(function (key) {
	    var chunk = obj[key];
	    return chunk !== undefined && chunk !== null && chunk !== false && chunk !== '';
	  }).map(function (key) {
	    if (isPlainObject(obj[key])) return objToCss(obj[key], key);
	    return hyphenateStyleName_1(key) + ': ' + obj[key] + ';';
	  }).join(' ');
	  return prevKey ? prevKey + ' {\n  ' + css + '\n}' : css;
	};

	var flatten = function flatten(chunks, executionContext) {
	  return chunks.reduce(function (ruleSet, chunk) {
	    /* Remove falsey values */
	    if (chunk === undefined || chunk === null || chunk === false || chunk === '') {
	      return ruleSet;
	    }
	    /* Flatten ruleSet */
	    if (Array.isArray(chunk)) {
	      return [].concat(ruleSet, flatten(chunk, executionContext));
	    }

	    /* Handle other components */
	    if (chunk.hasOwnProperty('styledComponentId')) {
	      // $FlowFixMe not sure how to make this pass
	      return [].concat(ruleSet, ['.' + chunk.styledComponentId]);
	    }

	    /* Either execute or defer the function */
	    if (typeof chunk === 'function') {
	      return executionContext ? ruleSet.concat.apply(ruleSet, flatten([chunk(executionContext)], executionContext)) : ruleSet.concat(chunk);
	    }

	    /* Handle objects */
	    return ruleSet.concat(
	    // $FlowFixMe have to add %checks somehow to isPlainObject
	    isPlainObject(chunk) ? objToCss(chunk) : chunk.toString());
	  }, []);
	};

	// 
	// NOTE: This stylis instance is only used to split rules from SSR'd style tags
	var stylisSplitter = new stylis({
	  global: false,
	  cascade: true,
	  keyframe: false,
	  prefix: false,
	  compress: false,
	  semicolon: true
	});

	var stylis$1 = new stylis({
	  global: false,
	  cascade: true,
	  keyframe: false,
	  prefix: true,
	  compress: false,
	  semicolon: false // NOTE: This means "autocomplete missing semicolons"
	});

	// Wrap `insertRulePlugin to build a list of rules,
	// and then make our own plugin to return the rules. This
	// makes it easier to hook into the existing SSR architecture

	var parsingRules = [];
	// eslint-disable-next-line consistent-return
	var returnRulesPlugin = function returnRulesPlugin(context) {
	  if (context === -2) {
	    var parsedRules = parsingRules;
	    parsingRules = [];
	    return parsedRules;
	  }
	};

	var parseRulesPlugin = stylisRuleSheet(function (rule) {
	  parsingRules.push(rule);
	});

	stylis$1.use([parseRulesPlugin, returnRulesPlugin]);
	stylisSplitter.use([parseRulesPlugin, returnRulesPlugin]);

	var stringifyRules = function stringifyRules(rules, selector, prefix) {
	  var flatCSS = rules.join('').replace(/^\s*\/\/.*$/gm, ''); // replace JS comments

	  var cssStr = selector && prefix ? prefix + ' ' + selector + ' { ' + flatCSS + ' }' : flatCSS;

	  return stylis$1(prefix || !selector ? '' : selector, cssStr);
	};

	var splitByRules = function splitByRules(css) {
	  return stylisSplitter('', css);
	};

	// 

	function isStyledComponent(target) /* : %checks */{
	  return typeof target === 'function' && typeof target.styledComponentId === 'string';
	}

	// 

	/* This function is DEPRECATED and will be removed on the next major version release.
	 * It was needed to rehydrate all style blocks prepended to chunks before React
	 * tries to rehydrate its HTML stream. Since the master StyleSheet will now detect
	 * the use of streamed style tags and will perform the rehydration earlier when needed
	 * this function will not be needed anymore */
	function consolidateStreamedStyles() {
	  {
	    // eslint-disable-next-line no-console
	    console.warn('styled-components automatically does streaming SSR rehydration now.\n' + 'Calling consolidateStreamedStyles manually is no longer necessary and a noop now.\n' + '- Please remove the consolidateStreamedStyles call from your client.');
	  }
	}

	// 
	/* eslint-disable no-bitwise */

	/* This is the "capacity" of our alphabet i.e. 2x26 for all letters plus their capitalised
	 * counterparts */
	var charsLength = 52;

	/* start at 75 for 'a' until 'z' (25) and then start at 65 for capitalised letters */
	var getAlphabeticChar = function getAlphabeticChar(code) {
	  return String.fromCharCode(code + (code > 25 ? 39 : 97));
	};

	/* input a number, usually a hash and convert it to base-52 */
	var generateAlphabeticName = function generateAlphabeticName(code) {
	  var name = '';
	  var x = void 0;

	  /* get a char and divide by alphabet-length */
	  for (x = code; x > charsLength; x = Math.floor(x / charsLength)) {
	    name = getAlphabeticChar(x % charsLength) + name;
	  }

	  return getAlphabeticChar(x % charsLength) + name;
	};

	// 

	var interleave = (function (strings, interpolations) {
	  return interpolations.reduce(function (array, interp, i) {
	    return array.concat(interp, strings[i + 1]);
	  }, [strings[0]]);
	});

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







	var _extends = Object.assign || function (target) {
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









	var objectWithoutProperties = function (obj, keys) {
	  var target = {};

	  for (var i in obj) {
	    if (keys.indexOf(i) >= 0) continue;
	    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
	    target[i] = obj[i];
	  }

	  return target;
	};

	var possibleConstructorReturn = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && (typeof call === "object" || typeof call === "function") ? call : self;
	};

	// 
	var css = (function (styles) {
	  for (var _len = arguments.length, interpolations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    interpolations[_key - 1] = arguments[_key];
	  }

	  if (!Array.isArray(styles) && (typeof styles === 'undefined' ? 'undefined' : _typeof(styles)) === 'object') {
	    return flatten(interleave([], [styles].concat(interpolations)));
	  }
	  return flatten(interleave(styles, interpolations));
	});

	var stream = {};

	// 


	var SC_ATTR = typeof process !== 'undefined' && process.env.SC_ATTR || 'data-styled-components';
	var SC_STREAM_ATTR = 'data-styled-streamed';
	var CONTEXT_KEY = '__styled-components-stylesheet__';

	var IS_BROWSER = typeof window !== 'undefined' && 'HTMLElement' in window;

	var DISABLE_SPEEDY = typeof false === 'boolean' && false || "development" !== 'production';

	// 
	var SC_COMPONENT_ID = /^[^\S\n]*?\/\* sc-component-id:\s*(\S+)\s+\*\//gm;

	var extractComps = (function (maybeCSS) {
	  var css = '' + (maybeCSS || ''); // Definitely a string, and a clone
	  var existingComponents = [];
	  css.replace(SC_COMPONENT_ID, function (match, componentId, matchIndex) {
	    existingComponents.push({ componentId: componentId, matchIndex: matchIndex });
	    return match;
	  });
	  return existingComponents.map(function (_ref, i) {
	    var componentId = _ref.componentId,
	        matchIndex = _ref.matchIndex;

	    var nextComp = existingComponents[i + 1];
	    var cssFromDOM = nextComp ? css.slice(matchIndex, nextComp.matchIndex) : css.slice(matchIndex);
	    return { componentId: componentId, cssFromDOM: cssFromDOM };
	  });
	});

	// 
	/* eslint-disable camelcase, no-undef */

	var getNonce = (function () {
	  return typeof __webpack_nonce__ !== 'undefined' ? __webpack_nonce__ : null;
	});

	// 
	// Helper to call a given function, only once
	var once = (function (cb) {
	  var called = false;

	  return function () {
	    if (!called) {
	      called = true;
	      cb();
	    }
	  };
	});

	// 
	/* These are helpers for the StyleTags to keep track of the injected
	 * rule names for each (component) ID that they're keeping track of.
	 * They're crucial for detecting whether a name has already been
	 * injected.
	 * (This excludes rehydrated names) */

	/* adds a new ID:name pairing to a names dictionary */
	var addNameForId = function addNameForId(names, id, name) {
	  if (name) {
	    // eslint-disable-next-line no-param-reassign
	    var namesForId = names[id] || (names[id] = Object.create(null));
	    namesForId[name] = true;
	  }
	};

	/* resets an ID entirely by overwriting it in the dictionary */
	var resetIdNames = function resetIdNames(names, id) {
	  // eslint-disable-next-line no-param-reassign
	  names[id] = Object.create(null);
	};

	/* factory for a names dictionary checking the existance of an ID:name pairing */
	var hasNameForId = function hasNameForId(names) {
	  return function (id, name) {
	    return names[id] !== undefined && names[id][name];
	  };
	};

	/* stringifies names for the html/element output */
	var stringifyNames = function stringifyNames(names) {
	  var str = '';
	  // eslint-disable-next-line guard-for-in
	  for (var id in names) {
	    str += Object.keys(names[id]).join(' ') + ' ';
	  }
	  return str.trim();
	};

	/* clones the nested names dictionary */
	var cloneNames = function cloneNames(names) {
	  var clone = Object.create(null);
	  // eslint-disable-next-line guard-for-in
	  for (var id in names) {
	    clone[id] = _extends({}, names[id]);
	  }
	  return clone;
	};

	// 
	/* These are helpers that deal with the insertRule (aka speedy) API
	 * They are used in the StyleTags and specifically the speedy tag
	 */

	/* retrieve a sheet for a given style tag */
	var sheetForTag = function sheetForTag(tag) {
	  // $FlowFixMe
	  if (tag.sheet) return tag.sheet;

	  /* Firefox quirk requires us to step through all stylesheets to find one owned by the given tag */
	  var size = document.styleSheets.length;
	  for (var i = 0; i < size; i += 1) {
	    var sheet = document.styleSheets[i];
	    // $FlowFixMe
	    if (sheet.ownerNode === tag) return sheet;
	  }

	  /* we should always be able to find a tag */
	  throw new Error();
	};

	/* insert a rule safely and return whether it was actually injected */
	var safeInsertRule = function safeInsertRule(sheet, cssRule, index) {
	  /* abort early if cssRule string is falsy */
	  if (!cssRule) return false;

	  var maxIndex = sheet.cssRules.length;

	  try {
	    /* use insertRule and cap passed index with maxIndex (no of cssRules) */
	    sheet.insertRule(cssRule, index <= maxIndex ? index : maxIndex);
	  } catch (err) {
	    /* any error indicates an invalid rule */
	    return false;
	  }

	  return true;
	};

	/* deletes `size` rules starting from `removalIndex` */
	var deleteRules = function deleteRules(sheet, removalIndex, size) {
	  var lowerBound = removalIndex - size;
	  for (var i = removalIndex; i > lowerBound; i -= 1) {
	    sheet.deleteRule(i);
	  }
	};

	// 
	/* eslint-disable flowtype/object-type-delimiter */
	/* eslint-disable react/prop-types */

	/* this error is used for makeStyleTag */
	var parentNodeUnmountedErr = '\nTrying to insert a new style tag, but the given Node is unmounted!\n- Are you using a custom target that isn\'t mounted?\n- Does your document not have a valid head element?\n- Have you accidentally removed a style tag manually?\n'.trim();

	/* this error is used for tags */
	var throwCloneTagErr = function throwCloneTagErr() {
	  throw new Error('\nThe clone method cannot be used on the client!\n- Are you running in a client-like environment on the server?\n- Are you trying to run SSR on the client?\n'.trim());
	};

	/* this marker separates component styles and is important for rehydration */
	var makeTextMarker = function makeTextMarker(id) {
	  return '\n/* sc-component-id: ' + id + ' */\n';
	};

	/* add up all numbers in array up until and including the index */
	var addUpUntilIndex = function addUpUntilIndex(sizes, index) {
	  var totalUpToIndex = 0;
	  for (var i = 0; i <= index; i += 1) {
	    totalUpToIndex += sizes[i];
	  }

	  return totalUpToIndex;
	};

	/* create a new style tag after lastEl */
	var makeStyleTag = function makeStyleTag(target, tagEl, insertBefore) {
	  var el = document.createElement('style');
	  el.setAttribute(SC_ATTR, '');

	  var nonce = getNonce();
	  if (nonce) {
	    el.setAttribute('nonce', nonce);
	  }

	  /* Work around insertRule quirk in EdgeHTML */
	  el.appendChild(document.createTextNode(''));

	  if (target && !tagEl) {
	    /* Append to target when no previous element was passed */
	    target.appendChild(el);
	  } else {
	    if (!tagEl || !target || !tagEl.parentNode) {
	      throw new Error(parentNodeUnmountedErr);
	    }

	    /* Insert new style tag after the previous one */
	    tagEl.parentNode.insertBefore(el, insertBefore ? tagEl : tagEl.nextSibling);
	  }

	  return el;
	};

	/* takes a css factory function and outputs an html styled tag factory */
	var wrapAsHtmlTag = function wrapAsHtmlTag(css, names) {
	  return function (additionalAttrs) {
	    var nonce = getNonce();
	    var attrs = [nonce && 'nonce="' + nonce + '"', SC_ATTR + '="' + stringifyNames(names) + '"', additionalAttrs];

	    var htmlAttr = attrs.filter(Boolean).join(' ');
	    return '<style ' + htmlAttr + '>' + css() + '</style>';
	  };
	};

	/* takes a css factory function and outputs an element factory */
	var wrapAsElement = function wrapAsElement(css, names) {
	  return function () {
	    var _props;

	    var props = (_props = {}, _props[SC_ATTR] = stringifyNames(names), _props);

	    var nonce = getNonce();
	    if (nonce) {
	      // $FlowFixMe
	      props.nonce = nonce;
	    }

	    // eslint-disable-next-line react/no-danger
	    return react.createElement('style', _extends({}, props, { dangerouslySetInnerHTML: { __html: css() } }));
	  };
	};

	var getIdsFromMarkersFactory = function getIdsFromMarkersFactory(markers) {
	  return function () {
	    return Object.keys(markers);
	  };
	};

	/* speedy tags utilise insertRule */
	var makeSpeedyTag = function makeSpeedyTag(el, getImportRuleTag) {
	  var names = Object.create(null);
	  var markers = Object.create(null);
	  var sizes = [];

	  var extractImport = getImportRuleTag !== undefined;
	  /* indicates whther getImportRuleTag was called */
	  var usedImportRuleTag = false;

	  var insertMarker = function insertMarker(id) {
	    var prev = markers[id];
	    if (prev !== undefined) {
	      return prev;
	    }

	    var marker = markers[id] = sizes.length;
	    sizes.push(0);
	    resetIdNames(names, id);
	    return marker;
	  };

	  var insertRules = function insertRules(id, cssRules, name) {
	    var marker = insertMarker(id);
	    var sheet = sheetForTag(el);
	    var insertIndex = addUpUntilIndex(sizes, marker);

	    var injectedRules = 0;
	    var importRules = [];
	    var cssRulesSize = cssRules.length;

	    for (var i = 0; i < cssRulesSize; i += 1) {
	      var cssRule = cssRules[i];
	      var mayHaveImport = extractImport; /* @import rules are reordered to appear first */
	      if (mayHaveImport && cssRule.indexOf('@import') !== -1) {
	        importRules.push(cssRule);
	      } else if (safeInsertRule(sheet, cssRule, insertIndex + injectedRules)) {
	        mayHaveImport = false;
	        injectedRules += 1;
	      }
	    }

	    if (extractImport && importRules.length > 0) {
	      usedImportRuleTag = true;
	      // $FlowFixMe
	      getImportRuleTag().insertRules(id + '-import', importRules);
	    }

	    sizes[marker] += injectedRules; /* add up no of injected rules */
	    addNameForId(names, id, name);
	  };

	  var removeRules = function removeRules(id) {
	    var marker = markers[id];
	    if (marker === undefined) return;

	    var size = sizes[marker];
	    var sheet = sheetForTag(el);
	    var removalIndex = addUpUntilIndex(sizes, marker);
	    deleteRules(sheet, removalIndex, size);
	    sizes[marker] = 0;
	    resetIdNames(names, id);

	    if (extractImport && usedImportRuleTag) {
	      // $FlowFixMe
	      getImportRuleTag().removeRules(id + '-import');
	    }
	  };

	  var css = function css() {
	    var _sheetForTag = sheetForTag(el),
	        cssRules = _sheetForTag.cssRules;

	    var str = '';

	    // eslint-disable-next-line guard-for-in
	    for (var id in markers) {
	      str += makeTextMarker(id);
	      var marker = markers[id];
	      var end = addUpUntilIndex(sizes, marker);
	      var size = sizes[marker];
	      for (var i = end - size; i < end; i += 1) {
	        var rule = cssRules[i];
	        if (rule !== undefined) {
	          str += rule.cssText;
	        }
	      }
	    }

	    return str;
	  };

	  return {
	    styleTag: el,
	    getIds: getIdsFromMarkersFactory(markers),
	    hasNameForId: hasNameForId(names),
	    insertMarker: insertMarker,
	    insertRules: insertRules,
	    removeRules: removeRules,
	    css: css,
	    toHTML: wrapAsHtmlTag(css, names),
	    toElement: wrapAsElement(css, names),
	    clone: throwCloneTagErr
	  };
	};

	var makeBrowserTag = function makeBrowserTag(el, getImportRuleTag) {
	  var names = Object.create(null);
	  var markers = Object.create(null);

	  var extractImport = getImportRuleTag !== undefined;
	  var makeTextNode = function makeTextNode(id) {
	    return document.createTextNode(makeTextMarker(id));
	  };

	  /* indicates whther getImportRuleTag was called */
	  var usedImportRuleTag = false;

	  var insertMarker = function insertMarker(id) {
	    var prev = markers[id];
	    if (prev !== undefined) {
	      return prev;
	    }

	    var marker = markers[id] = makeTextNode(id);
	    el.appendChild(marker);
	    names[id] = Object.create(null);
	    return marker;
	  };

	  var insertRules = function insertRules(id, cssRules, name) {
	    var marker = insertMarker(id);
	    var importRules = [];
	    var cssRulesSize = cssRules.length;

	    for (var i = 0; i < cssRulesSize; i += 1) {
	      var rule = cssRules[i];
	      var mayHaveImport = extractImport;
	      if (mayHaveImport && rule.indexOf('@import') !== -1) {
	        importRules.push(rule);
	      } else {
	        mayHaveImport = false;
	        var separator = i === cssRulesSize - 1 ? '' : ' ';
	        marker.appendData('' + rule + separator);
	      }
	    }

	    addNameForId(names, id, name);

	    if (extractImport && importRules.length > 0) {
	      usedImportRuleTag = true;
	      // $FlowFixMe
	      getImportRuleTag().insertRules(id + '-import', importRules);
	    }
	  };

	  var removeRules = function removeRules(id) {
	    var marker = markers[id];
	    if (marker === undefined) return;

	    /* create new empty text node and replace the current one */
	    var newMarker = makeTextNode(id);
	    el.replaceChild(newMarker, marker);
	    markers[id] = newMarker;
	    resetIdNames(names, id);

	    if (extractImport && usedImportRuleTag) {
	      // $FlowFixMe
	      getImportRuleTag().removeRules(id + '-import');
	    }
	  };

	  var css = function css() {
	    var str = '';
	    // eslint-disable-next-line guard-for-in
	    for (var id in markers) {
	      str += markers[id].data;
	    }
	    return str;
	  };

	  return {
	    styleTag: el,
	    getIds: getIdsFromMarkersFactory(markers),
	    hasNameForId: hasNameForId(names),
	    insertMarker: insertMarker,
	    insertRules: insertRules,
	    removeRules: removeRules,
	    css: css,
	    toHTML: wrapAsHtmlTag(css, names),
	    toElement: wrapAsElement(css, names),
	    clone: throwCloneTagErr
	  };
	};

	var makeServerTagInternal = function makeServerTagInternal(namesArg, markersArg) {
	  var names = namesArg === undefined ? Object.create(null) : namesArg;
	  var markers = markersArg === undefined ? Object.create(null) : markersArg;

	  var insertMarker = function insertMarker(id) {
	    var prev = markers[id];
	    if (prev !== undefined) {
	      return prev;
	    }

	    return markers[id] = [''];
	  };

	  var insertRules = function insertRules(id, cssRules, name) {
	    var marker = insertMarker(id);
	    marker[0] += cssRules.join(' ');
	    addNameForId(names, id, name);
	  };

	  var removeRules = function removeRules(id) {
	    var marker = markers[id];
	    if (marker === undefined) return;
	    marker[0] = '';
	    resetIdNames(names, id);
	  };

	  var css = function css() {
	    var str = '';
	    // eslint-disable-next-line guard-for-in
	    for (var id in markers) {
	      var cssForId = markers[id][0];
	      if (cssForId) {
	        str += makeTextMarker(id) + cssForId;
	      }
	    }
	    return str;
	  };

	  var clone = function clone() {
	    var namesClone = cloneNames(names);
	    var markersClone = Object.create(null);

	    // eslint-disable-next-line guard-for-in
	    for (var id in markers) {
	      markersClone[id] = [markers[id][0]];
	    }

	    return makeServerTagInternal(namesClone, markersClone);
	  };

	  var tag = {
	    styleTag: null,
	    getIds: getIdsFromMarkersFactory(markers),
	    hasNameForId: hasNameForId(names),
	    insertMarker: insertMarker,
	    insertRules: insertRules,
	    removeRules: removeRules,
	    css: css,
	    toHTML: wrapAsHtmlTag(css, names),
	    toElement: wrapAsElement(css, names),
	    clone: clone
	  };

	  return tag;
	};

	var makeServerTag = function makeServerTag() {
	  return makeServerTagInternal();
	};

	var makeTag = function makeTag(target, tagEl, forceServer, insertBefore, getImportRuleTag) {
	  if (IS_BROWSER && !forceServer) {
	    var el = makeStyleTag(target, tagEl, insertBefore);
	    if (DISABLE_SPEEDY) {
	      return makeBrowserTag(el, getImportRuleTag);
	    } else {
	      return makeSpeedyTag(el, getImportRuleTag);
	    }
	  }

	  return makeServerTag();
	};

	/* wraps a given tag so that rehydration is performed once when necessary */
	var makeRehydrationTag = function makeRehydrationTag(tag, els, extracted, names, immediateRehydration) {
	  /* rehydration function that adds all rules to the new tag */
	  var rehydrate = once(function () {
	    /* add all extracted components to the new tag */
	    for (var i = 0; i < extracted.length; i += 1) {
	      var _extracted$i = extracted[i],
	          componentId = _extracted$i.componentId,
	          cssFromDOM = _extracted$i.cssFromDOM;

	      var cssRules = splitByRules(cssFromDOM);
	      tag.insertRules(componentId, cssRules);
	    }

	    /* remove old HTMLStyleElements, since they have been rehydrated */
	    for (var _i = 0; _i < els.length; _i += 1) {
	      var el = els[_i];
	      if (el.parentNode) {
	        el.parentNode.removeChild(el);
	      }
	    }
	  });

	  if (immediateRehydration) rehydrate();

	  return _extends({}, tag, {
	    /* add rehydration hook to insertion methods */
	    insertMarker: function insertMarker(id) {
	      rehydrate();
	      return tag.insertMarker(id);
	    },
	    insertRules: function insertRules(id, cssRules, name) {
	      rehydrate();
	      return tag.insertRules(id, cssRules, name);
	    }
	  });
	};

	// 

	/* determine the maximum number of components before tags are sharded */
	var MAX_SIZE = void 0;
	if (IS_BROWSER) {
	  /* in speedy mode we can keep a lot more rules in a sheet before a slowdown can be expected */
	  MAX_SIZE = DISABLE_SPEEDY ? 40 : 1000;
	} else {
	  /* for servers we do not need to shard at all */
	  MAX_SIZE = -1;
	}

	var sheetRunningId = 0;
	var master = void 0;

	var StyleSheet = function () {
	  /* a map from ids to tags */
	  /* deferred rules for a given id */
	  /* this is used for not reinjecting rules via hasNameForId() */
	  /* when rules for an id are removed using remove() we have to ignore rehydratedNames for it */
	  /* a list of tags belonging to this StyleSheet */
	  /* a tag for import rules */
	  /* current capacity until a new tag must be created */
	  /* children (aka clones) of this StyleSheet inheriting all and future injections */

	  function StyleSheet() {
	    var _this = this;

	    var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : IS_BROWSER ? document.head : null;
	    var forceServer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	    classCallCheck(this, StyleSheet);

	    this.getImportRuleTag = function () {
	      var importRuleTag = _this.importRuleTag;

	      if (importRuleTag !== undefined) {
	        return importRuleTag;
	      }

	      var firstTag = _this.tags[0];
	      var insertBefore = true;

	      return _this.importRuleTag = makeTag(_this.target, firstTag ? firstTag.styleTag : null, _this.forceServer, insertBefore);
	    };

	    this.id = sheetRunningId += 1;
	    this.sealed = false;
	    this.forceServer = forceServer;
	    this.target = forceServer ? null : target;
	    this.tagMap = {};
	    this.deferred = {};
	    this.rehydratedNames = {};
	    this.ignoreRehydratedNames = {};
	    this.tags = [];
	    this.capacity = 1;
	    this.clones = [];
	  }

	  /* rehydrate all SSR'd style tags */


	  StyleSheet.prototype.rehydrate = function rehydrate() {
	    if (!IS_BROWSER || this.forceServer) {
	      return this;
	    }

	    var els = [];
	    var names = [];
	    var extracted = [];
	    var isStreamed = false;

	    /* retrieve all of our SSR style elements from the DOM */
	    var nodes = document.querySelectorAll('style[' + SC_ATTR + ']');
	    var nodesSize = nodes.length;

	    /* abort rehydration if no previous style tags were found */
	    if (nodesSize === 0) {
	      return this;
	    }

	    for (var i = 0; i < nodesSize; i += 1) {
	      // $FlowFixMe: We can trust that all elements in this query are style elements
	      var el = nodes[i];

	      /* check if style tag is a streamed tag */
	      isStreamed = !!el.getAttribute(SC_STREAM_ATTR) || isStreamed;

	      /* retrieve all component names */
	      var elNames = (el.getAttribute(SC_ATTR) || '').trim().split(/\s+/);
	      var elNamesSize = elNames.length;
	      for (var j = 0; j < elNamesSize; j += 1) {
	        var name = elNames[j];
	        /* add rehydrated name to sheet to avoid readding styles */
	        this.rehydratedNames[name] = true;
	        names.push(name);
	      }

	      /* extract all components and their CSS */
	      extracted = extracted.concat(extractComps(el.textContent));
	      /* store original HTMLStyleElement */
	      els.push(el);
	    }

	    /* abort rehydration if nothing was extracted */
	    var extractedSize = extracted.length;
	    if (extractedSize === 0) {
	      return this;
	    }

	    /* create a tag to be used for rehydration */
	    var tag = this.makeTag(null);
	    var rehydrationTag = makeRehydrationTag(tag, els, extracted, names, isStreamed);

	    /* reset capacity and adjust MAX_SIZE by the initial size of the rehydration */
	    this.capacity = Math.max(1, MAX_SIZE - extractedSize);
	    this.tags.push(rehydrationTag);

	    /* retrieve all component ids */
	    for (var _j = 0; _j < extractedSize; _j += 1) {
	      this.tagMap[extracted[_j].componentId] = rehydrationTag;
	    }

	    return this;
	  };

	  /* retrieve a "master" instance of StyleSheet which is typically used when no other is available
	   * The master StyleSheet is targeted by injectGlobal, keyframes, and components outside of any
	    * StyleSheetManager's context */


	  /* reset the internal "master" instance */
	  StyleSheet.reset = function reset() {
	    var forceServer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	    master = new StyleSheet(undefined, forceServer).rehydrate();
	  };

	  /* adds "children" to the StyleSheet that inherit all of the parents' rules
	   * while their own rules do not affect the parent */


	  StyleSheet.prototype.clone = function clone() {
	    var sheet = new StyleSheet(this.target, this.forceServer);
	    /* add to clone array */
	    this.clones.push(sheet);

	    /* clone all tags */
	    sheet.tags = this.tags.map(function (tag) {
	      var ids = tag.getIds();
	      var newTag = tag.clone();

	      /* reconstruct tagMap */
	      for (var i = 0; i < ids.length; i += 1) {
	        sheet.tagMap[ids[i]] = newTag;
	      }

	      return newTag;
	    });

	    /* clone other maps */
	    sheet.rehydratedNames = _extends({}, this.rehydratedNames);
	    sheet.deferred = _extends({}, this.deferred);

	    return sheet;
	  };

	  /* force StyleSheet to create a new tag on the next injection */


	  StyleSheet.prototype.sealAllTags = function sealAllTags() {
	    this.capacity = 1;
	    this.sealed = true;
	  };

	  StyleSheet.prototype.makeTag = function makeTag$$1(tag) {
	    var lastEl = tag ? tag.styleTag : null;
	    var insertBefore = false;

	    return makeTag(this.target, lastEl, this.forceServer, insertBefore, this.getImportRuleTag);
	  };

	  /* get a tag for a given componentId, assign the componentId to one, or shard */
	  StyleSheet.prototype.getTagForId = function getTagForId(id) {
	    /* simply return a tag, when the componentId was already assigned one */
	    var prev = this.tagMap[id];
	    if (prev !== undefined && !this.sealed) {
	      return prev;
	    }

	    var tag = this.tags[this.tags.length - 1];

	    /* shard (create a new tag) if the tag is exhausted (See MAX_SIZE) */
	    this.capacity -= 1;
	    if (this.capacity === 0) {
	      this.capacity = MAX_SIZE;
	      this.sealed = false;
	      tag = this.makeTag(tag);
	      this.tags.push(tag);
	    }

	    return this.tagMap[id] = tag;
	  };

	  /* mainly for injectGlobal to check for its id */


	  StyleSheet.prototype.hasId = function hasId(id) {
	    return this.tagMap[id] !== undefined;
	  };

	  /* caching layer checking id+name to already have a corresponding tag and injected rules */


	  StyleSheet.prototype.hasNameForId = function hasNameForId(id, name) {
	    /* exception for rehydrated names which are checked separately */
	    if (this.ignoreRehydratedNames[id] === undefined && this.rehydratedNames[name]) {
	      return true;
	    }

	    var tag = this.tagMap[id];
	    return tag !== undefined && tag.hasNameForId(id, name);
	  };

	  /* registers a componentId and registers it on its tag */


	  StyleSheet.prototype.deferredInject = function deferredInject(id, cssRules) {
	    /* don't inject when the id is already registered */
	    if (this.tagMap[id] !== undefined) return;

	    var clones = this.clones;

	    for (var i = 0; i < clones.length; i += 1) {
	      clones[i].deferredInject(id, cssRules);
	    }

	    this.getTagForId(id).insertMarker(id);
	    this.deferred[id] = cssRules;
	  };

	  /* injects rules for a given id with a name that will need to be cached */


	  StyleSheet.prototype.inject = function inject(id, cssRules, name) {
	    var clones = this.clones;

	    for (var i = 0; i < clones.length; i += 1) {
	      clones[i].inject(id, cssRules, name);
	    }

	    /* add deferred rules for component */
	    var injectRules = cssRules;
	    var deferredRules = this.deferred[id];
	    if (deferredRules !== undefined) {
	      injectRules = deferredRules.concat(injectRules);
	      delete this.deferred[id];
	    }

	    var tag = this.getTagForId(id);
	    tag.insertRules(id, injectRules, name);
	  };

	  /* removes all rules for a given id, which doesn't remove its marker but resets it */


	  StyleSheet.prototype.remove = function remove(id) {
	    var tag = this.tagMap[id];
	    if (tag === undefined) return;

	    var clones = this.clones;

	    for (var i = 0; i < clones.length; i += 1) {
	      clones[i].remove(id);
	    }

	    /* remove all rules from the tag */
	    tag.removeRules(id);
	    /* ignore possible rehydrated names */
	    this.ignoreRehydratedNames[id] = true;
	    /* delete possible deferred rules */
	    delete this.deferred[id];
	  };

	  StyleSheet.prototype.toHTML = function toHTML() {
	    return this.tags.map(function (tag) {
	      return tag.toHTML();
	    }).join('');
	  };

	  StyleSheet.prototype.toReactElements = function toReactElements() {
	    var id = this.id;


	    return this.tags.map(function (tag, i) {
	      var key = 'sc-' + id + '-' + i;
	      return react_2(tag.toElement(), { key: key });
	    });
	  };

	  createClass(StyleSheet, null, [{
	    key: 'master',
	    get: function get$$1() {
	      return master || (master = new StyleSheet().rehydrate());
	    }

	    /* NOTE: This is just for backwards-compatibility with jest-styled-components */

	  }, {
	    key: 'instance',
	    get: function get$$1() {
	      return StyleSheet.master;
	    }
	  }]);
	  return StyleSheet;
	}();

	var _StyleSheetManager$ch;

	// 
	/* this error is used for makeStyleTag */
	var targetPropErr = '\nThe StyleSheetManager expects a valid target or sheet prop!\n- Does this error occur on the client and is your target falsy?\n- Does this error occur on the server and is the sheet falsy?\n'.trim();

	var StyleSheetManager = function (_Component) {
	  inherits(StyleSheetManager, _Component);

	  function StyleSheetManager() {
	    classCallCheck(this, StyleSheetManager);
	    return possibleConstructorReturn(this, _Component.apply(this, arguments));
	  }

	  StyleSheetManager.prototype.getChildContext = function getChildContext() {
	    var _ref;

	    return _ref = {}, _ref[CONTEXT_KEY] = this.sheetInstance, _ref;
	  };

	  StyleSheetManager.prototype.componentWillMount = function componentWillMount() {
	    if (this.props.sheet) {
	      this.sheetInstance = this.props.sheet;
	    } else if (this.props.target) {
	      this.sheetInstance = new StyleSheet(this.props.target);
	    } else {
	      throw new Error(targetPropErr);
	    }
	  };

	  StyleSheetManager.prototype.render = function render() {
	    /* eslint-disable react/prop-types */
	    // Flow v0.43.1 will report an error accessing the `children` property,
	    // but v0.47.0 will not. It is necessary to use a type cast instead of
	    // a "fixme" comment to satisfy both Flow versions.
	    return react.Children.only(this.props.children);
	  };

	  return StyleSheetManager;
	}(react_6);

	StyleSheetManager.childContextTypes = (_StyleSheetManager$ch = {}, _StyleSheetManager$ch[CONTEXT_KEY] = propTypes.oneOfType([propTypes.instanceOf(StyleSheet), propTypes.instanceOf(ServerStyleSheet)]).isRequired, _StyleSheetManager$ch);

	StyleSheetManager.propTypes = {
	  sheet: propTypes.oneOfType([propTypes.instanceOf(StyleSheet), propTypes.instanceOf(ServerStyleSheet)]),
	  target: propTypes.shape({
	    appendChild: propTypes.func.isRequired
	  })
	};

	// 
	/* eslint-disable no-underscore-dangle */
	/* this error is used for makeStyleTag */
	var sheetClosedErr = '\nCan\'t collect styles once you\'ve consumed a ServerStyleSheet\'s styles!\nServerStyleSheet is a one off instance for each server-side render cycle.\n- Are you trying to reuse it across renders?\n- Are you accidentally calling collectStyles twice?\n'.trim();

	var streamBrowserErr = 'Streaming SSR is only supported in a Node.js environment; Please do not try to call this method in the browser.';

	var ServerStyleSheet = function () {
	  function ServerStyleSheet() {
	    classCallCheck(this, ServerStyleSheet);

	    /* The master sheet might be reset, so keep a reference here */
	    this.masterSheet = StyleSheet.master;
	    this.instance = this.masterSheet.clone();
	    this.closed = false;
	  }

	  ServerStyleSheet.prototype.complete = function complete() {
	    if (!this.closed) {
	      /* Remove closed StyleSheets from the master sheet */
	      var index = this.masterSheet.clones.indexOf(this.instance);
	      this.masterSheet.clones.splice(index, 1);
	      this.closed = true;
	    }
	  };

	  ServerStyleSheet.prototype.collectStyles = function collectStyles(children) {
	    if (this.closed) {
	      throw new Error(sheetClosedErr);
	    }

	    return react.createElement(
	      StyleSheetManager,
	      { sheet: this.instance },
	      children
	    );
	  };

	  ServerStyleSheet.prototype.getStyleTags = function getStyleTags() {
	    this.complete();
	    return this.instance.toHTML();
	  };

	  ServerStyleSheet.prototype.getStyleElement = function getStyleElement() {
	    this.complete();
	    return this.instance.toReactElements();
	  };

	  ServerStyleSheet.prototype.interleaveWithNodeStream = function interleaveWithNodeStream(readableStream) {
	    var _this = this;

	    {
	      throw new Error(streamBrowserErr);
	    }

	    /* the tag index keeps track of which tags have already been emitted */
	    var instance = this.instance;

	    var instanceTagIndex = 0;

	    var streamAttr = SC_STREAM_ATTR + '="true"';
	    var ourStream = new stream.Readable();
	    // $FlowFixMe
	    ourStream._read = function () {};

	    readableStream.on('data', function (chunk) {
	      var tags = instance.tags;

	      var html = '';

	      /* retrieve html for each new style tag */
	      for (; instanceTagIndex < tags.length; instanceTagIndex += 1) {
	        var tag = tags[instanceTagIndex];
	        html += tag.toHTML(streamAttr);
	      }

	      /* force our StyleSheets to emit entirely new tags */
	      instance.sealAllTags();
	      /* prepend style html to chunk */
	      ourStream.push(html + chunk);
	    });

	    readableStream.on('end', function () {
	      _this.complete();
	      ourStream.push(null);
	    });

	    readableStream.on('error', function (err) {
	      _this.complete();
	      ourStream.emit('error', err);
	    });

	    return ourStream;
	  };

	  return ServerStyleSheet;
	}();

	// 

	var LIMIT = 200;

	var createWarnTooManyClasses = (function (displayName) {
	  var generatedClasses = {};
	  var warningSeen = false;

	  return function (className) {
	    if (!warningSeen) {
	      generatedClasses[className] = true;
	      if (Object.keys(generatedClasses).length >= LIMIT) {
	        // Unable to find latestRule in test environment.
	        /* eslint-disable no-console, prefer-template */
	        console.warn('Over ' + LIMIT + ' classes were generated for component ' + displayName + '. \n' + 'Consider using the attrs method, together with a style object for frequently changed styles.\n' + 'Example:\n' + '  const Component = styled.div.attrs({\n' + '    style: ({ background }) => ({\n' + '      background,\n' + '    }),\n' + '  })`width: 100%;`\n\n' + '  <Component />');
	        warningSeen = true;
	        generatedClasses = {};
	      }
	    }
	  };
	});

	// 

	var determineTheme = (function (props, fallbackTheme, defaultProps) {
	  // Props should take precedence over ThemeProvider, which should take precedence over
	  // defaultProps, but React automatically puts defaultProps on props.

	  /* eslint-disable react/prop-types */
	  var isDefaultTheme = defaultProps && props.theme === defaultProps.theme;
	  var theme = props.theme && !isDefaultTheme ? props.theme : fallbackTheme;
	  /* eslint-enable */

	  return theme;
	});

	// 
	var escapeRegex = /[[\].#*$><+~=|^:(),"'`-]+/g;
	var dashesAtEnds = /(^-|-$)/g;

	/**
	 * TODO: Explore using CSS.escape when it becomes more available
	 * in evergreen browsers.
	 */
	function escape$1(str) {
	  return str
	  // Replace all possible CSS selectors
	  .replace(escapeRegex, '-')

	  // Remove extraneous hyphens at the start and end
	  .replace(dashesAtEnds, '');
	}

	// 

	/* eslint-disable no-undef */
	function getComponentName(target) {
	  return target.displayName || target.name || 'Component';
	}

	// 

	function isTag(target) /* : %checks */{
	  return typeof target === 'string';
	}

	// 
	function generateDisplayName(target) {
	  return isTag(target) ? 'styled.' + target : 'Styled(' + getComponentName(target) + ')';
	}

	// 
	/* eslint-disable max-len */
	/**
	 * Trying to avoid the unknown-prop errors on styled components by filtering by
	 * React's attribute whitelist.
	 *
	 * To regenerate this regex:
	 *
	 * 1. `npm i -g regexgen` (https://github.com/devongovett/regexgen)
	 * 2. Run `regexgen` with the list of space-separated words below as input
	 * 3. Surround the emitted regex with this: `/^(GENERATED_REGEX)$/` -- this will ensure a full string match
	 *    and no false positives from partials
	 **/
	/*
	children dangerouslySetInnerHTML key ref autoFocus defaultValue valueLink defaultChecked checkedLink innerHTML suppressContentEditableWarning onFocusIn onFocusOut className onCopy onCut onPaste onCompositionEnd onCompositionStart onCompositionUpdate onKeyDown onKeyPress onKeyUp onFocus onBlur onChange onInput onInvalid onSubmit onReset onClick onContextMenu onDoubleClick onDrag onDragEnd onDragEnter onDragExit onDragLeave onDragOver onDragStart onDrop onMouseDown onMouseEnter onMouseLeave onMouseMove onMouseOut onMouseOver onMouseUp onSelect onTouchCancel onTouchEnd onTouchMove onTouchStart onScroll onWheel onAbort onCanPlay onCanPlayThrough onDurationChange onEmptied onEncrypted onEnded onError onLoadedData onLoadedMetadata onLoadStart onPause onPlay onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend onTimeUpdate onVolumeChange onWaiting onLoad onAnimationStart onAnimationEnd onAnimationIteration onTransitionEnd onCopyCapture onCutCapture onPasteCapture onCompositionEndCapture onCompositionStartCapture onCompositionUpdateCapture onKeyDownCapture onKeyPressCapture onKeyUpCapture onFocusCapture onBlurCapture onChangeCapture onInputCapture onSubmitCapture onResetCapture onClickCapture onContextMenuCapture onDoubleClickCapture onDragCapture onDragEndCapture onDragEnterCapture onDragExitCapture onDragLeaveCapture onDragOverCapture onDragStartCapture onDropCapture onMouseDownCapture onMouseEnterCapture onMouseLeaveCapture onMouseMoveCapture onMouseOutCapture onMouseOverCapture onMouseUpCapture onSelectCapture onTouchCancelCapture onTouchEndCapture onTouchMoveCapture onTouchStartCapture onScrollCapture onWheelCapture onAbortCapture onCanPlayCapture onCanPlayThroughCapture onDurationChangeCapture onEmptiedCapture onEncryptedCapture onEndedCapture onErrorCapture onLoadedDataCapture onLoadedMetadataCapture onLoadStartCapture onPauseCapture onPlayCapture onPlayingCapture onProgressCapture onRateChangeCapture onSeekedCapture onSeekingCapture onStalledCapture onSuspendCapture onTimeUpdateCapture onVolumeChangeCapture onWaitingCapture onLoadCapture onAnimationStartCapture onAnimationEndCapture onAnimationIterationCapture onTransitionEndCapture accept acceptCharset accessKey action allowFullScreen allowTransparency alt as async autoComplete autoPlay capture cellPadding cellSpacing charSet challenge checked cite classID className cols colSpan content contentEditable contextMenu controlsList controls coords crossOrigin data dateTime default defer dir disabled download draggable encType form formAction formEncType formMethod formNoValidate formTarget frameBorder headers height hidden high href hrefLang htmlFor httpEquiv icon id inputMode integrity is keyParams keyType kind label lang list loop low manifest marginHeight marginWidth max maxLength media mediaGroup method min minLength multiple muted name nonce noValidate open optimum pattern placeholder playsInline poster preload profile radioGroup readOnly referrerPolicy rel required reversed role rows rowSpan sandbox scope scoped scrolling seamless selected shape size sizes span spellCheck src srcDoc srcLang srcSet start step style summary tabIndex target title type useMap value width wmode wrap about datatype inlist prefix property resource typeof vocab autoCapitalize autoCorrect autoSave color itemProp itemScope itemType itemID itemRef results security unselectable accentHeight accumulate additive alignmentBaseline allowReorder alphabetic amplitude arabicForm ascent attributeName attributeType autoReverse azimuth baseFrequency baseProfile baselineShift bbox begin bias by calcMode capHeight clip clipPath clipRule clipPathUnits colorInterpolation colorInterpolationFilters colorProfile colorRendering contentScriptType contentStyleType cursor cx cy d decelerate descent diffuseConstant direction display divisor dominantBaseline dur dx dy edgeMode elevation enableBackground end exponent externalResourcesRequired fill fillOpacity fillRule filter filterRes filterUnits floodColor floodOpacity focusable fontFamily fontSize fontSizeAdjust fontStretch fontStyle fontVariant fontWeight format from fx fy g1 g2 glyphName glyphOrientationHorizontal glyphOrientationVertical glyphRef gradientTransform gradientUnits hanging horizAdvX horizOriginX ideographic imageRendering in in2 intercept k k1 k2 k3 k4 kernelMatrix kernelUnitLength kerning keyPoints keySplines keyTimes lengthAdjust letterSpacing lightingColor limitingConeAngle local markerEnd markerMid markerStart markerHeight markerUnits markerWidth mask maskContentUnits maskUnits mathematical mode numOctaves offset opacity operator order orient orientation origin overflow overlinePosition overlineThickness paintOrder panose1 pathLength patternContentUnits patternTransform patternUnits pointerEvents points pointsAtX pointsAtY pointsAtZ preserveAlpha preserveAspectRatio primitiveUnits r radius refX refY renderingIntent repeatCount repeatDur requiredExtensions requiredFeatures restart result rotate rx ry scale seed shapeRendering slope spacing specularConstant specularExponent speed spreadMethod startOffset stdDeviation stemh stemv stitchTiles stopColor stopOpacity strikethroughPosition strikethroughThickness string stroke strokeDasharray strokeDashoffset strokeLinecap strokeLinejoin strokeMiterlimit strokeOpacity strokeWidth surfaceScale systemLanguage tableValues targetX targetY textAnchor textDecoration textRendering textLength to transform u1 u2 underlinePosition underlineThickness unicode unicodeBidi unicodeRange unitsPerEm vAlphabetic vHanging vIdeographic vMathematical values vectorEffect version vertAdvY vertOriginX vertOriginY viewBox viewTarget visibility widths wordSpacing writingMode x xHeight x1 x2 xChannelSelector xlinkActuate xlinkArcrole xlinkHref xlinkRole xlinkShow xlinkTitle xlinkType xmlBase xmlns xmlnsXlink xmlLang xmlSpace y y1 y2 yChannelSelector z zoomAndPan
	*/
	/* eslint-enable max-len */

	var ATTRIBUTE_REGEX = /^((?:s(?:uppressContentEditableWarn|croll|pac)|(?:shape|image|text)Render|(?:letter|word)Spac|vHang|hang)ing|(?:on(?:AnimationIteration|C(?:o(?:mposition(?:Update|Start|End)|ntextMenu|py)|anPlayThrough|anPlay|hange|lick|ut)|(?:(?:Duration|Volume|Rate)Chang|(?:MouseLea|(?:Touch|Mouse)Mo|DragLea)v|Paus)e|Loaded(?:Metad|D)ata|(?:Animation|Touch|Load|Drag)Start|(?:(?:T(?:ransition|ouch)|Animation)E|Suspe)nd|DoubleClick|(?:TouchCanc|Whe)el|(?:Mouse(?:Ent|Ov)e|Drag(?:Ent|Ov)e|Erro)r|TimeUpdate|(?:E(?:n(?:crypt|d)|mpti)|S(?:tall|eek))ed|MouseDown|P(?:rogress|laying)|(?:MouseOu|DragExi|S(?:elec|ubmi)|Rese|Inpu)t|KeyPress|DragEnd|Key(?:Down|Up)|(?:Wait|Seek)ing|(?:MouseU|Dro)p|Scroll|Paste|Focus|Abort|Drag|Play|Load|Blur|Invalid)Captur|alignmentBaselin|(?:limitingConeAng|xlink(?:(?:Arcr|R)o|Tit)|s(?:urfaceSca|ty|ca)|unselectab|baseProfi|fontSty|(?:focus|dragg)ab|multip|profi|tit)l|d(?:ominantBaselin|efaultValu)|a(?:uto(?:Capitaliz|Revers|Sav)|dditiv)|(?:(?:formNoValid|xlinkActu|noValid|accumul|rot)a|autoComple|decelera)t|(?:(?:attribute|item)T|datat)yp|(?:attribute|glyph)Nam|playsInlin|(?:formE|e)ncTyp|(?:writing|input|edge)Mod|(?:xlinkTy|itemSco|keyTy|slo)p|(?:amplitu|mo)d|(?:xmlSpa|non)c|fillRul|(?:dateTi|na)m|r(?:esourc|ol)|xmlBas|wmod)e|(?:glyphOrientationHorizont|loc)al|(?:externalResourcesRequir|select|revers|mut)ed|c(?:o(?:lorInterpolationFilter|ord)s|o(?:lor(?:Interpolation)?|nt(?:rols|ent))|(?:ontentS(?:cript|tyle)Typ|o(?:ntentEditab|lorProfi)l|l(?:assNam|ipRul)|a(?:lcMod|ptur)|it)e|olorRendering|l(?:ipPathUnits|assID)|(?:ontrolsLis|apHeigh)t|h(?:eckedLink|a(?:llenge|rSet)|ildren|ecked)|ell(?:Spac|Padd)ing|o(?:ntextMenu|ls)|(?:rossOrigi|olSpa)n|lip(?:Path)?|ursor|[xy])|glyphOrientationVertical|d(?:angerouslySetInnerHTML|efaultChecked|ownload|isabled|isplay|[xy])|(?:s(?:trikethroughThickn|eaml)es|(?:und|ov)erlineThicknes|r(?:equiredExtension|adiu)|(?:requiredFeatur|tableValu|stitchTil|numOctav|filterR)e|key(?:(?:Splin|Tim)e|Param)|autoFocu|header|bia)s|(?:(?:st(?:rikethroughPosi|dDevia)|(?:und|ov)erlinePosi|(?:textDecor|elev)a|orienta)tio|(?:strokeLinejo|orig)i|formActio|zoomAndPa|onFocusI|directio|(?:vers|act)io|rowSpa|begi|ico)n|o(?:n(?:AnimationIteration|C(?:o(?:mposition(?:Update|Start|End)|ntextMenu|py)|anPlayThrough|anPlay|hange|lick|ut)|(?:(?:Duration|Volume|Rate)Chang|(?:MouseLea|(?:Touch|Mouse)Mo|DragLea)v|Paus)e|Loaded(?:Metad|D)ata|(?:Animation|Touch|Load|Drag)Start|(?:(?:T(?:ransition|ouch)|Animation)E|Suspe)nd|DoubleClick|(?:TouchCanc|Whe)el|(?:Mouse(?:Ent|Ov)e|Drag(?:Ent|Ov)e|Erro)r|TimeUpdate|(?:E(?:n(?:crypt|d)|mpti)|S(?:tall|eek))ed|MouseDown|P(?:rogress|laying)|(?:MouseOu|DragExi|S(?:elec|ubmi)|Rese|Inpu)t|KeyPress|DragEnd|Key(?:Down|Up)|(?:Wait|Seek)ing|(?:MouseU|Dro)p|Scroll|Paste|Focus|Abort|Drag|Play|Load|Blur|Invalid)|rient)|p(?:reserveA(?:spectRatio|lpha)|ointsAt[X-Z]|anose1)|(?:patternContent|ma(?:sk(?:Content)?|rker)|primitive|gradient|pattern|filter)Units|(?:gradientT|patternT|t)ransform|(?:(?:allowTranspar|baseFrequ)enc|re(?:ferrerPolic|adOnl)|(?:(?:st(?:roke|op)O|floodO|fillO|o)pac|integr|secur)it|visibilit|fontFamil|accessKe|propert|summar)y|(?:strokeMiterlimi|(?:specularConsta|repeatCou|fontVaria)n|(?:(?:specularE|e)xpon|renderingInt|asc)en|d(?:iffuseConsta|esce)n|(?:fontSizeAdju|lengthAdju|manife)s|baselineShif|vectorEffec|(?:(?:mar(?:ker|gin)|x)H|accentH|fontW)eigh|a(?:utoCorrec|bou)|markerStar|onFocusOu|intercep|restar|forma|inlis|heigh|lis)t|(?:(?:st(?:rokeDasho|artO)|o)ffs|acceptChars|formTarg|viewTarg|srcS)et|(?:(?:enableBackgrou|markerE)n|s(?:p(?:readMetho|ee)|ee)|formMetho|m(?:arkerMi|etho)|preloa|kin)d|k(?:ernel(?:UnitLength|Matrix)|[1-4])|(?:[xy]ChannelSelect|lightingCol|textAnch|floodCol|stopCol|operat|htmlF)or|(?:allowFullScre|hidd)en|strokeDasharray|systemLanguage|(?:strokeLineca|itemPro|useMa|wra|loo)p|v(?:Mathematical|ert(?:Origin[XY]|AdvY)|alues|ocab)|(?:pointerEve|keyPoi)nts|unicodeRange|(?:(?:allowReord|placehold|frameBord|paintOrd|post|ord)e|repeatDu|d(?:efe|u))r|mathematical|(?:vI|i)deographic|h(?:oriz(?:Origin|Adv)X|ttpEquiv)|u(?:nicodeBidi|[12])|(?:fontStretc|hig)h|(?:(?:mar(?:ker|gin)W|strokeW)id|azimu)th|vAlphabetic|mediaGroup|spellCheck|(?:unitsPerE|optimu|fro)m|r(?:adioGroup|e(?:sults|f[XY]|l)|ows|[xy])|(?:xmlnsXl|valueL)ink|a(?:rabicForm|l(?:phabetic|t)|sync)|pathLength|(?:text|m(?:in|ax))Length|innerHTML|xlinkShow|(?:xlinkHr|glyphR)ef|r(?:e(?:quired|sult|f))?|o(?:verflow|pen)|(?:tabInde|(?:sand|b)bo|viewBo)x|(?:(?:href|xml|src)La|kerni)ng|f(?:o(?:ntSize|rm)|il(?:ter|l))|autoPlay|unicode|p(?:attern|oints)|t(?:arget[XY]|o)|i(?:temRef|n2|s)|divisor|d(?:efault|ata|ir)?|srcDoc|s(?:coped|te(?:m[hv]|p)|pan)|(?:width|size)s|(?:stri|la)ng|prefix|itemID|s(?:t(?:roke|art)|hape|cope|rc)|a(?:ccept|s)|t(?:arget|ype)|typeof|width|value|x(?:mlns)?|label|m(?:edia|a(?:sk|x)|in)|size|href|k(?:ey)?|end|low|x[12]|i[dn]|y[12]|g[12]|by|f[xy]|[yz])$/;

	/* From DOMProperty */
	var ATTRIBUTE_NAME_START_CHAR = ':A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD';
	var ATTRIBUTE_NAME_CHAR = ATTRIBUTE_NAME_START_CHAR + '\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040';
	var isCustomAttribute = RegExp.prototype.test.bind(new RegExp('^(x|data|aria)-[' + ATTRIBUTE_NAME_CHAR + ']*$'));

	var validAttr = (function (name) {
	  return ATTRIBUTE_REGEX.test(name) || isCustomAttribute(name.toLowerCase());
	});

	// 
	/**
	 * Creates a broadcast that can be listened to, i.e. simple event emitter
	 *
	 * @see https://github.com/ReactTraining/react-broadcast
	 */

	var createBroadcast = function createBroadcast(initialState) {
	  var listeners = {};
	  var id = 0;
	  var state = initialState;

	  function publish(nextState) {
	    state = nextState;

	    // eslint-disable-next-line guard-for-in, no-restricted-syntax
	    for (var key in listeners) {
	      var listener = listeners[key];
	      if (listener === undefined) {
	        // eslint-disable-next-line no-continue
	        continue;
	      }

	      listener(state);
	    }
	  }

	  function subscribe(listener) {
	    var currentId = id;
	    listeners[currentId] = listener;
	    id += 1;
	    listener(state);
	    return currentId;
	  }

	  function unsubscribe(unsubID) {
	    listeners[unsubID] = undefined;
	  }

	  return { publish: publish, subscribe: subscribe, unsubscribe: unsubscribe };
	};

	var _ThemeProvider$childC;
	var _ThemeProvider$contex;

	// 
	/* globals React$Element */
	// NOTE: DO NOT CHANGE, changing this is a semver major change!
	var CHANNEL = '__styled-components__';
	var CHANNEL_NEXT = CHANNEL + 'next__';

	var CONTEXT_CHANNEL_SHAPE = propTypes.shape({
	  getTheme: propTypes.func,
	  subscribe: propTypes.func,
	  unsubscribe: propTypes.func
	});

	var warnChannelDeprecated = void 0;
	{
	  warnChannelDeprecated = once(function () {
	    // eslint-disable-next-line no-console
	    console.error('Warning: Usage of `context.' + CHANNEL + '` as a function is deprecated. It will be replaced with the object on `.context.' + CHANNEL_NEXT + '` in a future version.');
	  });
	}

	var isFunction = function isFunction(test) {
	  return typeof test === 'function';
	};

	/**
	 * Provide a theme to an entire react component tree via context and event listeners (have to do
	 * both context and event emitter as pure components block context updates)
	 */

	var ThemeProvider = function (_Component) {
	  inherits(ThemeProvider, _Component);

	  function ThemeProvider() {
	    classCallCheck(this, ThemeProvider);

	    var _this = possibleConstructorReturn(this, _Component.call(this));

	    _this.unsubscribeToOuterId = -1;

	    _this.getTheme = _this.getTheme.bind(_this);
	    return _this;
	  }

	  ThemeProvider.prototype.componentWillMount = function componentWillMount() {
	    var _this2 = this;

	    // If there is a ThemeProvider wrapper anywhere around this theme provider, merge this theme
	    // with the outer theme
	    var outerContext = this.context[CHANNEL_NEXT];
	    if (outerContext !== undefined) {
	      this.unsubscribeToOuterId = outerContext.subscribe(function (theme) {
	        _this2.outerTheme = theme;

	        if (_this2.broadcast !== undefined) {
	          _this2.publish(_this2.props.theme);
	        }
	      });
	    }

	    this.broadcast = createBroadcast(this.getTheme());
	  };

	  ThemeProvider.prototype.getChildContext = function getChildContext() {
	    var _this3 = this,
	        _babelHelpers$extends;

	    return _extends({}, this.context, (_babelHelpers$extends = {}, _babelHelpers$extends[CHANNEL_NEXT] = {
	      getTheme: this.getTheme,
	      subscribe: this.broadcast.subscribe,
	      unsubscribe: this.broadcast.unsubscribe
	    }, _babelHelpers$extends[CHANNEL] = function (subscriber) {
	      {
	        warnChannelDeprecated();
	      }

	      // Patch the old `subscribe` provide via `CHANNEL` for older clients.
	      var unsubscribeId = _this3.broadcast.subscribe(subscriber);
	      return function () {
	        return _this3.broadcast.unsubscribe(unsubscribeId);
	      };
	    }, _babelHelpers$extends));
	  };

	  ThemeProvider.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	    if (this.props.theme !== nextProps.theme) {
	      this.publish(nextProps.theme);
	    }
	  };

	  ThemeProvider.prototype.componentWillUnmount = function componentWillUnmount() {
	    if (this.unsubscribeToOuterId !== -1) {
	      this.context[CHANNEL_NEXT].unsubscribe(this.unsubscribeToOuterId);
	    }
	  };

	  // Get the theme from the props, supporting both (outerTheme) => {} as well as object notation


	  ThemeProvider.prototype.getTheme = function getTheme(passedTheme) {
	    var theme = passedTheme || this.props.theme;
	    if (isFunction(theme)) {
	      var mergedTheme = theme(this.outerTheme);
	      if ("development" !== 'production' && !isPlainObject(mergedTheme)) {
	        throw new Error('[ThemeProvider] Please return an object from your theme function, i.e. theme={() => ({})}!');
	      }
	      return mergedTheme;
	    }
	    if (!isPlainObject(theme)) {
	      throw new Error('[ThemeProvider] Please make your theme prop a plain object');
	    }
	    return _extends({}, this.outerTheme, theme);
	  };

	  ThemeProvider.prototype.publish = function publish(theme) {
	    this.broadcast.publish(this.getTheme(theme));
	  };

	  ThemeProvider.prototype.render = function render() {
	    if (!this.props.children) {
	      return null;
	    }
	    return react.Children.only(this.props.children);
	  };

	  return ThemeProvider;
	}(react_6);

	ThemeProvider.childContextTypes = (_ThemeProvider$childC = {}, _ThemeProvider$childC[CHANNEL] = propTypes.func, _ThemeProvider$childC[CHANNEL_NEXT] = CONTEXT_CHANNEL_SHAPE, _ThemeProvider$childC);
	ThemeProvider.contextTypes = (_ThemeProvider$contex = {}, _ThemeProvider$contex[CHANNEL_NEXT] = CONTEXT_CHANNEL_SHAPE, _ThemeProvider$contex);

	// 

	// HACK for generating all static styles without needing to allocate
	// an empty execution context every single time...
	var STATIC_EXECUTION_CONTEXT = {};

	var _StyledComponent = (function (ComponentStyle, constructWithOptions) {
	  var identifiers = {};

	  /* We depend on components having unique IDs */
	  var generateId = function generateId(_displayName, parentComponentId) {
	    var displayName = typeof _displayName !== 'string' ? 'sc' : escape$1(_displayName);

	    var componentId = void 0;

	    /**
	     * only fall back to hashing the component injection order if
	     * a proper displayName isn't provided by the babel plugin
	     */
	    if (!_displayName) {
	      var nr = (identifiers[displayName] || 0) + 1;
	      identifiers[displayName] = nr;

	      componentId = displayName + '-' + ComponentStyle.generateName(displayName + nr);
	    } else {
	      componentId = displayName + '-' + ComponentStyle.generateName(displayName);
	    }

	    return parentComponentId !== undefined ? parentComponentId + '-' + componentId : componentId;
	  };

	  var BaseStyledComponent = function (_Component) {
	    inherits(BaseStyledComponent, _Component);

	    function BaseStyledComponent() {
	      var _temp, _this, _ret;

	      classCallCheck(this, BaseStyledComponent);

	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      return _ret = (_temp = (_this = possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.attrs = {}, _this.state = {
	        theme: null,
	        generatedClassName: ''
	      }, _this.unsubscribeId = -1, _temp), possibleConstructorReturn(_this, _ret);
	    }

	    BaseStyledComponent.prototype.unsubscribeFromContext = function unsubscribeFromContext() {
	      if (this.unsubscribeId !== -1) {
	        this.context[CHANNEL_NEXT].unsubscribe(this.unsubscribeId);
	      }
	    };

	    BaseStyledComponent.prototype.buildExecutionContext = function buildExecutionContext(theme, props) {
	      var attrs = this.constructor.attrs;

	      var context = _extends({}, props, { theme: theme });
	      if (attrs === undefined) {
	        return context;
	      }

	      this.attrs = Object.keys(attrs).reduce(function (acc, key) {
	        var attr = attrs[key];
	        // eslint-disable-next-line no-param-reassign
	        acc[key] = typeof attr === 'function' ? attr(context) : attr;
	        return acc;
	      }, {});

	      return _extends({}, context, this.attrs);
	    };

	    BaseStyledComponent.prototype.generateAndInjectStyles = function generateAndInjectStyles(theme, props) {
	      var _constructor = this.constructor,
	          attrs = _constructor.attrs,
	          componentStyle = _constructor.componentStyle,
	          warnTooManyClasses = _constructor.warnTooManyClasses;

	      var styleSheet = this.context[CONTEXT_KEY] || StyleSheet.master;

	      // staticaly styled-components don't need to build an execution context object,
	      // and shouldn't be increasing the number of class names
	      if (componentStyle.isStatic && attrs === undefined) {
	        return componentStyle.generateAndInjectStyles(STATIC_EXECUTION_CONTEXT, styleSheet);
	      } else {
	        var executionContext = this.buildExecutionContext(theme, props);
	        var className = componentStyle.generateAndInjectStyles(executionContext, styleSheet);

	        if ("development" !== 'production' && warnTooManyClasses !== undefined) {
	          warnTooManyClasses(className);
	        }

	        return className;
	      }
	    };

	    BaseStyledComponent.prototype.componentWillMount = function componentWillMount() {
	      var _this2 = this;

	      var componentStyle = this.constructor.componentStyle;

	      var styledContext = this.context[CHANNEL_NEXT];

	      // If this is a staticaly-styled component, we don't need to the theme
	      // to generate or build styles.
	      if (componentStyle.isStatic) {
	        var generatedClassName = this.generateAndInjectStyles(STATIC_EXECUTION_CONTEXT, this.props);
	        this.setState({ generatedClassName: generatedClassName });
	        // If there is a theme in the context, subscribe to the event emitter. This
	        // is necessary due to pure components blocking context updates, this circumvents
	        // that by updating when an event is emitted
	      } else if (styledContext !== undefined) {
	        var subscribe = styledContext.subscribe;

	        this.unsubscribeId = subscribe(function (nextTheme) {
	          // This will be called once immediately
	          var theme = determineTheme(_this2.props, nextTheme, _this2.constructor.defaultProps);
	          var generatedClassName = _this2.generateAndInjectStyles(theme, _this2.props);

	          _this2.setState({ theme: theme, generatedClassName: generatedClassName });
	        });
	      } else {
	        // eslint-disable-next-line react/prop-types
	        var theme = this.props.theme || {};
	        var _generatedClassName = this.generateAndInjectStyles(theme, this.props);
	        this.setState({ theme: theme, generatedClassName: _generatedClassName });
	      }
	    };

	    BaseStyledComponent.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	      var _this3 = this;

	      // If this is a statically-styled component, we don't need to listen to
	      // props changes to update styles
	      var componentStyle = this.constructor.componentStyle;

	      if (componentStyle.isStatic) {
	        return;
	      }

	      this.setState(function (oldState) {
	        var theme = determineTheme(nextProps, oldState.theme, _this3.constructor.defaultProps);
	        var generatedClassName = _this3.generateAndInjectStyles(theme, nextProps);

	        return { theme: theme, generatedClassName: generatedClassName };
	      });
	    };

	    BaseStyledComponent.prototype.componentWillUnmount = function componentWillUnmount() {
	      this.unsubscribeFromContext();
	    };

	    BaseStyledComponent.prototype.render = function render() {
	      var _this4 = this;

	      // eslint-disable-next-line react/prop-types
	      var innerRef = this.props.innerRef;
	      var generatedClassName = this.state.generatedClassName;
	      var _constructor2 = this.constructor,
	          styledComponentId = _constructor2.styledComponentId,
	          target = _constructor2.target;


	      var isTargetTag = isTag(target);

	      var className = [
	      // eslint-disable-next-line react/prop-types
	      this.props.className, styledComponentId, this.attrs.className, generatedClassName].filter(Boolean).join(' ');

	      var baseProps = _extends({}, this.attrs, {
	        className: className
	      });

	      if (isStyledComponent(target)) {
	        baseProps.innerRef = innerRef;
	      } else {
	        baseProps.ref = innerRef;
	      }

	      var propsForElement = Object.keys(this.props).reduce(function (acc, propName) {
	        // Don't pass through non HTML tags through to HTML elements
	        // always omit innerRef
	        if (propName !== 'innerRef' && propName !== 'className' && (!isTargetTag || validAttr(propName))) {
	          // eslint-disable-next-line no-param-reassign
	          acc[propName] = _this4.props[propName];
	        }

	        return acc;
	      }, baseProps);

	      return react_3(target, propsForElement);
	    };

	    return BaseStyledComponent;
	  }(react_6);

	  var createStyledComponent = function createStyledComponent(target, options, rules) {
	    var _StyledComponent$cont;

	    var _options$isClass = options.isClass,
	        isClass = _options$isClass === undefined ? !isTag(target) : _options$isClass,
	        _options$displayName = options.displayName,
	        displayName = _options$displayName === undefined ? generateDisplayName(target) : _options$displayName,
	        _options$componentId = options.componentId,
	        componentId = _options$componentId === undefined ? generateId(options.displayName, options.parentComponentId) : _options$componentId,
	        _options$ParentCompon = options.ParentComponent,
	        ParentComponent = _options$ParentCompon === undefined ? BaseStyledComponent : _options$ParentCompon,
	        extendingRules = options.rules,
	        attrs = options.attrs;


	    var styledComponentId = options.displayName && options.componentId ? escape$1(options.displayName) + '-' + options.componentId : componentId;

	    var componentStyle = new ComponentStyle(extendingRules === undefined ? rules : extendingRules.concat(rules), attrs, styledComponentId);

	    var StyledComponent = function (_ParentComponent) {
	      inherits(StyledComponent, _ParentComponent);

	      function StyledComponent() {
	        classCallCheck(this, StyledComponent);
	        return possibleConstructorReturn(this, _ParentComponent.apply(this, arguments));
	      }

	      StyledComponent.withComponent = function withComponent(tag) {
	        var previousComponentId = options.componentId,
	            optionsToCopy = objectWithoutProperties(options, ['componentId']);


	        var newComponentId = previousComponentId && previousComponentId + '-' + (isTag(tag) ? tag : escape$1(getComponentName(tag)));

	        var newOptions = _extends({}, optionsToCopy, {
	          componentId: newComponentId,
	          ParentComponent: StyledComponent
	        });

	        return createStyledComponent(tag, newOptions, rules);
	      };

	      createClass(StyledComponent, null, [{
	        key: 'extend',
	        get: function get$$1() {
	          var rulesFromOptions = options.rules,
	              parentComponentId = options.componentId,
	              optionsToCopy = objectWithoutProperties(options, ['rules', 'componentId']);


	          var newRules = rulesFromOptions === undefined ? rules : rulesFromOptions.concat(rules);

	          var newOptions = _extends({}, optionsToCopy, {
	            rules: newRules,
	            parentComponentId: parentComponentId,
	            ParentComponent: StyledComponent
	          });

	          return constructWithOptions(createStyledComponent, target, newOptions);
	        }
	      }]);
	      return StyledComponent;
	    }(ParentComponent);

	    StyledComponent.contextTypes = (_StyledComponent$cont = {}, _StyledComponent$cont[CHANNEL] = propTypes.func, _StyledComponent$cont[CHANNEL_NEXT] = CONTEXT_CHANNEL_SHAPE, _StyledComponent$cont[CONTEXT_KEY] = propTypes.oneOfType([propTypes.instanceOf(StyleSheet), propTypes.instanceOf(ServerStyleSheet)]), _StyledComponent$cont);


	    {
	      StyledComponent.warnTooManyClasses = createWarnTooManyClasses(displayName);
	    }

	    if (isClass) hoistNonReactStatics(StyledComponent, target);

	    // we do this after hoisting to ensure we're overwriting existing
	    // rules when wrapping another styled component class
	    StyledComponent.displayName = displayName;
	    StyledComponent.styledComponentId = styledComponentId;
	    StyledComponent.attrs = attrs;
	    StyledComponent.componentStyle = componentStyle;
	    StyledComponent.target = target;

	    return StyledComponent;
	  };

	  return createStyledComponent;
	});

	// Source: https://github.com/garycourt/murmurhash-js/blob/master/murmurhash2_gc.js
	function murmurhash(str) {
	  var l = str.length | 0,
	      h = l | 0,
	      i = 0,
	      k;

	  while (l >= 4) {
	    k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;

	    k = (k & 0xffff) * 0x5bd1e995 + (((k >>> 16) * 0x5bd1e995 & 0xffff) << 16);
	    k ^= k >>> 24;
	    k = (k & 0xffff) * 0x5bd1e995 + (((k >>> 16) * 0x5bd1e995 & 0xffff) << 16);

	    h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16) ^ k;

	    l -= 4;
	    ++i;
	  }

	  switch (l) {
	    case 3:
	      h ^= (str.charCodeAt(i + 2) & 0xff) << 16;
	    case 2:
	      h ^= (str.charCodeAt(i + 1) & 0xff) << 8;
	    case 1:
	      h ^= str.charCodeAt(i) & 0xff;
	      h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16);
	  }

	  h ^= h >>> 13;
	  h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16);
	  h ^= h >>> 15;

	  return h >>> 0;
	}

	// 
	var areStylesCacheable = IS_BROWSER;

	var isStaticRules = function isStaticRules(rules, attrs) {
	  for (var i = 0; i < rules.length; i += 1) {
	    var rule = rules[i];

	    // recursive case
	    if (Array.isArray(rule) && !isStaticRules(rule)) {
	      return false;
	    } else if (typeof rule === 'function' && !isStyledComponent(rule)) {
	      // functions are allowed to be static if they're just being
	      // used to get the classname of a nested styled component
	      return false;
	    }
	  }

	  if (attrs !== undefined) {
	    // eslint-disable-next-line guard-for-in, no-restricted-syntax
	    for (var key in attrs) {
	      var value = attrs[key];
	      if (typeof value === 'function') {
	        return false;
	      }
	    }
	  }

	  return true;
	};

	var isHMREnabled = typeof module !== 'undefined' && module.hot && "development" !== 'production';

	/*
	 ComponentStyle is all the CSS-specific stuff, not
	 the React-specific stuff.
	 */
	var _ComponentStyle = (function (nameGenerator, flatten, stringifyRules) {
	  /* combines hashStr (murmurhash) and nameGenerator for convenience */
	  var generateRuleHash = function generateRuleHash(str) {
	    return nameGenerator(murmurhash(str));
	  };

	  var ComponentStyle = function () {
	    function ComponentStyle(rules, attrs, componentId) {
	      classCallCheck(this, ComponentStyle);

	      this.rules = rules;
	      this.isStatic = !isHMREnabled && isStaticRules(rules, attrs);
	      this.componentId = componentId;

	      if (!StyleSheet.master.hasId(componentId)) {
	        var placeholder = ['.' + componentId + ' {}'];

	        StyleSheet.master.deferredInject(componentId, placeholder);
	      }
	    }

	    /*
	     * Flattens a rule set into valid CSS
	     * Hashes it, wraps the whole chunk in a .hash1234 {}
	     * Returns the hash to be injected on render()
	     * */


	    ComponentStyle.prototype.generateAndInjectStyles = function generateAndInjectStyles(executionContext, styleSheet) {
	      var isStatic = this.isStatic,
	          componentId = this.componentId,
	          lastClassName = this.lastClassName;

	      if (areStylesCacheable && isStatic && lastClassName !== undefined && styleSheet.hasNameForId(componentId, lastClassName)) {
	        return lastClassName;
	      }

	      var flatCSS = flatten(this.rules, executionContext);
	      var name = generateRuleHash(this.componentId + flatCSS.join(''));

	      if (!styleSheet.hasNameForId(componentId, name)) {
	        var css = stringifyRules(flatCSS, '.' + name);
	        styleSheet.inject(this.componentId, css, name);
	      }

	      this.lastClassName = name;
	      return name;
	    };

	    ComponentStyle.generateName = function generateName(str) {
	      return generateRuleHash(str);
	    };

	    return ComponentStyle;
	  }();

	  return ComponentStyle;
	});

	// 
	// Thanks to ReactDOMFactories for this handy list!

	var domElements = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr',

	// SVG
	'circle', 'clipPath', 'defs', 'ellipse', 'foreignObject', 'g', 'image', 'line', 'linearGradient', 'mask', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'svg', 'text', 'tspan'];

	// 
	var _styled = (function (styledComponent, constructWithOptions) {
	  var styled = function styled(tag) {
	    return constructWithOptions(styledComponent, tag);
	  };

	  // Shorthands for all valid HTML Elements
	  domElements.forEach(function (domElement) {
	    styled[domElement] = styled(domElement);
	  });

	  return styled;
	});

	// 
	var replaceWhitespace = function replaceWhitespace(str) {
	  return str.replace(/\s|\\n/g, '');
	};

	var _keyframes = (function (nameGenerator, stringifyRules, css) {
	  return function () {
	    var styleSheet = StyleSheet.master;
	    var rules = css.apply(undefined, arguments);
	    var name = nameGenerator(murmurhash(replaceWhitespace(JSON.stringify(rules))));
	    var id = 'sc-keyframes-' + name;

	    if (!styleSheet.hasNameForId(id, name)) {
	      styleSheet.inject(id, stringifyRules(rules, name, '@keyframes'), name);
	    }

	    return name;
	  };
	});

	// 
	var _injectGlobal = (function (stringifyRules, css) {
	  var injectGlobal = function injectGlobal() {
	    var styleSheet = StyleSheet.master;
	    var rules = css.apply(undefined, arguments);
	    var hash = murmurhash(JSON.stringify(rules));
	    var id = 'sc-global-' + hash;

	    if (!styleSheet.hasId(id)) {
	      styleSheet.inject(id, stringifyRules(rules));
	    }
	  };

	  return injectGlobal;
	});

	// 
	var _constructWithOptions = (function (css) {
	  var constructWithOptions = function constructWithOptions(componentConstructor, tag) {
	    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	    if (!reactIs_1(tag)) {
	      throw new Error('Cannot create styled-component for component: ' + String(tag));
	    }

	    /* This is callable directly as a template function */
	    // $FlowFixMe: Not typed to avoid destructuring arguments
	    var templateFunction = function templateFunction() {
	      return componentConstructor(tag, options, css.apply(undefined, arguments));
	    };

	    /* If config methods are called, wrap up a new template function and merge options */
	    templateFunction.withConfig = function (config) {
	      return constructWithOptions(componentConstructor, tag, _extends({}, options, config));
	    };
	    templateFunction.attrs = function (attrs) {
	      return constructWithOptions(componentConstructor, tag, _extends({}, options, {
	        attrs: _extends({}, options.attrs || {}, attrs)
	      }));
	    };

	    return templateFunction;
	  };

	  return constructWithOptions;
	});

	// 
	/* globals ReactClass */

	var wrapWithTheme = function wrapWithTheme(Component$$1) {
	  var _WithTheme$contextTyp;

	  var componentName = Component$$1.displayName || Component$$1.name || 'Component';
	  var isStatelessFunctionalComponent = typeof Component$$1 === 'function' && !(Component$$1.prototype && 'isReactComponent' in Component$$1.prototype);

	  // NOTE: We can't pass a ref to a stateless functional component
	  var shouldSetInnerRef = isStyledComponent(Component$$1) || isStatelessFunctionalComponent;

	  var WithTheme = function (_React$Component) {
	    inherits(WithTheme, _React$Component);

	    function WithTheme() {
	      var _temp, _this, _ret;

	      classCallCheck(this, WithTheme);

	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      return _ret = (_temp = (_this = possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {}, _this.unsubscribeId = -1, _temp), possibleConstructorReturn(_this, _ret);
	    }

	    // NOTE: This is so that isStyledComponent passes for the innerRef unwrapping


	    WithTheme.prototype.componentWillMount = function componentWillMount() {
	      var _this2 = this;

	      var defaultProps = this.constructor.defaultProps;

	      var styledContext = this.context[CHANNEL_NEXT];
	      var themeProp = determineTheme(this.props, undefined, defaultProps);
	      if (styledContext === undefined && themeProp === undefined && "development" !== 'production') {
	        // eslint-disable-next-line no-console
	        console.warn('[withTheme] You are not using a ThemeProvider nor passing a theme prop or a theme in defaultProps');
	      } else if (styledContext === undefined && themeProp !== undefined) {
	        this.setState({ theme: themeProp });
	      } else {
	        var subscribe = styledContext.subscribe;

	        this.unsubscribeId = subscribe(function (nextTheme) {
	          var theme = determineTheme(_this2.props, nextTheme, defaultProps);
	          _this2.setState({ theme: theme });
	        });
	      }
	    };

	    WithTheme.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	      var defaultProps = this.constructor.defaultProps;

	      this.setState(function (oldState) {
	        var theme = determineTheme(nextProps, oldState.theme, defaultProps);

	        return { theme: theme };
	      });
	    };

	    WithTheme.prototype.componentWillUnmount = function componentWillUnmount() {
	      if (this.unsubscribeId !== -1) {
	        this.context[CHANNEL_NEXT].unsubscribe(this.unsubscribeId);
	      }
	    };

	    WithTheme.prototype.render = function render() {
	      var props = _extends({
	        theme: this.state.theme
	      }, this.props);

	      if (!shouldSetInnerRef) {
	        props.ref = props.innerRef;
	        delete props.innerRef;
	      }

	      return react.createElement(Component$$1, props);
	    };

	    return WithTheme;
	  }(react.Component);

	  WithTheme.displayName = 'WithTheme(' + componentName + ')';
	  WithTheme.styledComponentId = 'withTheme';
	  WithTheme.contextTypes = (_WithTheme$contextTyp = {}, _WithTheme$contextTyp[CHANNEL] = propTypes.func, _WithTheme$contextTyp[CHANNEL_NEXT] = CONTEXT_CHANNEL_SHAPE, _WithTheme$contextTyp);


	  return hoistNonReactStatics(WithTheme, Component$$1);
	};

	// 

	/* eslint-disable */
	var __DO_NOT_USE_OR_YOU_WILL_BE_HAUNTED_BY_SPOOKY_GHOSTS = {
	  StyleSheet: StyleSheet
	};

	// 

	/* Import singletons */
	/* Import singleton constructors */
	/* Import components */
	/* Import Higher Order Components */
	/* Warning if you've imported this file on React Native */
	if ("development" !== 'production' && typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
	  // eslint-disable-next-line no-console
	  console.warn("It looks like you've imported 'styled-components' on React Native.\n" + "Perhaps you're looking to import 'styled-components/native'?\n" + 'Read more about this at https://www.styled-components.com/docs/basics#react-native');
	}

	/* Warning if there are several instances of styled-components */
	if ("development" !== 'production' && "development" !== 'test' && typeof window !== 'undefined' && typeof navigator !== 'undefined' && typeof navigator.userAgent === 'string' && navigator.userAgent.indexOf('Node.js') === -1 && navigator.userAgent.indexOf('jsdom') === -1) {
	  window['__styled-components-init__'] = window['__styled-components-init__'] || 0;

	  if (window['__styled-components-init__'] === 1) {
	    // eslint-disable-next-line no-console
	    console.warn("It looks like there are several instances of 'styled-components' initialized in this application. " + 'This may cause dynamic styles not rendering properly, errors happening during rehydration process ' + 'and makes your application bigger without a good reason.\n\n' + 'See https://s-c.sh/2BAXzed for more info.');
	  }

	  window['__styled-components-init__'] += 1;
	}

	/* Instantiate singletons */
	var ComponentStyle = _ComponentStyle(generateAlphabeticName, flatten, stringifyRules);
	var constructWithOptions = _constructWithOptions(css);
	var StyledComponent = _StyledComponent(ComponentStyle, constructWithOptions);

	/* Instantiate exported singletons */
	var keyframes = _keyframes(generateAlphabeticName, stringifyRules, css);
	var injectGlobal = _injectGlobal(stringifyRules, css);
	var styled = _styled(StyledComponent, constructWithOptions);

	var styledComponents_browser_es = /*#__PURE__*/Object.freeze({
		css: css,
		keyframes: keyframes,
		injectGlobal: injectGlobal,
		isStyledComponent: isStyledComponent,
		consolidateStreamedStyles: consolidateStreamedStyles,
		ThemeProvider: ThemeProvider,
		withTheme: wrapWithTheme,
		ServerStyleSheet: ServerStyleSheet,
		StyleSheetManager: StyleSheetManager,
		__DO_NOT_USE_OR_YOU_WILL_BE_HAUNTED_BY_SPOOKY_GHOSTS: __DO_NOT_USE_OR_YOU_WILL_BE_HAUNTED_BY_SPOOKY_GHOSTS,
		default: styled
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

	var _styledComponents = ( styledComponents_browser_es && styled ) || styledComponents_browser_es;

	var Box_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



	var _styledComponents2 = _interopRequireDefault(_styledComponents);





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

	function _extends$1() {
	  _extends$1 = Object.assign || function (target) {
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

	  return _extends$1.apply(this, arguments);
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

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @typechecks
	 */

	var _uppercasePattern$1 = /([A-Z])/g;

	/**
	 * Hyphenates a camelcased string, for example:
	 *
	 *   > hyphenate('backgroundColor')
	 *   < "background-color"
	 *
	 * For CSS style names, use `hyphenateStyleName` instead which works properly
	 * with all vendor prefixes, including `ms`.
	 *
	 * @param {string} string
	 * @return {string}
	 */
	function hyphenate$2$1(string) {
	  return string.replace(_uppercasePattern$1, '-$1').toLowerCase();
	}

	var hyphenate_1$1 = hyphenate$2$1;

	var hyphenate$1 = hyphenate_1$1;

	var msPattern$1 = /^ms-/;

	/**
	 * Hyphenates a camelcased CSS property name, for example:
	 *
	 *   > hyphenateStyleName('backgroundColor')
	 *   < "background-color"
	 *   > hyphenateStyleName('MozTransition')
	 *   < "-moz-transition"
	 *   > hyphenateStyleName('msTransition')
	 *   < "-ms-transition"
	 *
	 * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
	 * is converted to `-ms-`.
	 *
	 * @param {string} string
	 * @return {string}
	 */
	function hyphenateStyleName$1(string) {
	  return hyphenate$1(string).replace(msPattern$1, '-ms-');
	}

	var hyphenateStyleName_1$1 = hyphenateStyleName$1;

	// 
	var objToCss$1 = function objToCss(obj, prevKey) {
	  var css = Object.keys(obj).filter(function (key) {
	    var chunk = obj[key];
	    return chunk !== undefined && chunk !== null && chunk !== false && chunk !== '';
	  }).map(function (key) {
	    if (isPlainObject(obj[key])) return objToCss(obj[key], key);
	    return hyphenateStyleName_1$1(key) + ': ' + obj[key] + ';';
	  }).join(' ');
	  return prevKey ? prevKey + ' {\n  ' + css + '\n}' : css;
	};

	var flatten$1 = function flatten(chunks, executionContext) {
	  return chunks.reduce(function (ruleSet, chunk) {
	    /* Remove falsey values */
	    if (chunk === undefined || chunk === null || chunk === false || chunk === '') {
	      return ruleSet;
	    }
	    /* Flatten ruleSet */
	    if (Array.isArray(chunk)) {
	      return [].concat(ruleSet, flatten(chunk, executionContext));
	    }

	    /* Handle other components */
	    if (chunk.hasOwnProperty('styledComponentId')) {
	      // $FlowFixMe not sure how to make this pass
	      return [].concat(ruleSet, ['.' + chunk.styledComponentId]);
	    }

	    /* Either execute or defer the function */
	    if (typeof chunk === 'function') {
	      return executionContext ? ruleSet.concat.apply(ruleSet, flatten([chunk(executionContext)], executionContext)) : ruleSet.concat(chunk);
	    }

	    /* Handle objects */
	    return ruleSet.concat(
	    // $FlowFixMe have to add %checks somehow to isPlainObject
	    isPlainObject(chunk) ? objToCss$1(chunk) : chunk.toString());
	  }, []);
	};

	// 
	// NOTE: This stylis instance is only used to split rules from SSR'd style tags
	var stylisSplitter$1 = new stylis({
	  global: false,
	  cascade: true,
	  keyframe: false,
	  prefix: false,
	  compress: false,
	  semicolon: true
	});

	var stylis$2 = new stylis({
	  global: false,
	  cascade: true,
	  keyframe: false,
	  prefix: true,
	  compress: false,
	  semicolon: false // NOTE: This means "autocomplete missing semicolons"
	});

	// Wrap `insertRulePlugin to build a list of rules,
	// and then make our own plugin to return the rules. This
	// makes it easier to hook into the existing SSR architecture

	var parsingRules$1 = [];
	// eslint-disable-next-line consistent-return
	var returnRulesPlugin$1 = function returnRulesPlugin(context) {
	  if (context === -2) {
	    var parsedRules = parsingRules$1;
	    parsingRules$1 = [];
	    return parsedRules;
	  }
	};

	var parseRulesPlugin$1 = stylisRuleSheet(function (rule) {
	  parsingRules$1.push(rule);
	});

	stylis$2.use([parseRulesPlugin$1, returnRulesPlugin$1]);
	stylisSplitter$1.use([parseRulesPlugin$1, returnRulesPlugin$1]);

	var stringifyRules$1 = function stringifyRules(rules, selector, prefix) {
	  var flatCSS = rules.join('').replace(/^\s*\/\/.*$/gm, ''); // replace JS comments

	  var cssStr = selector && prefix ? prefix + ' ' + selector + ' { ' + flatCSS + ' }' : flatCSS;

	  return stylis$2(prefix || !selector ? '' : selector, cssStr);
	};

	var splitByRules$1 = function splitByRules(css) {
	  return stylisSplitter$1('', css);
	};

	// 

	function isStyledComponent$1(target) /* : %checks */{
	  return typeof target === 'function' && typeof target.styledComponentId === 'string';
	}

	// 

	/* This function is DEPRECATED and will be removed on the next major version release.
	 * It was needed to rehydrate all style blocks prepended to chunks before React
	 * tries to rehydrate its HTML stream. Since the master StyleSheet will now detect
	 * the use of streamed style tags and will perform the rehydration earlier when needed
	 * this function will not be needed anymore */
	function consolidateStreamedStyles$1() {
	  {
	    // eslint-disable-next-line no-console
	    console.warn('styled-components automatically does streaming SSR rehydration now.\n' + 'Calling consolidateStreamedStyles manually is no longer necessary and a noop now.\n' + '- Please remove the consolidateStreamedStyles call from your client.');
	  }
	}

	// 
	/* eslint-disable no-bitwise */

	/* This is the "capacity" of our alphabet i.e. 2x26 for all letters plus their capitalised
	 * counterparts */
	var charsLength$1 = 52;

	/* start at 75 for 'a' until 'z' (25) and then start at 65 for capitalised letters */
	var getAlphabeticChar$1 = function getAlphabeticChar(code) {
	  return String.fromCharCode(code + (code > 25 ? 39 : 97));
	};

	/* input a number, usually a hash and convert it to base-52 */
	var generateAlphabeticName$1 = function generateAlphabeticName(code) {
	  var name = '';
	  var x = void 0;

	  /* get a char and divide by alphabet-length */
	  for (x = code; x > charsLength$1; x = Math.floor(x / charsLength$1)) {
	    name = getAlphabeticChar$1(x % charsLength$1) + name;
	  }

	  return getAlphabeticChar$1(x % charsLength$1) + name;
	};

	// 

	var interleave$1 = (function (strings, interpolations) {
	  return interpolations.reduce(function (array, interp, i) {
	    return array.concat(interp, strings[i + 1]);
	  }, [strings[0]]);
	});

	// 
	var css$1 = (function (strings) {
	  for (var _len = arguments.length, interpolations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    interpolations[_key - 1] = arguments[_key];
	  }

	  return flatten$1(interleave$1(strings, interpolations));
	});

	var stream$1 = {};

	// 


	var SC_ATTR$1 = typeof process !== 'undefined' && process.env.SC_ATTR || 'data-styled-components';
	var SC_STREAM_ATTR$1 = 'data-styled-streamed';
	var CONTEXT_KEY$1 = '__styled-components-stylesheet__';

	var IS_BROWSER$1 = typeof window !== 'undefined' && 'HTMLElement' in window;

	var DISABLE_SPEEDY$1 = typeof false === 'boolean' && false || "development" !== 'production';

	// 
	var SC_COMPONENT_ID$1 = /^[^\S\n]*?\/\* sc-component-id:\s*(\S+)\s+\*\//gm;

	var extractComps$1 = (function (maybeCSS) {
	  var css = '' + (maybeCSS || ''); // Definitely a string, and a clone
	  var existingComponents = [];
	  css.replace(SC_COMPONENT_ID$1, function (match, componentId, matchIndex) {
	    existingComponents.push({ componentId: componentId, matchIndex: matchIndex });
	    return match;
	  });
	  return existingComponents.map(function (_ref, i) {
	    var componentId = _ref.componentId,
	        matchIndex = _ref.matchIndex;

	    var nextComp = existingComponents[i + 1];
	    var cssFromDOM = nextComp ? css.slice(matchIndex, nextComp.matchIndex) : css.slice(matchIndex);
	    return { componentId: componentId, cssFromDOM: cssFromDOM };
	  });
	});

	// 
	/* eslint-disable camelcase, no-undef */

	var getNonce$1 = (function () {
	  return typeof __webpack_nonce__ !== 'undefined' ? __webpack_nonce__ : null;
	});

	// 
	// Helper to call a given function, only once
	var once$1 = (function (cb) {
	  var called = false;

	  return function () {
	    if (!called) {
	      called = true;
	      cb();
	    }
	  };
	});

	var classCallCheck$1 = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	var createClass$1 = function () {
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







	var _extends$2 = Object.assign || function (target) {
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



	var inherits$1 = function (subClass, superClass) {
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









	var objectWithoutProperties$1 = function (obj, keys) {
	  var target = {};

	  for (var i in obj) {
	    if (keys.indexOf(i) >= 0) continue;
	    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
	    target[i] = obj[i];
	  }

	  return target;
	};

	var possibleConstructorReturn$1 = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && (typeof call === "object" || typeof call === "function") ? call : self;
	};

	// 
	/* These are helpers for the StyleTags to keep track of the injected
	 * rule names for each (component) ID that they're keeping track of.
	 * They're crucial for detecting whether a name has already been
	 * injected.
	 * (This excludes rehydrated names) */

	/* adds a new ID:name pairing to a names dictionary */
	var addNameForId$1 = function addNameForId(names, id, name) {
	  if (name) {
	    // eslint-disable-next-line no-param-reassign
	    var namesForId = names[id] || (names[id] = Object.create(null));
	    namesForId[name] = true;
	  }
	};

	/* resets an ID entirely by overwriting it in the dictionary */
	var resetIdNames$1 = function resetIdNames(names, id) {
	  // eslint-disable-next-line no-param-reassign
	  names[id] = Object.create(null);
	};

	/* factory for a names dictionary checking the existance of an ID:name pairing */
	var hasNameForId$1 = function hasNameForId(names) {
	  return function (id, name) {
	    return names[id] !== undefined && names[id][name];
	  };
	};

	/* stringifies names for the html/element output */
	var stringifyNames$1 = function stringifyNames(names) {
	  var str = '';
	  // eslint-disable-next-line guard-for-in
	  for (var id in names) {
	    str += Object.keys(names[id]).join(' ') + ' ';
	  }
	  return str.trim();
	};

	/* clones the nested names dictionary */
	var cloneNames$1 = function cloneNames(names) {
	  var clone = Object.create(null);
	  // eslint-disable-next-line guard-for-in
	  for (var id in names) {
	    clone[id] = _extends$2({}, names[id]);
	  }
	  return clone;
	};

	// 
	/* These are helpers that deal with the insertRule (aka speedy) API
	 * They are used in the StyleTags and specifically the speedy tag
	 */

	/* retrieve a sheet for a given style tag */
	var sheetForTag$1 = function sheetForTag(tag) {
	  // $FlowFixMe
	  if (tag.sheet) return tag.sheet;

	  /* Firefox quirk requires us to step through all stylesheets to find one owned by the given tag */
	  var size = document.styleSheets.length;
	  for (var i = 0; i < size; i += 1) {
	    var sheet = document.styleSheets[i];
	    // $FlowFixMe
	    if (sheet.ownerNode === tag) return sheet;
	  }

	  /* we should always be able to find a tag */
	  throw new Error();
	};

	/* insert a rule safely and return whether it was actually injected */
	var safeInsertRule$1 = function safeInsertRule(sheet, cssRule, index) {
	  /* abort early if cssRule string is falsy */
	  if (!cssRule) return false;

	  var maxIndex = sheet.cssRules.length;

	  try {
	    /* use insertRule and cap passed index with maxIndex (no of cssRules) */
	    sheet.insertRule(cssRule, index <= maxIndex ? index : maxIndex);
	  } catch (err) {
	    /* any error indicates an invalid rule */
	    return false;
	  }

	  return true;
	};

	/* deletes `size` rules starting from `removalIndex` */
	var deleteRules$1 = function deleteRules(sheet, removalIndex, size) {
	  var lowerBound = removalIndex - size;
	  for (var i = removalIndex; i >= lowerBound; i -= 1) {
	    sheet.deleteRule(i);
	  }
	};

	// 
	/* eslint-disable flowtype/object-type-delimiter */
	/* eslint-disable react/prop-types */

	/* this error is used for makeStyleTag */
	var parentNodeUnmountedErr$1 = '\nTrying to insert a new style tag, but the given Node is unmounted!\n- Are you using a custom target that isn\'t mounted?\n- Does your document not have a valid head element?\n- Have you accidentally removed a style tag manually?\n'.trim();

	/* this error is used for tags */
	var throwCloneTagErr$1 = function throwCloneTagErr() {
	  throw new Error('\nThe clone method cannot be used on the client!\n- Are you running in a client-like environment on the server?\n- Are you trying to run SSR on the client?\n'.trim());
	};

	/* this marker separates component styles and is important for rehydration */
	var makeTextMarker$1 = function makeTextMarker(id) {
	  return '\n/* sc-component-id: ' + id + ' */\n';
	};

	/* add up all numbers in array up until and including the index */
	var addUpUntilIndex$1 = function addUpUntilIndex(sizes, index) {
	  var totalUpToIndex = 0;
	  for (var i = 0; i <= index; i += 1) {
	    totalUpToIndex += sizes[i];
	  }

	  return totalUpToIndex;
	};

	/* create a new style tag after lastEl */
	var makeStyleTag$1 = function makeStyleTag(target, tagEl, insertBefore) {
	  var el = document.createElement('style');
	  el.setAttribute(SC_ATTR$1, '');

	  var nonce = getNonce$1();
	  if (nonce) {
	    el.setAttribute('nonce', nonce);
	  }

	  /* Work around insertRule quirk in EdgeHTML */
	  el.appendChild(document.createTextNode(''));

	  if (target && !tagEl) {
	    /* Append to target when no previous element was passed */
	    target.appendChild(el);
	  } else {
	    if (!tagEl || !target || !tagEl.parentNode) {
	      throw new Error(parentNodeUnmountedErr$1);
	    }

	    /* Insert new style tag after the previous one */
	    tagEl.parentNode.insertBefore(el, insertBefore ? tagEl : tagEl.nextSibling);
	  }

	  return el;
	};

	/* takes a css factory function and outputs an html styled tag factory */
	var wrapAsHtmlTag$1 = function wrapAsHtmlTag(css, names) {
	  return function (additionalAttrs) {
	    var nonce = getNonce$1();
	    var attrs = [nonce && 'nonce="' + nonce + '"', SC_ATTR$1 + '="' + stringifyNames$1(names) + '"', additionalAttrs];

	    var htmlAttr = attrs.filter(Boolean).join(' ');
	    return '<style ' + htmlAttr + '>' + css() + '</style>';
	  };
	};

	/* takes a css factory function and outputs an element factory */
	var wrapAsElement$1 = function wrapAsElement(css, names) {
	  return function () {
	    var _props;

	    var props = (_props = {}, _props[SC_ATTR$1] = stringifyNames$1(names), _props);

	    var nonce = getNonce$1();
	    if (nonce) {
	      // $FlowFixMe
	      props.nonce = nonce;
	    }

	    // eslint-disable-next-line react/no-danger
	    return react.createElement('style', _extends$2({}, props, { dangerouslySetInnerHTML: { __html: css() } }));
	  };
	};

	var getIdsFromMarkersFactory$1 = function getIdsFromMarkersFactory(markers) {
	  return function () {
	    return Object.keys(markers);
	  };
	};

	/* speedy tags utilise insertRule */
	var makeSpeedyTag$1 = function makeSpeedyTag(el, getImportRuleTag) {
	  var names = Object.create(null);
	  var markers = Object.create(null);
	  var sizes = [];

	  var extractImport = getImportRuleTag !== undefined;
	  /* indicates whther getImportRuleTag was called */
	  var usedImportRuleTag = false;

	  var insertMarker = function insertMarker(id) {
	    var prev = markers[id];
	    if (prev !== undefined) {
	      return prev;
	    }

	    var marker = markers[id] = sizes.length;
	    sizes.push(0);
	    resetIdNames$1(names, id);
	    return marker;
	  };

	  var insertRules = function insertRules(id, cssRules, name) {
	    var marker = insertMarker(id);
	    var sheet = sheetForTag$1(el);
	    var insertIndex = addUpUntilIndex$1(sizes, marker);

	    var injectedRules = 0;
	    var importRules = [];
	    var cssRulesSize = cssRules.length;

	    for (var i = 0; i < cssRulesSize; i += 1) {
	      var cssRule = cssRules[i];
	      var mayHaveImport = extractImport; /* @import rules are reordered to appear first */
	      if (mayHaveImport && cssRule.indexOf('@import') !== -1) {
	        importRules.push(cssRule);
	      } else if (safeInsertRule$1(sheet, cssRule, insertIndex + injectedRules)) {
	        mayHaveImport = false;
	        injectedRules += 1;
	      }
	    }

	    if (extractImport && importRules.length > 0) {
	      usedImportRuleTag = true;
	      // $FlowFixMe
	      getImportRuleTag().insertRules(id + '-import', importRules);
	    }

	    sizes[marker] += injectedRules; /* add up no of injected rules */
	    addNameForId$1(names, id, name);
	  };

	  var removeRules = function removeRules(id) {
	    var marker = markers[id];
	    if (marker === undefined) return;

	    var size = sizes[marker];
	    var sheet = sheetForTag$1(el);
	    var removalIndex = addUpUntilIndex$1(sizes, marker);
	    deleteRules$1(sheet, removalIndex, size);
	    sizes[marker] = 0;
	    resetIdNames$1(names, id);

	    if (extractImport && usedImportRuleTag) {
	      // $FlowFixMe
	      getImportRuleTag().removeRules(id + '-import');
	    }
	  };

	  var css = function css() {
	    var _sheetForTag = sheetForTag$1(el),
	        cssRules = _sheetForTag.cssRules;

	    var str = '';

	    // eslint-disable-next-line guard-for-in
	    for (var id in markers) {
	      str += makeTextMarker$1(id);
	      var marker = markers[id];
	      var end = addUpUntilIndex$1(sizes, marker);
	      var size = sizes[marker];
	      for (var i = end - size; i < end; i += 1) {
	        var rule = cssRules[i];
	        if (rule !== undefined) {
	          str += rule.cssText;
	        }
	      }
	    }

	    return str;
	  };

	  return {
	    styleTag: el,
	    getIds: getIdsFromMarkersFactory$1(markers),
	    hasNameForId: hasNameForId$1(names),
	    insertMarker: insertMarker,
	    insertRules: insertRules,
	    removeRules: removeRules,
	    css: css,
	    toHTML: wrapAsHtmlTag$1(css, names),
	    toElement: wrapAsElement$1(css, names),
	    clone: throwCloneTagErr$1
	  };
	};

	var makeBrowserTag$1 = function makeBrowserTag(el, getImportRuleTag) {
	  var names = Object.create(null);
	  var markers = Object.create(null);

	  var extractImport = getImportRuleTag !== undefined;
	  var makeTextNode = function makeTextNode(id) {
	    return document.createTextNode(makeTextMarker$1(id));
	  };

	  /* indicates whther getImportRuleTag was called */
	  var usedImportRuleTag = false;

	  var insertMarker = function insertMarker(id) {
	    var prev = markers[id];
	    if (prev !== undefined) {
	      return prev;
	    }

	    var marker = markers[id] = makeTextNode(id);
	    el.appendChild(marker);
	    names[id] = Object.create(null);
	    return marker;
	  };

	  var insertRules = function insertRules(id, cssRules, name) {
	    var marker = insertMarker(id);
	    var importRules = [];
	    var cssRulesSize = cssRules.length;

	    for (var i = 0; i < cssRulesSize; i += 1) {
	      var rule = cssRules[i];
	      var mayHaveImport = extractImport;
	      if (mayHaveImport && rule.indexOf('@import') !== -1) {
	        importRules.push(rule);
	      } else {
	        mayHaveImport = false;
	        var separator = i === cssRulesSize - 1 ? '' : ' ';
	        marker.appendData('' + rule + separator);
	      }
	    }

	    addNameForId$1(names, id, name);

	    if (extractImport && importRules.length > 0) {
	      usedImportRuleTag = true;
	      // $FlowFixMe
	      getImportRuleTag().insertRules(id + '-import', importRules);
	    }
	  };

	  var removeRules = function removeRules(id) {
	    var marker = markers[id];
	    if (marker === undefined) return;

	    /* create new empty text node and replace the current one */
	    var newMarker = makeTextNode(id);
	    el.replaceChild(newMarker, marker);
	    markers[id] = newMarker;
	    resetIdNames$1(names, id);

	    if (extractImport && usedImportRuleTag) {
	      // $FlowFixMe
	      getImportRuleTag().removeRules(id + '-import');
	    }
	  };

	  var css = function css() {
	    var str = '';
	    // eslint-disable-next-line guard-for-in
	    for (var id in markers) {
	      str += markers[id].data;
	    }
	    return str;
	  };

	  return {
	    styleTag: el,
	    getIds: getIdsFromMarkersFactory$1(markers),
	    hasNameForId: hasNameForId$1(names),
	    insertMarker: insertMarker,
	    insertRules: insertRules,
	    removeRules: removeRules,
	    css: css,
	    toHTML: wrapAsHtmlTag$1(css, names),
	    toElement: wrapAsElement$1(css, names),
	    clone: throwCloneTagErr$1
	  };
	};

	var makeServerTagInternal$1 = function makeServerTagInternal(namesArg, markersArg) {
	  var names = namesArg === undefined ? Object.create(null) : namesArg;
	  var markers = markersArg === undefined ? Object.create(null) : markersArg;

	  var insertMarker = function insertMarker(id) {
	    var prev = markers[id];
	    if (prev !== undefined) {
	      return prev;
	    }

	    return markers[id] = [''];
	  };

	  var insertRules = function insertRules(id, cssRules, name) {
	    var marker = insertMarker(id);
	    marker[0] += cssRules.join(' ');
	    addNameForId$1(names, id, name);
	  };

	  var removeRules = function removeRules(id) {
	    var marker = markers[id];
	    if (marker === undefined) return;
	    marker[0] = '';
	    resetIdNames$1(names, id);
	  };

	  var css = function css() {
	    var str = '';
	    // eslint-disable-next-line guard-for-in
	    for (var id in markers) {
	      var cssForId = markers[id][0];
	      if (cssForId) {
	        str += makeTextMarker$1(id) + cssForId;
	      }
	    }
	    return str;
	  };

	  var clone = function clone() {
	    var namesClone = cloneNames$1(names);
	    var markersClone = Object.create(null);

	    // eslint-disable-next-line guard-for-in
	    for (var id in markers) {
	      markersClone[id] = [markers[id][0]];
	    }

	    return makeServerTagInternal(namesClone, markersClone);
	  };

	  var tag = {
	    styleTag: null,
	    getIds: getIdsFromMarkersFactory$1(markers),
	    hasNameForId: hasNameForId$1(names),
	    insertMarker: insertMarker,
	    insertRules: insertRules,
	    removeRules: removeRules,
	    css: css,
	    toHTML: wrapAsHtmlTag$1(css, names),
	    toElement: wrapAsElement$1(css, names),
	    clone: clone
	  };

	  return tag;
	};

	var makeServerTag$1 = function makeServerTag() {
	  return makeServerTagInternal$1();
	};

	var makeTag$1 = function makeTag(target, tagEl, forceServer, insertBefore, getImportRuleTag) {
	  if (IS_BROWSER$1 && !forceServer) {
	    var el = makeStyleTag$1(target, tagEl, insertBefore);
	    if (DISABLE_SPEEDY$1) {
	      return makeBrowserTag$1(el, getImportRuleTag);
	    } else {
	      return makeSpeedyTag$1(el, getImportRuleTag);
	    }
	  }

	  return makeServerTag$1();
	};

	/* wraps a given tag so that rehydration is performed once when necessary */
	var makeRehydrationTag$1 = function makeRehydrationTag(tag, els, extracted, names, immediateRehydration) {
	  /* rehydration function that adds all rules to the new tag */
	  var rehydrate = once$1(function () {
	    /* add all extracted components to the new tag */
	    for (var i = 0; i < extracted.length; i += 1) {
	      var _extracted$i = extracted[i],
	          componentId = _extracted$i.componentId,
	          cssFromDOM = _extracted$i.cssFromDOM;

	      var cssRules = splitByRules$1(cssFromDOM);
	      tag.insertRules(componentId, cssRules);
	    }

	    /* remove old HTMLStyleElements, since they have been rehydrated */
	    for (var _i = 0; _i < els.length; _i += 1) {
	      var el = els[_i];
	      if (el.parentNode) {
	        el.parentNode.removeChild(el);
	      }
	    }
	  });

	  if (immediateRehydration) rehydrate();

	  return _extends$2({}, tag, {
	    /* add rehydration hook to insertion methods */
	    insertMarker: function insertMarker(id) {
	      rehydrate();
	      return tag.insertMarker(id);
	    },
	    insertRules: function insertRules(id, cssRules, name) {
	      rehydrate();
	      return tag.insertRules(id, cssRules, name);
	    }
	  });
	};

	// 

	/* determine the maximum number of components before tags are sharded */
	var MAX_SIZE$1 = void 0;
	if (IS_BROWSER$1) {
	  /* in speedy mode we can keep a lot more rules in a sheet before a slowdown can be expected */
	  MAX_SIZE$1 = DISABLE_SPEEDY$1 ? 40 : 1000;
	} else {
	  /* for servers we do not need to shard at all */
	  MAX_SIZE$1 = -1;
	}

	var sheetRunningId$1 = 0;
	var master$1 = void 0;

	var StyleSheet$1 = function () {
	  /* a map from ids to tags */
	  /* deferred rules for a given id */
	  /* this is used for not reinjecting rules via hasNameForId() */
	  /* when rules for an id are removed using remove() we have to ignore rehydratedNames for it */
	  /* a list of tags belonging to this StyleSheet */
	  /* a tag for import rules */
	  /* current capacity until a new tag must be created */
	  /* children (aka clones) of this StyleSheet inheriting all and future injections */

	  function StyleSheet() {
	    var _this = this;

	    var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : IS_BROWSER$1 ? document.head : null;
	    var forceServer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	    classCallCheck$1(this, StyleSheet);

	    this.getImportRuleTag = function () {
	      var importRuleTag = _this.importRuleTag;

	      if (importRuleTag !== undefined) {
	        return importRuleTag;
	      }

	      var firstTag = _this.tags[0];
	      var insertBefore = true;

	      return _this.importRuleTag = makeTag$1(_this.target, firstTag ? firstTag.styleTag : null, _this.forceServer, insertBefore);
	    };

	    this.id = sheetRunningId$1 += 1;
	    this.sealed = false;
	    this.forceServer = forceServer;
	    this.target = forceServer ? null : target;
	    this.tagMap = {};
	    this.deferred = {};
	    this.rehydratedNames = {};
	    this.ignoreRehydratedNames = {};
	    this.tags = [];
	    this.capacity = 1;
	    this.clones = [];
	  }

	  /* rehydrate all SSR'd style tags */


	  StyleSheet.prototype.rehydrate = function rehydrate() {
	    if (!IS_BROWSER$1 || this.forceServer) {
	      return this;
	    }

	    var els = [];
	    var names = [];
	    var extracted = [];
	    var isStreamed = false;

	    /* retrieve all of our SSR style elements from the DOM */
	    var nodes = document.querySelectorAll('style[' + SC_ATTR$1 + ']');
	    var nodesSize = nodes.length;

	    /* abort rehydration if no previous style tags were found */
	    if (nodesSize === 0) {
	      return this;
	    }

	    for (var i = 0; i < nodesSize; i += 1) {
	      // $FlowFixMe: We can trust that all elements in this query are style elements
	      var el = nodes[i];

	      /* check if style tag is a streamed tag */
	      isStreamed = !!el.getAttribute(SC_STREAM_ATTR$1) || isStreamed;

	      /* retrieve all component names */
	      var elNames = (el.getAttribute(SC_ATTR$1) || '').trim().split(/\s+/);
	      var elNamesSize = elNames.length;
	      for (var j = 0; j < elNamesSize; j += 1) {
	        var name = elNames[j];
	        /* add rehydrated name to sheet to avoid readding styles */
	        this.rehydratedNames[name] = true;
	        names.push(name);
	      }

	      /* extract all components and their CSS */
	      extracted = extracted.concat(extractComps$1(el.textContent));
	      /* store original HTMLStyleElement */
	      els.push(el);
	    }

	    /* abort rehydration if nothing was extracted */
	    var extractedSize = extracted.length;
	    if (extractedSize === 0) {
	      return this;
	    }

	    /* create a tag to be used for rehydration */
	    var tag = this.makeTag(null);
	    var rehydrationTag = makeRehydrationTag$1(tag, els, extracted, names, isStreamed);

	    /* reset capacity and adjust MAX_SIZE by the initial size of the rehydration */
	    this.capacity = Math.max(1, MAX_SIZE$1 - extractedSize);
	    this.tags.push(rehydrationTag);

	    /* retrieve all component ids */
	    for (var _j = 0; _j < extractedSize; _j += 1) {
	      this.tagMap[extracted[_j].componentId] = rehydrationTag;
	    }

	    return this;
	  };

	  /* retrieve a "master" instance of StyleSheet which is typically used when no other is available
	   * The master StyleSheet is targeted by injectGlobal, keyframes, and components outside of any
	    * StyleSheetManager's context */


	  /* reset the internal "master" instance */
	  StyleSheet.reset = function reset() {
	    var forceServer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	    master$1 = new StyleSheet(undefined, forceServer).rehydrate();
	  };

	  /* adds "children" to the StyleSheet that inherit all of the parents' rules
	   * while their own rules do not affect the parent */


	  StyleSheet.prototype.clone = function clone() {
	    var sheet = new StyleSheet(this.target, this.forceServer);
	    /* add to clone array */
	    this.clones.push(sheet);

	    /* clone all tags */
	    sheet.tags = this.tags.map(function (tag) {
	      var ids = tag.getIds();
	      var newTag = tag.clone();

	      /* reconstruct tagMap */
	      for (var i = 0; i < ids.length; i += 1) {
	        sheet.tagMap[ids[i]] = newTag;
	      }

	      return newTag;
	    });

	    /* clone other maps */
	    sheet.rehydratedNames = _extends$2({}, this.rehydratedNames);
	    sheet.deferred = _extends$2({}, this.deferred);

	    return sheet;
	  };

	  /* force StyleSheet to create a new tag on the next injection */


	  StyleSheet.prototype.sealAllTags = function sealAllTags() {
	    this.capacity = 1;
	    this.sealed = true;
	  };

	  StyleSheet.prototype.makeTag = function makeTag$$1(tag) {
	    var lastEl = tag ? tag.styleTag : null;
	    var insertBefore = false;

	    return makeTag$1(this.target, lastEl, this.forceServer, insertBefore, this.getImportRuleTag);
	  };

	  /* get a tag for a given componentId, assign the componentId to one, or shard */
	  StyleSheet.prototype.getTagForId = function getTagForId(id) {
	    /* simply return a tag, when the componentId was already assigned one */
	    var prev = this.tagMap[id];
	    if (prev !== undefined && !this.sealed) {
	      return prev;
	    }

	    var tag = this.tags[this.tags.length - 1];

	    /* shard (create a new tag) if the tag is exhausted (See MAX_SIZE) */
	    this.capacity -= 1;
	    if (this.capacity === 0) {
	      this.capacity = MAX_SIZE$1;
	      this.sealed = false;
	      tag = this.makeTag(tag);
	      this.tags.push(tag);
	    }

	    return this.tagMap[id] = tag;
	  };

	  /* mainly for injectGlobal to check for its id */


	  StyleSheet.prototype.hasId = function hasId(id) {
	    return this.tagMap[id] !== undefined;
	  };

	  /* caching layer checking id+name to already have a corresponding tag and injected rules */


	  StyleSheet.prototype.hasNameForId = function hasNameForId(id, name) {
	    /* exception for rehydrated names which are checked separately */
	    if (this.ignoreRehydratedNames[id] === undefined && this.rehydratedNames[name]) {
	      return true;
	    }

	    var tag = this.tagMap[id];
	    return tag !== undefined && tag.hasNameForId(id, name);
	  };

	  /* registers a componentId and registers it on its tag */


	  StyleSheet.prototype.deferredInject = function deferredInject(id, cssRules) {
	    /* don't inject when the id is already registered */
	    if (this.tagMap[id] !== undefined) return;

	    var clones = this.clones;

	    for (var i = 0; i < clones.length; i += 1) {
	      clones[i].deferredInject(id, cssRules);
	    }

	    this.getTagForId(id).insertMarker(id);
	    this.deferred[id] = cssRules;
	  };

	  /* injects rules for a given id with a name that will need to be cached */


	  StyleSheet.prototype.inject = function inject(id, cssRules, name) {
	    var clones = this.clones;

	    for (var i = 0; i < clones.length; i += 1) {
	      clones[i].inject(id, cssRules, name);
	    }

	    /* add deferred rules for component */
	    var injectRules = cssRules;
	    var deferredRules = this.deferred[id];
	    if (deferredRules !== undefined) {
	      injectRules = deferredRules.concat(injectRules);
	      delete this.deferred[id];
	    }

	    var tag = this.getTagForId(id);
	    tag.insertRules(id, injectRules, name);
	  };

	  /* removes all rules for a given id, which doesn't remove its marker but resets it */


	  StyleSheet.prototype.remove = function remove(id) {
	    var tag = this.tagMap[id];
	    if (tag === undefined) return;

	    var clones = this.clones;

	    for (var i = 0; i < clones.length; i += 1) {
	      clones[i].remove(id);
	    }

	    /* remove all rules from the tag */
	    tag.removeRules(id);
	    /* ignore possible rehydrated names */
	    this.ignoreRehydratedNames[id] = true;
	    /* delete possible deferred rules */
	    delete this.deferred[id];
	  };

	  StyleSheet.prototype.toHTML = function toHTML() {
	    return this.tags.map(function (tag) {
	      return tag.toHTML();
	    }).join('');
	  };

	  StyleSheet.prototype.toReactElements = function toReactElements() {
	    var id = this.id;


	    return this.tags.map(function (tag, i) {
	      var key = 'sc-' + id + '-' + i;
	      return react_2(tag.toElement(), { key: key });
	    });
	  };

	  createClass$1(StyleSheet, null, [{
	    key: 'master',
	    get: function get$$1() {
	      return master$1 || (master$1 = new StyleSheet().rehydrate());
	    }

	    /* NOTE: This is just for backwards-compatibility with jest-styled-components */

	  }, {
	    key: 'instance',
	    get: function get$$1() {
	      return StyleSheet.master;
	    }
	  }]);
	  return StyleSheet;
	}();

	var _StyleSheetManager$ch$1;

	// 
	/* this error is used for makeStyleTag */
	var targetPropErr$1 = '\nThe StyleSheetManager expects a valid target or sheet prop!\n- Does this error occur on the client and is your target falsy?\n- Does this error occur on the server and is the sheet falsy?\n'.trim();

	var StyleSheetManager$1 = function (_Component) {
	  inherits$1(StyleSheetManager, _Component);

	  function StyleSheetManager() {
	    classCallCheck$1(this, StyleSheetManager);
	    return possibleConstructorReturn$1(this, _Component.apply(this, arguments));
	  }

	  StyleSheetManager.prototype.getChildContext = function getChildContext() {
	    var _ref;

	    return _ref = {}, _ref[CONTEXT_KEY$1] = this.sheetInstance, _ref;
	  };

	  StyleSheetManager.prototype.componentWillMount = function componentWillMount() {
	    if (this.props.sheet) {
	      this.sheetInstance = this.props.sheet;
	    } else if (this.props.target) {
	      this.sheetInstance = new StyleSheet$1(this.props.target);
	    } else {
	      throw new Error(targetPropErr$1);
	    }
	  };

	  StyleSheetManager.prototype.render = function render() {
	    /* eslint-disable react/prop-types */
	    // Flow v0.43.1 will report an error accessing the `children` property,
	    // but v0.47.0 will not. It is necessary to use a type cast instead of
	    // a "fixme" comment to satisfy both Flow versions.
	    return react.Children.only(this.props.children);
	  };

	  return StyleSheetManager;
	}(react_6);

	StyleSheetManager$1.childContextTypes = (_StyleSheetManager$ch$1 = {}, _StyleSheetManager$ch$1[CONTEXT_KEY$1] = propTypes.oneOfType([propTypes.instanceOf(StyleSheet$1), propTypes.instanceOf(ServerStyleSheet$1)]).isRequired, _StyleSheetManager$ch$1);

	StyleSheetManager$1.propTypes = {
	  sheet: propTypes.oneOfType([propTypes.instanceOf(StyleSheet$1), propTypes.instanceOf(ServerStyleSheet$1)]),
	  target: propTypes.shape({
	    appendChild: propTypes.func.isRequired
	  })
	};

	// 
	/* eslint-disable no-underscore-dangle */
	/* this error is used for makeStyleTag */
	var sheetClosedErr$1 = '\nCan\'t collect styles once you\'ve consumed a ServerStyleSheet\'s styles!\nServerStyleSheet is a one off instance for each server-side render cycle.\n- Are you trying to reuse it across renders?\n- Are you accidentally calling collectStyles twice?\n'.trim();

	var streamBrowserErr$1 = 'Streaming SSR is only supported in a Node.js environment; Please do not try to call this method in the browser.';

	var ServerStyleSheet$1 = function () {
	  function ServerStyleSheet() {
	    classCallCheck$1(this, ServerStyleSheet);

	    /* The master sheet might be reset, so keep a reference here */
	    this.masterSheet = StyleSheet$1.master;
	    this.instance = this.masterSheet.clone();
	    this.closed = false;
	  }

	  ServerStyleSheet.prototype.complete = function complete() {
	    if (!this.closed) {
	      /* Remove closed StyleSheets from the master sheet */
	      var index = this.masterSheet.clones.indexOf(this.instance);
	      this.masterSheet.clones.splice(index, 1);
	      this.closed = true;
	    }
	  };

	  ServerStyleSheet.prototype.collectStyles = function collectStyles(children) {
	    if (this.closed) {
	      throw new Error(sheetClosedErr$1);
	    }

	    return react.createElement(
	      StyleSheetManager$1,
	      { sheet: this.instance },
	      children
	    );
	  };

	  ServerStyleSheet.prototype.getStyleTags = function getStyleTags() {
	    this.complete();
	    return this.instance.toHTML();
	  };

	  ServerStyleSheet.prototype.getStyleElement = function getStyleElement() {
	    this.complete();
	    return this.instance.toReactElements();
	  };

	  ServerStyleSheet.prototype.interleaveWithNodeStream = function interleaveWithNodeStream(readableStream) {
	    var _this = this;

	    {
	      throw new Error(streamBrowserErr$1);
	    }

	    /* the tag index keeps track of which tags have already been emitted */
	    var instance = this.instance;

	    var instanceTagIndex = 0;

	    var streamAttr = SC_STREAM_ATTR$1 + '="true"';
	    var ourStream = new stream$1.Readable();
	    // $FlowFixMe
	    ourStream._read = function () {};

	    readableStream.on('data', function (chunk) {
	      var tags = instance.tags;

	      var html = '';

	      /* retrieve html for each new style tag */
	      for (; instanceTagIndex < tags.length; instanceTagIndex += 1) {
	        var tag = tags[instanceTagIndex];
	        html += tag.toHTML(streamAttr);
	      }

	      /* force our StyleSheets to emit entirely new tags */
	      instance.sealAllTags();
	      /* prepend style html to chunk */
	      ourStream.push(html + chunk);
	    });

	    readableStream.on('end', function () {
	      _this.complete();
	      ourStream.push(null);
	    });

	    readableStream.on('error', function (err) {
	      _this.complete();
	      ourStream.emit('error', err);
	    });

	    return ourStream;
	  };

	  return ServerStyleSheet;
	}();

	// 

	var LIMIT$1 = 200;

	var createWarnTooManyClasses$1 = (function (displayName) {
	  var generatedClasses = {};
	  var warningSeen = false;

	  return function (className) {
	    if (!warningSeen) {
	      generatedClasses[className] = true;
	      if (Object.keys(generatedClasses).length >= LIMIT$1) {
	        // Unable to find latestRule in test environment.
	        /* eslint-disable no-console, prefer-template */
	        console.warn('Over ' + LIMIT$1 + ' classes were generated for component ' + displayName + '. \n' + 'Consider using the attrs method, together with a style object for frequently changed styles.\n' + 'Example:\n' + '  const Component = styled.div.attrs({\n' + '    style: ({ background }) => ({\n' + '      background,\n' + '    }),\n' + '  })`width: 100%;`\n\n' + '  <Component />');
	        warningSeen = true;
	        generatedClasses = {};
	      }
	    }
	  };
	});

	// 
	/* eslint-disable max-len */
	/**
	 * Trying to avoid the unknown-prop errors on styled components by filtering by
	 * React's attribute whitelist.
	 *
	 * To regenerate this regex:
	 *
	 * 1. `npm i -g regexgen` (https://github.com/devongovett/regexgen)
	 * 2. Run `regexgen` with the list of space-separated words below as input
	 * 3. Surround the emitted regex with this: `/^(GENERATED_REGEX)$/` -- this will ensure a full string match
	 *    and no false positives from partials
	 **/
	/*
	children dangerouslySetInnerHTML key ref autoFocus defaultValue valueLink defaultChecked checkedLink innerHTML suppressContentEditableWarning onFocusIn onFocusOut className onCopy onCut onPaste onCompositionEnd onCompositionStart onCompositionUpdate onKeyDown onKeyPress onKeyUp onFocus onBlur onChange onInput onInvalid onSubmit onReset onClick onContextMenu onDoubleClick onDrag onDragEnd onDragEnter onDragExit onDragLeave onDragOver onDragStart onDrop onMouseDown onMouseEnter onMouseLeave onMouseMove onMouseOut onMouseOver onMouseUp onSelect onTouchCancel onTouchEnd onTouchMove onTouchStart onScroll onWheel onAbort onCanPlay onCanPlayThrough onDurationChange onEmptied onEncrypted onEnded onError onLoadedData onLoadedMetadata onLoadStart onPause onPlay onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend onTimeUpdate onVolumeChange onWaiting onLoad onAnimationStart onAnimationEnd onAnimationIteration onTransitionEnd onCopyCapture onCutCapture onPasteCapture onCompositionEndCapture onCompositionStartCapture onCompositionUpdateCapture onKeyDownCapture onKeyPressCapture onKeyUpCapture onFocusCapture onBlurCapture onChangeCapture onInputCapture onSubmitCapture onResetCapture onClickCapture onContextMenuCapture onDoubleClickCapture onDragCapture onDragEndCapture onDragEnterCapture onDragExitCapture onDragLeaveCapture onDragOverCapture onDragStartCapture onDropCapture onMouseDownCapture onMouseEnterCapture onMouseLeaveCapture onMouseMoveCapture onMouseOutCapture onMouseOverCapture onMouseUpCapture onSelectCapture onTouchCancelCapture onTouchEndCapture onTouchMoveCapture onTouchStartCapture onScrollCapture onWheelCapture onAbortCapture onCanPlayCapture onCanPlayThroughCapture onDurationChangeCapture onEmptiedCapture onEncryptedCapture onEndedCapture onErrorCapture onLoadedDataCapture onLoadedMetadataCapture onLoadStartCapture onPauseCapture onPlayCapture onPlayingCapture onProgressCapture onRateChangeCapture onSeekedCapture onSeekingCapture onStalledCapture onSuspendCapture onTimeUpdateCapture onVolumeChangeCapture onWaitingCapture onLoadCapture onAnimationStartCapture onAnimationEndCapture onAnimationIterationCapture onTransitionEndCapture accept acceptCharset accessKey action allowFullScreen allowTransparency alt as async autoComplete autoPlay capture cellPadding cellSpacing charSet challenge checked cite classID className cols colSpan content contentEditable contextMenu controlsList controls coords crossOrigin data dateTime default defer dir disabled download draggable encType form formAction formEncType formMethod formNoValidate formTarget frameBorder headers height hidden high href hrefLang htmlFor httpEquiv icon id inputMode integrity is keyParams keyType kind label lang list loop low manifest marginHeight marginWidth max maxLength media mediaGroup method min minLength multiple muted name nonce noValidate open optimum pattern placeholder playsInline poster preload profile radioGroup readOnly referrerPolicy rel required reversed role rows rowSpan sandbox scope scoped scrolling seamless selected shape size sizes span spellCheck src srcDoc srcLang srcSet start step style summary tabIndex target title type useMap value width wmode wrap about datatype inlist prefix property resource typeof vocab autoCapitalize autoCorrect autoSave color itemProp itemScope itemType itemID itemRef results security unselectable accentHeight accumulate additive alignmentBaseline allowReorder alphabetic amplitude arabicForm ascent attributeName attributeType autoReverse azimuth baseFrequency baseProfile baselineShift bbox begin bias by calcMode capHeight clip clipPath clipRule clipPathUnits colorInterpolation colorInterpolationFilters colorProfile colorRendering contentScriptType contentStyleType cursor cx cy d decelerate descent diffuseConstant direction display divisor dominantBaseline dur dx dy edgeMode elevation enableBackground end exponent externalResourcesRequired fill fillOpacity fillRule filter filterRes filterUnits floodColor floodOpacity focusable fontFamily fontSize fontSizeAdjust fontStretch fontStyle fontVariant fontWeight format from fx fy g1 g2 glyphName glyphOrientationHorizontal glyphOrientationVertical glyphRef gradientTransform gradientUnits hanging horizAdvX horizOriginX ideographic imageRendering in in2 intercept k k1 k2 k3 k4 kernelMatrix kernelUnitLength kerning keyPoints keySplines keyTimes lengthAdjust letterSpacing lightingColor limitingConeAngle local markerEnd markerMid markerStart markerHeight markerUnits markerWidth mask maskContentUnits maskUnits mathematical mode numOctaves offset opacity operator order orient orientation origin overflow overlinePosition overlineThickness paintOrder panose1 pathLength patternContentUnits patternTransform patternUnits pointerEvents points pointsAtX pointsAtY pointsAtZ preserveAlpha preserveAspectRatio primitiveUnits r radius refX refY renderingIntent repeatCount repeatDur requiredExtensions requiredFeatures restart result rotate rx ry scale seed shapeRendering slope spacing specularConstant specularExponent speed spreadMethod startOffset stdDeviation stemh stemv stitchTiles stopColor stopOpacity strikethroughPosition strikethroughThickness string stroke strokeDasharray strokeDashoffset strokeLinecap strokeLinejoin strokeMiterlimit strokeOpacity strokeWidth surfaceScale systemLanguage tableValues targetX targetY textAnchor textDecoration textRendering textLength to transform u1 u2 underlinePosition underlineThickness unicode unicodeBidi unicodeRange unitsPerEm vAlphabetic vHanging vIdeographic vMathematical values vectorEffect version vertAdvY vertOriginX vertOriginY viewBox viewTarget visibility widths wordSpacing writingMode x xHeight x1 x2 xChannelSelector xlinkActuate xlinkArcrole xlinkHref xlinkRole xlinkShow xlinkTitle xlinkType xmlBase xmlns xmlnsXlink xmlLang xmlSpace y y1 y2 yChannelSelector z zoomAndPan
	*/
	/* eslint-enable max-len */

	var ATTRIBUTE_REGEX$1 = /^((?:s(?:uppressContentEditableWarn|croll|pac)|(?:shape|image|text)Render|(?:letter|word)Spac|vHang|hang)ing|(?:on(?:AnimationIteration|C(?:o(?:mposition(?:Update|Start|End)|ntextMenu|py)|anPlayThrough|anPlay|hange|lick|ut)|(?:(?:Duration|Volume|Rate)Chang|(?:MouseLea|(?:Touch|Mouse)Mo|DragLea)v|Paus)e|Loaded(?:Metad|D)ata|(?:Animation|Touch|Load|Drag)Start|(?:(?:T(?:ransition|ouch)|Animation)E|Suspe)nd|DoubleClick|(?:TouchCanc|Whe)el|(?:Mouse(?:Ent|Ov)e|Drag(?:Ent|Ov)e|Erro)r|TimeUpdate|(?:E(?:n(?:crypt|d)|mpti)|S(?:tall|eek))ed|MouseDown|P(?:rogress|laying)|(?:MouseOu|DragExi|S(?:elec|ubmi)|Rese|Inpu)t|KeyPress|DragEnd|Key(?:Down|Up)|(?:Wait|Seek)ing|(?:MouseU|Dro)p|Scroll|Paste|Focus|Abort|Drag|Play|Load|Blur|Invalid)Captur|alignmentBaselin|(?:limitingConeAng|xlink(?:(?:Arcr|R)o|Tit)|s(?:urfaceSca|ty|ca)|unselectab|baseProfi|fontSty|(?:focus|dragg)ab|multip|profi|tit)l|d(?:ominantBaselin|efaultValu)|a(?:uto(?:Capitaliz|Revers|Sav)|dditiv)|(?:(?:formNoValid|xlinkActu|noValid|accumul|rot)a|autoComple|decelera)t|(?:(?:attribute|item)T|datat)yp|(?:attribute|glyph)Nam|playsInlin|(?:formE|e)ncTyp|(?:writing|input|edge)Mod|(?:xlinkTy|itemSco|keyTy|slo)p|(?:amplitu|mo)d|(?:xmlSpa|non)c|fillRul|(?:dateTi|na)m|r(?:esourc|ol)|xmlBas|wmod)e|(?:glyphOrientationHorizont|loc)al|(?:externalResourcesRequir|select|revers|mut)ed|c(?:o(?:lorInterpolationFilter|ord)s|o(?:lor(?:Interpolation)?|nt(?:rols|ent))|(?:ontentS(?:cript|tyle)Typ|o(?:ntentEditab|lorProfi)l|l(?:assNam|ipRul)|a(?:lcMod|ptur)|it)e|olorRendering|l(?:ipPathUnits|assID)|(?:ontrolsLis|apHeigh)t|h(?:eckedLink|a(?:llenge|rSet)|ildren|ecked)|ell(?:Spac|Padd)ing|o(?:ntextMenu|ls)|(?:rossOrigi|olSpa)n|lip(?:Path)?|ursor|[xy])|glyphOrientationVertical|d(?:angerouslySetInnerHTML|efaultChecked|ownload|isabled|isplay|[xy])|(?:s(?:trikethroughThickn|eaml)es|(?:und|ov)erlineThicknes|r(?:equiredExtension|adiu)|(?:requiredFeatur|tableValu|stitchTil|numOctav|filterR)e|key(?:(?:Splin|Tim)e|Param)|autoFocu|header|bia)s|(?:(?:st(?:rikethroughPosi|dDevia)|(?:und|ov)erlinePosi|(?:textDecor|elev)a|orienta)tio|(?:strokeLinejo|orig)i|formActio|zoomAndPa|onFocusI|directio|(?:vers|act)io|rowSpa|begi|ico)n|o(?:n(?:AnimationIteration|C(?:o(?:mposition(?:Update|Start|End)|ntextMenu|py)|anPlayThrough|anPlay|hange|lick|ut)|(?:(?:Duration|Volume|Rate)Chang|(?:MouseLea|(?:Touch|Mouse)Mo|DragLea)v|Paus)e|Loaded(?:Metad|D)ata|(?:Animation|Touch|Load|Drag)Start|(?:(?:T(?:ransition|ouch)|Animation)E|Suspe)nd|DoubleClick|(?:TouchCanc|Whe)el|(?:Mouse(?:Ent|Ov)e|Drag(?:Ent|Ov)e|Erro)r|TimeUpdate|(?:E(?:n(?:crypt|d)|mpti)|S(?:tall|eek))ed|MouseDown|P(?:rogress|laying)|(?:MouseOu|DragExi|S(?:elec|ubmi)|Rese|Inpu)t|KeyPress|DragEnd|Key(?:Down|Up)|(?:Wait|Seek)ing|(?:MouseU|Dro)p|Scroll|Paste|Focus|Abort|Drag|Play|Load|Blur|Invalid)|rient)|p(?:reserveA(?:spectRatio|lpha)|ointsAt[X-Z]|anose1)|(?:patternContent|ma(?:sk(?:Content)?|rker)|primitive|gradient|pattern|filter)Units|(?:gradientT|patternT|t)ransform|(?:(?:allowTranspar|baseFrequ)enc|re(?:ferrerPolic|adOnl)|(?:(?:st(?:roke|op)O|floodO|fillO|o)pac|integr|secur)it|visibilit|fontFamil|accessKe|propert|summar)y|(?:strokeMiterlimi|(?:specularConsta|repeatCou|fontVaria)n|(?:(?:specularE|e)xpon|renderingInt|asc)en|d(?:iffuseConsta|esce)n|(?:fontSizeAdju|lengthAdju|manife)s|baselineShif|vectorEffec|(?:(?:mar(?:ker|gin)|x)H|accentH|fontW)eigh|a(?:utoCorrec|bou)|markerStar|onFocusOu|intercep|restar|forma|inlis|heigh|lis)t|(?:(?:st(?:rokeDasho|artO)|o)ffs|acceptChars|formTarg|viewTarg|srcS)et|(?:(?:enableBackgrou|markerE)n|s(?:p(?:readMetho|ee)|ee)|formMetho|m(?:arkerMi|etho)|preloa|kin)d|k(?:ernel(?:UnitLength|Matrix)|[1-4])|(?:[xy]ChannelSelect|lightingCol|textAnch|floodCol|stopCol|operat|htmlF)or|(?:allowFullScre|hidd)en|strokeDasharray|systemLanguage|(?:strokeLineca|itemPro|useMa|wra|loo)p|v(?:Mathematical|ert(?:Origin[XY]|AdvY)|alues|ocab)|(?:pointerEve|keyPoi)nts|unicodeRange|(?:(?:allowReord|placehold|frameBord|paintOrd|post|ord)e|repeatDu|d(?:efe|u))r|mathematical|(?:vI|i)deographic|h(?:oriz(?:Origin|Adv)X|ttpEquiv)|u(?:nicodeBidi|[12])|(?:fontStretc|hig)h|(?:(?:mar(?:ker|gin)W|strokeW)id|azimu)th|vAlphabetic|mediaGroup|spellCheck|(?:unitsPerE|optimu|fro)m|r(?:adioGroup|e(?:sults|f[XY]|l)|ows|[xy])|(?:xmlnsXl|valueL)ink|a(?:rabicForm|l(?:phabetic|t)|sync)|pathLength|(?:text|m(?:in|ax))Length|innerHTML|xlinkShow|(?:xlinkHr|glyphR)ef|r(?:e(?:quired|sult|f))?|o(?:verflow|pen)|(?:tabInde|(?:sand|b)bo|viewBo)x|(?:(?:href|xml|src)La|kerni)ng|f(?:o(?:ntSize|rm)|il(?:ter|l))|autoPlay|unicode|p(?:attern|oints)|t(?:arget[XY]|o)|i(?:temRef|n2|s)|divisor|d(?:efault|ata|ir)?|srcDoc|s(?:coped|te(?:m[hv]|p)|pan)|(?:width|size)s|(?:stri|la)ng|prefix|itemID|s(?:t(?:roke|art)|hape|cope|rc)|a(?:ccept|s)|t(?:arget|ype)|typeof|width|value|x(?:mlns)?|label|m(?:edia|a(?:sk|x)|in)|size|href|k(?:ey)?|end|low|x[12]|i[dn]|y[12]|g[12]|by|f[xy]|[yz])$/;

	/* From DOMProperty */
	var ATTRIBUTE_NAME_START_CHAR$1 = ':A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD';
	var ATTRIBUTE_NAME_CHAR$1 = ATTRIBUTE_NAME_START_CHAR$1 + '\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040';
	var isCustomAttribute$1 = RegExp.prototype.test.bind(new RegExp('^(data|aria)-[' + ATTRIBUTE_NAME_CHAR$1 + ']*$'));

	var validAttr$1 = (function (name) {
	  return ATTRIBUTE_REGEX$1.test(name) || isCustomAttribute$1(name.toLowerCase());
	});

	// 

	function isTag$1(target) /* : %checks */{
	  return typeof target === 'string';
	}

	// 

	/* eslint-disable no-undef */
	function getComponentName$1(target) {
	  return target.displayName || target.name || 'Component';
	}

	// 

	var determineTheme$1 = (function (props, fallbackTheme, defaultProps) {
	  // Props should take precedence over ThemeProvider, which should take precedence over
	  // defaultProps, but React automatically puts defaultProps on props.

	  /* eslint-disable react/prop-types */
	  var isDefaultTheme = defaultProps && props.theme === defaultProps.theme;
	  var theme = props.theme && !isDefaultTheme ? props.theme : fallbackTheme;
	  /* eslint-enable */

	  return theme;
	});

	// 
	var escapeRegex$1 = /[[\].#*$><+~=|^:(),"'`-]+/g;
	var dashesAtEnds$1 = /(^-|-$)/g;

	/**
	 * TODO: Explore using CSS.escape when it becomes more available
	 * in evergreen browsers.
	 */
	function escape$2(str) {
	  return str
	  // Replace all possible CSS selectors
	  .replace(escapeRegex$1, '-')

	  // Remove extraneous hyphens at the start and end
	  .replace(dashesAtEnds$1, '');
	}

	// 
	/**
	 * Creates a broadcast that can be listened to, i.e. simple event emitter
	 *
	 * @see https://github.com/ReactTraining/react-broadcast
	 */

	var createBroadcast$1 = function createBroadcast(initialState) {
	  var listeners = {};
	  var id = 0;
	  var state = initialState;

	  function publish(nextState) {
	    state = nextState;

	    // eslint-disable-next-line guard-for-in, no-restricted-syntax
	    for (var key in listeners) {
	      var listener = listeners[key];
	      if (listener === undefined) {
	        // eslint-disable-next-line no-continue
	        continue;
	      }

	      listener(state);
	    }
	  }

	  function subscribe(listener) {
	    var currentId = id;
	    listeners[currentId] = listener;
	    id += 1;
	    listener(state);
	    return currentId;
	  }

	  function unsubscribe(unsubID) {
	    listeners[unsubID] = undefined;
	  }

	  return { publish: publish, subscribe: subscribe, unsubscribe: unsubscribe };
	};

	var _ThemeProvider$childC$1;
	var _ThemeProvider$contex$1;

	// 
	/* globals React$Element */
	// NOTE: DO NOT CHANGE, changing this is a semver major change!
	var CHANNEL$1 = '__styled-components__';
	var CHANNEL_NEXT$1 = CHANNEL$1 + 'next__';

	var CONTEXT_CHANNEL_SHAPE$1 = propTypes.shape({
	  getTheme: propTypes.func,
	  subscribe: propTypes.func,
	  unsubscribe: propTypes.func
	});

	var warnChannelDeprecated$1 = void 0;
	{
	  warnChannelDeprecated$1 = once$1(function () {
	    // eslint-disable-next-line no-console
	    console.error('Warning: Usage of `context.' + CHANNEL$1 + '` as a function is deprecated. It will be replaced with the object on `.context.' + CHANNEL_NEXT$1 + '` in a future version.');
	  });
	}

	var isFunction$1 = function isFunction(test) {
	  return typeof test === 'function';
	};

	/**
	 * Provide a theme to an entire react component tree via context and event listeners (have to do
	 * both context and event emitter as pure components block context updates)
	 */

	var ThemeProvider$1 = function (_Component) {
	  inherits$1(ThemeProvider, _Component);

	  function ThemeProvider() {
	    classCallCheck$1(this, ThemeProvider);

	    var _this = possibleConstructorReturn$1(this, _Component.call(this));

	    _this.unsubscribeToOuterId = -1;

	    _this.getTheme = _this.getTheme.bind(_this);
	    return _this;
	  }

	  ThemeProvider.prototype.componentWillMount = function componentWillMount() {
	    var _this2 = this;

	    // If there is a ThemeProvider wrapper anywhere around this theme provider, merge this theme
	    // with the outer theme
	    var outerContext = this.context[CHANNEL_NEXT$1];
	    if (outerContext !== undefined) {
	      this.unsubscribeToOuterId = outerContext.subscribe(function (theme) {
	        _this2.outerTheme = theme;

	        if (_this2.broadcast !== undefined) {
	          _this2.publish(_this2.props.theme);
	        }
	      });
	    }

	    this.broadcast = createBroadcast$1(this.getTheme());
	  };

	  ThemeProvider.prototype.getChildContext = function getChildContext() {
	    var _this3 = this,
	        _babelHelpers$extends;

	    return _extends$2({}, this.context, (_babelHelpers$extends = {}, _babelHelpers$extends[CHANNEL_NEXT$1] = {
	      getTheme: this.getTheme,
	      subscribe: this.broadcast.subscribe,
	      unsubscribe: this.broadcast.unsubscribe
	    }, _babelHelpers$extends[CHANNEL$1] = function (subscriber) {
	      {
	        warnChannelDeprecated$1();
	      }

	      // Patch the old `subscribe` provide via `CHANNEL` for older clients.
	      var unsubscribeId = _this3.broadcast.subscribe(subscriber);
	      return function () {
	        return _this3.broadcast.unsubscribe(unsubscribeId);
	      };
	    }, _babelHelpers$extends));
	  };

	  ThemeProvider.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	    if (this.props.theme !== nextProps.theme) {
	      this.publish(nextProps.theme);
	    }
	  };

	  ThemeProvider.prototype.componentWillUnmount = function componentWillUnmount() {
	    if (this.unsubscribeToOuterId !== -1) {
	      this.context[CHANNEL_NEXT$1].unsubscribe(this.unsubscribeToOuterId);
	    }
	  };

	  // Get the theme from the props, supporting both (outerTheme) => {} as well as object notation


	  ThemeProvider.prototype.getTheme = function getTheme(passedTheme) {
	    var theme = passedTheme || this.props.theme;
	    if (isFunction$1(theme)) {
	      var mergedTheme = theme(this.outerTheme);
	      if ("development" !== 'production' && !isPlainObject(mergedTheme)) {
	        throw new Error('[ThemeProvider] Please return an object from your theme function, i.e. theme={() => ({})}!');
	      }
	      return mergedTheme;
	    }
	    if (!isPlainObject(theme)) {
	      throw new Error('[ThemeProvider] Please make your theme prop a plain object');
	    }
	    return _extends$2({}, this.outerTheme, theme);
	  };

	  ThemeProvider.prototype.publish = function publish(theme) {
	    this.broadcast.publish(this.getTheme(theme));
	  };

	  ThemeProvider.prototype.render = function render() {
	    if (!this.props.children) {
	      return null;
	    }
	    return react.Children.only(this.props.children);
	  };

	  return ThemeProvider;
	}(react_6);

	ThemeProvider$1.childContextTypes = (_ThemeProvider$childC$1 = {}, _ThemeProvider$childC$1[CHANNEL$1] = propTypes.func, _ThemeProvider$childC$1[CHANNEL_NEXT$1] = CONTEXT_CHANNEL_SHAPE$1, _ThemeProvider$childC$1);
	ThemeProvider$1.contextTypes = (_ThemeProvider$contex$1 = {}, _ThemeProvider$contex$1[CHANNEL_NEXT$1] = CONTEXT_CHANNEL_SHAPE$1, _ThemeProvider$contex$1);

	// 

	// HACK for generating all static styles without needing to allocate
	// an empty execution context every single time...
	var STATIC_EXECUTION_CONTEXT$1 = {};

	var _StyledComponent$1 = (function (ComponentStyle, constructWithOptions) {
	  var identifiers = {};

	  /* We depend on components having unique IDs */
	  var generateId = function generateId(_displayName, parentComponentId) {
	    var displayName = typeof _displayName !== 'string' ? 'sc' : escape$2(_displayName);

	    var componentId = void 0;

	    /**
	     * only fall back to hashing the component injection order if
	     * a proper displayName isn't provided by the babel plugin
	     */
	    if (!_displayName) {
	      var nr = (identifiers[displayName] || 0) + 1;
	      identifiers[displayName] = nr;

	      componentId = displayName + '-' + ComponentStyle.generateName(displayName + nr);
	    } else {
	      componentId = displayName + '-' + ComponentStyle.generateName(displayName);
	    }

	    return parentComponentId !== undefined ? parentComponentId + '-' + componentId : componentId;
	  };

	  var BaseStyledComponent = function (_Component) {
	    inherits$1(BaseStyledComponent, _Component);

	    function BaseStyledComponent() {
	      var _temp, _this, _ret;

	      classCallCheck$1(this, BaseStyledComponent);

	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      return _ret = (_temp = (_this = possibleConstructorReturn$1(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.attrs = {}, _this.state = {
	        theme: null,
	        generatedClassName: ''
	      }, _this.unsubscribeId = -1, _temp), possibleConstructorReturn$1(_this, _ret);
	    }

	    BaseStyledComponent.prototype.unsubscribeFromContext = function unsubscribeFromContext() {
	      if (this.unsubscribeId !== -1) {
	        this.context[CHANNEL_NEXT$1].unsubscribe(this.unsubscribeId);
	      }
	    };

	    BaseStyledComponent.prototype.buildExecutionContext = function buildExecutionContext(theme, props) {
	      var attrs = this.constructor.attrs;

	      var context = _extends$2({}, props, { theme: theme });
	      if (attrs === undefined) {
	        return context;
	      }

	      this.attrs = Object.keys(attrs).reduce(function (acc, key) {
	        var attr = attrs[key];
	        // eslint-disable-next-line no-param-reassign
	        acc[key] = typeof attr === 'function' ? attr(context) : attr;
	        return acc;
	      }, {});

	      return _extends$2({}, context, this.attrs);
	    };

	    BaseStyledComponent.prototype.generateAndInjectStyles = function generateAndInjectStyles(theme, props) {
	      var _constructor = this.constructor,
	          attrs = _constructor.attrs,
	          componentStyle = _constructor.componentStyle,
	          warnTooManyClasses = _constructor.warnTooManyClasses;

	      var styleSheet = this.context[CONTEXT_KEY$1] || StyleSheet$1.master;

	      // staticaly styled-components don't need to build an execution context object,
	      // and shouldn't be increasing the number of class names
	      if (componentStyle.isStatic && attrs === undefined) {
	        return componentStyle.generateAndInjectStyles(STATIC_EXECUTION_CONTEXT$1, styleSheet);
	      } else {
	        var executionContext = this.buildExecutionContext(theme, props);
	        var className = componentStyle.generateAndInjectStyles(executionContext, styleSheet);

	        if ("development" !== 'production' && warnTooManyClasses !== undefined) {
	          warnTooManyClasses(className);
	        }

	        return className;
	      }
	    };

	    BaseStyledComponent.prototype.componentWillMount = function componentWillMount() {
	      var _this2 = this;

	      var componentStyle = this.constructor.componentStyle;

	      var styledContext = this.context[CHANNEL_NEXT$1];

	      // If this is a staticaly-styled component, we don't need to the theme
	      // to generate or build styles.
	      if (componentStyle.isStatic) {
	        var generatedClassName = this.generateAndInjectStyles(STATIC_EXECUTION_CONTEXT$1, this.props);
	        this.setState({ generatedClassName: generatedClassName });
	        // If there is a theme in the context, subscribe to the event emitter. This
	        // is necessary due to pure components blocking context updates, this circumvents
	        // that by updating when an event is emitted
	      } else if (styledContext !== undefined) {
	        var subscribe = styledContext.subscribe;

	        this.unsubscribeId = subscribe(function (nextTheme) {
	          // This will be called once immediately
	          var theme = determineTheme$1(_this2.props, nextTheme, _this2.constructor.defaultProps);
	          var generatedClassName = _this2.generateAndInjectStyles(theme, _this2.props);

	          _this2.setState({ theme: theme, generatedClassName: generatedClassName });
	        });
	      } else {
	        // eslint-disable-next-line react/prop-types
	        var theme = this.props.theme || {};
	        var _generatedClassName = this.generateAndInjectStyles(theme, this.props);
	        this.setState({ theme: theme, generatedClassName: _generatedClassName });
	      }
	    };

	    BaseStyledComponent.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	      var _this3 = this;

	      // If this is a statically-styled component, we don't need to listen to
	      // props changes to update styles
	      var componentStyle = this.constructor.componentStyle;

	      if (componentStyle.isStatic) {
	        return;
	      }

	      this.setState(function (oldState) {
	        var theme = determineTheme$1(nextProps, oldState.theme, _this3.constructor.defaultProps);
	        var generatedClassName = _this3.generateAndInjectStyles(theme, nextProps);

	        return { theme: theme, generatedClassName: generatedClassName };
	      });
	    };

	    BaseStyledComponent.prototype.componentWillUnmount = function componentWillUnmount() {
	      this.unsubscribeFromContext();
	    };

	    BaseStyledComponent.prototype.render = function render() {
	      var _this4 = this;

	      // eslint-disable-next-line react/prop-types
	      var innerRef = this.props.innerRef;
	      var generatedClassName = this.state.generatedClassName;
	      var _constructor2 = this.constructor,
	          styledComponentId = _constructor2.styledComponentId,
	          target = _constructor2.target;


	      var isTargetTag = isTag$1(target);

	      var className = [
	      // eslint-disable-next-line react/prop-types
	      this.props.className, styledComponentId, this.attrs.className, generatedClassName].filter(Boolean).join(' ');

	      var baseProps = _extends$2({}, this.attrs, {
	        className: className
	      });

	      if (isStyledComponent$1(target)) {
	        baseProps.innerRef = innerRef;
	      } else {
	        baseProps.ref = innerRef;
	      }

	      var propsForElement = Object.keys(this.props).reduce(function (acc, propName) {
	        // Don't pass through non HTML tags through to HTML elements
	        // always omit innerRef
	        if (propName !== 'innerRef' && propName !== 'className' && (!isTargetTag || validAttr$1(propName))) {
	          // eslint-disable-next-line no-param-reassign
	          acc[propName] = _this4.props[propName];
	        }

	        return acc;
	      }, baseProps);

	      return react_3(target, propsForElement);
	    };

	    return BaseStyledComponent;
	  }(react_6);

	  var createStyledComponent = function createStyledComponent(target, options, rules) {
	    var _StyledComponent$cont;

	    var _options$displayName = options.displayName,
	        displayName = _options$displayName === undefined ? isTag$1(target) ? 'styled.' + target : 'Styled(' + getComponentName$1(target) + ')' : _options$displayName,
	        _options$componentId = options.componentId,
	        componentId = _options$componentId === undefined ? generateId(options.displayName, options.parentComponentId) : _options$componentId,
	        _options$ParentCompon = options.ParentComponent,
	        ParentComponent = _options$ParentCompon === undefined ? BaseStyledComponent : _options$ParentCompon,
	        extendingRules = options.rules,
	        attrs = options.attrs;


	    var styledComponentId = options.displayName && options.componentId ? escape$2(options.displayName) + '-' + options.componentId : componentId;

	    var componentStyle = new ComponentStyle(extendingRules === undefined ? rules : extendingRules.concat(rules), attrs, styledComponentId);

	    var StyledComponent = function (_ParentComponent) {
	      inherits$1(StyledComponent, _ParentComponent);

	      function StyledComponent() {
	        classCallCheck$1(this, StyledComponent);
	        return possibleConstructorReturn$1(this, _ParentComponent.apply(this, arguments));
	      }

	      StyledComponent.withComponent = function withComponent(tag) {
	        var previousComponentId = options.componentId,
	            optionsToCopy = objectWithoutProperties$1(options, ['componentId']);


	        var newComponentId = previousComponentId && previousComponentId + '-' + (isTag$1(tag) ? tag : escape$2(getComponentName$1(tag)));

	        var newOptions = _extends$2({}, optionsToCopy, {
	          componentId: newComponentId,
	          ParentComponent: StyledComponent
	        });

	        return createStyledComponent(tag, newOptions, rules);
	      };

	      createClass$1(StyledComponent, null, [{
	        key: 'extend',
	        get: function get$$1() {
	          var rulesFromOptions = options.rules,
	              parentComponentId = options.componentId,
	              optionsToCopy = objectWithoutProperties$1(options, ['rules', 'componentId']);


	          var newRules = rulesFromOptions === undefined ? rules : rulesFromOptions.concat(rules);

	          var newOptions = _extends$2({}, optionsToCopy, {
	            rules: newRules,
	            parentComponentId: parentComponentId,
	            ParentComponent: StyledComponent
	          });

	          return constructWithOptions(createStyledComponent, target, newOptions);
	        }
	      }]);
	      return StyledComponent;
	    }(ParentComponent);

	    StyledComponent.contextTypes = (_StyledComponent$cont = {}, _StyledComponent$cont[CHANNEL$1] = propTypes.func, _StyledComponent$cont[CHANNEL_NEXT$1] = CONTEXT_CHANNEL_SHAPE$1, _StyledComponent$cont[CONTEXT_KEY$1] = propTypes.oneOfType([propTypes.instanceOf(StyleSheet$1), propTypes.instanceOf(ServerStyleSheet$1)]), _StyledComponent$cont);
	    StyledComponent.displayName = displayName;
	    StyledComponent.styledComponentId = styledComponentId;
	    StyledComponent.attrs = attrs;
	    StyledComponent.componentStyle = componentStyle;
	    StyledComponent.target = target;


	    {
	      StyledComponent.warnTooManyClasses = createWarnTooManyClasses$1(displayName);
	    }

	    return StyledComponent;
	  };

	  return createStyledComponent;
	});

	// Source: https://github.com/garycourt/murmurhash-js/blob/master/murmurhash2_gc.js
	function murmurhash$1(str) {
	  var l = str.length | 0,
	      h = l | 0,
	      i = 0,
	      k;

	  while (l >= 4) {
	    k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;

	    k = (k & 0xffff) * 0x5bd1e995 + (((k >>> 16) * 0x5bd1e995 & 0xffff) << 16);
	    k ^= k >>> 24;
	    k = (k & 0xffff) * 0x5bd1e995 + (((k >>> 16) * 0x5bd1e995 & 0xffff) << 16);

	    h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16) ^ k;

	    l -= 4;
	    ++i;
	  }

	  switch (l) {
	    case 3:
	      h ^= (str.charCodeAt(i + 2) & 0xff) << 16;
	    case 2:
	      h ^= (str.charCodeAt(i + 1) & 0xff) << 8;
	    case 1:
	      h ^= str.charCodeAt(i) & 0xff;
	      h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16);
	  }

	  h ^= h >>> 13;
	  h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16);
	  h ^= h >>> 15;

	  return h >>> 0;
	}

	// 
	var areStylesCacheable$1 = IS_BROWSER$1;

	var isStaticRules$1 = function isStaticRules(rules, attrs) {
	  for (var i = 0; i < rules.length; i += 1) {
	    var rule = rules[i];

	    // recursive case
	    if (Array.isArray(rule) && !isStaticRules(rule)) {
	      return false;
	    } else if (typeof rule === 'function' && !isStyledComponent$1(rule)) {
	      // functions are allowed to be static if they're just being
	      // used to get the classname of a nested styled component
	      return false;
	    }
	  }

	  if (attrs !== undefined) {
	    // eslint-disable-next-line guard-for-in, no-restricted-syntax
	    for (var key in attrs) {
	      var value = attrs[key];
	      if (typeof value === 'function') {
	        return false;
	      }
	    }
	  }

	  return true;
	};

	var isHRMEnabled = typeof module !== 'undefined' && module.hot && "development" !== 'production';

	/*
	 ComponentStyle is all the CSS-specific stuff, not
	 the React-specific stuff.
	 */
	var _ComponentStyle$1 = (function (nameGenerator, flatten, stringifyRules) {
	  /* combines hashStr (murmurhash) and nameGenerator for convenience */
	  var generateRuleHash = function generateRuleHash(str) {
	    return nameGenerator(murmurhash$1(str));
	  };

	  var ComponentStyle = function () {
	    function ComponentStyle(rules, attrs, componentId) {
	      classCallCheck$1(this, ComponentStyle);

	      this.rules = rules;
	      this.isStatic = !isHRMEnabled && isStaticRules$1(rules, attrs);
	      this.componentId = componentId;

	      if (!StyleSheet$1.master.hasId(componentId)) {
	        var placeholder = ['.' + componentId + ' {}'];

	        StyleSheet$1.master.deferredInject(componentId, placeholder);
	      }
	    }

	    /*
	     * Flattens a rule set into valid CSS
	     * Hashes it, wraps the whole chunk in a .hash1234 {}
	     * Returns the hash to be injected on render()
	     * */


	    ComponentStyle.prototype.generateAndInjectStyles = function generateAndInjectStyles(executionContext, styleSheet) {
	      var isStatic = this.isStatic,
	          componentId = this.componentId,
	          lastClassName = this.lastClassName;

	      if (areStylesCacheable$1 && isStatic && lastClassName !== undefined && styleSheet.hasNameForId(componentId, lastClassName)) {
	        return lastClassName;
	      }

	      var flatCSS = flatten(this.rules, executionContext);
	      var name = generateRuleHash(this.componentId + flatCSS.join(''));

	      if (!styleSheet.hasNameForId(componentId, name)) {
	        var css = stringifyRules(flatCSS, '.' + name);
	        styleSheet.inject(this.componentId, css, name);
	      }

	      this.lastClassName = name;
	      return name;
	    };

	    ComponentStyle.generateName = function generateName(str) {
	      return generateRuleHash(str);
	    };

	    return ComponentStyle;
	  }();

	  return ComponentStyle;
	});

	// 
	// Thanks to ReactDOMFactories for this handy list!

	var domElements$1 = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr',

	// SVG
	'circle', 'clipPath', 'defs', 'ellipse', 'foreignObject', 'g', 'image', 'line', 'linearGradient', 'mask', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'svg', 'text', 'tspan'];

	// 
	var _styled$1 = (function (styledComponent, constructWithOptions) {
	  var styled = function styled(tag) {
	    return constructWithOptions(styledComponent, tag);
	  };

	  // Shorthands for all valid HTML Elements
	  domElements$1.forEach(function (domElement) {
	    styled[domElement] = styled(domElement);
	  });

	  return styled;
	});

	// 
	var replaceWhitespace$1 = function replaceWhitespace(str) {
	  return str.replace(/\s|\\n/g, '');
	};

	var _keyframes$1 = (function (nameGenerator, stringifyRules, css) {
	  return function () {
	    var styleSheet = StyleSheet$1.master;
	    var rules = css.apply(undefined, arguments);
	    var name = nameGenerator(murmurhash$1(replaceWhitespace$1(JSON.stringify(rules))));
	    var id = 'sc-keyframes-' + name;

	    if (!styleSheet.hasNameForId(id, name)) {
	      styleSheet.inject(id, stringifyRules(rules, name, '@keyframes'), name);
	    }

	    return name;
	  };
	});

	// 
	var _injectGlobal$1 = (function (stringifyRules, css) {
	  var injectGlobal = function injectGlobal() {
	    var styleSheet = StyleSheet$1.master;
	    var rules = css.apply(undefined, arguments);
	    var hash = murmurhash$1(JSON.stringify(rules));
	    var id = 'sc-global-' + hash;

	    if (!styleSheet.hasId(id)) {
	      styleSheet.inject(id, stringifyRules(rules));
	    }
	  };

	  return injectGlobal;
	});

	// 
	var _constructWithOptions$1 = (function (css) {
	  var constructWithOptions = function constructWithOptions(componentConstructor, tag) {
	    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	    if (!reactIs_1(tag)) {
	      throw new Error('Cannot create styled-component for component: ' + String(tag));
	    }

	    /* This is callable directly as a template function */
	    // $FlowFixMe: Not typed to avoid destructuring arguments
	    var templateFunction = function templateFunction() {
	      return componentConstructor(tag, options, css.apply(undefined, arguments));
	    };

	    /* If config methods are called, wrap up a new template function and merge options */
	    templateFunction.withConfig = function (config) {
	      return constructWithOptions(componentConstructor, tag, _extends$2({}, options, config));
	    };
	    templateFunction.attrs = function (attrs) {
	      return constructWithOptions(componentConstructor, tag, _extends$2({}, options, {
	        attrs: _extends$2({}, options.attrs || {}, attrs)
	      }));
	    };

	    return templateFunction;
	  };

	  return constructWithOptions;
	});

	// 
	/* globals ReactClass */

	var wrapWithTheme$1 = function wrapWithTheme(Component$$1) {
	  var _WithTheme$contextTyp;

	  var componentName = Component$$1.displayName || Component$$1.name || 'Component';
	  var isStatelessFunctionalComponent = typeof Component$$1 === 'function' && !(Component$$1.prototype && 'isReactComponent' in Component$$1.prototype);

	  // NOTE: We can't pass a ref to a stateless functional component
	  var shouldSetInnerRef = isStyledComponent$1(Component$$1) || isStatelessFunctionalComponent;

	  var WithTheme = function (_React$Component) {
	    inherits$1(WithTheme, _React$Component);

	    function WithTheme() {
	      var _temp, _this, _ret;

	      classCallCheck$1(this, WithTheme);

	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      return _ret = (_temp = (_this = possibleConstructorReturn$1(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {}, _this.unsubscribeId = -1, _temp), possibleConstructorReturn$1(_this, _ret);
	    }

	    // NOTE: This is so that isStyledComponent passes for the innerRef unwrapping


	    WithTheme.prototype.componentWillMount = function componentWillMount() {
	      var _this2 = this;

	      var defaultProps = this.constructor.defaultProps;

	      var styledContext = this.context[CHANNEL_NEXT$1];
	      var themeProp = determineTheme$1(this.props, undefined, defaultProps);
	      if (styledContext === undefined && themeProp === undefined && "development" !== 'production') {
	        // eslint-disable-next-line no-console
	        console.warn('[withTheme] You are not using a ThemeProvider nor passing a theme prop or a theme in defaultProps');
	      } else if (styledContext === undefined && themeProp !== undefined) {
	        this.setState({ theme: themeProp });
	      } else {
	        var subscribe = styledContext.subscribe;

	        this.unsubscribeId = subscribe(function (nextTheme) {
	          var theme = determineTheme$1(_this2.props, nextTheme, defaultProps);
	          _this2.setState({ theme: theme });
	        });
	      }
	    };

	    WithTheme.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	      var defaultProps = this.constructor.defaultProps;

	      this.setState(function (oldState) {
	        var theme = determineTheme$1(nextProps, oldState.theme, defaultProps);

	        return { theme: theme };
	      });
	    };

	    WithTheme.prototype.componentWillUnmount = function componentWillUnmount() {
	      if (this.unsubscribeId !== -1) {
	        this.context[CHANNEL_NEXT$1].unsubscribe(this.unsubscribeId);
	      }
	    };

	    WithTheme.prototype.render = function render() {
	      var props = _extends$2({
	        theme: this.state.theme
	      }, this.props);

	      if (!shouldSetInnerRef) {
	        props.ref = props.innerRef;
	        delete props.innerRef;
	      }

	      return react.createElement(Component$$1, props);
	    };

	    return WithTheme;
	  }(react.Component);

	  WithTheme.displayName = 'WithTheme(' + componentName + ')';
	  WithTheme.styledComponentId = 'withTheme';
	  WithTheme.contextTypes = (_WithTheme$contextTyp = {}, _WithTheme$contextTyp[CHANNEL$1] = propTypes.func, _WithTheme$contextTyp[CHANNEL_NEXT$1] = CONTEXT_CHANNEL_SHAPE$1, _WithTheme$contextTyp);


	  return hoistNonReactStatics(WithTheme, Component$$1);
	};

	// 

	/* eslint-disable */
	var __DO_NOT_USE_OR_YOU_WILL_BE_HAUNTED_BY_SPOOKY_GHOSTS$1 = {
	  StyleSheet: StyleSheet$1
	};

	// 

	/* Import singletons */
	/* Import singleton constructors */
	/* Import components */
	/* Import Higher Order Components */
	/* Warning if you've imported this file on React Native */
	if ("development" !== 'production' && typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
	  // eslint-disable-next-line no-console
	  console.warn("It looks like you've imported 'styled-components' on React Native.\n" + "Perhaps you're looking to import 'styled-components/native'?\n" + 'Read more about this at https://www.styled-components.com/docs/basics#react-native');
	}

	/* Warning if there are several instances of styled-components */
	if ("development" !== 'production' && typeof window !== 'undefined') {
	  window['__styled-components-init__'] = window['__styled-components-init__'] || 0;

	  if (window['__styled-components-init__'] === 1) {
	    // eslint-disable-next-line no-console
	    console.warn("It looks like there are several instances of 'styled-components' initialized in this application. " + 'This may cause dynamic styles not rendering properly, errors happening during rehydration process ' + 'and makes you application bigger without a good reason.\n\n' + 'See https://s-c.sh/2BAXzed for more info.');
	  }

	  window['__styled-components-init__'] += 1;
	}

	/* Instantiate singletons */
	var ComponentStyle$1 = _ComponentStyle$1(generateAlphabeticName$1, flatten$1, stringifyRules$1);
	var constructWithOptions$1 = _constructWithOptions$1(css$1);
	var StyledComponent$1 = _StyledComponent$1(ComponentStyle$1, constructWithOptions$1);

	/* Instantiate exported singletons */
	var keyframes$1 = _keyframes$1(generateAlphabeticName$1, stringifyRules$1, css$1);
	var injectGlobal$1 = _injectGlobal$1(stringifyRules$1, css$1);
	var styled$1 = _styled$1(StyledComponent$1, constructWithOptions$1);

	var styledComponents_browser_es$1 = /*#__PURE__*/Object.freeze({
		css: css$1,
		keyframes: keyframes$1,
		injectGlobal: injectGlobal$1,
		isStyledComponent: isStyledComponent$1,
		consolidateStreamedStyles: consolidateStreamedStyles$1,
		ThemeProvider: ThemeProvider$1,
		withTheme: wrapWithTheme$1,
		ServerStyleSheet: ServerStyleSheet$1,
		StyleSheetManager: StyleSheetManager$1,
		__DO_NOT_USE_OR_YOU_WILL_BE_HAUNTED_BY_SPOOKY_GHOSTS: __DO_NOT_USE_OR_YOU_WILL_BE_HAUNTED_BY_SPOOKY_GHOSTS$1,
		default: styled$1
	});

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

	var _styledComponents$1 = ( styledComponents_browser_es$1 && styled$1 ) || styledComponents_browser_es$1;

	var dist$4 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});



	var _styledComponents2 = _interopRequireDefault(_styledComponents$1);



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
	  return react_3(Text, _extends$1({
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

	var ButtonOutline = styled(Button)([], function (props) {
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

	var Card$$1 = styled(dist_2$2)(_templateObject(), boxShadow, boxBorder, dist_29);
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
	var Code = styled.code(_templateObject$1(), dist_70, dist_73);
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

	var Hide$$1 = styled(dist_2$2)(_templateObject$2(), hidden('xs'), hidden('sm'), hidden('md'), hidden('lg'), hidden('xl'));
	Hide$$1.displayName = 'Hide';

	function Lead(props) {
	  return react_3(Text, _extends$1({
	    is: "p",
	    fontSize: 3,
	    lineHeight: 1.25
	  }, props));
	}
	Lead.displayName = 'Lead';

	function _templateObject$3() {
	  var data = _taggedTemplateLiteral(["\n  cursor: pointer;\n  text-decoration: none;\n  ", ";\n  &:hover {\n    text-decoration: underline;\n  }\n"]);

	  _templateObject$3 = function _templateObject() {
	    return data;
	  };

	  return data;
	}
	var Link = styled.a(_templateObject$3(), dist_70);
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

	  return react_3(ThemeProvider, {
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

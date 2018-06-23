'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var system = _interopDefault(require('system-components'));
var React = require('react');
var styledSystem = require('styled-system');
var styled = require('styled-components');
var styled__default = _interopDefault(styled);
var PropTypes = _interopDefault(require('prop-types'));
var gridStyled = require('grid-styled');

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
var space = [0, 4, 8, 16, 32, 64, 128];
var theme = {
  breakpoints: breakpoints,
  mediaQueries: mediaQueries,
  borders: borders,
  colors: colors,
  fonts: fonts,
  fontSizes: fontSizes,
  fontWeights: fontWeights,
  radii: radii,
  shadows: shadows,
  space: space,
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

var Text = system({
  m: 0
}, 'space', 'color', 'fontSize', 'fontWeight', 'textAlign', 'lineHeight', 'borders');
Text.displayName = 'Text';

var Blockquote = function Blockquote(props) {
  return React.createElement(Text, _extends({
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
    backgroundColor: props.type === 'primary' ? styledSystem.themeGet('colors.red')(props) : styledSystem.themeGet('colors.white')(props),
    color: props.type === 'primary' ? styledSystem.themeGet('colors.white')(props) : styledSystem.themeGet('colors.red')(props),
    '&:hover': {
      boxShadow: "inset 0 0 0 999px ".concat(styledSystem.themeGet('colors.darken.0')(props))
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
      backgroundColor: styledSystem.themeGet('colors.red')(props)
    },
    '&:focus': {
      boxShadow: "inset 0 0 0 2px, 0 0 0 2px"
    },
    '&:active': {
      color: 'white',
      backgroundColor: styledSystem.themeGet('colors.red')(props),
      boxShadow: "inset 0 0 0 2px ".concat(styledSystem.themeGet('colors.' + props.color)(props), ", inset 0 0 8px ").concat(styledSystem.themeGet('colors.darken.1')(props))
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
    border: "".concat(props.borderWidth, "px solid ").concat(styledSystem.themeGet('colors.' + props.borderColor)(props))
  };
};

var Card$$1 = styled__default(gridStyled.Box)(_templateObject(), boxShadow, boxBorder, styledSystem.borderRadius);
Card$$1.defaultProps = {
  borderColor: 'grey.0',
  borderRadius: 1,
  borderWidth: 1,
  theme: theme
};
Card$$1.displayName = 'Card';

function _templateObject$1() {
  var data = _taggedTemplateLiteral(["\n  font-family: 'Roboto Mono', monospace;\n  ", ";\n  ", ";\n"]);

  _templateObject$1 = function _templateObject() {
    return data;
  };

  return data;
}
var Code = styled__default.code(_templateObject$1(), styledSystem.color, styledSystem.fontSize);
Code.displayName = 'Code';
Code.defaultProps = {
  fontSize: 2,
  color: 'blue'
};

var Container$$1 = system({
  is: gridStyled.Box,
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
  theme: theme
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

var Hide$$1 = styled__default(gridStyled.Box)(_templateObject$2(), hidden('xs'), hidden('sm'), hidden('md'), hidden('lg'), hidden('xl'));
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

var Input = styled__default.input(_templateObject$3(), styledSystem.theme('fontSizes.1'), styledSystem.theme('radius'), styledSystem.theme('colors.grey.1'), styledSystem.theme('colors.gray.1'), borders$1, styledSystem.space);
Input.displayName = 'Input';

function Lead(props) {
  return React.createElement(Text, _extends({
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
var Link = styled__default.a(_templateObject$4(), styledSystem.color);
Link.displayName = 'Link';
Link.propTypes = {
  color: PropTypes.string
};
Link.defaultProps = {
  color: 'blue.1',
  theme: theme
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

  return React.createElement(styled.ThemeProvider, {
    theme: Object.assign({}, theme, theme$$1)
  }, React.createElement(Root, props));
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

exports.Flex = gridStyled.Flex;
exports.Box = gridStyled.Box;
exports.theme = theme;
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

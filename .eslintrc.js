module.exports = {
    "plugins": ["TweenMax", "TweenLite", "SplitText"],
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    },
    "globals": {
        "TimelineLite": false,
        "TimelineMax": false,
        "TweenLite": false,
        "TweenMax": false,
        "Back": false,
        "Bounce": false,
        "Circ": false,
        "Cubic": false,
        "Ease": false,
        "EaseLookup": false,
        "Elastic": false,
        "Expo": false,
        "Linear": false,
        "Power0": false,
        "Power1": false,
        "Power2": false,
        "Power3": false,
        "Power4": false,
        "Quad": false,
        "Quart": false,
        "Quint": false,
        "RoughEase": false,
        "Sine": false,
        "SlowMo": false,
        "SteppedEase": false,
        "Strong": false,
        "Draggable": false,
        "SplitText": false,
        "VelocityTracker": false,
        "CSSPlugin": false,
        "ThrowPropsPlugin": false,
        "BezierPlugin": false
    }
};
export default {
    presets : [
        [
            "@babel/preset-env",
            {
                "targets":"> 0.25%, not dead",
                "useBuiltIns":"usage",
                "corejs":3
            }
        ],
        [ "@babel/preset-react"]
    ],
    plugins : [
        [
            "@babel/plugin-transform-runtime",
        {
            "corejs":3,
            "absoluteRuntime": false,
            "helpers": true,
            "regenerator": true,
            "version": "7.0.0-beta.0"
        }
    ]
    ]
}
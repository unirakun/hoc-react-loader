/*
 * needed to be this file (babel.config.js) for jest
 * because jest doesn't look for .babelrc or package.json.babel ... :(
 */
module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
  ],
}

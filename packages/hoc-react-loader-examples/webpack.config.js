const path = require('path')
const webpack = require('webpack')

const dev = (process.env.NODE_ENV !== 'production')
const PUBLIC_PATH = dev ? '/' : './'

function getEntrySources(sources) {
  if (dev) {
    sources.push('webpack-dev-server/client?http://localhost:3000')
    sources.push('webpack/hot/only-dev-server')
  }

  return sources
}

function getLoaders(loaders) {
  if (dev) {
    loaders.push('react-hot')
  }
  loaders.push('babel')

  return loaders
}

function getPlugins(plugins) {
  if (dev) {
    plugins.push(new webpack.HotModuleReplacementPlugin())
  }

  return plugins
}

module.exports = {
  devtool: dev ? 'eval' : '',
  entry: {
    examples: getEntrySources([
      './src',
    ]),
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].js',
    publicPath: PUBLIC_PATH,
  },
  resolve: {
    root: [path.resolve('./src'), path.resolve('./src/components')],
    extensions: ['', '.js', '.jsx'],
  },
  plugins: getPlugins([]),
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: getLoaders([]),
      include: [path.join(__dirname, 'src'), path.join(__dirname, '..', 'src')],
    }, {
      test: /\.s?css$/,
      loaders: [
        'style',
        'css?modules&localIdentName=[path]_[local]__[hash:base64:5]',
        'sass',
      ],
    }, {
      test: /\.(png|svg|gif|jpg|html)$/,
      loader: 'file?name=[name].[ext]',
    }],
  },
}

const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniExtractCssPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isDev = (process.env.NODE_ENV === 'development');
const isProd = !isDev;

const optimiztion = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  }
  
  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin(),
    ]
  }
  
  return config;
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

const cssLoaders = (extra) => {
  const loaders = [
    {
      loader: MiniExtractCssPlugin.loader,
      options: {
        hmr: isDev,
        reloadAll: true
      }
    },
    'css-loader'
  ];
  
  if (extra) {
    loaders.push(extra);
  }
  
  return loaders;
}

const babelOptions = preset => {
  const options = {
    presets: [
      '@babel/preset-env',
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties'  
    ]
  }
  
  if (preset) {
    options.presets.push(preset);
  }
  
  return options;
}

const jsLoaders = () => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: babelOptions(),
    }
  ];
  
  if (isDev) {
    loaders.push('eslint-loader');
  }
  
  return loaders;
}

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: ['@babel/polyfill', './index.jsx'],
    analitics: './analitics.ts',
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.json', '.png'],
    alias: {
      '@models': './models',//path.resolve(__dirname, 'src/models'),
      '@': './'//path.resolve(__dirname, 'src'),
    }
  },
  optimization: optimiztion(),
  devServer: {
    port: 4200
  },
  devtool: isDev ? 'source-map' : '',
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/assets/favicon.ico'),
        to: path.resolve(__dirname, 'dist'),
      }
    ]),
    new MiniExtractCssPlugin({
      filename: filename('css')
    })
  ],
  module: {
    rules: [
      { 
        test: /\.js$/, 
        exclude: /node_modules/,
        use: jsLoaders()
      },
      { 
        test: /\.ts$/, 
        exclude: /node_modules/, 
        loader: {
          loader: 'babel-loader',
          options: babelOptions('@babel/preset-typescript'),
        }
      },
      { 
        test: /\.jsx$/, 
        exclude: /node_modules/, 
        loader: {
          loader: 'babel-loader',
          options: babelOptions('@babel/preset-react'),
        }
      },
      {
        test: /\.css$/,
        use: cssLoaders()
      },
      {
        test: /\.less$/,
        use: cssLoaders('less-loader')
      },
      {
        test: /\.s[ca]ss$/,
        use: cssLoaders('sass-loader')
      },
      {
        test: /.(png|jpg|svg|giv)$/,
        use: ['file-loader']
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['file-loader']
      },
      {
        test: /\.xml$/,
        use: ['xml-loader']
      },
      {
        test: /\.csv$/,
        use: ['csv-loader']
      }
    ]
  }
}
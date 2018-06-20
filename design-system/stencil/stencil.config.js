'use strict';
const postcss = require('@stencil/postcss');
//const autoprefixer = require('autoprefixer');
const sass = require('@stencil/sass');

exports.config = {
  namespace: 'design-system',
  outputTargets: [
    {
      type: 'www'
    }
  ],
  globalStyle: './src/styles/designsystem/_global.scss',
  //globalScript: 'src/global/index.ts',
  sassConfig: {
    includePaths: ['./src/styles/designsystem/']
  },
  enableCache: true,
  plugins: [
    sass({
      injectGlobalPaths: [
        './src/styles/designsystem/_variables.scss',
        './src/styles/designsystem/_mixins.scss'
      ]
    })
    //,
    // postcss({
    //   plugins: [autoprefixer()]
    // })
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};

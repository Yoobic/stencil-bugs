'use strict';
const postcss = require('@stencil/postcss');
const autoprefixer = require('autoprefixer');
const sass = require('@stencil/sass');

exports.config = {
  namespace: 'design-system',
  outputTargets: [
    {
      type: 'dist',
      dir: '../../node_modules/@shared/design-system'
    },
    {
      type: 'www'
    }
  ],
  globalStyle: '../../shared/styles/designsystem/_global.scss',
  globalScript: 'src/global/index.ts',
  sassConfig: {
    includePaths: ['../../shared/styles/designsystem/']
  },
  enableCache: true,
  plugins: [
    sass({
      injectGlobalPaths: [
      '../../shared/styles/designsystem/_variables.scss',
      '../../shared/styles/designsystem/_mixins.scss'
    ]
    }),
    postcss({
      plugins: [autoprefixer()]
    })
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};

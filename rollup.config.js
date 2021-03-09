import copy from 'rollup-plugin-copy';
import nodeResolve from "rollup-plugin-node-resolve";
import commonJs from 'rollup-plugin-commonjs'
const popup = {
  input: 'src/popup/popup.js',
  output: {
    file: 'dist/popup/popup.js',
    format: 'iife',
  },
  plugins: [
    copy({
      targets: [
        {
          src: 'src/popup/popup.html',
          dest: 'dist/popup/',
        },
        {
          src: 'assets/*',
          dest: 'dist/',
        },
      ],
    }),
  ],
};
const options = {
  input: 'src/options/options.js',
  output: {
    file: 'dist/options/options.js',
    format: 'iife',
  },
  plugins: [
    copy({
      targets: [
        {
          src: 'src/options/options.html',
          dest: 'dist/options/',
        },
      ],
    }),
  ],
};
const background = {
  input: 'src/background/background.js',
  output: {
    file: 'dist/background/background.js',
    format: 'iife',
  },
  plugins: [
    nodeResolve({preferBuiltins: true, browser: true}),
    commonJs(),
  ]
}
const content = {
  input: 'src/content/content.js',
  output: {
    file: 'dist/content/content.js',
    format: 'iife',
  },
}
export default [popup,options, background, content];

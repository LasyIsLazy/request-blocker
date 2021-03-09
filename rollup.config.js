import copy from 'rollup-plugin-copy';
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
}
const content = {
  input: 'src/content/content.js',
  output: {
    file: 'dist/content/content.js',
    format: 'iife',
  },
}
export default [popup,options, background, content];

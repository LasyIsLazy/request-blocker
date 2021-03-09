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
export default [popup, background, content];

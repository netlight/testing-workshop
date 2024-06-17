export default {
  '*.{ts,js}': ['eslint --cache --fix'],
  '*.{ts,tsx,js,jsx,json,yaml,yml,css,scss,less,html,md}': ['prettier --write'],
};

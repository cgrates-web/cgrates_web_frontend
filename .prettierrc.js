module.exports = {
  singleQuote: true,
  tabWidth: 2,
  overrides: [
    {
      files: '*.hbs',
      options: {
        parser: 'glimmer',
        singleQuote: false,
      },
    },
  ],
};

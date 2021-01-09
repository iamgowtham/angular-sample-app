import { AotPlugin } from "@ngtools/webpack";

exports = {
  /* ... */
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "@ngtools/webpack"
      }
    ]
  },

  plugins: [
    new AotPlugin({
      tsConfigPath: "path/to/tsconfig.json",
      entryModule: "path/to/app.module#AppModule"
    }),
    new HtmlWebpackPlugin({ template: './src/index.html' }),
  ]
};
import * as path from 'path';
import * as webpack from 'webpack';

module.exports = {
  entry: './src/ai_handler.ts',
  mode: 'none',
  target: 'node',
  devtool: 'source-map',
  plugins: [
    new webpack.IgnorePlugin({
      checkResource(resource) {
        const lazyImports = [
          './swagger-ui-bundle.js',
          './swagger-ui-standalone-preset.js',
          'class-validator',
          'class-transformer/storage',
          '@nestjs/swagger',
          'fastify-swagger',
          '@nestjs/microservices',
          '@nestjs/platform-fastify',
          '@nestjs/websockets/socket-module',
          '@nestjs/microservices/microservices-module',
          // mongodb optionals
          'mongodb-client-encryption',
          'bson-ext',
          'kerberos',
          'aws4',
          'snappy',
          'gcp-metadata',
          '@mongodb-js/zstd',
          'snappy/package.json',
        ];
        if (!lazyImports.includes(resource)) {
          return false;
        }
        try {
          require.resolve(resource);
        } catch (err) {
          return true;
        }
        return false;
      },
    }),
  ],
  externals: {
    '@aws-sdk': '@aws-sdk',
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@src': path.resolve(__dirname, 'src'),
    },
  },
  output: {
    path: path.resolve(__dirname, 'worker-dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs',
  },
  module: {
    rules: [{ test: /\.ts$/, loader: 'swc-loader' }],
  },
  stats: {
    warningsFilter: [
      'optional-require',
      'load-package.util',
      'load-adapter',
      () => false,
    ],
  },
};

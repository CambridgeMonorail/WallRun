const { transformSync } = require('@swc/core');

module.exports = {
  process(sourceText, sourcePath) {
    const { code, map } = transformSync(sourceText, {
      filename: sourcePath,
      sourceMaps: true,
      module: {
        type: 'commonjs',
      },
      jsc: {
        target: 'es2022',
        parser: {
          syntax: 'typescript',
          decorators: false,
          tsx: false,
        },
      },
    });

    return {
      code,
      map,
    };
  },
};

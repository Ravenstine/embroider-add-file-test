'use strict';

const Plugin = require('broccoli-plugin');

module.exports = {
  name: require('./package').name,

  setupPreprocessorRegistry(type, registry) {
    registry.add('template', {
      name: 'add-a-file',
      _addon: this,
      toTree(tree) {
        return new AddFilePlugin([tree], {});
      },
    });
  },
};

class AddFilePlugin extends Plugin {
  build() {
    const walkOptions = {
      includeBasePath: true,
      // directories: false,
    };

    let i = 0;

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const inputNode = this.input.at(i);

      i++;

      if (!inputNode) break;

      const entries = (() => {
        try {
          return inputNode.fs.entries('./', walkOptions);
        } catch {
          return null;
        }
      })();

      if (!entries) break;

      for (const entry of entries) {
        const isDirectory = this.input
          .lstatSync(entry.relativePath)
          .isDirectory();

        if (isDirectory) {
          this.output.mkdirSync(entry.relativePath);

          continue;
        }

        console.log(entry.relativePath);

        const file = this.input.readFileSync(entry.relativePath, {
          encoding: 'UTF-8',
        });

        this.output.writeFileSync(entry.relativePath, file, {
          encoding: 'UTF-8',
        });
      }
    }

    this.output.writeFileSync(
      'dummy/components/hello.hbs',
      `
      <h2>Hello</h2>
    `,
      { encoding: 'UTF-8' }
    );
  }
}

const fs = require('fs');
const path = require('path');

module.exports = (basedir, filesTypes = ['.js']) =>
  (addFile = (dir = '') => {
    const files = fs
      .readdirSync(path.join(basedir, dir), {
        withFileTypes: true
      })
      .filter(
        file =>
          (filesTypes.find(type => type === `.${file.name.split('.').pop()}`) &&
            !file.isDirectory()) ||
          file.isDirectory()
      );

    return files.reduce((acc, file) => {
      const { name } = file;

      if (!dir && name === 'index.js') return { ...acc };

      if (file.isDirectory())
        return { ...acc, [name]: addFile(path.join(dir, name)) };

      const finalName = name.split(/.js|.ts$/).join('');
      if (finalName === 'index' && files.length <= 1)
        return require(path.join(basedir, dir, name));

      return {
        ...acc,
        [finalName]: require(path.join(basedir, dir, name))
      };
    }, {});
  })();

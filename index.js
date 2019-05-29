const fs = require('fs');
const path = require('path');

const initialConfig = {
  extensions: ['.js'],
  blacklist: [],
  path: ''
};

module.exports = (_module, config = {}) => {
  const { extensions, blacklist, path: customPath } = {
      ...initialConfig,
      ...config
    },
    basedir = path.join(path.dirname(_module.filename), customPath);

  // This function will loop over the directory's tree.
  return (addFile = (dir = '') => {
    // Get every files in the 'basedir' and filter them.
    const files = fs
      .readdirSync(path.join(basedir, dir), {
        withFileTypes: true
      })
      .filter(file => {
        if (
          // Return if file.name is in the blacklist.
          blacklist.find(dlFile => dlFile === file.name) ||
          // Return if file is not a directory and don't have a valid extension.
          (!extensions.find(type => type === path.extname(file.name)) &&
            !file.isDirectory()) ||
          // Return if this is the file were this function as been called.
          path.join(basedir, file.name) === _module.filename
        )
          return;

        // Else return true.
        return true;
      });

    // Return the final object.
    return files.reduce((acc, file) => {
      const { name } = file;

      // If file is a directory, start this function again with a new path.
      if (file.isDirectory())
        return { ...acc, [name]: addFile(path.join(dir, name)) };

      // Remove the file extension if the extension is in config.extension.
      const finalName = name
        .split(
          new RegExp(
            `${extensions.reduce(
              (acc, curr) => (acc ? `${acc}|${curr}` : curr),
              ''
            )}$`
          )
        )
        .join('');

      // If the fileName is 'index' and there's no other files, return hes content.
      if (finalName === 'index' && files.length <= 1)
        return require(path.join(basedir, dir, name));

      // Return the file's content in a new property of the final object.
      return {
        ...acc,
        [finalName]: require(path.join(basedir, dir, name))
      };
    }, {});
  })();
};

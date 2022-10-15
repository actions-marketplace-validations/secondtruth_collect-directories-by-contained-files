const core = require('@actions/core');
const glob = require('glob');
const path = require('path');

const getDirectoryNames = (fileNames) =>
  fileNames.map((fileName) => path.basename(path.dirname(fileName)));

function findFromDirectory({ searchDirectory, filesGlob, unique }) {
  const adjustedSearchPath = `${process.cwd()}${searchDirectory}`
  core.debug(process.cwd());
  core.debug({ adjustedSearchPath });

  const fileNames = glob.sync(filesGlob, { cwd: adjustedSearchPath });
  core.debug({ fileNames });

  const directoryNames = unique
    ? [...new Set(getDirectoryNames(fileNames))]
    : getDirectoryNames(fileNames);
  core.debug({ directoryNames });

  return directoryNames;
}

try {
  const searchDirectory = core.getInput('search-directory');
  const filesGlob = core.getInput('files-glob');
  const unique = core.getBooleanInput('unique');
  core.debug({
    searchDirectory,
    filesGlob,
    unique,
  });

  const directoryNames = findFromDirectory({
    searchDirectory,
    filesGlob,
    unique,
  });

  core.setOutput('directories', directoryNames);
} catch (error) {
  core.setFailed(error.message);
}

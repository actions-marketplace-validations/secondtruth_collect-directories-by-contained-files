const core = require('@actions/core');
const glob = require('glob');
const path = require('path');

const getDirectoryNames = (fileNames, returnBaseNames) =>
  fileNames.map((fileName) => returnBaseNames ? path.basename(path.dirname(fileName)) : path.dirname(fileName));

function findFromDirectory({ searchDirectory, filesGlob, unique, returnBaseNames }) {
  const adjustedSearchPath = `${process.cwd()}${searchDirectory}`
  core.debug(process.cwd());
  core.debug({ adjustedSearchPath });

  const fileNames = glob.sync(filesGlob, { cwd: adjustedSearchPath });
  core.debug({ fileNames });

  const directoryNames = unique
    ? [...new Set(getDirectoryNames(fileNames, returnBaseNames))]
    : getDirectoryNames(fileNames, returnBaseNames);
  core.debug({ directoryNames });

  return directoryNames;
}

try {
  const searchDirectory = core.getInput('search-directory');
  const filesGlob = core.getInput('files-glob');
  const unique = core.getBooleanInput('unique');
  const returnBaseNames = core.getBooleanInput('return-basenames');
  core.debug({
    searchDirectory,
    filesGlob,
    unique,
    returnBaseNames,
  });

  const directoryNames = findFromDirectory({
    searchDirectory,
    filesGlob,
    unique,
    returnBaseNames,
  });

  core.setOutput('directories', directoryNames);
} catch (error) {
  core.setFailed(error.message);
}

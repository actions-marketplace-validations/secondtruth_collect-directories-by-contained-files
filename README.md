# Collect directories by contained files

This GitHub Action returns an array of directories that contain file(s) matching a glob pattern.

It allows you for example to pass a target directory and file glob to dynamically determine which tests suites to run, automatically detecting when test suites are removed or added.

## Inputs

### `files-glob`

**(Required)** The file glob of any files for which you want the parent directory name (e.g. `*.spec.ts`, `**/*.js`, etc.).

### `search-directory`

The location where we should search for files that match the `file-glob` (e.g. `/cypress`, `/`, etc.). Default: `/` (root).

### `unique`

Whether to return unique values when duplicates may be possible. Default: `true`.

### `return-basenames`

Whether to return the directory base names instead of the full paths. Default: `false`.

## Outputs

### `directories`

An array of directory names that house any matching files (e.g. `['Button', 'Components', ...]`).

## Example usage

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    name: Tests
    steps:
      - name: Get directory names
        id: get-directories
        uses: secondtruth/collect-directories-by-contained-files@v1
        with:
          files-glob: '**/*.spec.ts'
          search-directory: '/cypress'
          unique: "true"

      - name: Use directory names
        run: echo "Directory Names are ${{ steps.get-directories.outputs.directories }}
```

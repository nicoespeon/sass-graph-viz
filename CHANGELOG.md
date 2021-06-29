# Changelog

## Unreleased

## [v2.4.0](https://github.com/nicoespeon/sass-graph-viz/compare/v2.3.1...v2.4.0) (2021-06-29)

### Added

New CLI options:

- `-l, --load-paths` to add directories to the sass load path

New `generateVisualGraph` option:

- `loadPaths: string[]` to add directories to the sass load path (default `[process.cwd]`)

## [v2.3.1](https://github.com/nicoespeon/sass-graph-viz/compare/v2.3.0...v2.3.1) (2020-05-01)

Make sass-graph-viz work with Windows paths.

## [v2.3.0](https://github.com/nicoespeon/sass-graph-viz/compare/v2.2.2...v2.3.0) (2019-07-19)

Support LESS and CSS files.

It's not the main target of this library, but it can be handy if you need it. Plus, it was easy to enable, thanks to [sass-graph's work](https://github.com/xzyfer/sass-graph/pull/23).

## [v2.2.2](https://github.com/nicoespeon/sass-graph-viz/compare/v2.2.1...v2.2.2) (2019-02-07)

Turns out the `package.json` file should be explicitly include in the build, or it won't be properly compiled.

v2.2.1 fixed the package. But it throws during execution because it can't find the JSON file.

v2.2.2 makes it usable. Guaranteed 👌

## [v2.2.1](https://github.com/nicoespeon/sass-graph-viz/compare/v2.2.0...v2.2.1) (2019-02-07)

Fix the npm package by embedding the correct files in the release.

If you tried to install all previous releases, you probably couldn't because the `dist/` folder wasn't here. That's true. I messed up. It only worked for me because I got the local repository linked to my local npm.

Sorry for that. Hopefully _now_ you can use the lib 😅

## [v2.2.0](https://github.com/nicoespeon/sass-graph-viz/compare/v2.1.0...v2.2.0) (2018-12-18)

Few enhancements for contributors (Travis, README badges and external changelog).

### Added

New CLI options:

- `-d, --debug` to output details for debugging purposes
- `-v, --version` to print sass-graph-viz version

New `generateVisualGraph` option:

- `withDebugLogs: boolean` to log details for debugging purposes (default `false`)

## [v2.1.0](https://github.com/nicoespeon/sass-graph-viz/compare/v2.0.2...v2.1.0) (2018-10-25)

Help you identify things that are suspicious. Like orphan partials. You shouldn't have partials without a parent, it's probably dead code you can remove.

### Added

This release revises the colors of displayed nodes to add semantics:

- regular SCSS files are always legit, there is nothing we can tell, so they are **grey**
- partials which are imported by another file feel valid, so they are **green**
- orphan partials which are not imported are suspicious, so they are **red**

## [v2.0.2](https://github.com/nicoespeon/sass-graph-viz/compare/v2.0.1...v2.0.2) (2018-10-20)

### Fixed

Few fixes around isolated nodes. An _isolated node_ is a node without parent and without child.

Render the isolated node when you focus on it. Meaning `sgv _button.scss` will at least render the `_button` node. Previously, it would have displayed an empty page.

Also, fix the rendering of isolated nodes when you exclude externals. Previously, `sgv scss/ -e` would not render nodes that didn't have parent, nor child, after external files have been excluded.

## [v2.0.1](https://github.com/nicoespeon/sass-graph-viz/compare/v2.0.0...v2.0.1) (2018-10-11)

### Fixed

Visualize orphan files as orphan nodes in the graph. Before, they didn't show up in the graph if they were not linked to another node.

## [v2.0.0](https://github.com/nicoespeon/sass-graph-viz/compare/v1.0.0...v2.0.0) (2018-10-04)

### Breaking changes

Second param (`useSimpleViz: boolean`) was replaced by an `options` object:

```ts
generateVisualGraph( target: string, options?: Options )
```

You can generate a simpler visualization with `useSimpleViz: boolean` option (default `false`).

### Added

- Given target can be a folder, or a file.
  - Provide a file if you want to focus visualization on its ancestors and descendants.
- Configure the port with option `port: number` (default `3000`)
- Exclude omit files which are not under given target folder with option `excludeExternals: boolean` (default `false`).
  - For example, you may not want to visualize bootstrap files dependencies from `node_modules/`

## [v1.0.0](https://github.com/nicoespeon/sass-graph-viz/compare/6d1aa0bd29afb1919a7fcbb75b8b51b2f5f12c32...v1.0.0) (2018-09-21)

First release of the library.

### Added

- Generate graph with CLI (`sassgraphviz <dir>` or `sgv <dir>`)
- Option to generate a simpler visualization (`sgv --simple <dir>` or `sgv -s <dir>`)
- API method `generateVisualGraph( pathToFolder: string, useSimpleViz = false )`
- Large graphs (more than 30 nodes) display a preloader while computing

# Changelog

## [v2.1.0](https://github.com/nicoespeon/sass-graph-viz/compare/v2.0.2...v2.1.0) (2018-10-25)

Help you identify things that are suspicious. Like orphan partials. You shouldn't have partials without parent, it's probably dead code you can remove.

### Added

This release revise the colors of displayed nodes to add semantics:

- regular SCSS files are always legit, there is nothing we can tell, so they are **grey**
- partials which are imported by another file feel valid, so they are **green**
- orphan partials which are not imported are suspicious, so they are **red**

## [v2.0.2](https://github.com/nicoespeon/sass-graph-viz/compare/v2.0.1...v2.0.2) (2018-10-20)

### Fixed

Few fixes around isolated nodes. An _isolated node_ is a node without parent and without child.

Render the isolated node when you focus on it. Meaning `sgv _button.scss` will at least render the `_button` node. Previously, it would have displayed an empty page.

Also fix the rendering of isolated nodes when you exclude externals. Previousl, `sgv scss/ -e` would not render nodes that didn't have parent, nor child, after external files have been excluded.

## [v2.0.1](https://github.com/nicoespeon/sass-graph-viz/compare/v2.0.0...v2.0.1) (2018-10-11)

### Fixed

Visualize orphan files as orphan nodes in the graph. Before, they didn't show up in the graph if they were not linked to another node.

## [v2.0.0](https://github.com/nicoespeon/sass-graph-viz/compare/v1.0.0...v2.0.0) (2018-10-04)

### Breaking changes

Second param (`useSimpleViz: boolean`) was replaced by an `options` object:

```ts
generateVisualGraph( target: string, options?: Options )
```

You can generate a simpler visualisation with `useSimpleViz: boolean` option (default `false`).

### Added

- Given target can be a folder, or a file.
  - Provide a file if you want to focus visualization on its ancestors and descendents.
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

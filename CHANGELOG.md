# Changelog

All notable changes to this project will be documented in this file.

## [2.2.1] - 2019-04-26

### Changed

- Updated builder to 1.2.1
- Changed Example JavaScript to `Class`

## [2.2.0] - 2019-03-27

### Added

- Added runtimeCaching override option

## [2.1.1] - 2019-03-14

### Changed

- Fixed calculations for column offset

## [2.1.0] - 2019-03-04

### Added

- Added critical CSS
- Added `npm run create` command for easier component/utility creation
- Added default `tsconfig.json`

## [2.0.3] - 2018-10-22

### Changed

- Fixed linting issues in keyboard focus

## [2.0.2] - 2018-10-19

### Added

- Added focus states
- Added keyboard focus detect
- Added is touch with mouse detect

## [2.0.1] - 2018-09-07

### Added

- Added column-offset tool
- Added width-override tool
- Added copy and libs override possibility

## [2.0.0] - 2018-07-13

### Added

- Migrated `gulpfile.js` to external [tamtam-frontend-builder](https://bitbucket.org/tamtam-nl/tamtam-frontend-builder/) respositry.

### Changed

- Migrated the README to a Wiki for easier access.
  Updated moduleInit to have `sync` and `async` dynamic imports. This allows for native code splitting your modules, and only serving the JS the page needs.

## [1.5.0] - 2018-20-04

### Added

- SVG task will now add `classes` instead of the Nunjucks SVG extension. This way backend also has these classes available.
- Javascript now has a config folder to configurate your singleton modules. That way the main.js stays a lot cleaner.

### Changed

- Moved styleguide to index.html. That way it is used more often.
- Removed system folder in JS (moved environments to util), and added the modules to the root of JS folder.

### Changed

- Moved components folder which contains each components CSS / JS / HTML. Aliases will be generated accordingly in css, js and html tasks. Works out of the box with Shelf components.
- Moved javascript utilities folder which contains each utilities JS. Aliases will be created accordingly. Works out of the box with Shelf utilities.
- Migrated all default components to new component structure.
- Fixed a bug where `main-es.js` would also have all babel-polyfills on compile.

## [1.4.0] - 2017-11-24

### Added

- hover-focus mixin with JS util which prevents sticky hovers on touch devices 📱
- Added default ServiceWorker task which uses sw-precache to cache static files.
- Added ServiceWorker task paths.
- Added `screen-min-width($size)` and `screen-max-width($size)` media queries.
- Added `preconnect` and `preload` macro.
- Added `screen-min-width($size)` and `screen-max-width($size)` media queries.
- Added `main-es.js` for modern browsers. Will run based on `type="module"` support.

### Changed

- ModuleInit now can init multiple modules on 1 DOM element. It checks if the constructor is already bound on that element, if not the new constructor is also initiated.
- Renamed all `data-js-hook="name"` to `js-hook-name` to allow multiple hook binding on elements.
- Renamed `spaceless` tool to `inline-children` due to deprecation of the `inline-block` grid.
- Changed the old `inline-block` grid to a new `flexbox` grid.
- Changed `u-col-{$size}` to `o-col-{$size}` since a col is an object.
- Changed `o-grid-{$columns}` to `o-grid` since multiple grids weren't used.
- Changed `o-grid-{$columns}` to `o-grid` since multiple grids weren't used.
- Changed button macro to cover more usecases.

### Deleted

- Bower 🎉🎉🎉🎉🎉🎉🎉

## [1.3.0] - 2017-08-03

### Added

#### General

- Added SonarQube properties to overwrite global JS vars.
- Added Babel transpiler for ES6 browser support.
- Added SASS linting for code consistency.
- Added JS linting for code consistency.
- Added [.nvmrc](https://github.com/creationix/nvm) for easy node switching.
- Added gulp to scripts in package.json to run gulp locally

#### SASS changes

- Added responsive spacing utility.
- Added fluid type tool
- Added media query mixins 🙌
- Added current viewport indicator to see what viewport you're looking at.

### Changed

#### General

- Upgraded to Nunjucks 2.0.
- Converted SASS [ITCSS](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/) naming convention
- Converted HTML to [BEMIT](https://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/) naming convention
- Converted JS to ES6
- Updated deprecated cleanCSS package
- Updated gulp SASS
- Fixed BrowserSync reload issue in Node 6+
- Updated readme with new contributors

#### SASS changes

- Fixed some grid issues with mobile first toggling
- Moved heading styles to mixins and implemented them in heading elements and heading utilities.
- Grid classes use BEMIT naming convention, please check the [readme](https://bitbucket.org/tamtam-nl/tamtam-frontend-setup/overview#markdown-header-usage)

### Removed

- Removed Angular folder because it was redundant
- Removed a lot of example modules (common question by FE team)
- Old gulp tasks (Modernizr, Zip, SvgSprite, Readme)

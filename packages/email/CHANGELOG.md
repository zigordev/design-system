# Changelog

## [0.4.0](https://github.com/zigordev/design-system/compare/email-v0.3.0...email-v0.4.0) (2026-11-20)


### ⚠ BREAKING CHANGES

* @zigordev/tokens no longer exports products, densities, contrasts, Product, Density or Contrast, and themeAttributes holds only mode. The data-product, data-density and data-contrast attributes, the --ds-color-second-* tokens and Badge's second tone are gone. @zigordev/email drops EmailLayout's product prop and exports theme instead of themes. Dark is the default mode: to follow the system, set data-mode="system" instead of removing data-mode.

### Features

* add the rest of the component inventory ([#16](https://github.com/zigordev/design-system/issues/16)) ([108c6d4](https://github.com/zigordev/design-system/commit/108c6d4af717506126e8707e3cb5657e09cf593a))
* one brand on anthracite with a lavender accent ([#20](https://github.com/zigordev/design-system/issues/20)) ([913d8a7](https://github.com/zigordev/design-system/commit/913d8a7bd9ce08d4af6d30cad9261751c0bcdacd))

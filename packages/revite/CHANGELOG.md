# `revite` changelog

## 1.16.3

### Patch Changes

- cca62ce: Fix event handlers execution with payload.

## 1.16.2

### Patch Changes

- 7833500: Update npm package folders.

## 1.16.1

### Patch Changes

- e7b8f37: Change vite plugin path to 'revite/plugin/vite' instead of 'revite/plugin'.

## 1.16.0

### Minor Changes

- [`0207eb2`](https://github.com/midrock/revite/commit/0207eb22e91a97d687e0b2556dcdd306a8f005b4) Thanks [@midrock](https://github.com/midrock)! - Added a way to handle events with async listeners by import().

## 1.13.0

### Minor Changes

- [`bc7f78e`](https://github.com/midrock/revite/commit/bc7f78e67b9d8c43921fb671d3ede6f65d4e8702) Add async listeners

## 1.12.0

### Minor Changes

- [`e3b7971`](https://github.com/midrock/revite/commit/e3b7971f42304428a2f15533f81ac2f2c0553e86) Now revite container
  can extend service instances with extensions when they creating but before resolve.

## 1.11.0

### Minor Changes

- Add CLI to generate revite entities

### Patch changes

- Fix husky paths

## 1.10.1

### Patch changes

- Fix bug with revite/plugin running on windows

## 1.10.0

### Minor Changes

- implement next
  scenarios ([84eaa60](https://github.com/midrock/revite/commit/84eaa6035d37b6e33d74e922d5b0129579a85559))
- preload providers with sequential
  loading ([35b4932](https://github.com/midrock/revite/commit/35b4932225a4a952ec11f8f2a819edc01c687972))

# [1.9.0](https://github.com/midrock/revite/compare/v1.8.3...v1.9.0) (2023-05-27)

### Features

- preload providers with sequential
  loading ([ab482ad](https://github.com/midrock/revite/commit/ab482ad848ee2a22f0d5eb866973728b77b53123))

## [1.8.3](https://github.com/midrock/revite/compare/v1.8.2...v1.8.3) (2023-05-25)

### Bug Fixes

- trigger release ([49cb364](https://github.com/midrock/revite/commit/49cb3647f37093641442ffccaf3e6c616eaead44))

## [1.8.2](https://github.com/midrock/revite/compare/v1.8.1...v1.8.2) (2023-05-25)

### Bug Fixes

- update constructor
  types ([b7174c6](https://github.com/midrock/revite/commit/b7174c616973190572e9ccbdbfd94c79a5c4b4d6))

## [1.8.1](https://github.com/midrock/revite/compare/v1.8.0...v1.8.1) (2022-06-11)

### Bug Fixes

- **events:** error handler for
  listener ([0a4ad82](https://github.com/midrock/revite/commit/0a4ad82f76cea25fc9c7cba9c2dddab9cf247b8c))

# [1.8.0](https://github.com/midrock/revite/compare/v1.7.0...v1.8.0) (2022-05-28)

### Features

- implement consistent
  execution ([e22a0da](https://github.com/midrock/revite/commit/e22a0daea94cee2f9c67e3118fda82104987561c))

# [1.7.0](https://github.com/midrock/revite/compare/v1.6.0...v1.7.0) (2022-04-18)

### Features

- debounce for events
  registry ([bb41ef6](https://github.com/midrock/revite/commit/bb41ef6199d76c2c05d205bcc5aa98cb5aa8e2be))

# [1.6.0](https://github.com/midrock/revite/compare/v1.5.0...v1.6.0) (2022-04-16)

### Features

- create packages ([1e50e68](https://github.com/midrock/revite/commit/1e50e68a4b0856682a4f65a25cd3715b46bce098))

# [1.5.0](https://github.com/midrock/revite/compare/v1.4.3...v1.5.0) (2022-03-16)

### Features

- resolveImport as lib
  part ([010395c](https://github.com/midrock/revite/commit/010395c829c289e797be84a8a8ab8c1ec31ef3ce))

## [1.4.3](https://github.com/midrock/revite/compare/v1.4.2...v1.4.3) (2022-02-18)

### Bug Fixes

- update resolver ([f27b624](https://github.com/midrock/revite/commit/f27b62410b9bd14d54b9118c7bd59ed7d4cd6f5b))
- node version ([3fe53db](https://github.com/midrock/revite/commit/3fe53dbe8489458ad0d7a74e72bf07de7114e9ea))

## [1.4.2](https://github.com/midrock/revite/compare/v1.4.1...v1.4.2) (2022-02-08)

### Bug Fixes

- **ioc:** update
  resolver ([3dbe95a](https://github.com/midrock/revite/commit/3dbe95a9a9fd7bc24371e99454c8eb97b73a1518))

# [1.4.0](https://github.com/midrock/revite/compare/v1.3.0...v1.4.0) (2022-01-25)

### Features

- update documentation ([d569089](https://github.com/midrock/revite/commit/d56908907f7e8e6bc4f9aae52eb7c29bdf20d618))

# [1.3.0](https://github.com/midrock/revite/compare/v1.2.0...v1.3.0) (2022-01-25)

### Features

- add documentation ([360c9ab](https://github.com/midrock/revite/commit/360c9abf11441839c186df4b07485351327d33ae))

# [1.2.0](https://github.com/midrock/revite/compare/v1.1.0...v1.2.0) (2022-01-23)

### Features

- configure types ([be7e825](https://github.com/midrock/revite/commit/be7e825b4aff049cd83525326ac80844ca749e5a))

# 1.0.0 (2022-01-18)

### Features

- complete project init ([8d24adc](https://github.com/midrock/revite/commit/8d24adc29e61a037a7a7f332b5e2cfda681b519a))
- implement core ([cd63909](https://github.com/midrock/revite/commit/cd63909e51d2750811cc5d07574ea352f2233a1e))
- implement lib ([db32e8d](https://github.com/midrock/revite/commit/db32e8daf1d75781eace61ccceac0179490bae3f))
- init README ([139ab7f](https://github.com/midrock/revite/commit/139ab7f4bfb3cd1957e1419ac4e0a2ba89b51180))
- init repository ([0162afd](https://github.com/midrock/revite/commit/0162afdcd6c7de353e2d0b26919137f1724f87e2))

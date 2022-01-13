"use strict";
exports.__esModule = true;
function default_1(options) {
    var virtualFileId = '@revite/config';
    if (!options.root) {
        throw new Error('Revite Plugin: root directory with configurations should be defined');
    }
    if (!options.use || Object.keys(options.use).length === 0) {
        throw new Error('Revite Plugin: root directory with configurations should be defined');
    }
    var targetConfig = Object.keys(options.use).find(function (key) {
        return !!options.use[key];
    });
    if (!targetConfig) {
        throw new Error('Revite Plugin: no active config was found');
    }
    return {
        name: 'revite-plugin',
        resolveId: function (id) {
            if (id === virtualFileId) {
                return virtualFileId;
            }
        },
        load: function (id) {
            if (id === virtualFileId) {
                var path = [options.root, targetConfig, '*.ts'].filter(function (v) { return v; }).join('/');
                return "\n          const config = import.meta.globEager(\"".concat(path, "\")\n          export default config\n        ");
            }
        }
    };
}
exports["default"] = default_1;

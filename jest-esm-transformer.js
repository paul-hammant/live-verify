/*
    Copyright (C) 2025, Paul Hammant
    SPDX-License-Identifier: AGPL-3.0-or-later

    Jest transformer that strips ES module export statements from files
    that have dual ES module/CommonJS exports.
*/

module.exports = {
    process(sourceText, sourcePath) {
        // Remove ES module export statements
        // Matches: export { ... };
        // Matches: export function ...
        // Matches: export const ...
        const transformed = sourceText
            .replace(/^export\s*\{[^}]*\}\s*;?\s*$/gm, '// [stripped ES export]')
            .replace(/^export\s+(function|const|let|var|class)\s+/gm, '$1 ');

        return {
            code: transformed
        };
    }
};

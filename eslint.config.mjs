import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'

export default [
    { ignores: ['**/dist/', '**/node_modules/'] },
    { rules: { "no-unused-expressions": "on" } },
    { languageOptions: { globals: globals.node } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
]

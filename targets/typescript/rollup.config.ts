import dts from "rollup-plugin-dts"
import ttypescript from 'ttypescript';
import typescript from "rollup-plugin-typescript2";

export default [{
  input: 'src/main/typescript/breeze/breeze-parser.ts',
  output: {
    file: 'build/index.js',
    format: 'cjs'
  },
  plugins: [typescript({
    typescript: ttypescript
  })]
}, {

  input: 'src/main/typescript/breeze/breeze-parser.ts',
  output: {
    file: 'build/index.d.ts',
    format: 'es'
  },

  plugins: [dts({
    compilerOptions: {
      "paths": {
        "@breeze/grammar/*": [
          "grammar/src/main/antlr/breeze/*"
        ],
        "@breeze/lang/*": [
          "src/main/typescript/breeze/*"
        ],
        "@breeze/parser/*": [
          "src/main/generated/breeze/*"
        ]
      }
    }
  })]
}]
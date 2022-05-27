import dts from "rollup-plugin-dts"
import typescript from "rollup-plugin-typescript2";

export default [{
  input: 'src/main/typescript/breeze/breeze-parser.ts',
  output: {
    file: 'build/index.js',
    format: 'cjs'
  },

  plugins: [typescript()]
}, {

  input: 'src/main/typescript/breeze/breeze-parser.ts',
  output: {
    file: 'build/index.d.ts',
    format: 'es'
  },

  plugins: [dts()]
}]
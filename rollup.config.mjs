import typescript from '@rollup/plugin-typescript';
import glslify from 'rollup-plugin-glslify';
import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: './src/index.ts',
    output: [
      {
        file: 'build/index.module.mjs',
        format: 'es',
        sourcemap: true
      }
    ],
    plugins: [
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
        declarationDir: undefined,
        outDir: undefined,
        sourceMap: true
      }),      
      glslify(),
      terser()
    ],
    external: [
      'three',
      'ohzi-core',
      'pit-js',
      'three/examples/jsm/utils/BufferGeometryUtils.js',
      'three/examples/jsm/loaders/GLTFLoader.js',
      'three/examples/jsm/loaders/ColladaLoader.js',
      'three/examples/jsm/loaders/OBJLoader.js',
      'three/examples/jsm/loaders/HDRLoader.js',
      'three/examples/jsm/loaders/HDRCubeTextureLoader.js',
      'three/examples/jsm/loaders/DRACOLoader.js',
      'three/examples/jsm/loaders/FontLoader.js'
    ]
  }
//   {
//     input: './src/blitter_index.js',
//     output: [
//       {
//         file: 'build_blitter/index.module.js',
//         format: 'es',
//         sourcemap: true
//       }
//     ],
//     plugins: [
//       glslify(),
//       terser()
//     ]
//   }
];

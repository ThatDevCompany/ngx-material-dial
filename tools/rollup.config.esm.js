import config from './rollup.config.umd.js';

config.output.format = 'es';
config.output.file = 'dist/material.module.esm.js'
export default config;
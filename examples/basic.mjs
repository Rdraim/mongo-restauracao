import {randomBytes} from 'node:crypto';
import {criarArquivo, abrirArquivo, ensaiarRestauracao} from '../src/index.js';
const key=randomBytes(32);let copia;
console.log(await ensaiarRestauracao(criarArquivo(Buffer.from('somente exemplo'), key),key,{isolado:true,restaurar:async bytes=>{copia=bytes;},verificar:async()=>({ok:copia.toString()==='somente exemplo'})}));

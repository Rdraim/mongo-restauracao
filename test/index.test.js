import {test} from 'node:test';import assert from 'node:assert/strict';
import {randomBytes} from 'node:crypto';
import {criarArquivo, abrirArquivo, ensaiarRestauracao} from '../src/index.js';
test('fresh nonces and exact authenticated roundtrip',()=>{const key=randomBytes(32),b=Buffer.from('synthetic dataset');const a=criarArquivo(b,key),c=criarArquivo(b,key);assert.notEqual(a.iv,c.iv);assert.deepEqual(abrirArquivo(a,key),b);assert.throws(()=>abrirArquivo(a,randomBytes(32)));});
test('tampering and oversized archives fail',()=>{const key=randomBytes(32),a=criarArquivo(Buffer.from('data'),key);assert.throws(()=>abrirArquivo({...a,sha256:'0'.repeat(64)},key),/Integrity/);assert.throws(()=>abrirArquivo(a,key,{limiteBytes:1}),RangeError);});
test('restore requires isolation and post-restore evidence',async()=>{const key=randomBytes(32),a=criarArquivo(Buffer.from('data'),key);await assert.rejects(ensaiarRestauracao(a,key,{isolado:false}));let restored=false;const r=await ensaiarRestauracao(a,key,{isolado:true,restaurar:async()=>{restored=true;},verificar:async()=>({ok:restored,indices:1})});assert.equal(r.ok,true);});

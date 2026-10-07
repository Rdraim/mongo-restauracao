import {randomBytes,createCipheriv,createDecipheriv,createHash,timingSafeEqual} from 'node:crypto';
const hash=b=>createHash('sha256').update(b).digest('hex');
const chave=k=>{if(!Buffer.isBuffer(k)||k.length!==32)throw new TypeError('32-byte key required');return k;};
export function criarArquivo(bytes, key) {
  if (!Buffer.isBuffer(bytes)) throw new TypeError('Buffer required');
  const iv=randomBytes(12), c=createCipheriv('aes-256-gcm',chave(key),iv);
  c.setAAD(Buffer.from('mongo-restauracao:v1'));
  const cifra=Buffer.concat([c.update(bytes),c.final()]);
  return {formato:1,iv:iv.toString('hex'),tag:c.getAuthTag().toString('hex'),sha256:hash(cifra),cifra:cifra.toString('base64')};
}
export function abrirArquivo(a,key,{limiteBytes=20*1024*1024}={}) {
  if (!Number.isSafeInteger(limiteBytes)||limiteBytes<0)throw new RangeError('Invalid size limit');
  if(!a||a.formato!==1||!/^[a-f0-9]{24}$/.test(a.iv)||!/^[a-f0-9]{32}$/.test(a.tag)||!/^[a-f0-9]{64}$/.test(a.sha256)||typeof a.cifra!=='string')throw new TypeError('Invalid archive');
  if(a.cifra.length>Math.ceil(limiteBytes/3)*4)throw new RangeError('Archive exceeds limit');
  const b=Buffer.from(a.cifra,'base64');
  if(b.length>limiteBytes)throw new RangeError('Archive exceeds limit');
  if(!timingSafeEqual(Buffer.from(hash(b),'hex'),Buffer.from(a.sha256,'hex')))throw new Error('Integrity mismatch');
  const d=createDecipheriv('aes-256-gcm',chave(key),Buffer.from(a.iv,'hex'));
  d.setAAD(Buffer.from('mongo-restauracao:v1'));d.setAuthTag(Buffer.from(a.tag,'hex'));
  return Buffer.concat([d.update(b),d.final()]);
}
/** Adapter must enforce isolation itself. This function never connects to MongoDB. */
export async function ensaiarRestauracao(arquivo,key,{isolado,restaurar,verificar,limiteBytes}={}) {
  if(isolado!==true||typeof restaurar!=='function'||typeof verificar!=='function')throw new TypeError('Isolated restore and verification adapters required');
  const bytes=abrirArquivo(arquivo,key,{limiteBytes});
  await restaurar(bytes);
  const evidencias=await verificar();
  if(!evidencias||evidencias.ok!==true)throw new Error('Restore verification failed');
  return {ok:true,bytes:bytes.length,evidencias};
}

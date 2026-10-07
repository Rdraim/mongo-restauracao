<p align="right">
  <a href="README.md"><img src="assets/support/flag-pt-br.svg" width="36" height="24" alt="Português brasileiro" title="Português brasileiro"></a>
  <a href="README.en-US.md"><img src="assets/support/flag-en-us.svg" width="36" height="24" alt="English (United States)" title="English (United States)"></a>
  <a href="README.es-AR.md"><img src="assets/support/flag-es-ar.svg" width="36" height="24" alt="Español (Argentina)" title="Español (Argentina)"></a>
</p>

# mongo-restauracao

![mongo-restauracao](assets/support/project-en-us.svg)

<!-- public-badges:start -->
[![license](assets/support/badge-license.svg)](LICENSE) [![CI](assets/support/badge-ci.svg)](https://github.com/Rdraim/mongo-restauracao/actions) [![release](assets/support/badge-release.svg)](https://github.com/Rdraim/mongo-restauracao/releases)
<!-- public-badges:end -->

<p>
  <a href="https://github.com/Rdraim/mongo-restauracao/tree/main/examples"><img src="assets/support/action-0-en-us.svg" height="40" width="200" alt="View examples"></a>
  <a href="https://github.dev/Rdraim/mongo-restauracao"><img src="assets/support/action-1-en-us.svg" height="40" width="200" alt="Edit on GitHub"></a>
  <a href="https://github.com/Rdraim/mongo-restauracao/archive/refs/heads/main.zip"><img src="assets/support/action-2-en-us.svg" height="40" width="200" alt="Download code"></a>
</p>


Test encrypted archives and require evidence after an isolated restore.

## Installation

```bash
git clone https://github.com/Rdraim/mongo-restauracao.git
cd mongo-restauracao
npm test
node examples/basic.mjs
```

## Runnable example

```js
import {randomBytes} from 'node:crypto';
import {criarArquivo, abrirArquivo, ensaiarRestauracao} from './src/index.js';
const key=randomBytes(32);let copia;
console.log(await ensaiarRestauracao(criarArquivo(Buffer.from('somente exemplo'), key),key,{isolado:true,restaurar:async bytes=>{copia=bytes;},verificar:async()=>({ok:copia.toString()==='somente exemplo'})}));
```

## API

`criarArquivo(Buffer, key32Bytes)` uses AES-256-GCM with random nonce and format AAD. `abrirArquivo(archive, key, {limiteBytes})` checks SHA-256 and authentication before returning bytes. `ensaiarRestauracao(..., {isolado:true, restaurar, verificar})` requires explicit adapters and `{ok:true}` verification.

## Limits

A laboratory: no mongodump/mongorestore execution, automatic index preservation or 3-2-1 deployment. The adapter must enforce actual isolation, verify collections/indexes and MongoDB version compatibility. Examples use synthetic bytes only. Keys belong in a secret manager, never in this repository.

## Compatibility

No runtime dependencies in the core. CI targets Node.js 22 and 24. Install from Git; this project is not published on npm. Review Releases and pin a tag/commit for integration. Dependency updates require license, engine and consumer test review. A CI badge is not a security certification.

[Compatibility](COMPATIBILITY.en-US.md) · [Contributing](CONTRIBUTING.en-US.md) · [Security](SECURITY.en-US.md)

MIT © Rodrigo Rodrigues

## ☕ Buy me a coffee

Did this project help you solve a problem, learn something new, or take your first steps in development? If you feel like supporting my work, a coffee is a kind way to say thank you.

I’m **Rodrigo Rodrigues**, creator of **Nexus** and these open source projects. Your support helps me set aside time to improve the code, write clearer examples, and keep sharing what I learn.

**Give any amount that feels right to you. Supporting is completely optional — the project remains free under the MIT license.**

<p>
  <a href="#support-via-pix"><img src="assets/support/pix-en-us.svg" width="190" height="44" alt="Support via Pix"></a>
  <a href="https://github.com/techrodrigo21-ux/mongo-restauracao/issues/new?title=Feedback%3A%20this%20project%20helped%20me"><img src="assets/support/comment-en-us.svg" width="210" height="44" alt="Leave a comment"></a>
</p>

### Support via Pix

In your banking app, scan the QR code or copy the Pix key below. Choose your amount and check the recipient details before confirming.

<p align="center">
  <img src="assets/support/pix-qr.png" width="260" alt="Original Pix QR code supplied by Rodrigo Rodrigues; the text key below is an alternative.">
</p>

**Pix key**

```text
8875a24e-44d1-4c91-b6bb-62c9f0070955
```

Pix is Brazil’s payment system. If your bank does not support it, you can still help by sharing the project, reporting a bug, improving the documentation, or leaving feedback.

### Your feedback matters, too

[Tell me how the project helped you](https://github.com/techrodrigo21-ux/mongo-restauracao/issues/new?title=Feedback%3A%20this%20project%20helped%20me). I’d love to hear what you built, what you learned, and what could be clearer for someone just starting out.

A comment is welcome with or without a donation. Please keep payment receipts, personal details, credentials and private user data out of public Issues.

---

**Thank you for supporting my work and helping me keep building and sharing. ❤️**

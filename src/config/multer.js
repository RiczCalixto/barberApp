// Configuração de upload de arquivos

import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

export default {
  /* como o multer guarda nossos arquivos de imagem (CDN - content devlivery
    network) = servidores online feitos para armazenamento de arquivos físicos.
    Exemplo: Amazon S3 ou DigitalOcean Spaces. Nesse caso armazenaremos em pasta
    física da aplicação */
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      /* Aqui dentro formataremos o nome de arquivo da nossa imagem. */
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};

// Genera un placeholder PNG sólido reproducible (sin red, determinista) para que
// <Image formats={['avif','webp']}/> de astro:assets tenga un activo ráster real
// en src/assets/hero.png. Sustituir por la imagen hero de marca EMBES en producción.
import { deflateSync } from 'node:zlib';
import { writeFileSync, mkdirSync } from 'node:fs';

const W = 1024, H = 480;
// Amarillo EMBES rgb(255,222,89).
const R = 255, G = 222, B = 89;

const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
  crcTable[n] = c >>> 0;
}
function crc32(buf) {
  let c = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xFF] ^ (c >>> 8);
  return (c ^ 0xFFFFFFFF) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crc]);
}

const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0); ihdr.writeUInt32BE(H, 4);
ihdr[8] = 8; ihdr[9] = 2; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;

const rowBytes = 1 + W * 3;
const raw = Buffer.alloc(rowBytes * H);
for (let y = 0; y < H; y++) {
  const off = y * rowBytes;
  raw[off] = 0; // filter: None
  for (let x = 0; x < W; x++) {
    const p = off + 1 + x * 3;
    raw[p] = R; raw[p + 1] = G; raw[p + 2] = B;
  }
}
const idat = deflateSync(raw, { level: 9 });

const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const png = Buffer.concat([sig, chunk('IHDR', ihdr), chunk('IDAT', idat), chunk('IEND', Buffer.alloc(0))]);
mkdirSync('src/assets', { recursive: true });
writeFileSync('src/assets/hero.png', png);
console.log(`hero.png → ${png.length} bytes (${W}x${H})`);

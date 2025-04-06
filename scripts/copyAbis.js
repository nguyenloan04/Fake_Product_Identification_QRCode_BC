// scripts/copyAbis.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Dùng để định vị __dirname vì ESM không hỗ trợ sẵn
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contracts = ['MainSystem']; // ← Đổi tên contract thật sự của bạn

const sourceBase = path.join(__dirname, '..', 'artifacts', 'contracts');
const targetBase = path.join(__dirname, '..', 'src', 'abis');

if (!fs.existsSync(targetBase)) {
  fs.mkdirSync(targetBase, { recursive: true });
}

for (const contract of contracts) {
  const sourcePath = path.join(sourceBase, `${contract}.sol`, `${contract}.json`);
  const targetPath = path.join(targetBase, `${contract}.json`);

  if (!fs.existsSync(sourcePath)) {
    console.warn(`⚠️ ABI source not found: ${sourcePath}`);
    continue;
  }

  const json = JSON.parse(fs.readFileSync(sourcePath));
  fs.writeFileSync(targetPath, JSON.stringify(json.abi, null, 2));
  console.log(`✅ Copied ABI: ${contract}.json`);
}

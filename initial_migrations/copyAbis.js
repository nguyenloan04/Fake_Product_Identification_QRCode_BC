import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Giả lập __dirname trong ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Danh sách contracts cần copy ABI
const contracts = ["User", "MainSystem"];

const sourceBase = path.join(__dirname, "..", "artifacts", "contracts");
const targetBase = path.join(__dirname, "..", "src", "abis");

// Tạo thư mục đích nếu chưa có
if (!fs.existsSync(targetBase)) {
  fs.mkdirSync(targetBase, { recursive: true });
}

// Duyệt và copy từng contract
for (const name of contracts) {
  const sourcePath = path.join(sourceBase, `${name}.sol`, `${name}.json`);
  const targetPath = path.join(targetBase, `${name}.json`);

  if (!fs.existsSync(sourcePath)) {
    console.warn(`Không tìm thấy ABI gốc: ${sourcePath}`);
    continue;
  }

  // Nếu file ABI cũ đã tồn tại → xóa trước
  if (fs.existsSync(targetPath)) {
    fs.unlinkSync(targetPath);
    console.log(`Đã xoá file cũ: ${targetPath}`);
  }

  const content = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
  fs.writeFileSync(targetPath, JSON.stringify(content.abi, null, 2));
  console.log(`ABI ${name} đã được copy vào: src/abis/${name}.json`);
}

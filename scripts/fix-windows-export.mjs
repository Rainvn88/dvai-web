// Sửa lỗi của Next.js 16 khi `next build` (output: "export") chạy trên Windows:
// file nạp trước của từng segment bị ghi thành `__next.du-an/__PAGE__.txt` (thư mục con)
// thay vì `__next.du-an.__PAGE__.txt` như trình duyệt yêu cầu, gây lỗi 404 khi chuyển trang.
// Trên Linux (GitHub Actions) Next.js ghi đúng tên, script này không có gì để làm.
import { promises as fs } from "node:fs";
import path from "node:path";

const outDir = path.resolve(process.argv[2] ?? "out");

async function listFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const full = path.join(dir, entry.name);
      return entry.isDirectory() ? listFiles(full) : [full];
    }),
  );
  return files.flat();
}

async function walk(dir) {
  let fixed = 0;
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const full = path.join(dir, entry.name);
    if (entry.name.startsWith("__next.")) {
      for (const file of await listFiles(full)) {
        const relative = path.relative(full, file).split(path.sep).join(".");
        await fs.rename(file, path.join(dir, `${entry.name}.${relative}`));
        fixed++;
      }
      await fs.rm(full, { recursive: true, force: true });
    } else {
      fixed += await walk(full);
    }
  }
  return fixed;
}

const fixed = await walk(outDir);
if (fixed > 0) console.log(`[fix-windows-export] Đã sửa tên ${fixed} file segment trong ${outDir}`);

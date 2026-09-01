import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import TurndownService from 'turndown';

// Helper to slugify titles
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

// Extractor helpers
function extractTitle(html) {
  let match = html.match(/<title>([\s\S]*?)<\/title>/i);
  if (match) return match[1].replace(/<[^>]*>/g, '').trim();

  match = html.match(/<h1>([\s\S]*?)<\/h1>/i);
  if (match) return match[1].replace(/<[^>]*>/g, '').trim();

  return '';
}

function extractDescription(html) {
  let match = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([\s\S]*?)["']/i);
  if (!match) {
    match = html.match(/<meta[^>]*content=["']([\s\S]*?)["'][^>]*name=["']description["']/i);
  }
  if (match) return match[1].trim();

  match = html.match(/<p>([\s\S]*?)<\/p>/i);
  if (match) {
    const cleanText = match[1].replace(/<[^>]*>/g, '').trim();
    return cleanText.length > 160 ? cleanText.substring(0, 157) + '...' : cleanText;
  }

  return '';
}

function getBodyHtml(html) {
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return bodyMatch ? bodyMatch[1] : html;
}

// Clean unwanted scripts/styles and normalize styles into design system tokens
function normalizeAndCleanHtml(html) {
  let cleaned = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '');

  // Strip hardcoded font families to inherit system font
  cleaned = cleaned.replace(/font-family:\s*[^;"]+;?/gi, '');

  // Replace hardcoded static text colors with CSS theme variables
  cleaned = cleaned.replace(/color:\s*(#000000|#000|#111111|#111|#121212|#1a1a1a|#222222|#222|#333333|#333|black);?/gi, 'color: var(--text-main);');
  cleaned = cleaned.replace(/color:\s*(#555555|#555|#666666|#666|#777777|#777|#888888|#888|#999999|#999|#a1a1aa|gray|grey);?/gi, 'color: var(--text-muted);');

  // Replace hardcoded static backgrounds with CSS theme variables
  cleaned = cleaned.replace(/background(-color)?:\s*(#ffffff|#fff|#fafafa|#f8f9fa|#000000|#000|#09090b|#121215|#18181b|white|black);?/gi, 'background-color: var(--bg-card);');
  cleaned = cleaned.replace(/background(-color)?:\s*(#f1f3f5|#e2e8f0|#1a1a1e|#27272a);?/gi, 'background-color: var(--bg-alt);');

  // Replace hardcoded borders with CSS theme variable
  cleaned = cleaned.replace(/border(-color)?:\s*(1px\s+solid\s+)?(#e2e8f0|#27272a|#cccccc|#ccc|#dddddd|#ddd|#eeeeee|#eee);?/gi, 'border: 1px solid var(--border);');

  return cleaned;
}

function estimateDuration(markdownText) {
  const words = markdownText.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error('Error: Jalur file HTML tidak ditentukan.');
    console.log('Penggunaan: npm run import-html <path-to-html-file>');
    process.exit(1);
  }

  const filePath = path.resolve(args[0]);
  if (!fs.existsSync(filePath)) {
    console.error(`Error: File tidak ditemukan di "${filePath}"`);
    process.exit(1);
  }

  console.log(`Membaca file: ${filePath}`);
  const rawHtmlContent = fs.readFileSync(filePath, 'utf8');

  // Extract initial meta
  const rawTitle = extractTitle(rawHtmlContent);
  const rawDesc = extractDescription(rawHtmlContent);

  // Normalize HTML for Design System compatibility
  const normalizedHtml = normalizeAndCleanHtml(getBodyHtml(rawHtmlContent));

  // Configure Turndown to preserve rich design system elements (tables, details, cards, media, embeds)
  const turndownService = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced'
  });

  // Preserve rich HTML tags that are supported by our design system
  turndownService.keep([
    'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td',
    'details', 'summary',
    'figure', 'figcaption',
    'iframe', 'video', 'audio',
    'kbd', 'mark',
    'div', 'span',
    'svg', 'path'
  ]);

  const markdownBody = turndownService.turndown(normalizedHtml);
  const estimatedDuration = estimateDuration(markdownBody);

  // Setup prompt interface
  const rl = readline.createInterface({ input, output });

  console.log('\n======================================');
  console.log('  PENGATURAN ARTIKEL BARU (.md)');
  console.log('======================================\n');

  // 1. Select Collection
  let collection = '';
  let destDir = '';
  while (true) {
    console.log('Pilih koleksi tujuan:');
    console.log('1. informatika (src/content/informatika)');
    console.log('2. risalah     (src/content/risalah)');
    console.log('3. tutorial    (src/content/tutorial)');
    const choice = await rl.question('Pilihan (1-3): ');
    
    if (choice === '1') {
      collection = 'informatika';
      destDir = path.resolve('src/content/informatika');
      break;
    } else if (choice === '2') {
      collection = 'risalah';
      destDir = path.resolve('src/content/risalah');
      break;
    } else if (choice === '3') {
      collection = 'tutorial';
      destDir = path.resolve('src/content/tutorial');
      break;
    } else {
      console.log('Pilihan tidak valid. Coba lagi.\n');
    }
  }

  // 2. Title
  let title = '';
  while (true) {
    title = await rl.question(`Judul Artikel [Default: ${rawTitle || 'Belum Ada'}]: `);
    title = title.trim() || rawTitle;
    if (title) break;
    console.log('Judul tidak boleh kosong!\n');
  }

  // 3. Description
  let description = await rl.question(`Deskripsi Artikel [Default: ${rawDesc || 'Belum Ada'}]: `);
  description = description.trim() || rawDesc;

  // 4. Category (for informatika only)
  let category = '';
  if (collection === 'informatika') {
    while (true) {
      category = await rl.question('Kategori (misal: MikroTik, Linux, WebDev) [Wajib]: ');
      category = category.trim();
      if (category) break;
      console.log('Kategori wajib diisi untuk koleksi informatika!\n');
    }
  }

  // 5. Tags
  const tagsInput = await rl.question('Tags (pisahkan dengan koma, misal: astro, webdev): ');
  const tags = tagsInput
    .split(',')
    .map(t => t.trim())
    .filter(t => t.length > 0);

  // 6. PubDate
  const today = new Date().toISOString().split('T')[0];
  let pubDate = await rl.question(`Tanggal Publikasi (YYYY-MM-DD) [Default: ${today}]: `);
  pubDate = pubDate.trim() || today;

  // 7. Duration
  let durationInput = await rl.question(`Estimasi Durasi Membaca (menit) [Default: ${estimatedDuration}]: `);
  let duration = parseInt(durationInput.trim(), 10) || estimatedDuration;

  rl.close();

  // Create Slug
  const slug = slugify(title);
  const finalFileName = `${slug}.md`;
  const finalFilePath = path.join(destDir, finalFileName);

  // Frontmatter construction
  let frontmatter = '---\n';
  frontmatter += `title: "${title.replace(/"/g, '\\"')}"\n`;
  frontmatter += `description: "${description.replace(/"/g, '\\"')}"\n`;
  frontmatter += `pubDate: ${pubDate}\n`;
  if (collection === 'informatika') {
    frontmatter += `category: "${category.replace(/"/g, '\\"')}"\n`;
  }
  if (tags.length > 0) {
    frontmatter += `tags: [${tags.map(t => `"${t}"`).join(', ')}]\n`;
  } else {
    frontmatter += `tags: []\n`;
  }
  frontmatter += `duration: ${duration}\n`;
  frontmatter += '---\n\n';

  const fullMarkdownContent = frontmatter + markdownBody + '\n';

  // Check if file exists
  if (fs.existsSync(finalFilePath)) {
    console.log(`\n[Peringatan] File "${finalFileName}" sudah ada di direktori tujuan.`);
    const rlConfirm = readline.createInterface({ input, output });
    const overwrite = await rlConfirm.question('Apakah Anda ingin menimpanya? (y/N): ');
    rlConfirm.close();
    if (overwrite.toLowerCase() !== 'y') {
      console.log('Batal menyimpan file.');
      process.exit(0);
    }
  }

  // Ensure dest directory exists
  fs.mkdirSync(destDir, { recursive: true });

  // Write file
  fs.writeFileSync(finalFilePath, fullMarkdownContent, 'utf8');

  console.log('\n======================================');
  console.log('  KONVERSI BERHASIL DISIMPAN!');
  console.log('======================================');
  console.log(`Koleksi: ${collection}`);
  console.log(`File   : ${finalFilePath}`);
  console.log(`Slug   : ${slug}`);
  console.log('======================================\n');
}

main().catch(err => {
  console.error('Terjadi kesalahan:', err);
  process.exit(1);
});

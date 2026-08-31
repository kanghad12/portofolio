---
title: Mengapa Saya Bermigrasi dari WordPress ke Astro untuk Web Pribadi
description: Catatan digital garden tentang efisiensi, performa, dan kemudahan pemeliharaan menggunakan Astro static site generator dibandingkan dengan CMS database konvensional.
pubDate: 2026-08-01
duration: 5
tags: [astro, webdev, static-site, minimal]
---

Sebagai praktisi IT dan guru, saya butuh website yang cepat diakses siswa (bahkan dengan kuota terbatas atau jaringan seluler yang lambat). WordPress adalah platform hebat untuk CMS dinamis, namun pemeliharaan server database, pembaruan plugin keamanan bulanan, dan kebutuhan resource server yang besar membuat saya berpikir ulang.

Catatan ini merekam proses evaluasi saya ketika berpindah ke **Astro.build** sebagai pondasi utama website kanghadad.com.

## Evaluasi Kinerja (Performance)
WordPress membutuhkan PHP untuk merender halaman secara dinamis di server setiap kali ada permintaan, lalu melakukan kueri ke MySQL database. Ini membutuhkan waktu beberapa ratus milidetik (atau detik jika server murah). 

Astro melakukan kompilasi halaman di komputer lokal atau build server (Cloudflare), menghasilkan file HTML dan CSS statis murni (*zero-Javascript by default*).
- **WordPress Page Speed**: 40-75 (tergantung plugin)
- **Astro Page Speed**: 98-100 (statis sempurna)

## Keamanan (Zero Database, Zero Hack)
Karena tidak ada database MySQL yang terekspos ke publik dan tidak ada interpretasi PHP di sisi server hosting, potensi serangan siber seperti SQL Injection atau remote code execution menjadi hampir nol. Web statis murni sangat aman dan tidak membutuhkan pembaruan keamanan bulanan yang merepotkan.

## Kemudahan Menulis dengan Markdown
Astro mendukung penulisan dengan Markdown secara bawaan (*native*). Saya hanya perlu membuka terminal, membuat file `.md` baru di folder `src/content`, menulis catatan pelajaran, lalu melakukan `git push`. Cloudflare Pages akan otomatis mendeteksi perubahan tersebut dan mempublikasikan tulisan baru dalam waktu kurang dari satu menit.

**Status Catatan**: Catatan ini sudah masuk ke status **🌳 Evergreen** karena proses migrasi telah selesai sepenuhnya dan terbukti sangat memuaskan baik dari segi performa maupun kemudahan penulisan.

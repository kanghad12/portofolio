import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  // Untuk integrasi Cloudflare Pages & GitHub di produksi:
  // storage: process.env.NODE_ENV === 'production'
  //   ? {
  //       kind: 'github',
  //       repo: 'username/repo-name', // Ganti dengan repo Anda
  //     }
  //   : {
  //       kind: 'local',
  //     },
  collections: {
    tkj: collection({
      label: 'Modul TKJ',
      slugField: 'title',
      path: 'src/content/tkj/*',
      entryLayout: 'content',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Judul Modul' } }),
        description: fields.text({ label: 'Deskripsi Singkat', multiline: true }),
        pubDate: fields.date({ label: 'Tanggal Rilis', defaultValue: { kind: 'today' } }),
        category: fields.text({ label: 'Kategori (contoh: MikroTik, Cisco, Linux)', defaultValue: 'MikroTik' }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (val) => val,
        }),
        duration: fields.number({ label: 'Durasi Baca (Menit)', defaultValue: 5 }),
        content: fields.document({
          label: 'Konten / Materi',
          formatting: true,
          dividers: true,
          links: true,
          images: true,
        }),
      },
    }),
    risalah: collection({
      label: 'Risalah & Opini',
      slugField: 'title',
      path: 'src/content/risalah/*',
      entryLayout: 'content',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Judul Risalah' } }),
        description: fields.text({ label: 'Deskripsi Singkat', multiline: true }),
        pubDate: fields.date({ label: 'Tanggal Rilis', defaultValue: { kind: 'today' } }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (val) => val,
        }),
        duration: fields.number({ label: 'Durasi Baca (Menit)', defaultValue: 5 }),
        content: fields.document({
          label: 'Konten / Esai',
          formatting: true,
          dividers: true,
          links: true,
          images: true,
        }),
      },
    }),
    garden: collection({
      label: 'Digital Garden',
      slugField: 'title',
      path: 'src/content/garden/*',
      entryLayout: 'content',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Judul Catatan' } }),
        description: fields.text({ label: 'Deskripsi Singkat', multiline: true }),
        pubDate: fields.date({ label: 'Tanggal Catatan', defaultValue: { kind: 'today' } }),
        status: fields.select({
          label: 'Status Pertumbuhan',
          options: [
            { label: '🌱 Seedling', value: 'seedling' },
            { label: '🌿 Growing', value: 'growing' },
            { label: '🌳 Evergreen', value: 'evergreen' },
          ],
          defaultValue: 'seedling',
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (val) => val,
        }),
        content: fields.document({
          label: 'Konten Catatan',
          formatting: true,
          dividers: true,
          links: true,
          images: true,
        }),
      },
    }),
  },
});

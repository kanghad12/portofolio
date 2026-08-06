import React, { useState, useMemo } from 'react';

export interface SearchItem {
  slug: string;
  title: string;
  description: string;
  collection: 'tkj' | 'risalah' | 'garden';
  pubDate: string;
  tags: string[];
  category?: string;
  status?: string;
  duration?: number;
}

interface Props {
  items: SearchItem[];
}

export default function Search({ items }: Props) {
  const [query, setQuery] = useState('');
  const [selectedCollection, setSelectedCollection] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    items.forEach(item => {
      item.tags.forEach(tag => tagsSet.add(tag));
    });
    return Array.from(tagsSet);
  }, [items]);

  // Filter items based on search query, selected collection, and selected tag
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesQuery = 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
        (item.category && item.category.toLowerCase().includes(query.toLowerCase()));

      const matchesCollection = selectedCollection === 'all' || item.collection === selectedCollection;
      const matchesTag = selectedTag === 'all' || item.tags.includes(selectedTag);

      return matchesQuery && matchesCollection && matchesTag;
    });
  }, [items, query, selectedCollection, selectedTag]);

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const getCollectionBadgeClass = (col: string) => {
    if (col === 'tkj') return 'card-tag tag-tkj';
    if (col === 'risalah') return 'card-tag tag-islam';
    return 'card-tag tag-garden';
  };

  const getCollectionName = (col: string) => {
    if (col === 'tkj') return 'Modul TKJ';
    if (col === 'risalah') return 'Risalah & Opini';
    return 'Digital Garden';
  };

  return (
    <div>
      {/* Search Input Box */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Cari materi jaringan, perintah MikroTik, risalah dakwah, atau tag..."
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Filter Tabs by Collection */}
      <div className="filter-container">
        <button
          className={`filter-btn ${selectedCollection === 'all' ? 'active' : ''}`}
          onClick={() => { setSelectedCollection('all'); setSelectedTag('all'); }}
        >
          Semua Catatan
        </button>
        <button
          className={`filter-btn ${selectedCollection === 'tkj' ? 'active' : ''}`}
          onClick={() => { setSelectedCollection('tkj'); setSelectedTag('all'); }}
        >
          🌐 Modul TKJ
        </button>
        <button
          className={`filter-btn ${selectedCollection === 'risalah' ? 'active' : ''}`}
          onClick={() => { setSelectedCollection('risalah'); setSelectedTag('all'); }}
        >
          📖 Risalah Islam
        </button>
        <button
          className={`filter-btn ${selectedCollection === 'garden' ? 'active' : ''}`}
          onClick={() => { setSelectedCollection('garden'); setSelectedTag('all'); }}
        >
          🌱 Digital Garden
        </button>
      </div>

      {/* Filter Tabs by Tags (dynamic) */}
      {allTags.length > 0 && (
        <div className="filter-container" style={{ marginBottom: '40px', borderTop: '1px dashed var(--border)', paddingTop: '16px' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-muted)', display: 'block', width: '100%', marginBottom: '4px' }}>
            FILTER BERDASARKAN TAG:
          </span>
          <button
            className={`filter-btn ${selectedTag === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedTag('all')}
            style={{ fontSize: '0.75rem', padding: '4px 12px' }}
          >
            Semua Tag
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              className={`filter-btn ${selectedTag === tag ? 'active' : ''}`}
              onClick={() => setSelectedTag(tag)}
              style={{ fontSize: '0.75rem', padding: '4px 12px' }}
            >
              #{tag}
            </button>
          ))}
        </div>
      )}

      {/* Search Results */}
      <div>
        <h2 className="section-title">
          Hasil Pencarian ({filteredItems.length})
        </h2>

        {filteredItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>Tidak ada catatan yang ditemukan.</p>
            <p style={{ fontSize: '0.9rem' }}>Coba ubah kata kunci pencarian atau bersihkan filter.</p>
          </div>
        ) : (
          filteredItems.map(item => (
            <article key={item.slug} className="article-card">
              <span className={getCollectionBadgeClass(item.collection)}>
                {getCollectionName(item.collection)} {item.category ? `• ${item.category}` : ''}
              </span>
              
              {item.status && (
                <span className="garden-badge" style={{ marginLeft: '12px', fontSize: '0.65rem', padding: '2px 8px' }}>
                  {item.status === 'seedling' && '🌱 Seed'}
                  {item.status === 'growing' && '🌿 Growing'}
                  {item.status === 'evergreen' && '🌳 Evergreen'}
                </span>
              )}

              <h3 className="card-title">
                <a href={`/${item.collection}/${item.slug}`}>{item.title}</a>
              </h3>
              
              <p className="card-excerpt">{item.description}</p>
              
              <div className="card-footer">
                <span>📅 {formatDate(item.pubDate)}</span>
                {item.duration && <span>• ⏱️ {item.duration} min baca</span>}
                {item.tags.length > 0 && (
                  <span style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
                    {item.tags.map(t => (
                      <span key={t} style={{ color: 'var(--accent-orange)' }}>#{t}</span>
                    ))}
                  </span>
                )}
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}

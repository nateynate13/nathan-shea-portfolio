// Thin client for the free Open Library API, used by the admin add-book
// form to auto-fill author/year/summary/cover from a title search so those
// fields don't have to be typed by hand every time.

export async function searchBooks(title, limit = 5) {
  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(title)}&limit=${limit}&fields=title,author_name,first_publish_year,cover_i,key`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Open Library search failed (${response.status})`);
  const data = await response.json();
  return (data.docs || []).map(doc => ({
    title: doc.title || '',
    author: (doc.author_name || []).join(', '),
    year: doc.first_publish_year || '',
    coverId: doc.cover_i || null,
    workKey: doc.key || null
  }));
}

export function coverUrlForId(coverId, size = 'L') {
  if (!coverId) return null;
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
}

export async function fetchWorkDescription(workKey) {
  if (!workKey) return '';
  try {
    const response = await fetch(`https://openlibrary.org${workKey}.json`);
    if (!response.ok) return '';
    const data = await response.json();
    const description = data.description;
    if (!description) return '';
    return typeof description === 'string' ? description : (description.value || '');
  } catch (e) {
    console.error('Error fetching Open Library work description:', e);
    return '';
  }
}

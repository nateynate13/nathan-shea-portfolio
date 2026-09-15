// Single source of truth for book tag → emoji mapping.
// Used by main.js (library rendering) and the admin add/edit book forms,
// so a new tag category only needs to be added here.
export const TAG_EMOJIS = {
  'Business': '📈',
  'History': '🌍',
  'Society': '🌍',
  'Philosophy': '🧠',
  'Life': '💭',
  'Identity': '🎭',
  'Sports': '🏀'
};

export function addEmojiToTag(tag) {
  if (/^[\u{1F300}-\u{1F9FF}]/u.test(tag)) {
    return tag;
  }
  for (const [key, emoji] of Object.entries(TAG_EMOJIS)) {
    if (tag.includes(key)) {
      return `${emoji} ${tag.replace(key, '').trim() || key}`;
    }
  }
  return tag;
}

export function stripEmoji(tag) {
  return tag.replace(/^[\u{1F300}-\u{1F9FF}]\s*/u, '').trim();
}

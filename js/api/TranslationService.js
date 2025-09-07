import { DataUtils } from '../utils/DataUtils.js';

export class TranslationService {
  constructor() {
    this.cachePrefix = 'translation_';
    this.cacheExpiry = 86400 * 1000;
    this.apiUrl = 'https://api.mymemory.translated.net/get';
  }

  async translateText(text) {
    if (!text || text.trim() === '') return text;

    const cacheKey = this.getCacheKey(text);
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    try {
      const url = `${this.apiUrl}?q=${encodeURIComponent(text)}&langpair=en|ru`;
      const resp = await fetch(url, { method: 'GET', headers: { 'Accept': 'application/json' } });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const data = await resp.json();

      let translated = text;
      if (data && data.responseData && data.responseData.translatedText) {
        translated = data.responseData.translatedText;
      }

      if (translated !== text) {
        this.saveToCache(cacheKey, translated);
      }

      return translated;
    } catch (e) {
      console.warn('MyMemory error:', e);
      return text;
    }
  }

  getCacheKey(text) {
    return `${this.cachePrefix}ru_${this.hashString(text)}`;
  }

  hashString(str) {
    let hash = 0;
    if (!str.length) return '0';
    for (let i = 0; i < str.length; i++) {
      const chr = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0;
    }
    return Math.abs(hash).toString();
  }

  getFromCache(key) {
    try {
      const cached = DataUtils.loadFromStorage(key);
      if (cached && cached.timestamp) {
        if (Date.now() - cached.timestamp < this.cacheExpiry) return cached.data;
      }
    } catch (e) {
      console.warn('Cache load error:', e);
    }
    return null;
  }

  saveToCache(key, data) {
    try {
      DataUtils.saveToStorage(key, { data, timestamp: Date.now() });
    } catch (e) {
      console.warn('Cache save error:', e);
    }
  }

  deleteOld() {
    try {
      const keys = Object.keys(localStorage);
      const now = Date.now();
      keys.forEach(k => {
        if (k.startsWith(this.cachePrefix)) {
          const cached = DataUtils.loadFromStorage(k);
          if (cached?.timestamp && now - cached.timestamp > this.cacheExpiry) {
            localStorage.removeItem(k);
          }
        }
      });
    } catch (e) {
      console.warn('Clear cache error:', e);
    }
  }
}

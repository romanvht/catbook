export class CatApiService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.thecatapi.com/v1';
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000;
  }

  getHeaders() {
    const headers = {
      'Content-Type': 'application/json'
    };

    if (this.apiKey) {
      headers['x-api-key'] = this.apiKey;
    }

    return headers;
  }

  async makeRequest(endpoint, options = {}) {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const cacheKey = `${url}${JSON.stringify(options)}`;

      if (this.cache.has(cacheKey)) {
        const cached = this.cache.get(cacheKey);
        if (Date.now() - cached.timestamp < this.cacheTimeout) {
          return cached.data;
        }
      }

      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.getHeaders(),
          ...options.headers
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      this.cache.set(cacheKey, {
        data,
        timestamp: Date.now()
      });

      return data;
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  async getBreeds() {
    return await this.makeRequest('/breeds');
  }

  async getBreed(breedId) {
    return await this.makeRequest(`/breeds/${breedId}`);
  }

  async getBreedImages(breedId, limit = 50) {
    const params = new URLSearchParams({
      breed_ids: breedId,
      limit: limit.toString(),
      size: 'med'
    });

    return await this.makeRequest(`/images/search?${params}`);
  }

  async getRandomImages(limit = 10) {
    const params = new URLSearchParams({
      limit: limit.toString(),
      size: 'med'
    });

    return await this.makeRequest(`/images/search?${params}`);
  }

  clearCache() {
    this.cache.clear();
  }

  setApiKey(apiKey) {
    this.apiKey = apiKey;
    this.clearCache();
  }
}

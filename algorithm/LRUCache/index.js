class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) {
      return false;
    }
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.put(key, value);
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }
    this.cache.put(key, value);
    if (this.cache.size > this.capacity) {
      const firstkey = this.cache.keys().next().value;
      this.cache.delete(firstkey);
    }
  }
}

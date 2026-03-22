/**
 * Fuzzy Search — wraps Fuse.js
 * Used across dashboard, vault, inbox, decisions
 * Requires Fuse.js loaded from CDN before this file
 */
const Search = {
  _instance: null,
  _data: [],
  _opts: {},

  /**
   * Initialise with a data array and Fuse options
   * keys: array of { name, weight } objects
   */
  init(data, keys) {
    this._data = data;
    if (typeof Fuse === 'undefined') {
      console.warn('Search: Fuse.js not loaded — falling back to substring match');
      this._instance = null;
      return;
    }
    this._instance = new Fuse(data, {
      keys,
      threshold: 0.35,
      includeScore: true,
      ignoreLocation: true,
      minMatchCharLength: 2
    });
  },

  /**
   * Run a query. Returns filtered data array (not Fuse result objects).
   * Empty query returns full dataset.
   */
  query(q) {
    q = (q || '').trim();
    if (!q) return this._data;

    if (this._instance) {
      return this._instance.search(q).map(r => r.item);
    }

    // Fallback substring
    const lower = q.toLowerCase();
    return this._data.filter(item => JSON.stringify(item).toLowerCase().includes(lower));
  },

  /**
   * Attach live search to an input element.
   * onResults(filteredData) called on each keystroke (debounced 200ms).
   */
  attach(inputEl, onResults) {
    if (!inputEl) return;
    let timer;
    inputEl.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        onResults(this.query(inputEl.value));
      }, 200);
    });
  }
};

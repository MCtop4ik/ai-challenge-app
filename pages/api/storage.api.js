const StorageApi = {
    get(key) {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    },
  
    set(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    },
  
    remove(key) {
      localStorage.removeItem(key);
    },
  
    clear() {
      localStorage.clear();
    }
  };
  
  export default StorageApi;
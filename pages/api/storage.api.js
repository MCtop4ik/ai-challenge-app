const StorageApi = {
    get(key) {
        console.log(typeof window);
        if (typeof window == 'undefined') {
            return null;
        }
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
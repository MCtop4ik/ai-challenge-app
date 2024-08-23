import { openDB } from 'idb';

const DB_NAME = 'imageDB';
const STORE_NAME = 'images';
const DB_VERSION = 1;

class IDBApi {
    constructor() {
        if (typeof window !== 'undefined') {
            this.dbPromise = openDB(DB_NAME, DB_VERSION, {
                upgrade(db) {
                    if (!db.objectStoreNames.contains(STORE_NAME)) {
                        db.createObjectStore(STORE_NAME);
                    }
                },
            });
        }
    }

    async saveImage(base64Image, key = 'myImage') {
        const db = await this.dbPromise;
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        await store.put(base64Image, key);
        await tx.done;
    }

    async getImage(key = 'myImage') {
        const db = await this.dbPromise;
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const base64Image = await store.get(key);
        await tx.done;
        return base64Image;
    }

    async deleteImage(key = 'myImage') {
        const db = await this.dbPromise;
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        await store.delete(key);
        await tx.done;
    }

    async clearAll() {
        const db = await this.dbPromise;
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        await store.clear();
        await tx.done;
    }
}

export default new IDBApi();
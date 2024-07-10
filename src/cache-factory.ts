import {CacheAdd, CacheObject} from "./cache.interface";
import {CacheError} from "./errors";
import {Storage} from "./storage";

export class CacheFactory {
    cache: { [key: string]: CacheObject }
    private storage: Storage

    constructor(private fileName) {
        this.storage = new Storage(fileName)
    }

    async init(): Promise<void> {
        this.cache = await this.storage.getData()
        setInterval(() => {
            this.expirationCheck()
        }, 1000)
    }

    async add(newItem: CacheAdd): Promise<void> {
        const {key, ttl, ...item} = newItem

        if (this.cache[key]) throw new CacheError(`Add Error, Item with key: ${key} exists`)

        this.cache = {...this.cache, [key]: {...item, expiration: Date.now() + ttl * 1000}}
        await this.storage.add(newItem)
    }

    async delete(key: string): Promise<void> {
        if (!this.cache[key]) throw new CacheError(`Delete Error, Item with key: ${key} not exists`)

        delete this.cache[key]
        await this.storage.updateStorage(this.cache)
    }

    get(key: string): CacheObject | null {
        if (!this.cache[key]) throw new CacheError(`Get Error, Item with key: ${key} not exists`)

        return this.cache[key]
    }

    getAll() {
        return this.cache
    }

    private expirationCheck() {
        const currentTime = Date.now()
        let cacheChanged = false

        this.cache = Object.entries(this.cache).reduce((acc, [key, entry]) => {
            console.log(currentTime - entry.expiration)
            if (entry?.expiration && currentTime < entry.expiration)
                return {...acc, [key]: entry}
            cacheChanged = true
            return acc
        }, {})

        if (cacheChanged) this.storage.updateStorage(this.cache)
    }
}
export interface CacheAdd {
    key: string
    value: string
    ttl: number
}

export interface CacheObject {
    value: string
    expiration: number
}
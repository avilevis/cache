import {CacheFactory} from './src'

const cache = new CacheFactory('stg')

cache.init().then(() => {
    cache.add({key: "a", value: "qwer", ttl: 5})
    cache.add({key: "b", value: "qwer", ttl: 1})

    setInterval(()=>{
        console.log("cache:", cache.getAll())
    }, 500)

})


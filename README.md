# Implement Cache
simple cache implementation


```
import {CacheFactory} from './src'
```

#use
Create a cache ('stg.txt' is the file name that use as storage)
```
const cache = new CacheFactory('stg.txt')
```

Initial cache:
Use init function to initial the cache, this function return promise<void> 
```
cache.init()
```

Add item:
```
 cache.add({key: "a", value: "qwer", ttl: 5})
```
Delete item:
```cache.delete("a")```

Get cache item:
``` cache.get("a")```

Get cache list:
``` cache.getAll()```

## Cache new item
The added item need to be:

__type: CacheAdd__
```
{
    key: "the item key - unique",
    value: string, 
    ttl: number of seconds that the item will be valid
}
```

The item you read from cache:

__type: CacheObject__
```ejs
{
    "value": string,
    "expiration": number (expiration time)
}
```
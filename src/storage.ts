import {existsSync} from "fs";
import {readFile, writeFile} from "fs/promises";

export class Storage {
    constructor(private fileName) {
    }

    async getData() {
        const isExist = existsSync(this.fileName)
        if (!isExist) {
            await this.write()
            return {}
        }

        const storedBuffer = await readFile(this.fileName)
        return JSON.parse(storedBuffer.toString())
    }

    add(item) {
        return writeFile(this.fileName, JSON.stringify(item))
    }

    updateStorage(items) {
        return this.write(items)
    }

    private async write(items = {}) {
        console.log("write to storage", items)
        await writeFile(this.fileName, JSON.stringify(items), {flag: "w", encoding: 'utf8'})
    }
}
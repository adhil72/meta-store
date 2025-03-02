import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'

export class Database {
    path
    constructor(path) {
        this.path = path
        mkdirSync(path, { recursive: true })
    }

    save(key, data) {
        mkdirSync(this.path + '/' + key.replace(".", '/'), { recursive: true })
        writeFileSync(this.path + '/' + key.replace(".", '/') + '/data.json', JSON.stringify(data))
    }

    push(key, data) {
        const path = this.path + '/' + key.replace(".", '/')
        const filename = path + '/data.json'

        if (!existsSync(path)) {
            mkdirSync(path, { recursive: true })
            writeFileSync(filename, JSON.stringify([data]))
        } else {
            const currentData = JSON.parse(readFileSync(filename))
            currentData.push(data)
            writeFileSync(filename, JSON.stringify(currentData))
        }
    }

    set(key, data) {
        this.save(key, data)
    }

    get(key, fKey, fValue) {
        const path = this.path + '/' + key.replace(".", '/') + '/data.json'
        const data = JSON.parse(readFileSync(path, 'utf-8'))
        return fKey ? data.filter(d => d[fKey] === fValue) : data
    }
}
import {db} from './settings.js';

console.log(await db.server.info())

await db.index('token').create()
await db.index('attribute').create()
// console.log(await db.index('token').create())
// console.log(await db.index('token').info())

await db.optimize()

console.log(await db.document('00872156').kv('OPUS','bll'))
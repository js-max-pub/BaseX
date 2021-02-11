import {db} from './settings.js';

console.log(await db.server.info())

console.log(await db.index('token').create())
console.log(await db.index('token').info())


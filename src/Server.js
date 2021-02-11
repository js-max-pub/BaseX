// import XML from './xml.js';
import Base from './Base.js';
import Database from './Database.js';

export default class extends Base {
	#host
	#user
	#pass

	constructor(host) {
		super()
		this.#host = host;
	}
	user(user, pass) {
		this.#user = user;
		this.#pass = pass;
		return this;
	}

	database(name = '') {
		return new Database(this, name);
	}

	get URL() {
		return 'https://' + this.#host + '/rest/';
	}
	get auth() {
		return { Authorization: 'Basic ' + btoa(this.#user + ":" + this.#pass) }
	}

	databases(){
		return this.get()
	}


	// async info() {
	// 	let info = await this.load()
	// 	info = XML.parse(info);
	// 	// console.log(JSON.stringify(tmp,0,4))
	// 	return info[0].children.map(x => ({ name: x.children[0], size: x.attributes.size, count: x.attributes.resources }))
	// }
}

// function parseInfo(str) {
// 	let tmp = xml.parse(str);
// 	// console.log(JSON.stringify(tmp,0,4))
// 	return tmp[0].children.map(x => ({ name: x.children[0], size: x.attributes.size, count: x.attributes.resources }))
// 	// return tmp.databases["rest:database"].map(x => ({ name: x['#text'], size: x['@size'], count: x['@resources'] }))
// }
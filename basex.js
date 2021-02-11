import XML from './xml.js';


export default class {
	#host
	#user
	#pass
	#database = ''
	#document = ''
	constructor(host) {
		this.#host = host;
	}
	user(user, pass) {
		this.#user = user;
		this.#pass = pass;
		return this;
	}
	database(db = '') {
		this.#database = db;
		return this;
	}
	document(doc = '') {
		this.#document = doc;
		return this;
	}
	get baseURL() {
		return 'https://' + this.#host + '/rest/';
	}
	get URL() {
		return this.baseURL + '/' + this.#database + '/' + this.#document
	}
	get baseAuth() {
		return { Authorization: 'Basic ' + btoa(this.#user + ":" + this.#pass) }
	}
	get parent() {
		if (this.#document) this.#document = ''
		else this.#database = '';
		return this;
	}
	load(options = {}) {
		// options = {...}
		return fetch(this.URL, { headers: this.baseAuth }).then(x => x.text())
	}
	query(query = '') {
		// console.log('query',this.URL+url)
		return fetch(this.URL, { method: 'POST', headers: this.baseAuth, body: `<query><text><![CDATA[${query}]]></text></query>` }).then(x => x.text())
	}

	async info() {
		let info = await this.load()
		info = XML.parse(info);
		// console.log(JSON.stringify(tmp,0,4))
		return info[0].children.map(x => ({ name: x.children[0], size: x.attributes.size, count: x.attributes.resources }))
	}
}

function parseInfo(str) {
	let tmp = xml.parse(str);
	// console.log(JSON.stringify(tmp,0,4))
	return tmp[0].children.map(x => ({ name: x.children[0], size: x.attributes.size, count: x.attributes.resources }))
	// return tmp.databases["rest:database"].map(x => ({ name: x['#text'], size: x['@size'], count: x['@resources'] }))
}
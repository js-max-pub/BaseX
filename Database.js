import Base from './Base.js';
import Document from './Document.js';
import Index from './Index.js';

export default class extends Base {
	#name
	constructor(server, databaseName) {
		super()
		this.server = server
		this.#name = databaseName
	}
	get URL() {
		return this.server.URL + this.#name + '/';
	}
	get auth() {
		return this.server.auth;
	}
	async open() {
		// open existing or create... dont overwrite!
		await this.execute(`<check input='${this.#name}'/>`)
		return this;
	}
	async renameTo(name = '') {
		await this.execute(`<alter-db name='${this.#name}' newname='${name}'/>`)
		return this;
	}
	list() {
		return this.get();
	}
	copyTo(name = '') {
		// <copy name='...' newname='...'/>
	}
	drop() {
		// <drop-db name='...'/>
	}
	document(name = '') {
		return new Document(this, name)
	}

	index(type) {
		return new Index(this, type)
	}

	optimize(all = true) {
		//  <optimize/>
		// <optimize-all/> 
	}

}
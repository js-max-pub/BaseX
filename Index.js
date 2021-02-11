import Base from './Base.js';

export default class extends Base {
	#type  // text|attribute|token|fulltext
	constructor(database, indexType) {
		super()
		this.database = database
		this.#type = indexType
	}
	get URL(){
		return this.database.URL
	}
	get auth() {
		return this.database.auth;
	}
	async create() {
		return await this.execute(`<create-index type='${this.#type}'/>`);
		return this;
	}
	drop() {
		// <drop-index type='text|attribute|token|fulltext'/>
	}
	update() { }
	info() {
		return this.execute(`<info-index type='${this.#type}'/>`)
		// <info-index type='elemname|attrname|path|text|attribute|token|fulltext'/>
	}
}
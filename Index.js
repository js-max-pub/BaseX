import Base from './Base.js';

export default class extends Base {
	#type  // text|attribute|token|fulltext
	constructor(database, indexType) {
		this.database = database
		this.#type = indexType
	}
	get URL(){
		return this.database.URL
	}
	async create() {
		await this.command(`<create-index type='${this.#type}'/>`);
		return this;
	}
	drop() {
		// <drop-index type='text|attribute|token|fulltext'/>
	}
	update() { }
	info() {
		// <info-index type='elemname|attrname|path|text|attribute|token|fulltext'/>
	}
}
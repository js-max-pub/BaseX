import Base from './Base.js';

export default class extends Base {
	#name
	constructor(database, documentName) {
		super()
		this.database = database
		this.#name = documentName
	}
	get URL() {
		return this.database.URL + this.#name + '/';
	}
	get auth() {
		return this.database.auth;
	}
	kv(key, value) {
		return this.query(`//*[@${key}='${value}']`)
	}
	id(id) {
		return this.kv('id', id)
	}
	set(content=''){
		// <replace path='...'>[input]</replace>
	}
}
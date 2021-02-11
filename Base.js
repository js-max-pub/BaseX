export default class {
	get() {
		// options = {...}
		return fetch(this.URL, { headers: this.auth }).then(x => x.text())
	}
	post(content = '') {
		return fetch(this.URL, { method: 'POST', headers: this.auth, body: content }).then(x => x.text())

	}
	query(query = '') {
		// console.log('query',this.URL+url)
		return this.post(`<query><text><![CDATA[${query}]]></text></query>`)
		// return fetch(this.URL, { method: 'POST', headers: this.auth, body: `<query><text><![CDATA[${query}]]></text></query>` }).then(x => x.text())
	}

	execute(command = '') {
		// <commands><create-db name='db1'/><create-db name='db2'/></commands>
		return this.post(`<command>${command}</command>`)
		// return fetch(this.URL, { method: 'POST', headers: this.auth, body: `<command>${command}</command>` }).then(x => x.text())
	}
}
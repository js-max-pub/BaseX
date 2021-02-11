const __default = class {
    get() {
        return fetch(this.URL, {
            headers: this.auth
        }).then((x)=>x.text()
        );
    }
    post(content = '') {
        return fetch(this.URL, {
            method: 'POST',
            headers: this.auth,
            body: content
        }).then((x)=>x.text()
        );
    }
    query(query = '') {
        return this.post(`<query><text><![CDATA[${query}]]></text></query>`);
    }
    execute(command = '') {
        return this.post(`<commands>${command}</commands>`);
    }
};
const __default1 = class extends __default {
    #name;
    constructor(database, documentName){
        super();
        this.database = database;
        this.#name = documentName;
    }
    get URL() {
        return this.database.URL + this.#name + '/';
    }
    get auth() {
        return this.database.auth;
    }
    kv(key, value) {
        return this.query(`//*[@${key}='${value}']`);
    }
    id(id) {
        return this.kv('id', id);
    }
    set(content = '') {
    }
};
const __default2 = class extends __default {
    #type;
    constructor(database1, indexType){
        super();
        this.database = database1;
        this.#type = indexType;
    }
    get URL() {
        return this.database.URL;
    }
    get auth() {
        return this.database.auth;
    }
    async create() {
        return await this.execute(`<create-index type='${this.#type}'/>`);
        return this;
    }
    drop() {
    }
    update() {
    }
    info() {
        return this.execute(`<info-index type='${this.#type}'/>`);
    }
};
const __default3 = class extends __default {
    #name;
    constructor(server, databaseName){
        super();
        this.server = server;
        this.#name = databaseName;
    }
    get URL() {
        return this.server.URL + this.#name + '/';
    }
    get auth() {
        return this.server.auth;
    }
    async open() {
        await this.execute(`<check input='${this.#name}'/>`);
        return this;
    }
    async renameTo(name = '') {
        await this.execute(`<alter-db name='${this.#name}' newname='${name}'/>`);
        return this;
    }
    list() {
        return this.get();
    }
    copyTo(name = '') {
    }
    drop() {
    }
    document(name = '') {
        return new __default1(this, name);
    }
    index(type) {
        return new __default2(this, type);
    }
    async optimize(all = true) {
        if (all) await this.execute(`<optimize-all/> `);
        else await this.execute(`<optimize/> `);
        return this;
    }
};
const __default4 = class extends __default {
    #host;
    #user;
    #pass;
    constructor(host){
        super();
        this.#host = host;
    }
    user(user, pass) {
        this.#user = user;
        this.#pass = pass;
        return this;
    }
    database(name = '') {
        return new __default3(this, name);
    }
    get URL() {
        return 'https://' + this.#host + '/rest/';
    }
    get auth() {
        return {
            Authorization: 'Basic ' + btoa(this.#user + ":" + this.#pass)
        };
    }
    info() {
        return this.get();
    }
};
export { __default4 as BaseX };


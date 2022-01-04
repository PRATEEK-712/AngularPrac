export class UserAuth {
    private name: string = '';
    private email: string = '';
    private id: string = '';
    private token: string = null;


    constructor(name, email, id, _token) {
        this.email = email;
        this.id = id;
        this.name = name;
        this.token = _token;
    }

    get userToken() {
        return this.token;
    }
}
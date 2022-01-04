export class AppError {
    private _message: string;

    constructor(message) {
        this._message = message;
    }

    get message() {
        return this._message;
    }
}
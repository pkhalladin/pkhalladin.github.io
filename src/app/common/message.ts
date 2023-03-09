export class Message {
    text: string = '';
    type: string = 'info';
    constructor() {
    }

    public isPresent() : boolean {
        return this.text.length > 0;
    }

    public info(text: string) {
        this.text = text;
        this.type = 'info';
    }

    public warning(text: string) {
        this.text = text;
        this.type = 'warning';
    }

    public error(text: string) {
        this.text = text;
        this.type = 'error';
    }

    public toString() : string {
        return this.text;
    }
}
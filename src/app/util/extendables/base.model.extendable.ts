export abstract class BaseModel {
    constructor(params = {}) {
        this.data = params;
    };

    data = {}

    public get (propertyName: string): any {
        return this['data'][propertyName];
    }

    public set (propertyName: string, propertyValue: any): void {
        this['data'][propertyName] = propertyValue;
    }

    public toJSON (replacer: any = undefined, space: any = undefined): string {
        return JSON.stringify(this.data, replacer, space);
    }
}

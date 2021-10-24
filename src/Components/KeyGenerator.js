/**
 * Singleton Key Generator for react looping objects.
 */
class KeyGenerator{
    constructor() {
        this.key = 1000;
    }
    getUniqueKey(){
        this.key += 1;
        return this.key;
    }
}
export default (new KeyGenerator());

console.log(
    fn("hello").fn("world").fn("!!!").fn()
)
//Will print: hello world !!!
console.log(
    fn("This").fn("is").fn("just").fn("a").fn("test").fn()
)
//Will print: This is just a test

function fn (str) {
    /**
     * If we want to execute the function chain, we know that a 'fn' function as object have to return from the function call.
     * We also want to preserve the strings, so I created an object with 'str' member, and also fn function that as long as
     * the given argument is defined, I concatenate the given argument to the arguments chain.
     * I returned 'this' so we keep the same objet each call.
     */
    return {
        str : str || '' ,
        fn: function(str){
            if(str !== undefined) {
                this.str += ' ' + str;
                return this;
            }
            return this.str;
        },
    };
}

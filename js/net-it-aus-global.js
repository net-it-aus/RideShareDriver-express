// remove leading zeros from a number string START
    // This revised function checks if the input is a non-empty string
    // before attempting to remove leading zeros. If the input is not 
    // a string or is an empty string, it returns the input as a string
    // without any modification.
    function removeLeadingZeros(x){
        if (typeof x === 'string' && x.trim().length > 0) {
            return String(Number(x));
        }
        return x.toString();
    };
// remove leading zeros from a number string END
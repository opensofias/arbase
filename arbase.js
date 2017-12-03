(function (arbase) {
    function mod (a, b) {
        return ((a % b) + b) % b;
    }

    function div (a, b) {
        return Math.floor(a / b);
    }

    function divmod (a, b) {
        var obj = [div(a, b), mod(a, b)];
        obj.div = obj[0];
        obj.mod = obj[1];
        return obj;
    }

    function log (base, num) {
        return Math.log(num) / Math.log(base);
    }

    arbase.translationTable = {}; // default for translationTable option
    arbase.seperator = '.';       // default for seperator option
    arbase.ignore = [','];        // default for ignore option
    arbase.defaultBase = 10;      // default for base argument
    arbase.rangeCheck = false;    // default for rangeCheck option

    /* [ Generate translation table */
    var i = 0, a = 'a'.charCodeAt(0), z = 'z'.charCodeAt(0), delta = 'A'.charCodeAt(0) - a;

    for (i = 0; i < 10; i++) arbase.translationTable[i] = i;

    for (i = a; i <= z; i++) {
        arbase.translationTable[String.fromCharCode(i)] = i - a + 10;
        arbase.translationTable[i - a + 10] = String.fromCharCode(i);
        arbase.translationTable[String.fromCharCode(i + delta)] = i - a + 10;
        arbase.translationTable[i - a + 10] = String.fromCharCode(i + delta);
    }
    /* Generate translation table } */

    arbase.decode = function (numIn, base, opt) {
        if (!opt) opt = {};
        if (!base) base = arbase.defaultBase;
        var numOut = 0,
            length = numIn.length,
            rangeCheck      = opt['rangeCheck']       || arbase.rangeCheck,
            seperatorSymbol = opt['seperator']        || arbase.seperator,
            ignore          = opt['ignore']           || arbase.ignore,
            table           = opt['translationTable'] || arbase.translationTable;

        numIn = numIn.toString();

        var seperatorPos = numIn.indexOf(seperatorSymbol);

        if (seperatorPos < 0) seperatorPos = length;
        seperatorPos -= 1;
        numIn = numIn.replace(new RegExp('\\' + seperatorSymbol, 'g'), '');
        length = numIn.length;

        for (i = 0; i < length; i++) {
            if (rangeCheck && (table[numIn[i]] < 0 || (Math.abs(table[numIn[i]]) > Math.abs(base) - 1)))
                throw new Error('Arbase Error: ' + numIn[i] + ' out of range');
            numOut += table[numIn[i]] * (Math.pow(base, seperatorPos - i))
        }

        return numOut;
    };

    arbase.encode = function (num, base, opt) {
        if (!base) base = arbase.defaultBase;
        if (!opt) opt = {};

        function afterSeperator() {
            if (Math.abs(base) >= 1 && Math.abs(num) < 1)
                return true;
            else if (Math.abs(base) < 1 && Math.abs(num) > 1)
                return true;
            return false;
        }

        var numOut = '',
            seperatorSet = false,
            seperatorSymbol = opt['seperator']        || arbase.seperator,
            ignore          = opt['ignore']           || arbase.ignore,
            table           = opt['translationTable'] || arbase.translationTable,
            precision       = opt['precision']        || 0.00001;

        num = Number(num);

        var periodPrinted = false;
        var numberOfDigits = Math.ceil(log(base, num));

        while (num > precision || numberOfDigits > 0) {
            if (numberOfDigits <= 0 && !periodPrinted) {
                periodPrinted = true;
                numOut += seperatorSymbol;
            }
            var digitValue = Math.pow(base, numberOfDigits - 1);
            var div = divmod(num, digitValue);
            numOut += table[div.div];
            num = div.mod;
            --numberOfDigits;
        }

        return numOut;
    };
}(typeof module !== 'undefined' ? module.exports : (arbase = {})));

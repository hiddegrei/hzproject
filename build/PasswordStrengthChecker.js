export default class PasswordMeter {
    requirements;
    scoreRange;
    uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    numbers = '1234567890';
    constructor(requirements, scoreRange) {
        this.requirements = requirements;
        this.scoreRange = scoreRange;
    }
    startsWith(str, word) {
        return str.lastIndexOf(word, 0) === 0;
    }
    endsWith(str, word) {
        return str.indexOf(word, str.length - word.length) !== -1;
    }
    chunkString(str, len) {
        const _size = Math.ceil(str.length / len), _ret = new Array(_size);
        let _offset = 0;
        for (let _i = 0; _i < _size; _i++) {
            _offset = _i * len;
            _ret[_i] = str.substring(_offset, _offset + len);
        }
        return _ret;
    }
    getLength(text) {
        if (text) {
            return text.length;
        }
        return 0;
    }
    doesNotContains(text, list) {
        if (text) {
            if (list) {
                const doesnotContainsAll = list.every((x) => text.indexOf(x) == -1);
                return doesnotContainsAll;
            }
            else {
                return true;
            }
        }
        else {
            return true;
        }
    }
    contains(text, list) {
        if (text) {
            if (list) {
                const containsAll = list.every((x) => text.indexOf(x) >= 0);
                return containsAll;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    containsOne(text, list) {
        if (text) {
            if (list) {
                const contains = list.some((x) => text.indexOf(x) >= 0);
                return contains;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    isInBlackList(text, list) {
        if (text) {
            if (list) {
                for (let index = 0; index < list.length; index++) {
                    if (text === list[index]) {
                        return true;
                    }
                }
                return false;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    between(x, min, max) {
        return x >= min && x < max;
    }
    isIMessage(arg) {
        const status = arg.message !== undefined;
        return status;
    }
    isNumber(text) {
        if (text) {
            const pattern = /^\d+$/;
            return pattern.test(text);
        }
        return false;
    }
    isLetter(text) {
        if (text) {
            const pattern = /^[a-zA-Z]+$/;
            return pattern.test(text);
        }
        return false;
    }
    isUppercaseLetter(text) {
        if (text) {
            const pattern = /^[A-Z]+$/;
            return pattern.test(text);
        }
        return false;
    }
    isLowercaseLetter(text) {
        if (text) {
            const pattern = /^[a-z]+$/;
            return pattern.test(text);
        }
        return false;
    }
    isSymbol(text) {
        if (text) {
            return !this.isNumber(text) && !this.isLetter(text);
        }
        return false;
    }
    getSymbols(text) {
        let result = '';
        if (text) {
            for (let index = 0; index < text.length; index++) {
                if (this.isSymbol(text[index]))
                    result += text[index];
            }
        }
        if (result.length === 0)
            return undefined;
        return result;
    }
    getLengthScore(text) {
        if (text) {
            const ratio = 9;
            return this.getLength(text) * ratio;
        }
        return 0;
    }
    getUppercaseLettersScore(text) {
        if (text) {
            const ratio = 2;
            let n = 0;
            text.split('').forEach((value) => {
                if (this.isUppercaseLetter(value)) {
                    n++;
                }
            });
            if (n == 0) {
                return 0;
            }
            return (this.getLength(text) - n) * ratio;
        }
        return 0;
    }
    getLowercaseLettersScore(text) {
        if (text) {
            const ratio = 2;
            let n = 0;
            text.split('').forEach((value) => {
                if (this.isLowercaseLetter(value)) {
                    n++;
                }
            });
            if (n == 0) {
                return 0;
            }
            return (this.getLength(text) - n) * ratio;
        }
        return 0;
    }
    getNumbersScore(text) {
        if (text) {
            const ratio = 4;
            let n = 0;
            text.split('').forEach((value) => {
                if (this.isNumber(value)) {
                    n++;
                }
            });
            if (n == 0) {
                return 0;
            }
            return (this.getLength(text) - n) * ratio;
        }
        return 0;
    }
    getSymbolsScore(text) {
        if (text) {
            const ratio = 6;
            let n = 0;
            text.split('').forEach((value) => {
                if (this.isSymbol(value)) {
                    n++;
                }
            });
            if (n == 0) {
                return 0;
            }
            return (this.getLength(text) - n) * ratio;
        }
        return 0;
    }
    getLettersOnlyScore(text) {
        if (text) {
            const ratio = -1;
            if (this.isLetter(text)) {
                return this.getLength(text) * ratio;
            }
        }
        return 0;
    }
    getNumbersOnlyScore(text) {
        if (text) {
            const ratio = -1;
            if (this.isNumber(text)) {
                return this.getLength(text) * ratio;
            }
        }
        return 0;
    }
    getConsecutiveUppercaseLettersScore(text) {
        if (text) {
            const pattern = /[A-Z]+/g;
            const results = text.match(pattern);
            if (!results) {
                return 0;
            }
            let score = 0;
            const ratio = -2;
            results.forEach((value) => {
                if (this.getLength(value) > 1) {
                    score +=
                        (this.getLength(value) - 1) *
                            ratio;
                }
            });
            return score;
        }
        return 0;
    }
    getConsecutiveLowercaseLettersScore(text) {
        if (text) {
            const pattern = /[a-z]+/g;
            const results = text.match(pattern);
            if (!results) {
                return 0;
            }
            let score = 0;
            const ratio = -2;
            results.forEach((value) => {
                if (this.getLength(value) > 1) {
                    score +=
                        (this.getLength(value) - 1) *
                            ratio;
                }
            });
            return score;
        }
        return 0;
    }
    getConsecutiveNumbersScore(text) {
        if (text) {
            const pattern = /[0-9]+/g;
            const results = text.match(pattern);
            if (!results) {
                return 0;
            }
            let score = 0;
            const ratio = -2;
            results.forEach((value) => {
                if (this.getLength(value) > 1) {
                    score +=
                        (this.getLength(value) - 1) *
                            ratio;
                }
            });
            return score;
        }
        return 0;
    }
    reverseString(str) {
        return str.split('').reverse().join('');
    }
    sequentialBuilder(text, minChunk) {
        if (text) {
            const list = [];
            const len = text.split('').length - minChunk;
            for (let i = 0; i < len; i++) {
                for (let index = 0; index < len; index++) {
                    const newText = text.substring(index, text.length);
                    const arr = this.chunkString(newText, i + minChunk);
                    for (let j = 0; j < arr.length; j++) {
                        list.push(arr[j]);
                        list.push(this.reverseString(arr[j]));
                    }
                }
            }
            const result = this.distinctArray(this.sortByLength(list, minChunk));
            return result;
        }
        return [];
    }
    distinctArray(arr) {
        const a = [];
        for (let i = 0, l = arr.length; i < l; i++)
            if (a.indexOf(arr[i]) === -1 && arr[i] !== '')
                a.push(arr[i]);
        return a;
    }
    sortByLength(arr, limit) {
        arr.sort(function (a, b) {
            return b.length - a.length;
        });
        const list = [];
        for (let index = 0; index < arr.length; index++) {
            if (limit) {
                if (arr[index].length >= limit) {
                    list.push(arr[index]);
                }
            }
            else {
                list.push(arr[index]);
            }
        }
        return list;
    }
    getSequentialLettersScore(text) {
        const minChunk = 3;
        if (text) {
            const uStr = this.sequentialBuilder(this.uppercaseLetters, minChunk);
            const lStr = this.sequentialBuilder(this.lowercaseLetters, minChunk);
            let score = 0;
            let uTxt = text;
            let lTxt = text;
            uStr.forEach((value) => {
                if (uTxt.indexOf(value) != -1) {
                    score += value.length - (minChunk - 1);
                    uTxt = uTxt.replace(value, '');
                }
            });
            lStr.forEach((value) => {
                if (lTxt.indexOf(value) != -1) {
                    score += value.length - (minChunk - 1);
                    lTxt = lTxt.replace(value, '');
                }
            });
            const ratio = -3;
            return score * ratio;
        }
        return 0;
    }
    getSequentialNumbersScore(text) {
        const minChunk = 3;
        if (text) {
            const num = this.sequentialBuilder(this.numbers, minChunk);
            let score = 0;
            let txt = text;
            num.forEach((value) => {
                if (txt.indexOf(value) != -1) {
                    score += value.length - (minChunk - 1);
                    txt = txt.replace(value, '');
                }
            });
            const ratio = -3;
            return score * ratio;
        }
        return 0;
    }
    getSequentialSymbolsScore(text) {
        const minChunk = 3;
        const sym = this.getSymbols(text);
        if (text && sym) {
            const num = this.sequentialBuilder(sym, minChunk);
            let score = 0;
            let txt = text;
            num.forEach((value) => {
                if (txt.indexOf(value) != -1) {
                    score += value.length - (minChunk - 1);
                    txt = txt.replace(value, '');
                }
            });
            const ratio = -3;
            return score * ratio;
        }
        return 0;
    }
    getRepeatCharactersScore(text) {
        const pattern = /(.+)(?=.*?\1)/g;
        if (text) {
            const matches = text.match(pattern);
            if (!matches) {
                return 0;
            }
            const maxResultLength = this.sortByLength(matches)[0].length;
            let ratio = 0;
            if (maxResultLength >= 1 && maxResultLength <= 5)
                ratio = -8;
            if (maxResultLength >= 6 && maxResultLength <= 10)
                ratio = -5;
            if (maxResultLength >= 11)
                ratio = -2;
            const score = ratio * maxResultLength + (text.length - maxResultLength * 2);
            return score;
        }
        return 0;
    }
    getRequirementsScore(text, ignoreCase) {
        const req = this.requirements;
        const errors = [];
        if (req) {
            const minLengthMsg = 'The minimum password length is ' + req.minLength + '.';
            const maxLengthMsg = 'The maximum password length is ' + req.maxLength + '.';
            const uppercaseLettersMinLengthMsg = 'You must use at least ' + req.uppercaseLettersMinLength + ' uppercase letter(s).';
            const lowercaseLettersMinLengthMsg = 'You must use at least ' + req.lowercaseLettersMinLength + ' lowercase letter(s).';
            const numbersMinLengthMsg = 'You must use at least ' + req.numbersMinLength + ' number(s).';
            const symbolsMinLengthMsg = 'You must use at least ' + req.symbolsMinLength + ' symbol(s).';
            const includeMsg = 'The Password must include all the items specified.';
            const excludeMsg = 'The Password must exclude all the items specified.';
            const startsWithMsg = 'The password must start with ' + req.startsWith + '.';
            const endsWithMsg = 'The password must end with ' + req.endsWith + '.';
            const blackListMsg = 'Your password is in the blacklist.';
            const includeOneMsg = 'The Password must include at least one item specified [' + req.includeOne + '] .';
            const uniqueLettersMinLength = 'You must use at least ' + req.uniqueLettersMinLength + ' unique letter(s).';
            const upperCount = (text.match(/[A-Z]/g) || []).length;
            const lowerCount = (text.match(/[a-z]/g) || []).length;
            const numbersCount = (text.match(/[0-9]/g) || []).length;
            const symbolsCount = text.length - (upperCount + lowerCount + numbersCount);
            if (req.minLength) {
                let val;
                let msg = minLengthMsg;
                if (this.isIMessage(req.minLength)) {
                    val = req.minLength.value;
                    msg = req.minLength.message;
                }
                else {
                    val = req.minLength;
                }
                if (req.minLength && text.length < val) {
                    errors.push(msg);
                }
            }
            if (req.maxLength) {
                let val;
                let msg = maxLengthMsg;
                if (this.isIMessage(req.maxLength)) {
                    val = req.maxLength.value;
                    msg = req.maxLength.message;
                }
                else {
                    val = req.maxLength;
                }
                if (req.maxLength && text.length > val) {
                    errors.push(msg);
                }
            }
            if (req.startsWith) {
                let val;
                let msg = startsWithMsg;
                if (this.isIMessage(req.startsWith)) {
                    val = req.startsWith.value;
                    msg = req.startsWith.message;
                }
                else {
                    val = req.startsWith;
                }
                if (!this.startsWith(text, val)) {
                    errors.push(msg);
                }
            }
            if (req.endsWith) {
                let val;
                let msg = endsWithMsg;
                if (this.isIMessage(req.endsWith)) {
                    val = req.endsWith.value;
                    msg = req.endsWith.message;
                }
                else {
                    val = req.endsWith;
                }
                if (!this.endsWith(text, val)) {
                    errors.push(msg);
                }
            }
            if (req.uppercaseLettersMinLength) {
                let val;
                let msg = uppercaseLettersMinLengthMsg;
                if (this.isIMessage(req.uppercaseLettersMinLength)) {
                    val = req.uppercaseLettersMinLength.value;
                    msg = req.uppercaseLettersMinLength.message;
                }
                else {
                    val = req.uppercaseLettersMinLength;
                }
                if (val > upperCount) {
                    errors.push(msg);
                }
            }
            if (req.lowercaseLettersMinLength) {
                let val;
                let msg = lowercaseLettersMinLengthMsg;
                if (this.isIMessage(req.lowercaseLettersMinLength)) {
                    val = req.lowercaseLettersMinLength.value;
                    msg = req.lowercaseLettersMinLength.message;
                }
                else {
                    val = req.lowercaseLettersMinLength;
                }
                if (val > lowerCount) {
                    errors.push(msg);
                }
            }
            if (req.numbersMinLength) {
                let val;
                let msg = numbersMinLengthMsg;
                if (this.isIMessage(req.numbersMinLength)) {
                    val = req.numbersMinLength.value;
                    msg = req.numbersMinLength.message;
                }
                else {
                    val = req.numbersMinLength;
                }
                if (val > numbersCount) {
                    errors.push(msg);
                }
            }
            if (req.symbolsMinLength) {
                let val;
                let msg = symbolsMinLengthMsg;
                if (this.isIMessage(req.symbolsMinLength)) {
                    val = req.symbolsMinLength.value;
                    msg = req.symbolsMinLength.message;
                }
                else {
                    val = req.symbolsMinLength;
                }
                if (val > symbolsCount) {
                    errors.push(msg);
                }
            }
            if (req.uniqueLettersMinLength) {
                let val;
                let msg = uniqueLettersMinLength;
                if (this.isIMessage(req.uniqueLettersMinLength)) {
                    val = req.uniqueLettersMinLength.value;
                    msg = req.uniqueLettersMinLength.message;
                }
                else {
                    val = req.uniqueLettersMinLength;
                }
                const isValid = Array.from(new Set(text.split(''))).length >= val;
                if (req.uniqueLettersMinLength && !isValid) {
                    errors.push(msg);
                }
            }
            if (req.include) {
                let val;
                let msg = includeMsg;
                if (this.isIMessage(req.include)) {
                    val = req.include.value;
                    msg = req.include.message;
                }
                else {
                    val = req.include;
                }
                if (!this.contains(text, val)) {
                    errors.push(msg);
                }
            }
            if (req.exclude) {
                let txt = text;
                let val;
                let msg = excludeMsg;
                if (this.isIMessage(req.exclude)) {
                    val = req.exclude.value;
                    msg = req.exclude.message;
                }
                else {
                    val = req.exclude;
                }
                if (ignoreCase) {
                    txt = text.toLowerCase();
                    val = val.map((v) => v.toLowerCase());
                }
                if (!this.doesNotContains(txt, val)) {
                    errors.push(msg);
                }
            }
            if (req.blackList) {
                let txt = text;
                let val;
                let msg = blackListMsg;
                if (this.isIMessage(req.blackList)) {
                    val = req.blackList.value;
                    msg = req.blackList.message;
                }
                else {
                    val = req.blackList;
                }
                if (ignoreCase) {
                    txt = text.toLowerCase();
                    val = val.map((v) => v.toLowerCase());
                }
                if (this.isInBlackList(txt, val)) {
                    errors.push(msg);
                }
            }
            if (req.includeOne) {
                let txt = text;
                let val;
                let msg = includeOneMsg;
                if (this.isIMessage(req.includeOne)) {
                    val = req.includeOne.value;
                    msg = req.includeOne.message;
                }
                else {
                    val = req.includeOne;
                }
                if (ignoreCase) {
                    txt = text.toLowerCase();
                    val = val.map((v) => v.toLowerCase());
                }
                if (!this.containsOne(txt, val)) {
                    errors.push(msg);
                }
            }
            return errors;
        }
        return [];
    }
    getResults(passwords, ignoreCase = false, skipReq = false) {
        const results = [];
        if (passwords && passwords.length > 0) {
            for (let index = 0; index < passwords.length; index++) {
                results.push(this.getResult(passwords[index], ignoreCase, skipReq));
            }
            return results;
        }
        return [];
    }
    getResult(password, ignoreCase = false, skipReq = false) {
        if (password) {
            const req = this.getRequirementsScore(password, ignoreCase);
            if (!skipReq && req.length) {
                return {
                    score: -1,
                    status: 'needs requirement(s)',
                    errors: req,
                    percent: 0,
                };
            }
            const len = this.getLengthScore(password);
            const upper = this.getUppercaseLettersScore(password);
            const lower = this.getLowercaseLettersScore(password);
            const num = this.getNumbersScore(password);
            const symbol = this.getSymbolsScore(password);
            const letterOnly = this.getLettersOnlyScore(password);
            const numberOnly = this.getNumbersOnlyScore(password);
            const repetition = this.getRepeatCharactersScore(password);
            const consecutiveUpper = this.getConsecutiveUppercaseLettersScore(password);
            const consecutiveLower = this.getConsecutiveLowercaseLettersScore(password);
            const consecutiveNumber = this.getConsecutiveNumbersScore(password);
            const seqLetters = this.getSequentialLettersScore(password);
            const seqNumbers = this.getSequentialNumbersScore(password);
            const seqSymbols = this.getSequentialSymbolsScore(password);
            const score = len +
                upper +
                lower +
                num +
                symbol +
                letterOnly +
                numberOnly +
                repetition +
                consecutiveUpper +
                consecutiveLower +
                consecutiveNumber +
                seqLetters +
                seqNumbers +
                seqSymbols;
            const defaultRanges = {
                '40': 'veryWeak',
                '80': 'weak',
                '120': 'medium',
                '180': 'strong',
                '200': 'veryStrong',
                _: 'perfect',
            };
            let stat = '';
            if (!this.scoreRange) {
                this.scoreRange = defaultRanges;
            }
            const range = Object.keys(this.scoreRange).sort(function (a, b) {
                if (isNaN(a) || isNaN(b)) {
                    if (a > b)
                        return 1;
                    else
                        return -1;
                }
                return a - b;
            });
            if (range.length < 2) {
                return {
                    score: -2,
                    status: 'error',
                    errors: '"scoreRange" must have at least two members.',
                    percent: 0,
                };
            }
            for (let index = 0; index < range.length; index++) {
                const key = range[index];
                if (key != undefined) {
                    if (index == 0) {
                        if (this.between(score, 1, parseFloat(range[index]))) {
                            stat = this.scoreRange[range[0]];
                            break;
                        }
                    }
                    if (index === range.length - 1) {
                        if (range[index] == '_') {
                            if (this.between(score, parseFloat(range[index - 1]), 1000000000000000000)) {
                                stat = this.scoreRange[range[range.length - 1]];
                                break;
                            }
                        }
                        else {
                            return {
                                score: -2,
                                status: 'error',
                                errors: 'The last member of the "scoreRange" must be "_".',
                                percent: 0,
                            };
                        }
                    }
                    if (this.between(score, parseFloat(range[index - 1]), parseFloat(range[index]))) {
                        stat = this.scoreRange[range[index]];
                        break;
                    }
                }
            }
            const percent = (score * 100) / parseFloat(range[range.length - 2]);
            let data = {
                score: score,
                status: stat,
                percent: percent >= 100 ? 100 : percent,
            };
            if (skipReq) {
                data = Object.assign(data, { errors: req });
            }
            return data;
        }
        return {
            score: 0,
            status: 'Empty',
            percent: 0,
        };
    }
}
//# sourceMappingURL=PasswordStrengthChecker.js.map
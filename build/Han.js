export default class Han {
    static constrain(val, a, b) {
        if (val < a) {
            return a;
        }
        if (val > b) {
            return b;
        }
        return val;
    }
    constrain(val, a, b) {
        if (val < a) {
            return a;
        }
        if (val > b) {
            return b;
        }
        return val;
    }
    static map(n, start1, stop1, start2, stop2, withinBounds) {
        const newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
        if (!withinBounds) {
            return newval;
        }
        if (start2 < stop2) {
            return this.constrain(newval, start2, stop2);
        }
        return this.constrain(newval, stop2, start2);
    }
}
//# sourceMappingURL=Han.js.map
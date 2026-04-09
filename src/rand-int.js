export default function randInt(minIntIncluded, maxIntIncluded) {
    if (!Number.isInteger(minIntIncluded) || !Number.isInteger(maxIntIncluded)) {
        throw new TypeError(`Invalid argument error: both arguments has to be integer.`);
    }

    if (minIntIncluded > maxIntIncluded) {
        throw new TypeError(`Invalid argument error: minIntIncluded has to be less or equal to maxIntIncluded`);
    } else if (minIntIncluded === maxIntIncluded) {
        return minIntIncluded;
    }

    let mathR = Math.random();
    let decimalR = minIntIncluded + mathR * (maxIntIncluded - minIntIncluded);
    return Math.round(decimalR);
}
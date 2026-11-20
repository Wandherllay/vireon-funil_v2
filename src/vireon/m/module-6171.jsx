// @ts-nocheck
/* eslint-disable */
export function d(e) {
    let s = Number.isInteger(e) ? 0 : 2;
    return e.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: s,
        maximumFractionDigits: s
    });
}

var arbase = require("../arbase");

test("binary", function () {
    expect(arbase.decode("10", 2)).toBe(2);
    expect(arbase.decode("1010", 2)).toBe(10);
});

test("binary with decimal", function () {
    expect(arbase.decode("1010.101", 2)).toBe(10.625);
});

test("hex", function () {
    expect(arbase.decode("10", 16)).toBe(16);
    expect(arbase.decode("7D3", 16)).toBe(2003);
    expect(arbase.decode("DEADBEEF", 16)).toBe(3735928559);
});

test("negahex", function () {
    expect(arbase.decode("10", -16)).toBe(-16);
    expect(arbase.decode("7D3", -16)).toBe(1587);
    expect(arbase.decode("DEADBEEF", -16)).toBe(-3264455377);
});

test("base 1.5", function () {
    expect(arbase.decode("10", 1.5)).toBe(1.5);
    expect(arbase.decode("101", 1.5)).toBe(3.25);
});

test("values above base", function () {
    expect(arbase.decode("F", 10)).toBe(15);
    expect(function () {
        arbase.decode("F", 10, { rangeCheck: true })
    }).toThrow("Arbase Error: F out of range");
});

test("custom seperator", function () {
    expect(arbase.decode("10!3", 10, { seperator: "!" })).toBe(10.3);
});

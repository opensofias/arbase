var arbase = require("../arbase");

test("binary", function () {
    expect(arbase.encode(10, 2)).toBe("1010");
});

test("binary with decimal", function () {
    expect(arbase.encode(10.625, 2)).toBe("1010.101");
});

test("hex", function () {
    expect(arbase.encode(2003, 16)).toBe("7D3");
    expect(arbase.encode(3735928559, 16)).toBe("DEADBEEF");
});

test("custom seperator", function () {
    expect(arbase.encode(10.3, 10, { seperator: "!" })).toBe("10!3");
});

/* Not working

test("negahex", function () {
    expect(arbase.encode(-16, -16)).toBe("10");
    expect(arbase.encode(1587, -16)).toBe("7D3");
    expect(arbase.encode(-3264455377, -16)).toBe("DEADBEEF");
});

test("base 1.5", function () {
    expect(arbase.encode(1.5, 1.5)).toBe("10");
    expect(arbase.encode(3.5, 1.5)).toBe("101");
});
*/

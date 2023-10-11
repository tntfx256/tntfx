import { isValidFileName, parse } from "./path";

jest.mock("./utils/etc", () => ({
  generateId: jest.fn(() => "random-id"),
}));

describe("path", () => {
  it("should validate filename", () => {
    const testCases: Array<[string, boolean]> = [
      ["", false],
      [".", false],
      ["..", false],
      [".name", false],
      ["a.n.a.me", true],
      ["a./a.me", false],
      ["a+_-.txt", true],
      ["t", true],
    ];
    for (const [name, result] of testCases) {
      expect(isValidFileName(name)).toBe(result);
    }
  });
  it("should parse the path correctly", () => {
    expect(parse("/")).toEqual({ base: "/", dir: "/", ext: "", name: "/", path: "/" });
    expect(parse("//")).toEqual({ base: "/", dir: "/", ext: "", name: "/", path: "/" });
    expect(parse("dir")).toEqual({ base: "dir", dir: "", ext: "", name: "dir", path: "dir" });
    expect(parse("/dir")).toEqual({ base: "dir", dir: "/", ext: "", name: "dir", path: "/dir" });
    expect(parse("name.ext")).toEqual({ base: "name.ext", dir: "", ext: "ext", name: "name", path: "name.ext" });
    expect(parse("/name.ext")).toEqual({ base: "name.ext", dir: "/", ext: "ext", name: "name", path: "/name.ext" });
    expect(parse("dir/nest/name.ext")).toEqual({
      base: "name.ext",
      dir: "dir/nest",
      ext: "ext",
      name: "name",
      path: "dir/nest/name.ext",
    });
    expect(parse("/dir/nest/name.ext")).toEqual({
      base: "name.ext",
      dir: "/dir/nest",
      ext: "ext",
      name: "name",
      path: "/dir/nest/name.ext",
    });
    expect(parse("dir/nest/name")).toEqual({ base: "name", dir: "dir/nest", ext: "", name: "name", path: "dir/nest/name" });
    expect(parse("dir/nest/name/")).toEqual({ base: "name", dir: "dir/nest", ext: "", name: "name", path: "dir/nest/name" });
    expect(parse("/dir/nest/name")).toEqual({
      base: "name",
      dir: "/dir/nest",
      ext: "",
      name: "name",
      path: "/dir/nest/name",
    });
  });

  it("should parse the relative path correctly", () => {
    // expect(parse("/dir/../..")).toThrowError();
  });
});

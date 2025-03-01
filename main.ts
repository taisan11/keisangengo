import { inpOutputList, transformCode } from "./mod.ts";

// MOD
const kuro = 20;
const miritime = Date.now();

const oldCode = `
2/3
`;
console.log(inpOutputList(oldCode));
const newCode = transformCode(oldCode, { kuro, miritime }); // 変数のマップを渡す
const add = new Function(newCode);
console.log(add());

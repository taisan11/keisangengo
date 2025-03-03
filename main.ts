import { inpOutputList, transformCode } from "./mod.ts";

// MOD
const kuro = 20;
const miritime = Date.now();

const oldCode = `
let a = 1
a+1
`;
console.log(inpOutputList(oldCode));
const newCode = transformCode(oldCode, { kuro, miritime }); // 変数のマップを渡す
console.log(newCode);
const add = new Function(newCode);
console.log(add());

import { transformCode } from "./mod.ts";
import $ from "https://deno.land/x/dax@0.35.0/mod.ts";

// MOD
const kuro = 20;
const miritime = Date.now()

const oldCode = `
a = 1279828
a+60
`;
const newCode = transformCode(oldCode, { kuro,miritime },"add");  // 変数のマップを渡す
console.log(newCode);
const Code = newCode + "\nadd();";
// 実行
const result = eval(Code);
console.log(result);
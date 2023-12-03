const data = await Deno.readTextFile("./keisan.kei");
console.log(data);

import { transformCode } from "./mod.ts";

// MOD
const kuro = 20;

// const oldCode = `imp(kuro)\na=1+1\nb=2\nkuro+b`;
const newCode = transformCode(data, { kuro }); // 変数のマップを渡す
console.log(newCode);
const Code = newCode + "\nadd();";
// 実行
const result = eval(Code);
console.log(result);

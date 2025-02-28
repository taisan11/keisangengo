import { inpOutputList, transformCode } from "./mod.ts";
import {$}from "@david/dax"

// MOD
const kuro = 20;
const miritime = Date.now();

const oldCode = `
2/3
`;
console.log(inpOutputList(oldCode));
const newCode = transformCode(oldCode, { kuro, miritime }, "add"); // 変数のマップを渡す
console.log(newCode);
const Code = newCode + "\nconsole.log(add());";

// コードを一時ファイルに書き出す
await Deno.writeTextFile("./temp.js", Code);

// 新しいプロセスを作成してコードを実行
const p = new Deno.Command(Deno.execPath(),{
  args:["run", "--allow-read", "./temp.js"]
})
// 新しいプロセスの標準出力を取得
const { code, stdout, stderr } = await p.output();
// Uint8Arrayを文字列に変換
const outputStr = new TextDecoder().decode(stdout);

console.log(outputStr);

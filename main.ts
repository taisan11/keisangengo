import { inpOutputList, transformCode } from "./mod.ts";

// MOD
const kuro = 20;
const miritime = Date.now();

const oldCode = `
1+1
`;
console.log(inpOutputList(oldCode));
const newCode = transformCode(oldCode, { kuro, miritime }, "add"); // 変数のマップを渡す
console.log(newCode);
const Code = newCode + "\nconsole.log(add());";

// コードを一時ファイルに書き出す
await Deno.writeTextFile("./temp.js", Code);

// 新しいプロセスを作成してコードを実行
const p = Deno.run({
  cmd: ["deno", "run", "--allow-read", "./temp.js"],
  stdout: "piped",
});
// 新しいプロセスの標準出力を取得
const output = await p.output();

// Uint8Arrayを文字列に変換
const outputStr = new TextDecoder().decode(output);

console.log(outputStr);

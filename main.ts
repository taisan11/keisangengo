import { inpOutputList, transformCode } from "./mod.ts";

// MOD
const kuro = 20;
const miritime = Date.now();
const test = ()=>{console.log("test")};
function test2() {
  console.log("test2");
}

const oldCode = `
a = 5^5
imp(test2)()
a^2
`;
const inps = inpOutputList(oldCode);
const inpd:(string | number)[] | undefined = []
inps.forEach((inp) => {
  const response = prompt(inp);
  if (response !== null) {
    inpd.push(response);
  } else {
    console.log("ちゃんと入力しろ!!")
    Deno.exit(1);
  }
})
console.log(inpOutputList(oldCode));
const newCode = transformCode(oldCode, {mod:{ kuro, miritime,test,test2 },inpd}); // 変数のマップを渡す
console.log(newCode);
//ラッピングの処理
const consolelog = console.log;
console.log = (...args: unknown[]) => {consolelog("🏃Running:", ...args)};
//ここまで
const add = new Function(newCode);
console.log(add());

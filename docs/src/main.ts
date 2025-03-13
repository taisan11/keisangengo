import 'simpledotcss/simple.min.css';
import {inpOutputList, transformCode} from "@taisan11/keisangengo"

const code = document.getElementById("code") as HTMLTextAreaElement;
const inpdlist = document.getElementById("inpdlist") as HTMLDivElement;
const result = document.getElementById("result") as HTMLTextAreaElement;

code.addEventListener("input", () => {
  const inpdList = inpOutputList(code.value)
  if (inpdList.length > 0) {
    inpdlist.innerHTML = "<h3>入力</h3>"
    inpdList.forEach((inpd) => {
      inpdlist.innerHTML += `<input type="text" name="${inpd}" id="${inpd}" placeholder="${inpd}">`
    })
  } else {
    inpdlist.innerHTML = ""
  }
})

document.getElementById("run")!.addEventListener("click", () => {
  result.value = ""
  const inpdList = inpOutputList(code.value)
  const inpdValues: (string | number)[] = []
  inpdList?.forEach((inpdItem) => {
    inpdValues.push((document.getElementById(inpdItem) as HTMLInputElement)!.value as string | number)
  })
  const newCode = transformCode(code.value, { inpd: inpdValues })
  //ラッピング
  const consolelog = console.log;
  console.log = (...args: unknown[]) => { result.value += args.join(" ") + "\n" };
  //ここまで
  const add = new Function(newCode);
  console.log(add());
  //解除
  console.log = consolelog;
})
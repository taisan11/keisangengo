import { Siki } from "./SikiPurse.ts";
/**
 * JSorTS2Homebrew language
 * @param code Conversion source code.
 * @param vars Variable map for MOD system.
 * @param name function name.
 * @pram inpd Array for inp()..
 * @example const newCode = transformCode(oldCode, { kuro,miritime },"add");
 * const result = eval(Code);
 * console.log(result);
 * @returns Simple JScode.
 */
export function transformCode(
  code: string,
  // deno-lint-ignore no-explicit-any
  vars: Record<string, any>,
  name?: string,
  inpd?: string[],
): string {
  // コードを行に分割
  const lines = code.split("\n").filter((line) => line.trim() != "");
  // 新しいコードを生成するための配列
  const newCode = [];
  let inpCount = 0; // inp()の出現回数を数える変数

  // 各行を解析
  for (const line of lines) {
    // 変数定義の行を解析
    const varDefMatch = line.match(/^(\w+)\s*=\s*(.+)$/);
    if (varDefMatch) {
      const 変数の値 = varDefMatch[2];
      // もし変数の値がinp(質問内容)だったら、入力を求める
      //inpMatchは質問文も含まれる。
      const inpMatch = 変数の値.match(/^inp\((.+)\)$/);
      if (inpMatch) {
        if (inpd && inpd.length > inpCount) {
          // inpdが存在し、まだ使用されていない値がある場合、その値を直接代入
          varDefMatch[2] = inpd[inpCount];
        } else {
          // プロンプトのハードコードをやめてエラーを返す。
          return `Error: inp() requires input prompt "${inpMatch[1]}"`;
        }
        inpCount++; // inp()の出現回数を増やす
      }
      newCode.push(`let ${varDefMatch[1]} = ${varDefMatch[2]}`);
      continue;
    }

    // モジュールインポートの行を解析
    const impMatch = line.match(/^imp\((\w+)\)$/);
    if (impMatch) {
      const varName = impMatch[1];
      if (varName in vars) {
        newCode.push(`let ${varName} = ${vars[varName]};`);
      } else {
        return `Error: Variable "${varName}" not found`;
      }
      continue;
    }

    // 計算式の行を解析
    const sikiResult = Siki(line);
    if (sikiResult != "No Siki") {
      newCode.push(`return ${sikiResult}`);
      continue;
    }

    if (!line) {
      continue;
    }

    // 一致しない行はエラーメッセージを返す
    newCode.push(`console.log('Error: Invalid line "${line}"')`);
  }
  if (!name) {
    return newCode.join(";\n") + ";";
  }
  // 新しいコードを生成
  return `function ${name}() {\n  ${newCode.join(";\n  ")}\n}`;
}

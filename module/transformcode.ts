import { Siki } from "./SikiPurse.ts";

export interface Options {
  // deno-lint-ignore ban-types
  mod?: Record<string, Function | number>;
  name?: string;
  inpd?: (string|number)[];
}

function be(ms:string) {
  return `console.error('%c${ms}','color:red;')`;
}

/**
 * JSorTS2Homebrew language
 * @param code Conversion source code.
 * @param mod Variable map for MOD system.
 * @param name function name.
 * @pram inpd Array for inp()..
 * @example const newCode = transformCode(oldCode, { kuro,miritime },"add");
 * const result = eval(Code);
 * console.log(result);
 * @returns Simple JScode.
 */
export function transformCode(
  code: string,
  { mod, name, inpd }: Options,
): string {
  // コードを行に分割
  const lines = code.split("\n").filter((line) => line.trim() != "");
  // 新しいコードを生成するための配列
  const newCode = [];
  let inpCount = 0; // inp()の出現回数を数える変数

  // 各行を解析
  for (const line of lines) {
    // コメント行を無視
    if (line.startsWith("//")) {
      continue;
    }
    if (!line) {
      continue;
    }
    // 変数定義の行を解析
    const varDefMatch = line.match(/^(\w+)\s*=\s*(.+)$/);
    if (varDefMatch) {
      const 変数の値 = varDefMatch[2];
      // もし変数の値がinp(質問内容)だったら、入力を求める
      //inpMatchは質問文も含まれる。
      const inpMatch = 変数の値.match(/^inp\((.+)\)$/);
      if (inpMatch) {
        inpCount++;
        if (inpd && inpd.length > inpCount) {
          // inpdが存在し、まだ使用されていない値がある場合、その値を直接代入
          newCode.push(`let ${varDefMatch[1]} = ${inpd[inpCount]}`);
          continue;
        } else {
          // プロンプトのハードコードをやめてエラーを返す。
          newCode.push(be(`Error: inp() requires input "${inpMatch[1]}"`));
          continue;
        }
      }
      newCode.push(`let ${varDefMatch[1]} = ${Siki(varDefMatch[2])}`);
      continue;
    }

    // モジュールインポートの行を解析
    const impMatch = line.match(/^imp\((\w+)\)\((.*)\)$/);
    if (impMatch) {
      if (!mod) {
        newCode.push(be("Error: Module not found"));
        continue;
      }
      const varName = impMatch[1];
      if (varName in mod) {
        const modType = typeof mod[varName];
        //関数の場合は読み込んだ場所で実行する制約を持つ
        if (modType == "function" && impMatch[2] != null) {
          newCode.push(`${mod[varName].toString()}`);
          newCode.push(`${varName}(${impMatch[2]})`);
          continue;
        } else if (modType == "function") {
          newCode.push(be('Error: Function requires arguments'));
          continue;
        }
        newCode.push(`let ${varName} = ${mod[varName]};`);
      } else {
        newCode.push(be(`Error: Module "${varName}" not found`));
      }
      continue;
    }

    // 計算式の行を解析
    const sikiResult = Siki(line);
    if (sikiResult != "No Siki") {
      newCode.push(`return ${sikiResult}`);
      continue;
    }

    // 一致しない行はエラーメッセージを返す
    newCode.push(be('Error: Invalid line "${line}"'))
  }
  if (!name) {
    return newCode.join(";\n") + ";";
  }
  // 新しいコードを生成
  return `function ${name}() {\n  ${newCode.join(";\n  ")}\n}`;
}

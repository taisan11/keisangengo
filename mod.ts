/**
 * 自作言語2JSorTS
 * @param code 変換元のコード.
 * @param vars MODシステム用変数マップ.
 * @param name 関数名.
 * @example const newCode = transformCode(oldCode, { kuro,miritime },"add");
 * const result = eval(Code);
 * console.log(result);
 * @returns シンプルなJScode.
 */
export function transformCode(code: string, vars: Record<string, any>,name: string): string {
  // コードを行に分割
  const lines = code.split('\n');

  // 新しいコードを生成するための配列
  const newCode = [];

  // 各行を解析
  for (const line of lines) {
    // 変数定義の行を解析
    const varDefMatch = line.match(/^(\w+)\s*=\s*(.+)$/);
    if (varDefMatch) {
      newCode.push(`let ${varDefMatch[1]} = ${varDefMatch[2]};`);
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
    const calcMatch = line.match(/^(.+)$/);
    if (calcMatch) {
      newCode.push(`return ${calcMatch[1]};`);
      continue;
    }

    // 一致しない行はエラーメッセージを返す
    // return `Error: Invalid line "${line}"`;
  }

  // 新しいコードを生成
  return `function ${name}() {\n  ${newCode.join('\n  ')}\n}`;
}
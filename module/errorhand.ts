/**
 * 自作言語のerror解析
 * @param code 解析元のコード.
 * @param vars MODシステム用変数マップ.
 * @param name 関数名.
 * @example const newCode = transformCode(oldCode, { kuro,miritime },"add");
 * const result = eval(Code);
 * console.log(result);
 * @returns シンプルなJScode.
 */
function isFullWidthNumber(str: string) {
  return /^[０-９]+$/.test(str);
}
export function errorhand(
  code: string,
  vars: Record<string, any>,
  name: string,
): string {
  // コードを行に分割
  const lines = code.split("\n");

  // 新しいコードを生成するための配列
  const newCode = [];

  // 各行を解析
  for (const line of lines) {
    // 変数定義の行を解析
    const varDefMatch = line.match(/^(\w+)\s*=\s*(.+)$/);
    if (varDefMatch) {
      if (isFullWidthNumber(varDefMatch[1])) {
        return `Error: Variable "${varDefMatch[1]}" is FullWidthNumber`;
      }
      continue;
    }else{
      return `Error: Variable "${varDefMatch[1]}" not found`;
    }
  }
}

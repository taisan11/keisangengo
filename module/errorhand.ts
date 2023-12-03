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
export function errorhand(code: string, vars: Record<string, any>,name: string): string {
    // コードを行に分割
    const lines = code.split('\n');
  
    // 新しいコードを生成するための配列
    const newCode = [];
  
    // 各行を解析
    for (const line of lines) {
        
  }
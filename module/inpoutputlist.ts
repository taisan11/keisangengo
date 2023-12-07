/**
 * Output an array of inp elements of homemade language
 * @param code source code.
 * @example console.loh(inpOutputList(code));
 * @returns Simple Array.
 */
export function inpOutputList(
  code: string,
): string {
  // コードを行に分割
  const lines = code.split("\n");

  // inp()を含むすべてのマッチを見つけるための正規表現
  const regex = /inp\((.*?)\)/g;

  // inp()の引数を保存するための配列
  const inpArgs = [];

  // 各行をループ
  for (const line of lines) {
    // 行に対して正規表現を使用してマッチングを行う
    let match;
    while ((match = regex.exec(line)) !== null) {
      // マッチした結果を配列に追加
      inpArgs.push(match[1]);
    }
  }

  console.log(inpArgs);
  return "inpArgs";
}

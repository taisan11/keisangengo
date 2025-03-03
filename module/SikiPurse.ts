//高度な式の構築をサポートする。
const em:string = "No Siki";
export function Siki(siki: string) {
    siki = siki.replace(/[\s\n]/g, "");
    siki = siki.replaceAll("^", "**").replaceAll("{", "(").replaceAll("}", ")");
    return siki;
    return em;
}
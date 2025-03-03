//高度な式の構築をサポートする。
const em:string = "No Siki";
export function Siki(siki: string,nowOneMoj?: string[]): string {
    siki = siki.replace(/[\s\n]/g, "");
    siki = siki.replaceAll("^", "**").replaceAll("{", "(").replaceAll("}", ")");
    for (const key in varNameSpace) {
        siki = siki.replaceAll(key, varNameSpace[key].toString());
    }
    return siki;
    return em;
}

const varNameSpace: { [key: string]: number } = {
    "e": Math.E,
    "pi": Math.PI,
    "π": Math.PI
}
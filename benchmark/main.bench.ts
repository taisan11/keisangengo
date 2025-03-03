import {transformCode} from "../mod.ts"

Deno.bench("例",()=>{
    transformCode(`
a = 1
b = 2
c = a + b
c*4
        `,{})
})
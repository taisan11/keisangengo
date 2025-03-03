import {assertEquals } from "jsr:@std/assert"
import {transformCode} from "../mod.ts"

// 管理方法
// wipは未完成なのでコメントアウトしてください。

Deno.test("計算",()=>{
    const code = "1+2"
    const result = new Function(transformCode(code,{}))()
    assertEquals(result,3)
})

Deno.test("無限小数",()=>{
    const code = "3/2"
    const result = new Function(transformCode(code,{}))()
    assertEquals(result,3/2)
})

Deno.test("ネイピア数",()=>{
    const code = "e"
    const result = new Function(transformCode(code,{}))()
    assertEquals(result,Math.E)
})

Deno.test("円周率",async(t)=>{
    await t.step("en",()=>{
        const code = "pi"
        const result = new Function(transformCode(code,{}))()
        assertEquals(result,Math.PI)
    })
    await t.step("記号",()=>{
        const code = "π"
        const result = new Function(transformCode(code,{}))()
        assertEquals(result,Math.PI)
    })
})

Deno.test("変数",()=>{
    const code = "a=3\na+5"
    const result = new Function(transformCode(code,{}))()
    assertEquals(result,8)
})

// Deno.test("wip:一文字変数",()=>{
//     const code = "a=3\n5a"
//     const result = new Function(transformCode(code,{}))()
//     assertEquals(result,15)
// })
# Keisangengo

計算をするためだけにAIと一緒に開発した言語 仕様はわかるけど正規表現が何とも...
## 使い方
transformCode(code,vars,name,inpd)
code -変換元コード(1+1)
vars -MODマップ({kuro,sx....})
name -出力される関数の名前(add)
inpd? -inp()の代入([1,3,1])
inpOutputList()
code -変換元コード(inp(あれ>))
## 実装予定機能

- inp()のみの事前出力 配列での出力
- inp()の外部変数受け渡し 配列での入力 inp()が複数ある場合上から

## 仕様

**四則演算**<br> +,-,*,/<br> 普通<br> **変数**<br> a=100<br>
変数定義しなくていい constとか letとか...<br> **import**<br> imp(MOD名)<br>
コンパイラ、実行コード内に定義されてる変数とかを取り込みます<br> **input**<br>
inp(質問>)<br> 外部からの入力を受け付けます<br>

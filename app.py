#-*-coding:utf-8 -*-

from flask import Flask, render_template
app=Flask(__name__) #__name__代表目前執行的模組

@app.route("/") #函式的裝飾
def index():
    return render_template("index.html")

if __name__=="__main__": #如果以主程式執行
    app.run(host='0.0.0.0', port=80, debug=False) #立刻啟動伺服器

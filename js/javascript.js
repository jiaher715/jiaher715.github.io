var str;

// 先將 id=demo的内容讀出來
str = document.getElementById('demo').innerHTML

// 將str後面加上'demo'放回id=demo的内容
document.getElementById('demo').innerHTML = str + 'demo'
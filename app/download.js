const request = require('request');
const fs = require('fs');

let list = process.argv.slice(2);

for (let i=0;i<list.length;i++) {
    
    let vid = list[i].slice('https://v.qq.com/x/page/'.length,-'.html'.length);
    console.log(vid);
    const url = `http://vv.video.qq.com/getinfo?vids=${vid}&platform=101001&charge=0&otype=json&defn=shd`;
    console.log('正在获取数据----URL=' + url + "----");
    request(url, function (error, res, body) {
        let data = body.slice('QZOutputJson='.length,-1)
        console.log('数据为--'+data+"--");
        let json = JSON.parse(data);
        let url = json['vl']['vi'][0]['ul']['ui'][0]['url']
            +json['vl']['vi'][0]['fn']
            +"?vkey="
            +json['vl']['vi'][0]['fvkey'];
        let filename = json['vl']['vi'][0]['ti']+"."+json['fl']['fi'][1]['name'];
        downloadFile(url,filename,function(){
            console.log(filename+'--下载完毕');
        });
    });
}

function downloadFile(uri,filename,callback){
    let stream = fs.createWriteStream(filename);
    request(uri).pipe(stream).on('close', callback);
}
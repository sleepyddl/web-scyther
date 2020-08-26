const express = require('express')
const fs = require('fs')
const cors = require('cors')
var bodyParser = require('body-parser');  //解析,用req.body获取post参数
const { exec } = require('child_process');

const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));





app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.get('/scyther/protocols', (req, res) => {
  let protocol = req.query.value
  fs.readFile(`Protocols/${protocol}.spdl`, function (err, ress) {
    res.json({ "protocol": ress.toString() })
  })

});


app.post("/scyther/result", (req, res) => {
  let result = {}
  let data = req.body.input
  let mark = req.body.mark
  let filename = './test/' + mark + '/protocol.spdl'
  let dotname = "./test/" + mark + "/attacks.dot"

  fs.mkdir('./test/' + mark, function (err) {
    if (!err) {
      try {
        fs.writeFile(filename, data, function (err) {
          if (!err) {
            let cmd1 = "./scyther-linux --dot-output --output=" + dotname + " " + filename
            exec(cmd1, (error, stdout, stderr) => {
              exec("dot -Tpng -O " + dotname)
              result = { "result": stderr }    //为何会产生err呢？？？？？
              res.json(result)
            })
          }
        })
      } catch (error) {
        result = { "result": "err:input error" }
        res.json(result)
      }
    }
  })
})



app.get("/scyther/charts", (req, res) => {
  let mark = req.query.mark
  let num = req.query.number
  let nth = req.query.nth


  let arr = []
  let picture = ""
  while (num != 0) {
    if (nth == 1) {
      picture = "./test/" + mark + "/attacks.dot.png"
    } else {
      picture = "./test/" + mark + "/attacks.dot." + nth + ".png"
    }
    let data=fs.readFileSync(picture,"base64")
    arr.push(data)
    num--
    nth++
  }
  res.json({"picture":arr})
})


app.listen(8081, () => {
  console.log('127.0.0.1:8081');
});

import React from "react";
import axios from "axios";

let key = 0;
function id() {
  return String(++key);
}

function autoTextAreaHeight() {
  let o = document.querySelector("textarea");
  let value = o.value;
  let rowsCount = value.split("\n").length;
  if (rowsCount >= 21) {
    o.setAttribute("rows", rowsCount + 2);
  }
}

class Codewrap extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let box = document.querySelector("textarea");

    // (1)需要解决一旦拖拽外部文件就覆盖掉当前页面的问题
    //  解决：给document绑定drop事件
    //  drop事件默认触发不了，需要在dragover事件里面阻止默认事件
    document.ondrop = function (e) {
      e.preventDefault();
    };
    // 这个阻止默认事件是为了让drop事件得以触发
    document.ondragover = function (e) {
      e.preventDefault();
    };

    box.ondragenter = function () {
      // box.style.boxShadow = "0 0 1px";
    };
    box.ondrop = (e) => {
      // console.log(e);
      // 得到拖拽过来的文件
      let dataFile = e.dataTransfer.files[0];
      // FileReader实例化
      let dot = dataFile.name.lastIndexOf(".");
      let suffix = dataFile.name.substring(dot);
      if (suffix !== ".txt" && suffix !== ".spdl") {
        window.alert("文件格式错误");
        return null;
      }
      let fr = new FileReader();
      // 异步读取文件
      fr.readAsText(dataFile);
      // 读取完毕之后执行
      fr.onload = () => {
        // 获取得到的结果
        let data = fr.result;
        box.value = data;
        autoTextAreaHeight();
        this.props.changeInput(data);
      };
    };
  }

  render() {
    return (
      <div className="code_wrap">
        <div>请输入协议描述:</div>
        <textarea
          placeholder="支持.txt或.spdl文件拖拽至框内"
          value={this.props.input}
          onChange={(e) => {
            autoTextAreaHeight();
            this.props.changeInput(e.target.value);
          }}
          rows="23"
        />
      </div>
    );
  }
}

//Select组件
class Select extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "点击选择协议",
    };
    this.changeSelect = this.changeSelect.bind(this);
  }

  changeSelect(e) {
    let value = e.target.value;
    this.setState({ selected: value });
    if (value === "点击选择协议") {
    } else {
      axios.get(`http://192.168.2.130/protocols/${value}`).then(
        (res) => {
          let protocol = JSON.parse(res.data)["protocol"];
          document.querySelector("textarea").value = protocol;
          autoTextAreaHeight();
          this.props.changeInput(protocol);
        },
        (err) => {
          window.alert(`请求失败，err：${err}`);
        }
      );
    }
  }
  render() {
    let arr = [
      "点击选择协议",
      "ns3",
      "nsl3",
      "nsl3-broken",
      "tmn",
      "wmf",
      "needham-schroeder-sk",
      "needham-schroeder-lowe",
    ];

    return (
      <div className="select">
        经典安全协议选择：
        <select value={this.state.selected} onChange={this.changeSelect}>
          {arr.map((item) => {
            return <option key={id()}>{item}</option>;
          })}
        </select>
      </div>
    );
  }
}

export { Codewrap, Select };

import React from "react";
import axios from "axios";
import { mark } from "./Runbtn.js";

let key = 0;
function id() {
  return String(++key);
}

function attackChart(property, number, nth) {
  axios.get(`http://192.168.2.130/charts/${mark}/${number}/${nth}`).then(
    (res) => {
      let base = JSON.parse(res.data)["picture"];
      base.forEach((item, index) => {
        const img = new Image();

        img.src = "data:image/png;base64," + item;
        img.style.display = "block";
        img.style.margin = "0 auto";
        img.style.height = "700px";
        let newwindow = window.open();
        newwindow.document.write(img.outerHTML);
        newwindow.document.title = `${property}的第${index + 1}张攻击图`;
        newwindow.document.close();
      });
    },
    (err) => {
      console.log(err);
    }
  );
}

function Protocol(props) {
  return (
    <div>
      <p>协议名称：{props.protocol.name}</p>
      {props.protocol.roles.map((role) => {
        return <Role key={id()} role={role} />;
      })}
    </div>
  );
}

function Role(props) {
  return (
    <div>
      角色：{props.role.roleName}
      <ul>
        <span>声明(claim)</span>
        <span>状态</span>
        <span>信息</span>
        {props.role.claims.map((claim) => {
          return <Claim key={id()} claim={claim} />;
        })}
      </ul>
    </div>
  );
}

function Claim(props) {
  let claim = props.claim;
  return (
    <li>
      <span>{claim.property}</span>
      <span>{claim.turnout}</span>
      <span>
        {claim.turnout === "成功" ? (
          claim.state
        ) : (
          <button
            onClick={() =>
              attackChart(claim.property, claim.number, claim.nth_of_attack)
            }
          >
            {claim.state}
          </button>
        )}
      </span>
    </li>
  );
}

export default function Resultwrap(props) {
  let result_wrap = (
    <div className="result_wrap">
      <div>运行结果:</div>
      <div className="warp">
        {props.protocols.map((protocol) => {
          return <Protocol key={id()} protocol={protocol} />;
        })}
      </div>
    </div>
  );

  return result_wrap;
}

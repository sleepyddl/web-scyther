import React from "react";
import axios from "axios";

import serve from "./api"

let mark = "";
function handleRun(props) {
  mark = Math.random().toString().substr(3, 17) + new Date().getTime();
  let data_input = {
    input: props.input,
    mark,
  };
  if (data_input.input.replace(/\s*/g, "") === "") {
    window.alert("请正确输入协议描述");
    return null;
  }
  axios.post(serve + "/result/", data_input).then(
    (res) => {
      const data = res.data.result;
      if (data.substring(0, 5) === "error") {
        window.alert(data);
        return null;
      }
      analyseReturn(data, props);
    },
    (err) => {
      window.alert(`err:${err}`);
    }
  );
}

function analyseReturn(res, props) {
  let arr = res.split("\n");
  let protocols = [];
  let counter = 1;
  arr.forEach((element) => {
    if (element.trim() !== "") {
      //遍历claim
      //claim	(ns3),(I)	(Secret)_(I2)	(ni)	(Ok)	([proof of correctness])
      let matchelem = element.match(
        /claim\t(.+),(.+)\t(.+)_(.+)\t(.+)\t(.+)\t(.+)/
      );
      let protocolname = matchelem[1];
      matchelem[5] = matchelem[5] === "-" ? "" : matchelem[5];
      let rolename = matchelem[2];
      let claim = {
        property: `${matchelem[3]} ${matchelem[5]}`,
        turnout: matchelem[6]
          .replace(/\u001b\[32mOk\u001b\[0m/g, "成功")
          .replace(/\u001b\[31mFail\u001b\[0m/g, "失败"),
        state: matchelem[7]
          .replace(/\[no attack within bounds\]/, "界限内没有攻击")
          .replace(/\[proof of correctness\]/, "正确性证明")

          .replace(
            /\[at least (\d+) attack(s)?\]/,
            (v, p1) => `至少存在 ${p1} 个攻击`
          )

          .replace(
            /\[exactly (\d+) attack(s)?\]/,
            (v, p1) => `存在 ${p1} 个攻击`
          ),

        number:
          matchelem[7].match(/\d+/) == null ? 0 : +matchelem[7].match(/\d+/)[0],
        nth_of_attack: counter,
      };
      counter += claim.number;
      if (protocols.find((protocol) => protocol.name === protocolname)) {
        protocols.forEach((protocol) => {
          if (protocol.name === protocolname) {
            if (protocol.roles.find((role) => role.roleName === rolename)) {
              protocol.roles.forEach((role) => {
                if (role.roleName === rolename) {
                  role.claims.push(claim);
                }
              });
            } else {
              protocol.roles.push({
                roleName: rolename,
                claims: [claim],
              });
            }
          }
        });
      } else {
        protocols.push({
          name: protocolname,
          roles: [
            {
              roleName: rolename,
              claims: [claim],
            },
          ],
        });
      }
    }
  });
  props.changeProtocols(protocols);
  document.querySelector(".warp").style.display = "block";
}

export { mark };
export default function Runbtn(props) {
  return <button onClick={() => handleRun(props)}>运行</button>;
}

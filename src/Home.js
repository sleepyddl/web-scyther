import React from "react";
import "./index.css";
import { Codewrap, Select } from "./Codewrap.js";
import Resultwrap from "./Resultwrap.js";
import Runbtn from "./Runbtn.js";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            protocols: [
                {
                    name: "",
                    roles: [
                        {
                            roleName: "",
                            claims: [
                                {
                                    property: "",

                                    turnout: "",
                                    // Ok  Fail
                                    state: "",
                                    // attack那句话
                                    number: 0,
                                    // 包含几个攻击图
                                    nth_of_attack: 0,
                                    // 第几个攻击图开始是我的
                                },
                            ],
                        },
                    ],
                },
            ],
            input: "",
        };
        this.changeInput = this.changeInput.bind(this);
        this.changeProtocols = this.changeProtocols.bind(this);
    }

    changeInput(input) {
        this.setState({ input });
    }
    changeProtocols(protocols) {
        this.setState({ protocols });
    }

    render() {
        return (
            <div className="content">
                <div className="tab">
                    <Select changeInput={this.changeInput} />
                    <Runbtn
                        input={this.state.input}
                        changeProtocols={this.changeProtocols}
                    />
                </div>
                <Codewrap
                    input={this.state.input}
                    changeInput={this.changeInput}
                />
                <Resultwrap protocols={this.state.protocols} />
            </div>
        );
    }
}

export default Home;

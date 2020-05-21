import React from "react";

function Help() {
    return (
        <div className="hold">
            <div className="left">
                <ul>
                    <li>
                        <a href="#preface">前言</a>
                    </li>
                    <li>
                        <a href="#input_language">输入语言</a>
                        <ul>
                            <li>
                                <a href="#A_minimal_input_file">
                                    一个简短的输入文件
                                </a>
                            </li>
                            <li>
                                <a href="#Terms">术语</a>
                                <ul>
                                    <li>
                                        <a href="#Atomic_terms">原子术语</a>
                                    </li>
                                    <li>
                                        <a href="#Pairing">对</a>
                                    </li>
                                    <li>
                                        <a href="#Symmetric_keys">对称密钥</a>
                                    </li>
                                    <li>
                                        <a href="#Asymmetric_keys">
                                            非对称密钥
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#Hash_functions">哈希函数</a>
                                    </li>
                                    <li>
                                        <a href="#Predened_types">预定义类型</a>
                                    </li>
                                    <li>
                                        <a href="#Usertypes">用户类型</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#Events">事件</a>
                                <ul>
                                    <li>
                                        <a href="#Receive_and_send_events">
                                            接收和发送事件
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#Claim_events_and_Security_properties">
                                            声明事件和安全属性
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#Internal_computation">
                                            内部计算/模式匹配事件
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#Role_definitions">角色定义</a>
                            </li>
                            <li>
                                <a href="#Protocol_definitions">协议定义</a>
                            </li>

                            <li>
                                <a href="#Global_declarations">全局声明</a>
                            </li>

                            <li>
                                <a href="#Miscellaneous">Miscellaneous</a>
                                <ul>
                                    <li>
                                        <a href="#Macro">Macro</a>
                                    </li>
                                    <li>
                                        <a href="#Include">Include</a>
                                    </li>
                                    <li>
                                        <a href="#one_role_per_agent">
                                            one-role-per-agent
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#Language_BNF">BNF语言</a>
                                <ul>
                                    <li>
                                        <a href="#Input_file">Input file</a>
                                    </li>
                                </ul>
                            </li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </li>

                    <li>
                        <a href="#modeling_security_protocols">安全协议模型</a>
                        <ul>
                            <li>
                                <a href="#Introduction">介绍</a>
                            </li>
                            <li>
                                <a href="#Example">例子</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#specifying_security_properties">安全属性</a>
                    </li>
                    <li>
                        <a href="#reference">参考</a>
                    </li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
            <div className="right">
                <h2 id="preface">前言</h2>
                <h2 id="input_language">输入语言</h2>
                <p>
                    Scyther的输入语言松散地基于类似C/Java的语法。该语言的主要目的是描述由一组角色定义的协议。角色又由一系列事件定义，其中大多数事件表示术语的发送或接收。
                    我们将在下面的章节中描述这些元素。
                    注释可以以//或#（对于单行注释）开头，也可以由/*和*/（对于多行注释）括起。请注意，不能嵌套多行注释。
                    忽略元素之间的任何空白。因此，可以使用空白（空格、制表符、换行符）来提高可读性。
                    基本标识符由一组字母数字字符中的字符串以及符号^和-。
                    该语言区分大小写，因此NS3与NS3的标识符不同。
                </p>
                <h3 id="A_minimal_input_file">一个简短的输入文件</h3>
                <p>一个简短的输入文件</p>
                <p>
                    在上面，我们定义了一个名为“ExampleProtocol”的协议，它有两个角色，“I”和
                    “R”，在协议名称后的括号中列出。注意，我们还没有定义这些角色的行为：这些行为是在对应的role
                    I和role R命令后面的花括号中定义的。
                </p>
                <h3 id="Terms">术语</h3>
                <p>在最基本的层次上，镰刀操纵术语。</p>
                <h3 id="Atomic_terms">原子术语</h3>
                <p>
                    原子术语可以是任何标识符，通常是一系列字母数字字符。 15
                    原子术语可以通过诸如配对和加密之类的运算符组合成更复杂的术语。
                    常数 新生成的值
                    许多安全协议依赖于生成随机值。可以通过在角色定义中使用fresh声明来指定它们。例如，要生成Nonce类型的随机值Na，我们指定：
                    角色X（…） 鲜钠：Nonce； 发送1（X，Y，Na）； 变量
                    代理可以使用变量来存储接收到的术语。例如，要将nonce接收到名为Na的变量中，我们指定：
                    角色Y（…） 变量Na：Nonce； 记录1（X，Y，Na）； }
                    新生成的值和变量（如Na）的本地声明都是角色的本地声明。因此，可以在一个角色中指定新生成的nonce-Na，在另一个角色中指定变量Na，而不发生任何冲突。变量是死板的：在执行发生它们的第一个接收事件之后，会为它们分配一个值。此值以后不能更改。
                    变量必须首先出现在接收事件中：不允许在发送事件中使用未初始化的变量。
                </p>
                <h3 id="Pairing">对</h3>
                <p>
                    任何两个项都可以组合成一个项对：我们为项对x和y写（x，y）。它也可以写n元组为（x，y，z），这被镰刀解释为（（x，y），z）。
                </p>
                <h3 id="Symmetric_keys">对称密钥</h3>
                <p>
                    任何项都可以作为对称加密的密钥。
                    使用kir一词对ni进行加密，写为： ni基尔
                    除非kir被明确定义为非对称密钥对的一部分（如下所述），否则这将被解释为对称加密。
                    对称密钥基础设施是预定义的：k（X，Y）表示X和Y之间共享的长期对称密钥。
                </p>
                <h3 id="Asymmetric_keys">非对称密钥</h3>
                <p>
                    公钥基础设施（PKI）是预先定义的：sk（X）表示X的长期私钥，pk（X）表示相应的公钥。
                    例如，考虑以下术语。它表示用术语pk（I）对某个术语ni进行加密。在通常的约定下，这意味着
                    发起者的nonce（ni）是用发起者的公钥加密的。
                </p>
                <h3 id="Hash_functions">哈希函数</h3>
                <p>
                    散列函数本质上是一个函数的加密，任何人都不知道这个函数的逆。
                    标识符的全局声明可以使用它们作为hashfunction，例如：
                    哈希函数H1；
                    由于所有代理和协议都应该能够访问这样一个函数，因此hashfunction的声明通常是全局的，即在任何协议定义之外定义的。
                    一旦声明，它们就可以用于协议消息中，例如：
                </p>
                <h3 id="Predened_types">预定义类型</h3>
                <p>
                    Agent 用于代理的类型。 Function
                    一个函数项的特殊类型，该函数项可以将一系列项作为参数。默认情况下，它的行为类似于散列函数：给定术语h（x），其中h是函数类型，则不可能派生x。
                    Nonce通常使用的标准类型，因此在工具中定义。 Ticket
                    Ticket类型的变量可以用任何术语替换。
                </p>
                <h3 id="Usertypes">用户类型</h3>
                <p>
                    这种声明的效果是，新类型的变量只能用该类型的消息m实例化，即，已由全局声明const
                    m声明的消息m：
                    MyAtomicMessage或角色中新生成的新鲜m:MyAtomicMessage。
                    一般来说，如果更多地了解哪些消息可能统一或不统一，那么该工具可以执行得更好。通过定义用户类型，建模者可以通知工具，变量只能用该类型的术语实例化，而不能用Nonce类型的术语实例化。从概念上讲，人们总是可以为每个变量类型编写Ticket（对应于所有可能的消息），但随后人们可能会发现错误的攻击（如果实现实际上确实检查了消息的类型），并且工具将不太可能验证属性（对于无限数量的运行）。
                </p>
                <h2 id="modeling_security_protocols">安全协议模型</h2>
                <h2 id="specifying_security_properties">安全属性</h2>
                <h2 id="reference">参考</h2>
            </div>
        </div>
    );
}
export default Help;

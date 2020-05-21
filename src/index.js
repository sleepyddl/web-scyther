import React from "react";
import ReactDOM from "react-dom";
import Header from "./Header";
import Home from "./Home";
function App() {
  return (
    <div>
      <Header />
      <Home />
    </div>
  );
}
ReactDOM.render(<App />, document.getElementById("root"));

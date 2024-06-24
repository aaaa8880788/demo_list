import React from 'react';
import "./App.scss";
import Demo1 from "@/pages/01-基础入门";
import Demo2 from "@/pages/02-光源";
import Demo3 from "@/pages/03-basic";
import Demo4 from "@/pages/04-图元";
import Demo5 from "@/pages/05-场景图";

const App = (props) => {
  return (
    <div id="app">
      {/* <Demo1/> */}
      {/* <Demo2/> */}
      {/* <Demo3/> */}
      {/* <Demo4/> */}
      <Demo5/>
    </div>
  )
}

export default App
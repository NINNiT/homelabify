import React, { useEffect } from "react";
import logo from './logo.svg';
import './App.scss';
import RackTempGraph from "./RackTemp";

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h1>Homelabify</h1>
      </header>
      <section className="top-content">
        <div>status</div>
        <div>buttons</div>
      </section>
      <section className="bottom-content">
        <RackTempGraph props="lol" />
      </section>
    </div>
  );
}

export default App;

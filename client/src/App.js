import React from "react";
import { BrowserRouter as Router} from "react-router-dom";
import Courses from "./components/Courses";
import Header from "./components/Header";
import Context from './Context'

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Courses />
      </div>
    </Router>
  );
}

export default App;

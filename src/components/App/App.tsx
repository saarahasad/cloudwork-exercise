import React, { PureComponent } from "react";

import { WorkloadListContainer } from "../WorkloadList";
import { WorkloadFormContainer } from "../WorkloadForm";
import "./App.css";

class App extends PureComponent {
  render() {
    return (
      <div className="main-container">
        <h1>CloudWork</h1>

        <hr className="main-container__seperator" />
        <br />
        <p className="main-container__heading">Workloads</p>
        <div className="main-container__row">
          <div className="main-container__column left">
            <WorkloadListContainer />
          </div>
          <div className="main-container__column right">
            <WorkloadFormContainer />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { submit } from "../../state/workloads/actions";

import "./WorkloadForm.css";

interface WorkloadFormDispatchProps {
  submitWorkload: (complexity: number) => void;
}

interface WorkloadFormProps extends WorkloadFormDispatchProps {}

interface WorkloadFormState {
  complexity: number;
}

class WorkloadForm extends React.PureComponent<
  WorkloadFormProps,
  WorkloadFormState
> {
  defaultState = {
    complexity: 5,
  };

  state = this.defaultState;

  handleSubmit = (e: React.MouseEvent) => {
    this.props.submitWorkload(this.state.complexity);
    this.setState(this.defaultState);
    e.preventDefault();
  };

  render() {
    return (
      <form className="form-container">
        <p className="form-container__heading">Create workload</p>

        <div>
          <label>
            Complexity: {this.state.complexity}
            <br />
            <input
              className="form-container__slider"
              value={this.state.complexity}
              onChange={(e) =>
                this.setState({ complexity: Number(e.target.value) })
              }
              type="range"
              min="1"
              max="10"
            />
          </label>
        </div>

        <div>
          <button
            className="form-container__button"
            onClick={this.handleSubmit}
            type="submit"
          >
            Start work
          </button>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch): WorkloadFormDispatchProps => ({
  submitWorkload: (complexity: number) => dispatch(submit({ complexity })),
});

const WorkloadFormContainer = connect(null, mapDispatchToProps)(WorkloadForm);

export { WorkloadForm, WorkloadFormContainer };

export default WorkloadForm;

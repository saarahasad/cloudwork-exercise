import React from "react";
import TimeAgo from "react-timeago";
import { Status } from "../../state/workloads";
import "./WorkloadItem.css";

export interface WorkloadItemStateProps {
  id: number;
  complexity: number;
  status: Status;
  completeDate: Date;
}

export interface WorkloadItemMethodProps {
  onCancel: () => void;
}

export interface WorkloadItemProps
  extends WorkloadItemStateProps,
    WorkloadItemMethodProps {}

const WorkloadItem: React.SFC<WorkloadItemProps> = (props) => (
  <div className="WorkloadItem">
    <div className="WorkloadItem__column workloadItem__left">
      <h3 className="WorkloadItem-heading">Workload #{props.id}</h3>
      <span className="WorkloadItem-subHeading">
        {" "}
        Complexity: {props.complexity}
      </span>
    </div>
    <div className="WorkloadItem__column workloadItem__right">
      {props.status === "WORKING" ? (
        <>
          <span>
            <TimeAgo
              date={props.completeDate}
              formatter={(value, unit, suffix) =>
                `${value} ${unit}s remaining...`
              }
            />
          </span>
          <button
            className="WorkloadItem-secondaryButton"
            onClick={props.onCancel}
          >
            Cancel
          </button>
        </>
      ) : (
        <span className="WorkloadItem-statusText">
          {props.status.toLowerCase()}
        </span>
      )}
    </div>
  </div>
);

export { WorkloadItem };

export default WorkloadItem;

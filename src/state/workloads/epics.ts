import { combineEpics, Epic } from "redux-observable";
import { filter, map, tap, mergeMap, delayWhen } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { timer } from "rxjs";

import { RootAction, RootState } from "../reducer";
import * as workloadsActions from "./actions";
import { WorkloadService } from "././services";

const service = new WorkloadService();

type AppEpic = Epic<RootAction, RootAction, RootState>;

const logWorkloadSubmissions: AppEpic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(workloadsActions.submit)),
    map((action) => action.payload),
    tap((payload) => console.log("Workload submitted", payload)),
    mergeMap((payload) =>
      service.create(payload).then((res) => {
        console.log(res);
        return workloadsActions.created(res);
      })
    )
  );

const cancelWorkload: AppEpic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(workloadsActions.cancel)),
    map((action) => action.payload),
    tap((payload) => console.log("Workload cancelled", payload)),
    mergeMap((payload) =>
      service.cancel(payload).then((res) => {
        console.log(res);
        return workloadsActions.updateStatus({ ...res, status: "CANCELED" });
      })
    )
  );

const updateWorkload: AppEpic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(workloadsActions.created)),
    map((action) => action.payload),
    tap((payload) => console.log("Checking Status", payload)),
    delayWhen((action) => timer(action.complexity * 1000)),
    mergeMap((payload) =>
      service.checkStatus(payload).then((res) => {
        return workloadsActions.updateStatus({ ...res, status: res.status });
      })
    )
  );

export const epics = combineEpics(
  logWorkloadSubmissions,
  cancelWorkload,
  updateWorkload
);

export default epics;

export type ActionType =
  | "FETCH_TASKS"
  | "FETCH_TASKS_SUCCESS"
  | "FETCH_TASKS_FAILURE";

//define the reducer interface
export interface Action {
  type: ActionType;
  payload?: any;
}

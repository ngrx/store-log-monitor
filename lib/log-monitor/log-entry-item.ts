export interface LogEntryItem {
  key: number;
  action: any;
  actionId: number;
  state: any;
  previousState: any;
  error: any;
  collapsed: boolean;
}

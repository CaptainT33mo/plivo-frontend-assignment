import { Priority, Status } from "../../types";
import { enumToSelectOptions } from "./helpers";

export const STATUS_OPTIONS = enumToSelectOptions(Status);
export const PRIORITY_OPTIONS = enumToSelectOptions(Priority);

export const SORT_OPTIONS = [
  { label: "Date (Newest)", value: "date-desc" },
  { label: "Date (Oldest)", value: "date-asc" },
  { label: "Status", value: "status" },
  { label: "Priority", value: "priority" },
  { label: "Customer", value: "customer" },
];

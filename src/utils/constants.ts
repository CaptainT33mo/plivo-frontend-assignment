import { Priority, Status } from "../../types";
import { enumToSelectOptions } from "./helpers";

export const STATUS_OPTIONS = enumToSelectOptions(Status);
export const PRIORITY_OPTIONS = enumToSelectOptions(Priority);

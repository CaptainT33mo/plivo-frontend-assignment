import { Status } from "../../../types";
import { default as DoneIcon } from "@/assets/icons/done.svg";
import { default as InProgressIcon } from "@/assets/icons/half-circle.svg";
import { default as CancelIcon } from "@/assets/icons/cancel.svg";
import { default as BacklogIcon } from "@/assets/icons/circle-dot.svg";
import Image from "next/image";

interface Props {
  status: (typeof Status)[keyof typeof Status];
  className?: string;
}

const ICONS = {
  [Status.OPEN]: BacklogIcon,
  [Status.PENDING]: InProgressIcon,
  [Status.CLOSED]: DoneIcon,
  [Status.ARCHIVED]: CancelIcon,
};

export default function StatusIcon({ status, className = "" }: Props) {
  let Icon = ICONS[status];

  return (
    <Image src={Icon} alt="" className={`w-3.5 h-3.5 rounded ${className}`} />
  );
}

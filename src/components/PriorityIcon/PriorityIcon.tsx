import { Priority } from "../../../types";
import { default as SignalNoPriorityIcon } from "@/assets/icons/dots.svg";
import { default as SignalMediumIcon } from "@/assets/icons/signal-medium.svg";
import { default as SignalStrongIcon } from "@/assets/icons/signal-strong.svg";
import { default as SignalWeakIcon } from "@/assets/icons/signal-weak.svg";
import Image from "next/image";

interface Props {
  priority: (typeof Priority)[keyof typeof Priority];
  className?: string;
}

const ICONS = {
  [Priority.HIGH]: SignalStrongIcon,
  [Priority.MEDIUM]: SignalMediumIcon,
  [Priority.LOW]: SignalWeakIcon,
  [Priority.NO_PRIORITY]: SignalNoPriorityIcon,
};

export default function PriorityIcon({ priority, className = "" }: Props) {
  let Icon = ICONS[priority];

  return (
    <Image src={Icon} alt="" className={`w-3.5 h-3.5 rounded ${className}`} />
  );
}

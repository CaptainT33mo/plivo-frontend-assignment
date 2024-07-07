import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/Select";
import { SelectOption } from "../../../../types";

type SelectComponentProps = {
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  onChange?: (value: string) => void;
  defaultValue?: string | undefined;
};

const SelectComponent: React.FC<SelectComponentProps> = ({
  options,
  placeholder = "Select an option",
  className = "w-[180px]",
  defaultValue,
  onChange,
}) => {
  return (
    <Select onValueChange={onChange} defaultValue={defaultValue}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectComponent;

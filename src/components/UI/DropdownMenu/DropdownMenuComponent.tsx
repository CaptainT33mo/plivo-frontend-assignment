import { ReactNode } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from ".";

type DropdownMenuComponentProps = {
  trigger: ReactNode;
  triggerClassName?: string;
  contentClassName?: string;
  children: ReactNode;
};

const DropdownMenuComponent: React.FC<DropdownMenuComponentProps> = ({
  trigger,
  triggerClassName,
  contentClassName,
  children,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={triggerClassName} asChild>
        {trigger}
      </DropdownMenuTrigger>

      <DropdownMenuContent className={contentClassName}>
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownMenuComponent;

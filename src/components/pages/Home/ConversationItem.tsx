import PriorityIcon from "@/components/PriorityIcon/PriorityIcon";
import { formatDate } from "@/utils/date";
import { Conversation } from "../../../../types";
import StatusIcon from "@/components/StatusIcon/StatusIcon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/Avatar";
import { getInitialsFromName } from "@/utils/helpers";

type ConversationItemProps = {
  conversation: Conversation;
};

export default function ConversationItem({
  conversation,
}: ConversationItemProps) {
  return (
    <div
      key={conversation.id}
      className="inline-flex items-center flex-grow flex-shrink w-full min-w-0 pl-2 pr-8 text-sm border-b border-gray-100 hover:bg-gray-100 h-11"
      id={conversation.id}
    >
      <div className="flex-shrink-0 ml-2">
        <div className="flex-shrink-0 ml-2">
          <PriorityIcon priority={conversation.priority} />
        </div>
      </div>
      {/* <div className="flex-shrink-0 hidden ml-2 font-normal text-gray-500 sm:block w-11 md:block">
        {conversation.id}
      </div> */}
      <div className="flex-shrink-0 ml-2">
        <StatusIcon status={conversation.status} />
      </div>
      <div className="flex-wrap flex-shrink ml-2 overflow-hidden font-medium line-clamp-1 overflow-ellipsis">
        {conversation.subject.substr(0, 3000) || ""}
      </div>
      <div className="flex flex-grow ml-2"></div>
      <div className="flex-shrink-0 hidden w-10 ml-2 mr-3 font-normal sm:block">
        {formatDate(conversation.lastUpdated)}
      </div>
      <div>
        <Avatar className="w-5 h-5">
          <AvatarImage
            className="w-5 h-5"
            src="https://picsum.photos/200"
            alt={conversation.customer.name}
          />
          <AvatarFallback className="text-xs">
            {getInitialsFromName(conversation.customer.name)}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

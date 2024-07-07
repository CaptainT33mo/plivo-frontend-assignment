"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useStore } from "@/store";
import { Sender, Status } from "../../../../types";
import { Button } from "@/components/UI/Button";
import SelectComponent from "@/components/UI/Select/SelectComponent";
import { STATUS_OPTIONS } from "@/utils/constants";
import { LuTrash2 } from "react-icons/lu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/Avatar";
import { getInitialsFromName } from "@/utils/helpers";

export default function ConversationView() {
  const params = useParams();
  const id = params.conversationId as string;
  const { getConversation, updateConversation } = useStore();
  const conversation = getConversation(id);
  const [replyContent, setReplyContent] = useState("");

  if (!conversation) {
    return <div>Conversation not found</div>;
  }

  const handleReply = () => {
    if (replyContent.trim()) {
      const updatedMessages = [
        ...conversation.messages,
        {
          id: Date.now().toString(),
          content: replyContent,
          sender: Sender.AGENT,
          timestamp: new Date(),
        },
      ];
      updateConversation(id, {
        messages: updatedMessages,
        lastUpdated: new Date(),
      });
      setReplyContent("");
    }
  };

  const handleStatusChange = (val: string) => {
    updateConversation(id, {
      status: val as Status,
      lastUpdated: new Date(),
    });
  };

  return (
    <div className="p-4 max-w-6xl mx-auto w-full">
      <div>
        {/* Conversation Header */}
        <div className="flex px-2 justify-between gap-3 mb-4">
          <h2 className="text-2xl truncate">{conversation.subject}</h2>
          <div className="flex gap-2">
            <SelectComponent
              className="w-32 bg-white"
              options={STATUS_OPTIONS}
              defaultValue={conversation.status}
              onChange={handleStatusChange}
            />
            <Button variant="outline" className="bg-white">
              <LuTrash2 size={18} />
            </Button>
          </div>
        </div>

        {/* Message Thread */}
        <div className="p-4 space-y-4">
          {conversation.messages.map((message, index) => (
            <div key={message.id} className="border-b pb-5 last:border-b-0">
              <div className="flex items-start gap-2 mb-5">
                <Avatar>
                  {message.sender === Sender.CUSTOMER && (
                    <AvatarImage src={"https://picsum.photos/200"} />
                  )}
                  <AvatarFallback>
                    {getInitialsFromName(conversation.customer.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex justify-between w-full">
                  <div>
                    <p className="font-semibold">
                      {message.sender === Sender.CUSTOMER
                        ? conversation.customer.name
                        : "Support"}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {message.sender === Sender.CUSTOMER
                        ? conversation.customer.email
                        : "support@example.com"}
                    </p>
                  </div>
                  <div className="text-gray-500 text-sm">
                    {new Date(message.timestamp).toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="text-gray-700 whitespace-pre-wrap pl-12">
                {message.content}
              </div>
            </div>
          ))}
        </div>

        {/* Reply Section */}
        <div className="border-t p-4">
          <textarea
            className="w-full p-2 border rounded mb-2"
            rows={4}
            placeholder="Type your reply..."
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
          ></textarea>
          <Button onClick={handleReply}>Send Reply</Button>
        </div>
      </div>
    </div>
  );
}

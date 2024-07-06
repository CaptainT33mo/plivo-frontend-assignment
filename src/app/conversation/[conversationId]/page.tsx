"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { FaReply, FaArchive, FaTrash, FaTag } from "react-icons/fa";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useStore } from "@/store";
import { Sender } from "../../../../types";
import { Button } from "@/components/UI/Button";

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

  return (
    <div className=" p-4">
      <div className="bg-white shadow rounded-lg">
        {/* Conversation Header */}
        <div className="border-b p-4">
          <h1 className="text-2xl font-bold">{conversation.customer.name}</h1>
          <p className="text-gray-500">{conversation.customer.email}</p>
        </div>

        {/* Action Toolbar */}
        <div className="border-b p-2 flex space-x-2">
          <Button className="p-2 hover:bg-gray-100 rounded">
            <FaReply />
          </Button>
          <Button className="p-2 hover:bg-gray-100 rounded">
            <FaArchive />
          </Button>
          <Button className="p-2 hover:bg-gray-100 rounded">
            <FaTrash />
          </Button>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Button className="p-2 hover:bg-gray-100 rounded">
                <FaTag />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content className="bg-white shadow-lg rounded-md p-2">
                <DropdownMenu.Item className="p-2 hover:bg-gray-100 cursor-pointer">
                  Urgent
                </DropdownMenu.Item>
                <DropdownMenu.Item className="p-2 hover:bg-gray-100 cursor-pointer">
                  Follow-up
                </DropdownMenu.Item>
                <DropdownMenu.Item className="p-2 hover:bg-gray-100 cursor-pointer">
                  Resolved
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>

        {/* Message Thread */}
        <div className="p-4 space-y-4">
          {conversation.messages.map((message, index) => (
            <div key={message.id} className="border-b pb-4 last:border-b-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="font-semibold">
                    {message.sender === Sender.CUSTOMER
                      ? conversation.customer.name
                      : "Support"}
                  </span>
                  <span className="text-gray-500 ml-2 text-sm">
                    {new Date(message.timestamp).toLocaleString()}
                  </span>
                </div>
                {index === 0 && (
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {conversation.status}
                  </span>
                )}
              </div>
              <div className="text-gray-700 whitespace-pre-wrap">
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

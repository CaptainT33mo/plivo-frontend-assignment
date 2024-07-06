// src/app/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { FaSearch, FaFilter } from "react-icons/fa";
import { useStore } from "@/store";
import ConversationItem from "@/components/pages/Home/ConversationItem";
import SelectComponent from "@/components/UI/Select/SelectComponent";
import { STATUS_OPTIONS } from "@/utils/constants";
import { Input } from "@/components/UI/Input";

export default function Home() {
  const conversations = useStore((state) => state.conversations);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "open" | "pending" | "closed">(
    "all"
  );

  const filteredConversations = conversations
    .filter((c) =>
      c.customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((c) => filter === "all" || c.status === filter);

  return (
    <div className="p-4">
      <h1 className="text-base font-bold mb-4">All Conversations</h1>
      <div className="flex mb-4">
        <div className="relative flex-grow mr-2">
          <Input
            type="text"
            placeholder="Search conversations..."
            className="w-full p-2 pl-8 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-2 top-3 text-gray-400" />
        </div>
        <div className="relative">
          <SelectComponent
            options={STATUS_OPTIONS}
            placeholder="Theme"
            onChange={(val) => setFilter(val as any)}
          />
          {/* <FaFilter className="absolute right-2 top-3 text-gray-400" /> */}
        </div>
      </div>
      <div className="flex flex-col overflow-auto">
        {filteredConversations.map((conversation) => (
          <Link href={`/conversation/${conversation.id}`} key={conversation.id}>
            <ConversationItem conversation={conversation} />
          </Link>
        ))}
      </div>
    </div>
  );
}

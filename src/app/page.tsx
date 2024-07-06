"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FaSearch, FaFilter } from "react-icons/fa";
import { useStore } from "@/store";
import ConversationItem from "@/components/pages/Home/ConversationItem";
import SelectComponent from "@/components/UI/Select/SelectComponent";
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from "@/utils/constants";
import { Input } from "@/components/UI/Input";
import { FilterDropdown } from "@/components/Filter/FilterDropdown";

export default function Home() {
  const conversations = useStore((state) => state.conversations);
  const [statusFilter, setStatusFilter] = useState<Set<string>>(new Set());
  const [priorityFilter, setPriorityFilter] = useState<Set<string>>(new Set());

  const handleStatusFilterChange = (values: string[]) => {
    setStatusFilter(new Set(values));
    // Apply filter to your conversation list
  };

  const handlePriorityFilterChange = (values: string[]) => {
    setPriorityFilter(new Set(values));
    // Apply filter to your conversation list
  };
  const [searchTerm, setSearchTerm] = useState("");

  const filteredConversations = useMemo(() => {
    return conversations.filter((conversation) => {
      const matchesSearch = conversation.subject
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter.size === 0 || statusFilter.has(conversation.status);
      const matchesPriority =
        priorityFilter.size === 0 || priorityFilter.has(conversation.priority);
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [conversations, searchTerm, statusFilter, priorityFilter]);

  return (
    <div className="p-4">
      <h1 className="text-base font-bold mb-4">All Conversations</h1>
      <div className="flex items-center mb-4">
        <div className="relative flex-grow mr-2">
          <Input
            type="text"
            placeholder="Search conversations..."
            className="w-full pr-2 h-8 pl-8 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-2 top-2 text-gray-400" />
        </div>
        <div className="flex space-x-2">
          <FilterDropdown
            title="Status"
            options={STATUS_OPTIONS}
            selectedValues={statusFilter}
            onFilterChange={handleStatusFilterChange}
          />
          <FilterDropdown
            title="Priority"
            options={PRIORITY_OPTIONS}
            selectedValues={priorityFilter}
            onFilterChange={handlePriorityFilterChange}
          />
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

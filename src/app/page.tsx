"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FaSearch, FaFilter } from "react-icons/fa";
import { useStore } from "@/store";
import ConversationItem from "@/components/pages/Home/ConversationItem";
import SelectComponent from "@/components/UI/Select/SelectComponent";
import {
  PRIORITY_OPTIONS,
  SORT_OPTIONS,
  STATUS_OPTIONS,
} from "@/utils/constants";
import { Input } from "@/components/UI/Input";
import { FilterDropdown } from "@/components/Filter/FilterDropdown";

export default function Home() {
  const conversations = useStore((state) => state.conversations);
  const [statusFilter, setStatusFilter] = useState<Set<string>>(new Set());
  const [priorityFilter, setPriorityFilter] = useState<Set<string>>(new Set());
  const [sortOption, setSortOption] = useState("date-desc");

  const handleStatusFilterChange = (values: string[]) => {
    setStatusFilter(new Set(values));
  };

  const handlePriorityFilterChange = (values: string[]) => {
    setPriorityFilter(new Set(values));
  };
  const [searchTerm, setSearchTerm] = useState("");

  const filteredConversations = useMemo(() => {
    let result = conversations.filter((conversation) => {
      const matchesSearch = conversation.subject
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter.size === 0 || statusFilter.has(conversation.status);
      const matchesPriority =
        priorityFilter.size === 0 || priorityFilter.has(conversation.priority);
      return matchesSearch && matchesStatus && matchesPriority;
    });

    // Sorting logic
    switch (sortOption) {
      case "date-desc":
        result.sort(
          (a, b) =>
            new Date(b.lastUpdated).getTime() -
            new Date(a.lastUpdated).getTime()
        );
        break;
      case "date-asc":
        result.sort(
          (a, b) =>
            new Date(a.lastUpdated).getTime() -
            new Date(b.lastUpdated).getTime()
        );
        break;
      case "status":
        result.sort((a, b) => a.status.localeCompare(b.status));
        break;
      case "priority":
        result.sort((a, b) => a.priority.localeCompare(b.priority));
        break;
      case "customer":
        result.sort((a, b) => a.customer.name.localeCompare(b.customer.name));
        break;
    }

    return result;
  }, [conversations, searchTerm, statusFilter, priorityFilter, sortOption]);

  return (
    <div className="p-4">
      <h1 className="text-base font-bold mb-4">All Conversations</h1>
      <div className="flex items-center mb-4">
        <div className="relative flex-grow mr-2">
          <Input
            type="text"
            placeholder="Search conversations..."
            className="w-full pr-2 h-8 pl-8 border rounded bg-white max-w-64"
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
          <SelectComponent
            options={SORT_OPTIONS}
            defaultValue={sortOption}
            onChange={(value) => setSortOption(value)}
            placeholder="Sort by"
            className="w-40 h-8 bg-white"
          />
        </div>
      </div>
      <div className="border w-full"></div>
      <div className="flex flex-col overflow-auto">
        {filteredConversations?.length > 0 ? (
          filteredConversations.map((conversation) => (
            <Link
              href={`/conversation/${conversation.id}`}
              key={conversation.id}
            >
              <ConversationItem conversation={conversation} />
            </Link>
          ))
        ) : (
          <div className="w-full h-full items-center justify-center text-xl font-medium text-center p-10">
            No data found!
          </div>
        )}
      </div>
    </div>
  );
}

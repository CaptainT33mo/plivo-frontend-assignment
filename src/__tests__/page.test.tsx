import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "@/app/page";
import { useStore } from "@/store";

// Mock the store
vi.mock("@/store", () => ({
  useStore: vi.fn(),
}));

// Mock Link component
vi.mock("next/link", () => ({
  default: ({ children }: { children: React.ReactNode }) => children,
}));

describe("Home Component", () => {
  const mockConversations = [
    {
      id: "1",
      subject: "Test Subject 1",
      status: "open",
      priority: "high",
      customer: { name: "John Doe" },
      lastUpdated: "2023-01-01T00:00:00.000Z",
    },
    {
      id: "2",
      subject: "Test Subject 2",
      status: "closed",
      priority: "low",
      customer: { name: "Jane Smith" },
      lastUpdated: "2023-01-02T00:00:00.000Z",
    },
  ];

  beforeEach(() => {
    (useStore as any).mockReturnValue({
      conversations: mockConversations,
    });
  });

  it("renders without crashing", () => {
    render(<Home />);
    expect(screen.getByText("All Conversations")).toBeDefined();
  });
});

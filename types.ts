export enum Priority {
  NO_PRIORITY = "no_priority",
  HIGH = "high",
  LOW = "low",
  MEDIUM = "medium",
}

export enum Status {
  OPEN = "open",
  PENDING = "pending",
  CLOSED = "closed",
  ARCHIVED = "archived",
}

export enum Sender {
  CUSTOMER = "customer",
  AGENT = "support",
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
}

interface Message {
  id: string;
  content: string;
  sender: (typeof Sender)[keyof typeof Sender];
  timestamp: Date;
}

export interface Conversation {
  id: string;
  subject: string;
  customer: Customer;
  messages: Message[];
  status: (typeof Status)[keyof typeof Status];
  priority: (typeof Priority)[keyof typeof Priority];
  lastUpdated: Date;
}

export type SelectOption = {
  value: string;
  label: string;
};

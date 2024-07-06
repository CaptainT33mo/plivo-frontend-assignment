import { create, StateCreator } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";
import { Conversation, Customer } from "../../types";

// Typescript support for Zustand store config can be found here:
// https://github.com/pmndrs/zustand/blob/main/docs/guides/typescript.md#slices-pattern

// https://docs.pmnd.rs/zustand/guides/how-to-reset-state
const resetters: (() => void)[] = [];

export const resetAllSlices = () => resetters.forEach((resetter) => resetter());

interface GlobalState {
  openCreateConversationModal: boolean;
  setOpenCreateConversationModal: (newVal: boolean) => void;
}

interface CustomerState {
  customers: Customer[];
  addCustomer: (customer: Customer) => void;
  updateCustomer: (id: string, updates: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;
}

interface ConversationState {
  conversations: Conversation[];
  addConversation: (conversation: Conversation) => void;
  updateConversation: (id: string, updates: Partial<Conversation>) => void;
  deleteConversation: (id: string) => void;
  getConversation: (id: string) => Conversation | undefined;
}

const initialGlobalStore = {
  openCreateConversationModal: false,
};

const useGlobalStore: StateCreator<GlobalState> = (set) => {
  resetters.push(() => set(initialGlobalStore));
  return {
    openCreateConversationModal: false,
    setOpenCreateConversationModal: (newVal: boolean) => {
      set({ openCreateConversationModal: newVal });
    },
  };
};

const initialCustomerStore = {
  customers: [],
};

const useCustomerStore: StateCreator<CustomerState> = (set, get) => {
  resetters.push(() => set(initialCustomerStore));
  return {
    customers: [],
    addCustomer: (customer) =>
      set((state) => ({ customers: [...state.customers, customer] })),
    updateCustomer: (id, updates) =>
      set((state) => ({
        customers: state.customers.map((c) =>
          c.id === id ? { ...c, ...updates } : c
        ),
      })),
    deleteCustomer: (id) =>
      set((state) => ({
        customers: state.customers.filter((c) => c.id !== id),
      })),
  };
};

const initialConversationStore = {
  conversations: [],
};

const useConversationStore: StateCreator<ConversationState> = (set, get) => {
  resetters.push(() => set(initialConversationStore));
  return {
    conversations: [],
    addConversation: (conversation) =>
      set((state) => ({
        conversations: [...state.conversations, conversation],
      })),
    updateConversation: (id, updates) =>
      set((state) => ({
        conversations: state.conversations.map((c) =>
          c.id === id ? { ...c, ...updates } : c
        ),
      })),
    deleteConversation: (id) =>
      set((state) => ({
        conversations: state.conversations.filter((c) => c.id !== id),
      })),
    getConversation: (id) => get().conversations.find((c) => c.id === id),
  };
};

export const useStore = create<
  GlobalState & ConversationState & CustomerState
>()(
  devtools(
    persist(
      (...params) => ({
        ...useGlobalStore(...params),
        ...useCustomerStore(...params),
        ...useConversationStore(...params),
      }),
      {
        name: "user-org-storage", // name of the item in the storage (must be unique)
        storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      }
    )
  )
);

// const clearStorage = () => useStore.persist.clearStorage();

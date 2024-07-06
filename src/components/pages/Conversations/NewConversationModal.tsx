import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { v4 as uuidV4 } from "uuid";
import { useStore } from "@/store";
import { Priority, Sender, Status } from "../../../../types";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/UI/Dialog";
import { Button } from "@/components/UI/Button";

export default function NewConversationDialog() {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [initialMessage, setInitialMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [status, setStatus] = useState(Status.OPEN);
  const [priority, setPriority] = useState(Priority.NO_PRIORITY);
  const [selectedCustomerId, setSelectedCustomerId] = useState("");

  const {
    addConversation,
    addCustomer,
    customers,
    openCreateConversationModal,
    setOpenCreateConversationModal,
  } = useStore();

  useEffect(() => {
    if (selectedCustomerId) {
      const selectedCustomer = customers.find(
        (c) => c.id === selectedCustomerId
      );
      if (selectedCustomer) {
        setCustomerName(selectedCustomer.name);
        setCustomerEmail(selectedCustomer.email);
      }
    }
  }, [selectedCustomerId, customers]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let customerId = selectedCustomerId;

    // If no existing customer is selected, create a new one
    if (!customerId) {
      const newCustomer = {
        id: uuidV4(),
        name: customerName,
        email: customerEmail,
      };
      addCustomer(newCustomer);
      customerId = newCustomer.id;
    }

    const newConversation = {
      id: uuidV4(),
      customer: {
        id: customerId,
        name: customerName,
        email: customerEmail,
      },
      messages: [
        {
          id: uuidV4(),
          content: initialMessage,
          sender: Sender.CUSTOMER,
          timestamp: new Date(),
        },
      ],
      subject,
      status,
      priority,
      lastUpdated: new Date(),
    };
    addConversation(newConversation);
    setOpenCreateConversationModal(false);
    resetForm();
  };

  const resetForm = () => {
    setCustomerName("");
    setCustomerEmail("");
    setInitialMessage("");
    setStatus(Status.OPEN);
    setPriority(Priority.NO_PRIORITY);
    setSelectedCustomerId("");
  };

  return (
    <Dialog
      open={openCreateConversationModal}
      onOpenChange={setOpenCreateConversationModal}
    >
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50" />
        <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
          <DialogTitle className="text-xl font-bold mb-4">
            New Conversation
          </DialogTitle>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="customerSelect"
              >
                Select Existing Customer
              </label>
              <select
                id="customerSelect"
                className="w-full p-2 border rounded"
                value={selectedCustomerId}
                onChange={(e) => setSelectedCustomerId(e.target.value)}
              >
                <option value="">New Customer</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name} ({customer.email})
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="customerName"
              >
                Customer Name
              </label>
              <input
                id="customerName"
                className="w-full p-2 border rounded"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="customerEmail"
              >
                Customer Email
              </label>
              <input
                id="customerEmail"
                type="email"
                className="w-full p-2 border rounded"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="subject"
              >
                Subject
              </label>
              <input
                id="subject"
                className="w-full p-2 border rounded"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="initialMessage"
              >
                Initial Message
              </label>
              <textarea
                id="initialMessage"
                className="w-full p-2 border rounded"
                value={initialMessage}
                onChange={(e) => setInitialMessage(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="status"
              >
                Status
              </label>
              <select
                id="status"
                className="w-full p-2 border rounded"
                value={status}
                onChange={(e) => setStatus(e.target.value as Status)}
              >
                <option value="open">Open</option>
                <option value="pending">Pending</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="priority"
              >
                Priority
              </label>
              <select
                id="priority"
                className="w-full p-2 border rounded"
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
              >
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <div className="flex justify-end">
              <DialogClose asChild>
                <button type="button" className="mr-2 px-4 py-2 border rounded">
                  Cancel
                </button>
              </DialogClose>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Create
              </button>
            </div>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

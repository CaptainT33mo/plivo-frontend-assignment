"use client";

import { useMemo, useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useStore } from "@/store";
import { Customer } from "../../../types";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/UI/Table/DataTableColumnHeader";
import DropdownMenuComponent from "@/components/UI/DropdownMenu/DropdownMenuComponent";
import { DropdownMenuItem } from "@/components/UI/DropdownMenu";
import { DataTable } from "@/components/UI/Table";
import { Button } from "@/components/UI/Button";
import { LuMoreHorizontal } from "react-icons/lu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/UI/Dialog";

export default function ContactsPage() {
  const { customers, addCustomer, updateCustomer, deleteCustomer } = useStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCustomer) {
      updateCustomer(editingCustomer.id, formData);
    } else {
      addCustomer({ id: Date.now().toString(), ...formData });
    }
    setIsAddModalOpen(false);
    setEditingCustomer(null);
    setFormData({ name: "", email: "", phone: "", company: "" });
  };

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setFormData(customer);
    setIsAddModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      deleteCustomer(id);
    }
  };

  const columns: ColumnDef<Customer>[] = useMemo(() => {
    return [
      {
        accessorKey: "name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => <div>{row.getValue("name")}</div>,
        enableSorting: true,
        enableHiding: false,
      },
      {
        accessorKey: "email",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Email" />
        ),
        cell: ({ row }) => <div>{row.getValue("email")}</div>,
        enableSorting: true,
        enableHiding: false,
      },
      {
        accessorKey: "phone",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Phone No." />
        ),
        cell: ({ row }) => <div>{row.getValue("phone")}</div>,
        enableSorting: true,
        enableHiding: true,
      },
      {
        accessorKey: "company",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Company" />
        ),
        cell: ({ row }) => <div>{row.getValue("company")}</div>,
        enableSorting: true,
        enableHiding: true,
      },
      {
        id: "actions",
        accessorKey: "Actions",
        cell: ({ row }) => (
          <DropdownMenuComponent
            trigger={
              <Button variant="ghost">
                <LuMoreHorizontal />
              </Button>
            }
            triggerClassName="btn btn-primary"
          >
            <>
              <DropdownMenuItem onSelect={() => handleEdit(row.original)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => () => handleDelete(row.original?.id)}
              >
                Delete
              </DropdownMenuItem>
            </>
          </DropdownMenuComponent>
        ),
      },
    ];
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Contacts</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <FaPlus className="inline mr-2" /> Add Contact
        </Button>
      </div>

      <div className="bg-white rounded-lg">
        <DataTable columns={columns} data={customers} searchColumnKey="name" />
      </div>

      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogPortal>
          <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50" />
          <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <DialogTitle className="text-xl font-bold mb-4">
              {editingCustomer ? "Edit Contact" : "Add New Contact"}
            </DialogTitle>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  className="w-full p-2 border rounded"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="w-full p-2 border rounded"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="phone"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  className="w-full p-2 border rounded"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="company"
                >
                  Company
                </label>
                <input
                  id="company"
                  name="company"
                  className="w-full p-2 border rounded"
                  value={formData.company}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex justify-end gap-2">
                <DialogClose asChild>
                  <Button type="button" variant="destructive">
                    Cancel
                  </Button>
                </DialogClose>
                <Button variant="default" type="submit">
                  {editingCustomer ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </div>
  );
}

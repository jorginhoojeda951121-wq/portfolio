"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Mail,
    Phone,
    Calendar,
    Search,
    Filter,
    Download,
    Trash2,
    Eye,
    Reply
} from "lucide-react";
import { toast } from "react-toastify";
import { getContacts, updateContact, deleteContact } from "@/lib/data-manager";
import { contactEvents } from "@/lib/contact-events";

interface Contact {
    id: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    timestamp: string;
    status: "new" | "read" | "replied";
}

export default function ContactsPage() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [selectedContacts, setSelectedContacts] = useState<string[]>([]);

    const refreshContacts = async () => {
        try {
            const contactsData = await getContacts();
            setContacts(contactsData);
        } catch (error) {
            console.error('Error refreshing contacts:', error);
            toast.error('Failed to load contacts');
        }
    };

    useEffect(() => {
        refreshContacts();
        const unsubscribe = contactEvents.subscribe(refreshContacts);
        return unsubscribe;
    }, []);

    const filteredContacts = contacts.filter(contact => {
        const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.message.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || contact.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleStatusChange = async (id: string, newStatus: Contact["status"]) => {
        try {
            const updatedContact = await updateContact(id, { status: newStatus });
            if (updatedContact) {
                await refreshContacts();
                toast.success("Status updated successfully!");
            } else {
                toast.error("Failed to update status");
            }
        } catch (error) {
            console.error('Error updating status:', error);
            toast.error("Failed to update status");
        }
    };

    const handleDeleteContact = async (id: string) => {
        if (confirm("Are you sure you want to delete this contact?")) {
            try {
                const success = await deleteContact(id);
                if (success) {
                    await refreshContacts();
                    toast.success("Contact deleted successfully!");
                } else {
                    toast.error("Failed to delete contact");
                }
            } catch (error) {
                console.error('Error deleting contact:', error);
                toast.error("Failed to delete contact");
            }
        }
    };

    const handleBulkDelete = async () => {
        if (selectedContacts.length === 0) {
            toast.error("Please select contacts to delete");
            return;
        }

        if (confirm(`Are you sure you want to delete ${selectedContacts.length} contacts?`)) {
            try {
                let deletedCount = 0;
                for (const id of selectedContacts) {
                    const success = await deleteContact(id);
                    if (success) {
                        deletedCount++;
                    }
                }
                await refreshContacts();
                setSelectedContacts([]);
                toast.success(`${deletedCount} contacts deleted successfully!`);
            } catch (error) {
                console.error('Error bulk deleting contacts:', error);
                toast.error("Failed to delete some contacts");
            }
        }
    };

    const handleSelectContact = (id: string) => {
        setSelectedContacts(prev =>
            prev.includes(id)
                ? prev.filter(contactId => contactId !== id)
                : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        if (selectedContacts.length === filteredContacts.length) {
            setSelectedContacts([]);
        } else {
            setSelectedContacts(filteredContacts.map(contact => contact.id));
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    const getStatusColor = (status: Contact["status"]) => {
        switch (status) {
            case "new": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
            case "read": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
            case "replied": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
            default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
        }
    };

    const exportContacts = () => {
        const escapeCSVField = (field: string, isPhone: boolean = false) => {
            // For phone numbers, always wrap in quotes and add leading apostrophe to prevent Excel scientific notation
            if (isPhone) {
                return `"'${field}"`;
            }

            if (field.includes(',') || field.includes('\n') || field.includes('"')) {
                return `"${field.replace(/"/g, '""')}"`;
            }
            return field;
        };

        const csvContent = [
            ["Name", "Email", "Phone", "Message", "Date", "Status"].map(field => escapeCSVField(field)).join(","),
            ...filteredContacts.map(contact => [
                escapeCSVField(contact.name),
                escapeCSVField(contact.email),
                escapeCSVField(contact.phone, true), // Mark as phone number
                escapeCSVField(contact.message.replace(/\n/g, " ")),
                escapeCSVField(formatDate(contact.timestamp)),
                escapeCSVField(contact.status)
            ].join(","))
        ].join("\n");

        const BOM = '\uFEFF';
        const blob = new Blob([BOM + csvContent], { type: "text/csv;charset=utf-8;" });

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `contacts_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);

        toast.success("Contacts exported successfully!");
    };

    return (
        <div className="relative overflow-hidden bg-slate-100 dark:bg-[#020617] min-h-screen">
            <div className="mx-auto max-w-7xl px-4 py-8">
                {/* Header */}
                <div className="pt-24 md:pt-36 flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            Contact Management
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Manage inquiries and messages from your portfolio
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={exportContacts}>
                            <Download className="h-4 w-4 mr-2" />
                            Export CSV
                        </Button>
                        {selectedContacts.length > 0 && (
                            <Button variant="destructive" onClick={handleBulkDelete}>
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Selected ({selectedContacts.length})
                            </Button>
                        )}
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
                            <Mail className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{contacts.length}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">New Messages</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">
                                {contacts.filter(c => c.status === "new").length}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Read</CardTitle>
                            <Eye className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">
                                {contacts.filter(c => c.status === "read").length}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Replied</CardTitle>
                            <Reply className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-purple-600">
                                {contacts.filter(c => c.status === "replied").length}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Search and Filter */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Search & Filter</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <input
                                        type="text"
                                        placeholder="Search contacts..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                            <div className="md:w-48">
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="all">All Status</option>
                                    <option value="new">New</option>
                                    <option value="read">Read</option>
                                    <option value="replied">Replied</option>
                                </select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Contacts List */}
                <div className="space-y-4">
                    {/* Select All */}
                    {filteredContacts.length > 0 && (
                        <div className="flex items-center gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <input
                                type="checkbox"
                                checked={selectedContacts.length === filteredContacts.length}
                                onChange={handleSelectAll}
                                className="rounded border-gray-300"
                            />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                Select all ({filteredContacts.length} contacts)
                            </span>
                        </div>
                    )}

                    {filteredContacts.map((contact) => (
                        <Card key={contact.id} className="hover:shadow-lg transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                    <input
                                        type="checkbox"
                                        checked={selectedContacts.includes(contact.id)}
                                        onChange={() => handleSelectContact(contact.id)}
                                        className="mt-1 rounded border-gray-300"
                                    />

                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-3">
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                    {contact.name}
                                                </h3>
                                                <Badge className={getStatusColor(contact.status)}>
                                                    {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                                    {formatDate(contact.timestamp)}
                                                </span>
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    onClick={() => handleDeleteContact(contact.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 mb-3 text-sm text-gray-600 dark:text-gray-400">
                                            <div className="flex items-center gap-1">
                                                <Mail className="h-4 w-4" />
                                                {contact.email}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Phone className="h-4 w-4" />
                                                {contact.phone}
                                            </div>
                                        </div>

                                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                                            {contact.message}
                                        </p>

                                        <div className="flex gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${contact.email}`, '_blank')}
                                            >
                                                <Mail className="h-4 w-4 mr-1" />
                                                Reply
                                            </Button>
                                            <select
                                                value={contact.status}
                                                onChange={(e) => handleStatusChange(contact.id, e.target.value as Contact["status"])}
                                                className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                            >
                                                <option value="new">Mark as New</option>
                                                <option value="read">Mark as Read</option>
                                                <option value="replied">Mark as Replied</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {filteredContacts.length === 0 && (
                        <Card className="text-center py-12">
                            <CardContent>
                                <div className="text-gray-500 dark:text-gray-400">
                                    <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                    <h3 className="text-lg font-medium mb-2">No contacts found</h3>
                                    <p>Try adjusting your search or filter criteria.</p>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}

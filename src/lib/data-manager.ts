export interface Contact {
    id: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    timestamp: string;
    status: "new" | "read" | "replied";
}

const API_BASE = '/api/contacts';

export const getContacts = async (): Promise<Contact[]> => {
    try {
        const response = await fetch(API_BASE);
        if (!response.ok) {
            throw new Error('Failed to fetch contacts');
        }
        const contacts = await response.json();
        return contacts.map((contact: any) => ({
            ...contact,
            id: contact._id || contact.id
        }));
    } catch (error) {
        console.error('Error fetching contacts:', error);
        return [];
    }
};

export const saveContacts = async (contacts: Contact[]): Promise<void> => {
    console.warn('saveContacts is deprecated in database mode');
};

export const addContact = async (contact: Omit<Contact, 'id'>): Promise<Contact> => {
    try {
        const response = await fetch(API_BASE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contact),
        });

        if (!response.ok) {
            throw new Error('Failed to add contact');
        }

        const result = await response.json();

        if (typeof window !== 'undefined') {
            import('./contact-events').then(({ contactEvents }) => {
                contactEvents.contactAdded();
            });
        }

        return result.contact;
    } catch (error) {
        console.error('Error adding contact:', error);
        throw error;
    }
};

export const updateContact = async (id: string, updates: Partial<Contact>): Promise<Contact | null> => {
    try {
        const response = await fetch(`${API_BASE}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updates),
        });

        if (!response.ok) {
            if (response.status === 404) {
                return null;
            }
            throw new Error('Failed to update contact');
        }

        const result = await response.json();

        if (typeof window !== 'undefined') {
            import('./contact-events').then(({ contactEvents }) => {
                contactEvents.contactUpdated();
            });
        }

        return result.contact;
    } catch (error) {
        console.error('Error updating contact:', error);
        throw error;
    }
};

export const deleteContact = async (id: string): Promise<boolean> => {
    try {
        const response = await fetch(`${API_BASE}/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            if (response.status === 404) {
                return false;
            }
            throw new Error('Failed to delete contact');
        }

        if (typeof window !== 'undefined') {
            import('./contact-events').then(({ contactEvents }) => {
                contactEvents.contactDeleted();
            });
        }

        return true;
    } catch (error) {
        console.error('Error deleting contact:', error);
        throw error;
    }
};
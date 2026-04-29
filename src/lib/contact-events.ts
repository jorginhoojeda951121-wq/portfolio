type ContactEventCallback = () => void;

class ContactEventManager {
    private listeners: ContactEventCallback[] = [];

    subscribe(callback: ContactEventCallback): () => void {
        this.listeners.push(callback);

        return () => {
            this.listeners = this.listeners.filter(listener => listener !== callback);
        };
    }

    notify(): void {
        this.listeners.forEach(callback => {
            try {
                callback();
            } catch (error) {
                console.error('Error in contact event callback:', error);
            }
        });
    }

    contactAdded(): void {
        this.notify();
    }

    contactUpdated(): void {
        this.notify();
    }

    contactDeleted(): void {
        this.notify();
    }
}

export const contactEvents = new ContactEventManager();

if (typeof window !== 'undefined') {
    window.addEventListener('storage', (event) => {
        if (event.key === 'portfolio_contacts' && event.newValue !== event.oldValue) {
            contactEvents.notify();
        }
    });
}
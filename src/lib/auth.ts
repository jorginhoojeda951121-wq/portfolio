const DASHBOARD_PASSWORD = process.env.NEXT_PUBLIC_DASHBOARD_PASSWORD || "admin123";
const AUTH_KEY = "portfolio_dashboard_auth";

export const isDashboardAuthenticated = (): boolean => {
    if (typeof window === 'undefined') return false;

    try {
        const authData = localStorage.getItem(AUTH_KEY);
        if (!authData) return false;

        const { password, timestamp } = JSON.parse(authData);

        const isExpired = Date.now() - timestamp > 24 * 60 * 60 * 1000;
        if (isExpired) {
            localStorage.removeItem(AUTH_KEY);
            return false;
        }

        return password === DASHBOARD_PASSWORD;
    } catch (error) {
        console.error('Auth check error:', error);
        return false;
    }
};

export const authenticateDashboard = (password: string): boolean => {
    if (password === DASHBOARD_PASSWORD) {
        const authData = {
            password,
            timestamp: Date.now()
        };
        localStorage.setItem(AUTH_KEY, JSON.stringify(authData));

        if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('authChanged'));
        }

        return true;
    }
    return false;
};

export const logoutDashboard = (): void => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(AUTH_KEY);

        window.dispatchEvent(new CustomEvent('authChanged'));
    }
};

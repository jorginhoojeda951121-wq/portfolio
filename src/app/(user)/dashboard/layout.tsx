"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isDashboardAuthenticated } from "@/lib/auth";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    // Skip auth check for login page
    const isLoginPage = pathname === "/dashboard/login";

    useEffect(() => {
        if (isLoginPage) {
            setIsLoading(false);
            return;
        }

        const checkAuth = () => {
            const authStatus = isDashboardAuthenticated();
            setIsAuthenticated(authStatus);
            setIsLoading(false);

            if (!authStatus) {
                router.push("/dashboard/login");
            }
        };

        checkAuth();
    }, [router, isLoginPage]);


    if (isLoginPage) {
        return <>{children}</>;
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="relative min-h-screen">
            {children}
        </div>
    );
}

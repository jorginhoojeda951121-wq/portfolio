import DashboardStats from "@/components/DashboardStats/DashboardStats";
import ContactAnalyticsChart from "@/components/ProjectsChart/ContactAnalyticsChart";
import ContactTrendChart from "@/components/ProjectsChart/ContactTrendChart";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const DashboardPage = async () => {

  return (
    <div className="relative overflow-hidden bg-slate-100 dark:bg-[#020617] ">
      <div className="mx-auto max-w-7xl px-2 ">
        <div className="pt-24 md:pt-36 flex justify-between items-center">
          <h2 className="lg:text-3xl font-bold">Dashboard</h2>
          <Link href="/dashboard/contacts">
            <Button className="rounded-lg" variant={"outline"}>
              Manage Contacts
            </Button>
          </Link>
        </div>

        <div className="flex flex-col gap-y-10 pb-10">
          <DashboardStats />
          <div className="flex  gap-x-5 pb-10">
            <ContactAnalyticsChart />
            <ContactTrendChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

"use client"

import { useLeads } from "@/contexts/LeadsContext"
import Tables from "../../components/Table";
import SideBar from '../../components/SideBar';

export default function Home() {
  const { leads, loading } = useLeads();

  return (
    <div className="h-screen w-full bg-zinc-50 dark:bg-black font-sans p-6 flex gap-4">
      <SideBar />
      <div className="w-[80%]  flex  gap-4 relative">
        {!loading && leads && <Tables leads={leads} />}
        {loading && <p>Loading...</p>}
      </div>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react";
import Tables from "../../components/Table";
import SideBar from '../../components/SideBar';


interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  status: string;
  source: string;
  created_at: string;
  updated_at: string;
}

export default function Home() {
  const [leads, setLeads] = useState<Lead[] | undefined>(undefined);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await fetch('http://localhost:5000/leads');
        const data = await response.json();
        // console.log(data)
        setLeads(data);
      } catch (error) {
        console.error('Error fetching leads:', error);

      }
    };

    fetchLeads();
  }, []);

  return (
    <div className="h-screen w-full bg-zinc-50 dark:bg-black font-sans p-6 flex gap-4">
      <SideBar setLeads={setLeads}  />
      <div className="w-[80%]  flex  gap-4 relative">
        {leads && <Tables leads={leads} />}
        {!leads && <p>Loading...</p>}
      </div>
    </div>
  )
}

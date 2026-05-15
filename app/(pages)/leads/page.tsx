"use client"

import { useEffect, useState } from "react";
import Tables from "../../components/Table";


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
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans p-6">
      <div className="max-w-7xl mx-auto">
        {leads && <Tables leads={leads} />}
        {!leads && <p>Loading...</p>}
      </div>
    </div>
  )
}

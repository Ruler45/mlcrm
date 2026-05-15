"use client"

import { useEffect, useState } from "react";


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
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await fetch('http://localhost:5000/leads');
        const data = await response.json();
        setLeads(data);
      } catch (error) {
        console.error('Error fetching leads:', error);
      }
    };

    fetchLeads();
  }, []);
  
  return (
    <div className="flex  items-center justify-center bg-zinc-50 font-sans dark:bg-black  h-full">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Source</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td>{lead.phone}</td>
              <td>{lead.status}</td>
              <td>{lead.source}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>)
}

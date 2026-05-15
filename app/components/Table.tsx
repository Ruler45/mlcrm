"use client"

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

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

const statusClasses: Record<string, string> = {
  NEW: 'bg-emerald-100 text-emerald-800',
  CONTACTED: 'bg-yellow-100 text-yellow-800',
  QUALIFIED: 'bg-indigo-100 text-indigo-800',
  CONVERTED: 'bg-emerald-100 text-emerald-800',
  LOST: 'bg-red-100 text-red-800',
};

const bgColors = [
  'bg-red-400',
  'bg-orange-400',
  'bg-amber-400',
  'bg-emerald-400',
  'bg-indigo-400',
  'bg-purple-400',
];

function initials(name: string) {
  const parts = name.split(' ').filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function colorFor(name: string) {
  const code = name.split('').reduce((s, c) => s + c.charCodeAt(0), 0);
  return bgColors[code % bgColors.length];
}

interface status{
    All: string,
    NEW: string,
    CONTACTED: string,
    QUALIFIED: string,
    CONVERTED: string,
    LOST: string
}

const Tables = ({ leads }: { leads: Lead[] }) => {
    const [filteredLeads, setFilteredLeads] = useState<Lead[]>(leads);
    const [filter,setFilter]= useState<keyof status>('All')
    console.log(filteredLeads);
    useEffect(()=>{
        setFilteredLeads(leads);
    },[leads]);

    useEffect(()=>{
        setFilteredLeads(leads.filter(lead => lead.status === filter || filter === 'All'));
    },[filter])
    
  return (
    <div className="overflow-x-auto bg-white dark:bg-black rounded-md shadow-sm">
      <table className="min-w-full table-auto">
        <thead className="bg-white dark:bg-zinc-900">
          <tr className="text-sm text-left text-gray-500 border-b">
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Mobile</th>
            <th className="px-4 py-3">Last Updated</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Source</th>
            <th className="px-4 py-3">Status
                <span className="px-3">
                   (
                    <select name="status" id="status" className="bg-transparent border-none focus:ring-0" onChange={(e)=>{
                        setFilter(e.target.value as keyof status);
                    }}>
                      <option value="All">All</option>
                      <option value="NEW">New</option>
                      <option value="CONTACTED">Contacted</option>
                      <option value="QUALIFIED">Qualified</option>
                      <option value="CONVERTED">Converted</option>
                      <option value="LOST">Lost</option>
                    </select>
                   )
                </span>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredLeads.map((lead) => (
            <tr key={lead.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800">
              <td className="px-4 py-3 align-top">
                <div className="flex items-center">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold mr-3 ${colorFor(lead.name)}`}>
                    {initials(lead.name)}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">{lead.name}</div>
                    <div className="text-xs text-gray-400 truncate">{lead.email}</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 align-top">
                <span className="bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-xs">{lead.phone}</span>
              </td>
              <td className="px-4 py-3 align-top text-sm text-gray-600">{`${new Date(lead.updated_at).toLocaleDateString("ddmmyyyy")}`}</td>
              <td className="px-4 py-3 align-top text-sm text-gray-600">{lead.email}</td>
              <td className="px-4 py-3 align-top">
                <span className="bg-pink-100 text-pink-800 rounded-full px-3 py-1 text-sm">{lead.source}</span>
              </td>
              <td className="px-4 py-3 align-top">
                <span className={`rounded-full px-3 py-1 text-sm ${statusClasses[lead.status] || 'bg-gray-100 text-gray-700'}`}>
                  {lead.status}
                </span>
              </td>
              <td className="flex flex-wrap gap-2 items-center px-4 py-3 align-top">
                <Button variant="outline" size="sm">
                  View
                </Button>
                <EditModal />
                <DeleteModal lead={lead} />

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Tables;
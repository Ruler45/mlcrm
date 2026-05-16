"use client"

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import Link from "next/link";

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
    // console.log(filteredLeads);
    useEffect(()=>{
        setFilteredLeads(leads);
    },[leads]);

    useEffect(()=>{
        if (leads && leads.length > 0) {
            setFilteredLeads(leads.filter(lead => lead.status === filter || filter === 'All'));
        } else {
            setFilteredLeads([]);
        }
    },[filter, leads])
    
  return (
    <div className="overflow-x-auto bg-white dark:bg-black rounded-md shadow-lg w-full">
      <table className="min-w-full  h-fit">
        <thead className="sticky top-0 z-10  bg-gray-100 dark:from-zinc-800 dark:to-zinc-900 border-b-2 border-gray-200 dark:border-zinc-700 backdrop-blur-sm">
          <tr className="text-sm text-left text-gray-700 dark:text-gray-300 font-semibold">
            <th className="px-4 py-4">Name</th>
            <th className="px-4 py-4">Mobile</th>
            <th className="px-4 py-4">Last Updated</th>
            <th className="px-4 py-4">Email</th>
            <th className="px-4 py-4">Source</th>
            <th className="px-4 py-4">Status
                <span className="px-3 font-normal">
                   (
                    <select name="status" id="status" className="bg-transparent border-none focus:ring-0 text-gray-600 dark:text-gray-400" onChange={(e)=>{
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
            <th className="px-4 py-4">Actions</th>
          </tr>
        </thead>
        <tbody className="overflow-y-scroll ">
          {filteredLeads.length > 0 ? (
            filteredLeads?.map((lead) => (
              <tr key={lead.id} className="border-b h-fit border-gray-100 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors duration-150">
                <td className="px-4 py-4 align-top">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0 shadow-sm ${colorFor(lead.name)}`}>
                      {initials(lead.name)}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{lead.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{lead.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 align-top">
                  <span className="bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 rounded-full px-3 py-1 text-xs font-medium">{lead.phone || '—'}</span>
                </td>
                <td className="px-4 py-4 align-top text-sm text-gray-600 dark:text-gray-400">{`${new Date(lead.updated_at).toLocaleDateString("en-US")}`}</td>
                <td className="px-4 py-4 align-top text-sm text-gray-600 dark:text-gray-400 truncate">{lead.email}</td>
                <td className="px-4 py-4 align-top">
                  <span className="bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300 rounded-full px-3 py-1 text-xs font-medium">{lead.source}</span>
                </td>
                <td className="px-4 py-4 align-top">
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusClasses[lead.status] || 'bg-gray-100 text-gray-700'}`}>
                    {lead.status}
                  </span>
                </td>
                <td className="flex flex-wrap gap-2 items-center px-4 py-4 align-top">
                  <Link href={`/leads/${lead.id}`}>
                    <Button variant="outline" size="sm" className="hover:bg-blue-50 dark:hover:bg-blue-900/20">
                      View
                    </Button>
                  </Link>
                  <EditModal lead={lead} />
                  <DeleteModal lead={lead} />

              </td>
            </tr>
          ))) : (
            <tr>
              <td className="px-4 py-3" colSpan={7}>
                No leads found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Tables;
"use client"

import { useEffect, useState } from "react";
import Tables from "./components/Table";


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
  
  
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans p-6 flex items-center justify-center">
      <div className="max-w-7xl mx-auto text-7xl">
        Welcome Home
      </div>
    </div>
  )
}

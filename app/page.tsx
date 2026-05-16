"use client"

import { Button } from "@/components/ui/button";
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

export default function Home() {
  
  
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans p-6 flex flex-col gap-6 items-center justify-center">
      <div className="max-w-7xl mx-auto text-5xl">
        Welcome Home to MLCRM
      </div>
      <Link href="/leads">
        <Button>
          Checkout the Leads
        </Button>
      </Link>
    </div>
  )
}

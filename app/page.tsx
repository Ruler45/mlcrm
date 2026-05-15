"use client"

import Image from "next/image";
import SidebarIcon from '@iconify-react/mynaui/sidebar';
import { useState } from "react";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  return (
    <div className="flex flex-col flex-1 relative items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <nav className="flex items-center absolute right-0 top-0 justify-between max-w-full w-[95%]  py-6 mb-12">
        <div className="flex items-center">
          <Image
            src="/logo.png"
            alt="Logo"
            width={32}
            height={32}
            className="mr-2"
          />
          <span className="font-bold text-lg">MyApp</span>
        </div>
      </nav>
      <main className="flex flex-1 w-full flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
       
      </main>
      {isSidebarOpen && (
        <aside  className="w-[5%] h-full absolute bottom-0 left-0 flex items-center justify-center bg-zinc-200 dark:bg-zinc-800">
          <span className="w-full h-full relative">
            <SidebarIcon 
              className="top-0 right-0 m-2 absolute hover:cursor-pointer hover:bg-black "  
              height="2em" 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            />
          </span>
        </aside>
      )}
    </div>
  );
}

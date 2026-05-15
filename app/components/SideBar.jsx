import CreateLead from "./CreateLead";
import Search from "./SearchTab";
import { LayoutDashboard, Settings, LogOut } from "lucide-react";

const SideBar = () => {
   
    return ( 
        <div className="w-64 h-full bg-gradient-to-b from-white to-gray-50 dark:from-zinc-950 dark:to-zinc-900 flex flex-col items-center justify-between p-6 border-r border-gray-200 dark:border-zinc-800 shadow-md">
            <div className="w-full flex flex-col items-center gap-8">
                {/* Logo Section */}
                <div className="w-full flex flex-col items-center gap-4">
                    <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-md">
                        <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
                            <span className="text-blue-600 font-black text-lg">M</span>
                        </div>
                        <h1 className="text-xl font-black tracking-tight text-white">MLCRM</h1>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Lead Management System</p>
                </div>
                
                <div className="w-full flex flex-col gap-6">
                    {/* Actions Section */}
                    <div className="space-y-3">
                        <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider px-3">Quick Actions</label>
                        <div className="space-y-2">
                            <Search />
                            <CreateLead/>
                        </div>
                    </div>

                    {/* Navigation Menu */}
                    <nav className="space-y-1">
                        <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider px-3">Navigation</label>
                        <div className="space-y-1">
                            <div className="flex items-center gap-3 px-3 py-3 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-lg cursor-pointer transition-all hover:bg-blue-100 dark:hover:bg-blue-900/30 shadow-sm">
                                <LayoutDashboard className="w-4 h-4" />
                                <span>Leads</span>
                            </div>
                            <div className="flex items-center gap-3 px-3 py-3 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg cursor-pointer transition-all group">
                                <Settings className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                                <span>Settings</span>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>

            {/* User Profile Section */}
            <div className="w-full space-y-3">
                <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-zinc-700"></div>
                <div className="px-3 py-3 bg-gradient-to-r from-gray-50 to-white dark:from-zinc-900 dark:to-zinc-950 rounded-lg border border-gray-100 dark:border-zinc-800">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 shadow-md flex items-center justify-center text-white font-bold text-sm">A</div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">Admin User</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Premium Plan</p>
                        </div>
                    </div>
                </div>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all">
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                </button>
            </div>
        </div>
     );
}
 
export default SideBar;
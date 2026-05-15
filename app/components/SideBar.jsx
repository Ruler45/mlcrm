import CreateLead from "./CreateLead";
import Search from "./SearchTab";

const SideBar = ({setLeads}) => {
   
    return ( 
        <div className="w-64 h-full bg-white dark:bg-zinc-950 flex flex-col items-center justify-between p-8 border-r border-gray-200 dark:border-zinc-800 shadow-sm">
            <div className="w-full flex flex-col items-center gap-8">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold">M</span>
                    </div>
                    <h1 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">MLCRM</h1>
                </div>
                
                <div className="w-full flex flex-col gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-1">Actions</label>
                        <Search setLeads={setLeads} />
                        <CreateLead/>   
                    </div>

                    <nav className="space-y-1">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-1">Menu</label>
                        <div className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 dark:bg-blue-900/20 rounded-md cursor-pointer transition-all">
                            <span>Leads</span>
                        </div>
                        <div className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-md cursor-pointer transition-all">
                            <span>Settings</span>
                        </div>
                    </nav>
                </div>
            </div>

            <div className="w-full pt-6 border-t border-gray-100 dark:border-zinc-900">
                <div className="flex items-center gap-3 px-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 shadow-sm" />
                    <div className="flex flex-col">
                        <span className="text-sm font-medium dark:text-gray-200">Admin User</span>
                        <span className="text-xs text-gray-500">Premium Plan</span>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default SideBar;
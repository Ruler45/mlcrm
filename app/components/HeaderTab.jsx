import CreateLead from "./CreateLead";
import Search from "./SearchTab";

const Header = ({setLeads}) => {
   
    return ( 
        <div className="w-60 h-2/3 bg-gray-100 dark:bg-gray-800  flex  flex-col items-center justify-between p-6 shadow-2xl ">
            <h1 className="text-xl font-bold text-gray-800 dark:text-white ">MLCRM</h1>
            <div className="flex gap-4 flex-col h-1/2">
                <Search setLeads={setLeads} />
                <CreateLead/>   
            </div>
            
        </div>
     );
}
 
export default Header;
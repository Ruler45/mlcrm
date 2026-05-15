import { Button } from "@/components/ui/button";
import { Input } from "@base-ui/react";
import { useState } from "react";
import { toast } from "sonner";

const Search = ({setLeads}) => {
    const [searchPara,setSearchPara]=useState("");
     const handleSearch=async (e)=>{
        if(e.key!=="Enter") return;
        e.preventDefault();
        try {
            const data= await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leads?q=${searchPara}`).then(res=>res.json());
            console.log("Search result",data);
            setLeads(data);
        } catch (error) {
            console.error("Error fetching search results:", error);
            toast.error("Failed to fetch search results. Please try again.");
        }

    }
    return ( 
        <div className="flex items-center p-2 rounded-md bg-gray-200 dark:bg-gray-700">
            <Input placeholder="Press Enter to Search..." onKeyDown={handleSearch}  onChange={(e) => setSearchPara(e.target.value)} /> 
        </div>
     );
}
 
export default Search;
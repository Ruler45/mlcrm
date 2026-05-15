import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useLeads } from "@/contexts/LeadsContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";



const STATUSES = ['NEW', 'CONTACTED', 'QUALIFIED', 'CONVERTED', 'LOST'];
const SOURCES = ['website', 'referral', 'campaign', 'cold-outreach', 'event'];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CreateLead = () => {
  const { addLead } = useLeads();
  
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] =useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [source,setSource] = useState<string>("");
  const [valid,setValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(()=>{
    if(name !=="" && EMAIL_RE.test(email)){
      setValid(true);
    }else{
      setValid(false);
    }
  },[name,email])


  const handleSave = async () => {
    setLoading(true);
    const lead = {
      name,
      email,
      phone,
      status,
      source
    };
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leads`, {  
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(lead),
      });
      if (!response.ok) {
        throw new Error('Failed to save lead');
      }
      const newLead = await response.json();
      addLead(newLead);
      toast.success('Lead created successfully');
      setName("");
      setEmail("");
      setPhone("");
      setStatus("");
      setSource("");
      setOpen(false);
    } catch (error) {
      console.error('Error create lead:', error);
      toast.error('Failed to create lead');
    }
    finally {
      setLoading(false);
    }
  };

    return ( 
        <>
        <button 
          onClick={() => setOpen(true)}
          className="bg-green-500 text-white text-xl  p-4 rounded-md font-medium hover:bg-green-600 transition-colors"
        >
          Add Lead
        </button>
        <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
            <label htmlFor="name">Name</label>
            <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
            <label htmlFor="email">Email</label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <label htmlFor="phone">Phone</label>
            <Input id="phone" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <label htmlFor="status">Status</label>
            <Select  value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-45">
                <SelectValue placeholder={"NEW"} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {
                    STATUSES?.map(status => (
                      <SelectItem key={status} value={status} >{status}</SelectItem>
                    ))
                  }
                </SelectGroup>
              </SelectContent>
            </Select>
            <label htmlFor="source">Source</label>
            <Select  value={source} onValueChange={setSource}>
              <SelectTrigger className="w-45">
                <SelectValue placeholder={"website"} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {
                    SOURCES?.map(source => (
                      <SelectItem key={source} value={source} >{source}</SelectItem>
                    ))
                  }
                </SelectGroup>
              </SelectContent>
            </Select>
            <DialogFooter>
                <Button disabled={!valid} type={"submit"} variant="outline" size="sm"  className="bg-blue-500 text-white" onClick={handleSave}>
                  {loading ? "Saving..." : "Save Lead"}
                </Button>
            </DialogFooter>
        </DialogContent>
        </Dialog>
        </>
     );
}
 
export default CreateLead;
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useLeads } from "@/contexts/LeadsContext";

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

const TRANSITIONS = {
  NEW:       ['CONTACTED', 'LOST'],
  CONTACTED: ['QUALIFIED', 'LOST'],
  QUALIFIED: ['CONVERTED', 'LOST'],
  CONVERTED: [],
  LOST:      [],
};

const EditModal = ({ lead }: { lead: Lead }) => {
  const { updateLead } = useLeads();
  
  const [name, setName] = useState(lead.name);
  const [email, setEmail] = useState(lead.email);
  const [phone, setPhone] = useState(lead.phone || '');
  const [status, setStatus] = useState(lead.status);
  const [changingLead, setChangingLead] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (status !== lead.status || name !== lead.name || email !== lead.email || phone !== (lead.phone || '')) {
      setChangingLead(true);
    } else {
      setChangingLead(false);
    }
  }, [status, name, email, phone, lead]);

  const handleSave = async () => {
    setLoading(true);
    const updatedLead = {
      name,
      email,
      phone,
      status,
    };
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leads/${lead.id}`, {  
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedLead),
      });
      if (!response.ok) {
        throw new Error('Failed to update lead');
      }
      updateLead(lead.id, updatedLead);
      toast.success('Lead updated successfully');
      setOpen(false);
    } catch (error) {
      console.error('Error updating lead:', error);
      toast.error('Failed to update lead');
    }
    finally {
      setLoading(false);
    }
  };

    return ( 
        <>
        <button 
          onClick={() => setOpen(true)}
          className="px-3 py-1 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-zinc-800 transition-colors"
        >
          Edit
        </button>
        <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
            <label htmlFor="name">Name</label>
            <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <label htmlFor="email">Email</label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="phone">Phone</label>
            <Input id="phone" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <label htmlFor="status">Status</label>
            <Select disabled={lead.status==="LOST" || lead.status === "CONVERTED"} value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-45">
                <SelectValue placeholder={lead.status} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {
                    TRANSITIONS[lead.status]?.map(status => (
                      <SelectItem key={status} value={status} >{status}</SelectItem>
                    ))
                  }
                </SelectGroup>
              </SelectContent>
            </Select>
            <DialogFooter>
                <Button variant="outline" size="sm" disabled={!changingLead || loading} className="bg-blue-500 text-white" onClick={handleSave}>
                  {loading ? "Saving..." : "Save changes"}
                </Button>
            </DialogFooter>
        </DialogContent>
        </Dialog>
        </>
     );
}
 
export default EditModal;
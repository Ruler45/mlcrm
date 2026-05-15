import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
  
  const [name, setName] = useState(lead.name);
  const [email, setEmail] = useState(lead.email);
  const [phone, setPhone] = useState(lead.phone || '');
  const [status, setStatus] = useState(lead.status);
  const [changingLead, setChangingLead] = useState(false);
  const [loading, setLoading] = useState(false);

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
      const response = await fetch(`http://localhost:5000/leads/${lead.id}`, {  
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedLead),
      });
      if (!response.ok) {
        throw new Error('Failed to update lead');
      }
      toast.success('Lead updated successfully');
      await new Promise((resolve) => setTimeout(resolve, 2000));
      window.location.reload();
      // can be handled better by updating the lead in the state instead of refreshing the page but this is a quick solution for now
      // will implement better state management in the future
    } catch (error) {
      console.error('Error updating lead:', error);
      toast.error('Failed to update lead');
    }
    finally {
      setLoading(false);
    }
  };

    return ( 
        <Dialog>
        <DialogTrigger>
                <Button size="sm">
                  Edit
                </Button>
                </DialogTrigger>
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
     );
}
 
export default EditModal;
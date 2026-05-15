import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
    return ( 
        <Dialog>
        <DialogTrigger>
                <Button size="sm">
                  Edit
                </Button>
                </DialogTrigger>
        <DialogContent>
            <label htmlFor="name">Name</label>
            <Input id="name" type="text" defaultValue={lead.name} />
            <label htmlFor="email">Email</label>
            <Input id="email" type="email" defaultValue={lead.email} />
            <label htmlFor="phone">Phone</label>
            <Input id="phone" type="text" defaultValue={lead.phone || ''} />
            <label htmlFor="status">Status</label>
            <Select>
              <SelectTrigger className="w-45">
                <SelectValue placeholder={lead.status} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {
                    TRANSITIONS[lead.status]?.map(status => (
                      <SelectItem key={status} value={status} disabled={status==="LOST" || status === "CONVERTED"}>{status}</SelectItem>
                    ))
                  }
                </SelectGroup>
              </SelectContent>
            </Select>
        </DialogContent>
        </Dialog>
     );
}
 
export default EditModal;
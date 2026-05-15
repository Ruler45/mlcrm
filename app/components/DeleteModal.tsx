import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

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

const DeleteModal = ({ lead }: { lead: Lead }) => {
  const [loading, setLoading] = useState(false);
    const handleDelete = async () => {
      setLoading(true);
        console.log(`Deleting lead with id: ${lead.id}`);
        const response = await fetch(`http://localhost:5000/leads/${lead.id}`, {
          method: 'DELETE',
        });
        console.log(response);
        if (response.status === 204) {
          toast.success("Successfully deleted lead.Please wait while we refresh the page.");
          // can be handled better by removing the lead from the state instead of refreshing the page but this is a quick solution for now
          // will implement better state management in the future
          await new Promise((resolve) => setTimeout(resolve, 2000));
          window.location.reload();
        } else {          
          console.error('Failed to delete lead');
          toast.error("Failed to delete lead.");
        }
        setLoading(false);
    }
    return ( 
        <Dialog>
        <DialogTrigger>
                <Button size="sm" variant="destructive">
                  Delete
                </Button>
                </DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
            </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button disabled={loading} variant="destructive" size="sm" onClick={handleDelete}>

                  {loading ? (
                    <>
                      <Spinner /> 
                        <span className="ml-2">Processing...</span>
                      </>
                      ) : (
                        "Confirm"
                  )}
                </Button>
            </DialogFooter>
        </DialogContent>
        </Dialog>
     );
}
 
export default DeleteModal;
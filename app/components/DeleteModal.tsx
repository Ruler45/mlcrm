import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
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

const DeleteModal = ({ lead }: { lead: Lead }) => {
  const { deleteLead } = useLeads();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leads/${lead.id}`, {
        method: 'DELETE',
      });
      if (response.status === 204) {
        deleteLead(lead.id);
        toast.success("Lead deleted successfully");
        setOpen(false);
      } else {
        console.error('Failed to delete lead');
        toast.error("Failed to delete lead.");
      }
    } catch (error) {
      console.error('Error deleting lead:', error);
      toast.error("Failed to delete lead.");
    } finally {
      setLoading(false);
    }
  }
    return ( 
        <>
        <button 
          onClick={() => setOpen(true)}
          className="px-3 py-1 text-sm font-medium rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors"
        >
          Delete
        </button>
        <Dialog open={open} onOpenChange={setOpen}>
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
        </>
     );
}
 
export default DeleteModal;
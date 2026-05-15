"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

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
const LeadPage = ({}: {params: {id: string}}) => {
    const {id}=useParams();
    const [lead, setLead] = useState<Lead | null>(null);
    useEffect(() => {
        const fetchLead = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leads/${id}`);
                const data = await response.json();
                setLead(data);
                // console.log("Lead is:",data);
            } catch (error) {
                console.error('Error fetching lead:', error);
            }
        };
        fetchLead();
    }, [id]);
    return ( 
        <div>
            <h1>Lead Details</h1>
            {lead && (
                <div>
                    <p><strong>Name:</strong> {lead.name}</p>
                    <p><strong>Email:</strong> {lead.email}</p>
                    <p><strong>Phone:</strong> {lead.phone || 'N/A'}</p>
                    <p><strong>Status:</strong> {lead.status}</p>
                    <p><strong>Source:</strong> {lead.source}</p>
                </div>
            )}
        </div>
     );
}

 
export default LeadPage;
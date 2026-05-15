"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Phone, Calendar, Globe, Tag } from "lucide-react";
import EditModal from "@/app/components/EditModal";

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

const statusClasses: Record<string, string> = {
    NEW: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
    CONTACTED: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    QUALIFIED: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400',
    CONVERTED: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
    LOST: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
};

const LeadPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const [lead, setLead] = useState<Lead | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLead = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leads/${id}`);
                const data = await response.json();
                setLead(data);
            } catch (error) {
                console.error('Error fetching lead:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchLead();
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!lead) {
        return (
            <div className="p-8 text-center">
                <h2 className="text-xl font-semibold">Lead not found</h2>
                <Button onClick={() => router.back()} variant="link">Go back</Button>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-6">
            <button 
                onClick={() => router.back()}
                className="flex items-center text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Leads
            </button>

            <div className="bg-white dark:bg-zinc-950 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-800 overflow-hidden">
                {/* Header Section */}
                <div className="p-8 border-b border-gray-100 dark:border-zinc-900 bg-gray-50/50 dark:bg-zinc-900/50">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                                {lead.name.charAt(0)}
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white uppercase tracking-tight">{lead.name}</h1>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusClasses[lead.status] || 'bg-gray-100 text-gray-700'}`}>
                                        {lead.status}
                                    </span>
                                    <span className="text-sm text-gray-500">ID: {lead.id}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <EditModal lead={lead} />
                            <Button variant="outline">Schedule Call</Button>
                        </div>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Contact Information</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Email Address</p>
                                    <p className="text-sm font-medium">{lead.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600">
                                    <Phone className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Phone Number</p>
                                    <p className="text-sm font-medium">{lead.phone || 'Not provided'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Lead Source & Activity</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600">
                                    <Globe className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Source</p>
                                    <div className="flex items-center gap-2">
                                        <Tag className="w-3 h-3 text-gray-400" />
                                        <p className="text-sm font-medium">{lead.source}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                <div className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-600">
                                    <Calendar className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Last Updated</p>
                                    <p className="text-sm font-medium">{new Date(lead.updated_at).toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Section (optional metadata) */}
                <div className="px-8 py-4 bg-gray-50 dark:bg-zinc-900/30 border-t border-gray-100 dark:border-zinc-900 flex justify-between items-center">
                    <span className="text-xs text-gray-500">Created: {new Date(lead.created_at).toLocaleDateString()}</span>
                    <Button variant="ghost" size="sm" className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20">
                        Archive Lead
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default LeadPage;
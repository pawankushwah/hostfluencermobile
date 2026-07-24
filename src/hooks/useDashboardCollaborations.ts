import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface ActiveCollaborationItem {
    id: string;
    title: string;
    location: string;
    imageUrl: string | null;
    statusLabel: string;
    daysLeftText: string;
    milestoneCurrent: number;
    milestoneTotal: number;
    progressPercentage: number;
}

export interface UpcomingStayItem {
    id: string;
    month: string;
    day: string;
    title: string;
    location: string;
    hostName: string;
    hostInitial: string;
    statusText: string;
}

export function useDashboardCollaborations() {
    const [activeCollaborations, setActiveCollaborations] = useState<ActiveCollaborationItem[]>([]);
    const [upcomingStays, setUpcomingStays] = useState<UpcomingStayItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [reloadKey, setReloadKey] = useState(0);

    useEffect(() => {
        let isSubscribed = true;

        async function fetchCollaborations() {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) {
                    if (isSubscribed) setLoading(false);
                    return;
                }

                const { data: colData } = await supabase
                    .from('collaboration_agreements')
                    .select(`
                        id, status, deliverable_count, created_at,
                        application:applications(
                            proposed_dates_start, proposed_dates_end,
                            property:properties(
                                id, title, location,
                                property_images(image_url, is_primary)
                            )
                        )
                    `)
                    .eq('influencer_id', user.id)
                    .order('created_at', { ascending: false });

                const activeItems: ActiveCollaborationItem[] = [];
                const upcomingItems: UpcomingStayItem[] = [];

                if (colData && colData.length > 0) {
                    colData.forEach((row: any) => {
                        const app = row.application;
                        const property = app?.property;
                        const images = property?.property_images || [];
                        const primary = images.find((i: any) => i.is_primary) || images[0];

                        const propTitle = property?.title || 'Boutique Property';
                        const propLocation = property?.location || 'Location';
                        const imgUrl = primary?.image_url || null;

                        if (row.status === 'active') {
                            activeItems.push({
                                id: row.id,
                                title: propTitle,
                                location: propLocation,
                                imageUrl: imgUrl,
                                statusLabel: 'In progress',
                                daysLeftText: 'Active',
                                milestoneCurrent: 1,
                                milestoneTotal: row.deliverable_count || 3,
                                progressPercentage: 33.3,
                            });
                        }

                        if (app?.proposed_dates_start) {
                            const startDate = new Date(app.proposed_dates_start);
                            const monthStr = startDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
                            const dayStr = String(startDate.getDate()).padStart(2, '0');

                            const today = new Date();
                            const diffTime = startDate.getTime() - today.getTime();
                            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                            upcomingItems.push({
                                id: row.id,
                                month: monthStr,
                                day: dayStr,
                                title: propTitle,
                                location: propLocation,
                                hostName: 'Host',
                                hostInitial: 'H',
                                statusText: diffDays > 0 ? `In ${diffDays} Days` : 'Starts Soon',
                            });
                        }
                    });
                }

                if (isSubscribed) {
                    setActiveCollaborations(activeItems);
                    setUpcomingStays(upcomingItems);
                }
            } catch (err) {
                console.error('Error fetching collaborations:', err);
            } finally {
                if (isSubscribed) setLoading(false);
            }
        }

        void fetchCollaborations();

        return () => {
            isSubscribed = false;
        };
    }, [reloadKey]);

    const refetch = async () => {
        setReloadKey(k => k + 1);
    };

    return {
        activeCollaborations,
        upcomingStays,
        loading,
        refetch,
    };
}

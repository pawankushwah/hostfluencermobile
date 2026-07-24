import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface UserProfile {
    id: string;
    first_name: string | null;
    last_name: string | null;
    profile_photo_url: string | null;
    user_type: string | null;
}

export interface UserPointsData {
    total_points: number;
    current_level: string;
    level_progress: number;
    points_to_next_level: number;
}

export interface PriorityItem {
    id: string;
    title: string;
    description: string;
    badgeText: string;
    badgeColor: string;
    badgeBgColor: string;
    iconName: string;
    iconColor: string;
    actionText: string;
    actionType: 'filled' | 'outline';
}

export interface MessageItem {
    id: string;
    senderName: string;
    senderInitial: string;
    preview: string;
    timeText: string;
    unreadCount?: number;
    isRead?: boolean;
}

export interface DeliverableItem {
    id: string;
    title: string;
    progressText: string;
    percentage: number;
}

export interface SavedOpportunityItem {
    id: string;
    title: string;
    location: string;
}

export interface DashboardMetrics {
    applicationsCount: number;
    activeCollaborationsCount: number;
    pendingCount: number;
}

export function useDashboardData() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [points, setPoints] = useState<UserPointsData | null>(null);
    const [metrics, setMetrics] = useState<DashboardMetrics>({
        applicationsCount: 0,
        activeCollaborationsCount: 0,
        pendingCount: 0,
    });
    const [priorities, setPriorities] = useState<PriorityItem[]>([]);
    const [messagesList, setMessagesList] = useState<MessageItem[]>([]);
    const [deliverablesList, setDeliverablesList] = useState<DeliverableItem[]>([]);
    const [savedOpportunitiesList, setSavedOpportunitiesList] = useState<SavedOpportunityItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [reloadKey, setReloadKey] = useState(0);

    useEffect(() => {
        let isSubscribed = true;

        async function fetchDashboard() {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) {
                    if (isSubscribed) {
                        setLoading(false);
                        setRefreshing(false);
                    }
                    return;
                }

                const metaFirstName = user.user_metadata?.first_name || '';
                const metaLastName = user.user_metadata?.last_name || '';

                const { data: profileData } = await supabase
                    .from('profiles')
                    .select('id, first_name, last_name, profile_photo_url, user_type')
                    .eq('id', user.id)
                    .maybeSingle();

                const currentProfile: UserProfile = {
                    id: user.id,
                    first_name: profileData?.first_name || metaFirstName || 'User',
                    last_name: profileData?.last_name || metaLastName || '',
                    profile_photo_url: profileData?.profile_photo_url || null,
                    user_type: profileData?.user_type || 'influencer',
                };

                const { data: pointsData } = await supabase
                    .from('user_points')
                    .select('total_points, current_level, level_progress, points_to_next_level')
                    .eq('user_id', user.id)
                    .maybeSingle();

                const currentPoints: UserPointsData = pointsData ? {
                    total_points: pointsData.total_points || 0,
                    current_level: pointsData.current_level || 'Seedling',
                    level_progress: pointsData.level_progress || 0,
                    points_to_next_level: pointsData.points_to_next_level || 500,
                } : {
                    total_points: 0,
                    current_level: 'Seedling',
                    level_progress: 0,
                    points_to_next_level: 500,
                };

                const { count: totalApps } = await supabase
                    .from('applications')
                    .select('id', { count: 'exact', head: true })
                    .eq('influencer_id', user.id);

                const { count: pendingApps } = await supabase
                    .from('applications')
                    .select('id', { count: 'exact', head: true })
                    .eq('influencer_id', user.id)
                    .eq('status', 'pending');

                const { count: activeCollabs } = await supabase
                    .from('collaboration_agreements')
                    .select('id', { count: 'exact', head: true })
                    .eq('influencer_id', user.id)
                    .eq('status', 'active');

                const { data: recentApps } = await supabase
                    .from('applications')
                    .select('id, status, created_at, properties(title)')
                    .eq('influencer_id', user.id)
                    .order('created_at', { ascending: false })
                    .limit(5);

                const dynamicPriorities: PriorityItem[] = [];
                if (recentApps && recentApps.length > 0) {
                    recentApps.forEach(app => {
                        const propTitle = (app.properties as any)?.title || 'Stay Property';
                        if (app.status === 'accepted') {
                            dynamicPriorities.push({
                                id: app.id,
                                title: 'Contract ready',
                                description: `${propTitle} stay contract`,
                                badgeText: 'NEW',
                                badgeColor: '#0E7A57',
                                badgeBgColor: '#EBF5F0',
                                iconName: 'file-text',
                                iconColor: '#0E7A57',
                                actionText: 'View',
                                actionType: 'outline',
                            });
                        } else if (app.status === 'pending') {
                            dynamicPriorities.push({
                                id: app.id,
                                title: 'Application pending',
                                description: `Awaiting response for ${propTitle}`,
                                badgeText: 'PENDING',
                                badgeColor: '#E7B25C',
                                badgeBgColor: '#FAF2E6',
                                iconName: 'clock',
                                iconColor: '#E7B25C',
                                actionText: 'Status',
                                actionType: 'outline',
                            });
                        }
                    });
                }

                if (isSubscribed) {
                    setProfile(currentProfile);
                    setPoints(currentPoints);
                    setMetrics({
                        applicationsCount: totalApps || 0,
                        activeCollaborationsCount: activeCollabs || 0,
                        pendingCount: pendingApps || 0,
                    });
                    setPriorities(dynamicPriorities);
                    setMessagesList([]); // Empty by default for new accounts
                    setDeliverablesList([]); // Empty by default for new accounts
                    setSavedOpportunitiesList([]); // Empty by default for new accounts
                }
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                if (isSubscribed) {
                    setLoading(false);
                    setRefreshing(false);
                }
            }
        }

        void fetchDashboard();

        return () => {
            isSubscribed = false;
        };
    }, [reloadKey]);

    const refetch = async () => {
        setRefreshing(true);
        setReloadKey(k => k + 1);
    };

    return {
        profile,
        points,
        metrics,
        priorities,
        messagesList,
        deliverablesList,
        savedOpportunitiesList,
        loading,
        refreshing,
        refetch,
    };
}

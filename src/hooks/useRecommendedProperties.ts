import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface RecommendedPropertyItem {
    id: string;
    title: string;
    location: string;
    propertyType: string;
    collaborationType: string;
    matchPercentage: number;
    imageUrl: string | null;
}

export function useRecommendedProperties(selectedTab: string = 'Luxury Stays') {
    const [properties, setProperties] = useState<RecommendedPropertyItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [reloadKey, setReloadKey] = useState(0);

    useEffect(() => {
        let isSubscribed = true;

        async function fetchProperties() {
            try {
                const { data, error } = await supabase
                    .from('properties')
                    .select(`
                        id, title, location, property_type, collaboration_type,
                        property_images(image_url, is_primary)
                    `)
                    .eq('is_active', true)
                    .order('created_at', { ascending: false })
                    .limit(10);

                if (error) throw error;

                if (data && data.length > 0) {
                    const transformed = data.map((prop: any, idx: number) => {
                        const images = prop.property_images || [];
                        const primary = images.find((i: any) => i.is_primary) || images[0];
                        return {
                            id: prop.id,
                            title: prop.title || 'Boutique Stay',
                            location: prop.location || 'Location',
                            propertyType: prop.property_type || 'Villa',
                            collaborationType: prop.collaboration_type || 'Free Stay',
                            matchPercentage: 90 + (idx % 8),
                            imageUrl: primary?.image_url || null,
                        };
                    });
                    if (isSubscribed) setProperties(transformed);
                } else {
                    if (isSubscribed) setProperties([]);
                }
            } catch (err) {
                console.error('Error fetching recommended properties:', err);
                if (isSubscribed) setProperties([]);
            } finally {
                if (isSubscribed) setLoading(false);
            }
        }

        void fetchProperties();

        return () => {
            isSubscribed = false;
        };
    }, [selectedTab, reloadKey]);

    const refetch = async () => {
        setReloadKey(k => k + 1);
    };

    return {
        properties,
        loading,
        refetch,
    };
}

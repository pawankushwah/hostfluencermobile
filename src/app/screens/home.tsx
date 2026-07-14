import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <View>
                    <Text style={styles.greetingText}>Hello, Jane! 👋</Text>
                    <Text style={styles.subtitleText}>Welcome back to your dashboard</Text>
                </View>
                <Pressable style={styles.profileIcon}>
                    <Feather name="user" size={24} color="#0D2C21" />
                </Pressable>
            </View>

            <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                
                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <Feather name="search" size={20} color="#889A92" style={styles.searchIcon} />
                    <Text style={styles.searchText}>Search creators, brands, or properties...</Text>
                </View>

                {/* Quick Stats */}
                <View style={styles.statsRow}>
                    <View style={styles.statCard}>
                        <View style={[styles.statIconContainer, { backgroundColor: '#E8F5E9' }]}>
                            <Feather name="activity" size={20} color="#2E7D32" />
                        </View>
                        <Text style={styles.statValue}>12</Text>
                        <Text style={styles.statLabel}>Active Collabs</Text>
                    </View>
                    <View style={styles.statCard}>
                        <View style={[styles.statIconContainer, { backgroundColor: '#E3F2FD' }]}>
                            <Feather name="eye" size={20} color="#1565C0" />
                        </View>
                        <Text style={styles.statValue}>8.4k</Text>
                        <Text style={styles.statLabel}>Profile Views</Text>
                    </View>
                    <View style={styles.statCard}>
                        <View style={[styles.statIconContainer, { backgroundColor: '#FFF3E0' }]}>
                            <Feather name="bookmark" size={20} color="#E65100" />
                        </View>
                        <Text style={styles.statValue}>24</Text>
                        <Text style={styles.statLabel}>Saved Items</Text>
                    </View>
                </View>

                {/* Section: Recommended for You */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Recommended for You</Text>
                    <Pressable>
                        <Text style={styles.seeAllText}>See all</Text>
                    </Pressable>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
                    {/* Mock Card 1 */}
                    <View style={styles.recommendationCard}>
                        <View style={styles.cardImagePlaceholder}>
                            <MaterialCommunityIcons name="home-modern" size={40} color="#A0A0A0" />
                        </View>
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>Luxury Villa Retreat</Text>
                            <Text style={styles.cardSubtitle}>Bali, Indonesia</Text>
                            <View style={styles.cardFooter}>
                                <View style={styles.tagBadge}>
                                    <Text style={styles.tagText}>Property</Text>
                                </View>
                                <Feather name="heart" size={18} color="#0B1C30" />
                            </View>
                        </View>
                    </View>

                    {/* Mock Card 2 */}
                    <View style={styles.recommendationCard}>
                        <View style={[styles.cardImagePlaceholder, { backgroundColor: '#FCE4EC' }]}>
                            <Feather name="camera" size={40} color="#D81B60" />
                        </View>
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>Sarah Jenkins</Text>
                            <Text style={styles.cardSubtitle}>Travel & Lifestyle</Text>
                            <View style={styles.cardFooter}>
                                <View style={[styles.tagBadge, { backgroundColor: '#FCE4EC' }]}>
                                    <Text style={[styles.tagText, { color: '#D81B60' }]}>Creator</Text>
                                </View>
                                <Feather name="heart" size={18} color="#0B1C30" />
                            </View>
                        </View>
                    </View>
                </ScrollView>

                {/* Section: Recent Activity */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Recent Activity</Text>
                </View>

                <View style={styles.activityCard}>
                    <View style={styles.activityItem}>
                        <View style={[styles.activityIcon, { backgroundColor: '#E8F1F8' }]}>
                            <Feather name="message-circle" size={18} color="#0B1C30" />
                        </View>
                        <View style={styles.activityTextContainer}>
                            <Text style={styles.activityTitle}>New Message</Text>
                            <Text style={styles.activityDesc}>Acme Corp sent you a proposal.</Text>
                        </View>
                        <Text style={styles.activityTime}>2h ago</Text>
                    </View>
                    
                    <View style={styles.divider} />

                    <View style={styles.activityItem}>
                        <View style={[styles.activityIcon, { backgroundColor: '#E8F5E9' }]}>
                            <Feather name="check-circle" size={18} color="#2E7D32" />
                        </View>
                        <View style={styles.activityTextContainer}>
                            <Text style={styles.activityTitle}>Collaboration Approved</Text>
                            <Text style={styles.activityDesc}>Your stay at Seaside Resort is confirmed.</Text>
                        </View>
                        <Text style={styles.activityTime}>1d ago</Text>
                    </View>
                </View>

            </ScrollView>

            {/* Bottom Navigation Bar */}
            <View style={styles.bottomNav}>
                <Pressable style={styles.navItem}>
                    <Feather name="home" size={24} color="#0D2C21" />
                    <Text style={[styles.navText, { color: '#0D2C21', fontWeight: '600' }]}>Home</Text>
                </Pressable>
                <Pressable style={styles.navItem}>
                    <Feather name="compass" size={24} color="#889A92" />
                    <Text style={styles.navText}>Discover</Text>
                </Pressable>
                <Pressable style={styles.navItem}>
                    <Feather name="message-square" size={24} color="#889A92" />
                    <Text style={styles.navText}>Messages</Text>
                </Pressable>
                <Pressable style={styles.navItem}>
                    <Feather name="user" size={24} color="#889A92" />
                    <Text style={styles.navText}>Profile</Text>
                </Pressable>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F8F9FF',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 20,
    },
    greetingText: {
        fontSize: 24,
        fontWeight: '700',
        color: '#0B1C30',
        marginBottom: 4,
    },
    subtitleText: {
        fontSize: 14,
        color: '#3C4A42',
    },
    profileIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#E2E8E4',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        height: 52,
        borderRadius: 16,
        paddingHorizontal: 16,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    searchIcon: {
        marginRight: 12,
    },
    searchText: {
        fontSize: 15,
        color: '#889A92',
    },
    statsRow: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        marginBottom: 32,
    },
    statCard: {
        backgroundColor: '#FFFFFF',
        width: '31%',
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    statIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    statValue: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0B1C30',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 11,
        color: '#3C4A42',
        textAlign: 'center',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0B1C30',
    },
    seeAllText: {
        fontSize: 14,
        color: '#0D2C21',
        fontWeight: '600',
    },
    horizontalScroll: {
        paddingHorizontal: 20,
        gap: 16,
        marginBottom: 32,
    },
    recommendationCard: {
        width: 220,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    cardImagePlaceholder: {
        height: 120,
        backgroundColor: '#E8F1F8',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContent: {
        padding: 16,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0B1C30',
        marginBottom: 4,
    },
    cardSubtitle: {
        fontSize: 13,
        color: '#889A92',
        marginBottom: 16,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    tagBadge: {
        backgroundColor: '#E8F1F8',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    tagText: {
        fontSize: 11,
        fontWeight: '600',
        color: '#1565C0',
    },
    activityCard: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    activityItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    activityIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    activityTextContainer: {
        flex: 1,
    },
    activityTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#0B1C30',
        marginBottom: 4,
    },
    activityDesc: {
        fontSize: 13,
        color: '#3C4A42',
        lineHeight: 18,
    },
    activityTime: {
        fontSize: 12,
        color: '#889A92',
        marginLeft: 8,
    },
    divider: {
        height: 1,
        backgroundColor: '#F0F2F5',
        marginVertical: 16,
        marginLeft: 52,
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingVertical: 12,
        paddingBottom: 24, // extra padding for bottom safe area
        borderTopWidth: 1,
        borderTopColor: '#F0F2F5',
    },
    navItem: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    navText: {
        fontSize: 11,
        color: '#889A92',
        marginTop: 4,
    },
});

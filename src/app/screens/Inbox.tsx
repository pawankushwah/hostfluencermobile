import { Feather, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { 
    ScrollView, 
    StyleSheet, 
    Text, 
    View, 
    TouchableOpacity 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

export default function InboxScreen() {
    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <StatusBar style="dark" />
            
            {/* Header Row */}
            <View style={styles.headerRow}>
                <View style={styles.headerTextWrapper}>
                    <Text style={styles.headerTitle}>Inbox</Text>
                    <Text style={styles.headerSubtitle}>3 unread messages</Text>
                </View>
                <TouchableOpacity style={styles.editBtn}>
                    <Feather name="edit-2" size={18} color="#FFF" />
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={styles.searchBar}>
                <Feather name="search" size={18} color="#8A8378" style={{ marginRight: 8 }} />
                <Text style={styles.searchPlaceholder}>Search conversations...</Text>
            </View>

            {/* Sub-segment Scroll tabs */}
            <View>
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false} 
                    contentContainerStyle={styles.tabsScrollContainer}
                >
                    <TouchableOpacity style={[styles.segmentTab, styles.segmentTabActive]}>
                        <Text style={[styles.segmentTabText, styles.segmentTabTextActive]}>All</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.segmentTab, styles.segmentTabWithBadge]}>
                        <Text style={styles.segmentTabText}>Unread</Text>
                        <View style={styles.unreadTabBadge}>
                            <Text style={styles.unreadTabBadgeText}>3</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.segmentTab}>
                        <Text style={styles.segmentTabText}>Hosts</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.segmentTab}>
                        <Text style={styles.segmentTabText}>Brands</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>

            {/* Main Scrollable Content */}
            <ScrollView 
                style={styles.scrollView} 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Active Collab Chat Header */}
                <View style={styles.sectionHeaderRow}>
                    <View style={styles.pinHeaderRow}>
                        <Ionicons name="pin" size={12} color="#8A8378" style={{ marginRight: 4 }} />
                        <Text style={styles.sectionTitle}>ACTIVE COLLAB CHAT</Text>
                    </View>
                </View>

                {/* Active Collab Chat Featured Card */}
                <LinearGradient
                    colors={['#0E7A57', '#062A1E']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.activeCollabCard}
                >
                    <View style={styles.activeCollabRow}>
                        <View style={styles.activeCollabAvatar}>
                            <Text style={styles.activeCollabAvatarText}>M</Text>
                        </View>
                        <View style={styles.activeCollabDetails}>
                            <Text style={styles.activeCollabTitle}>Marina • Villa Tamarind</Text>
                            <Text style={styles.activeCollabPreview}>Can you confirm your check-in time?</Text>
                        </View>
                        <View style={styles.activeCollabBadge}>
                            <Text style={styles.activeCollabBadgeText}>2</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.replyBtn}>
                        <Feather name="corner-up-left" size={14} color="#0E7A57" style={{ marginRight: 6 }} />
                        <Text style={styles.replyBtnText}>Reply now</Text>
                    </TouchableOpacity>
                </LinearGradient>

                {/* All Messages Header */}
                <View style={styles.sectionHeaderRow}>
                    <Text style={styles.sectionTitle}>ALL MESSAGES</Text>
                </View>

                {/* All Messages Container Card */}
                <View style={styles.threadsCard}>
                    {/* Thread Item 1: David • Soneva */}
                    <View style={styles.threadItem}>
                        <View style={[styles.threadAvatar, { backgroundColor: '#E2DCD5' }]}>
                            <Text style={styles.threadAvatarText}>D</Text>
                        </View>
                        <View style={styles.threadDetails}>
                            <Text style={styles.threadTitle}>David • Soneva</Text>
                            <Text style={[styles.threadPreview, styles.threadPreviewUnread]}>Looking forward to hosting you!</Text>
                        </View>
                        <View style={styles.threadMeta}>
                            <Text style={styles.threadTime}>1h</Text>
                            <View style={styles.threadUnreadBadge}>
                                <Text style={styles.threadUnreadBadgeText}>1</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.threadDivider} />

                    {/* Thread Item 2: Nomad Luggage */}
                    <View style={styles.threadItem}>
                        <View style={[styles.threadAvatar, { backgroundColor: '#E2DCD5' }]}>
                            <Text style={styles.threadAvatarText}>N</Text>
                        </View>
                        <View style={styles.threadDetails}>
                            <Text style={styles.threadTitle}>Nomad Luggage</Text>
                            <Text style={styles.threadPreview} numberOfLines={1}>{"We'd love to send you the new pac..."}</Text>
                        </View>
                        <View style={styles.threadMeta}>
                            <Text style={styles.threadTime}>5h</Text>
                            <View style={styles.brandBadge}>
                                <Text style={styles.brandBadgeText}>Brand</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.threadDivider} />

                    {/* Thread Item 3: Aman PR */}
                    <View style={styles.threadItem}>
                        <View style={[styles.threadAvatar, { backgroundColor: '#E2DCD5' }]}>
                            <Text style={styles.threadAvatarText}>A</Text>
                        </View>
                        <View style={styles.threadDetails}>
                            <Text style={styles.threadTitle}>Aman PR</Text>
                            <Text style={styles.threadPreview} numberOfLines={1}>Contract attached, take a look</Text>
                        </View>
                        <View style={styles.threadMeta}>
                            <Text style={styles.threadTime}>1d</Text>
                            <Ionicons name="checkmark-done" size={16} color="#0E7A57" style={{ marginTop: 4 }} />
                        </View>
                    </View>

                    <View style={styles.threadDivider} />

                    {/* Thread Item 4: Six Senses Bhutan */}
                    <View style={styles.threadItem}>
                        <View style={[styles.threadAvatar, { backgroundColor: '#E2DCD5' }]}>
                            <Text style={styles.threadAvatarText}>S</Text>
                        </View>
                        <View style={styles.threadDetails}>
                            <Text style={styles.threadTitle}>Six Senses Bhutan</Text>
                            <Text style={styles.threadPreview} numberOfLines={1}>Your application is under review</Text>
                        </View>
                        <View style={styles.threadMeta}>
                            <Text style={styles.threadTime}>2d</Text>
                            <Ionicons name="checkmark-done" size={16} color="#0E7A57" style={{ marginTop: 4 }} />
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Custom Bottom Tab Bar */}
            <View style={styles.bottomTabBar}>
                <TouchableOpacity 
                    style={styles.tabBarItem}
                    onPress={() => router.push('/screens/Dashboard' as any)}
                >
                    <Feather name="home" size={20} color="#8A8378" />
                    <Text style={styles.tabBarLabel}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.tabBarItem}
                    onPress={() => router.push('/screens/Marketplace' as any)}
                >
                    <Feather name="shopping-bag" size={20} color="#8A8378" />
                    <Text style={styles.tabBarLabel}>Marketplace</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.tabBarItem}
                    onPress={() => router.push('/screens/Discovery' as any)}
                >
                    <Ionicons name="sparkles-outline" size={20} color="#8A8378" />
                    <Text style={styles.tabBarLabel}>Discovery AI</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.tabBarItem}>
                    <Feather name="message-square" size={20} color="#0E7A57" />
                    <Text style={[styles.tabBarLabel, { color: '#0E7A57', fontWeight: 'bold' }]}>Inbox</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.tabBarItem}
                    onPress={() => router.push('/screens/Profile' as any)}
                >
                    <Feather name="user" size={20} color="#8A8378" />
                    <Text style={styles.tabBarLabel}>Profile</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FAF9F6',
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 12,
    },
    headerTextWrapper: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1C1A17',
    },
    headerSubtitle: {
        fontSize: 13,
        color: '#8A8378',
        marginTop: 2,
    },
    editBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#0E7A57',
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchBar: {
        height: 48,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: 'rgba(28, 26, 23, 0.08)',
        backgroundColor: '#FFF',
        marginHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        marginBottom: 16,
    },
    searchPlaceholder: {
        fontSize: 13,
        color: '#8A8378',
    },
    tabsScrollContainer: {
        paddingHorizontal: 20,
        gap: 8,
        marginBottom: 16,
    },
    segmentTab: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: 'rgba(28, 26, 23, 0.08)',
    },
    segmentTabActive: {
        backgroundColor: '#0E7A57',
        borderColor: '#0E7A57',
    },
    segmentTabWithBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 8,
    },
    unreadTabBadge: {
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: '#0E7A57',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 6,
    },
    unreadTabBadgeText: {
        color: '#FFF',
        fontSize: 10,
        fontWeight: 'bold',
    },
    segmentTabText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#1C1A17',
    },
    segmentTabTextActive: {
        color: '#FFF',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 24,
    },
    sectionHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 8,
        marginBottom: 14,
    },
    pinHeaderRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#8A8378',
        letterSpacing: 0.8,
    },
    activeCollabCard: {
        borderRadius: 24,
        marginHorizontal: 20,
        padding: 20,
        marginBottom: 24,
    },
    activeCollabRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    activeCollabAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeCollabAvatarText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
    },
    activeCollabDetails: {
        flex: 1,
        marginLeft: 12,
    },
    activeCollabTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#FFF',
    },
    activeCollabPreview: {
        fontSize: 12,
        color: '#A3C6B8',
        marginTop: 2,
    },
    activeCollabBadge: {
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: '#E7B25C',
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeCollabBadgeText: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#FFF',
    },
    replyBtn: {
        backgroundColor: '#FFF',
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 16,
    },
    replyBtnText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#0E7A57',
    },
    threadsCard: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#F0EFEA',
        borderRadius: 24,
        marginHorizontal: 20,
        overflow: 'hidden',
        paddingVertical: 4,
    },
    threadItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    threadAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    threadAvatarText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1C1A17',
    },
    threadDetails: {
        flex: 1,
    },
    threadTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1C1A17',
    },
    threadPreview: {
        fontSize: 12,
        color: '#8A8378',
        marginTop: 2,
    },
    threadPreviewUnread: {
        fontWeight: 'bold',
        color: '#1C1A17',
    },
    threadMeta: {
        alignItems: 'flex-end',
    },
    threadTime: {
        fontSize: 11,
        color: '#8A8378',
    },
    threadUnreadBadge: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#0E7A57',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 4,
    },
    threadUnreadBadgeText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#FFF',
    },
    brandBadge: {
        backgroundColor: '#FAF2E6',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        marginTop: 4,
    },
    brandBadgeText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#E7B25C',
    },
    threadDivider: {
        height: 1,
        backgroundColor: '#F0EFEA',
        marginHorizontal: 16,
    },
    bottomTabBar: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderTopWidth: 1,
        borderColor: '#EFECE6',
        paddingTop: 8,
        paddingBottom: 24,
        height: 64,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    tabBarItem: {
        alignItems: 'center',
    },
    tabBarLabel: {
        fontSize: 9,
        color: '#8A8378',
        marginTop: 4,
    },
});

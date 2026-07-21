import { Feather, Ionicons, FontAwesome } from '@expo/vector-icons';
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

export default function ProfileScreen() {
    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <StatusBar style="dark" />
            
            {/* Header Row */}
            <View style={styles.headerRow}>
                <Text style={styles.headerTitle}>Profile</Text>
                <View style={styles.headerActions}>
                    <TouchableOpacity style={styles.circularActionBtn}>
                        <Feather name="share-2" size={16} color="#1C1A17" />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.circularActionBtn, { marginLeft: 8 }]}>
                        <Feather name="settings" size={16} color="#1C1A17" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Main Scrollable Content */}
            <ScrollView 
                style={styles.scrollView} 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Profile Info Header */}
                <View style={styles.profileInfoHeader}>
                    <View style={styles.avatarWrapper}>
                        <View style={styles.avatarInner}>
                            <Text style={styles.avatarInitials}>S</Text>
                        </View>
                        <View style={styles.verifiedBadge}>
                            <Ionicons name="shield-checkmark" size={10} color="#FFF" />
                        </View>
                    </View>
                    
                    <View style={styles.profileNameWrapper}>
                        <Text style={styles.profileName}>Siddharth</Text>
                        <Text style={styles.profileHandle}>@siddharth.travels</Text>
                        
                        <View style={styles.levelBadge}>
                            <FontAwesome name="star" size={10} color="#E7B25C" style={{ marginRight: 4 }} />
                            <Text style={styles.levelBadgeText}>Seedling • Lv 2</Text>
                        </View>
                    </View>
                </View>

                {/* Followers / Collabs / Rating Grid */}
                <View style={styles.statsGrid}>
                    <View style={styles.statCol}>
                        <Text style={styles.statVal}>454K</Text>
                        <Text style={styles.statLbl}>Followers</Text>
                    </View>
                    
                    <View style={styles.statDivider} />

                    <View style={styles.statCol}>
                        <Text style={styles.statVal}>12</Text>
                        <Text style={styles.statLbl}>Collabs</Text>
                    </View>
                    
                    <View style={styles.statDivider} />

                    <View style={styles.statCol}>
                        <View style={styles.ratingValRow}>
                            <FontAwesome name="star" size={14} color="#E7B25C" style={{ marginRight: 4 }} />
                            <Text style={styles.statVal}>4.9</Text>
                        </View>
                        <Text style={styles.statLbl}>Rating</Text>
                    </View>
                </View>

                {/* Sub Segment Tabs */}
                <View>
                    <ScrollView 
                        horizontal 
                        showsHorizontalScrollIndicator={false} 
                        contentContainerStyle={styles.tabsScrollContainer}
                    >
                        <TouchableOpacity style={[styles.segmentTab, styles.segmentTabActive]}>
                            <Text style={[styles.segmentTabText, styles.segmentTabTextActive]}>Overview</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.segmentTab}>
                            <Text style={styles.segmentTabText}>Collaborations</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.segmentTab}>
                            <Text style={styles.segmentTabText}>Content</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.segmentTab}>
                            <Text style={styles.segmentTabText}>Analytics</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>

                {/* Overview Metrics Cards Row */}
                <View style={styles.metricsRow}>
                    {/* Left Card: Profile Completion */}
                    <View style={styles.metricCard}>
                        <Text style={styles.completionVal}>78%</Text>
                        <View style={styles.completionDetails}>
                            <Text style={styles.completionTitle}>Profile</Text>
                            <Text style={styles.completionSub}>Add 2 more to reach 100%</Text>
                        </View>
                    </View>

                    {/* Right Card: Creator Score */}
                    <View style={[styles.metricCard, styles.creatorScoreCard]}>
                        <View style={styles.creatorScoreHeader}>
                            <Ionicons name="speedometer-outline" size={12} color="#A3C6B8" style={{ marginRight: 4 }} />
                            <Text style={styles.creatorScoreLabel}>CREATOR SCORE</Text>
                        </View>
                        <Text style={styles.creatorScoreVal}>842</Text>
                        <Text style={styles.creatorScoreHighlight}>Top 8% of creators</Text>
                    </View>
                </View>

                {/* Social Accounts Section */}
                <Text style={styles.sectionTitleHeader}>SOCIAL ACCOUNTS</Text>
                
                <View style={styles.cardContainer}>
                    {/* Instagram */}
                    <View style={styles.socialRow}>
                        <View style={[styles.socialIconBg, { backgroundColor: 'rgba(225, 48, 108, 0.1)' }]}>
                            <Feather name="instagram" size={18} color="#E1306C" />
                        </View>
                        <View style={styles.socialDetails}>
                            <Text style={styles.socialName}>Instagram</Text>
                            <Text style={styles.socialSub}>248K followers</Text>
                        </View>
                        <Ionicons name="checkmark-circle" size={20} color="#0E7A57" />
                    </View>

                    <View style={styles.dividerLine} />

                    {/* YouTube */}
                    <View style={styles.socialRow}>
                        <View style={[styles.socialIconBg, { backgroundColor: 'rgba(255, 0, 0, 0.1)' }]}>
                            <Feather name="youtube" size={18} color="#FF0000" />
                        </View>
                        <View style={styles.socialDetails}>
                            <Text style={styles.socialName}>YouTube</Text>
                            <Text style={styles.socialSub}>86K subscribers</Text>
                        </View>
                        <Ionicons name="checkmark-circle" size={20} color="#0E7A57" />
                    </View>

                    <View style={styles.dividerLine} />

                    {/* TikTok */}
                    <View style={styles.socialRow}>
                        <View style={[styles.socialIconBg, { backgroundColor: 'rgba(0, 0, 0, 0.06)' }]}>
                            <Feather name="music" size={18} color="#1C1A17" />
                        </View>
                        <View style={styles.socialDetails}>
                            <Text style={styles.socialName}>TikTok</Text>
                            <Text style={styles.socialSub}>120K followers</Text>
                        </View>
                        <TouchableOpacity>
                            <Text style={styles.connectText}>Connect</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Audience Summary Section */}
                <Text style={styles.sectionTitleHeader}>AUDIENCE SUMMARY</Text>

                <View style={styles.cardContainer}>
                    <View style={styles.audienceLocationsHeader}>
                        <Text style={styles.audienceTitle}>Top locations</Text>
                        <Text style={styles.audienceByReach}>by reach</Text>
                    </View>

                    {/* Location 1: India */}
                    <View style={styles.locationProgressRow}>
                        <Text style={styles.locationName}>India</Text>
                        <View style={styles.progressTrack}>
                            <View style={[styles.progressFill, { width: '42%' }]} />
                        </View>
                        <Text style={styles.locationPercent}>42%</Text>
                    </View>

                    {/* Location 2: UAE */}
                    <View style={styles.locationProgressRow}>
                        <Text style={styles.locationName}>UAE</Text>
                        <View style={styles.progressTrack}>
                            <View style={[styles.progressFill, { width: '18%' }]} />
                        </View>
                        <Text style={styles.locationPercent}>18%</Text>
                    </View>

                    {/* Location 3: USA */}
                    <View style={styles.locationProgressRow}>
                        <Text style={styles.locationName}>USA</Text>
                        <View style={styles.progressTrack}>
                            <View style={[styles.progressFill, { width: '12%' }]} />
                        </View>
                        <Text style={styles.locationPercent}>12%</Text>
                    </View>

                    <View style={[styles.dividerLine, { marginVertical: 16 }]} />

                    {/* Location Demographics Grid */}
                    <View style={styles.demographicsGrid}>
                        <View style={styles.demographicCol}>
                            <Text style={styles.demoLbl}>Top age</Text>
                            <Text style={styles.demoVal}>25–34</Text>
                        </View>
                        <View style={styles.demographicCol}>
                            <Text style={styles.demoLbl}>Gender</Text>
                            <Text style={styles.demoVal}>58% F</Text>
                        </View>
                        <View style={styles.demographicCol}>
                            <Text style={styles.demoLbl}>Eng. rate</Text>
                            <Text style={styles.demoVal}>6.4%</Text>
                        </View>
                    </View>
                </View>

                {/* Media Kit Section */}
                <Text style={styles.sectionTitleHeader}>MEDIA KIT</Text>

                <LinearGradient
                    colors={['#0E7A57', '#062A1E']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.mediaKitCard}
                >
                    <View style={styles.mediaKitHeader}>
                        <View style={styles.mediaKitIconBg}>
                            <Feather name="layout" size={18} color="#FFF" />
                        </View>
                        <View style={styles.mediaKitInfo}>
                            <Text style={styles.mediaKitTitle}>Your Media Kit</Text>
                            <Text style={styles.mediaKitSubtitle}>Auto-generated • Updated 2d ago</Text>
                        </View>
                    </View>

                    <View style={styles.mediaKitActions}>
                        <TouchableOpacity style={styles.viewKitBtn}>
                            <Text style={styles.viewKitBtnText}>View kit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.shareKitBtn}>
                            <Feather name="share-2" size={14} color="#FFF" style={{ marginRight: 6 }} />
                            <Text style={styles.shareKitBtnText}>Share</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>

                {/* Achievements Section */}
                <Text style={styles.sectionTitleHeader}>ACHIEVEMENTS</Text>

                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.achievementsScrollContainer}
                >
                    {/* Badge 1 */}
                    <View style={styles.achievementBadgeWrapper}>
                        <View style={[styles.achievementBadgeIcon, { backgroundColor: '#E8F1EC' }]}>
                            <Ionicons name="shield-checkmark" size={24} color="#0E7A57" />
                        </View>
                        <Text style={styles.achievementBadgeName}>Verified</Text>
                    </View>

                    {/* Badge 2 */}
                    <View style={styles.achievementBadgeWrapper}>
                        <View style={[styles.achievementBadgeIcon, { backgroundColor: '#FAF2E6' }]}>
                            <Ionicons name="leaf-outline" size={24} color="#E7B25C" />
                        </View>
                        <Text style={styles.achievementBadgeName}>Top Creator</Text>
                    </View>

                    {/* Badge 3 */}
                    <View style={styles.achievementBadgeWrapper}>
                        <View style={[styles.achievementBadgeIcon, { backgroundColor: '#FFF9E6' }]}>
                            <Ionicons name="star" size={24} color="#E7B25C" />
                        </View>
                        <Text style={styles.achievementBadgeName}>5-Star</Text>
                    </View>

                    {/* Badge 4 */}
                    <View style={styles.achievementBadgeWrapper}>
                        <View style={[styles.achievementBadgeIcon, { backgroundColor: 'rgba(28, 26, 23, 0.04)' }]}>
                            <Ionicons name="trophy-outline" size={24} color="#8A8378" />
                        </View>
                        <Text style={[styles.achievementBadgeName, { color: '#8A8378' }]}>7/10</Text>
                    </View>
                </ScrollView>
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

                <TouchableOpacity 
                    style={styles.tabBarItem}
                    onPress={() => router.push('/screens/Inbox' as any)}
                >
                    <Feather name="message-square" size={20} color="#8A8378" />
                    <Text style={styles.tabBarLabel}>Inbox</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.tabBarItem}>
                    <Feather name="user" size={20} color="#0E7A57" />
                    <Text style={[styles.tabBarLabel, { color: '#0E7A57', fontWeight: 'bold' }]}>Profile</Text>
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
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 12,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1C1A17',
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    circularActionBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: 'rgba(28, 26, 23, 0.08)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 24,
    },
    profileInfoHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 8,
        marginBottom: 20,
    },
    avatarWrapper: {
        width: 72,
        height: 72,
        borderRadius: 36,
        borderWidth: 2,
        borderColor: '#0E7A57',
        padding: 2,
        position: 'relative',
    },
    avatarInner: {
        width: '100%',
        height: '100%',
        borderRadius: 32,
        backgroundColor: '#E2DCD5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarInitials: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1C1A17',
    },
    verifiedBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: '#0E7A57',
        borderWidth: 1.5,
        borderColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileNameWrapper: {
        marginLeft: 16,
    },
    profileName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1C1A17',
    },
    profileHandle: {
        fontSize: 12,
        color: '#8A8378',
        marginTop: 2,
    },
    levelBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#062A1E',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
        marginTop: 6,
        alignSelf: 'flex-start',
    },
    levelBadgeText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#E7B25C',
    },
    statsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 14,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'rgba(28, 26, 23, 0.08)',
        marginHorizontal: 20,
        marginBottom: 20,
    },
    statCol: {
        flex: 1,
        alignItems: 'center',
    },
    statVal: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1C1A17',
    },
    statLbl: {
        fontSize: 11,
        color: '#8A8378',
        marginTop: 4,
    },
    statDivider: {
        width: 1,
        height: 24,
        backgroundColor: 'rgba(28, 26, 23, 0.08)',
    },
    ratingValRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tabsScrollContainer: {
        paddingHorizontal: 20,
        gap: 8,
        marginBottom: 20,
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
    segmentTabText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#1C1A17',
    },
    segmentTabTextActive: {
        color: '#FFF',
    },
    metricsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    metricCard: {
        width: '48%',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#F0EFEA',
        borderRadius: 20,
        padding: 16,
        height: 110,
        justifyContent: 'space-between',
    },
    completionVal: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1C1A17',
    },
    completionDetails: {
        marginTop: 4,
    },
    completionTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#1C1A17',
    },
    completionSub: {
        fontSize: 10,
        color: '#8A8378',
        marginTop: 2,
    },
    creatorScoreCard: {
        backgroundColor: '#062A1E',
        borderColor: '#062A1E',
    },
    creatorScoreHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    creatorScoreLabel: {
        fontSize: 9,
        fontWeight: 'bold',
        color: '#A3C6B8',
        letterSpacing: 0.5,
    },
    creatorScoreVal: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
        marginVertical: 4,
    },
    creatorScoreHighlight: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#E7B25C',
    },
    sectionTitleHeader: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#8A8378',
        letterSpacing: 0.8,
        marginHorizontal: 20,
        marginTop: 12,
        marginBottom: 12,
    },
    cardContainer: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#F0EFEA',
        borderRadius: 24,
        marginHorizontal: 20,
        paddingHorizontal: 16,
        paddingVertical: 4,
        marginBottom: 16,
    },
    socialRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
    },
    socialIconBg: {
        width: 36,
        height: 36,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    socialDetails: {
        flex: 1,
    },
    socialName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1C1A17',
    },
    socialSub: {
        fontSize: 11,
        color: '#8A8378',
        marginTop: 2,
    },
    connectText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#0E7A57',
    },
    dividerLine: {
        height: 1,
        backgroundColor: '#F0EFEA',
    },
    audienceLocationsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 14,
    },
    audienceTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#1C1A17',
    },
    audienceByReach: {
        fontSize: 11,
        color: '#8A8378',
    },
    locationProgressRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    locationName: {
        width: 48,
        fontSize: 12,
        color: '#1C1A17',
        fontWeight: '500',
    },
    progressTrack: {
        flex: 1,
        height: 6,
        backgroundColor: '#F0EFEA',
        borderRadius: 3,
        marginHorizontal: 12,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#0E7A57',
        borderRadius: 3,
    },
    locationPercent: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#1C1A17',
        width: 30,
        textAlign: 'right',
    },
    demographicsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 16,
    },
    demographicCol: {
        flex: 1,
        alignItems: 'center',
    },
    demoLbl: {
        fontSize: 10,
        color: '#8A8378',
    },
    demoVal: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1C1A17',
        marginTop: 4,
    },
    mediaKitCard: {
        borderRadius: 24,
        marginHorizontal: 20,
        padding: 16,
        marginBottom: 16,
    },
    mediaKitHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    mediaKitIconBg: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mediaKitInfo: {
        marginLeft: 12,
    },
    mediaKitTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFF',
    },
    mediaKitSubtitle: {
        fontSize: 11,
        color: '#A3C6B8',
        marginTop: 2,
    },
    mediaKitActions: {
        flexDirection: 'row',
        gap: 8,
    },
    viewKitBtn: {
        flex: 1,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewKitBtnText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#0E7A57',
    },
    shareKitBtn: {
        flex: 1,
        height: 40,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    shareKitBtnText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#FFF',
    },
    achievementsScrollContainer: {
        paddingHorizontal: 20,
        gap: 8,
        paddingBottom: 20,
    },
    achievementBadgeWrapper: {
        alignItems: 'center',
        width: 80,
    },
    achievementBadgeIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    achievementBadgeName: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#1C1A17',
        textAlign: 'center',
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

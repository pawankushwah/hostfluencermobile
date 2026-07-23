import { Feather, Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as React from 'react';
import { useState } from 'react';
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

const TypedView = View as any;

const creatorsData = [
    {
        id: '1',
        name: 'Riya Sharma',
        handle: '@riya.luxe',
        niche: 'Luxury',
        followers: '540K',
        rating: '5.0',
        initial: 'R',
        ringColor: '#E7B25C', // gold
        verified: true,
        buttonType: 'filled',
    },
    {
        id: '2',
        name: 'Ananya Iyer',
        handle: '@ananya.wanders',
        niche: 'Travel',
        followers: '312K',
        rating: '4.9',
        initial: 'A',
        ringColor: '#0E7A57', // green
        verified: true,
        buttonType: 'filled',
    },
    {
        id: '3',
        name: 'Kabir Mehta',
        handle: '@kabireats',
        niche: 'Food',
        followers: '188K',
        rating: '4.8',
        initial: 'K',
        ringColor: null,
        verified: false,
        buttonType: 'outline',
    },
    {
        id: '4',
        name: 'Dev Nair',
        handle: '@devshoots',
        niche: 'Lifestyle',
        followers: '96K',
        rating: '4.7',
        initial: 'D',
        ringColor: null,
        verified: false,
        buttonType: 'outline',
    },
];

const brandsCampaignsData = [
    {
        id: '1',
        title: 'Summer Escapes',
        brand: 'Coastal Resorts Group',
        niche: 'Hospitality',
        badges: [
            { text: 'Free stay', color: '#0E7A57', bg: 'rgba(14,122,87,0.1)' },
            { text: '+ ₹60K', color: '#E7B25C', bg: 'rgba(231,178,92,0.1)' },
        ],
        daysLeft: '6 days',
        matchScore: '', // empty/light placeholder badge
        initial: 'C',
        avatarBg: '#E8F1EC',
        avatarTextColor: '#0E7A57',
    },
    {
        id: '2',
        title: 'Morning Ritual',
        brand: 'Brew & Co',
        niche: 'F&B',
        badges: [
            { text: '+ ₹40K', color: '#E7B25C', bg: 'rgba(231,178,92,0.1)' },
            { text: '1 reel', color: '#1C1A17', bg: '#FFF', border: true },
        ],
        daysLeft: '20 days',
        matchScore: '80%',
        initial: 'B',
        avatarBg: '#FAF2E6',
        avatarTextColor: '#E7B25C',
    },
];

export default function MarketplaceScreen() {
    const [selectedTab, setSelectedTab] = useState('All stays');
    const [selectedSegment, setSelectedSegment] = useState('Stays');

    const getSubtitle = () => {
        if (selectedSegment === 'Stays') return '128 open opportunities';
        if (selectedSegment === 'Creators') return '2,840 creators on Hostfluencer';
        return '42 brand campaigns live';
    };

    const getSubTabs = () => {
        if (selectedSegment === 'Stays') return ['All stays', 'Luxury', 'Beach', 'Restaurants'];
        if (selectedSegment === 'Creators') return ['All', 'Travel', 'Food', 'Luxury', 'Lifestyle'];
        return ['All', 'Travel gear', 'Hospitality', 'F&B'];
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <StatusBar style="dark" />
            
            {/* Header Row */}
            <View style={styles.headerRow}>
                <View style={styles.headerTextWrapper}>
                    <Text style={styles.headerTitle}>Marketplace</Text>
                    <Text style={styles.headerSubtitle}>{getSubtitle()}</Text>
                </View>
                <TouchableOpacity style={styles.filterIconBtn}>
                    <Ionicons name="options-outline" size={18} color="#1C1A17" />
                </TouchableOpacity>
            </View>

            {/* Search Bar - only shown in Stays tab */}
            {selectedSegment === 'Stays' && (
                <View style={styles.searchBar}>
                    <Feather name="search" size={18} color="#8A8378" style={{ marginRight: 8 }} />
                    <Text style={styles.searchPlaceholder}>Search stays, brands, cities...</Text>
                </View>
            )}

            {/* Primary Segment Control */}
            <View style={[styles.segmentControlBg, selectedSegment !== 'Stays' && { marginTop: 4 }]}>
                {['Stays', 'Creators', 'Brands'].map((segment) => (
                    <TouchableOpacity 
                        key={segment}
                        style={[
                            styles.segmentBtn,
                            selectedSegment === segment && styles.segmentBtnActive
                        ]}
                        onPress={() => {
                            setSelectedSegment(segment);
                            if (segment === 'Stays') {
                                setSelectedTab('All stays');
                            } else {
                                setSelectedTab('All');
                            }
                        }}
                    >
                        <Text style={[
                            styles.segmentBtnText,
                            selectedSegment === segment && styles.segmentBtnTextActive
                        ]}>
                            {segment}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Sub Segment Tabs Row */}
            <View>
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false} 
                    contentContainerStyle={styles.tabsScrollContainer}
                >
                    {getSubTabs().map((tab) => (
                        <TouchableOpacity 
                            key={tab} 
                            style={[
                                styles.segmentTab, 
                                selectedTab === tab && styles.segmentTabActive
                            ]}
                            onPress={() => setSelectedTab(tab)}
                        >
                            <Text style={[
                                styles.segmentTabText, 
                                selectedTab === tab && styles.segmentTabTextActive
                            ]}>
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Main Scrollable Content */}
            <ScrollView 
                style={styles.scrollView} 
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={styles.scrollContent}
            >
                {selectedSegment === 'Stays' && (
                    <>
                        {/* Featured Section */}
                        <View style={styles.sectionHeaderRow}>
                            <Text style={styles.sectionTitle}>FEATURED</Text>
                            <View style={styles.topMatchBadge}>
                                <Ionicons name="sparkles" size={12} color="#0E7A57" style={{ marginRight: 4 }} />
                                <Text style={styles.topMatchBadgeText}>Top match</Text>
                            </View>
                        </View>

                        {/* Featured Card */}
                        <View style={styles.featuredCard}>
                            <View style={[styles.featuredImageArea, { backgroundColor: '#EFECE6' }]}>
                                {/* Overlay match badge */}
                                <View style={styles.matchBadgeLeft}>
                                    <Ionicons name="sparkles" size={12} color="#E7B25C" style={{ marginRight: 4 }} />
                                    <Text style={styles.matchBadgeLeftText}>96% match</Text>
                                </View>
                                {/* Save Bookmark button */}
                                <TouchableOpacity style={styles.bookmarkWrapper}>
                                    <Feather name="bookmark" size={16} color="#0E7A57" />
                                </TouchableOpacity>
                                
                                <Text style={styles.featuredImageCenterText}>INFINITY POOL • ULUWATU</Text>

                                {/* Free stay badge bottom-left */}
                                <View style={styles.freeStayBadge}>
                                    <Feather name="gift" size={12} color="#0E7A57" style={{ marginRight: 4 }} />
                                    <Text style={styles.freeStayBadgeText}>Free 5-night stay</Text>
                                </View>
                            </View>

                            <View style={styles.featuredInfoArea}>
                                <View style={styles.featuredTitleRow}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.featuredTitle}>Alila Villas Uluwatu</Text>
                                        <View style={styles.featuredLocationRow}>
                                            <Feather name="map-pin" size={12} color="#8A8378" style={{ marginRight: 4 }} />
                                            <Text style={styles.featuredSubtitle}>Uluwatu, Bali • Luxury Stay</Text>
                                        </View>
                                    </View>
                                    <View style={styles.featuredDeliverables}>
                                        <Text style={styles.deliverablesLabel}>Deliverables</Text>
                                        <Text style={styles.deliverablesValue}>3 reels</Text>
                                    </View>
                                </View>

                                <TouchableOpacity style={styles.applyNowBtn}>
                                    <Text style={styles.applyNowBtnText}>Apply now</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Stays Open To Collab Section */}
                        <View style={styles.sectionHeaderRow}>
                            <Text style={styles.sectionTitle}>STAYS OPEN TO COLLAB</Text>
                            <TouchableOpacity>
                                <Text style={styles.sortText}>Sort</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Stay List Item 1: Soneva Fushi */}
                        <View style={styles.stayListItem}>
                            <View style={[styles.stayListThumbnail, { backgroundColor: '#E9E3DB' }]}>
                                <View style={styles.stayListThumbBadge}>
                                    <Text style={styles.stayListThumbBadgeText}>90%</Text>
                                </View>
                            </View>
                            
                            <View style={styles.stayListDetails}>
                                <Text style={styles.stayListTitle}>Soneva Fushi</Text>
                                <View style={styles.stayListLocationRow}>
                                    <Feather name="map-pin" size={10} color="#8A8378" style={{ marginRight: 3 }} />
                                    <Text style={styles.stayListSubtitle}>Baa Atoll, Maldives</Text>
                                </View>
                                <View style={styles.stayListBadgesRow}>
                                    <View style={[styles.pillBadge, { backgroundColor: 'rgba(14,122,87,0.1)' }]}>
                                        <Text style={[styles.pillBadgeText, { color: '#0E7A57' }]}>Free stay</Text>
                                    </View>
                                    <View style={[styles.pillBadge, { backgroundColor: 'rgba(231,178,92,0.1)' }]}>
                                        <Text style={[styles.pillBadgeText, { color: '#E7B25C' }]}>+ ₹80K</Text>
                                    </View>
                                </View>
                            </View>

                            <TouchableOpacity style={styles.listBookmarkBtn}>
                                <Feather name="bookmark" size={18} color="#8A8378" />
                            </TouchableOpacity>
                        </View>

                        {/* Stay List Item 2: Olive Bistro */}
                        <View style={styles.stayListItem}>
                            <View style={[styles.stayListThumbnail, { backgroundColor: '#ECE9E2' }]}>
                                <View style={styles.stayListThumbBadge}>
                                    <Text style={styles.stayListThumbBadgeText}>85%</Text>
                                </View>
                            </View>
                            
                            <View style={styles.stayListDetails}>
                                <Text style={styles.stayListTitle}>Olive Bistro</Text>
                                <View style={styles.stayListLocationRow}>
                                    <Feather name="map-pin" size={10} color="#8A8378" style={{ marginRight: 3 }} />
                                    <Text style={styles.stayListSubtitle}>Panaji, Goa • Restaurant</Text>
                                </View>
                                <View style={styles.stayListBadgesRow}>
                                    <View style={[styles.pillBadge, { backgroundColor: 'rgba(14,122,87,0.1)' }]}>
                                        <Text style={[styles.pillBadgeText, { color: '#0E7A57' }]}>Hosted meal</Text>
                                    </View>
                                    <View style={[styles.pillBadge, { backgroundColor: 'rgba(231,178,92,0.1)' }]}>
                                        <Text style={[styles.pillBadgeText, { color: '#E7B25C' }]}>+ ₹25K</Text>
                                    </View>
                                </View>
                            </View>

                            <TouchableOpacity style={styles.listBookmarkBtn}>
                                <Feather name="bookmark" size={18} color="#8A8378" />
                            </TouchableOpacity>
                        </View>

                        {/* Stay List Item 3: Nomad Luggage */}
                        <View style={styles.stayListItem}>
                            <View style={[styles.stayListThumbnail, { backgroundColor: '#E2DCD5' }]}>
                                <View style={styles.stayListThumbBadge}>
                                    <Text style={styles.stayListThumbBadgeText}>82%</Text>
                                </View>
                            </View>
                            
                            <View style={styles.stayListDetails}>
                                <Text style={styles.stayListTitle}>Nomad Luggage</Text>
                                <View style={styles.stayListLocationRow}>
                                    <Feather name="briefcase" size={10} color="#8A8378" style={{ marginRight: 3 }} />
                                    <Text style={styles.stayListSubtitle}>Brand Deal • Remote</Text>
                                </View>
                                <View style={styles.stayListBadgesRow}>
                                    <View style={[styles.pillBadge, { backgroundColor: 'rgba(231,178,92,0.1)' }]}>
                                        <Text style={[styles.pillBadgeText, { color: '#E7B25C' }]}>+ ₹1.2L</Text>
                                    </View>
                                    <View style={[styles.pillBadge, { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#EFECE6' }]}>
                                        <Text style={[styles.pillBadgeText, { color: '#1C1A17' }]}>3-month</Text>
                                    </View>
                                </View>
                            </View>

                            <TouchableOpacity style={styles.listBookmarkBtn}>
                                <Feather name="bookmark" size={18} color="#0E7A57" />
                            </TouchableOpacity>
                        </View>
                    </>
                )}

                {selectedSegment === 'Creators' && (
                    <>
                        {/* Creators Section */}
                        <View style={styles.sectionHeaderRow}>
                            <Text style={styles.sectionTitle}>CREATORS TO COLLAB WITH</Text>
                        </View>

                        {creatorsData.map((item) => (
                            <TypedView key={item.id} style={styles.creatorListItem}>
                                {/* Ring border conditional wrapper */}
                                <View style={[
                                    styles.creatorAvatarContainer,
                                    item.ringColor ? { borderColor: item.ringColor, borderWidth: 2, padding: 2 } : { width: 56, height: 56 }
                                ]}>
                                    <View style={[
                                        styles.creatorAvatarInner,
                                        !item.ringColor && { width: 56, height: 56, borderRadius: 28 }
                                    ]}>
                                        <Text style={styles.creatorAvatarText}>{item.initial}</Text>
                                    </View>
                                    {item.verified && (
                                         <View style={styles.verifiedCheckBadge}>
                                             <MaterialCommunityIcons name="check-decagram" size={10} color="#FFF" />
                                         </View>
                                    )}
                                </View>

                                <View style={styles.creatorDetails}>
                                    <Text style={styles.creatorName}>{item.name}</Text>
                                    <Text style={styles.creatorHandleNiche}>{`${item.handle}  •  ${item.niche}`}</Text>
                                    
                                    <View style={styles.creatorStatsRow}>
                                        <Text style={styles.creatorFollowers}>{item.followers}</Text>
                                        <View style={styles.ratingRow}>
                                            <FontAwesome name="star" size={12} color="#E7B25C" style={{ marginRight: 4, marginLeft: 8 }} />
                                            <Text style={styles.creatorRating}>{item.rating}</Text>
                                        </View>
                                    </View>
                                </View>

                                {item.buttonType === 'filled' ? (
                                    <TouchableOpacity style={styles.inviteBtnFilled}>
                                        <Text style={styles.inviteBtnFilledText}>Invite</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity style={styles.inviteBtnOutline}>
                                        <Text style={styles.inviteBtnOutlineText}>Invite</Text>
                                    </TouchableOpacity>
                                )}
                            </TypedView>
                        ))}
                    </>
                )}

                {selectedSegment === 'Brands' && (
                    <>
                        {/* Featured Campaign Section */}
                        <View style={styles.sectionHeaderRow}>
                            <Text style={styles.sectionTitle}>FEATURED CAMPAIGN</Text>
                            <View style={styles.topMatchBadge}>
                                <Ionicons name="sparkles" size={12} color="#0E7A57" style={{ marginRight: 4 }} />
                                <Text style={styles.topMatchBadgeText}>88% match</Text>
                            </View>
                        </View>

                        {/* Brands Featured Card */}
                        <LinearGradient
                            colors={['#0E7A57', '#062A1E']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.brandsFeaturedCard}
                        >
                            <View style={styles.brandsFeaturedHeader}>
                                <View style={styles.brandsFeaturedAvatar}>
                                    <Text style={styles.brandsFeaturedAvatarText}>N</Text>
                                </View>
                                <View>
                                    <Text style={styles.brandsFeaturedTitle}>Pack for Adventure</Text>
                                    <Text style={styles.brandsFeaturedSubtitle}>Nomad Luggage • Travel gear</Text>
                                </View>
                            </View>

                            <View style={styles.brandsStatsRow}>
                                <View style={styles.brandsStatBox}>
                                    <Text style={styles.brandsStatLabel}>BUDGET</Text>
                                    <Text style={styles.brandsStatValue}>₹1.2L</Text>
                                </View>
                                <View style={styles.brandsStatBox}>
                                    <Text style={styles.brandsStatLabel}>DELIVERABLES</Text>
                                    <Text style={styles.brandsStatValue}>3 reels</Text>
                                </View>
                                <View style={styles.brandsStatBox}>
                                    <Text style={styles.brandsStatLabel}>CLOSES</Text>
                                    <Text style={styles.brandsStatValue}>12 days</Text>
                                </View>
                            </View>

                            <TouchableOpacity style={styles.brandsApplyBtn}>
                                <Text style={styles.brandsApplyBtnText}>Apply to campaign</Text>
                            </TouchableOpacity>
                        </LinearGradient>

                        {/* More Campaigns Section */}
                        <View style={styles.sectionHeaderRow}>
                            <Text style={styles.sectionTitle}>MORE CAMPAIGNS</Text>
                        </View>

                        {brandsCampaignsData.map((item) => (
                            <TypedView key={item.id} style={styles.campaignListItem}>
                                <View style={[styles.campaignAvatar, { backgroundColor: item.avatarBg }]}>
                                    <Text style={[styles.campaignAvatarText, { color: item.avatarTextColor }]}>{item.initial}</Text>
                                </View>

                                <View style={styles.campaignDetails}>
                                    <Text style={styles.campaignTitle}>{item.title}</Text>
                                    <Text style={styles.campaignSubtitle}>{`${item.brand} • ${item.niche}`}</Text>
                                    
                                    <View style={styles.campaignBadgesRow}>
                                        {item.badges.map((badge, index) => (
                                            <TypedView 
                                                key={index} 
                                                style={[
                                                    styles.pillBadge, 
                                                    { backgroundColor: badge.bg },
                                                    badge.border && { borderWidth: 1, borderColor: '#EFECE6' }
                                                ]}
                                            >
                                                <Text style={[styles.pillBadgeText, { color: badge.color }]}>{badge.text}</Text>
                                            </TypedView>
                                        ))}
                                    </View>
                                </View>

                                <View style={styles.campaignRightArea}>
                                    {item.matchScore ? (
                                        <View style={styles.campaignMatchBadge}>
                                            <Text style={styles.campaignMatchBadgeText}>{item.matchScore}</Text>
                                        </View>
                                    ) : (
                                        <View style={styles.campaignEmptyBadge} />
                                    )}
                                    <Text style={styles.campaignDaysText}>{item.daysLeft}</Text>
                                </View>
                            </TypedView>
                        ))}
                    </>
                )}
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

                <TouchableOpacity style={styles.tabBarItem}>
                    <Feather name="shopping-bag" size={20} color="#0E7A57" />
                    <Text style={[styles.tabBarLabel, { color: '#0E7A57', fontWeight: 'bold' }]}>Marketplace</Text>
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
    filterIconBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: 'rgba(28, 26, 23, 0.08)',
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
    segmentControlBg: {
        height: 44,
        backgroundColor: '#F0EFEA',
        borderRadius: 22,
        marginHorizontal: 20,
        flexDirection: 'row',
        padding: 4,
        marginBottom: 16,
    },
    segmentBtn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 18,
    },
    segmentBtnActive: {
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    segmentBtnText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#8A8378',
    },
    segmentBtnTextActive: {
        color: '#0E7A57',
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
        paddingBottom: 80,
    },
    sectionHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 8,
        marginBottom: 14,
    },
    sectionTitle: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#8A8378',
        letterSpacing: 0.8,
    },
    topMatchBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(14, 122, 87, 0.1)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    topMatchBadgeText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#0E7A57',
    },
    featuredCard: {
        backgroundColor: '#FFF',
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#F0EFEA',
        marginHorizontal: 20,
        overflow: 'hidden',
        marginBottom: 24,
    },
    featuredImageArea: {
        height: 160,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    matchBadgeLeft: {
        position: 'absolute',
        top: 12,
        left: 12,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#062A1E',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    matchBadgeLeftText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#E7B25C',
    },
    bookmarkWrapper: {
        position: 'absolute',
        top: 12,
        right: 12,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    featuredImageCenterText: {
        fontSize: 11,
        fontWeight: 'bold',
        color: 'rgba(255,255,255,0.7)',
        letterSpacing: 1.5,
    },
    freeStayBadge: {
        position: 'absolute',
        bottom: 12,
        left: 12,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    freeStayBadgeText: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#0E7A57',
    },
    featuredInfoArea: {
        padding: 16,
    },
    featuredTitleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    featuredTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1C1A17',
    },
    featuredLocationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    featuredSubtitle: {
        fontSize: 12,
        color: '#8A8378',
    },
    featuredDeliverables: {
        alignItems: 'flex-end',
    },
    deliverablesLabel: {
        fontSize: 10,
        color: '#8A8378',
    },
    deliverablesValue: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#1C1A17',
        marginTop: 2,
    },
    applyNowBtn: {
        backgroundColor: '#0E7A57',
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    applyNowBtnText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFF',
    },
    sortText: {
        fontSize: 12,
        color: '#0E7A57',
        fontWeight: 'bold',
    },
    stayListItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#F0EFEA',
        borderRadius: 20,
        marginHorizontal: 20,
        padding: 12,
        marginBottom: 12,
    },
    stayListThumbnail: {
        width: 72,
        height: 72,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        marginRight: 12,
    },
    stayListThumbBadge: {
        position: 'absolute',
        bottom: 4,
        left: 4,
        backgroundColor: 'rgba(28, 26, 23, 0.75)',
        paddingHorizontal: 4,
        paddingVertical: 2,
        borderRadius: 4,
    },
    stayListThumbBadgeText: {
        color: '#FFF',
        fontSize: 9,
        fontWeight: 'bold',
    },
    stayListDetails: {
        flex: 1,
    },
    stayListTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1C1A17',
    },
    stayListLocationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    stayListSubtitle: {
        fontSize: 11,
        color: '#8A8378',
    },
    stayListBadgesRow: {
        flexDirection: 'row',
        marginTop: 8,
    },
    pillBadge: {
        paddingHorizontal: 6,
        paddingVertical: 3,
        borderRadius: 6,
        marginRight: 6,
    },
    pillBadgeText: {
        fontSize: 10,
        fontWeight: 'bold',
    },
    listBookmarkBtn: {
        padding: 6,
    },
    creatorListItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#F0EFEA',
        borderRadius: 20,
        marginHorizontal: 20,
        padding: 12,
        marginBottom: 12,
        height: 96,
    },
    creatorAvatarContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    creatorAvatarInner: {
        width: 54,
        height: 54,
        borderRadius: 27,
        backgroundColor: '#E2DCD5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    creatorAvatarText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1C1A17',
    },
    verifiedCheckBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#0E7A57',
        borderWidth: 1.5,
        borderColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    creatorDetails: {
        flex: 1,
        marginLeft: 12,
    },
    creatorName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1C1A17',
    },
    creatorHandleNiche: {
        fontSize: 11,
        color: '#8A8378',
        marginTop: 2,
    },
    creatorStatsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
    },
    creatorFollowers: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#1C1A17',
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    creatorRating: {
        fontSize: 12,
        color: '#8A8378',
        fontWeight: '500',
    },
    inviteBtnFilled: {
        backgroundColor: '#0E7A57',
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 10,
    },
    inviteBtnFilledText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#FFF',
    },
    inviteBtnOutline: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#CFE3D8',
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 10,
    },
    inviteBtnOutlineText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#0E7A57',
    },
    brandsFeaturedCard: {
        backgroundColor: '#062A1E',
        borderRadius: 24,
        marginHorizontal: 20,
        padding: 20,
        marginBottom: 24,
    },
    brandsFeaturedHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    brandsFeaturedAvatar: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: '#1E3A2F',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    brandsFeaturedAvatarText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#E7B25C',
    },
    brandsFeaturedTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF',
    },
    brandsFeaturedSubtitle: {
        fontSize: 11,
        color: '#A3C6B8',
        marginTop: 2,
    },
    brandsStatsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        gap: 8,
    },
    brandsStatBox: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
        borderRadius: 10,
        padding: 10,
        minWidth: 90,
    },
    brandsStatLabel: {
        fontSize: 9,
        color: '#A3C6B8',
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    brandsStatValue: {
        fontSize: 13,
        color: '#FFF',
        fontWeight: 'bold',
        marginTop: 4,
    },
    brandsApplyBtn: {
        backgroundColor: '#FFF',
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    brandsApplyBtnText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#0E7A57',
    },
    campaignListItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#F0EFEA',
        borderRadius: 20,
        marginHorizontal: 20,
        padding: 12,
        marginBottom: 12,
        height: 88,
    },
    campaignAvatar: {
        width: 56,
        height: 56,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    campaignAvatarText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    campaignDetails: {
        flex: 1,
    },
    campaignTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1C1A17',
    },
    campaignSubtitle: {
        fontSize: 11,
        color: '#8A8378',
        marginTop: 2,
    },
    campaignBadgesRow: {
        flexDirection: 'row',
        marginTop: 8,
    },
    campaignRightArea: {
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    campaignMatchBadge: {
        backgroundColor: 'rgba(14, 122, 87, 0.1)',
        paddingHorizontal: 6,
        paddingVertical: 3,
        borderRadius: 6,
        marginBottom: 4,
    },
    campaignMatchBadgeText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#0E7A57',
    },
    campaignEmptyBadge: {
        width: 44,
        height: 18,
        borderRadius: 6,
        backgroundColor: 'rgba(28, 26, 23, 0.04)',
        marginBottom: 4,
    },
    campaignDaysText: {
        fontSize: 10,
        color: '#8A8378',
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

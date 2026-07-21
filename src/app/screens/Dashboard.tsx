import { Feather, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { 
    ScrollView, 
    StyleSheet, 
    Text, 
    View, 
    TouchableOpacity,
    Animated
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen() {
    const [selectedTab, setSelectedTab] = useState('Luxury Stays');
    const [performancePeriod] = useState('This week');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [fadeAnim] = useState(() => new Animated.Value(0));
    const [slideAnim] = useState(() => new Animated.Value(60)); // translateY
    const [buttonAnim] = useState(() => new Animated.Value(0)); // non-native for color and rotation

    const buttonBgColor = buttonAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['#0E7A57', '#1C1A17']
    });

    const buttonRotation = buttonAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '135deg']
    });

    const openMenu = () => {
        setIsMenuOpen(true);
        fadeAnim.setValue(0);
        slideAnim.setValue(60);
        buttonAnim.setValue(0);
        
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 350,
                useNativeDriver: true,
            }),
            Animated.spring(slideAnim, {
                toValue: 0,
                friction: 7,
                tension: 35,
                useNativeDriver: true,
            }),
            Animated.timing(buttonAnim, {
                toValue: 1,
                duration: 350,
                useNativeDriver: false,
            })
        ]).start();
    };

    const closeMenu = () => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 60,
                duration: 250,
                useNativeDriver: true,
            }),
            Animated.timing(buttonAnim, {
                toValue: 0,
                duration: 250,
                useNativeDriver: false,
            })
        ]).start(() => {
            setIsMenuOpen(false);
        });
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <StatusBar style="dark" />
            
            {/* Header */}
            <View style={styles.headerRow}>
                <View style={styles.avatarWrapper}>
                    {/* Initials Avatar representing Siddharth */}
                    <View style={styles.avatarImagePlaceholder}>
                        <Text style={styles.avatarInitials}>S</Text>
                    </View>
                    <View style={styles.avatarBadge}>
                        <Text style={styles.avatarBadgeText}>2</Text>
                    </View>
                </View>

                <View style={styles.headerTextWrapper}>
                    <Text style={styles.greetingText}>Good morning 👋</Text>
                    <Text style={styles.nameText}>Siddharth</Text>
                </View>

                <TouchableOpacity style={styles.notificationBell}>
                    <Feather name="bell" size={20} color="#1C1A17" />
                    <View style={styles.bellBadgeDot} />
                </TouchableOpacity>
            </View>

            {/* Creator Pills Row */}
            <View style={styles.pillsRow}>
                <View style={styles.pillTagTravel}>
                    <View style={styles.pillDotGreen} />
                    <Text style={styles.pillText}>Travel Creator</Text>
                </View>
                <View style={styles.pillTagVerified}>
                    <Ionicons name="shield-checkmark" size={14} color="#0E7A57" style={{ marginRight: 4 }} />
                    <Text style={styles.pillText}>Verified Creator</Text>
                </View>
            </View>

            {/* Main Scrollable Content */}
            <ScrollView 
                style={styles.scrollView} 
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={styles.scrollContent}
            >
                {/* 1. Current Level Card */}
                <LinearGradient
                    colors={['#0E7A57', '#062A1E']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.levelCard}
                >
                    <View style={styles.levelHeader}>
                        <Text style={styles.levelLabel}>CURRENT LEVEL</Text>
                        <TouchableOpacity style={styles.historyBtn}>
                            <Text style={styles.historyBtnText}>+ HISTORY</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.levelName}>Seedling</Text>

                    <View style={styles.pointsInfoRow}>
                        <Text style={styles.pointsText}>390 / 500 points</Text>
                        <Text style={styles.timeToLevelText}>{"In 2d to mid-level"}</Text>
                    </View>

                    {/* Custom Progress Bar */}
                    <View style={styles.progressBarBg}>
                        <View style={[styles.progressBarFill, { width: '78%' }]} />
                    </View>

                    <View style={styles.progressFooter}>
                        <Text style={styles.progressLimitText}>Seedling</Text>
                        <View style={styles.nextLevelLink}>
                            <Text style={styles.nextLevelLinkText}>Explorer</Text>
                            <Feather name="chevron-right" size={14} color="#FFF" />
                        </View>
                    </View>

                    <View style={styles.cardDivider} />

                    <Text style={styles.benefitsLabel}>BENEFITS UNLOCKED AT 500 POINTS</Text>

                    <View style={styles.benefitItem}>
                        <View style={styles.benefitCheck}>
                            <Feather name="check" size={10} color="#0A3F2C" />
                        </View>
                        <Text style={styles.benefitText}>Priority on applications</Text>
                    </View>

                    <View style={styles.benefitItem}>
                        <View style={styles.benefitCheck}>
                            <Feather name="check" size={10} color="#0A3F2C" />
                        </View>
                        <Text style={styles.benefitText}>Owner visibility 10 hours</Text>
                    </View>

                    <View style={styles.benefitItem}>
                        <View style={styles.benefitCheck}>
                            <Feather name="check" size={10} color="#0A3F2C" />
                        </View>
                        <Text style={styles.benefitText}>Host trust badge</Text>
                    </View>
                </LinearGradient>

                {/* 2. Today's Priorities */}
                <View style={styles.sectionHeaderRow}>
                    <Text style={styles.sectionTitle}>{"TODAY'S PRIORITIES"}</Text>
                    <TouchableOpacity>
                        <Text style={styles.seeAllText}>See all &gt;</Text>
                    </TouchableOpacity>
                </View>

                {/* Priority Card 1: Deliverable due */}
                <View style={styles.priorityCard}>
                    <View style={[styles.priorityIconWrapper, { backgroundColor: 'rgba(231,178,92,0.15)' }]}>
                        <Feather name="file-text" size={18} color="#E7B25C" />
                    </View>
                    <View style={styles.priorityContent}>
                        <View style={styles.priorityTitleRow}>
                            <Text style={styles.priorityTitle}>Deliverable due</Text>
                            <View style={[styles.priorityBadge, { backgroundColor: '#FAF2E6' }]}>
                                <Text style={[styles.priorityBadgeText, { color: '#E7B25C' }]}>12h left</Text>
                            </View>
                        </View>
                        <Text style={styles.priorityDesc}>2 posts for Aman Resorts</Text>
                    </View>
                    <TouchableOpacity style={styles.priorityActionBtnFilled}>
                        <Text style={styles.priorityActionBtnFilledText}>Upload</Text>
                    </TouchableOpacity>
                </View>

                {/* Priority Card 2: Contract ready */}
                <View style={styles.priorityCard}>
                    <View style={[styles.priorityIconWrapper, { backgroundColor: 'rgba(14,122,87,0.1)' }]}>
                        <Feather name="file" size={18} color="#0E7A57" />
                    </View>
                    <View style={styles.priorityContent}>
                        <View style={styles.priorityTitleRow}>
                            <Text style={styles.priorityTitle}>Contract ready</Text>
                            <View style={[styles.priorityBadge, { backgroundColor: '#EBF5F0' }]}>
                                <Text style={[styles.priorityBadgeText, { color: '#0E7A57' }]}>NEW</Text>
                            </View>
                        </View>
                        <Text style={styles.priorityDesc}>Aman Resorts stay contract</Text>
                    </View>
                    <TouchableOpacity style={styles.priorityActionBtnOutline}>
                        <Text style={styles.priorityActionBtnOutlineText}>View</Text>
                    </TouchableOpacity>
                </View>

                {/* Priority Card 3: New invitation */}
                <View style={styles.priorityCard}>
                    <View style={[styles.priorityIconWrapper, { backgroundColor: 'rgba(15,159,144,0.1)' }]}>
                        <Feather name="mail" size={18} color="#0F9F90" />
                    </View>
                    <View style={styles.priorityContent}>
                        <View style={styles.priorityTitleRow}>
                            <Text style={styles.priorityTitle}>New invitation</Text>
                            <View style={[styles.priorityBadge, { backgroundColor: '#FDEAE8' }]}>
                                <Text style={[styles.priorityBadgeText, { color: '#D85C4B' }]}>EXPIRY</Text>
                            </View>
                        </View>
                        <Text style={styles.priorityDesc}>Soneva Jani invites you to apply</Text>
                    </View>
                    <TouchableOpacity style={styles.priorityActionBtnFilled}>
                        <Text style={styles.priorityActionBtnFilledText}>Accept</Text>
                    </TouchableOpacity>
                </View>

                {/* Priority Card 4: Unread message */}
                <View style={styles.priorityCard}>
                    <View style={[styles.priorityIconWrapper, { backgroundColor: 'rgba(52,152,219,0.1)' }]}>
                        <Feather name="message-square" size={18} color="#3498DB" />
                    </View>
                    <View style={styles.priorityContent}>
                        <View style={styles.priorityTitleRow}>
                            <Text style={styles.priorityTitle}>Unread message</Text>
                            <View style={styles.priorityGreenBadge}>
                                <Text style={styles.priorityGreenBadgeText}>1</Text>
                            </View>
                        </View>
                        <Text style={styles.priorityDesc}>Marina - Villa Samarind</Text>
                    </View>
                    <TouchableOpacity style={styles.priorityActionBtnOutline}>
                        <Text style={styles.priorityActionBtnOutlineText}>Reply</Text>
                    </TouchableOpacity>
                </View>

                {/* 3. Performance Row */}
                <View style={styles.sectionHeaderRow}>
                    <Text style={styles.sectionTitle}>PERFORMANCE</Text>
                    <TouchableOpacity style={styles.dropdownPill}>
                        <Text style={styles.dropdownPillText}>{performancePeriod}</Text>
                        <Feather name="chevron-down" size={12} color="#1C1A17" style={{ marginLeft: 4 }} />
                    </TouchableOpacity>
                </View>

                <View style={styles.performanceRow}>
                    <View style={styles.performanceCard}>
                        <Text style={styles.performanceValue}>48</Text>
                        <Text style={styles.performanceLabel}>Applications</Text>
                        <View style={styles.performanceTrend}>
                            <Text style={styles.performanceTrendText}>▲ 18%</Text>
                        </View>
                    </View>

                    <View style={styles.performanceCard}>
                        <Text style={styles.performanceValue}>12</Text>
                        <Text style={styles.performanceLabel}>Collaborations</Text>
                        <View style={styles.performanceTrend}>
                            <Text style={styles.performanceTrendText}>▲ 4%</Text>
                        </View>
                    </View>

                    <View style={styles.performanceCard}>
                        <Text style={styles.performanceValue}>5</Text>
                        <Text style={styles.performanceLabel}>Pending incoming supply</Text>
                        <View style={[styles.performanceTrend, { backgroundColor: '#F0EFEA' }]}>
                            <Text style={[styles.performanceTrendText, { color: '#8A8378' }]}>--</Text>
                        </View>
                    </View>
                </View>

                {/* 4. Active Collaborations */}
                <View style={styles.sectionHeaderRow}>
                    <Text style={styles.sectionTitle}>ACTIVE COLLABORATIONS</Text>
                    <TouchableOpacity>
                        <Text style={styles.seeAllText}>See all &gt;</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false} 
                    contentContainerStyle={styles.horizontalScrollContainer}
                >
                    {/* Active Collab Card 1 */}
                    <View style={styles.collabCard}>
                        <View style={[styles.collabImageArea, { backgroundColor: '#EFECE6' }]}>
                            {/* Overlay Badges */}
                            <View style={styles.collabBadgeLeft}>
                                <View style={styles.pillDotGreen} />
                                <Text style={styles.collabBadgeLeftText}>In progress</Text>
                            </View>
                            <View style={styles.collabBadgeRight}>
                                <Text style={styles.collabBadgeRightText}>4 days left</Text>
                            </View>
                            <Feather name="image" size={32} color="#8A8378" />
                        </View>
                        <View style={styles.collabInfoArea}>
                            <Text style={styles.collabTitle}>Aman Resorts</Text>
                            <Text style={styles.collabSubtitle}>Ubud, Bali</Text>
                            
                            <View style={styles.collabMilestoneRow}>
                                <Text style={styles.collabMilestoneLabel}>Milestones</Text>
                                <Text style={styles.collabMilestoneValue}>1 / 3</Text>
                            </View>
                            {/* Small progress bar */}
                            <View style={styles.collabProgressBarBg}>
                                <View style={[styles.collabProgressBarFill, { width: '33.3%' }]} />
                            </View>
                        </View>
                        <TouchableOpacity style={styles.collabCardFooter}>
                            <Text style={styles.collabCardFooterText}>View collaboration</Text>
                            <Feather name="arrow-right" size={14} color="#1C1A17" style={{ marginLeft: 4 }} />
                        </TouchableOpacity>
                    </View>

                    {/* Active Collab Card 2 */}
                    <View style={styles.collabCard}>
                        <View style={[styles.collabImageArea, { backgroundColor: '#ECE9E2' }]}>
                            <View style={[styles.collabBadgeLeft, { backgroundColor: '#FFF' }]}>
                                <View style={[styles.pillDotGreen, { backgroundColor: '#E7B25C' }]} />
                                <Text style={styles.collabBadgeLeftText}>Filing</Text>
                            </View>
                            <View style={styles.collabBadgeRight}>
                                <Text style={styles.collabBadgeRightText}>38 days left</Text>
                            </View>
                            <Feather name="image" size={32} color="#8A8378" />
                        </View>
                        <View style={styles.collabInfoArea}>
                            <Text style={styles.collabTitle}>Soneva Jani</Text>
                            <Text style={styles.collabSubtitle}>Noonu, Maldives</Text>
                            
                            <View style={styles.collabMilestoneRow}>
                                <Text style={styles.collabMilestoneLabel}>Milestones</Text>
                                <Text style={styles.collabMilestoneValue}>0 / 2</Text>
                            </View>
                            <View style={styles.collabProgressBarBg}>
                                <View style={[styles.collabProgressBarFill, { width: '0%' }]} />
                            </View>
                        </View>
                        <TouchableOpacity style={styles.collabCardFooter}>
                            <Text style={styles.collabCardFooterText}>View collaboration</Text>
                            <Feather name="arrow-right" size={14} color="#1C1A17" style={{ marginLeft: 4 }} />
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                {/* 5. Upcoming Stays */}
                <View style={styles.sectionHeaderRow}>
                    <Text style={styles.sectionTitle}>UPCOMING STAYS</Text>
                    <TouchableOpacity>
                        <Text style={styles.seeAllText}>Calendar &gt;</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.timelineContainer}>
                    {/* Stay 1 */}
                    <View style={styles.timelineRow}>
                        <View style={styles.timelineDateColumn}>
                            <Text style={styles.timelineMonth}>JUL</Text>
                            <Text style={styles.timelineDay}>12</Text>
                            <View style={styles.timelineVerticalLine} />
                        </View>
                        <View style={styles.timelineCard}>
                            <View style={styles.timelineCardMain}>
                                <Text style={styles.timelineTitle}>Villa Samarind</Text>
                                <Text style={styles.timelineSubtitle}>{"D'Amour, Goa"}</Text>
                                
                                <View style={styles.timelineHostRow}>
                                    <View style={styles.miniAvatar}>
                                        <Text style={styles.miniAvatarText}>M</Text>
                                    </View>
                                    <Text style={styles.timelineHostName}>Marina</Text>
                                </View>
                            </View>
                            <View style={styles.timelineStatusBadge}>
                                <Text style={styles.timelineStatusBadgeText}>In 15 Days</Text>
                            </View>
                        </View>
                    </View>

                    {/* Stay 2 */}
                    <View style={styles.timelineRow}>
                        <View style={styles.timelineDateColumn}>
                            <Text style={styles.timelineMonth}>AUG</Text>
                            <Text style={styles.timelineDay}>03</Text>
                        </View>
                        <View style={styles.timelineCard}>
                            <View style={styles.timelineCardMain}>
                                <Text style={styles.timelineTitle}>Soneva Jani</Text>
                                <Text style={styles.timelineSubtitle}>Noonu, Maldives</Text>
                                
                                <View style={styles.timelineHostRow}>
                                    <View style={styles.miniAvatar}>
                                        <Text style={styles.miniAvatarText}>D</Text>
                                    </View>
                                    <Text style={styles.timelineHostName}>David</Text>
                                </View>
                            </View>
                            <View style={[styles.timelineStatusBadge, { backgroundColor: '#F0EFEA' }]}>
                                <Text style={[styles.timelineStatusBadgeText, { color: '#8A8378' }]}>In 38 Days</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* 6. Recommended For You */}
                <View style={styles.sectionHeaderRow}>
                    <Text style={styles.sectionTitle}>RECOMMENDED FOR YOU</Text>
                    <TouchableOpacity style={styles.filterIconBtn}>
                        <Ionicons name="options-outline" size={16} color="#1C1A17" />
                    </TouchableOpacity>
                </View>

                {/* Horizontal Segment Tabs */}
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false} 
                    contentContainerStyle={styles.tabsScrollContainer}
                >
                    {['Luxury Stays', 'Beach Resorts', 'Eco-resorts', 'Wellness'].map((tab) => (
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

                {/* Recommended Cards scroll */}
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false} 
                    contentContainerStyle={styles.horizontalScrollContainer}
                >
                    {/* Card 1 */}
                    <View style={styles.recomCard}>
                        <View style={[styles.recomImageArea, { backgroundColor: '#EFECE6' }]}>
                            <View style={styles.recomMatchBadge}>
                                <Text style={styles.recomMatchBadgeText}>12% match</Text>
                            </View>
                            <Feather name="image" size={32} color="#8A8378" />
                        </View>
                        <View style={styles.recomInfoArea}>
                            <Text style={styles.recomTitle}>The Edge Villa</Text>
                            <Text style={styles.recomSubtitle}>Uluwatu, Bali</Text>
                            <TouchableOpacity style={styles.recomApplyBtn}>
                                <Text style={styles.recomApplyBtnText}>Apply</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Card 2 */}
                    <View style={styles.recomCard}>
                        <View style={[styles.recomImageArea, { backgroundColor: '#ECE9E2' }]}>
                            <View style={styles.recomMatchBadge}>
                                <Text style={styles.recomMatchBadgeText}>80% match</Text>
                            </View>
                            <Feather name="image" size={32} color="#8A8378" />
                        </View>
                        <View style={styles.recomInfoArea}>
                            <Text style={styles.recomTitle}>Six Senses</Text>
                            <Text style={styles.recomSubtitle}>Thimphu, Bhutan</Text>
                            <TouchableOpacity style={styles.recomApplyBtn}>
                                <Text style={styles.recomApplyBtnText}>Apply</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>

                {/* 7. Quick Actions */}
                <View style={styles.sectionHeaderRow}>
                    <Text style={styles.sectionTitle}>QUICK ACTIONS</Text>
                </View>

                <View style={styles.quickActionsGrid}>
                    <TouchableOpacity style={styles.quickActionItem}>
                        <View style={[styles.quickActionIconWrapper, { backgroundColor: 'rgba(14,122,87,0.1)' }]}>
                            <Ionicons name="megaphone-outline" size={20} color="#0E7A57" />
                        </View>
                        <Text style={styles.quickActionLabel}>Analyze{"\n"}opportunities</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.quickActionItem}>
                        <View style={[styles.quickActionIconWrapper, { backgroundColor: 'rgba(231,178,92,0.1)' }]}>
                            <Feather name="file-text" size={20} color="#E7B25C" />
                        </View>
                        <Text style={styles.quickActionLabel}>Submit{"\n"}deliverables</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.quickActionItem}>
                        <View style={[styles.quickActionIconWrapper, { backgroundColor: 'rgba(15,159,144,0.1)' }]}>
                            <Feather name="camera" size={20} color="#0F9F90" />
                        </View>
                        <Text style={styles.quickActionLabel}>Create{"\n"}media kit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.quickActionItem}>
                        <View style={[styles.quickActionIconWrapper, { backgroundColor: 'rgba(52,152,219,0.1)' }]}>
                            <Ionicons name="bar-chart-outline" size={20} color="#3498DB" />
                        </View>
                        <Text style={styles.quickActionLabel}>View{"\n"}analytics</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.quickActionItem}>
                        <View style={[styles.quickActionIconWrapper, { backgroundColor: 'rgba(155,89,182,0.1)' }]}>
                            <Feather name="search" size={20} color="#9B59B6" />
                        </View>
                        <Text style={styles.quickActionLabel}>Find{"\n"}collaborations</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.quickActionItem}>
                        <View style={[styles.quickActionIconWrapper, { backgroundColor: 'rgba(230,126,34,0.1)' }]}>
                            <Feather name="award" size={20} color="#E67E22" />
                        </View>
                        <Text style={styles.quickActionLabel}>Award{"\n"}opportunities</Text>
                    </TouchableOpacity>
                </View>

                {/* 8. Content Delivery */}
                <View style={styles.sectionHeaderRow}>
                    <Text style={styles.sectionTitle}>CONTENT DELIVERY</Text>
                    <TouchableOpacity>
                        <Text style={styles.seeAllText}>All &gt;</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.contentDeliveryCard}>
                    {/* Item 1 */}
                    <View style={styles.contentItemRow}>
                        <View style={[styles.contentThumbnail, { backgroundColor: '#EFECE6' }]} />
                        <View style={styles.contentDetails}>
                            <Text style={styles.contentTitle}>Aman Resorts</Text>
                            <Text style={styles.contentProgressText}>Due in 2d • 2 of 3 uploaded</Text>
                            <View style={styles.contentProgressBarBg}>
                                <View style={[styles.contentProgressBarFill, { width: '66.6%' }]} />
                            </View>
                        </View>
                        <View style={styles.contentActionArea}>
                            <Text style={styles.contentPercent}>66%</Text>
                            <TouchableOpacity style={styles.contentUploadBtn}>
                                <Feather name="upload-cloud" size={14} color="#FFF" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.contentDivider} />

                    {/* Item 2 */}
                    <View style={styles.contentItemRow}>
                        <View style={[styles.contentThumbnail, { backgroundColor: '#ECE9E2' }]} />
                        <View style={styles.contentDetails}>
                            <Text style={styles.contentTitle}>Six Senses</Text>
                            <Text style={styles.contentProgressText}>Due in 15d • Not started</Text>
                            <View style={styles.contentProgressBarBg}>
                                <View style={[styles.contentProgressBarFill, { width: '0%' }]} />
                            </View>
                        </View>
                        <View style={styles.contentActionArea}>
                            <Text style={[styles.contentPercent, { color: '#8A8378' }]}>0%</Text>
                            <TouchableOpacity style={[styles.contentUploadBtn, { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#EFECE6' }]}>
                                <Feather name="upload-cloud" size={14} color="#8A8378" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* 9. Messages */}
                <View style={styles.sectionHeaderRow}>
                    <Text style={styles.sectionTitle}>MESSAGES</Text>
                    <TouchableOpacity onPress={() => router.push('/screens/Inbox' as any)}>
                        <Text style={styles.seeAllText}>Inbox &gt;</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.messagesCard}>
                    {/* Message 1 */}
                    <View style={styles.messageItem}>
                        <View style={styles.messageAvatar}>
                            <Text style={styles.messageAvatarText}>M</Text>
                        </View>
                        <View style={styles.messageContent}>
                            <Text style={styles.messageSender}>Marina</Text>
                            <Text style={styles.messagePreview} numberOfLines={1}>Can you confirm your check-in time?</Text>
                        </View>
                        <View style={styles.messageMeta}>
                            <Text style={styles.messageTime}>5m</Text>
                            <View style={styles.messageBadge}>
                                <Text style={styles.messageBadgeText}>1</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.contentDivider} />

                    {/* Message 2 */}
                    <View style={styles.messageItem}>
                        <View style={styles.messageAvatar}>
                            <Text style={styles.messageAvatarText}>D</Text>
                        </View>
                        <View style={styles.messageContent}>
                            <Text style={styles.messageSender}>David - Soneva</Text>
                            <Text style={styles.messagePreview} numberOfLines={1}>Looking forward to hosting you!</Text>
                        </View>
                        <View style={styles.messageMeta}>
                            <Text style={styles.messageTime}>1h</Text>
                            <View style={styles.messageBadge}>
                                <Text style={styles.messageBadgeText}>1</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.contentDivider} />

                    {/* Message 3 */}
                    <View style={styles.messageItem}>
                        <View style={styles.messageAvatar}>
                            <Text style={styles.messageAvatarText}>A</Text>
                        </View>
                        <View style={styles.messageContent}>
                            <Text style={styles.messageSender}>Aman PR</Text>
                            <Text style={styles.messagePreview} numberOfLines={1}>Contract attached. Take a look.</Text>
                        </View>
                        <View style={styles.messageMeta}>
                            <Text style={styles.messageTime}>3h</Text>
                            <Ionicons name="checkmark-done" size={16} color="#0E7A57" style={{ marginTop: 4 }} />
                        </View>
                    </View>
                </View>

                {/* 10. Your Analytics */}
                <View style={styles.sectionHeaderRow}>
                    <Text style={styles.sectionTitle}>YOUR ANALYTICS</Text>
                    <TouchableOpacity style={styles.dropdownPill}>
                        <Text style={styles.dropdownPillText}>Last 6 months</Text>
                        <Feather name="chevron-down" size={12} color="#1C1A17" style={{ marginLeft: 4 }} />
                    </TouchableOpacity>
                </View>

                <View style={styles.analyticsCard}>
                    <View style={styles.revenueHeader}>
                        <View>
                            <Text style={styles.revenueLabel}>Revenue earned</Text>
                            <Text style={styles.revenueValue}>₹4.8L</Text>
                        </View>
                        <View style={styles.revenueGrowthBadge}>
                            <Text style={styles.revenueGrowthBadgeText}>▲ + 82%</Text>
                        </View>
                    </View>

                    {/* Custom Bar Chart */}
                    <View style={styles.chartContainer}>
                        <View style={styles.chartBarsRow}>
                            <View style={styles.chartBarCol}>
                                <View style={[styles.chartBarFill, { height: 40, backgroundColor: '#E8F1EC' }]} />
                                <Text style={styles.chartBarLabel}>Jun</Text>
                            </View>
                            <View style={styles.chartBarCol}>
                                <View style={[styles.chartBarFill, { height: 55, backgroundColor: '#E8F1EC' }]} />
                                <Text style={styles.chartBarLabel}>Jul</Text>
                            </View>
                            <View style={styles.chartBarCol}>
                                <View style={[styles.chartBarFill, { height: 48, backgroundColor: '#E8F1EC' }]} />
                                <Text style={styles.chartBarLabel}>Aug</Text>
                            </View>
                            <View style={styles.chartBarCol}>
                                <View style={[styles.chartBarFill, { height: 75, backgroundColor: '#E8F1EC' }]} />
                                <Text style={styles.chartBarLabel}>Sep</Text>
                            </View>
                            <View style={styles.chartBarCol}>
                                <View style={[styles.chartBarFill, { height: 95, backgroundColor: '#062A1E' }]} />
                                <Text style={styles.chartBarLabel}>Oct</Text>
                            </View>
                            <View style={styles.chartBarCol}>
                                <View style={[styles.chartBarFill, { height: 110, backgroundColor: '#E7B25C' }]} />
                                <Text style={styles.chartBarLabel}>Nov</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.analyticsStatsGrid}>
                        <View style={styles.analyticsStatItem}>
                            <Feather name="eye" size={14} color="#8A8378" style={{ marginRight: 6 }} />
                            <View>
                                <Text style={styles.analyticsStatVal}>12.4K</Text>
                                <Text style={styles.analyticsStatLbl}>Profile views</Text>
                            </View>
                        </View>

                        <View style={styles.analyticsStatItem}>
                            <Feather name="send" size={14} color="#8A8378" style={{ marginRight: 6 }} />
                            <View>
                                <Text style={styles.analyticsStatVal}>48</Text>
                                <Text style={styles.analyticsStatLbl}>Applications</Text>
                            </View>
                        </View>

                        <View style={styles.analyticsStatItem}>
                            <Feather name="check-circle" size={14} color="#8A8378" style={{ marginRight: 6 }} />
                            <View>
                                <Text style={styles.analyticsStatVal}>76%</Text>
                                <Text style={styles.analyticsStatLbl}>% Acceptance</Text>
                            </View>
                        </View>

                        <View style={styles.analyticsStatItem}>
                            <Feather name="users" size={14} color="#8A8378" style={{ marginRight: 6 }} />
                            <View>
                                <Text style={styles.analyticsStatVal}>+0.2%</Text>
                                <Text style={styles.analyticsStatLbl}>Audience</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* 11. Achievements */}
                <View style={styles.sectionHeaderRow}>
                    <Text style={styles.sectionTitle}>ACHIEVEMENTS</Text>
                    <Text style={styles.seeAllText}>3 of 9 earned</Text>
                </View>

                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false} 
                    contentContainerStyle={styles.horizontalScrollContainer}
                >
                    <View style={styles.achievementBadgeWrapper}>
                        <View style={[styles.achievementBadgeIcon, { backgroundColor: '#E8F1EC' }]}>
                            <Ionicons name="shield-checkmark" size={24} color="#0E7A57" />
                        </View>
                        <Text style={styles.achievementBadgeName}>Verified Creator</Text>
                    </View>

                    <View style={styles.achievementBadgeWrapper}>
                        <View style={[styles.achievementBadgeIcon, { backgroundColor: '#FAF2E6' }]}>
                            <Ionicons name="leaf-outline" size={24} color="#E7B25C" />
                        </View>
                        <Text style={styles.achievementBadgeName}>Eco Travel Creator</Text>
                    </View>

                    <View style={styles.achievementBadgeWrapper}>
                        <View style={[styles.achievementBadgeIcon, { backgroundColor: '#FFF9E6' }]}>
                            <Ionicons name="star" size={24} color="#FFD700" />
                        </View>
                        <Text style={styles.achievementBadgeName}>Super Rating</Text>
                    </View>
                </ScrollView>
            </ScrollView>

            {/* Quick Action Overlay Menu */}
            {isMenuOpen && (
                <Animated.View style={[styles.overlayBg, { opacity: fadeAnim }]}>
                    <TouchableOpacity 
                        style={StyleSheet.absoluteFill} 
                        activeOpacity={1}
                        onPress={closeMenu}
                    />

                    {/* Action Items List on the right */}
                    <Animated.View style={[
                        styles.overlayActionsContainer,
                        {
                            transform: [{ translateY: slideAnim }]
                        }
                    ]}>
                        {/* Apply */}
                        <TouchableOpacity 
                            style={styles.overlayActionItem}
                            onPress={() => {
                                closeMenu();
                                router.push('/screens/Marketplace' as any);
                            }}
                        >
                            <View style={styles.actionLabelPill}>
                                <Text style={styles.actionLabelText}>Apply</Text>
                            </View>
                            <View style={styles.actionIconCircle}>
                                <Feather name="send" size={18} color="#0E7A57" />
                            </View>
                        </TouchableOpacity>

                        {/* Upload */}
                        <TouchableOpacity 
                            style={styles.overlayActionItem}
                            onPress={closeMenu}
                        >
                            <View style={styles.actionLabelPill}>
                                <Text style={styles.actionLabelText}>Upload</Text>
                            </View>
                            <View style={styles.actionIconCircle}>
                                <Feather name="upload-cloud" size={18} color="#E7B25C" />
                            </View>
                        </TouchableOpacity>

                        {/* Message */}
                        <TouchableOpacity 
                            style={styles.overlayActionItem}
                            onPress={() => {
                                closeMenu();
                                router.push('/screens/Inbox' as any);
                            }}
                        >
                            <View style={styles.actionLabelPill}>
                                <Text style={styles.actionLabelText}>Message</Text>
                            </View>
                            <View style={styles.actionIconCircle}>
                                <Feather name="message-square" size={18} color="#0E7A57" />
                            </View>
                        </TouchableOpacity>

                        {/* AI Chat */}
                        <TouchableOpacity 
                            style={styles.overlayActionItem}
                            onPress={() => {
                                closeMenu();
                                router.push('/screens/Discovery' as any);
                            }}
                        >
                            <View style={[styles.actionLabelPill, { backgroundColor: '#E8F1EC', borderColor: '#E8F1EC' }]}>
                                <Text style={[styles.actionLabelText, { color: '#0E7A57' }]}>AI Chat</Text>
                            </View>
                            <View style={[styles.actionIconCircle, { backgroundColor: '#0E7A57', borderColor: '#0E7A57' }]}>
                                <Ionicons name="sparkles" size={18} color="#FFF" />
                            </View>
                        </TouchableOpacity>
                    </Animated.View>
                </Animated.View>
            )}

            {/* Floating rotating color-shifting plus action button */}
            <Animated.View style={[
                styles.fabBtn,
                {
                    backgroundColor: buttonBgColor,
                    transform: [{ rotate: buttonRotation }]
                }
            ]}>
                <TouchableOpacity 
                    style={styles.fabBtnInner}
                    onPress={() => {
                        if (isMenuOpen) {
                            closeMenu();
                        } else {
                            openMenu();
                        }
                    }}
                    activeOpacity={0.85}
                >
                    <Feather name="plus" size={24} color="#FFF" />
                </TouchableOpacity>
            </Animated.View>

            {/* Custom Bottom Tab Bar */}
            <View style={styles.bottomTabBar}>
                <TouchableOpacity style={styles.tabBarItem}>
                    <Feather name="home" size={20} color="#0E7A57" />
                    <Text style={[styles.tabBarLabel, { color: '#0E7A57', fontWeight: 'bold' }]}>Home</Text>
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
        paddingTop: 12,
        paddingBottom: 12,
    },
    avatarWrapper: {
        position: 'relative',
        marginRight: 12,
        width: 50,
        height: 50,
    },
    avatarImagePlaceholder: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#E2DCD5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarInitials: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1C1A17',
    },
    avatarBadge: {
        position: 'absolute',
        top: 33,
        left: 33,
        width: 19,
        height: 19,
        borderRadius: 9.5,
        backgroundColor: '#0E7A57',
        borderWidth: 2,
        borderColor: '#FAF9F6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarBadgeText: {
        color: '#FFF',
        fontSize: 9,
        fontWeight: 'bold',
    },
    headerTextWrapper: {
        flex: 1,
    },
    greetingText: {
        fontSize: 13,
        color: '#8A8378',
        fontWeight: '500',
    },
    nameText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1C1A17',
        marginTop: 2,
    },
    notificationBell: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: 'rgba(28, 26, 23, 0.08)',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    bellBadgeDot: {
        position: 'absolute',
        top: 10,
        left: 25,
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#0E7A57',
        borderWidth: 1,
        borderColor: '#FFF',
    },
    pillsRow: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        gap: 8,
        marginBottom: 16,
    },
    pillTagTravel: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: 'rgba(28, 26, 23, 0.08)',
        width: 118,
        height: 29,
        borderRadius: 14.5,
        paddingLeft: 12,
    },
    pillTagVerified: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E8F1EC',
        borderWidth: 1,
        borderColor: '#CFE3D8',
        width: 135,
        height: 28,
        borderRadius: 14,
        paddingLeft: 12,
    },
    pillDotGreen: {
        width: 7,
        height: 7,
        borderRadius: 3.5,
        backgroundColor: '#0E7A57',
        marginRight: 6,
    },
    pillText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#1C1A17',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 110, // Avoid overlapping FAB/Tab Bar
    },
    levelCard: {
        borderRadius: 28,
        padding: 20,
        marginHorizontal: 20,
        marginBottom: 24,
        height: 316,
    },
    levelHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    levelLabel: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#A3C6B8',
        letterSpacing: 0.8,
    },
    historyBtn: {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    historyBtnText: {
        color: '#FFF',
        fontSize: 9,
        fontWeight: 'bold',
    },
    levelName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
        marginTop: 6,
    },
    pointsInfoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
    },
    pointsText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#A3C6B8',
    },
    timeToLevelText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#A3C6B8',
    },
    progressBarBg: {
        height: 6,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: 3,
        marginVertical: 12,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#E7B25C',
        borderRadius: 3,
    },
    progressFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    progressLimitText: {
        fontSize: 11,
        fontWeight: '600',
        color: '#FFF',
    },
    nextLevelLink: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    nextLevelLinkText: {
        fontSize: 11,
        fontWeight: '600',
        color: '#FFF',
        marginRight: 2,
    },
    cardDivider: {
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        marginVertical: 16,
    },
    benefitsLabel: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#A3C6B8',
        letterSpacing: 0.8,
        marginBottom: 12,
    },
    benefitItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    benefitCheck: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    benefitText: {
        fontSize: 13,
        color: '#FFF',
        fontWeight: '500',
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
        fontSize: 13,
        fontWeight: 'bold',
        color: '#1C1A17',
        letterSpacing: 0.8,
    },
    seeAllText: {
        fontSize: 12,
        color: '#0E7A57',
        fontWeight: '600',
    },
    priorityCard: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        marginHorizontal: 20,
        height: 72,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#F0EFEA',
    },
    priorityIconWrapper: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    priorityContent: {
        flex: 1,
    },
    priorityTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    priorityTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#1C1A17',
    },
    priorityBadge: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 10,
        marginLeft: 8,
    },
    priorityBadgeText: {
        fontSize: 10,
        fontWeight: 'bold',
    },
    priorityGreenBadge: {
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: '#0E7A57',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    priorityGreenBadgeText: {
        color: '#FFF',
        fontSize: 10,
        fontWeight: 'bold',
    },
    priorityDesc: {
        fontSize: 12,
        color: '#8A8378',
        marginTop: 2,
    },
    priorityActionBtnFilled: {
        backgroundColor: '#0E7A57',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 10,
    },
    priorityActionBtnFilledText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: 'bold',
    },
    priorityActionBtnOutline: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#EFECE6',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 10,
    },
    priorityActionBtnOutlineText: {
        color: '#1C1A17',
        fontSize: 12,
        fontWeight: 'bold',
    },
    dropdownPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#EFECE6',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    dropdownPillText: {
        fontSize: 11,
        fontWeight: '600',
        color: '#1C1A17',
    },
    performanceRow: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    performanceCard: {
        backgroundColor: '#FFF',
        width: '31%',
        padding: 16,
        borderRadius: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F0EFEA',
    },
    performanceValue: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1C1A17',
    },
    performanceLabel: {
        fontSize: 10,
        color: '#8A8378',
        textAlign: 'center',
        marginTop: 4,
        height: 28, // Wrap clean
    },
    performanceTrend: {
        backgroundColor: 'rgba(14,122,87,0.1)',
        paddingHorizontal: 6,
        paddingVertical: 3,
        borderRadius: 8,
        marginTop: 8,
    },
    performanceTrendText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#0E7A57',
    },
    horizontalScrollContainer: {
        paddingLeft: 20,
        paddingRight: 8,
        gap: 12,
        marginBottom: 24,
    },
    collabCard: {
        width: 250,
        backgroundColor: '#FFF',
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#F0EFEA',
        overflow: 'hidden',
    },
    collabImageArea: {
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    collabBadgeLeft: {
        position: 'absolute',
        top: 12,
        left: 12,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    collabBadgeLeftText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#1C1A17',
    },
    collabBadgeRight: {
        position: 'absolute',
        top: 12,
        right: 12,
        backgroundColor: 'rgba(28,26,23,0.6)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    collabBadgeRightText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#FFF',
    },
    collabInfoArea: {
        padding: 16,
    },
    collabTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#1C1A17',
    },
    collabSubtitle: {
        fontSize: 12,
        color: '#8A8378',
        marginTop: 2,
    },
    collabMilestoneRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
        alignItems: 'center',
    },
    collabMilestoneLabel: {
        fontSize: 11,
        color: '#8A8378',
    },
    collabMilestoneValue: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#1C1A17',
    },
    collabProgressBarBg: {
        height: 4,
        backgroundColor: '#F0EFEA',
        borderRadius: 2,
        marginTop: 6,
    },
    collabProgressBarFill: {
        height: '100%',
        backgroundColor: '#0E7A57',
        borderRadius: 2,
    },
    collabCardFooter: {
        backgroundColor: '#FAF9F6',
        borderTopWidth: 1,
        borderColor: '#F0EFEA',
        paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    collabCardFooterText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#1C1A17',
    },
    timelineContainer: {
        paddingHorizontal: 20,
        marginBottom: 24,
    },
    timelineRow: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    timelineDateColumn: {
        width: 50,
        alignItems: 'center',
        marginRight: 12,
    },
    timelineMonth: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#8A8378',
    },
    timelineDay: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1C1A17',
        marginTop: 2,
    },
    timelineVerticalLine: {
        width: 1,
        backgroundColor: '#EFECE6',
        flex: 1,
        marginVertical: 8,
    },
    timelineCard: {
        flex: 1,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#F0EFEA',
        borderRadius: 20,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    timelineCardMain: {
        flex: 1,
    },
    timelineTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1C1A17',
    },
    timelineSubtitle: {
        fontSize: 11,
        color: '#8A8378',
        marginTop: 2,
    },
    timelineHostRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    miniAvatar: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#E2DCD5',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 6,
    },
    miniAvatarText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#1C1A17',
    },
    timelineHostName: {
        fontSize: 12,
        color: '#1C1A17',
    },
    timelineStatusBadge: {
        backgroundColor: 'rgba(14,122,87,0.1)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
    },
    timelineStatusBadgeText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#0E7A57',
    },
    filterIconBtn: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#EFECE6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabsScrollContainer: {
        paddingLeft: 20,
        paddingRight: 8,
        gap: 8,
        marginBottom: 16,
    },
    segmentTab: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#EFECE6',
    },
    segmentTabActive: {
        backgroundColor: '#0E7A57',
        borderColor: '#0E7A57',
    },
    segmentTabText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#8A8378',
    },
    segmentTabTextActive: {
        color: '#FFF',
    },
    recomCard: {
        width: 180,
        backgroundColor: '#FFF',
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#F0EFEA',
        overflow: 'hidden',
    },
    recomImageArea: {
        height: 110,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    recomMatchBadge: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: '#E8F1EC',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 10,
    },
    recomMatchBadgeText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#0E7A57',
    },
    recomInfoArea: {
        padding: 12,
    },
    recomTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#1C1A17',
    },
    recomSubtitle: {
        fontSize: 11,
        color: '#8A8378',
        marginTop: 2,
    },
    recomApplyBtn: {
        backgroundColor: '#0E7A57',
        paddingVertical: 6,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    recomApplyBtnText: {
        fontSize: 12,
        color: '#FFF',
        fontWeight: 'bold',
    },
    quickActionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 14,
        marginBottom: 24,
    },
    quickActionItem: {
        width: '33.3%',
        alignItems: 'center',
        marginBottom: 16,
        paddingHorizontal: 6,
    },
    quickActionIconWrapper: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    quickActionLabel: {
        fontSize: 11,
        fontWeight: '500',
        color: '#1C1A17',
        textAlign: 'center',
        lineHeight: 14,
    },
    contentDeliveryCard: {
        backgroundColor: '#FFF',
        borderRadius: 24,
        marginHorizontal: 20,
        padding: 16,
        borderWidth: 1,
        borderColor: '#F0EFEA',
        marginBottom: 24,
    },
    contentItemRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    contentThumbnail: {
        width: 44,
        height: 44,
        borderRadius: 10,
        marginRight: 12,
    },
    contentDetails: {
        flex: 1,
    },
    contentTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#1C1A17',
    },
    contentProgressText: {
        fontSize: 11,
        color: '#8A8378',
        marginTop: 2,
    },
    contentProgressBarBg: {
        height: 4,
        backgroundColor: '#F0EFEA',
        borderRadius: 2,
        marginTop: 6,
    },
    contentProgressBarFill: {
        height: '100%',
        backgroundColor: '#0E7A57',
        borderRadius: 2,
    },
    contentActionArea: {
        alignItems: 'center',
        marginLeft: 12,
    },
    contentPercent: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#0E7A57',
        marginBottom: 4,
    },
    contentUploadBtn: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#0E7A57',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentDivider: {
        height: 1,
        backgroundColor: '#EFECE6',
        marginVertical: 14,
    },
    messagesCard: {
        backgroundColor: '#FFF',
        borderRadius: 24,
        marginHorizontal: 20,
        padding: 16,
        borderWidth: 1,
        borderColor: '#F0EFEA',
        marginBottom: 24,
    },
    messageItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    messageAvatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#E2DCD5',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    messageAvatarText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1C1A17',
    },
    messageContent: {
        flex: 1,
    },
    messageSender: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#1C1A17',
    },
    messagePreview: {
        fontSize: 12,
        color: '#8A8378',
        marginTop: 2,
    },
    messageMeta: {
        alignItems: 'flex-end',
    },
    messageTime: {
        fontSize: 10,
        color: '#8A8378',
    },
    messageBadge: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#0E7A57',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 4,
    },
    messageBadgeText: {
        color: '#FFF',
        fontSize: 9,
        fontWeight: 'bold',
    },
    analyticsCard: {
        backgroundColor: '#FFF',
        borderRadius: 24,
        marginHorizontal: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: '#F0EFEA',
        marginBottom: 24,
    },
    revenueHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    revenueLabel: {
        fontSize: 12,
        color: '#8A8378',
    },
    revenueValue: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1C1A17',
        marginTop: 2,
    },
    revenueGrowthBadge: {
        backgroundColor: '#E8F1EC',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
    },
    revenueGrowthBadgeText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#0E7A57',
    },
    chartContainer: {
        height: 130,
        marginTop: 16,
        justifyContent: 'flex-end',
    },
    chartBarsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    chartBarCol: {
        alignItems: 'center',
        width: '14%',
    },
    chartBarFill: {
        width: 16,
        borderRadius: 4,
        marginBottom: 6,
    },
    chartBarLabel: {
        fontSize: 10,
        color: '#8A8378',
    },
    analyticsStatsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20,
        borderTopWidth: 1,
        borderColor: '#EFECE6',
        paddingTop: 16,
        gap: 12,
    },
    analyticsStatItem: {
        width: '46%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    analyticsStatVal: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#1C1A17',
    },
    analyticsStatLbl: {
        fontSize: 10,
        color: '#8A8378',
    },
    achievementBadgeWrapper: {
        alignItems: 'center',
        width: 100,
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
        fontSize: 10,
        fontWeight: 'bold',
        color: '#1C1A17',
        textAlign: 'center',
    },
    fabBtn: {
        position: 'absolute',
        bottom: 74,
        right: 20,
        width: 56,
        height: 56,
        borderRadius: 28,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
        zIndex: 1001,
    },
    fabBtnInner: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
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
    overlayBg: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'transparent',
        zIndex: 1000,
    },
    overlayInfoText: {
        position: 'absolute',
        top: 70,
        left: 20,
        fontSize: 14,
        color: '#8A8378',
        lineHeight: 20,
    },
    overlayActionsContainer: {
        position: 'absolute',
        bottom: 140,
        right: 26,
        alignItems: 'flex-end',
        gap: 16,
    },
    overlayActionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginVertical: 4,
    },
    actionLabelPill: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: 'rgba(28, 26, 23, 0.08)',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginRight: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    actionLabelText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#1C1A17',
    },
    actionIconCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: 'rgba(28, 26, 23, 0.08)',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    overlayCloseBtnWrapper: {
        position: 'absolute',
        bottom: 74,
        right: 20,
        zIndex: 1001,
    },
    overlayCloseBtn: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#1C1A17',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
    },
});

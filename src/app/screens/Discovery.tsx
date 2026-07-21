import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as React from 'react';
import { 
    ScrollView, 
    StyleSheet, 
    Text, 
    View, 
    TouchableOpacity 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function DiscoveryScreen() {
    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <StatusBar style="dark" />
            
            {/* Header Row */}
            <View style={styles.headerRow}>
                <View style={styles.appIconWrapper}>
                    <Ionicons name="sparkles" size={20} color="#FFF" />
                </View>
                <View style={styles.headerTextWrapper}>
                    <Text style={styles.headerTitle}>Hosty AI</Text>
                    <View style={styles.statusRow}>
                        <View style={styles.statusDot} />
                        <Text style={styles.statusText}>Online</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.historyBtn}>
                    <Ionicons name="time-outline" size={20} color="#1C1A17" />
                </TouchableOpacity>
            </View>

            {/* Chat Area ScrollView */}
            <ScrollView 
                style={styles.scrollView} 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Hosty Welcome Message */}
                <View style={styles.hostyBubble}>
                    <Text style={styles.hostyText}>
                        {"Hi Siddharth 👋 I'm "}
                        <Text style={{ fontWeight: 'bold' }}>{"Hosty"}</Text>
                        {", your travel-collab copilot. I can find stays, brand deals and campaigns matched to your audience. What are you looking for?"}
                    </Text>
                </View>

                {/* User Message */}
                <View style={styles.userBubble}>
                    <Text style={styles.userText}>Find luxury villas in Bali for next month</Text>
                </View>

                {/* Hosty Search Result Card */}
                <View style={styles.resultsCard}>
                    <Text style={styles.resultsTitle}>
                        {"Found "}
                        <Text style={{ fontWeight: 'bold' }}>{"3 luxury villas"}</Text>
                        {" in Bali matching your travel audience:"}
                    </Text>

                    {/* Result Item 1 */}
                    <View style={styles.resultItem}>
                        <View style={[styles.resultThumbnail, { backgroundColor: '#E9E3DB' }]} />
                        <View style={styles.resultDetails}>
                            <Text style={styles.resultName}>The Edge Villa</Text>
                            <Text style={styles.resultSubtitle}>Uluwatu • Free 4–night stay</Text>
                        </View>
                        <View style={styles.matchScoreBadge}>
                            <Text style={styles.matchScoreText}>92%</Text>
                        </View>
                    </View>

                    {/* Result Item 2 */}
                    <View style={styles.resultItem}>
                        <View style={[styles.resultThumbnail, { backgroundColor: '#ECE9E2' }]} />
                        <View style={styles.resultDetails}>
                            <Text style={styles.resultName}>Hanging Gardens</Text>
                            <Text style={styles.resultSubtitle}>Ubud • Paid + stay</Text>
                        </View>
                        <View style={styles.matchScoreBadge}>
                            <Text style={styles.matchScoreText}>87%</Text>
                        </View>
                    </View>
                </View>

                {/* Suggested Prompts Section */}
                <Text style={styles.suggestedPromptsHeader}>SUGGESTED PROMPTS</Text>

                {/* Prompt Item 1 */}
                <View style={styles.promptItem}>
                    <View style={[styles.promptIconBg, { backgroundColor: 'rgba(14, 122, 87, 0.1)' }]}>
                        <MaterialCommunityIcons name="palm-tree" size={18} color="#0E7A57" />
                    </View>
                    <Text style={styles.promptText}>Find luxury villas in Bali</Text>
                    <Feather name="arrow-up-right" size={16} color="#8A8378" />
                </View>

                {/* Prompt Item 2 */}
                <View style={styles.promptItem}>
                    <View style={[styles.promptIconBg, { backgroundColor: 'rgba(14, 122, 87, 0.1)' }]}>
                        <Feather name="gift" size={16} color="#0E7A57" />
                    </View>
                    <Text style={styles.promptText}>Find free stays in California</Text>
                    <Feather name="arrow-up-right" size={16} color="#8A8378" />
                </View>

                {/* Prompt Item 3 */}
                <View style={styles.promptItem}>
                    <View style={[styles.promptIconBg, { backgroundColor: 'rgba(231, 178, 92, 0.1)' }]}>
                        <Ionicons name="megaphone-outline" size={16} color="#E7B25C" />
                    </View>
                    <Text style={styles.promptText}>Travel campaigns for creators</Text>
                    <Feather name="arrow-up-right" size={16} color="#8A8378" />
                </View>

                {/* Prompt Item 4 */}
                <View style={styles.promptItem}>
                    <View style={[styles.promptIconBg, { backgroundColor: 'rgba(231, 178, 92, 0.1)' }]}>
                        <Ionicons name="restaurant-outline" size={16} color="#E7B25C" />
                    </View>
                    <Text style={styles.promptText}>Restaurants in Goa</Text>
                    <Feather name="arrow-up-right" size={16} color="#8A8378" />
                </View>
            </ScrollView>

            {/* Bottom Input Area */}
            <View style={styles.inputContainer}>
                <Text style={styles.inputPlaceholder}>Ask Hosty anything...</Text>
                <TouchableOpacity style={styles.sendIconBtn}>
                    <Feather name="arrow-up" size={18} color="#FFF" />
                </TouchableOpacity>
            </View>

            {/* Bottom Tab Bar */}
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

                <TouchableOpacity style={styles.tabBarItem}>
                    <Ionicons name="sparkles" size={20} color="#0E7A57" />
                    <Text style={[styles.tabBarLabel, { color: '#0E7A57', fontWeight: 'bold' }]}>Discovery AI</Text>
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
    appIconWrapper: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#0E7A57',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTextWrapper: {
        flex: 1,
        marginLeft: 12,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1C1A17',
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#0E7A57',
        marginRight: 4,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#0E7A57',
    },
    historyBtn: {
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
    hostyBubble: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#F0EFEA',
        borderRadius: 18,
        padding: 16,
        marginHorizontal: 20,
        marginTop: 16,
        maxWidth: '85%',
        alignSelf: 'flex-start',
    },
    hostyText: {
        fontSize: 13.5,
        color: '#1C1A17',
        lineHeight: 20,
    },
    userBubble: {
        backgroundColor: '#0E7A57',
        borderRadius: 18,
        padding: 16,
        marginHorizontal: 20,
        marginTop: 16,
        maxWidth: '80%',
        alignSelf: 'flex-end',
    },
    userText: {
        fontSize: 13.5,
        color: '#FFF',
        lineHeight: 20,
    },
    resultsCard: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#F0EFEA',
        borderRadius: 20,
        padding: 16,
        marginHorizontal: 20,
        marginTop: 16,
    },
    resultsTitle: {
        fontSize: 13,
        color: '#1C1A17',
        lineHeight: 18,
        marginBottom: 4,
    },
    resultItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FAF8F5',
        borderRadius: 16,
        padding: 12,
        marginTop: 12,
    },
    resultThumbnail: {
        width: 48,
        height: 48,
        borderRadius: 10,
        marginRight: 12,
    },
    resultDetails: {
        flex: 1,
    },
    resultName: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#1C1A17',
    },
    resultSubtitle: {
        fontSize: 11,
        color: '#8A8378',
        marginTop: 2,
    },
    matchScoreBadge: {
        backgroundColor: 'rgba(14, 122, 87, 0.1)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    matchScoreText: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#0E7A57',
    },
    suggestedPromptsHeader: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#8A8378',
        letterSpacing: 0.8,
        marginHorizontal: 20,
        marginTop: 24,
        marginBottom: 12,
    },
    promptItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#F0EFEA',
        borderRadius: 16,
        padding: 12,
        marginHorizontal: 20,
        marginBottom: 8,
    },
    promptIconBg: {
        width: 36,
        height: 36,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    promptText: {
        fontSize: 13.5,
        fontWeight: 'bold',
        color: '#1C1A17',
        flex: 1,
    },
    inputContainer: {
        height: 54,
        borderRadius: 27,
        borderWidth: 1,
        borderColor: 'rgba(28, 26, 23, 0.08)',
        backgroundColor: '#FFF',
        marginHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        marginVertical: 12,
    },
    inputPlaceholder: {
        fontSize: 13.5,
        color: '#8A8378',
        flex: 1,
        paddingLeft: 8,
    },
    sendIconBtn: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: '#0E7A57',
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
});

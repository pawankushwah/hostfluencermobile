import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileSuccessScreen() {
    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
            <View style={styles.container}>
                
                {/* Illustration Placeholder */}
                <View style={styles.illustrationContainer}>
                    <Image 
                        source={require('../../../assets/screen/bro.svg')} 
                        style={styles.illustrationImage} 
                        contentFit="contain"
                    />
                </View>

                {/* Text Content */}
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{"You're Ready To"}{'\n'}Collaborate</Text>
                    <Text style={styles.subtitle}>
                        Your Hostfluencer profile has been created{'\n'}successfully.
                    </Text>
                </View>

                {/* Status Card */}
                <View style={styles.statusCard}>
                    {/* Profile Completion */}
                    <View style={styles.statusRow}>
                        <Text style={styles.statusLabel}>Profile completion</Text>
                        <Text style={styles.statusValue}>100%</Text>
                    </View>
                    
                    {/* Progress Bar */}
                    <View style={styles.progressBarContainer}>
                        <View style={styles.progressBarFill} />
                    </View>

                    <View style={styles.divider} />

                    {/* Verification */}
                    <View style={styles.statusRow}>
                        <Text style={styles.statusLabel}>Verification</Text>
                        <View style={styles.pendingBadge}>
                            <Feather name="more-horizontal" size={14} color="#4A6570" style={{ marginRight: 4 }} />
                            <Text style={styles.pendingBadgeText}>Pending</Text>
                        </View>
                    </View>
                </View>

            </View>

            {/* Bottom Button */}
            <View style={styles.bottomBar}>
                <Pressable 
                    style={styles.dashboardButton}
                    onPress={() => router.push('/screens/Dashboard' as any)}
                >
                    <Text style={styles.dashboardButtonText}>Go To Dashboard</Text>
                    <Feather name="arrow-right" size={20} color="#FFF" style={{ marginLeft: 8 }} />
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
    container: {
        flex: 1,
        paddingHorizontal: 24,
        alignItems: 'center',
    },
    illustrationContainer: {
        marginTop: 24,
        marginBottom: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    illustrationImage: {
        width: 220,
        height: 220,
    },
    textContainer: {
        alignItems: 'center',
        marginBottom: 32,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#0B1C30',
        textAlign: 'center',
        lineHeight: 38,
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 15,
        color: '#3C4A42',
        textAlign: 'center',
        lineHeight: 24,
    },
    statusCard: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    statusRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    statusLabel: {
        fontSize: 15,
        color: '#0B1C30',
        fontWeight: '500',
    },
    statusValue: {
        fontSize: 15,
        color: '#0D2C21',
        fontWeight: '700',
    },
    progressBarContainer: {
        height: 6,
        backgroundColor: '#E2E8E4',
        borderRadius: 3,
        marginTop: 12,
        marginBottom: 20,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#0D2C21',
        width: '100%',
        borderRadius: 3,
    },
    divider: {
        height: 1,
        backgroundColor: '#F0F2F5',
        marginBottom: 20,
    },
    pendingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E8F1F8',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    pendingBadgeText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#4A6570',
    },
    bottomBar: {
        paddingHorizontal: 24,
        paddingBottom: 24,
        paddingTop: 16,
    },
    dashboardButton: {
        height: 56,
        borderRadius: 16,
        backgroundColor: '#0D2C21',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dashboardButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});

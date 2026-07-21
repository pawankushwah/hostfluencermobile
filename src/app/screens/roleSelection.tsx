import { Feather, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Role = 'creator' | 'host' | 'restaurant' | 'brand';

export default function RoleSelectionScreen() {
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);

    const roles = [
        {
            id: 'creator' as Role,
            title: 'Content Creator',
            description: 'Create content and collaborate with hospitality businesses.',
            icon: <Feather name="camera" size={24} color="#0D2C21" />,
        },
        {
            id: 'host' as Role,
            title: 'Property Host',
            description: 'Offer stays in exchange for creator content.',
            icon: <Feather name="home" size={24} color="#0D2C21" />,
        },
        {
            id: 'restaurant' as Role,
            title: 'Restaurant Owner',
            description: 'Promote your restaurant through partnerships.',
            icon: <Ionicons name="restaurant-outline" size={24} color="#0D2C21" />,
        },
        {
            id: 'brand' as Role,
            title: 'Brand Partner',
            description: 'Launch paid campaigns and collaborate.',
            icon: <MaterialCommunityIcons name="handshake-outline" size={24} color="#0D2C21" />,
        },
    ];

    const handleContinue = () => {
        if (selectedRole === 'creator') {
            router.push('/screens/creatorProfileSetup');
        } else if (selectedRole === 'brand') {
            router.push('/screens/brandProfileSetup');
        } else if (selectedRole === 'host') {
            router.push('/screens/hostProfileSetup');
        } else if (selectedRole) {
            router.push('/screens/Dashboard' as any);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
            <View style={styles.headerContainer}>
                <Pressable onPress={() => router.back()} style={styles.backButton}>
                    <Feather name="arrow-left" size={24} color="#0B1C30" />
                </Pressable>
                <Text style={styles.brandText}>Hostfluencer</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>How will you use{'\n'}Hostfluencer?</Text>
                    <Text style={styles.subtitle}>Choose your primary role.</Text>
                </View>

                <View style={styles.cardsContainer}>
                    {roles.map((role) => (
                        <Pressable
                            key={role.id}
                            style={[
                                styles.card,
                                selectedRole === role.id && styles.cardSelected,
                            ]}
                            onPress={() => setSelectedRole(role.id)}
                        >
                            <View style={styles.iconContainer}>
                                {role.icon}
                            </View>
                            <Text style={styles.cardTitle}>{role.title}</Text>
                            <Text style={styles.cardDescription}>{role.description}</Text>
                        </Pressable>
                    ))}
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <Pressable
                    style={[
                        styles.continueButton,
                        selectedRole ? styles.continueButtonActive : styles.continueButtonDisabled,
                    ]}
                    onPress={handleContinue}
                    disabled={!selectedRole}
                >
                    <Text style={styles.continueButtonText}>Continue</Text>
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
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 24,
    },
    backButton: {
        padding: 4,
    },
    brandText: {
        fontSize: 20,
        fontWeight: '700',
        color: '#0D2C21',
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    titleContainer: {
        marginBottom: 32,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#0B1C30',
        lineHeight: 40,
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 16,
        color: '#3C4A42',
        fontWeight: '400',
    },
    cardsContainer: {
        gap: 16,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 24,
        borderWidth: 1,
        borderColor: 'transparent',
        // Optional: add a subtle shadow for unselected cards
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    cardSelected: {
        borderColor: '#0D2C21',
        backgroundColor: '#FFFFFF',
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#E5EEFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0B1C30',
        marginBottom: 8,
    },
    cardDescription: {
        fontSize: 14,
        color: '#3C4A42',
        lineHeight: 20,
    },
    footer: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#F8F9FF',
    },
    continueButton: {
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    continueButtonActive: {
        backgroundColor: '#113222',
    },
    continueButtonDisabled: {
        backgroundColor: '#889A92',
    },
    continueButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});

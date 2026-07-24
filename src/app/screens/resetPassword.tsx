import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ResetPasswordScreen() {
    const [email, setEmail] = useState('');

    const handleSendResetLink = () => {
        const trimmedEmail = email.trim();

        if (!trimmedEmail) {
            Alert.alert('Validation Error', 'Please enter your email address.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmedEmail)) {
            Alert.alert('Validation Error', 'Please enter a valid email address.');
            return;
        }

        Alert.alert(
            'Link Sent',
            `We have sent a password reset link to ${trimmedEmail}.`,
            [
                {
                    text: 'OK',
                    onPress: () => router.push('/screens/login'),
                },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
                <View style={styles.headerBar}>
                    <Pressable
                        style={styles.backButton}
                        onPress={() => {
                            if (router.canGoBack()) {
                                router.back();
                            } else {
                                router.push('/screens/login');
                            }
                        }}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <Feather name="chevron-left" size={20} color="#1C1A17" />
                    </Pressable>
                </View>

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                <View style={styles.contentContainer}>
                    {/* Green Lock Icon Box */}
                    <View style={styles.lockIconBox}>
                        <Feather name="lock" size={28} color="#0E7A57" />
                    </View>

                    {/* Title & Subtitle */}
                    <Text style={styles.title}>Reset your password</Text>
                    <Text style={styles.subtitle}>
                        {"Enter your email and we'll send you a link to reset your password."}
                    </Text>

                    {/* Form Group */}
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>EMAIL ADDRESS</Text>
                        <View style={styles.inputContainer}>
                            <Feather name="mail" size={18} color="#A09A90" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="hello@hostfluencer.com"
                                placeholderTextColor="#A09A90"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                        </View>
                    </View>

                    {/* Send Reset Link Button */}
                    <Pressable
                        style={({ pressed }) => [
                            styles.sendButton,
                            pressed && styles.sendButtonPressed,
                        ]}
                        onPress={handleSendResetLink}
                    >
                        <Text style={styles.sendButtonText}>Send reset link</Text>
                    </Pressable>

                    {/* Remember your password link */}
                    <Pressable
                        style={styles.rememberLink}
                        onPress={() => {
                            if (router.canGoBack()) {
                                router.back();
                            } else {
                                router.push('/screens/login');
                            }
                        }}
                    >
                        <Text style={styles.rememberLinkText}>Remember your password?</Text>
                    </Pressable>
                </View>
            </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FAF8F5',
    },
    headerBar: {
        paddingHorizontal: 20,
        paddingTop: 8,
        paddingBottom: 8,
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: 'rgba(28, 26, 23, 0.08)',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
        elevation: 2,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 40,
        alignItems: 'center',
    },
    contentContainer: {
        width: '100%',
        alignItems: 'center',
    },
    lockIconBox: {
        width: 76,
        height: 76,
        borderRadius: 24,
        backgroundColor: '#E8F3EE',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 28,
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        color: '#0B1C30',
        textAlign: 'center',
        marginBottom: 10,
        letterSpacing: -0.3,
    },
    subtitle: {
        fontSize: 15,
        fontWeight: '400',
        color: '#8A8378',
        textAlign: 'center',
        lineHeight: 22,
        paddingHorizontal: 12,
        marginBottom: 32,
    },
    formGroup: {
        width: '100%',
        marginBottom: 24,
    },
    label: {
        fontSize: 11,
        fontWeight: '600',
        color: '#8A8378',
        letterSpacing: 0.6,
        marginBottom: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 56,
        borderRadius: 16,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#EFECE6',
        paddingHorizontal: 16,
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: '#1C1A17',
        height: '100%',
    },
    sendButton: {
        width: '100%',
        height: 56,
        borderRadius: 16,
        backgroundColor: '#0A2E23',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        shadowColor: '#0A2E23',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.35,
        shadowRadius: 16,
        elevation: 8,
    },
    sendButtonPressed: {
        opacity: 0.9,
        transform: [{ scale: 0.995 }],
    },
    sendButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
    },
    rememberLink: {
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    rememberLinkText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#8A8378',
        textAlign: 'center',
    },
});

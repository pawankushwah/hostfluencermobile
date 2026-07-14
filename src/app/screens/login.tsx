import image from '@/assets/screen/Decorative Visual Header.png';
import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = () => {
        const trimmedEmail = email.trim();
        const trimmedPassword = password;

        if (!trimmedEmail) {
            Alert.alert('Validation Error', 'Please enter your email address.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmedEmail)) {
            Alert.alert('Validation Error', 'Please enter a valid email address.');
            return;
        }

        if (!trimmedPassword) {
            Alert.alert('Validation Error', 'Please enter your password.');
            return;
        }

        if (trimmedPassword.length < 6) {
            Alert.alert('Validation Error', 'Password must be at least 6 characters.');
            return;
        }

        router.push('/screens/roleSelection');
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['bottom']}>
            <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
                <View style={styles.card}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={image}
                            style={styles.heroImage}
                            contentFit="cover"
                        />
                        <LinearGradient
                            colors={['transparent', '#FFFFFF']}
                            style={styles.gradient}
                            locations={[0.5, 1]}
                        />
                    </View>

                    <View style={styles.contentContainer}>
                        <View style={styles.header}>
                            <Text style={styles.title}>Welcome Back</Text>
                            <Text style={styles.subtitle}>Sign in to continue managing your stays.</Text>
                        </View>

                        <View style={styles.formContainer}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>EMAIL ADDRESS</Text>
                                <View style={styles.inputContainer}>
                                    <Feather name="mail" size={20} color="#A0A0A0" style={styles.inputIcon} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="hello@hostfluencer.com"
                                        placeholderTextColor="#A0A0A0"
                                        value={email}
                                        onChangeText={setEmail}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                    />
                                </View>
                            </View>

                            <View style={styles.inputGroup}>
                                <View style={styles.labelRow}>
                                    <Text style={styles.label}>PASSWORD</Text>
                                    <Pressable>
                                        <Text style={styles.forgotText}>Forgot?</Text>
                                    </Pressable>
                                </View>
                                <View style={styles.inputContainer}>
                                    <Feather name="lock" size={20} color="#A0A0A0" style={styles.inputIcon} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="••••••••"
                                        placeholderTextColor="#A0A0A0"
                                        value={password}
                                        onChangeText={setPassword}
                                        secureTextEntry={!showPassword}
                                    />
                                    <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                                        <Feather name={showPassword ? 'eye-off' : 'eye'} size={20} color="#A0A0A0" />
                                    </Pressable>
                                </View>
                            </View>

                            <Pressable
                                style={styles.checkboxContainer}
                                onPress={() => setRememberMe(!rememberMe)}
                            >
                                <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
                                    {rememberMe && <Feather name="check" size={14} color="#FFF" />}
                                </View>
                                <Text style={styles.checkboxLabel}>Remember me for 30 days</Text>
                            </Pressable>

                            <Pressable style={styles.loginButton} onPress={handleLogin}>
                                <Text style={styles.loginButtonText}>Login</Text>
                                <Feather name="arrow-right" size={20} color="#FFF" style={styles.loginButtonIcon} />
                            </Pressable>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.footer}>
                            <Text style={styles.footerText}>{"Don't have an account? "}</Text>
                            <Pressable onPress={() => router.replace('/screens/signup')}>
                                <Text style={styles.createAccountText}>Create Account</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </ScrollView>
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
        backgroundColor: '#F8F9FF',
    },
    scrollContent: {
        flexGrow: 1,
        paddingVertical: 33,
        paddingHorizontal: 16,
        paddingBottom: 40,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        overflow: 'hidden',
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.08,
        shadowRadius: 40,
        elevation: 10,
        marginBottom: 24,
        display: "flex",
        flexDirection: "column"
    },
    imageContainer: {
        height: 192,
        width: '100%',
        position: 'relative',
    },
    heroImage: {
        width: '100%',
        height: '100%',
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '50%',
    },
    contentContainer: {
        paddingHorizontal: 24,
        paddingBottom: 32,
        paddingTop: 16,
        zIndex: 1,
    },
    header: {
        alignItems: 'center',
        marginBottom: 32,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#0B1C30',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 15,
        color: '#3C4A42',
        textAlign: 'center',
        fontWeight: '400',
    },
    formContainer: {
        gap: 20,
    },
    inputGroup: {
        gap: 8,
    },
    labelRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    label: {
        fontSize: 12,
        fontWeight: '600',
        color: '#3C4A42',
        letterSpacing: 0.5,
    },
    forgotText: {
        fontSize: 13,
        fontWeight: '500',
        color: '#0B1C30',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#BBCABF',
        borderRadius: 16,
        height: 56,
        paddingHorizontal: 16,
        backgroundColor: '#FFFFFF',
    },
    inputIcon: {
        marginRight: 12,
    },
    eyeIcon: {
        padding: 4,
    },
    input: {
        flex: 1,
        height: '100%',
        fontSize: 15,
        color: '#0B1C30',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
        marginBottom: 8,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#BBCABF',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    checkboxActive: {
        backgroundColor: '#113222',
        borderColor: '#113222',
    },
    checkboxLabel: {
        fontSize: 14,
        color: '#3C4A42',
    },
    loginButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#113222',
        height: 56,
        borderRadius: 16,
        marginTop: 8,
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    loginButtonIcon: {
        marginLeft: 8,
    },
    divider: {
        height: 1,
        backgroundColor: '#F0F0F0',
        marginVertical: 24,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerText: {
        fontSize: 14,
        color: '#3C4A42',
    },
    createAccountText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#113222',
    },
});

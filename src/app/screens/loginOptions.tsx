import image from '@/assets/screen/Visual Header Area.svg';
import appleSvg from '@/assets/screen/apple.svg';
import facebookSvg from '@/assets/screen/facebook.svg';
import googleSvg from '@/assets/screen/google.svg';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginOptionsScreen() {
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
                            <Text style={styles.title}>Welcome to{'\n'}Hostfluencer</Text>
                            <Text style={styles.subtitle}>{"Choose how you'd like to continue."}</Text>
                        </View>

                        <View style={styles.socialButtons}>
                            <Pressable style={[styles.button, styles.googleButton]}>
                                <Image source={googleSvg} style={styles.buttonIconImage} contentFit="contain" />
                                <Text style={styles.googleButtonText}>Continue with Google</Text>
                            </Pressable>

                            <Pressable style={[styles.button, styles.appleButton]}>
                                <Image source={appleSvg} style={styles.buttonIconImage} contentFit="contain" />
                                <Text style={styles.appleButtonText}>Continue with Apple</Text>
                            </Pressable>

                            <Pressable style={[styles.button, styles.facebookButton]}>
                                <Image source={facebookSvg} style={styles.buttonIconImage} contentFit="contain" />
                                <Text style={styles.facebookButtonText}>Continue with Facebook</Text>
                            </Pressable>
                        </View>

                        <View style={styles.dividerContainer}>
                            <View style={styles.dividerLine} />
                            <Text style={styles.dividerText}>OR</Text>
                            <View style={styles.dividerLine} />
                        </View>

                        <View style={styles.authButtons}>
                            <Pressable
                                style={[styles.button, styles.loginButton]}
                                onPress={() => router.push('/screens/login')}
                            >
                                <Text style={styles.loginButtonText}>Login</Text>
                            </Pressable>

                            <Pressable
                                style={[styles.button, styles.createAccountButton]}
                                onPress={() => router.push('/screens/signup')}
                            >
                                <Text style={styles.createAccountButtonText}>Create Account</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>

                <Text style={styles.footerText}>
                    By continuing, you agree to our <Text style={styles.footerLink}>Terms of Service</Text> and <Text style={styles.footerLink}>Privacy Policy</Text>.
                </Text>
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
        paddingBottom: 24,
        marginTop: -20,
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
        lineHeight: 40,
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 15,
        color: '#3C4A42',
        textAlign: 'center',
        fontWeight: '400',
    },
    socialButtons: {
        gap: 16,
        marginBottom: 24,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 56,
        borderRadius: 16,
        paddingHorizontal: 16,
    },
    buttonIconImage: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    googleButton: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E8E8E8',
    },
    googleButtonText: {
        color: '#0B1C30',
        fontSize: 15,
        fontWeight: '600',
    },
    appleButton: {
        backgroundColor: '#000000',
    },
    appleButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '600',
    },
    facebookButton: {
        backgroundColor: '#1877F2',
    },
    facebookButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '600',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
        paddingHorizontal: 10,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#E8E8E8',
    },
    dividerText: {
        color: '#BBCABF',
        paddingHorizontal: 16,
        fontSize: 13,
        fontWeight: '500',
    },
    authButtons: {
        gap: 16,
        marginBottom: 32,
    },
    loginButton: {
        backgroundColor: '#113222',
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '600',
    },
    createAccountButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#113222',
    },
    createAccountButtonText: {
        color: '#113222',
        fontSize: 15,
        fontWeight: '600',
    },
    footerText: {
        textAlign: 'center',
        fontSize: 12,
        color: '#707070',
        lineHeight: 18,
        paddingHorizontal: 10,
    },
    footerLink: {
        fontWeight: '600',
        color: '#3C4A42',
    },
});

import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BrandProfileSetupScreen() {
    const [brandName, setBrandName] = useState('');
    const [industry, setIndustry] = useState('');
    const [companySize, setCompanySize] = useState('');
    const [website, setWebsite] = useState('');
    const [socialLink, setSocialLink] = useState('');
    const [description, setDescription] = useState('');

    const [hasImage, setHasImage] = useState(false);

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
            <View style={styles.headerContainer}>
                <Pressable onPress={() => router.back()} style={styles.backButton}>
                    <Feather name="arrow-left" size={24} color="#0B1C30" />
                </Pressable>
                
                <Text style={styles.headerTitle}>Hostfluencer</Text>
                
                <View style={{ width: 24 }} />
            </View>

            <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Set up your brand{'\n'}profile</Text>
                    <Text style={styles.subtitle}>Tell us about your company to help creators understand your brand identity and goals.</Text>
                </View>

                <View style={styles.card}>
                    {/* Upload Section */}
                    <View style={styles.uploadSection}>
                        <Pressable style={styles.imagePlaceholder} onPress={() => setHasImage(!hasImage)}>
                            {hasImage ? (
                                <View style={styles.mockImage}>
                                    <Feather name="check" size={24} color="#0D2C21" />
                                </View>
                            ) : (
                                <>
                                    <MaterialCommunityIcons name="image-plus" size={24} color="#0B1C30" style={{ marginBottom: 4 }} />
                                    <Text style={styles.uploadText}>Upload Logo</Text>
                                </>
                            )}
                        </Pressable>
                    </View>

                    <View style={styles.formContainer}>
                        {/* Brand Name */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Brand Name <Text style={styles.required}>*</Text></Text>
                            <View style={styles.inputContainer}>
                                <MaterialCommunityIcons name="storefront-outline" size={20} color="#6C7A72" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="e.g. Acme Corp"
                                    placeholderTextColor="#A0A0A0"
                                    value={brandName}
                                    onChangeText={setBrandName}
                                />
                            </View>
                        </View>

                        {/* Industry */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Industry <Text style={styles.required}>*</Text></Text>
                            <Pressable style={styles.inputContainer}>
                                <MaterialCommunityIcons name="shape-outline" size={20} color="#6C7A72" style={styles.inputIcon} />
                                <Text style={[
                                    styles.input, 
                                    !industry && { color: '#A0A0A0' },
                                    { height: undefined, textAlignVertical: 'center' }
                                ]}>
                                    {industry || 'Select industry'}
                                </Text>
                                <Feather name="chevron-down" size={20} color="#6C7A72" />
                            </Pressable>
                        </View>

                        {/* Company Size */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Company Size</Text>
                            <Pressable style={styles.inputContainer}>
                                <Feather name="users" size={20} color="#6C7A72" style={styles.inputIcon} />
                                <Text style={[
                                    styles.input, 
                                    !companySize && { color: '#A0A0A0' },
                                    { height: undefined, textAlignVertical: 'center' }
                                ]}>
                                    {companySize || 'Select size'}
                                </Text>
                                <Feather name="chevron-down" size={20} color="#6C7A72" />
                            </Pressable>
                        </View>

                        {/* Website */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Website</Text>
                            <View style={styles.inputContainer}>
                                <Feather name="globe" size={20} color="#6C7A72" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="https://www.yourbrand.com"
                                    placeholderTextColor="#A0A0A0"
                                    value={website}
                                    onChangeText={setWebsite}
                                    autoCapitalize="none"
                                    keyboardType="url"
                                />
                            </View>
                        </View>

                        {/* Primary Social Link */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Primary Social Link</Text>
                            <View style={[styles.inputContainer, { height: 60, alignItems: 'center' }]}>
                                <Feather name="at-sign" size={20} color="#6C7A72" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Instagram, TikTok, or LinkedIn URL"
                                    placeholderTextColor="#A0A0A0"
                                    value={socialLink}
                                    onChangeText={setSocialLink}
                                    autoCapitalize="none"
                                    multiline
                                />
                            </View>
                        </View>

                        {/* Brand Description */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Brand Description <Text style={styles.required}>*</Text></Text>
                            <View style={[styles.inputContainer, styles.textAreaContainer]}>
                                <TextInput
                                    style={styles.textArea}
                                    placeholder="Briefly describe your brand's mission, values, and what makes you unique..."
                                    placeholderTextColor="#A0A0A0"
                                    value={description}
                                    onChangeText={setDescription}
                                    multiline
                                    maxLength={500}
                                    textAlignVertical="top"
                                />
                            </View>
                            <Text style={styles.charCount}>{description.length} / 500</Text>
                        </View>

                        <View style={styles.actionButtonsContainer}>
                            <Pressable 
                                style={styles.skipButton}
                                onPress={() => router.push('/screens/home')}
                            >
                                <Text style={styles.skipButtonText}>Skip for now</Text>
                            </Pressable>
                            
                            <Pressable 
                                style={styles.continueButton}
                                onPress={() => router.push('/screens/profileSuccess')}
                            >
                                <Text style={styles.continueButtonText}>Continue</Text>
                                <Feather name="arrow-right" size={20} color="#FFF" style={{ marginLeft: 8 }} />
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
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 16,
    },
    backButton: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0B1C30',
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    titleContainer: {
        marginTop: 16,
        marginBottom: 32,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#0B1C30',
        marginBottom: 12,
        textAlign: 'center',
        lineHeight: 34,
    },
    subtitle: {
        fontSize: 15,
        color: '#3C4A42',
        fontWeight: '400',
        textAlign: 'center',
        paddingHorizontal: 10,
        lineHeight: 22,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    uploadSection: {
        alignItems: 'center',
        marginBottom: 24,
        marginTop: 8,
    },
    imagePlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#E5EEFF',
        borderWidth: 1.5,
        borderColor: '#BBCABF',
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mockImage: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
        backgroundColor: '#D1E0E8',
        justifyContent: 'center',
        alignItems: 'center',
    },
    uploadText: {
        fontSize: 11,
        color: '#0B1C30',
        fontWeight: '600',
    },
    formContainer: {
        gap: 20,
    },
    inputGroup: {
        gap: 8,
    },
    label: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0B1C30',
    },
    required: {
        color: '#D32F2F',
    },
    charCount: {
        fontSize: 12,
        color: '#A0A0A0',
        textAlign: 'right',
        marginTop: 4,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#BBCABF',
        borderRadius: 12,
        minHeight: 52,
        paddingHorizontal: 16,
        backgroundColor: '#FFFFFF',
    },
    textAreaContainer: {
        height: 100,
        alignItems: 'flex-start',
        paddingVertical: 12,
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 14,
        color: '#0B1C30',
        height: '100%',
    },
    textArea: {
        flex: 1,
        fontSize: 14,
        color: '#0B1C30',
        width: '100%',
    },
    actionButtonsContainer: {
        gap: 12,
        marginTop: 8,
    },
    skipButton: {
        height: 52,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E2E8E4',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    skipButtonText: {
        color: '#0B1C30',
        fontSize: 15,
        fontWeight: '600',
    },
    continueButton: {
        height: 52,
        borderRadius: 16,
        backgroundColor: '#0D2C21',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    continueButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '600',
    },
});

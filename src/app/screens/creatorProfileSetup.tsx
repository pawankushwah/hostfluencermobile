import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CreatorProfileSetupScreen() {
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');

    const [igHandle, setIgHandle] = useState('');
    const [igFollowers, setIgFollowers] = useState('');

    const [tiktokHandle, setTiktokHandle] = useState('');
    const [tiktokFollowers, setTiktokFollowers] = useState('');

    const [hasImage, setHasImage] = useState(false);

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
            <View style={styles.headerContainer}>
                <Pressable onPress={() => router.back()} style={styles.backButton}>
                    <Feather name="arrow-left" size={20} color="#0B1C30" />
                </Pressable>

                <View style={styles.paginationContainer}>
                    <View style={styles.paginationDot} />
                    <View style={[styles.paginationDot, styles.paginationDotActive]} />
                    <View style={styles.paginationDot} />
                </View>

                <View style={{ width: 40 }} />
            </View>

            <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Tell us about yourself</Text>
                    <Text style={styles.subtitle}>Let hosts know what makes your content unique.</Text>
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
                                    <Feather name="camera" size={24} color="#0B1C30" style={{ marginBottom: 4 }} />
                                    <Text style={styles.uploadText}>Upload</Text>
                                </>
                            )}
                        </Pressable>
                    </View>

                    <View style={styles.formContainer}>
                        {/* Username */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Username</Text>
                            <View style={styles.inputContainer}>
                                <Text style={styles.inputIconText}>@</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="janedoe"
                                    placeholderTextColor="#A0A0A0"
                                    value={username}
                                    onChangeText={setUsername}
                                    autoCapitalize="none"
                                />
                            </View>
                        </View>

                        {/* Bio */}
                        <View style={styles.inputGroup}>
                            <View style={styles.labelRow}>
                                <Text style={styles.label}>Bio</Text>
                                <Text style={styles.charCount}>{bio.length} / 150</Text>
                            </View>
                            <View style={[styles.inputContainer, styles.textAreaContainer]}>
                                <TextInput
                                    style={styles.textArea}
                                    placeholder="I travel the world seeking the most unique boutique hotels..."
                                    placeholderTextColor="#A0A0A0"
                                    value={bio}
                                    onChangeText={setBio}
                                    multiline
                                    maxLength={150}
                                    textAlignVertical="top"
                                />
                            </View>
                        </View>

                        {/* Location */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Location</Text>
                            <View style={styles.inputContainer}>
                                <Feather name="map-pin" size={18} color="#0B1C30" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="City, Country"
                                    placeholderTextColor="#A0A0A0"
                                    value={location}
                                    onChangeText={setLocation}
                                />
                            </View>
                        </View>

                        {/* Content Category */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Content Category</Text>
                            <Pressable style={[styles.inputContainer, { height: 44 }]}>
                                <Text style={[
                                    styles.input, 
                                    !category && { color: '#A0A0A0' },
                                    { height: undefined, textAlignVertical: 'center' }
                                ]}>
                                    {category || 'Select a focus...'}
                                </Text>
                                <Feather name="chevron-down" size={20} color="#0B1C30" />
                            </Pressable>
                        </View>

                        {/* Social Presence Section */}
                        <View style={styles.socialSection}>
                            <Text style={styles.socialSectionTitle}>Social Presence</Text>

                            {/* Instagram Card */}
                            <View style={styles.socialCard}>
                                <View style={styles.socialHeader}>
                                    <View style={[styles.socialIconContainer, { backgroundColor: '#E1306C' }]}>
                                        <Feather name="instagram" size={16} color="#FFF" />
                                    </View>
                                    <Text style={styles.socialName}>Instagram</Text>
                                </View>
                                <View style={styles.socialInputContainer}>
                                    <TextInput
                                        style={styles.socialInput}
                                        placeholder="@handle"
                                        placeholderTextColor="#A0A0A0"
                                        value={igHandle}
                                        onChangeText={setIgHandle}
                                        autoCapitalize="none"
                                    />
                                </View>
                                <View style={styles.socialInputContainer}>
                                    <TextInput
                                        style={styles.socialInput}
                                        placeholder="Followers count"
                                        placeholderTextColor="#A0A0A0"
                                        value={igFollowers}
                                        onChangeText={setIgFollowers}
                                        keyboardType="numeric"
                                    />
                                </View>
                            </View>

                            {/* TikTok Card */}
                            <View style={styles.socialCard}>
                                <View style={styles.socialHeader}>
                                    <View style={[styles.socialIconContainer, { backgroundColor: '#000000' }]}>
                                        <FontAwesome5 name="tiktok" size={16} color="#FFF" />
                                    </View>
                                    <Text style={styles.socialName}>TikTok</Text>
                                </View>
                                <View style={styles.socialInputContainer}>
                                    <TextInput
                                        style={styles.socialInput}
                                        placeholder="@handle"
                                        placeholderTextColor="#A0A0A0"
                                        value={tiktokHandle}
                                        onChangeText={setTiktokHandle}
                                        autoCapitalize="none"
                                    />
                                </View>
                                <View style={styles.socialInputContainer}>
                                    <TextInput
                                        style={styles.socialInput}
                                        placeholder="Followers count"
                                        placeholderTextColor="#A0A0A0"
                                        value={tiktokFollowers}
                                        onChangeText={setTiktokFollowers}
                                        keyboardType="numeric"
                                    />
                                </View>
                            </View>
                        </View>

                        <Pressable
                            style={styles.continueButton}
                            onPress={() => router.push('/screens/profileSuccess')}
                        >
                            <Text style={styles.continueButtonText}>Continue</Text>
                            <Feather name="arrow-right" size={20} color="#FFF" style={{ marginLeft: 8 }} />
                        </Pressable>

                        <Text style={styles.footerText}>
                            You can always update this information later.
                        </Text>
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
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#BBCABF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    paginationContainer: {
        flexDirection: 'row',
        gap: 6,
        alignItems: 'center',
    },
    paginationDot: {
        height: 6,
        width: 8,
        borderRadius: 3,
        backgroundColor: 'rgba(187, 202, 191, 0.3)',
    },
    paginationDotActive: {
        width: 32,
        backgroundColor: '#0D2C21',
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
    },
    subtitle: {
        fontSize: 15,
        color: '#3C4A42',
        fontWeight: '400',
        textAlign: 'center',
        paddingHorizontal: 20,
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
        marginBottom: 32,
        marginTop: 8,
    },
    imagePlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#FFFFFF',
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
        backgroundColor: '#E5EEFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    uploadText: {
        fontSize: 12,
        color: '#0B1C30',
        fontWeight: '500',
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
        fontSize: 14,
        fontWeight: '700',
        color: '#0B1C30',
    },
    charCount: {
        fontSize: 12,
        color: '#3C4A42',
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
    inputIconText: {
        fontSize: 16,
        color: '#3C4A42',
        marginRight: 8,
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: '#0B1C30',
        height: '100%',
    },
    textArea: {
        flex: 1,
        fontSize: 15,
        color: '#0B1C30',
        width: '100%',
    },
    socialSection: {
        marginTop: 12,
        gap: 16,
    },
    socialSectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0B1C30',
        marginBottom: 4,
    },
    socialCard: {
        borderWidth: 1,
        borderColor: '#F0F0F0',
        borderRadius: 20,
        padding: 16,
        gap: 12,
    },
    socialHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    socialIconContainer: {
        width: 32,
        height: 32,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    socialName: {
        fontSize: 15,
        fontWeight: '700',
        color: '#0B1C30',
    },
    socialInputContainer: {
        borderWidth: 1,
        borderColor: '#F0F0F0',
        borderRadius: 10,
        height: 48,
        paddingHorizontal: 16,
        justifyContent: 'center',
    },
    socialInput: {
        fontSize: 14,
        color: '#0B1C30',
    },
    continueButton: {
        height: 56,
        borderRadius: 16,
        backgroundColor: '#0D2C21',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
    },
    continueButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    footerText: {
        fontSize: 13,
        color: '#889A92',
        textAlign: 'center',
        marginTop: 8,
    },
});

import { supabase } from '@/lib/supabase';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Dropdown from '../../components/Dropdown';

const CATEGORY_OPTIONS = [
    { label: 'Travel', value: 'Travel' },
    { label: 'Lifestyle', value: 'Lifestyle' },
    { label: 'Food & Drink', value: 'Food & Drink' },
    { label: 'Wellness', value: 'Wellness' },
    { label: 'Fashion', value: 'Fashion' },
    { label: 'Adventure', value: 'Adventure' },
    { label: 'Luxury', value: 'Luxury' },
    { label: 'Photography', value: 'Photography' },
    { label: 'Solo Travel', value: 'Solo Travel' },
    { label: 'Family Travel', value: 'Family Travel' },
    { label: 'Beauty', value: 'Beauty' },
    { label: 'Fitness', value: 'Fitness' },
    { label: 'Technology', value: 'Technology' },
    { label: 'Business', value: 'Business' }
];

const COLLAB_PREFERENCES = [
    { id: 'Free Stay', label: 'Free Stay' },
    { id: 'Paid Partnership', label: 'Paid Partnership' },
    { id: 'Product Exchange', label: 'Product Exchange' },
    { id: 'Hybrid', label: 'Hybrid' }
];

export default function CreatorProfileSetupScreen() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [bio, setBio] = useState('');
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');
    const [collabTypes, setCollabTypes] = useState<string[]>(['Free Stay']);

    const [igHandle, setIgHandle] = useState('');
    const [igFollowers, setIgFollowers] = useState('');

    const [tiktokHandle, setTiktokHandle] = useState('');
    const [tiktokFollowers, setTiktokFollowers] = useState('');

    const [youtubeHandle, setYoutubeHandle] = useState('');
    const [youtubeFollowers, setYoutubeFollowers] = useState('');

    const [twitterHandle, setTwitterHandle] = useState('');
    const [twitterFollowers, setTwitterFollowers] = useState('');

    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadExistingProfile = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const metaFirstName = user.user_metadata?.first_name || '';
            const metaLastName = user.user_metadata?.last_name || '';

            const { data: profile } = await supabase
                .from('profiles')
                .select('first_name, last_name, bio, location, profile_photo_url')
                .eq('id', user.id)
                .maybeSingle();

            if (profile) {
                setFirstName(profile.first_name || metaFirstName);
                setLastName(profile.last_name || metaLastName);
                setBio(profile.bio || '');
                setLocation(profile.location || '');
                setProfileImage(profile.profile_photo_url || null);
            } else {
                setFirstName(metaFirstName);
                setLastName(metaLastName);
            }

            const { data: influencer } = await supabase
                .from('influencers')
                .select('instagram_url, tiktok_url, youtube_url, twitter_url, total_followers, content_niches, collaboration_preferences')
                .eq('id', user.id)
                .maybeSingle();

            if (influencer) {
                if (influencer.instagram_url) setIgHandle(influencer.instagram_url.split('/').pop() || '');
                if (influencer.tiktok_url) setTiktokHandle(influencer.tiktok_url.split('/').pop() || '');
                if (influencer.youtube_url) setYoutubeHandle(influencer.youtube_url.split('/').pop() || '');
                if (influencer.twitter_url) setTwitterHandle(influencer.twitter_url.split('/').pop() || '');
                if (influencer.content_niches && influencer.content_niches.length > 0) {
                    setCategory(influencer.content_niches[0]);
                }
                if (influencer.collaboration_preferences && influencer.collaboration_preferences.length > 0) {
                    setCollabTypes(influencer.collaboration_preferences);
                }
            }
        };

        loadExistingProfile();
    }, []);

    const toggleCollabType = (id: string) => {
        setCollabTypes(prev =>
            prev.includes(id)
                ? (prev.length > 1 ? prev.filter(item => item !== id) : prev)
                : [...prev, id]
        );
    };

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to upload images.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            setProfileImage(result.assets[0].uri);
        }
    };

    const handleContinue = async () => {
        const trimmedFirstName = firstName.trim();
        const trimmedLocation = location.trim();
        const trimmedBio = bio.trim();

        if (!trimmedFirstName) {
            Alert.alert('Validation Error', 'Please enter your first name.');
            return;
        }

        if (!trimmedLocation) {
            Alert.alert('Validation Error', 'Please enter your location.');
            return;
        }

        if (trimmedBio.length < 20) {
            Alert.alert('Validation Error', 'Please write a short bio (at least 20 characters).');
            return;
        }

        const trimmedIgHandle = igHandle.trim();
        const trimmedIgFollowers = igFollowers.trim();
        const trimmedTiktokHandle = tiktokHandle.trim();
        const trimmedTiktokFollowers = tiktokFollowers.trim();
        const trimmedYoutubeHandle = youtubeHandle.trim();
        const trimmedYoutubeFollowers = youtubeFollowers.trim();
        const trimmedTwitterHandle = twitterHandle.trim();
        const trimmedTwitterFollowers = twitterFollowers.trim();

        const hasIg = trimmedIgHandle !== '';
        const hasIgFollowers = trimmedIgFollowers !== '';
        const hasTiktok = trimmedTiktokHandle !== '';
        const hasTiktokFollowers = trimmedTiktokFollowers !== '';
        const hasYoutube = trimmedYoutubeHandle !== '';
        const hasYoutubeFollowers = trimmedYoutubeFollowers !== '';
        const hasTwitter = trimmedTwitterHandle !== '';
        const hasTwitterFollowers = trimmedTwitterFollowers !== '';

        const isIgComplete = hasIg && hasIgFollowers;
        const isTiktokComplete = hasTiktok && hasTiktokFollowers;
        const isYoutubeComplete = hasYoutube && hasYoutubeFollowers;
        const isTwitterComplete = hasTwitter && hasTwitterFollowers;

        if (!isIgComplete && !isTiktokComplete && !isYoutubeComplete && !isTwitterComplete) {
            Alert.alert('Validation Error', 'Please connect at least one social media account (Handle + Follower count).');
            return;
        }

        setLoading(true);
        try {
            const { data: { user }, error: userError } = await supabase.auth.getUser();

            if (userError || !user) {
                Alert.alert('Error', 'User session not found. Please log in again.');
                setLoading(false);
                return;
            }

            // 1. Upsert profiles table (ensures profile row exists for foreign key constraint)
            const { error: profileError } = await supabase
                .from('profiles')
                .upsert({
                    id: user.id,
                    first_name: trimmedFirstName,
                    last_name: lastName.trim(),
                    bio: trimmedBio,
                    location: trimmedLocation,
                    profile_photo_url: profileImage || null,
                    user_type: 'influencer',
                    updated_at: new Date().toISOString(),
                }, { onConflict: 'id' });

            if (profileError) {
                console.error('Error upserting profiles:', profileError);
                throw profileError;
            }

            // 2. Calculate total followers
            const totalFollowers =
                (parseInt(trimmedIgFollowers, 10) || 0) +
                (parseInt(trimmedTiktokFollowers, 10) || 0) +
                (parseInt(trimmedYoutubeFollowers, 10) || 0) +
                (parseInt(trimmedTwitterFollowers, 10) || 0);

            // 3. Upsert influencers table
            const { error: influencerError } = await supabase
                .from('influencers')
                .upsert({
                    id: user.id,
                    instagram_url: isIgComplete ? `https://instagram.com/${trimmedIgHandle.replace('@', '')}` : null,
                    tiktok_url: isTiktokComplete ? `https://tiktok.com/@${trimmedTiktokHandle.replace('@', '')}` : null,
                    youtube_url: isYoutubeComplete ? `https://youtube.com/@${trimmedYoutubeHandle.replace('@', '')}` : null,
                    twitter_url: isTwitterComplete ? `https://twitter.com/${trimmedTwitterHandle.replace('@', '')}` : null,
                    total_followers: totalFollowers,
                    content_niches: category ? [category] : [],
                    collaboration_preferences: collabTypes,
                }, { onConflict: 'id' });

            if (influencerError) {
                console.error('Error upserting influencers:', influencerError);
                throw influencerError;
            }

            router.push('/screens/profileSuccess');
        } catch (error: any) {
            Alert.alert('Submission Error', error.message || 'Failed to save creator profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
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

                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Tell us about yourself</Text>
                        <Text style={styles.subtitle}>Let hosts know what makes your content unique.</Text>
                    </View>

                    <View style={styles.card}>
                        {/* Upload Section */}
                        <View style={styles.uploadSection}>
                            <Pressable style={styles.imagePlaceholder} onPress={pickImage}>
                                {profileImage ? (
                                    <View style={styles.mockImage}>
                                        <Image source={{ uri: profileImage }} style={styles.avatarImage} />
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
                            {/* First Name & Last Name */}
                            <View style={styles.inputRow}>
                                <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                                    <Text style={styles.label}>First Name</Text>
                                    <View style={styles.inputContainer}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Jane"
                                            placeholderTextColor="#A0A0A0"
                                            value={firstName}
                                            onChangeText={setFirstName}
                                        />
                                    </View>
                                </View>

                                <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                                    <Text style={styles.label}>Last Name</Text>
                                    <View style={styles.inputContainer}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Doe"
                                            placeholderTextColor="#A0A0A0"
                                            value={lastName}
                                            onChangeText={setLastName}
                                        />
                                    </View>
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
                                <Dropdown
                                    options={CATEGORY_OPTIONS}
                                    value={category}
                                    onSelect={setCategory}
                                    placeholder="Select a focus..."
                                />
                            </View>

                            {/* Collaboration Types */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Collaboration Types</Text>
                                <View style={styles.chipRow}>
                                    {COLLAB_PREFERENCES.map(collab => {
                                        const isSelected = collabTypes.includes(collab.id);
                                        return (
                                            <Pressable
                                                key={collab.id}
                                                style={[styles.chip, isSelected && styles.chipActive]}
                                                onPress={() => toggleCollabType(collab.id)}
                                            >
                                                <Text style={[styles.chipText, isSelected && styles.chipTextActive]}>
                                                    {collab.label}
                                                </Text>
                                            </Pressable>
                                        );
                                    })}
                                </View>
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

                                {/* YouTube Card */}
                                <View style={styles.socialCard}>
                                    <View style={styles.socialHeader}>
                                        <View style={[styles.socialIconContainer, { backgroundColor: '#FF0000' }]}>
                                            <Feather name="youtube" size={16} color="#FFF" />
                                        </View>
                                        <Text style={styles.socialName}>YouTube</Text>
                                    </View>
                                    <View style={styles.socialInputContainer}>
                                        <TextInput
                                            style={styles.socialInput}
                                            placeholder="@channel"
                                            placeholderTextColor="#A0A0A0"
                                            value={youtubeHandle}
                                            onChangeText={setYoutubeHandle}
                                            autoCapitalize="none"
                                        />
                                    </View>
                                    <View style={styles.socialInputContainer}>
                                        <TextInput
                                            style={styles.socialInput}
                                            placeholder="Subscribers count"
                                            placeholderTextColor="#A0A0A0"
                                            value={youtubeFollowers}
                                            onChangeText={setYoutubeFollowers}
                                            keyboardType="numeric"
                                        />
                                    </View>
                                </View>

                                {/* Twitter / X Card */}
                                <View style={styles.socialCard}>
                                    <View style={styles.socialHeader}>
                                        <View style={[styles.socialIconContainer, { backgroundColor: '#1DA1F2' }]}>
                                            <Feather name="twitter" size={16} color="#FFF" />
                                        </View>
                                        <Text style={styles.socialName}>Twitter/X</Text>
                                    </View>
                                    <View style={styles.socialInputContainer}>
                                        <TextInput
                                            style={styles.socialInput}
                                            placeholder="@handle"
                                            placeholderTextColor="#A0A0A0"
                                            value={twitterHandle}
                                            onChangeText={setTwitterHandle}
                                            autoCapitalize="none"
                                        />
                                    </View>
                                    <View style={styles.socialInputContainer}>
                                        <TextInput
                                            style={styles.socialInput}
                                            placeholder="Followers count"
                                            placeholderTextColor="#A0A0A0"
                                            value={twitterFollowers}
                                            onChangeText={setTwitterFollowers}
                                            keyboardType="numeric"
                                        />
                                    </View>
                                </View>
                            </View>

                            <Pressable
                                style={[styles.continueButton, loading && { opacity: 0.7 }]}
                                onPress={handleContinue}
                                disabled={loading}
                            >
                                {loading ? (
                                    <ActivityIndicator color="#FFF" />
                                ) : (
                                    <>
                                        <Text style={styles.continueButtonText}>Continue</Text>
                                        <Feather name="arrow-right" size={20} color="#FFF" style={{ marginLeft: 8 }} />
                                    </>
                                )}
                            </Pressable>

                            <Text style={styles.footerText}>
                                You can always update this information later.
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
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
    inputRow: {
        flexDirection: 'row',
        width: '100%',
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
    avatarImage: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
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
    chipRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 4,
    },
    chip: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#F0F4F2',
        borderWidth: 1,
        borderColor: '#E0E7E3',
    },
    chipActive: {
        backgroundColor: '#0D2C21',
        borderColor: '#0D2C21',
    },
    chipText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#3C4A42',
    },
    chipTextActive: {
        color: '#FFFFFF',
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

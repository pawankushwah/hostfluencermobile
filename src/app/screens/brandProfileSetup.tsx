import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import Dropdown from '../../components/Dropdown';
import { supabase } from '@/lib/supabase';

const INDUSTRY_OPTIONS = [
    { label: 'Travel & Tourism', value: 'travel' },
    { label: 'Hospitality', value: 'hospitality' },
    { label: 'Food & Beverage', value: 'food_beverage' },
    { label: 'Fashion & Beauty', value: 'fashion' },
    { label: 'Lifestyle', value: 'lifestyle' },
    { label: 'Technology', value: 'technology' },
    { label: 'Health & Wellness', value: 'health_wellness' },
    { label: 'Other', value: 'other' }
];

const BUDGET_RANGE_OPTIONS = [
    { label: 'Under $5,000', value: 'under_5k' },
    { label: '$5,000 - $15,000', value: '5k_15k' },
    { label: '$15,000 - $30,000', value: '15k_30k' },
    { label: '$30,000 - $50,000', value: '30k_50k' },
    { label: '$50,000+', value: '50k_plus' }
];

export default function BrandProfileSetupScreen() {
    const [companyName, setCompanyName] = useState('');
    const [brandName, setBrandName] = useState('');
    const [website, setWebsite] = useState('');
    const [industry, setIndustry] = useState('');
    const [description, setDescription] = useState('');
    const [budgetRange, setBudgetRange] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactPhone, setContactPhone] = useState('');

    const [logoImage, setLogoImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadExistingBrandData = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            if (user.email) setContactEmail(user.email);

            const metaFirstName = user.user_metadata?.first_name || '';
            const metaLastName = user.user_metadata?.last_name || '';

            const { data: profile } = await supabase
                .from('profiles')
                .select('first_name, last_name')
                .eq('id', user.id)
                .maybeSingle();

            const profileFirstName = profile?.first_name || metaFirstName;
            const profileLastName = profile?.last_name || metaLastName;
            const fullName = `${profileFirstName} ${profileLastName}`.trim();

            const { data: brand } = await supabase
                .from('brands')
                .select('company_name, brand_name, website, industry, description, budget_range, contact_email, contact_phone')
                .eq('user_id', user.id)
                .maybeSingle();

            if (brand) {
                if (brand.company_name) setCompanyName(brand.company_name);
                if (brand.brand_name) setBrandName(brand.brand_name);
                if (brand.website) setWebsite(brand.website);
                if (brand.industry) setIndustry(brand.industry);
                if (brand.description) setDescription(brand.description);
                if (brand.budget_range) setBudgetRange(brand.budget_range);
                if (brand.contact_email) setContactEmail(brand.contact_email);
                if (brand.contact_phone) setContactPhone(brand.contact_phone);
            } else if (fullName) {
                setBrandName(fullName);
                setCompanyName(fullName);
            }
        };

        loadExistingBrandData();
    }, []);

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
            setLogoImage(result.assets[0].uri);
        }
    };

    const handleContinue = async () => {
        const trimmedCompanyName = companyName.trim();
        const trimmedBrandName = brandName.trim();
        const trimmedDescription = description.trim();
        const trimmedContactEmail = contactEmail.trim();

        if (!trimmedCompanyName) {
            Alert.alert('Validation Error', 'Please enter your company name.');
            return;
        }

        if (!trimmedBrandName) {
            Alert.alert('Validation Error', 'Please enter your brand name.');
            return;
        }

        if (!industry) {
            Alert.alert('Validation Error', 'Please select your industry.');
            return;
        }

        if (!trimmedDescription) {
            Alert.alert('Validation Error', 'Please enter a brand description.');
            return;
        }

        if (trimmedDescription.length < 20) {
            Alert.alert('Validation Error', 'Please write a description (at least 20 characters).');
            return;
        }

        if (!budgetRange) {
            Alert.alert('Validation Error', 'Please select a monthly campaign budget range.');
            return;
        }

        if (!trimmedContactEmail) {
            Alert.alert('Validation Error', 'Please enter a contact email.');
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

            // 1. Upsert brands table
            const { error: brandError } = await supabase
                .from('brands')
                .upsert({
                    user_id: user.id,
                    company_name: trimmedCompanyName,
                    brand_name: trimmedBrandName,
                    website: website.trim() || null,
                    industry: industry,
                    description: trimmedDescription,
                    budget_range: budgetRange,
                    contact_email: trimmedContactEmail,
                    contact_phone: contactPhone.trim() || null,
                    updated_at: new Date().toISOString()
                }, { onConflict: 'user_id' });

            if (brandError) {
                console.error('Error upserting brands:', brandError);
                throw brandError;
            }

            // 2. Upsert profiles table
            const { error: profileError } = await supabase
                .from('profiles')
                .upsert({
                    id: user.id,
                    first_name: trimmedBrandName,
                    user_type: 'brand',
                    updated_at: new Date().toISOString()
                }, { onConflict: 'id' });

            if (profileError) {
                console.error('Error updating profiles:', profileError);
                throw profileError;
            }

            router.push('/screens/profileSuccess');
        } catch (error: any) {
            Alert.alert('Submission Error', error.message || 'Failed to create brand profile. Please try again.');
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
                        <Feather name="arrow-left" size={24} color="#0B1C30" />
                    </Pressable>
                    
                    <Text style={styles.headerTitle}>Hostfluencer</Text>
                    
                    <View style={{ width: 24 }} />
                </View>

                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Set up your brand{'\n'}profile</Text>
                    <Text style={styles.subtitle}>Tell us about your company to help creators understand your brand identity and goals.</Text>
                </View>

                <View style={styles.card}>
                    {/* Upload Section */}
                    <View style={styles.uploadSection}>
                        <Pressable style={styles.imagePlaceholder} onPress={pickImage}>
                            {logoImage ? (
                                <View style={styles.mockImage}>
                                    <Image source={{ uri: logoImage }} style={styles.avatarImage} />
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
                        {/* Company Name */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Company Name <Text style={styles.required}>*</Text></Text>
                            <View style={styles.inputContainer}>
                                <MaterialCommunityIcons name="domain" size={20} color="#6C7A72" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="e.g. Acme Corporation"
                                    placeholderTextColor="#A0A0A0"
                                    value={companyName}
                                    onChangeText={setCompanyName}
                                />
                            </View>
                        </View>

                        {/* Brand Name */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Brand Name <Text style={styles.required}>*</Text></Text>
                            <View style={styles.inputContainer}>
                                <MaterialCommunityIcons name="storefront-outline" size={20} color="#6C7A72" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="e.g. Acme Apparel"
                                    placeholderTextColor="#A0A0A0"
                                    value={brandName}
                                    onChangeText={setBrandName}
                                />
                            </View>
                        </View>

                        {/* Industry */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Industry <Text style={styles.required}>*</Text></Text>
                            <Dropdown
                                options={INDUSTRY_OPTIONS}
                                value={industry}
                                onSelect={setIndustry}
                                placeholder="Select industry"
                                leftIcon={<MaterialCommunityIcons name="shape-outline" size={20} color="#6C7A72" />}
                            />
                        </View>

                        {/* Budget Range */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Monthly Campaign Budget <Text style={styles.required}>*</Text></Text>
                            <Dropdown
                                options={BUDGET_RANGE_OPTIONS}
                                value={budgetRange}
                                onSelect={setBudgetRange}
                                placeholder="Select budget range"
                                leftIcon={<Feather name="dollar-sign" size={20} color="#6C7A72" />}
                            />
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

                        {/* Contact Email */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Contact Email <Text style={styles.required}>*</Text></Text>
                            <View style={styles.inputContainer}>
                                <Feather name="mail" size={20} color="#6C7A72" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="contact@yourbrand.com"
                                    placeholderTextColor="#A0A0A0"
                                    value={contactEmail}
                                    onChangeText={setContactEmail}
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                />
                            </View>
                        </View>

                        {/* Contact Phone */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Contact Phone</Text>
                            <View style={styles.inputContainer}>
                                <Feather name="phone" size={20} color="#6C7A72" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="+1 (555) 123-4567"
                                    placeholderTextColor="#A0A0A0"
                                    value={contactPhone}
                                    onChangeText={setContactPhone}
                                    keyboardType="phone-pad"
                                />
                            </View>
                        </View>

                        {/* Brand Description */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Brand Description <Text style={styles.required}>*</Text></Text>
                            <View style={[styles.inputContainer, styles.textAreaContainer]}>
                                <TextInput
                                    style={styles.textArea}
                                    placeholder="Tell us about your brand and what makes it special..."
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
                                onPress={() => router.push('/screens/Dashboard' as any)}
                            >
                                <Text style={styles.skipButtonText}>Skip for now</Text>
                            </Pressable>
                            
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
                        </View>

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
    avatarImage: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
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

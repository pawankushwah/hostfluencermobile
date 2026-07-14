import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HostProfileSetupScreen() {
    const [hostName, setHostName] = useState('');
    const [propertyName, setPropertyName] = useState('');
    const [propertyType, setPropertyType] = useState('');
    const [rooms, setRooms] = useState('');
    const [location, setLocation] = useState('');
    const [website, setWebsite] = useState('');

    const [images, setImages] = useState([
        { id: '1', isCover: true }
    ]);

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
                    <Text style={styles.title}>Tell us about your{'\n'}property</Text>
                    <Text style={styles.subtitle}>{"Let's set up your profile so influencers can find you."}</Text>
                </View>

                {/* Card 1: Basic Info */}
                <View style={styles.card}>
                    {/* Host Name */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Host Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. Jane Doe"
                            placeholderTextColor="#889A92"
                            value={hostName}
                            onChangeText={setHostName}
                        />
                    </View>

                    {/* Property Name */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Property Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. The Grand View Resort"
                            placeholderTextColor="#889A92"
                            value={propertyName}
                            onChangeText={setPropertyName}
                        />
                    </View>

                    {/* Property Type */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Property Type</Text>
                        <Pressable style={styles.selectContainer}>
                            <Text style={[styles.inputText, !propertyType && { color: '#889A92' }]}>
                                {propertyType || 'Select type'}
                            </Text>
                            <Feather name="chevron-down" size={20} color="#3C4A42" />
                        </Pressable>
                    </View>

                    {/* Number of Rooms */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Number of Rooms</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. 12"
                            placeholderTextColor="#889A92"
                            keyboardType="numeric"
                            value={rooms}
                            onChangeText={setRooms}
                        />
                    </View>
                </View>

                {/* Card 2: Location & Web */}
                <View style={styles.card}>
                    {/* Location */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Location</Text>
                        <View style={styles.inputWithIconContainer}>
                            <Feather name="map-pin" size={18} color="#3C4A42" style={styles.inputIcon} />
                            <TextInput
                                style={styles.inputWithIcon}
                                placeholder="City, Country or Full Address"
                                placeholderTextColor="#889A92"
                                value={location}
                                onChangeText={setLocation}
                            />
                        </View>
                    </View>

                    {/* Website */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Website (Optional)</Text>
                        <View style={styles.inputWithIconContainer}>
                            <Feather name="globe" size={18} color="#3C4A42" style={styles.inputIcon} />
                            <TextInput
                                style={styles.inputWithIcon}
                                placeholder="https://"
                                placeholderTextColor="#889A92"
                                keyboardType="url"
                                autoCapitalize="none"
                                value={website}
                                onChangeText={setWebsite}
                            />
                        </View>
                    </View>
                </View>

                {/* Card 3: Images */}
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Property Images</Text>
                    <Text style={styles.sectionSubtitle}>
                        Upload high-quality images of your space. The first image will be your cover.
                    </Text>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.imageScrollContainer}>
                        {/* Upload Button */}
                        <Pressable style={styles.uploadBox}>
                            <MaterialCommunityIcons name="image-plus" size={24} color="#0B1C30" style={{ marginBottom: 4 }} />
                            <Text style={styles.uploadText}>Upload</Text>
                        </Pressable>
                    </ScrollView>
                </View>

            </ScrollView>

            <View style={styles.bottomBar}>
                <Pressable
                    style={styles.continueButton}
                    onPress={() => router.push('/screens/profileSuccess')}
                >
                    <Text style={styles.continueButtonText}>Continue</Text>
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
        marginBottom: 24,
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
        paddingHorizontal: 20,
        lineHeight: 22,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: '#0B1C30',
        marginBottom: 8,
    },
    input: {
        height: 48,
        borderWidth: 1,
        borderColor: '#BBCABF',
        borderRadius: 4,
        paddingHorizontal: 12,
        fontSize: 15,
        color: '#0B1C30',
    },
    selectContainer: {
        height: 48,
        borderWidth: 1,
        borderColor: '#BBCABF',
        borderRadius: 4,
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    inputText: {
        fontSize: 15,
        color: '#0B1C30',
    },
    inputWithIconContainer: {
        height: 48,
        borderWidth: 1,
        borderColor: '#BBCABF',
        borderRadius: 4,
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputIcon: {
        marginRight: 10,
    },
    inputWithIcon: {
        flex: 1,
        fontSize: 15,
        color: '#0B1C30',
        height: '100%',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0B1C30',
        marginBottom: 6,
    },
    sectionSubtitle: {
        fontSize: 13,
        color: '#3C4A42',
        marginBottom: 16,
        lineHeight: 18,
    },
    imageScrollContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    uploadBox: {
        width: 100,
        height: 100,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: '#BBCABF',
        borderStyle: 'dashed',
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    uploadText: {
        fontSize: 12,
        color: '#0B1C30',
        fontWeight: '600',
    },
    imageBox: {
        width: 100,
        height: 100,
        borderRadius: 12,
        backgroundColor: '#EBEBEB',
        overflow: 'hidden',
        position: 'relative',
    },
    imageBoxPartial: {
        width: 40, /* Showing just a sliver of the next image */
        height: 100,
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
        backgroundColor: '#EBEBEB',
        overflow: 'hidden',
    },
    mockImageContent: {
        width: '100%',
        height: '100%',
        backgroundColor: '#B5A99B', // A brownish tone simulating a room image
    },
    coverBadge: {
        position: 'absolute',
        top: 8,
        left: 8,
        backgroundColor: 'rgba(11, 28, 48, 0.7)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
    },
    coverBadgeText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: '600',
    },
    deleteButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomBar: {
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 16,
        backgroundColor: '#F8F9FF',
    },
    continueButton: {
        height: 56,
        borderRadius: 16,
        backgroundColor: '#0D2C21',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    continueButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});

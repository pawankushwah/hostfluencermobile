import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const SLIDES = [
    {
        id: '1',
        image: require('../../../assets/screen/introduction/1.svg'),
        title: 'Grow Your Brand\nThrough Creators',
        desc: 'Launch creator campaigns and get authentic content from verified influencers.',
    },
    {
        id: '2',
        image: require('../../../assets/screen/introduction/2.svg'),
        title: 'Hospitality\nPartnerships Made\nEasy',
        desc: 'Connect creators, hotels, restaurants, and brands on one platform.',
    },
    {
        id: '3',
        image: require('../../../assets/screen/introduction/3.svg'),
        title: 'Content is Your\nCurrency',
        desc: 'Unlock paid collaborations and monetize your creativity by partnering with world-class hospitality brands.',
    },
    {
        id: '4',
        image: require('../../../assets/screen/introduction/4.svg'),
        title: 'Turn Content Into\nTravel Experiences',
        desc: 'Connect with hotels, resorts, villas, restaurants, and hospitality brands around the world.',
    },
    {
        id: '5',
        image: require('../../../assets/screen/introduction/5.svg'),
        title: 'Discover.\nCollaborate.\nGrow.',
        desc: 'Find opportunities, build partnerships, create content, and grow your business.',
    },
];

// Create a large array to simulate infinite scroll
const MULTIPLIER = 200;
const INF_SLIDES = Array(MULTIPLIER).fill(SLIDES).flat();
const INITIAL_INDEX = Math.floor(MULTIPLIER / 2) * SLIDES.length;

export default function IntroductionScreen() {
    const [currentIndex, setCurrentIndex] = useState(INITIAL_INDEX);
    const flatListRef = useRef<FlatList>(null);
    const isDragging = useRef(false);

    // Auto-scroll logic
    React.useEffect(() => {
        let timer: NodeJS.Timeout;
        if (!isDragging.current) {
            timer = setInterval(() => {
                flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
            }, 3500); // Auto change every 3.5 seconds
        }
        return () => clearInterval(timer);
    }, [currentIndex]);

    const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
        if (viewableItems && viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    const realIndex = currentIndex % SLIDES.length;

    const handleGetStarted = () => {
        router.push('/screens/loginOptions');
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
            <View style={styles.container}>
                <View style={styles.carouselWrapper}>
                    <FlatList
                        ref={flatListRef}
                        data={INF_SLIDES}
                        keyExtractor={(_, index) => index.toString()}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onViewableItemsChanged={onViewableItemsChanged}
                        viewabilityConfig={viewConfig}
                        initialScrollIndex={INITIAL_INDEX}
                        getItemLayout={(_, index) => ({ length: width, offset: width * index, index })}
                        bounces={false}
                        onScrollBeginDrag={() => { isDragging.current = true; }}
                        onScrollEndDrag={() => { isDragging.current = false; }}
                        renderItem={({ item }) => (
                            <View style={styles.illustrationContainer}>
                                <Image
                                    source={item.image}
                                    style={styles.illustrationImage}
                                    contentFit="contain"
                                />
                            </View>
                        )}
                    />
                </View>

                {/* Content Bottom Half Card */}
                <View style={styles.cardContainer}>
                    {/* Pagination Dots */}
                    <View style={styles.paginationContainer}>
                        {SLIDES.map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.dot,
                                    realIndex === index ? styles.dotActive : styles.dotInactive,
                                ]}
                            />
                        ))}
                    </View>

                    {/* Text Content */}
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{SLIDES[realIndex].title}</Text>
                        <Text style={styles.description}>{SLIDES[realIndex].desc}</Text>
                    </View>

                    {/* Button */}
                    <Pressable style={styles.button} onPress={handleGetStarted}>
                        <Text style={styles.buttonText}>Get Started</Text>
                        <Feather name="arrow-right" size={20} color="#FFFFFF" style={styles.buttonIcon} />
                    </Pressable>
                </View>
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
    },
    carouselWrapper: {
        flex: 1.2,
        width: '100%',
    },
    illustrationContainer: {
        width,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    illustrationImage: {
        width: '100%',
        height: '80%',
    },
    cardContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingHorizontal: 32,
        paddingTop: 32,
        paddingBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.03,
        shadowRadius: 16,
        elevation: 5,
        justifyContent: 'space-between',
    },
    paginationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    dot: {
        height: 6,
        borderRadius: 3,
        marginRight: 8,
    },
    dotActive: {
        width: 24,
        backgroundColor: '#0D2C21',
    },
    dotInactive: {
        width: 6,
        backgroundColor: '#E2E8E4',
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#0B1C30',
        marginBottom: 16,
        lineHeight: 38,
    },
    description: {
        fontSize: 16,
        color: '#4A6570',
        lineHeight: 24,
    },
    button: {
        height: 56,
        backgroundColor: '#0D2C21',
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    buttonIcon: {
        marginLeft: 8,
    },
});

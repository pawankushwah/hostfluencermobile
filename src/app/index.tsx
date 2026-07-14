import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window');

const GLOW_SVG = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHJhZGlhbEdyYWRpZW50IGlkPSJnIiBjeD0iNTAlIiBjeT0iNTAlIiByPSI1MCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNBN0U0QjYiIHN0b3Atb3BhY2l0eT0iMC42Ii8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjQTdFNEI2IiBzdG9wLW9wYWNpdHk9IjAiLz48L3JhZGlhbEdyYWRpZW50PjwvZGVmcz48Y2lyY2xlIGN4PSIyMDAiIGN5PSIyMDAiIHI9IjIwMCIgZmlsbD0idXJsKCNnKSIvPjwvc3ZnPg==`;

export default function SplashScreen() {
    const [progress] = useState(() => new Animated.Value(0));

    // Animated values for floating icons
    const [float1] = useState(() => new Animated.Value(0));
    const [float2] = useState(() => new Animated.Value(0));
    const [float3] = useState(() => new Animated.Value(0));
    const [float4] = useState(() => new Animated.Value(0));

    useEffect(() => {
        const createFloatAnimation = (animValue: Animated.Value, duration: number) => {
            return Animated.loop(
                Animated.sequence([
                    Animated.timing(animValue, {
                        toValue: -15,
                        duration: duration,
                        useNativeDriver: true,
                    }),
                    Animated.timing(animValue, {
                        toValue: 0,
                        duration: duration,
                        useNativeDriver: true,
                    })
                ])
            );
        };

        setTimeout(() => createFloatAnimation(float1, 2000).start(), 0);
        setTimeout(() => createFloatAnimation(float2, 2200).start(), 500);
        setTimeout(() => createFloatAnimation(float3, 1800).start(), 200);
        setTimeout(() => createFloatAnimation(float4, 2100).start(), 700);

        Animated.timing(progress, {
            toValue: 1,
            duration: 2500, // 2.5 seconds loading
            useNativeDriver: false,
        }).start(() => {
            // Once loading completes, navigate to introduction
            router.replace('/screens/introduction');
        });
    }, [float1, float2, float3, float4, progress]);

    // Interpolate progress value to width percentage
    const widthInterpolated = progress.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%']
    });

    return (
        <View style={styles.container}>
            {/* Floating Icons */}
            <Animated.View style={[styles.floatingIcon, { top: '15%', left: '15%', transform: [{ translateY: float1 }] }]}>
                <Feather name="camera" size={28} color="#0D2C21" />
            </Animated.View>
            <Animated.View style={[styles.floatingIcon, { top: '20%', right: '15%', transform: [{ translateY: float2 }] }]}>
                <MaterialCommunityIcons name="bed-outline" size={32} color="#0D2C21" />
            </Animated.View>
            <Animated.View style={[styles.floatingIcon, { bottom: '30%', left: '15%', transform: [{ translateY: float3 }] }]}>
                <MaterialCommunityIcons name="silverware-fork-knife" size={32} color="#0D2C21" />
            </Animated.View>
            <Animated.View style={[styles.floatingIcon, { bottom: '25%', right: '20%', transform: [{ translateY: float4 }] }]}>
                <Feather name="user" size={28} color="#0D2C21" />
            </Animated.View>

            {/* Center Logo */}
            <View style={styles.logoContainer}>
                <View style={styles.glowContainer}>
                    {/* Smooth SVG Radial Gradient */}
                    <Image
                        source={{ uri: GLOW_SVG }}
                        style={styles.radialGlow}
                        contentFit="contain"
                    />

                    <Image
                        source={require('../../assets/screen/Hostfluencer.svg')}
                        style={styles.logoImage}
                        contentFit="contain"
                    />
                </View>

                <Text style={styles.tagline}>
                    Connect. Travel.{'\n'}Collaborate.
                </Text>
            </View>

            {/* Bottom Loading Bar */}
            <View style={styles.loadingContainer}>
                <View style={styles.progressBarBackground}>
                    <Animated.View style={[styles.progressBarFill, { width: widthInterpolated }]} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF', // White background
        alignItems: 'center',
        justifyContent: 'center',
    },
    floatingIcon: {
        position: 'absolute',
        opacity: 0.8,
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    glowContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 32,
    },
    radialGlow: {
        position: 'absolute',
        width: 500,
        height: 500,
    },
    logoImage: {
        width: 200,
        height: 200,
    },
    tagline: {
        fontSize: 24,
        fontWeight: '700',
        color: '#0B1C30',
        textAlign: 'center',
        lineHeight: 32,
        position: 'relative',
        bottom: 50,
    },
    loadingContainer: {
        position: 'absolute',
        bottom: 60,
        width: '100%',
        alignItems: 'center',
    },
    progressBarBackground: {
        width: width * 0.5,
        height: 4,
        backgroundColor: '#D1E0E8', // Light blue/gray un-filled part
        borderRadius: 2,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#0D2C21', // Dark green filled part
        borderRadius: 2,
    },
});
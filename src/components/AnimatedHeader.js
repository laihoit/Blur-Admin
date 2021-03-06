import React from 'react';
import { View, Text, Animated, Platform, StyleSheet } from 'react-native';
import { HEADER_MAX_HEIGHT, HEADER_SCROLL_DISTANCE } from '../config/config';

const AnimatedHeader = ({title, nativeScrollY}) => {
    const headerTranslate = nativeScrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, -HEADER_SCROLL_DISTANCE],
        extrapolate: 'clamp'
    });

    //Image
    const bgImageOpacity = nativeScrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [1, 0.3, 0],
        extrapolate: 'clamp'
    });

    const bgImageTranslate = nativeScrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, 100],
        extrapolate: 'clamp'
    });

    //Title
    const titleScale = nativeScrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [1, 0.8, 0.7],
        extrapolate: 'clamp'
    });

    const titleTranslateY = nativeScrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [25, 35, 50],
        extrapolate: 'clamp'
    });

    if (nativeScrollY) {
        return(
            <View style={styles.container}>
                <Animated.View
                    pointerEvents = 'none'
                    style = {[styles.header, { transform: [{translateY: headerTranslate}] }]}
                >
                    <Animated.Image 
                        style = {[styles.background, {opacity: bgImageOpacity, transform: [{translateY: bgImageTranslate}]} ]}
                        resizeMode = 'cover'
                        source = {require('../assets/icon.png')}
                    />
                </Animated.View>

                <Animated.View
                    style = {[styles.header_bar, {transform: [{scale: titleScale}, {translateY: titleTranslateY}]}]}
                >
                    <Text style={styles.header_text}>{title}</Text>
                </Animated.View>
            </View>
        );
    }

    return(
        <View style = {styles.header}>
            <View>
                <Text style = {styles.header_text}>{title}></Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...Platform.select({
            ios: { zIndex: 1}
        })
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        overflow: 'hidden',
        height: HEADER_MAX_HEIGHT,
        zIndex: 1
    },
    header_bar: {
        backgroundColor: 'transparent',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: null,
        height: HEADER_MAX_HEIGHT
    },
    header_text: {
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold'
    }
});

export default AnimatedHeader;
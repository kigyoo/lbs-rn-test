import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import constants from '../constants/constants';

function Post(props) {
    const navigation = useNavigation();

    const onPressFunction = () => {
        navigation.navigate('PostDetails', {
            postId: props.id,
            title: props.title,
            body: props.body
        });
    }

    return <View style={styles.listItem}>
        <Pressable
            onPress={onPressFunction}
            android_ripple={{ color: constants.colorHover, borderless: true }}
            style={({ pressed }) => [
                styles.button,
                pressed ? styles.buttonPressed : null
            ]}
        >
            <View style={styles.innerContainer}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.body}>{props.body}</Text>
            </View>
        </Pressable>
    </View>
}

const styles = StyleSheet.create({
    listItem: {
        flex: 1,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        elevation: 4,
        backgroundColor: constants.colorSecondary,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        overflow: 'hidden'
    },
    button: {
        flex: 1
    },
    buttonPressed: {
        backgroundColor: Platform.OS === 'ios' ? constants.colorHover : null,
        opacity: Platform.OS === 'ios' ? 0.6 : null,
    },
    innerContainer: {
        padding: 15
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12
    },
    body: {
        fontSize: 14,
    },
});

export default Post;

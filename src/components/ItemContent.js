import React from 'react';
import { StyleSheet, Text, View } from "react-native";

function ItemContent(props) {
    const { title, subTitle, body } = props;

    return <View style={styles.container}>
        {subTitle ? <Text style={styles.subTitle}>{subTitle}</Text> : null}
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.body}>{body}</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    subTitle: {
        fontSize: 14,
        fontStyle: 'italic',
        marginBottom: 8
    },
    body: {
        fontSize: 14,
    },
});

export default ItemContent;

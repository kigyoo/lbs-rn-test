import React from 'react';
import { Button, StyleSheet, Text, View } from "react-native";
import constants from '../constants/constants';

function ErrorContainer(props) {
    const { errorText, onPressRetry } = props;

    return <View style={styles.container}>
        <Text style={{ marginBottom: 12 }}>{errorText}</Text>
        <Button
            onPress={onPressRetry}
            title='Retry'
            color={constants.colorPrimary}
        />
    </View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ErrorContainer;

import React, { useEffect, useRef } from 'react';
import { Controller, useForm } from "react-hook-form";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import Toast from 'react-native-root-toast';
import { useDispatch, useSelector } from 'react-redux';
import constants from '../constants/constants';
import { createPost, resetPost, updatePost } from '../store/postsSlice';

function EditPostScreen(props) {
    const dispatch = useDispatch();
    const bodyInputRef = useRef();
    const { navigation } = props;
    const { control, handleSubmit, formState: { errors }, } = useForm({
        defaultValues: {
            title: props.route.params?.title ?? '',
            body: props.route.params?.body ?? '',
            userId: 1,
            id: props.route.params?.postId ?? 0
        }
    })
    const { savedId } = useSelector(state => state.posts.post);

    const onSubmit = (data) => {
        if (data.id > 0) {
            dispatch(updatePost(data));
        } else {
            delete data.id;
            dispatch(createPost(data));
        }
    }

    useEffect(() => {
        navigation.setOptions({
            headerTitle: props.route.params?.postId ? 'Edit post' : 'Create new post'
        });
    }, [navigation]);

    useEffect(() => {
        if (savedId > 0) {
            Toast.show(`Post successfully saved (ID: ${savedId})`, {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                hideOnPress: true
            });
            navigation.navigate('ListView');
        }
        return () => {
            dispatch(resetPost());
        };
    }, [savedId]);

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.label}>Title:</Text>
                <Controller
                    control={control}
                    rules={{
                        required: 'Title is required.',
                        maxLength: 250
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            placeholder='Start typing the title...'
                            onChangeText={onChange}
                            onSubmitEditing={() => {
                                onBlur();
                                bodyInputRef.current.focus();
                            }}
                            returnKeyType='next'
                            value={value}
                            style={styles.input}
                        />
                    )}
                    name="title"
                />
                {errors?.title && <Text style={styles.errorText}>{errors.title.message}</Text>}

                <Text style={styles.label}>Message:</Text>
                <Controller
                    control={control}
                    rules={{
                        required: 'Message is required.',
                        maxLength: 1000,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            placeholder='Start typing the message...'
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            ref={bodyInputRef}
                            returnKeyType='send'
                            multiline
                            numberOfLines={10}
                            style={{ ...styles.input, height: 120, textAlignVertical: 'top' }}
                        />
                    )}
                    name="body"
                />
                {errors?.body && <Text style={styles.errorText}>{errors.body.message}</Text>}
            </View>

            <View style={{ marginTop: 30 }}>
                <Button title="Submit" onPress={handleSubmit(onSubmit)} color={constants.colorPrimary} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20
    },
    input: {
        height: 40,
        marginVertical: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: 'white'
    },
    label: {
        marginTop: 16
    },
    errorText: {
        color: 'red',
        marginTop: 2,
        textAlign: 'right'
    }
});

export default EditPostScreen;

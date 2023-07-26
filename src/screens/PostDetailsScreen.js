import React, { useEffect } from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ErrorContainer from '../components/ErrorContainer';
import ItemContent from '../components/ItemContent';
import constants from '../constants/constants';
import { getComments } from '../store/commentsSlice';

function PostDetailsScreen(props) {
    const dispatch = useDispatch();
    const { navigation } = props;
    const { postId, title, body } = props.route.params;
    const { comments, isLoading, hasError } = useSelector(state => state.comments);

    useEffect(() => {
        dispatch(getComments({ postId: postId }));
    }, [dispatch])

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button
                    onPress={() => navigation.navigate('EditPost', {
                        postId: postId,
                        title: title,
                        body: body
                    })}
                    title="Edit post"
                    color={constants.colorPrimary}
                />
            ),
        });
    }, [navigation]);

    if (isLoading) {
        return <View style={styles.container}>
            <ActivityIndicator size="large" color={constants.colorSpinner} />
        </View>;
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={comments}
                renderItem={({ item }) => {
                    return <View style={styles.listItem}>
                        <ItemContent title={item.name} body={item.body} subTitle={item.email} />
                    </View>
                }}
                keyExtractor={item => item.id}
                ListHeaderComponent={<View style={styles.topContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.body}>{body}</Text>
                    <Text style={styles.commentsTitle}>Comments:</Text>
                </View>}
                ListEmptyComponent={() => {
                    if (!hasError) {
                        return <View style={styles.container}>
                            <Text>No items to show.</Text>
                        </View>
                    }
                }
                }
                ListFooterComponent={() => {
                    if (hasError) {
                        return <ErrorContainer
                            errorText='Comments could not be loaded.'
                            onPressRetry={() => dispatch(getComments({ postId: postId }))}
                        />
                    }
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    topContainer: {
        padding: 10
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12
    },
    body: {

    },
    commentsTitle: {
        fontSize: 18,
        fontWeight: '500',
        marginTop: 12,
        paddingTop: 8,
        borderTopWidth: 1
    },
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
});

export default PostDetailsScreen;

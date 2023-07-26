import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ErrorContainer from '../components/ErrorContainer';
import Post from '../components/Post';
import constants from '../constants/constants';
import { getPosts } from "../store/postsSlice";

function ListViewScreen({ navigation }) {
    const dispatch = useDispatch();
    const [searchText, onChangeSearchText] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const { items: posts, isLoading, hasError } = useSelector(state => state.posts.list);
    const [filteredPosts, setFilteredPosts] = useState(posts);

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch])

    useEffect(() => {
        setFilteredPosts(posts);
    }, [posts])

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button
                    onPress={() => navigation.navigate('EditPost')}
                    title='Add new post'
                    color={constants.colorPrimary}
                />
            )
        });
    }, [navigation]);

    const onEndSearchTextEditing = () => {
        setIsSearching(true);
        if (searchText) {
            const lowerSearchText = searchText.toLowerCase();
            setFilteredPosts(posts.filter(post => post.title.toLowerCase().includes(lowerSearchText) || post.body.toLowerCase().includes(lowerSearchText)));
        } else {
            setFilteredPosts(posts);
        }
        setIsSearching(false);
    }

    if (isLoading || isSearching) {
        return <View style={styles.emptyContainer}>
            <ActivityIndicator size="large" color={constants.colorSpinner} />
        </View>;
    }

    if (hasError) {
        return <ErrorContainer
            errorText='Posts could not be loaded.'
            onPressRetry={() => dispatch(getPosts())}
        />
    }

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeSearchText}
                    onEndEditing={onEndSearchTextEditing}
                    value={searchText}
                    placeholder="Search posts..."
                />
            </View>
            <FlatList
                data={filteredPosts}
                renderItem={({ item }) => {
                    return <Post id={item.id} title={item.title} body={item.body} />
                }}
                keyExtractor={item => item.id}
                ListEmptyComponent={<View style={styles.emptyContainer}><Text>No items to show.</Text></View>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    topContainer: {
        paddingTop: 15,
        paddingBottom: 10,
        marginHorizontal: 15
    },
    input: {
        height: 40,
        marginVertical: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: 'white',
    },
});

export default ListViewScreen;

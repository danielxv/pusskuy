import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    FlatList,
} from 'react-native';

const CategoryScreen = ({navigation}) => {

     const data = [
        { id: 1, title: "Mobile Legends", image: "https://upload.wikimedia.org/wikipedia/en/9/9e/Mobilelegends.png" },
        { id: 2, title: "Free Fire", image: "https://cdn160.picsart.com/upscale-273703924002211.png" },
        { id: 3, title: "PUBG Mobile", image: "data:image/png;base64,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" },
        { id: 4, title: "Wild Rift", image: "https://upload.wikimedia.org/wikipedia/commons/4/42/League_of_Legends_Wild_Rift_logo.png" },
        { id: 5, title: "Call Of Duty Mobile", image: "https://www.citypng.com/public/uploads/preview/-41606476138orpfh1ws3t.png" },
    ]

    return (
        <View style={styles.container}>
            <FlatList style={styles.list}
                contentContainerStyle={styles.listContainer}
                data={data}
                horizontal={false}
                numColumns={2}
                keyExtractor={(item) => {
                    return item.id;
                }}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('CategoryDetailScreen',{
                            cat: item.title
                        })}>
                            <View style={styles.cardFooter}></View>
                            <Image style={styles.cardImage} source={{ uri: item.image }} />
                            <View style={styles.cardHeader}>
                                <View style={{ alignItems: "center", justifyContent: "center" }}>
                                    <Text style={styles.title}>{item.title}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                }} />
        </View>
    );
}

export default CategoryScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        paddingHorizontal: 5,
        backgroundColor: "#E6E6E6",
    },
    listContainer: {
        alignItems: 'center'
    },
    /******** card **************/
    card: {
        shadowColor: '#00000021',

        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,

        elevation: 12,
        marginVertical: 10,
        backgroundColor: "white",
        flexBasis: '42%',
        marginHorizontal: 10,
    },
    cardHeader: {
        paddingVertical: 17,
        paddingHorizontal: 16,
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center"
    },
    cardContent: {
        paddingVertical: 12.5,
        paddingHorizontal: 16,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 12.5,
        paddingBottom: 25,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
    },
    cardImage: {
        height: 70,
        width: 100,
        alignSelf: 'center',
        resizeMode:'contain',
    },
    title: {
        fontSize: 18,
        flex: 1,
        alignSelf: 'center',
        color: "#696969",
        justifyContent: 'center',
    },
});
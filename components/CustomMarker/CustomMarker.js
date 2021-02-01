import React from 'react';
import { StyleSheet, Text, View, CheckBox, TouchableHighlight, Button, Input, ScrollView, TouchableOpacity, Image, TextInput, Dimensions, KeyboardAvoidingView, ImageBackground } from 'react-native';

/* colors */
import colors from '../../colors'





export default OrderItem = (data) => {
    console.log("dd");
    return (

        <View
            style={{
                paddingVertical: 5,
                paddingHorizontal: 5,
                backgroundColor:"red",
                borderColor: "#eee",
                borderRadius: 5,
                elevation: 10
            }}
        >
            <Text style={{ color: "#fff",fontSize:12 }}>{data.src.nameAR}</Text>
        </View>


    );

}

const styles = StyleSheet.create({


    orderOpacity: {
        width: Dimensions.get('window').width * 342 / 375,
        height: Dimensions.get('window').height * 160 / 812,
        borderRadius: 15,
        margin: Dimensions.get('window').width * 0.4 / 20,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: colors.white,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 2,

        elevation: 2,
        padding: 15,
        paddingTop: 5
    },

});


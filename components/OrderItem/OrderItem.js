import React from 'react';
import { StyleSheet, Text, View, CheckBox, TouchableHighlight, Button, Input, ScrollView, TouchableOpacity, Image, TextInput, Dimensions, KeyboardAvoidingView, ImageBackground } from 'react-native';

/* colors */
import colors from '../../colors'





export default OrderItem = (data) => {
    // console.log("?//////////////");
    // console.log(data);
    // console.log("?//////////////");
    // const assign=()=>{         data.assign()     }
    const cancel=()=>{         data.cancel()     }
    const details=()=>{         data.details()     }
    return (

        <View style={styles.orderOpacity}>
            <Text>بيانات العميل</Text>
            <Text>الاسم : {data.src.customerId ? data.src.customerId.username : "not exist"}</Text>
            <Text>الهاتف : {data.src.customerId ? "0" + data.src.customerId.phoneNumber : "not exist"}</Text>
            <Text>العنوان {data.src.address.street}, {data.src.address.route}, {data.src.address.neighbourhood}, {data.src.address.administrative_area} , {data.src.address.city}</Text>

            <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={styles.button} onPress={() => { details() }}>
                    <Text >بيانات</Text>
                </TouchableOpacity>
              
                
            </View>
        </View>


    );

}

const styles = StyleSheet.create({


    orderOpacity: {
        width: Dimensions.get('window').width * 342 / 375,
        height: Dimensions.get('window').height * 160 / 812,
        borderRadius: 15,
        margin: Dimensions.get('window').width * 0.4 / 20,
        // alignItems: 'flex-start',
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
    button: {
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 15,
        padding: 10,
        flex: 1,marginHorizontal:5
    }


});


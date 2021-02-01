import React from 'react';
import { StyleSheet, Text, View, RefreshControl, FlatList, ActivityIndicator, Button, Animated, Input, ScrollView, TouchableOpacity, Image, TextInput, Dimensions, KeyboardAvoidingView, ImageBackground } from 'react-native';
/* gps */
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
/* colors */
import colors from '../../colors'
/* services */
import dataService from '../../services/dataService'
/* components */
import OrderItem from '../../components/OrderItem/OrderItem'

export default class Main extends React.Component {
    static navigationOptions = { header: null }
    state = {
        orders: [],
        refreshing: false,
        data:{}
    }
    async componentDidMount() {
        // console.log("any");
        let status = await Permissions.askAsync(Permissions.LOCATION)
        console.log(status);
        let location = await Location.getCurrentPositionAsync({})
        console.log(location);
        dataService.getOrders("5fb299136659933f2c88fb93").then(res => {
        console.log("------------------");

            // console.log(res.data.result);
        console.log("------------------");

            this.setState({ orders: res.data.result.orders,data:res.data.result })

        }).catch(err => { console.log(err); })

        this.interval = setInterval(async () => {

            if (location) {
                console.log("done");
                dataService.setPosition("5fb299136659933f2c88fb93", location.coords.latitude, location.coords.longitude).then(res => {
                    //    console.log(res.data);
                }).catch(err => { console.log(err); })
                dataService.getOrders("5fb299136659933f2c88fb93").then(res => {

                    this.setState({ orders: res.data.result.orders },()=>{
                        console.log(this.state.orders);
                    })
                }).catch(err => { console.log(err); })
            }
        }, 5000);


    }
    assign = (item) => {
        console.log(item);
    }
    cancel = () => {
        console.log("cancel");
    }
    details = (item) => {
        // console.log("----------------------------");
        // console.log(item);
        // console.log("----------------------------");

        this.props.navigation.navigate("Details",item)


    }
    componentWillUnmount() {
        console.log("unumount");
        clearInterval(this.interval)
    }
    onRefresh = async () => {
        console.log(this.state.orders);
        console.log("onRefresh");
        this.setState({ refreshing: true })
        await dataService.getOrders("5f30bba81bc5452bc028a150").then(res => {

            this.setState({ orders: res.data.result.orders,refreshing: false ,data:res.data.result})
        }).catch(err => { console.log(err);
        this.setState({ refreshing: false })

         })

        console.log("onRefresh finished");
        this.setState({ refreshing: false })


    }
    detailsDriver(){
        this.props.navigation.navigate("DetailsDriver",this.state.data)
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    {/* <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{ color: colors.white }} /> */}
                </View>
                <View style={styles.headerContainer}>

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity style={{ padding: 20 }} >

                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{
                            // fontFamily: 'Cairo-Regular',
                            fontSize: 20,
                        }}>الاوردرات</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingLeft: 30, width: "70%" }}>

                        </View>
                    </View>

                </View>

                <View style={styles.mainContainer}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        // ListHeaderComponent={this._headerItem}
                        // maxToRenderPerBatch={20}
                        // updateCellsBatchingPeriod={20}
                        // legacyImplementation={false}
                        // initialNumToRender={50}
                        // ItemSeparatorComponent = { (<View><Text>asdf</Text></View>) }
                        contentContainerStyle={{ paddingBottom: 100 }}
                        data={this.state.orders}

                        renderItem={({ item }) => (

                            // <Text>sd</Text>
                            <OrderItem
                                // handlePress={() => this.handlePress(item)}
                                src={item}
                                assign={() => this.assign(item)}
                                cancel={() => this.cancel()}
                                details={() => this.details(item)}


                            />
                        )}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this.onRefresh}
                            />
                        }
                        style={{ width: '100%' }}
                        keyExtractor={(item, index) => index}
                        horizontal={false}
                        numColumns={1}
                    />
 <TouchableOpacity
            style={{
              height: (Dimensions.get("window").height * 1) / 12,
              backgroundColor: colors.primary,
              width: Dimensions.get("window").width,
              alignItems:'center',
              justifyContent:'center'
            }}
            onPress={()=>{this.detailsDriver()}}
          >
            <Text style={{fontSize:20}}>بينات السائق</Text>
          </TouchableOpacity>
                </View>


            </View >



        )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cartImageStyle: {
        width: 37,
        height: 39,
        resizeMode: "contain",
    },
    mainContainer: {
        width: '100%',
        height: '89%',
        backgroundColor: colors.white,
        // alignItems: 'center',
        // justifyContent: 'center',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingTop: 20,
        paddingBottom: 0

    },

    headerContainer: {
        width: Dimensions.get('window').width,
        height: "11%",
        backgroundColor: colors.primary,
        alignContent: "center", justifyContent: 'center',
        flexDirection: 'row'
    },
    tOpacity: {
        width: Dimensions.get('window').width * 343 / 375,
        height: Dimensions.get('window').height * 46 / 812,
        borderRadius: 50,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15
    },
    text: {
        // fontFamily: 'Cairo-Bold',
        fontSize: 14
    },
    instructionText: {
        marginLeft: Dimensions.get('window').width * 32 / 375,
        // fontFamily: 'Cairo-Regular',
        fontSize: 13
        ,
    },
    headerText: {
        marginLeft: Dimensions.get('window').width * 32 / 375,
        // fontFamily: 'Cairo-Regular',
        fontSize: 20
        ,
    },
    bottomMainView: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 180 / 812,
    },
    orderOpacity: {
        width: Dimensions.get('window').width * 342 / 375,
        height: Dimensions.get('window').height * 95 / 812,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: colors.white,
        flexDirection: "row",
        borderTopWidth: 1
    },
    imageStyle: {
        height: "90%",
        width: "100%",
        resizeMode: 'contain'
    },
    titleText: {
        marginLeft: Dimensions.get('window').width * 15 / 375,
        // fontFamily: 'Cairo-Bold',
        fontSize: 20,
        backgroundColor: colors.white
    },
    Text: {
        marginLeft: Dimensions.get('window').width * 15 / 375,
        // fontFamily: 'Cairo-Regular',
        fontSize: 13,
        backgroundColor: colors.white
    }
});
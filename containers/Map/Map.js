import React from 'react';
import { StyleSheet, Text, View, RefreshControl, FlatList, ActivityIndicator, Button,Linking, Animated, Input, ScrollView, TouchableOpacity, Image, TextInput, Dimensions, KeyboardAvoidingView, ImageBackground } from 'react-native';

/* colors */
import colors from '../../colors'
/* services */
import dataService from '../../services/dataService'
/* components */
import CustomMarker from '../../components/CustomMarker/CustomMarker'
/* maps */
// import MapView from "react-native-maps";
import MapView, { Marker } from "react-native-maps";
/* gps */
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import Geocoder from 'react-native-geocoding';
export default class Map extends React.Component {
    static navigationOptions = { header: null }
    state = {
        isMapReady: false,
        latitudeClient: null,
        longitudeClient: null,
        order:{}
    }
    async componentDidMount() {
        console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
        // console.log(this.props.navigation.state.params);
        await this.setState({order:this.props.navigation.state.params})
        console.log(this.state.order);
        this.setState({latitudeClient:this.props.navigation.state.params.address.lat})
        this.setState({longitudeClient:this.props.navigation.state.params.address.long})
        // this.setState({ latitude: location.coords.latitude })
        // this.setState({ longitude: location.coords.longitude }, () => { this.setState({ _IsCoords: true }) })
        // const interval = setInterval(() => {
        //     console.log("r");
        // }, 1000);
        // setTimeout(() => {
        //     clearInterval(interval)
        // }, 5000);
    }
    onMapLayout = () => {
        // console.log("any");
        this.setState({ isMapReady: true });
        // this.setState({ _IsCoords: true })

    }
    componentWillUnmount() {

        clearInterval(this.interval)
    }
    //-33.712206
   //150.311941
    goto(coords){
        console.log(coords.nativeEvent.coordinate);
        Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${coords.nativeEvent.coordinate.latitude},${coords.nativeEvent.coordinate.longitude}`);
    }
    render() {
        return (
            <View style={styles.container}>
              
                <View style={styles.mainContainer}>

                     <MapView
                        style={{ flex: 1, width: "100%", height: "100%" }}
                        initialRegion={{
                            latitude: this.state.latitudeClient,
                            longitude: this.state.longitudeClient,
                            latitudeDelta: 0.05,
                            longitudeDelta: 0.05,
                            // zoomLevel:2
                        }}
                        onLayout={() => this.onMapLayout()}
                    >

                        {this.props.navigation.state.params.route.map(branch => (
                            // this.state.isMapReady &&
                            // console.log(this.state.latitude)
                            <MapView.Marker coordinate={{ latitude: branch.lat, longitude: branch.long }}
                            onPress={(x) => {this.goto(x)}}
                            // title={"marker.title"}
                            // image={require("../../assets/icons/cart.png")}
                            >
                                <CustomMarker src={branch} />
                            </MapView.Marker>))}
                            
                            <MapView.Marker coordinate={{ latitude: this.state.latitudeClient, longitude: this.state.longitudeClient }}
                                onPress={(x) => {this.goto(x)}}
                            // title={"marker.title"}
                            // image={require("../../assets/icons/cart.png")}
                            >
                                {/* <CustomMarker src={driver} /> */}
                            </MapView.Marker>
                       
                    </MapView>
                        

                </View>


            </View >



        )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // width: '100%',
        // height: '100%',
        // backgroundColor: colors.primary,
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
        height: '100%',
        backgroundColor: colors.white,
        // alignItems: 'center',
        // justifyContent: 'center',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        // paddingTop: 20,
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
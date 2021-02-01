import React from 'react';
import { StyleSheet, Text, View, RefreshControl, FlatList, ActivityIndicator,Platform, Linking,Button, Animated, Input, ScrollView, TouchableOpacity, Image, TextInput, Dimensions, KeyboardAvoidingView, ImageBackground } from 'react-native';
import { Overlay } from 'react-native-elements';
/* colors */
import colors from '../../colors'
/* services */
import dataService from '../../services/dataService'
/* components */
import OrderItem from '../../components/OrderItem/OrderItem'

export default class Details extends React.Component {
    static navigationOptions = { header: null }
    state = {
        OrderData: {},
        refresh:true,
        over:false
    }
    componentDidMount() {
        // dataService.getOrders().then(res=>{
        //     this.setState({orders:res.data})
        // })
        console.log();

        console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
        // console.log(this.props.navigation.state.params);
        // this.setState({ OrderData: this.props.navigation.state.params })
    }
    assign=()=>{
        this.props.navigation.navigate("Map",this.props.navigation.state.params)
    }
    cancel=()=>{
        console.log("cancel");
    }
    dialCall(phoneNumber) {

        // let phoneNumber = '';
        if (Platform.OS === 'android') {
            phoneNumber = `tel:0${phoneNumber}`;
        }
        else {
            phoneNumber = `telprompt:0${phoneNumber}`;
        }

        Linking.openURL(phoneNumber);
    };
    add(item){
        this.setState({refresh:!this.state.refresh})
item.ispurchased=true
    }
    remove(item){
        this.setState({refresh:!this.state.refresh})
        item.ispurchased=false
    }
    toogle(){
        this.setState({over:true})
    }
    finish(){
        this.setState({over:false})
        dataService.finishOrder(this.props.navigation.state.params).then(res => {
           
            this.props.navigation.navigate("Main")
    
            }).catch(err => { console.log(err); })
    
    }
    toggleOverlay(){
        this.setState({over:false})
        console.log("skdj");
    }
    render() {
        return (
            <View style={styles.container}>
      <Overlay isVisible={this.state.over} onBackdropPress={()=>{this.toggleOverlay()}}>
        <Text>هل انت متاكد من توصيل الوردر</Text>
        <TouchableOpacity style={styles.buttont} onPress={() => { this.finish() }}>
                            <Text >نعم</Text>
                        </TouchableOpacity>
      </Overlay>
                <View style={styles.mainContainer}>
                    <Text>العنوان : {this.props.navigation.state.params.address.street} {}
                        {this.props.navigation.state.params.address.route} {}
                        {this.props.navigation.state.params.address.neighbourhood} {}
                        {this.props.navigation.state.params.address.administrative_area} {}
                        {this.props.navigation.state.params.address.city} {}
                        {this.props.navigation.state.params.address.country} {}
                    </Text>
                    <Text>بيانات العميل:
                        </Text>
                    <Text>الاسم :{this.props.navigation.state.params.customerId.username}
                    </Text>
                    <TouchableOpacity style={styles.myText} onPress={() => { this.dialCall(this.props.navigation.state.params.customerId.phoneNumber) }} >

                    <Text>الهاتف :0{this.props.navigation.state.params.customerId.phoneNumber}
                    </Text>
                    </TouchableOpacity>
                    
                    <Text>الدفع :{this.props.navigation.state.params.paymentInfo ? this.props.navigation.state.params.paymentInfo : "Cash"}
                    </Text>
                    <Text>تكلفة الاوردر :{this.props.navigation.state.params.totalOrder}
                    </Text>
                    <Text>وقت بدء الاوردر :{new Date(this.props.navigation.state.params.assignTime).toLocaleString('en-EG')}
                    </Text>
                    <Text>المنتجات :
                        </Text>
                    <FlatList
                        style={{
                            width: Dimensions.get('window').width,
                            alignSelf:'center'
                        }}
                        data={this.props.navigation.state.params.products}
                        extraData={this.state.refresh}
                        renderItem={(item) =>
                            <View style={{ backgroundColor: colors.primary, marginHorizontal: 20, padding: 10, borderRadius: 15,marginVertical:5 }}>
                                
                                        <View style={{  width:20,height:20,backgroundColor:item.item.ispurchased?'green':'red',borderRadius:50}}></View>
                                        <Image
                                            source={{uri:`http://www.beemallshop.com/img/productImages/${item.item.productId.images[0]}`}}
                                            style={styles.imageStyle}
                                        />
                                <Text>العدد : {item.item.count}</Text>
                                <Text>اسم المنتج : {item.item.productId.productNameAR} {item.item.productId.productNameEN}</Text>
                                <Text>سعرالشراء : {item.item.productId.supplierPrice}</Text>
                                <Text>سعر البيع : {item.item.productId.discountPrice}</Text>
                                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                    <TouchableOpacity onPress={()=>{this.add(item.item)}}><Image source={require("../../assets/icons/true.png")}
              style={[styles.mainImageStyle]} ></Image></TouchableOpacity>
              
               <TouchableOpacity onPress={()=>{this.remove(item.item)}}><Image source={require("../../assets/icons/delete.png")}
              style={[styles.mainImageStyle]} ></Image></TouchableOpacity>
              </View>
                            </View>

                        }
                    />
                    {/* <ScrollView>
                        {
                            this.props.navigation.state.params.products.map(item => {
                                return (<Text>ss</Text>)
                            })
                        }
                    </ScrollView> */}
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.button} onPress={() => { this.assign() }}>
                            <Text >ذهاب</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonf} onPress={() => { this.toogle() }}>
                            <Text >تم التوصيل</Text>
                        </TouchableOpacity>
                        
                    </View>

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
        height: '100%',
        backgroundColor: colors.white,
        // alignItems: 'flex-start',
        justifyContent: 'center',
        // borderTopLeftRadius: 40,
        // borderTopRightRadius: 40,
        padding: 20,
        paddingBottom: 0

    },buttonf: {
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 15,
        padding: 10,
        flex: 1, marginHorizontal: 5,
        marginBottom: 10,
        color:colors.white
    },
    button: {
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 15,
        padding: 10,
        flex: 1, marginHorizontal: 5,
        marginBottom: 10
    },mainImageStyle:{
        width:40,
        resizeMode:"contain",
        marginHorizontal:50
    },
    imageStyle:{
        height: Dimensions.get('window').height*2/20,
        width: Dimensions.get('window').height*2/20,
        resizeMode: 'contain',
        alignSelf:'flex-end',
    },
    buttont: {
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 15,
        padding: 10,
         marginHorizontal: 5,
        marginBottom: 30
    },



});
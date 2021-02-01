import React from 'react';
import { StyleSheet, Text, View, RefreshControl, FlatList, ActivityIndicator,Switch, Button, Animated, Input, ScrollView, TouchableOpacity, Image, TextInput, Dimensions, KeyboardAvoidingView, ImageBackground } from 'react-native';
/* gps */
import { Overlay } from 'react-native-elements';
/* colors */
import colors from '../../colors'
/* services */
import dataService from '../../services/dataService'
/* components */
import OrderItem from '../../components/OrderItem/OrderItem'

export default class DetailsDriver extends React.Component {
    static navigationOptions = { header: null }
    state = {
        orders: [],
        refreshing: false,
        data:{},
        isEnabled:true,
        over:false
    }
    async componentDidMount() {
        dataService.getOrders("5fb299136659933f2c88fb93").then(res => {

            this.setState({ data: res.data.result },()=>{
            })
            if(res.data.result.status=='online'){
                this.setState({isEnabled:true})
            }else if(res.data.result.status=='offline'){
                this.setState({isEnabled:false})
            }
        }).catch(err => { console.log(err); })

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
   orderDetails(order){
       console.log(order);
   }
   toggleSwitch(){
       this.setState({isEnabled:!this.state.isEnabled})
   }
   _handleSubmit(){
this.setState({over:true})
   }
   toggleOverlay(){
    this.setState({over:false})
    console.log("skdj");
}
changeStatus(){
    dataService.changeStatus(this.state.isEnabled).then(res => {
console.log(res.data);
        dataService.getOrders("5fb299136659933f2c88fb93").then(res => {

            this.setState({ data: res.data.result },()=>{
                
            })
            this.setState({over:false})
        }).catch(err => { console.log(err); this.setState({over:false})})
    }).catch(err => { console.log(err); this.setState({over:false})})
}
    render() {
        return (
            <View style={styles.container}>
               <Overlay isVisible={this.state.over} onBackdropPress={()=>{this.toggleOverlay()}}>
        <Text>هل انت متاكد من تغيير الحالة</Text>
        <TouchableOpacity style={styles.buttont} onPress={() => { this.changeStatus() }}>
                            <Text >نعم</Text>
                        </TouchableOpacity>
      </Overlay>
                <View style={styles.headerContainer}>

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity style={{ padding: 20 }} >

                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{
                            // fontFamily: 'Cairo-Regular',
                            fontSize: 20,
                        }}>البيانات</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingLeft: 30, width: "70%" }}>

                        </View>
                    </View>

                </View>

                <View style={styles.mainContainer}>
                <Text>الاسم :{this.state.data.name}
                    </Text>
                    <Text>العهدة :{this.state.data.budget} جنية
                    </Text>
                    <Text>الحالة :{this.state.data.status} 
                    </Text>
                    <Switch
        trackColor={{ false: "red", true: "green" }}
        thumbColor={this.state.isEnabled ? "green" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={()=>{this.toggleSwitch()}}
        value={this.state.isEnabled}
      />
       <TouchableOpacity style={styles.tOpacity}
              // disabled={this.state._ckeckSignIn}
              onPress={() => this._handleSubmit()}>
              <Text style={styles.text}>تاكيد</Text>
            </TouchableOpacity>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        // ListHeaderComponent={this._headerItem}
                        // maxToRenderPerBatch={20}
                        // updateCellsBatchingPeriod={20}
                        // legacyImplementation={false}
                        // initialNumToRender={50}
                        // ItemSeparatorComponent = { (<View><Text>asdf</Text></View>) }
                        contentContainerStyle={{ paddingBottom: 100 }}
                        data={this.state.data.history}

                        renderItem={({ item }) => (

                            <TouchableOpacity style={styles.orderOpacity}
                            onPress={()=>{this.orderDetails(item)}}>
            <Text>بيانات العميل</Text>
            <Text>العهدة قبل الشراء : {item.budgetbefore}</Text>
            <Text>العهدة بعد الشراء : {item.budgetafter}</Text>
            <Text>الخارج : {item.outcome}</Text>
            <Text>الداخل : {item.income}</Text>
            <Text>رقم الاوردر : {item.orderid}</Text>
           
              
                
            </TouchableOpacity>
       
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
        alignItems: 'center',
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
    },
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
    },
    tOpacity: {
        width: Dimensions.get('window').width * 343 / 375,
        height: Dimensions.get('window').height * 46 / 812,
        borderRadius: 50,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical:15
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
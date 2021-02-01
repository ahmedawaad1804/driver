import axiosInstance from './axiosInstance';

export default dataService = {
    setPosition: (_id,lat,long) => {

        return axiosInstance
            .post('/order/deliveryPos',{_id,lat,long});
    },
    getOrders: (id) => {

        return axiosInstance
            .post('/order/getDeliveryOrders',{id});
    },
    authunticate: (phone,password) => {

        return axiosInstance
            .post('/driver/login/driver',{phone,password});
    },
    finishOrder: (order) => {

        return axiosInstance
            .post('/order/finishOrder',order);
    },
    changeStatus: (status) => {
        return axiosInstance
            .post('/order/changeStatus',{status});
    },






}

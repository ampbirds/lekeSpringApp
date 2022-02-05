import axios from 'axios';

const API_BASE_URL = "http://localhost:8082/";


class Services {

    registerUser(data){    
        return axios.post(API_BASE_URL+"userApi/createOrUpdate",data);
    }

    getBatteryData(){
        return axios.get(API_BASE_URL+"batteryapi/getAll");
    }
    validateUser(data){
        return axios.post(API_BASE_URL+"userApi/validate",data);
    }
    transactionSave(data){
        return axios.post(API_BASE_URL+"transactionApi/createOrUpdate",data);
    }
}

export default new Services();

import { RegisterCommand } from '../../Command/RegisterCommand'
import Api from '../../utils/Api'

class UserApi {
    register = (data: any) => {
        return Api.post('/user/register', data)
    }

    login = (data: any) => {
        return Api.post('/user/login', data)
    }

    // static logout = (data: any) => {
    // 	let config = {
    // 		headers: {
    // 			Authorization: "Bearer " + localStore.getItem("loginSession"),
    // 		},
    // 	};

    // 	return apiClient.post("/logout", data, config);
    // };
}

export default new UserApi()

import axios from 'axios';
import Qs from 'qs';

/* import {post,get} from './utils/http'

Vue.prototype.$post=post;
Vue.prototype.$get=get; */


axios.defaults.timeout = 5000;
axios.defaults.baseURL ='';

axios.interceptors.request.use(
	config => {
		// const token = sessionStorage.getItem('token')
		// if(token) {
		// 	config.headers.authorization = token
		// }
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

axios.interceptors.response.use(
	res => {
		return res;
	},
	error => {
		return Promise.reject(error)
	}
)


export function get(url,params){
	return new Promise((resolve,reject) => {
		axios.get(url,{
			params:params
		})
		.then(res => {
			resolve(res.data);
		})
		.catch(err => {
			reject(err)
		})
	})
}

export function post(url,data){
	return new Promise((resolve,reject) => {
	axios.post(url,Qs.stringify(data))
		.then(res => {
			resolve(res.data);
		},err => {
			reject(err)
		})
	})
}
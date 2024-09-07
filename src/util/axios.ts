import axios, { AxiosRequestConfig, AxiosResponse } from "axios";


const responseHandler = (response: AxiosResponse) => response;
const requestErrorHandler = (error: any) => Promise.reject(error);
const responseErrorHandler = (error: any) => Promise.reject(error)

const authToken = process.env.OCP_APIM_SUBSCRIPTION_KEY;

export const apiClient = axios.create({

  baseURL: process.env.STRAPI_API_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT",
    "Access-Control-Allow-Headers": "*",
    "Content-Type": "application/json",
	"Authorization": `Bearer ${authToken}`
  },
});


apiClient.interceptors.response.use(
	response => responseHandler(response),
	error => responseErrorHandler(error),
);
export const errorHandler = (reason: any) => {
	if (axios.isCancel(reason)) return 'Request Cancelled';
	if (reason.code === 'ECONNABORTED') return 'A timeout occurred';
	if (reason.response?.status === 404) return 'Resource Not Found';
	if (reason.response?.status === 400 || reason.response?.status === 500)
		return reason.response.data.error_message;

	return 'An unexpected error has occured';
};


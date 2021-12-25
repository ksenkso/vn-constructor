import axios from "axios";
import { IAuthTokens, TokenRefreshRequest, applyAuthTokenInterceptor } from 'axios-jwt'

const BASE_URL = process.env.REACT_APP_API_URL

export const api = axios.create({
    baseURL: BASE_URL,
})

const requestRefresh: TokenRefreshRequest = async (refreshToken: string): Promise<IAuthTokens | string> => {

    // Important! Do NOT use the axios instance that you supplied to applyAuthTokenInterceptor (in our case 'axiosInstance')
    // because this will result in an infinite loop when trying to refresh the token.
    // Use the global axios client or a different instance
    const response = await api.get(`${BASE_URL}/auth/refresh`, {
        params: { refreshToken }
    })

    // If your backend supports rotating refresh tokens, you may also choose to return an object containing both tokens:
    // return {
    //  accessToken: response.data.access_token,
    //  refreshToken: response.data.refresh_token
    //}

    return response.data.access_token
}

applyAuthTokenInterceptor(api, { requestRefresh })

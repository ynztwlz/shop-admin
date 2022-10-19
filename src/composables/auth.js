import { useCookies } from '@vueuse/integrations/useCookies'

const TokenKey = "admin-token"
const cookie = useCookies()

//设置token
export function setToken(token){
    return cookie.set(TokenKey, token)
}

export function getToken(token){
    return cookie.get(TokenKey)
}

export function removeToken(){
    return cookie.remove(TokenKey)
}

import axios from 'axios'

const ERROR_MSG = 'ERROR_MSG'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const LOAD_DATA = 'LOAD_DATA'
const USER_UPDATA='USER_UPDATA'
const initState = {
    msg:'',
    user: '',
    pwd: '',
    headimg:[]
}
export function user(state = initState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return { ...state, msg:'',redirectTo:'/info', user:action.pyload.user,pwd:action.pyload.pwd,...action.pyload}
        case LOAD_DATA:
            return {...state,...action.pyload}
        case ERROR_MSG:
            return { ...state, msg: action.msg }
        case USER_UPDATA:
            return {update:1}  
        default:
            return state
    }
}



function authSuccess({...data}) {
    
    return { type: AUTH_SUCCESS, pyload:data}
}
function userUpdate(){
    return {type:USER_UPDATA}
}
export function loadData(userinfo){
    return {type:LOAD_DATA,pyload:userinfo}
}
function errorMsg(msg) {
    return { msg, type: ERROR_MSG }
}

export function login(data) {
    console.log(data)
    return dispatch => {
        axios.post('/user/login',data)
            .then(res => {
                if (res.status === 200 & res.data.code === 0) {
                    dispatch(authSuccess(res.data.data))
                } else {         
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}

export function regisger(data) {
    console.log(data)
    if (!data.user || !data.pwd ) {
        return errorMsg('用户名密码必须输入')
    }
    if (data.pwd !== data.repeatpwd) {
        return errorMsg('确认密码不一致')
    }

    return dispatch => {
        axios.post('/user/register',data)
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess({...data}))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}

export function UserUpdata(data){
    return dispatch => {
        axios.post('/user/userupdata',data)
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(userUpdate(data))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}
import axios from 'axios'

const ERROR_MSG = 'ERROR_MSG'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const initState = {
    user: '',
    pwd: '',
}
export function user(state = initState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return { ...state, msg: '', ...action.payload }
        case ERROR_MSG:
            return { ...state, msg: action.msg }
        default:
            return state
    }
}



function authSuccess(obj) {
    const { pwd, ...data } = obj
    return { type: AUTH_SUCCESS, payload: data }
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
                if (res.status == 200 && res.data.code === 0) {
                    dispatch(authSuccess({ user }))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}

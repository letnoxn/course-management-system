import axios from 'axios'
import Axios from 'axios';


const SEND_SUCCESS = 'SEND_SUCCESS'

const initState = {
    content: '',
    user: ''
}


export function chat(state = initState, action) {
    switch (action.type) {
        case SEND_SUCCESS:
            return { ...state, user: action.pyload.user, content: action.pyload.content }
        default:
            return state
    }

}

function sendsuccess(...data) {
    return { type: SEND_SUCCESS, pyload: data }
}


export function content(data) {
    return dispatch => {
        axios.post('/user/sendcontent', data)
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {  
                    dispatch(sendsuccess(data))
                } else {
                    alert('发布失败')
                }
            })
    }
}

export function getContentList() {
    return dispatch => {
        Axios.get('/user/getContentList')
            .then(res => {
                if (res.status === 200 && res.data.code === 0){
                    console.log(res.data)
                }
            })
    }
}
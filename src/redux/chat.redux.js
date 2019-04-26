import axios from 'axios'


const SEND_SUCCESS='SEND_SUCCESS'

const initState = {
    connect:'',
    user: '',
    headimg:[]
}


export function chat(state = initState, action) {
    switch(action.type){
        case SEND_SUCCESS:
            return{...state}
            default:
            return state
    }
        
}

function sendsuccess(data){
    return{type:SEND_SUCCESS,pyload:data}
}


export function content(data){
    return dispatch => {
        axios.post('/user/content',data)
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(sendsuccess(data))
                } else {
                   
                }
            })
    }
}
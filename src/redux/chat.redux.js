import axios from 'axios'

const SEND_SUCCESS = 'SEND_SUCCESS'
const GET_CONTENT_SUCCESS = 'GET_CONTENT_SUCCESS'
const UP_LIKE = 'UP_LIKE'

const initState = {
    content: '',
    user: '',
    contents: [],
    users: [],
    like: ''
}


export function chat(state = initState, action) {
    switch (action.type) {
        case SEND_SUCCESS:
            return { ...state, user: action.pyload.user, content: action.pyload.content }
        case GET_CONTENT_SUCCESS:
            return { ...state, contents: action.pyload.contents, users: action.pyload.users, like: action.pyload.like }
        case UP_LIKE:
            return {}
        default:
            return state
    }

}

function sendsuccess(...data) {
    return { type: SEND_SUCCESS,pyload:data }
}
function getContentsuccess(data) {
    data.contents.reverse()
    return { type: GET_CONTENT_SUCCESS, pyload: data }
}


export function content(data) {
    return dispatch => {
        axios.post('/user/sendcontent', data)
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(sendsuccess(data))
                } else {
                    alert('Please type the content  :)')
                }
            })
    }
}

export function uplike(data) {
    return dispatch => {
        axios.get('/user/uplike', { params: { userid: data } })
    }
}

export function getContentList() {
    return dispatch => {
        axios.get('/user/getContentList')
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(getContentsuccess(res.data))
                }
            })
    }
}

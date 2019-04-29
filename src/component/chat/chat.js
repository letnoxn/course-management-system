import { Input, Button, List, Avatar, Icon, Modal } from 'antd'
import axios from 'axios'
import React from 'react'
import { connect } from 'react-redux'
import { content, getContentList,comment } from '../../redux/chat.redux'


@connect(state => state,
    { content, getContentList,comment }
)
class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            content: '',
            comment:'',
            user: '',
            item:'',
            ModalText: 'Content of the modal',
            visible: false,
            confirmLoading: false,

        }

        this.handleContent = this.handleContent.bind(this)
    }
    componentDidMount() {
        this.props.getContentList()
    }
    handleChange(key, val) {
        this.setState({
            [key]: val
        }

        )
    }
    handleContent() {
        const data = {
            content: this.state.content,
            user: this.props.user.user
        }
        this.props.content(data)
        this.props.getContentList()
    }
    handleClick(value) {
        axios.get('/user/uplike', { params: { userid: value._id } })
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    value.like++
                    this.forceUpdate()
                }
            })
    }
    

    showModal = (item) => {
        this.setState({
            visible: true,
            item:item._id
        });
    }

    handleOk = () => {
        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            confirmLoading: true,
        });
        const data={
            comment:this.state.comment,
            itemID:this.state.item,
            user:this.props.user.user
        }
        this.props.comment(data)
    
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 1000);
        this.props.getContentList()
    }

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    }

    render() {
        const { visible, confirmLoading} = this.state;
        const listData = this.props.chat.contents
        const users = this.props.chat.users

        const { TextArea } = Input

        return (<div style={{ background: 'white', overflow: 'hidden' }}>
            <Modal
                title="请输入评论："
                visible={visible}
                onOk={this.handleOk}
                confirmLoading={confirmLoading}
                onCancel={this.handleCancel}
            >
                <TextArea rows={4} onChange={v => this.handleChange('comment', v.target.value)} />
            </Modal>
            <br />
            <br />
            <span style={{ fontStyle: 'italic', color: 'OrangeRed' }} >有什么新鲜事想告诉大家?</span>

            <TextArea rows={5} onChange={v => this.handleChange('content', v.target.value)} />

            <Button onClick={this.handleContent} style={{ float: 'right', background: 'Orange' }} type="primary">发布</Button>
            <div style={{ marginTop: '5vh' }}>
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: (page) => {

                        },
                        pageSize: 3,
                    }}
                    dataSource={listData}
                    renderItem={item => (
                        <div>
                            <List.Item

                                key={item._id}
                                actions={[<span ><Icon onClick={() => this.handleClick(item)} type="like-o" style={{ marginRight: 8 }}></Icon>{item.like}</span>,
                                <span><Icon onClick={() => this.showModal(item)} type="message" style={{ marginRight: 8 }} ></Icon></span>]}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar src={users[item.userid].headimg[0].thumbUrl} />}
                                    title={<span>{item.user}</span>}
                                />
                                {item.content}
                            </List.Item>
                             <bn/>
                            {item.comments.length !== 0 && (
                                <List
                                    className="comment-list"
                                    size="small"
                                    bordered="true"
                                    dataSource={item.comments}
                                    key={item}
                                    renderItem={item => (
                                        <List.Item
                                            className="comment-item"
                                        >
                                            <List.Item.Meta
                                                title={item.user===this.props.user.user?'From me':item.user}
                                                description={item.comment}
                                            />
                                            
                                        </List.Item>
                                    )}
                                />
                            )}
                        </div>
                    )}
                />
                <br/>
                <br/>
            </div>
        </div>
        )
    }
}
export default Chat
import { Input, Button, List, Avatar, Icon } from 'antd'
import React from 'react'
import { connect } from 'react-redux'
import { content, uplike, getContentList } from '../../redux/chat.redux'


@connect(state => state,
    { content, getContentList ,uplike}
)
class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            content: '',
            user: '',
           
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
        console.log(value)
      this.props.uplike(value._id)
      value.like++
      this.forceUpdate() 
    }

    render() {
        const listData = this.props.chat.contents
        const users = this.props.chat.users

        const { TextArea } = Input
        
        return (<div style={{ background: 'white', overflow: 'hidden' }}>
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
                    footer={<div><b>blog</b> footer part</div>}
                    renderItem={item => (
                        <div>
                            <List.Item
                            
                                key={item._id}
                                actions={[<span ><Icon onClick={this.handleClick.bind(this,item)} type="like-o" style={{ marginRight: 8 }}></Icon>{item.like}</span>,
                                <span><Icon type="message" style={{ marginRight: 8 }} ></Icon></span>]}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar src={users[item.userid].headimg[0].thumbUrl} />}
                                    title={<span>{item.user}</span>}
                                />
                                {item.content}
                            </List.Item>
                            {item.comments.length !== 0 && (
                                <List
                                    renderItem={item => (
                                        <List.Item>
                                            <List.Item.Meta
                                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                                title={<a href="https://ant.design">{item.title}</a>}
                                                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                            />
                                        </List.Item>

                                    )}
                                />
                            )}



                        </div>
                    )}
                />
            </div>
        </div>
        )
    }
}
export default Chat
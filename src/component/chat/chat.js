import { Input, Button, Form } from 'antd'
import React from 'react'
import { connect } from 'react-redux'
import { content } from '../../redux/chat.redux'

@connect(state => state.user,
    {content}
)
class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            content: '',
            user: this.props.user
        }
        this.handleContent = this.handleContent.bind(this)
    }
    handleChange(key, val) {
        this.setState({
            [key]: val
        }
        )
    }
    handleContent() {
        this.props.content(this.state)
    }

    render() {
        const { TextArea } = Input
        return (<div style={{ background: 'white', overflow: 'hidden' }}>
            <br />
            <br />
            <span style={{ fontStyle: 'italic', color: 'OrangeRed' }} >有什么新鲜事想告诉大家?</span>

            <TextArea rows={5} onChange={v => this.handleChange('content', v.target.value)} />

            <Button onClick={this.handleContent} style={{ float: 'right' }} type="primary">发布</Button>

        </div>)


    }
}
export default Chat
import { Input, Button, List, Avatar, Icon } from 'antd'
import React from 'react'
import { connect } from 'react-redux'
import { content,getContentList } from '../../redux/chat.redux'

@connect(state => state,
    { content ,getContentList}
)
class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            content: '',
            user: ''
        }
        
        this.handleContent = this.handleContent.bind(this)
    }
    componentDidMount(){
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
            user:this.props.user.user
        }
        this.props.content(data)
    }

    render() {
        const listData = [];
        for (let i = 0; i < 23; i++) {
            listData.push({
               
                title: `ant design part ${i}`,
                
                description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
                content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
            });
        }

        const IconText = ({ type, text }) => (
            <span>
                <Icon type={type} style={{ marginRight: 8 }} />
                {text}
            </span>
        );



        const { TextArea } = Input
        return (<div style={{ background: 'white', overflow: 'hidden' }}>
            <br />
            <br />
            <span style={{ fontStyle: 'italic', color: 'OrangeRed' }} >有什么新鲜事想告诉大家?</span>

            <TextArea rows={5} onChange={v => this.handleChange('content', v.target.value)} />

            <Button onClick={this.handleContent} style={{ float: 'right' }} type="primary">发布</Button>
            <div style={{marginTop:'5vh'}}>
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: (page) => {
                          console.log(page);
                        },
                        pageSize: 3,
                      }}
                   
                />

            </div>


        </div>


        )



    }
}
export default Chat
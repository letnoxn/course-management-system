import React from 'react';
import { Form, Button, Upload, Icon, Modal, message, Input } from 'antd';
import Axios from 'axios';
import { connect } from 'react-redux'
import { regisger } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

@connect(state => state.user,
  { regisger }
)
class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user:'',
      pwd:'',  
      repeatpwd:'',
      fileList: [],
    }
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => {
    this.setState({ fileList })

  }
  formChange = (key, val) => {
    this.setState({
      [key]: val
    })
    console.log(key,val)
  }
  handleRegister() {
    this.props.regisger(this.state)
  }
  display_alert(){
    alert('注册成功！')
  }
  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type='plus' />
        <div className="ant-upload-text">点击上传头像</div>
      </div>
    )
    
    return (<div className="reg-page">
    {this.props.redirectTo ? <p onClick={this.display_alert()}></p> : null}
    {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null}
      <h2 style={{ textAlign: 'center' }}>用户注册</h2>
      <br />
      <br />
      <div className="avatar-uploader">
        <Upload
          name="avatar"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
        <br />
      </div>
      <div>
        <Form className="reg-form">
          <Form.Item label="用户名">
            <Input onChange={v => this.formChange('user',v.target.value)} />
          </Form.Item>
          <Form.Item label="密码">
            <Input.Password onChange={v => this.formChange('pwd',v.target.value)} />
          </Form.Item>
          <Form.Item label="重复密码">
            <Input.Password onChange={v => this.formChange('repeatpwd',v.target.value)} />
            {this.props.msg ? <p className="erro-msg">{this.props.msg}</p> : null}
          </Form.Item>
          <Button type='primary' onClick={() => this.handleRegister()}>提交</Button>
        </Form>
      </div>
    </div>
    )
  }
}

export default Register

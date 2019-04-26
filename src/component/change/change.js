import React from 'react'
import { Form, Button, Upload, Icon, Modal,  Input } from 'antd';
import {connect} from 'react-redux'
import {UserUpdata} from '../../redux/user.redux'

    @connect(state => state.user,
        {UserUpdata}
      )
      class Change extends React.Component {
        constructor(props) {
          super(props)
          this.state = {
            user:this.props.user,
            opwd:'',  
            npwd:'',
            fileList:this.props.headimg,
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
        handleUserUpdata() {
          this.props.UserUpdata(this.state)
        }
        display_alert(){
          alert('密码修改成功！')
          document.cookie = `userid=1;expires=-1`
          window.location.reload()
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
      {this.props.update===1?<p onClick={this.display_alert()}></p> : null}
         
            <h2 style={{ textAlign: 'center' }}>修改用户信息</h2>
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
                <Form.Item label="原密码">
                  <Input.Password onChange={v => this.formChange('opwd',v.target.value)} />
                </Form.Item>
                <Form.Item label="新密码">
                  <Input.Password onChange={v => this.formChange('npwd',v.target.value)} />
                  {this.props.msg ? <p className="erro-msg">{this.props.msg}</p> : null}
                </Form.Item>
                <Button type='primary' onClick={() => this.handleUserUpdata()}>提交</Button>
              </Form>
            </div>
          </div>
          )
        }
      }



export default Change
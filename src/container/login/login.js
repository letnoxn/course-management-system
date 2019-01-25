import React from 'react'
import '../../index.css'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { connect } from 'react-redux'
import { login } from '../../redux/user.redux'
import img from './logo.jpg'



@connect(state => state,
  { login })
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      pwd: '',
      rem: true
    }
    this.getCookie = this.getCookie.bind(this)
  
  }
  
  getCookie(name) {
    let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
      return unescape(arr[2]);
    else
      return null;
  }

  handleSubmit = (e) => {
    let date = new Date();
　　date.setDate(date.getDate()+30);
　　date.toGMTString();
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.login(values)
        if (values.rem) {
          document.cookie = `user=${values.user}_${values.pwd};expires=${date}`
        } 

      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const cookieid = 'user'
    return (

      <div className='loginpage' style={{ textAlign: 'center' }}>
        <img src={img} alt='LOGO' />
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('user', {
              rules: [{ required: true, message: 'Please input your username!' }],
              initialValue: this.getCookie(cookieid).split('_')[0]
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('pwd', {
              rules: [{ required: true, message: 'Please input your Password!' }],
              initialValue: this.getCookie(cookieid).split('_')[1]
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('rem', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>Remember me</Checkbox>
            )}

            <Button onClick={this.handleLogin} type="primary" htmlType="submit" className="login-form-button">
              Log in
          </Button>
            Or <a href="/register">register now!</a>
          </Form.Item>
        </Form>

      </div>
    );
  }
}
Login = Form.create({ name: 'normal_login' })(Login)
export default Login
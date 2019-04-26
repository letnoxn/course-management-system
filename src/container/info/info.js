import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Avatar, Modal } from 'antd';
import {withRouter} from 'react-router-dom'

@withRouter
@connect(state => state.user,
  null)
class Info extends React.Component {
  constructor(props) {
    super(props)

  }
  componentDidmount() {

  }
  logout() {
    const confirm = Modal.confirm;
    confirm({
      title: 'Are you sure logout?',
      content: ':(',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        document.cookie = `userid=1;expires=-1`
        window.location.reload()
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  render() {
    const user = this.props.user
    const headimg = this.props.headimg[0]
    const url = (headimg || {}).thumbUrl

    const redirectTo = this.props.redirectTo
    const path = window.location.pathname



    return (<div>
      {redirectTo && redirectTo != path ? <Redirect to={this.props.redirectTo}></Redirect> : null}
      <div style={{ height: '60px', background: '#ccc' }}>
        <span style={{ fontSize: '30px', marginLeft: '15vw' }}>Blog主页</span>
        <Avatar shape="square" size={50} icon="user" src={url} style={{ marginLeft: '45vw' }} />
        <span style={{ fontSize: '30px', whiteSpace: 'pre' }}>{`   ${this.props.user}`}</span>
        <span onClick={()=>this.props.history.push('/change')} style={{ marginLeft: '5vw', cursor: 'pointer' }}>设置</span>
        <span onClick={this.logout} style={{ marginLeft: '2vw', cursor: 'pointer' }}>退出登录</span>
      </div>
    </div>
    )

  }

}
export default Info
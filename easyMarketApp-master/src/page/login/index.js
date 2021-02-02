import React, {useState} from 'react'
import http from "../../http";
import {Button, InputItem, Toast} from "antd-mobile";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as CommonAction from '../../redux/actions/common';
import userImg from '../../static/img/user.png'
import passwordImg from '../../static/img/password.png'

function Login(prop) {
    const {actions} = prop
    const {startLoading, endLoading, loginSuccess} = actions
    const [loginOrZc, setLoginOrZc] = useState(true)
    const [dl,setDl] = useState({mobile:'',password:''})
    const [zc,setZc] = useState({mobile:'',password:'',passwordTo:''})
    const login = async () => {
        if(!dl.password||!dl.mobile){
            Toast.fail('表单内容不完整！')
            return
        }
        startLoading()
        const {errno, data, errmsg} = await http.postLogin(dl)
        endLoading()
        if (errno === 0) {
            window.localStorage.setItem('token', data.sessionKey)
            window.localStorage.setItem('nideShopUser', data.mobile)
            loginSuccess()
        } else {
            Toast.fail(errmsg, .5)
        }
    }
    const create = async () => {
        if(!zc.password||!zc.passwordTo||!zc.mobile){
            Toast.fail('表单内容不完整！')
            return
        }
        if(zc.password !== zc.passwordTo){
            Toast.fail('俩次密码输入不正确！')
            return
        }
        startLoading()
        const msg = await http.postCreateUser({user: zc})
        endLoading()
        if(msg.data.success){
            Toast.success('注册成功！返回登录')
            setLoginOrZc(true)
        }else {
            Toast.fail(msg.data.msg)
        }
    }

    if (loginOrZc) {
        return (
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                height: '100vh',
                backgroundColor: "white",
                padding: '30px'
            }}>
                <div>
                    <img style={{width: '100%', marginBottom: '200px'}}
                         src="http://yanxuan.nosdn.127.net/bd139d2c42205f749cd4ab78fa3d6c60.png" alt=""/>
                </div>
                <InputItem placeholder="手机号" value={dl.mobile} onInput={e=>setDl({...dl,mobile: e.target.value})}>
                    <div><img src={userImg}/></div>
                </InputItem>
                <InputItem type={'password'} placeholder="密码" value={dl.password} onInput={e=>setDl({...dl,password: e.target.value})}>
                    <div><img src={passwordImg}/></div>
                </InputItem>
                <Button style={{marginTop: '20px'}} type={'primary'} onClick={login}>登录</Button>
                <Button onClick={() => {
                    setLoginOrZc(false)
                }} type={'ghost'} style={{marginTop: '20px'}}>注册</Button>
            </div>
        )
    } else {
        return (
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                height: '100vh',
                backgroundColor: "white",
                padding: '30px'
            }}>
                <div>
                    <img style={{width: '100%', marginBottom: '200px'}}
                         src="http://yanxuan.nosdn.127.net/bd139d2c42205f749cd4ab78fa3d6c60.png" alt=""/>
                </div>
                <InputItem placeholder="手机号/用户名" value={zc.mobile} onInput={e=>setZc({...zc,mobile: e.target.value})}>
                    <div><img src={userImg}/></div>
                </InputItem>
                <InputItem type={'password'} placeholder="密码" value={zc.password} onInput={e=>setZc({...zc,password: e.target.value})}>
                    <div><img src={passwordImg}/></div>
                </InputItem>
                <InputItem type={'password'} placeholder="再输入一次密码" value={zc.passwordTo} onInput={e=>setZc({...zc,passwordTo: e.target.value})}>
                    <div><img src={passwordImg}/></div>
                </InputItem>
                <Button style={{marginTop: '20px'}} type={'primary'} onClick={create}>注册</Button>
                <Button onClick={() => {
                    setLoginOrZc(true)
                }} type={'ghost'} style={{marginTop: '20px'}}>返回</Button>
            </div>
        )
    }

}

const mapDispatchToProps = dispatch => ({actions: bindActionCreators(CommonAction, dispatch)})
export default (connect(null, mapDispatchToProps)(React.memo(Login)))

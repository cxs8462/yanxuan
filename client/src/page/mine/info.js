import React,{useEffect,useState} from 'react'
import Header from "../../components/header";
import {useHistory} from 'react-router-dom'
import http from '../../http/index'
import {Button, DatePicker, InputItem, List, Picker, Toast} from "antd-mobile";
const Item = List.Item;

function Info(){
    const history = useHistory()
    const [info,setInfo] = useState({})
    const getInfo = async ()=>{
        const data = await http.getUserInfo()
        setInfo({...data})
    }
    const sex = [{label:'保密',value:0},{label:'男',value:1},{label:'女',value:2}]
    const setUserInfo = async ()=>{
        if(!info.password) {
            const obj = {...info}
            delete obj.password
            setInfo(obj)
        }
        const res =await http.postUserInfo({info})
        if(res.data.success){
            Toast.success('保存成功！');
            history.goBack()
        }else {
            Toast.success('保存失败，请检查！');
        }
    }
    const upPic =()=>{
        const input = document.createElement('input');
        input.type = "file";
        input.accept = "image/jpeg";
        input.style.display = "none";
        input.onchange = async e => {
            const formdata = new FormData()
            const file = e.target.files[0]
            if (file.type === 'image/jpeg') {
                formdata.append('file', file);
                const data = await http.postPic(formdata);
                const fileUrl = data.data.fileUrl;
                setInfo({...info,avatar:fileUrl})
            } else {
                Toast.info('图片格式错误，应为JPG！');
            }

        }

        input.click();

    }
    useEffect(()=>{
        getInfo()
    },[])

    return (
        <div>
            <Header clickLeft={()=>history.goBack()} title="我的信息"/>
            <List>
                <Item
                    extra={<div style={{width:'100px',height:'100px',borderRadius:'50%',overflow:'hidden'}}><img style={{width:'100px',height:'100px'}} onClick={upPic} src={info.avatar} alt=''/></div>}
                >头像</Item>
                <InputItem style={{textAlign:'right'}} value={info.username} onInput={e=>setInfo({...info,username:e.target.value})} clear moneyKeyboardAlign={'right'}>用户名</InputItem>
                <InputItem style={{textAlign:'right'}} value={info.mobile} onInput={e=>setInfo({...info,mobile:e.target.value})} clear moneyKeyboardAlign={'right'}>手机号码</InputItem>
                <InputItem style={{textAlign:'right'}} value={info.nickname} onInput={e=>setInfo({...info,nickname:e.target.value})} clear moneyKeyboardAlign={'right'}>姓名</InputItem>
                <DatePicker mode={'date'} value={new Date(info.birthday)} onChange={e => setInfo({...info,birthday:e})}>
                    <List.Item>生日</List.Item>
                </DatePicker>
                <Picker
                    data={sex}
                    title="选择性别"
                    value={[info.gender]}
                    onOk={v => setInfo({...info,gender:v[0]})}
                >
                    <List.Item arrow="horizontal">性别</List.Item>
                </Picker>
                <InputItem type={"password"} placeholder={'不填则默认不修改'} style={{textAlign:'right'}} value={info.password} onInput={e=>setInfo({...info,password:e.target.value})} clear moneyKeyboardAlign={'right'}>密码</InputItem>
            </List>
            <div style={{padding:'10px'}}>
                <Button onClick={setUserInfo} type={'primary'}>保存</Button>
            </div>
        </div>
    )
}

export default React.memo(Info)

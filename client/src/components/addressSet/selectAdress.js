import React,{useState,useEffect,useImperativeHandle} from 'react'
import {List, Modal, Toast} from "antd-mobile";
import http from '../../http'
import RadioItem from "antd-mobile/es/radio/RadioItem";

function SelectAdress(props){
    const {that,refs} = props
    const [show ,setShow] = useState(false)
    const [list,setList] = useState([])
    const [check,setCheck] = useState(0)
    const open = ()=>{
        setShow(true)
    }
    const getData = async ()=>{
        const data = await http.getAddressList()
        if(!data.length){
            Toast.fail('无地址信息！')
            setShow(false)
            return
        }
        setList(data)
    }
    const onChange = id=>{
        setCheck(id)
    }
    const onClose = ()=>{
        if(check){
            that.setAddressid(check)
        }else{
            Toast.fail('未选择地址')
        }
        setShow(false)
    }

    useImperativeHandle(refs,()=>{
        return {
            open
        }
    })

    useEffect(()=>{
        if(show){
            getData()
        }
    },[show])

    return (
        <div>
            <Modal
                visible={show}
                transparent
                title="请选择地址"
                footer={[{ text: 'Ok', onPress: onClose }]}
            >
                <div style={{ display:"block", maxHeight: '50vh', overflow: 'auto',minHeight:'20vh' }}>
                    <List>
                        {list.map(i => (
                            <RadioItem key={i.id} checked={check === i.id} onChange={() => onChange(i.id)}>
                                {i.full_region}
                            </RadioItem>
                        ))}
                    </List>
                </div>
            </Modal>
        </div>
    )
}

export default React.memo(SelectAdress)

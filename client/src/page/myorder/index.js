import React, {useEffect, useState, useMemo} from 'react'
import Header from "../../components/header";
import {useHistory} from 'react-router-dom'
import {Badge, Button, Card, Tabs, Toast} from "antd-mobile";
import HttpUtil from "../../http/index";

function MyOrder() {
    const history = useHistory()
    const [data, setData] = useState([])
    const goBack = () => {
        history.goBack()
    }
    const goShopId = id => {
        history.push('/goods/' + id)
    }
    const dfh = useMemo(() => data.filter(r => r.typeid === 1), [data])
    const dsh = useMemo(() => data.filter(r => r.typeid === 2), [data])
    const ddwc = useMemo(() => data.filter(r => r.typeid === 3), [data])

    const tabs = [
        {title: '全部'},
        {title: <Badge text={dfh.length}>待发货</Badge>},
        {title: <Badge text={dsh.length}>待收货</Badge>},
        {title: '订单完成'}
    ]
    const qrsh =async data=>{
        await HttpUtil.postOrderSh(data)
        Toast.success('收货成功！')
        HttpUtil.postOrderList().then(r => {
            setData(r.data.list)
        })
    }

    useEffect(() => {
        HttpUtil.postOrderList().then(r => {
            setData(r.data.list)
        })
    }, [])


    return (
        <div>
            <Header clickLeft={goBack} title="我的订单"/>
            <Tabs tabs={tabs}
                  initialPage={1}
            >
                <div style={{minHeight: '80vh', maxHeight: '85vh'}}>
                    {data.map(r => (
                        <Card key={r.Id} style={{marginTop: '10px'}}>
                            <Card.Header
                                title={r.shop.name + '×' + r.number}
                                thumb={<img style={{width: '50px', height: '50px'}} src={r.shop.list_pic_url}/>}
                                extra={<span>{r.price}元</span>}
                                onClick={() => {
                                    goShopId(r.shop.id)
                                }}
                            />
                            <Card.Body>
                                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                    <Badge text={r.type} style={{
                                        padding: '0 3px',
                                        backgroundColor: '#fff',
                                        borderRadius: 2,
                                        color: '#f19736',
                                        border: '1px solid #f19736',
                                    }} hot/><span>收货地址：{r.address.address}({r.address.name})</span></div>
                                <p style={{marginTop: '5px', fontSize: '14px', color: '#7a7a7a'}}>订单创建时间：{r.time}</p>
                            </Card.Body>
                            <Card.Footer content={'订单编号：' + r.bh}/>
                        </Card>
                    ))}
                </div>
                <div style={{minHeight: '80vh', maxHeight: '85vh'}}>
                    {dfh.map(r => (
                        <Card key={r.Id} style={{marginTop: '10px'}}>
                            <Card.Header
                                title={r.shop.name + '×' + r.number}
                                thumb={<img style={{width: '50px', height: '50px'}} src={r.shop.list_pic_url}/>}
                                extra={<span>{r.price}元</span>}
                                onClick={() => {
                                    goShopId(r.shop.id)
                                }}
                            />
                            <Card.Body>
                                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                    <Badge text={r.type} style={{
                                        padding: '0 3px',
                                        backgroundColor: '#fff',
                                        borderRadius: 2,
                                        color: '#f19736',
                                        border: '1px solid #f19736',
                                    }} hot/><span>收货地址：{r.address.address}({r.address.name})</span></div>
                                <p style={{marginTop: '5px', fontSize: '14px', color: '#7a7a7a'}}>订单创建时间：{r.time}</p>
                            </Card.Body>
                            <Card.Footer content={'订单编号：' + r.bh}/>
                        </Card>
                    ))}
                </div>
                <div style={{minHeight: '80vh', maxHeight: '85vh'}}>
                    {dsh.map(r => (
                        <Card key={r.Id} style={{marginTop: '10px'}}>
                            <Card.Header
                                title={r.shop.name + '×' + r.number}
                                thumb={<img style={{width: '50px', height: '50px'}} src={r.shop.list_pic_url}/>}
                                extra={<span>{r.price}元</span>}
                                onClick={() => {
                                    goShopId(r.shop.id)
                                }}
                            />
                            <Card.Body>
                                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                    <Badge text={r.type} style={{
                                        padding: '0 3px',
                                        backgroundColor: '#fff',
                                        borderRadius: 2,
                                        color: '#f19736',
                                        border: '1px solid #f19736',
                                    }} hot/><span>收货地址：{r.address.address}({r.address.name})</span></div>
                                <p style={{marginTop: '5px', fontSize: '14px', color: '#7a7a7a'}}>订单创建时间：{r.time}</p>
                                <p style={{marginTop: '5px', fontSize: '14px', color: '#7a7a7a'}}>订单编号：{r.bh}</p>
                            </Card.Body>
                            <Card.Footer content={<div>
                                <Button onClick={()=>qrsh({id:r.Id})}>确认收货</Button>
                            </div>}/>
                        </Card>
                    ))}
                </div>
                <div style={{minHeight: '80vh', maxHeight: '85vh'}}>
                    {ddwc.map(r => (
                        <Card key={r.Id} style={{marginTop: '10px'}}>
                            <Card.Header
                                title={r.shop.name + '×' + r.number}
                                thumb={<img style={{width: '50px', height: '50px'}} src={r.shop.list_pic_url}/>}
                                extra={<span>{r.price}元</span>}
                                onClick={() => {
                                    goShopId(r.shop.id)
                                }}
                            />
                            <Card.Body>
                                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                    <Badge text={r.type} style={{
                                        padding: '0 3px',
                                        backgroundColor: '#fff',
                                        borderRadius: 2,
                                        color: '#f19736',
                                        border: '1px solid #f19736',
                                    }} hot/><span>收货地址：{r.address.address}({r.address.name})</span></div>
                                <p style={{marginTop: '5px', fontSize: '14px', color: '#7a7a7a'}}>订单创建时间：{r.time}</p>
                            </Card.Body>
                            <Card.Footer content={'订单编号：' + r.bh}/>
                        </Card>
                    ))}
                </div>
            </Tabs>
        </div>
    )
};

export default React.memo(MyOrder);

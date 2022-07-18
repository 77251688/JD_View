import React, { useState, useEffect, ReactPortal } from "react";
import ReactDOM from "react-dom";
import { Table, Tag, Modal, Button, message } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import axios from "axios";
import "./index.css";
const { confirm } = Modal;
import {
    EditOutlined,
    CheckOutlined,
    StopOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';

import AdduserForm from "./AdduserForm";
import ChangeUser from "./ChangeUser";

interface DataType {
    key: string,
    name: string
}

interface itemType {
    id: number,
    name: string,
    val: string
}


export default function User() {
    const [isVisible, setVisible] = useState(false);
    const [changeFormisVisible, setchangeFormVisible] = useState(false);
    const [node, setnode] = useState<ReactPortal>();
    const [editEnv, seteditEnv] = useState();
    const cancel = () => {
        setVisible(false);
    };
    const handleCancel = () => {
        setchangeFormVisible(false);
    };
    const enable = (item: itemType) => {
        enableConfirm(item);
    };
    const disabled = (item: itemType) => {
        disabledConfirm(item);
    };
    const enableConfirm = (item: itemType) => {
        confirm({
            title: '确定启用',
            icon: <ExclamationCircleOutlined />,
            content: `确定启用 ${item.val}?`,
            async onOk() {
                console.log('OK');
                const res_ = await fetch("/user/enable", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify([{ id: item.id }])
                });
                const res = await res_.json();
                if (res.code === 400) {
                    message.success(`启用失败 message:${res.message}`);
                    return;
                }
                message.success("启用成功");
                setDataSource(res);
            },
            onCancel() {
                console.log('Cancel');
                message.info("取消启用");
            },
        });
    };
    const disabledConfirm = (item: itemType) => {
        confirm({
            title: '确定禁用',
            icon: <ExclamationCircleOutlined />,
            content: `确定禁用 ${item.val}?`,
            async onOk() {
                console.log('OK');
                const res_ = await fetch("/user/disabled", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify([{ id: item.id }])
                });
                const res = await res_.json();
                if (res.code === 400) {
                    message.success(`禁用失败 message:${res.message}`);
                    return;
                }
                message.success("禁用成功");
                setDataSource(res);
            },
            onCancel() {
                console.log('Cancel');
                message.info("取消禁用");
            },
        });
    };
    const columns: ColumnsType<DataType> = [
        {
            title: 'Id',
            dataIndex: 'id'
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: '值',
            dataIndex: 'val',
        },
        {
            title: "备注",
            dataIndex: "remark"
        },
        {
            title: '启|禁用',
            dataIndex: 'isdisabled',
            render: (isdisabled: boolean) => {
                return isdisabled ? <Tag color="red-inverse">已禁用</Tag> : <Tag color="green-inverse">已启用</Tag>;
            }
        },
        {
            title: '操作',
            dataIndex: 'isdisabled',
            render: (isdisabled: boolean, item: itemType) => {
                return (
                    <div className="action">
                        <span onClick={() => { Env(item); }}><EditOutlined /></span>
                        <span >{isdisabled ? <a onClick={() => { enable(item); }}><CheckOutlined /></a> : <a onClick={() => { disabled(item); }}><StopOutlined /></a>}</span>
                        <span onClick={() => { Confirm(item); }}><DeleteOutlined /></span>
                    </div>
                );
            }
        }

    ];
    const Env = (item: itemType) => {
        seteditEnv(item);
        setchangeFormVisible(true);
    };
    const Confirm = (item: itemType) => {
        confirm({
            title: '确认删除',
            icon: <ExclamationCircleOutlined />,
            content: `值${item.val}?`,
            okText: '确认',
            cancelText: '取消',
            onOk() {
                console.log('OK');
                deluser(item);
            },
            onCancel() {
                console.log('Cancel');
                message.info("取消删除");
            },
        });
    };
    const deluser = async (item: itemType) => {
        console.log("del");
        const hide = message.loading('删除中...', 0);
        const { data } = await axios.delete("/user", {
            data: [item]
        });
        setDataSource(data);
        hide();
        message.success('删除成功');

    };
    const getEnv = () => {
        return dataSource;
    };
    const [dataSource, setDataSource] = useState([]);
    useEffect(() => {
        axios.get("/api/user").then((res: { data: any; }) => {
            setDataSource(res.data);
        });
    }, []);
    useEffect(() => {
        const btn = <Button type="primary" onClick={() => { setVisible(true); }}>添加变量</Button>;
        const action = document.querySelector(".action") as Element;
        setnode(ReactDOM.createPortal(btn, action));
    }, []);
    return (
        <div>
            {node}
            <Table columns={columns} dataSource={dataSource} pagination={false} />
            <AdduserForm isVisible={isVisible} cancel={cancel} setDataSource={setDataSource} getEnv={getEnv} />
            <ChangeUser changeFormisVisible={changeFormisVisible} handleCancel={handleCancel} editEnv={editEnv} setDataSource={setDataSource} />
        </div>
    );
}

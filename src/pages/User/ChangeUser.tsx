import React, { useEffect } from "react";
import { Form, Input, Modal, message } from 'antd';

interface envType {
    id: number
    name: string
    val: string
    isdisabled: boolean
}

interface valsType {
    id: number
    name: string
    val: string
    remark: string
    isdisabled: boolean
}

const ChangeUser = ({ changeFormisVisible, handleCancel, editEnv, setDataSource }: {
    changeFormisVisible: boolean
    handleCancel: () => void
    editEnv: envType
    setDataSource: (parms: []) => void
    getEnv: () => []
}) => {
    const [form] = Form.useForm();
    const handleOk = async (vals: valsType) => {
        const { id } = editEnv;
        const { name, val, remark } = vals;
        if ((name === undefined) && (val === undefined) && (remark === undefined)) {
            message.info("取消修改");
            return;
        }
        const hide = message.loading('修改中...', 0);
        const res_ = await fetch("/user", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify([{ id: id, name: name, val: val, remark: remark }])
        });
        const res = await res_.json();
        if (res.code === 400)
            return message.error(`修改失败 message: ${res.message}`);
        setDataSource(res);
        hide();
        message.success('修改成功');
    };
    useEffect(() => {
        form.resetFields();
    }, [changeFormisVisible]);

    return (
        <Modal
            visible={changeFormisVisible}
            title="修改用户"
            okText="确认"
            cancelText="取消"
            onCancel={() => {
                handleCancel();
                message.info('取消修改');
            }}
            onOk={() => {
                form
                    .validateFields()
                    .then((values: valsType) => {
                        handleOk(values);
                        handleCancel();
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
            >
                <Form.Item
                    name="name"
                    label="名称"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="val"
                    label="值"
                >
                    <Input type="textarea" />
                </Form.Item>

                <Form.Item
                    name="remark"
                    label="备注"
                >
                    <Input type="textarea" />
                </Form.Item>
            </Form>
        </Modal>

    );
};
export default ChangeUser;
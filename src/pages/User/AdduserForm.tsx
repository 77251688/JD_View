import React, { useEffect } from "react";
import { Input, Modal, message, Form } from 'antd';

interface valsType {
    name: string
    val: string
    remark: string
}

const AdduserForm = ({ isVisible, cancel, setDataSource }: {
    isVisble: boolean
    cancel: () => void
    setDataSource: (data: []) => void
}) => {
    const [form] = Form.useForm();
    const addform = async (vals: valsType) => {
        const res_ = await fetch("/user", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify([vals])
        });
        const res = await res_.json();
        if (res.code === 400) return message.error("添加失败");
        setDataSource(res);
    };
    useEffect(() => {
        form.resetFields();
    }, [isVisible]);
    return (
        <Modal
            visible={isVisible}
            title="添加用户"
            okText="确认"
            cancelText="取消"
            onCancel={() => {
                cancel();
                message.info("取消添加");
            }}
            onOk={() => {
                try {
                    form
                        .validateFields()
                        .then((values: valsType) => {
                            addform(values);
                            cancel();
                            message.success("添加成功");
                        });
                }
                catch (err) {
                    message.info("请输入正确的值");
                }
            }}
        >
            <Form
                form={form}
                layout="vertical"
            >
                <Form.Item
                    name="name"
                    label="名称"
                    rules={[{ required: true, message: '不能为空!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="val"
                    label="值"
                    rules={[{ required: true, message: '不能为空!' }]}
                >
                    <Input type="textarea" />
                </Form.Item>

                <Form.Item
                    name="remark"
                    label="备注"
                    rules={[{ required: true, message: '不能为空!' }]}
                >
                    <Input type="textarea" />
                </Form.Item>
            </Form>
        </Modal>
    );
};
export default AdduserForm;
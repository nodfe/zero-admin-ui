import React, {useEffect, useState} from 'react';
import { Form, Input, Modal, Select } from 'antd';
import { BrandListItem } from '../data.d';
import {RoleListItem} from "@/pages/system/role/data";
import {queryRole} from "@/pages/system/role/service";

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: Partial<BrandListItem>) => void;
  updateModalVisible: boolean;
  currentData: Partial<BrandListItem>;
}
const FormItem = Form.Item;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateBrandForm: React.FC<UpdateFormProps> = (props) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const [roleConf, setRoleConf] = useState<RoleListItem[]>([]);

  const {
    onSubmit,
    onCancel,
    updateModalVisible,
    currentData,
  } = props;

  useEffect(() => {
    if (form && !updateModalVisible) {
      form.resetFields();

      queryRole({pageSize: 100,current: 1 }).then((res) => {
        setRoleConf(res.data)
      });
    }
  }, [props.updateModalVisible]);

  useEffect(() => {
    if (currentData) {
      form.setFieldsValue({
        ...currentData,
      });
    }
  }, [props.currentData]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: { [key: string]: any }) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const renderContent = () => {
    return (
      <>
        <FormItem
          name="id"
          label="主键"
          hidden
        >
          <Input id="update-id" placeholder="请输入主键" />
        </FormItem>
        <FormItem
          name="name"
          label="用户名"
        >
          <Input id="update-name" placeholder={'请输入用户名'}/>
        </FormItem>
        <FormItem
          name="nick_name"
          label="昵称"
        >
          <Input id="update-nick_name" placeholder={'请输入昵称'}/>
        </FormItem>
        <FormItem
          name="mobile"
          label="手机号"
        >
          <Input id="update-mobile" placeholder={'请输入手机号'}/>
        </FormItem>
        <FormItem
          name="email"
          label="邮箱"
        >
          <Input id="update-email" placeholder={'请输入邮箱'}/>
        </FormItem>
        <FormItem
          name="dept_id"
          label="部门"
        >
          <Input id="update-dept_id" placeholder={'请输入部门'}/>
        </FormItem>
        <FormItem
          name="role_id"
          label="角色"
        >
          <Select id="role_id" placeholder={'请选择角色'}>
            {roleConf.map(r => <Select.Option value={r.id}>{r.name+r.remark}</Select.Option>)}
          </Select>
        </FormItem>
        <FormItem
          name="status"
          label="状态"
        >
          <Select id="status" placeholder={'请选择状态'}>
            <Option value={0}>禁用</Option>
            <Option value={1}>启用</Option>
          </Select>
        </FormItem>
      </>
    );
  };


  const modalFooter = { okText: '保存', onOk: handleSubmit, onCancel };

  return (
    <Modal
      forceRender
      destroyOnClose
      title="修改用户"
      visible={updateModalVisible}
      {...modalFooter}
    >
      <Form
        {...formLayout}
        form={form}
        onFinish={handleFinish}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateBrandForm;

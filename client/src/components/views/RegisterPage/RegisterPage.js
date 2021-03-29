import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import residences from 'utils/areaInfo';
import NicknameObj from 'utils/NickName';
import EmailModal from './Sections/EmailModla';
import { Form, Input, Cascader, Select, Button, Steps, Typography } from 'antd';
import 'antd/dist/antd.css';
import { ConsoleSqlOutlined } from '@ant-design/icons';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const RegisterPage = props => {
  const [form] = Form.useForm();
  const [size, setsize] = useState('middle');
  const { Step } = Steps;
  const [Email, setEmail] = useState('');
  const [NickName, setNickName] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [Address, setAddress] = useState([]);
  const { Title } = Typography;

  const onFinish = values => {
    console.log('Received values of form: ', values);
  };

  const onEmailHandler = event => {
    setEmail(event.currentTarget.value);
  };
  const onPasswordHandler = event => {
    setPassword(event.currentTarget.value);
  };
  const onConfirmPasswordHandler = event => {
    setConfirmPassword(event.currentTarget.value);
  };
  // 닉네임 랜덤으로 생성
  const onNickNameHandler = event => {
    const newNickNameFirst = NicknameObj['first'];
    let idx = Math.floor(Math.random() * 6);

    let RandomeFirst =
      newNickNameFirst[Math.floor(Math.random() * newNickNameFirst.length)];
    const newNickNameSecond = NicknameObj['second'];

    let RandomeSecond =
      newNickNameSecond[Math.floor(Math.random() * newNickNameSecond.length)];
    const RandomeNickname = RandomeFirst + RandomeSecond;
    console.log(RandomeNickname);
    setNickName(RandomeNickname);
  };

  const onAddressHandler = event => {
    let address = event[0] + ' ' + event[1];
    console.log(address);
    setAddress(address);
  };

  const handlerSubmit = event => {
    console.log(event);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  return (
    <div style={{ margin: '5% auto', padding: '2rem' }}>
      <Steps size="small" current={0} style={{ Color: '#faad14' }}>
        <Step title="회원가입" />
        <Step title="취향선택" />
        <Step title="완료" />
      </Steps>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: ['경북', '구미'],
          prefix: '86',
        }}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input
            value={Email}
            onChange={onEmailHandler}
            style={{ margin: '0.5rem' }}
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password value={Password} onChange={onPasswordHandler} />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error('The two passwords that you entered do not match!'),
                );
              },
            }),
          ]}
        >
          <Input.Password
            value={ConfirmPassword}
            onChange={onConfirmPasswordHandler}
          />
        </Form.Item>

        <Form.Item
          name="nickname"
          label="Nickname"
          tooltip="What do you want others to call you?"
          rules={[
            {
              required: true,
              message: 'Please input your nickname!',
              whitespace: true,
            },
          ]}
        >
          <Title level={5}>{NickName}</Title>
        </Form.Item>
        <Button size={size} onClick={() => onNickNameHandler()}>
          랜덤선택
        </Button>

        <Form.Item
          name="residence"
          label="사는 지역"
          rules={[
            {
              type: 'array',
              required: true,
              message: 'Please select your habitual residence!',
            },
          ]}
        >
          <Cascader onChange={onAddressHandler} options={residences} />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <div style={{ display: 'flex' }}>
            <EmailModal />
            <Link
              to={{
                pathname: '/register/taste',
                state: {
                  email: Email,
                  nickname: NickName,
                  password: Password,
                  address: Address,
                },
              }}
            >
              <Button
                onClick={handlerSubmit}
                style={{ backgroundColor: '#faad14', borderColor: '#faad14' }}
              >
                다음
              </Button>
            </Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterPage;

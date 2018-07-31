import React from 'react';
import { Row, Col } from 'antd';
import { Card } from 'antd';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  state = {
    status: {}
  };
  handleSubmit = (e, value) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (values.password.length >= 8) {
          this.setState({
            status: {
              validateStatus: 'success',
              errorMsg: null,
            },
          });
          console.log('Received values of form: ', values);
        }
        else {
          this.setState({
            status: {
              validateStatus: 'error',
              errorMsg: 'Не менее 8 символов',
            },
          });
        }
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const status = this.state.status
    return (
      <Card hoverable style={{ width: 350, padding: 30 }}>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Введите логин' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Логин" />
            )}
          </FormItem>
          <FormItem validateStatus={status.validateStatus} help={status.errorMsg}>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Введите пароль' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Пароль" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>Запомнить</Checkbox>
            )}
            <Button type="primary" htmlType="submit" className="login-form-button">
              Войти
              </Button>
          </FormItem>
        </Form>
      </Card>
    );
  }
}

const SignIn = Form.create()(NormalLoginForm);

export default SignIn;


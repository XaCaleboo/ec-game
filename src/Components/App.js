import React, { Component } from 'react';
import { Row, Col, Card, Form, Icon, Input, Button, message } from 'antd';
import './App.css';
import { requestPOST } from './Requests';

const FormItem = Form.Item;

class App extends Component {
  state = {
    success: false,
  };

  checkUsername = (rule, value, callback) => {
    if ((value.length < 5) || (value.length > 150)) {
      callback('От 5 до 150 символов');
    }
    if (value.search(/[^a-zA-Z0-9\@\.\+\-\_]/) >= 0) {
      callback('Только a-z, A-Z, 0-9 и символы @/./+/-/_');
    }
    callback();
  }

  checkPassword = (rule, value, callback) => {
    if ((value.length < 8) || (value.length > 150)) {
      callback('От 8 до 150 символов');
    }
    callback();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    
    this.props.form.validateFields((err, values) => {
      if (!err) {
        requestPOST('/login/', values).then((result)=>{
          if (result.success) {
            message.success('Успешно');
          } else {
            message.error('Не верный логин или пароль');
          }
        }).catch((err)=>{
          message.error('Ошибка соединения с сервером. Повторите позже');
          console.log(err);
        });
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const status = this.state.status
    return (
      <Row type="flex" justify="center" align="middle" className="row">
        <Col xs={{ span: 24 }} sm={{ span: 16 }} md={{ span: 12 }} lg={{ span: 9 }} xl={{ span: 8 }}>
          <Card>
            <Form onSubmit={this.handleSubmit} className='login-form'>
              <FormItem>
                {getFieldDecorator('username', {
                  rules: [{
                    validator: this.checkUsername
                  }],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Логин" />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{ validator: this.checkPassword }],
                })(
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Пароль" />
                )}
              </FormItem>
              <FormItem>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Войти
                </Button>
              </FormItem>
            </Form>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Form.create()(App);
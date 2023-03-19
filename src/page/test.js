import React, { Component }  from 'react';
import { Layout, Button, theme, Form, Input } from 'antd';

// const{ token: { colorBgContainer },} = theme.useToken();

class Login2 extends Component{
    constructor(){
        super();
        this.state ={
            username: "",
            password: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.onFinish = this.onFinish.bind(this);
        this.onFinishFailed = this.onFinishFailed.bind(this);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onFinish(){ console.log('Success:'); };
    onFinishFailed(){ console.log('Failed:'); };

    render(){
        return(
            <div className="site-layout-content" style={{ textAlign: 'center' }}>
          home after login
        </div>
        )
    }
}

export default Login2;
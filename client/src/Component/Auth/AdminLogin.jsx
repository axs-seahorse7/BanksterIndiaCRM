import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Card, Divider, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";

const AdminLogin = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (values) => {

        setLoading(true);
        try {
            const response = await axios.post("http://localhost:4000/auth/login", values);

            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.user));

                message.success("Login successful!");
                navigate("/dashboard");
            } else {
                message.error("Invalid credentials!");
            }
        } catch (error) {
            message.error(error.response?.data?.message || "Login failed!");
        }
        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-300">
            <Card className="w-96 shadow-md">
                <h2 className="text-lg text-cyan-500 mb-4 text-center">Admin Login</h2>
                <Form layout="vertical" onFinish={handleLogin}>
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: "Please enter your email" }]}
                    >
                        <Input prefix={<MailOutlined />} placeholder="Email" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: "Please enter your password" }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block loading={loading}>
                            Login
                        </Button>
                    </Form.Item>
                </Form>

                <Divider>OR</Divider>

                <div className="text-center text-sm text-gray-600">
                    {/* <span>Want to login as a recruiter?</span> */}
                    <Button type="link" onClick={() => navigate("/recruiter-login")}>
                        Login as Recruiter
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default AdminLogin;
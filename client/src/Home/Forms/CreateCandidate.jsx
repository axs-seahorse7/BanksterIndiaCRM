import React, { useState } from "react";
import { Form, Input, Button, Select, DatePicker, InputNumber, Row, Col, message } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const CandidateForm = ({ closeForm }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    console.log("Form Data:", values);
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:4000/candidates", values);

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
    <div className="CandidateFormWrapper">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="p-4 rounded-lg bg-white shadow"
      >
        <div>
          <Button type="text" onClick={() => closeForm(false)}>
            <i className="ri-arrow-left-line"></i> Back
          </Button>
        </div>

        <h2 className="text-md mt-4 mb-2 font-semibold text-cyan-500">
          Candidate Information
        </h2>

        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Form.Item
              name="name"
              label="Candidate Name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input placeholder="Full Name" />
            </Form.Item></Col>
          <Col xs={24} md={8}>
            <Form.Item
              name="mobileNo"
              label="Mobile No."
              rules={[
                { required: true, message: "Please enter your mobile number" },
                { pattern: /^[0-9]{10}$/, message: "Enter a valid 10-digit number" },
              ]}
            >
              <Input placeholder="Mobile No" />
            </Form.Item></Col>
          <Col xs={24} md={8}>

            <Form.Item
              name="email"
              label="Candidate Email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Enter a valid email" },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item></Col>
        </Row>

        {/* Location Details */}
        <h2 className="text-md  mb-4 font-semibold text-cyan-500">Location</h2>
        <Row gutter={16}>
          <Col md={8} xs={12}>
            <Form.Item name={["location", "country"]} label="Country">
              <Input placeholder="Country" />
            </Form.Item></Col>
          <Col md={8} xs={12}>
            <Form.Item name={["location", "state"]} label="State">
              <Input placeholder="State" />
            </Form.Item></Col>
          <Col md={8} xs={12}>
            <Form.Item name={["location", "city"]} label="City">
              <Input placeholder="City" />
            </Form.Item></Col>
          <Col md={8} xs={12}>

            <Form.Item name={["location", "zip"]} label="Zip Code">
              <InputNumber placeholder="Zip Code" style={{ width: "100%" }} />
            </Form.Item></Col>
        </Row>

        {/* Education */}
        <h2 className="text-md mb-4 font-semibold text-cyan-500">Education</h2>
        <Form.List name="education">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} className="flex gap-4">
                  <Form.Item {...restField} name={[name, "collageName"]} label="College/University">
                    <Input placeholder="College Name" />
                  </Form.Item>
                  <Form.Item {...restField} name={[name, "degree"]} label="Degree">
                    <Input placeholder="Degree" />
                  </Form.Item>
                  <Form.Item {...restField} name={[name, "statrDate"]} label="Start Date">
                    <DatePicker style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item {...restField} name={[name, "endDate"]} label="End Date">
                    <DatePicker style={{ width: "100%" }} />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </div>
              ))}
              <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                Add Education
              </Button>
            </>
          )}
        </Form.List>

        {/* Company Details */}
        <h2 className="text-md mt-4 mb-4 font-semibold text-cyan-500">Company Details</h2>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item name={["companyDetails", "companyName"]} label="Company Name">
              <Input placeholder="Company Name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name={["companyDetails", "designation"]} label="Designation">
              <Input placeholder="Designation" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name={["companyDetails", "product"]} label="Product">
              <Input placeholder="Product" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name={["companyDetails", "websiteLink"]} label="Website Link">
              <Input placeholder="Website Link" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name={["companyDetails", "experience"]} label="Experience (Years)">
              <InputNumber placeholder="Experience" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        {/* Past Companies */}
        <h2 className="text-md mt-4 mb-4 font-semibold text-cyan-500">Past Companies</h2>
        <Form.List name="pastCompanyDetails">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} className="flex gap-4">
                  <Form.Item {...restField} name={[name, "pastCompany"]} label="Company">
                    <Input placeholder="Past Company" />
                  </Form.Item>
                  <Form.Item {...restField} name={[name, "designation"]} label="Designation">
                    <Input placeholder="Designation" />
                  </Form.Item>
                  <Form.Item {...restField} name={[name, "product"]} label="Product">
                    <Input placeholder="Product" />
                  </Form.Item>
                  <Form.Item {...restField} name={[name, "experience"]} label="Experience">
                    <InputNumber placeholder="Experience (Years)" style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item {...restField} name={[name, "salary"]} label="Salary">
                    <InputNumber placeholder="Salary" style={{ width: "100%" }} />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </div>
              ))}
              <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                Add Past Company
              </Button>
            </>
          )}
        </Form.List>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            {/* Resume Upload */}
            <Form.Item name="resume" label="Upload Resume">
              <Input type="file" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            {/* Password */}
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please enter your password" },
                { min: 6, message: "Password must be at least 6 characters" },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item></Col>
        </Row>

        <Row gutter={16} className="btnRow">
          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={loading} loading={loading}>
              Add
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </div>
  );
};

export default CandidateForm;

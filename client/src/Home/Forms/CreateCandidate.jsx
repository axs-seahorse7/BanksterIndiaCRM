// import { useState } from "react";
// import axios from 'axios'
// import { useMessage } from "../../../Global/messageContext";

// const CandidateForm = ({closeForm}) => {
//   const message = useMessage()

//   const initialData = {
//     name: "",
//     mobileNo: "",
//     email: "",
//     location: {
//       country: "",
//       state: "",
//       city: "",
//       zip: "",
//     },
//     education: [
//       {
//         collegeName: "",
//         degree: "",
//         startDate: "",
//         endDate: "",
//       },
//     ],
//     companyDetails: {
//       companyName: "",
//       designation: "",
//       product: "",
//       websiteLink: "",
//       experience: "",
//       currentSalary: "",
//       expectedSalary: "",
//       startDate: "",
//       endDate: "",
//     },
//     pastCompanyDetails: [
//       {
//         pastCompany: "",
//         designation: "",
//         product: "",
//         experience: "",
//         salary: "",
//       },
//     ],
//     resume: "",
//   }
  
//   const [formData, setFormData] = useState(initialData);

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

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [...prev.education, { collegeName: "", degree: "", startDate: "", endDate: "" }],
    }));
  };

  const addPastCompany = () => {
    setFormData((prev) => ({
      ...prev,
      pastCompanyDetails: [...prev.pastCompanyDetails, { pastCompany: "", designation: "", product: "", experience: "", salary: "" }],
    }));
  };
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

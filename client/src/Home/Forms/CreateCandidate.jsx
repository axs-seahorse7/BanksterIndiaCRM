import React, { useEffect, useState } from "react";
import { Form, Input, Button, DatePicker, InputNumber, Row, Col, message, Upload } from "antd";
import { MinusCircleOutlined, PlusOutlined, InboxOutlined } from "@ant-design/icons";
import axios from 'axios';
import dayjs from "dayjs";

const CandidateForm = ({ closeForm, editFormData }) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [fileList, setFileList] = useState([]);
  const [resumeUrl, setResumeUrl] = useState(null);

  const convertFormData = (data) => {
    if (!data) return {};

    return {
      ...data,
      companyDetails: {
        ...data.companyDetails,
        startDate: data.companyDetails.startDate ? dayjs(data.companyDetails.startDate) : null,
        endDate: data.companyDetails.endDate ? dayjs(data.companyDetails.endDate) : null,
      },
      education: data.education?.map((edu) => ({
        ...edu,
        startDate: edu.startDate ? dayjs(edu.startDate) : null,
        endDate: edu.endDate ? dayjs(edu.endDate) : null,
      })),
      pastCompanyDetails: data.pastCompanyDetails || [],
    };
  };

  useEffect(() => {
    if (editFormData) {
      form.setFieldsValue(convertFormData(editFormData));
    }
  }, [editFormData, form]);


  const handleSubmit = async (values) => {
    values.mobileNo = parseInt(values?.mobileNo);

    const isEdit = editFormData !== null;
    const url = isEdit
      ? `http://localhost:4000/candidates/${editFormData._id}`
      : 'http://localhost:4000/candidates';
    const method = isEdit ? 'put' : 'post';

    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      if (key === "resume" && fileList.length > 0) {
        formData.append("resume", fileList[0].originFileObj);
      } else if (typeof values[key] === "object" && values[key] !== null) {
        formData.append(key, JSON.stringify(values[key]));
      } else {
        formData.append(key, values[key]);
      }
    });


    try {
      const response = await axios[method](url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      messageApi.open({ type: 'success', content: response.data.message });
      setTimeout(() => closeForm(false), 1000);
    } catch (error) {
      messageApi.open({ type: 'error', content: error?.response?.data?.message || "An error occurred" });
    }
  };

  useEffect(() => {
    if (editFormData.resume) {
      setResumeUrl(editFormData.resume);
      setFileList([
        {
          uid: "-1",
          name: editFormData.resume.split("/").pop(),
          status: "done",
          url: editFormData.resume,
        },
      ]);
    }
  }, [editFormData]);

  return (
    <div className="CandidateFormWrapper">
      {contextHolder}
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

        {/* Candidate Info */}
        <h2 className="text-md mt-8 mb-4 font-semibold text-cyan-500">
          Candidate Information
        </h2>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="name"
              label="Candidate Name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input placeholder="Full Name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="mobileNo"
              label="Mobile No."
              rules={[
                { required: true, message: "Please enter your mobile number" },
                { pattern: /^[0-9]{10}$/, message: "Enter a valid 10-digit number" },
              ]}
            >
              <Input placeholder="Mobile No" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="email"
              label="Candidate Email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Enter a valid email" },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>
          </Col>
        </Row>

        {/* Location */}
        <h2 className="text-md mb-4 font-semibold text-cyan-500">Location</h2>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item name={["location", "country"]} label="Country">
              <Input placeholder="Country" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name={["location", "state"]} label="State">
              <Input placeholder="State" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name={["location", "city"]} label="City">
              <Input placeholder="City" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name={["location", "zip"]} label="Zip Code">
              <InputNumber placeholder="Zip Code" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        {/* Education */}
        <h2 className="text-md mb-4 font-semibold text-cyan-500">Education</h2>
        <Form.List name="education">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Row key={key} gutter={16} align="middle">
                  <Col xs={24} md={12}>
                    <Form.Item {...restField} name={[name, "collegeName"]} label="College/University">
                      <Input placeholder="College Name" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item {...restField} name={[name, "degree"]} label="Degree">
                      <Input placeholder="Degree" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item {...restField} name={[name, "startDate"]} label="Start Date">
                      <DatePicker style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item {...restField} name={[name, "endDate"]} label="End Date">
                      <DatePicker style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>
                  <Col>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Col>
                </Row>
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
          <Col xs={24} md={12}>
            <Form.Item name={["companyDetails", "currentSalary"]} label="Current Salary">
              <InputNumber placeholder="Current Salary" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name={["companyDetails", "expectedSalary"]} label="Expected Salary">
              <InputNumber placeholder="Expected Salary" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name={["companyDetails", "startDate"]} label="Start Date">
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name={["companyDetails", "endDate"]} label="End Date">
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>


        {/* Past Companies */}
        <h2 className="text-md mb-4 font-semibold text-cyan-500">Past Companies</h2>
        <Form.List name="pastCompanyDetails">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Row key={key} gutter={16} align="middle">
                  <Col xs={24} md={12}>
                    <Form.Item {...restField} name={[name, "pastCompany"]} label="Company">
                      <Input placeholder="Past Company" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item {...restField} name={[name, "designation"]} label="Designation">
                      <Input placeholder="Designation" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item {...restField} name={[name, "product"]} label="Product">
                      <Input placeholder="Product/Service" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item {...restField} name={[name, "experience"]} label="Experience">
                      <InputNumber placeholder="Experience (Years)" style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item {...restField} name={[name, "salary"]} label="Salary">
                      <InputNumber placeholder="Salary" style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>
                  <Col>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Col>
                </Row>
              ))}
              <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                Add Past Company
              </Button>
            </>
          )}
        </Form.List>

        <Row gutter={16}>
          <Col md={12} xs={24}>
            {/* Resume Upload */}
            <h2 className="text-md mt-4 mb-4 font-semibold text-cyan-500">Upload Resume</h2>
            <Form.Item name="resume">
              <Upload.Dragger
                accept=".pdf,.docx"
                beforeUpload={(file) => {
                  if (fileList.length >= 1) {
                    message.warning("You can only upload one file!");
                    return Upload.LIST_IGNORE;
                  }
                  return false;
                }}
                fileList={fileList}
                onChange={({ fileList }) => setFileList(fileList)}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">Only PDF or DOCX files are allowed.</p>
              </Upload.Dragger>
              {resumeUrl && (
                <Button type="link" href={`http://localhost:4000${resumeUrl}`} target="_blank">
                  Preview Resume
                </Button>
              )}
            </Form.Item>
          </Col>
          {/* <Col md={12} xs={24}>
            <h2 className="text-md mt-4 mb-4 font-semibold text-cyan-500">Password*</h2>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
                { min: 6, message: "Password must be at least 6 characters" },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
          </Col> */}
        </Row>

        {/* Submit Button */}
        <Row gutter={16} className="btnRow">
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit Form
            </Button>
          </Form.Item>
        </Row>

      </Form>
    </div>
  );
};

export default CandidateForm;

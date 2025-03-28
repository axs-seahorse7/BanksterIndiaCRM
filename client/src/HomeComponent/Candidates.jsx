import React, { useState, useEffect } from 'react';
import { Table, Drawer, Select, Input, message, Pagination, Card, Avatar, Button, Divider } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import { UserOutlined } from "@ant-design/icons";
import { FilePdfOutlined, PhoneOutlined, MailOutlined, GlobalOutlined } from "@ant-design/icons";

const { Option } = Select;

const Candidates = ({ openForm, EditForm }) => {
  const [candidates, setCandidates] = useState([]);
  const [candidateLength, setCandidateLength] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [candidateDetails, setCandidateDetails] = useState(null);
  const [openProfile, setOpenProfile] = useState(false);

  // ✅ Fetch Candidates
  const fetchCandidates = async () => {
    try {
      setLoading(true);
      const skip = limit * (page - 1);
      const { data } = await axios.get('http://localhost:4000/fetch-candidate', {
        params: { query: debouncedQuery, status: statusFilter, limit, skip }
      });

      setCandidates(data?.candidates || []);
      setCandidateLength(data.totalCandidates);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 1500);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    fetchCandidates();
  }, [page, limit, statusFilter, debouncedQuery]);

  // ✅ Handle Edit
  const handleEdit = (data) => {
    EditForm(true, data);
  };

  // ✅ Handle Delete
  const handleDelete = async (data) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:4000/candidates/${data._id}`);
      messageApi.success("Candidate deleted successfully!");
      fetchCandidates();
    } catch (error) {
      messageApi.error(error.message || "Error deleting candidate");
    } finally {
      setLoading(false);
    }
  };

  const handleView = (data) => {
    setOpenProfile(true);
    setCandidateDetails(data);
  }

  // ✅ Table Columns
  const columns = [
    { title: "SN", dataIndex: "index", key: "index", render: (_, __, i) => (page - 1) * limit + i + 1 },
    { title: "Candidate Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Contact", dataIndex: "mobileNo", key: "mobileNo" },
    { title: "Designation", dataIndex: ["companyDetails", "designation"], key: "designation" },
    { title: "Company", dataIndex: ["companyDetails", "companyName"], key: "company" },
    { title: "Location", dataIndex: ["location", "city"], key: "location" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div className="d-flex gap-3">
          <EditOutlined
            className="text-success fs-5 cursor-pointer"
            onClick={() => handleView(record)}
          />

          <EditOutlined
            className="text-success fs-5 cursor-pointer"
            onClick={() => handleEdit(record)}
          />

          <DeleteOutlined
            className="text-danger fs-5 cursor-pointer"
            onClick={() => handleDelete(record)}
          />
        </div>
      )
    }

  ];

  return (
    <>
      <div className='w-full flex flex-col bg-white shadow-md py-4 rounded'>
        {contextHolder}

        {/* ✅ Header */}
        <div className='flex justify-between items-center w-full px-6'>
          <span className='text-emerald-500 font-semibold'>Manage Candidates</span>
          <button onClick={() => openForm(true)} className='px-3 py-1 bg-cyan-500 text-white rounded-4xl flex items-center gap-2'>
            <i className="ri-add-circle-line"></i> Create New
          </button>
        </div>

        {/* ✅ Filters and Search */}
        <div className='flex justify-between items-center w-full mt-6 px-6'>
          <div className='text-slate-500 flex gap-2'>
            <div>Show</div>
            <select className='border border-slate-300 rounded' value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
              {[10, 25, 50].map(value => <option key={value} value={value}>{value}</option>)}
            </select>
          </div>

          <div className='flex items-center gap-3'>
            {/* ✅ Search Input */}
            <Input
              type="text"
              placeholder="Search Candidate"
              className="border border-slate-300 w-[400px] py-1 px-2 rounded focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* ✅ Status Filter Dropdown */}
            <Select
              mode="multiple"
              placeholder="Filter by Status"
              className="w-100"
              value={statusFilter}
              onChange={setStatusFilter}
              allowClear
              maxTagCount="responsive"
            >
              <Option value="active">Active</Option>
              <Option value="rejected">Rejected</Option>
              <Option value="hold">Hold</Option>
              <Option value="joined">Joined</Option>
            </Select>

          </div>
        </div>

        {/* ✅ Table */}
        <div className='mt-6 px-4'>
          <Table
            columns={columns}
            dataSource={candidates.map((c, i) => ({ ...c, key: i }))}
            loading={loading}
            pagination={false}
          />

          {/* ✅ Pagination */}
          <div className='flex justify-between mt-4 px-6'>
            <span className='text-sm text-gray-500 font-mono'>
              Showing {candidates.length} out of {candidateLength} entries
            </span>
            <Pagination
              current={page}
              pageSize={limit}
              total={candidateLength}
              onChange={setPage}
              showSizeChanger={false}
            />
          </div>
        </div>
        {/* Candidate Drawer */}
        <Drawer
          title="Candidate Profile"
          placement="right"
          width={500}
          onClose={() => setOpenProfile(false)}
          open={openProfile}
        >
          {console.info("candidateDetails", candidateDetails)}
          {candidateDetails ? (
            <div className="flex flex-col gap-4">

              <Card>
                <div className="flex items-center gap-4">
                  <Avatar size={80} icon={<UserOutlined />} />
                  <div className="flex flex-col">
                    <h2 className="text-lg font-semibold text-gray-700 break-words">{candidateDetails.name}</h2>
                    <span className="text-gray-500 break-words">{candidateDetails.companyDetails.designation}</span>
                  </div>
                </div>
              </Card>


              <Card>
                <h3 className="font-semibold text-gray-700">Basic Information</h3>
                <Divider />
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Contact", value: candidateDetails.mobileNo, icon: <PhoneOutlined /> },
                    { label: "Email", value: candidateDetails.email, icon: <MailOutlined /> },
                    { label: "Company", value: candidateDetails.companyDetails.companyName },
                    { label: "Experience", value: `${candidateDetails.companyDetails.experience} years` },
                    { label: "Current Salary", value: `${candidateDetails.companyDetails.currentSalary} LPA` },
                    { label: "Expected Salary", value: `${candidateDetails.companyDetails.expectedSalary} LPA` },
                    { label: "Website", value: candidateDetails.companyDetails.websiteLink, icon: <GlobalOutlined /> },
                  ].map(({ label, value, icon }) => (
                    <div
                      key={label}
                      className="flex items-center gap-2 p-2 border border-gray-300 rounded w-full overflow-hidden break-words"
                    >
                      {icon && <span className="text-gray-600">{icon}</span>}
                      <span className="text-gray-600">{label}:</span>
                      <span className="font-semibold truncate max-w-full">{value}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <h3 className="font-semibold text-gray-700">Location</h3>
                <Divider />
                <p className="break-words"><strong>City:</strong> {candidateDetails.location.city}, {candidateDetails.location.state}</p>
                <p className="break-words"><strong>Country:</strong> {candidateDetails.location.country}</p>
                <p className="break-words"><strong>ZIP Code:</strong> {candidateDetails.location.zip}</p>
              </Card>

              {candidateDetails.education.length > 0 && (
                <Card>
                  <h3 className="font-semibold text-gray-700">Education</h3>
                  <Divider />
                  {candidateDetails.education.map((edu) => (
                    <div key={edu._id} className="p-2 border border-gray-300 rounded mb-2 overflow-hidden break-words">
                      <p><strong>College:</strong> {edu.collegeName}</p>
                      <p><strong>Degree:</strong> {edu.degree}</p>
                      <p><strong>Duration:</strong> {new Date(edu.startDate).toLocaleDateString()} - {new Date(edu.endDate).toLocaleDateString()}</p>
                    </div>
                  ))}
                </Card>
              )}

              {candidateDetails.resume && (
                <Card>
                  <h3 className="font-semibold text-gray-700">Resume</h3>
                  <Divider />
                  <div className="flex items-center gap-3 w-full overflow-hidden">
                    <FilePdfOutlined className="text-red-500 text-2xl" />
                    <a
                      href={`http://localhost:4000${candidateDetails.resume}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline truncate max-w-full"
                    >
                      View Resume
                    </a>
                    <Button type="primary" size="small" onClick={() => window.open(candidateDetails.resume, "_blank")}>
                      Download
                    </Button>
                  </div>
                </Card>
              )}
            </div>
          ) : (
            <p>Loading candidate details...</p>
          )}
        </Drawer>
      </div>
    </>
  );
};

export default Candidates;

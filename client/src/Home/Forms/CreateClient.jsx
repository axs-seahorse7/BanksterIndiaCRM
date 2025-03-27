import { useState } from "react";
import axios from 'axios'
import { useMessage } from "../../../Global/messageContext";

const ClientForm = ({closeForm}) => {
  const url = import.meta.env.VIT_API_URI
  const message = useMessage()
  const initialData = {
    clientName: "",
    mobileNo: "",
    websiteLink: "",
    industry: "",
    source: "",
    about: "",
    billingAddress: {
      country: "",
      state: "",
      city: "",
      zip: "",
      street: "",
    },
    shipAddress: {
      country: "",
      state: "",
      city: "",
      zip: "",
      street: "",
    },
    files: [],
  }
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNestedChange = (e, type) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [name]: value,
      },
    }));
  };

  const handleFileUpload = (e) => {
    const filesArray = Array.from(e.target.files).map((file) => ({
    document: file.name,
    }));

    setFormData((prev) => ({
      ...prev,
      files: filesArray,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {  
    const response = await axios.post('http://localhost:4000/api/create-client', formData, {
    headers:{"Content-Type": "application/json"} 
    })
    message.success(response.data.message)
    } catch (error) {
    message.warning(error.response.data.message)
    }finally{
    setFormData(initialData)
    }

  };


  return (
    <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-white w-full ">
        <div>
            <button type="button" onClick={()=>{closeForm(false)}} className="px-4 py-1 cursor-pointer rounded-2xl hover:bg-gray-300"><i className="ri-arrow-left-line"></i></button>
        </div>
      <h2 className="text-md text-cyan-400 mt-4 mb-8 font-semibold ">Client Information</h2>
    <div className="flex flex-wrap gap-4">
        <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> Client Name</label>
            <input name="clientName" value={formData.clientName} onChange={handleChange} placeholder="Client Name" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />
        </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> Contact</label>
            <input name="mobileNo" value={formData.mobileNo} onChange={handleChange} placeholder="Mobile No" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />
            </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600">Websilte</label>
            <input name="websiteLink" value={formData.websiteLink} onChange={handleChange} placeholder="Website Link" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />
            </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> Industry</label>
            <input name="industry" value={formData.industry} onChange={handleChange} placeholder="Industry" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />
            </div>
    <div className="flex flex-col gap-2">
        <label htmlFor="" className="text-sm text-gray-600">Source </label>
        <input name="source" value={formData.source} onChange={handleChange} placeholder="Source" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />
        </div>
    <div className="flex flex-col gap-2">
        <label htmlFor="" className="text-sm text-gray-600">About  </label>
        <textarea name="about" value={formData.about} onChange={handleChange} placeholder="About" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]"></textarea>
        </div>

    </div>
      {/* Basic Information */}

      {/* Billing Address */}
      <h2 className="text-md text-cyan-500 mt-4 mb-8 font-semibold ">Billing Address</h2>
      <div className="flex flex-wrap gap-4">
      <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> Country</label>
            <input name="country" value={formData.billingAddress.country} onChange={(e) => handleNestedChange(e, "billingAddress")} placeholder="Country" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />
            </div>
      <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> State</label>
            <input name="state" value={formData.billingAddress.state} onChange={(e) => handleNestedChange(e, "billingAddress")} placeholder="State" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />
            </div>
      <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> City</label>
            <input name="city" value={formData.billingAddress.city} onChange={(e) => handleNestedChange(e, "billingAddress")} placeholder="City" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />
            </div>
      <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> Zip Code</label>
            <input name="zip" type="number" value={formData.billingAddress.zip} onChange={(e) => handleNestedChange(e, "billingAddress")} placeholder="Zip Code" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />
            </div>
      <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> Street</label>
            <input name="street" value={formData.billingAddress.street} onChange={(e) => handleNestedChange(e, "billingAddress")} placeholder="Street" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />
            </div>

      </div>

      {/* Shipping Address */}
      <h3 className="font-semibold mt-12 mb-8 text-cyan-500 text-md ">Shipping Address</h3>
      <div className="flex flex-wrap gap-4">
      <input name="country" value={formData.shipAddress.country} onChange={(e) => handleNestedChange(e, "shipAddress")} placeholder="Country" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />
      <input name="state" value={formData.shipAddress.state} onChange={(e) => handleNestedChange(e, "shipAddress")} placeholder="State" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />
      <input name="city" value={formData.shipAddress.city} onChange={(e) => handleNestedChange(e, "shipAddress")} placeholder="City" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />
      <input name="zip" type="number" value={formData.shipAddress.zip} onChange={(e) => handleNestedChange(e, "shipAddress")} placeholder="Zip Code" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />
      <input name="street" value={formData.shipAddress.street} onChange={(e) => handleNestedChange(e, "shipAddress")} placeholder="Street" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />

      </div>

      {/* File Upload */}
      <h3 className="text-md text-cyan-500 mt-12 mb-4 font-semibold ">Upload Documents</h3>
      <input type="file" multiple onChange={handleFileUpload} className="input-field border border-gray-300 rounded px-2 py-1" />
      <button type="submit" className="btn-primary mt-4 mb-6 bg-blue-700 text-sm rounded px-4 py-1.5 ml-4 text-white"><i className="ri-save-2-line"></i> Submit</button>
    </form>
  );
};

export default ClientForm;

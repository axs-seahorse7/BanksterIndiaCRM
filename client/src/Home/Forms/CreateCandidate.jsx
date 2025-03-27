import { useState } from "react";
import axios from 'axios'
import { useMessage } from "../../../Global/messageContext";

const CandidateForm = ({closeForm}) => {
  const message = useMessage()

  const initialData = {
    name: "",
    mobileNo: "",
    email: "",
    location: {
      country: "",
      state: "",
      city: "",
      zip: "",
    },
    education: [
      {
        collegeName: "",
        degree: "",
        startDate: "",
        endDate: "",
      },
    ],
    companyDetails: {
      companyName: "",
      designation: "",
      product: "",
      websiteLink: "",
      experience: "",
      currentSalary: "",
      expectedSalary: "",
      startDate: "",
      endDate: "",
    },
    pastCompanyDetails: [
      {
        pastCompany: "",
        designation: "",
        product: "",
        experience: "",
        salary: "",
      },
    ],
    resume: "",
  }
  
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNestedChange = (e, parent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [name]: value,
      },
    }));
  };

  const handleArrayChange = (e, index, arrayName) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedArray = [...prev[arrayName]];
      updatedArray[index] = { ...updatedArray[index], [name]: value };
      return { ...prev, [arrayName]: updatedArray };
    });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    try {
      const response = await axios.post('http://localhost:4000/candidates', formData, {
        headers:{"Content-Type": "application/json"}
      })
      message.success(response.data.message)
      setFormData(initialData)
    } catch (error) {
      message.warning(error.response.data.message)
    }

  };

  return (
    <form onSubmit={handleSubmit} className="p-4 rounded-lg bg-white shadow">
        <div>
            <button type="button" onClick={()=>{closeForm(false)}} className="px-4 py-1 cursor-pointer rounded-2xl hover:bg-gray-300"><i className="ri-arrow-left-line"></i></button>
        </div>

      <h2 className="text-md mt-8 mb-4 font-semibold  text-cyan-500">Candidate Information</h2>
    <div className="flex flex-wrap gap-4">

        <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> Candidate Name</label>
            <input required name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />
        </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> Mobile No.</label>
            <input required name="mobileNo" value={formData.mobileNo} onChange={handleChange} placeholder="Mobile No" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />
        </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> Candidate Email</label>
            <input required name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />
        </div>
       

        </div>
      {/* Basic Details */}

      {/* Location Details */}
      <h2 className="text-md mt-8 mb-4 font-semibold  text-cyan-500">Location</h2>
      <div className="flex flex-wrap gap-4">

      <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> State </label>
            <input required name="state" value={formData.location.state} onChange={(e) => handleNestedChange(e, "location")} placeholder="State" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />
            </div>
      <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> City</label>
            <input required name="city" value={formData.location.city} onChange={(e) => handleNestedChange(e, "location")} placeholder="City" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />
            </div>
      <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> Zip code</label>
            <input required name="zip" type="number" value={formData.location.zip} onChange={(e) => handleNestedChange(e, "location")} placeholder="Zip Code" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />
            </div>
      <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> Country</label>
            <input required name="country" value={formData.location.country} onChange={(e) => handleNestedChange(e, "location")} placeholder="Country" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />
            </div>

      </div>


      {/* Education */}
      <h2 className="text-md mt-8 mb-4 font-semibold  text-cyan-500">Education</h2>
      {formData.education.map((edu, index) => (
      <div className="flex flex-wrap gap-4">

        <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> College/University</label>
            <input required name="collegeName" value={edu.collegeName} onChange={(e) => handleArrayChange(e, index, "education")} placeholder="College Name" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px] " />
            </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> Degree/education</label>
            <input required name="degree" value={edu.degree} onChange={(e) => handleArrayChange(e, index, "education")} placeholder="Degree" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />
            </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> Start Date</label>
            <input required type="date" name="startDate" value={edu.startDate} onChange={(e) => handleArrayChange(e, index, "education")} className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />
            </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> End Date</label>
            <input required type="date" name="endDate" value={edu.endDate} onChange={(e) => handleArrayChange(e, index, "education")} className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />
            </div>
        </div>
      ))}
      <button type="button" onClick={addEducation} className="btn-secondary px-4 rounded bg-cyan-500 text-white mt-4 py-2">+ Add Education</button>

      {/* Company Details */}
      <h2 className="text-md mt-8 mb-4 font-semibold  text-cyan-500">Company Details</h2>

      <div className="flex flex-wrap gap-4">

      <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> Company Name</label>
            <input required name="companyName" value={formData.companyDetails.companyName} onChange={(e) => handleNestedChange(e, "companyDetails")} placeholder="Company Name" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />
            </div>
      <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> Designation</label>
            <input required name="designation" value={formData.companyDetails.designation} onChange={(e) => handleNestedChange(e, "companyDetails")} placeholder="Designation" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />
            </div>
      <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> Product</label>
            <input required name="product" value={formData.companyDetails.product} onChange={(e) => handleNestedChange(e, "companyDetails")} placeholder="Product" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />
            </div>
      <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> Website Link</label>
            <input required name="websiteLink" value={formData.companyDetails.websiteLink} onChange={(e) => handleNestedChange(e, "companyDetails")} placeholder="Website Link" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />
            </div>
      <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> Experience in Year </label>
            <input required name="experience" type="number" value={formData.companyDetails.experience} onChange={(e) => handleNestedChange(e, "companyDetails")} placeholder="Experience (Years)" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />
            </div>
      
      <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> Current Salary</label>
            <input required name="currentSalary" type="number" value={formData.companyDetails.currentSalary} onChange={(e) => handleNestedChange(e, "companyDetails")} placeholder="Current Salary" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />
      </div>

        <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> Expected Salary</label>
            <input required name="expectedSalary" type="number" value={formData.companyDetails.expectedSalary} onChange={(e) => handleNestedChange(e, "companyDetails")} placeholder="Expected Salary" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />
        </div>

        <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> Start Date</label>
            <input required type="date" name="startDate" value={formData.companyDetails.startDate} onChange={(e) => handleNestedChange(e,  "companyDetails")} className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />
          </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> End Date</label>
            <input required type="date" name="endDate" value={formData.companyDetails.endDate} onChange={(e) => handleNestedChange(e,  "companyDetails")} className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />
          </div>

      </div>


      {/* Past Company Details */}
      <h2 className="text-md mt-8 mb-4 font-semibold  text-cyan-500"> Previous Company Details</h2>
      {formData.pastCompanyDetails.map((past, index) => (
      <div className="flex flex-wrap gap-4">

        <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> Prevous Company</label>
            <input required name="pastCompany" value={past.pastCompany} onChange={(e) => handleArrayChange(e, index, "pastCompanyDetails")} placeholder="Past Company Name" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />
            </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> Designation</label>
            <input required name="designation" value={past.designation} onChange={(e) => handleArrayChange(e, index, "pastCompanyDetails")} placeholder="Designation" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]"/>
            </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> Product</label>
            <input required name="product" value={past.product} onChange={(e) => handleArrayChange(e, index, "pastCompanyDetails")} placeholder="Product" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />
            </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> Experience</label>
            <input required name="experience" type="number" value={past.experience} onChange={(e) => handleArrayChange(e, index, "pastCompanyDetails")} placeholder="Experience (Years)" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />
            </div>

        <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> Salary</label>
            <input required name="salary" type="number" value={past.salary} onChange={(e) => handleArrayChange(e, index, "pastCompanyDetails")} placeholder="slary (lac) " className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />
            </div>
       


        </div>
      ))}
      <button type="button" onClick={addPastCompany} className="btn-secondary px-4 rounded bg-cyan-500 text-white mt-4 py-2"> + Add Past Company</button>

      {/* Resume Upload */}
      <h3 className="text-md text-cyan-500 mb-4 mt-8">Upload Resume</h3>

      <div className="flex justify-between pr-18 mb-8">
      <input type="file" onChange={(e) => setFormData({ ...formData, resume: e.target.files[0].name })} className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />
      <div className="flex gap-4">
      <button type="submit" className="btn-secondary px-4 rounded bg-blue-500 text-white mt-4 py-2 ml-4">Create Candidate</button>
      <button type="button" onClick={()=> setFormData(initialData)} className="btn-secondary px-4 rounded bg-orange-500 text-white mt-4 py-2 ml-4"><i className="ri-reset-left-line"></i> Reset</button>
      </div>

      </div>
    </form>
  );
};

export default CandidateForm;

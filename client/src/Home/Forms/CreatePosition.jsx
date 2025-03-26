import { useState } from "react";

const PositionForm = ({closeForm}) => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    totalVacancies: "",
    mobileNo: "",
    location: {
      country: "",
      state: "",
      city: "",
      zip: "",
    },
    publishDate: "",
    validDate: "",
    industry: "",
    jobType: "",
    maxExperience: "",
    minSalary: "",
    maxSalary: "",
    description: "",
    requireDiscription: "",
    files: "",
    jobOpenStatus: {
      hold: false,
      progress: false,
      waiting: false,
    },
  });

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

  const handleStatusChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      jobOpenStatus: {
        ...prev.jobOpenStatus,
        [name]: checked,
      },
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      files: e.target.files[0].name,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded">
         <div>
            <button type="button" onClick={()=>{closeForm(false)}} className="px-4 py-1 cursor-pointer rounded-2xl hover:bg-gray-300"><i className="ri-arrow-left-line"></i></button>
        </div>

      <h2 className="text-md text-cyan-500 mt-4 font-semibold mb-4">Job Posting</h2>

      <div className="flex gap-6 flex-wrap">
      <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> Job title </label>
            <input name="jobTitle" value={formData.jobTitle} onChange={handleChange} placeholder="Job Title" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[300px]" />
            </div>
      <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> Total Vacancy </label>
            <input type="number" name="totalVacancies" value={formData.totalVacancies} onChange={handleChange} placeholder="Total Vacancies" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[300px]" />
            </div>
      <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> Contact No </label>
            <input type="number" name="mobileNo" value={formData.mobileNo} onChange={handleChange} placeholder="Mobile No" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[300px]" />
            </div>

    </div>

      {/* Location Details */}
      <h2 className="text-md text-cyan-500 mt-8 font-semibold mb-4">Location</h2>
      <div className="flex gap-6 flex-wrap">

      <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> Country </label>
            <input name="country" value={formData.location.country} onChange={(e) => handleNestedChange(e, "location")} placeholder="Country" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[300px]" />
            </div>
      <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> State </label>
            <input name="state" value={formData.location.state} onChange={(e) => handleNestedChange(e, "location")} placeholder="State" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[300px]" />
            </div>
      <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> City</label>
            <input name="city" value={formData.location.city} onChange={(e) => handleNestedChange(e, "location")} placeholder="City" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[300px]" />
            </div>
      <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> Zip code </label>
            <input type="number" name="zip" value={formData.location.zip} onChange={(e) => handleNestedChange(e, "location")} placeholder="Zip Code" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[300px]" />
            </div>

      </div>

      {/* Job Details */}
      <h2 className="text-md text-cyan-500 mt-4 font-semibold mb-4">Job Details</h2>
      <div className="flex gap-6 flex-wrap">
      <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> Industry </label>
            <input name="industry" value={formData.industry} onChange={handleChange} placeholder="Industry" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[300px]" />
            </div>
      <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> Job type</label>
            <input name="jobType" value={formData.jobType} onChange={handleChange} placeholder="Job Type" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[300px]" />
            </div>
      <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> Experience</label>
            <input type="number" name="maxExperience" value={formData.maxExperience} onChange={handleChange} placeholder="Max Experience (Years)" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[300px]"/>
            </div>
      <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> Min Salary</label>
            <input type="number" name="minSalary" value={formData.minSalary} onChange={handleChange} placeholder="Min Salary" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[300px]" />
            </div>
      <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> Max salary </label>
            <input type="number" name="maxSalary" value={formData.maxSalary} onChange={handleChange} placeholder="Max Salary" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[300px]" />
            </div>
      <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> Job Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Job Description" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[300px] h-8"></textarea>
            </div>
      <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> Requirement</label>
            <textarea name="requireDiscription" value={formData.requireDiscription} onChange={handleChange} placeholder="Requirements" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[300px] h-8 "></textarea>
            </div>
      <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> Start Date</label>
            <input type="date" name="publishDate" value={formData.publishDate} onChange={handleChange} className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[300px]" />
            </div>
      <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> End Date</label>
            <input type="date" name="validDate" value={formData.validDate} onChange={handleChange} className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[300px]" />
            </div>
      


      </div>

      {/* File Upload */}
      <h2 className="text-md text-cyan-500 mt-4 font-semibold mb-4">Upload Documents</h2>
      <input type="file" onChange={handleFileChange} className="input-field" />

      <button type="submit" className="btn-primary mt-4">Submit</button>
    </form>
  );
};

export default PositionForm;

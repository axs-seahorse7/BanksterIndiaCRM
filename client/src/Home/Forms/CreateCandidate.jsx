import { useState } from "react";

const CandidateForm = ({closeForm}) => {
  const [formData, setFormData] = useState({
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
        collageName: "",
        degree: "",
        statrDate: "",
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
      statrDate: "",
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
    password: "",
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
      education: [...prev.education, { collageName: "", degree: "", statrDate: "", endDate: "" }],
    }));
  };

  const addPastCompany = () => {
    setFormData((prev) => ({
      ...prev,
      pastCompanyDetails: [...prev.pastCompanyDetails, { pastCompany: "", designation: "", product: "", experience: "", salary: "" }],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
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

      <h2 className="text-md mt-8 mb-4 font-semibold  text-cyan-500">Candidate Information</h2>
    <div className="flex flex-wrap gap-4">

        <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> Candidate Name</label>
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />
        </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> Mobile No.</label>
            <input name="mobileNo" value={formData.mobileNo} onChange={handleChange} placeholder="Mobile No" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />
        </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> Candidate Email</label>
            <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />
        </div>
       

        </div>
      {/* Basic Details */}

      {/* Location Details */}
      <h2 className="text-md mt-8 mb-4 font-semibold  text-cyan-500">Location</h2>
      <div className="flex flex-wrap gap-4">

      <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> State </label>
            <input name="state" value={formData.location.state} onChange={(e) => handleNestedChange(e, "location")} placeholder="State" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />
            </div>
      <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> City</label>
            <input name="city" value={formData.location.city} onChange={(e) => handleNestedChange(e, "location")} placeholder="City" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />
            </div>
      <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> Zip code</label>
            <input name="zip" type="number" value={formData.location.zip} onChange={(e) => handleNestedChange(e, "location")} placeholder="Zip Code" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />
            </div>
      <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> Country</label>
            <input name="country" value={formData.location.country} onChange={(e) => handleNestedChange(e, "location")} placeholder="Country" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />
            </div>

      </div>


      {/* Education */}
      <h2 className="text-md mt-8 mb-4 font-semibold  text-cyan-500">Education</h2>
      {formData.education.map((edu, index) => (
      <div className="flex flex-wrap gap-4">

        <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> College/University</label>
            <input name="collageName" value={edu.collageName} onChange={(e) => handleArrayChange(e, index, "education")} placeholder="College Name" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px] " />
            </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> Degree/education</label>
            <input name="degree" value={edu.degree} onChange={(e) => handleArrayChange(e, index, "education")} placeholder="Degree" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />
            </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> Start Date</label>
            <input type="date" name="statrDate" value={edu.statrDate} onChange={(e) => handleArrayChange(e, index, "education")} className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />
            </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> End Date</label>
            <input type="date" name="endDate" value={edu.endDate} onChange={(e) => handleArrayChange(e, index, "education")} className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />
            </div>
        </div>
      ))}
      <button type="button" onClick={addEducation} className="btn-secondary px-4 rounded bg-cyan-500 text-white mt-4 py-2">+ Add Education</button>

      {/* Company Details */}
      <h2 className="text-md mt-8 mb-4 font-semibold  text-cyan-500">Company Details</h2>

      <div className="flex flex-wrap gap-4">

      <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> Company Name</label>
            <input name="companyName" value={formData.companyDetails.companyName} onChange={(e) => handleNestedChange(e, "companyDetails")} placeholder="Company Name" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />
            </div>
      <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> Designation</label>
            <input name="designation" value={formData.companyDetails.designation} onChange={(e) => handleNestedChange(e, "companyDetails")} placeholder="Designation" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />
            </div>
      <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> Product</label>
            <input name="product" value={formData.companyDetails.product} onChange={(e) => handleNestedChange(e, "companyDetails")} placeholder="Product" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />
            </div>
      <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> Website Link</label>
            <input name="websiteLink" value={formData.companyDetails.websiteLink} onChange={(e) => handleNestedChange(e, "companyDetails")} placeholder="Website Link" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />
            </div>
      <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> Experience in Year </label>
            <input name="experience" type="number" value={formData.companyDetails.experience} onChange={(e) => handleNestedChange(e, "companyDetails")} placeholder="Experience (Years)" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />
            </div>
      
      <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> Current Salary</label>
            <input name="currentSalary" type="number" value={formData.companyDetails.currentSalary} onChange={(e) => handleNestedChange(e, "companyDetails")} placeholder="Current Salary" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />
            </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> Expected Salary</label>
            <input name="expectedSalary" type="number" value={formData.companyDetails.expectedSalary} onChange={(e) => handleNestedChange(e, "companyDetails")} placeholder="Expected Salary" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />
        </div>

      </div>


      {/* Past Company Details */}
      <h2 className="text-md mt-8 mb-4 font-semibold  text-cyan-500">Company Details</h2>
      {formData.pastCompanyDetails.map((past, index) => (
      <div className="flex flex-wrap gap-4">

        <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> Prevous Company</label>
            <input name="pastCompany" value={past.pastCompany} onChange={(e) => handleArrayChange(e, index, "pastCompanyDetails")} placeholder="Past Company Name" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />
            </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> Designation</label>
            <input name="designation" value={past.designation} onChange={(e) => handleArrayChange(e, index, "pastCompanyDetails")} placeholder="Designation" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]"/>
            </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> Product</label>
            <input name="product" value={past.product} onChange={(e) => handleArrayChange(e, index, "pastCompanyDetails")} placeholder="Product" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />
            </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600"> Experience</label>
            <input name="experience" type="number" value={past.experience} onChange={(e) => handleArrayChange(e, index, "pastCompanyDetails")} placeholder="Experience (Years)" className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />
            </div>
       


        </div>
      ))}
      <button type="button" onClick={addPastCompany} className="btn-secondary px-4 rounded bg-cyan-500 text-white mt-4 py-2"> + Add Past Company</button>

      {/* Resume Upload */}
      <h3 className="text-md text-cyan-500 mb-4 mt-8">Upload Resume</h3>

      <div className="flex justify-between pr-18 mb-8">
      <input type="file" onChange={(e) => setFormData({ ...formData, resume: e.target.files[0].name })} className="input-field py-1 border border-slate-300 focus:outline-none px-2 rounded bg-white w-[500px]" />

      <button type="submit" className="btn-secondary px-4 rounded bg-blue-500 text-white mt-4 py-2 ml-4">Submit</button>

      </div>
    </form>
  );
};

export default CandidateForm;

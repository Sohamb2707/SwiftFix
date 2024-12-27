import React, { useState } from 'react';
import homeservices from '../assets/apply-to-work-1.png';
import { reasonsToChoose } from '../constants';
import '../index.css';
import { useNavigate } from 'react-router-dom';
const ApplyToWork1 = () => {
  const [formData, setFormData] = useState({
    Name: '',
    dateOfBirth: '',
    gender: '',
    email: '',
    phoneNumber: '',
    address: '',
    pcc: null,
    image: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:8080/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Application submitted successfully!');
        navigateTo('ApplyToWork2');
      } else {
        const data = await response.json();
        alert(data.message || 'Error submitting application.');
      }
    } catch (error) {
      alert('Error submitting application.');
    }
  };

    // Handler for file inputs (resume, PCC, image)
    const handleFileChange = (e) => {
      const { name, files } = e.target;
      setFormData({ ...formData, [name]: files[0] }); // Store the selected file
    };

    const backFunction = () => {
      navigate('/about-us'); // Use navigate to go to ApplyToWork1 page
    };

  return (
    <div className='min-w-full min-h-[200vh] flex flex-col justify-between items-center relative space-y-10 py-10'>
      <div className="w-[80%] text-center bg-gray-100 p-8 rounded-lg shadow-md mb-6">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">Why Join SwiftFix?</h1>
        <p className="text-lg text-gray-700">
          At SwiftFix, we empower professionals like you by providing flexible work opportunities, competitive pay, and the ability to work on your own terms. Join our growing network and be part of a team that values quality service and professionalism!
        </p>
      </div>

      <div className="bg-gray-100 p-8 rounded-lg shadow-md w-[80%]">
        <h2 className='text-3xl font-bold mb-6'>Apply Now</h2>
        <form className='space-y-4' onSubmit={handleSubmit}>
          <div className='flex flex-col'>
            <label className='text-lg font-semibold'>First Name</label>
            <input type="text" name="firstName" value={formData.Name} onChange={handleChange} placeholder="Enter your full name" className='p-2 rounded-lg border border-gray-300' required />
          </div>
          <div className='flex flex-col'>
            <label className='text-lg font-semibold'>Date of Birth</label>
            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className='p-2 rounded-lg border border-gray-300' required />
          </div>
          <div className='flex flex-col'>
            <label className='text-lg font-semibold'>Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange} className='p-2 rounded-lg border border-gray-300' required>
              <option value="" disabled>Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className='flex flex-col'>
            <label className='text-lg font-semibold'>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" className='p-2 rounded-lg border border-gray-300' required />
          </div>
          <div className='flex flex-col'>
            <label className='text-lg font-semibold'>Phone Number</label>
            <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Enter your phone number" className='p-2 rounded-lg border border-gray-300' required />
          </div>
          <div className='flex flex-col'>
            <label className='text-lg font-semibold'>Address</label>
            <textarea name="address" value={formData.address} onChange={handleChange} placeholder="Enter your address" className='p-2 rounded-lg border border-gray-300' required />
          </div>
            {/* PCC Upload */}
        <div className="mb-4">
          <label htmlFor="pcc" className="block text-sm font-medium text-gray-700">Upload PCC (PDF)</label>
          <input
            type="file"
            id="pcc"
            name="pcc"
            accept=".pdf"
            onChange={handleFileChange}
            required
            className="mt-2"
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Upload Your Image (JPG/PNG)</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            required
            className="mt-2"
          />
        </div>

          <div className='flex justify-center items-center space-x-5'>
            <button type="button" onClick={backFunction} className='bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-all duration-300'>Back</button>
            <button type="submit" className='bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-all duration-300'>Proceed</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyToWork1;

// import React, { useState } from 'react';

// const ApplyToWork1 = () => {
//   // State to store form data
//   const [formData, setFormData] = useState({
//     fullName: '',
//     service: '',
//     description: '',
//     resume: null,
//     pcc: null,
//     image: null,
//   });

//   // Handler for text inputs
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Handler for file inputs (resume, PCC, image)
//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     setFormData({ ...formData, [name]: files[0] }); // Store the selected file
//   };

//   // Form submission handler
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Here you can process the form data, send to backend, etc.
//     console.log('Form data submitted:', formData);
    
//     // You can upload files and other data to the server if needed
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold text-center mb-6">Apply to Work</h2>
//       <form onSubmit={handleSubmit}>
        
//         {/* Full Name Input */}
//         <div className="mb-4">
//           <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
//           <input
//             type="text"
//             id="fullName"
//             name="fullName"
//             value={formData.fullName}
//             onChange={handleInputChange}
//             required
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//           />
//         </div>

//         {/* Service Input */}
//         <div className="mb-4">
//           <label htmlFor="service" className="block text-sm font-medium text-gray-700">Service You Provide</label>
//           <input
//             type="text"
//             id="service"
//             name="service"
//             value={formData.service}
//             onChange={handleInputChange}
//             required
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//           />
//         </div>

//         {/* Short Description */}
//         <div className="mb-4">
//           <label htmlFor="description" className="block text-sm font-medium text-gray-700">A Short Description of Yourself</label>
//           <textarea
//             id="description"
//             name="description"
//             value={formData.description}
//             onChange={handleInputChange}
//             required
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//           />
//         </div>

//         {/* Resume Upload */}
//         <div className="mb-4">
//           <label htmlFor="resume" className="block text-sm font-medium text-gray-700">Upload Your Resume (PDF)</label>
//           <input
//             type="file"
//             id="resume"
//             name="resume"
//             accept=".pdf"
//             onChange={handleFileChange}
//             required
//             className="mt-2"
//           />
//         </div>

//         {/* PCC Upload */}
//         <div className="mb-4">
//           <label htmlFor="pcc" className="block text-sm font-medium text-gray-700">Upload PCC (PDF)</label>
//           <input
//             type="file"
//             id="pcc"
//             name="pcc"
//             accept=".pdf"
//             onChange={handleFileChange}
//             required
//             className="mt-2"
//           />
//         </div>

//         {/* Image Upload */}
//         <div className="mb-4">
//           <label htmlFor="image" className="block text-sm font-medium text-gray-700">Upload Your Image (JPG/PNG)</label>
//           <input
//             type="file"
//             id="image"
//             name="image"
//             accept="image/*"
//             onChange={handleFileChange}
//             required
//             className="mt-2"
//           />
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
//         >
//           Submit Application
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ApplyToWork1;

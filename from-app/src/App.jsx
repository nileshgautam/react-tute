import React, { useState } from 'react';
import './App.css';

function App() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    bio: '',
    agreeToTerms: false

  });

  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    if (name === 'email') {
      if (value && !validateEmail(value)) {
        setErrors(prevErrors => ({
          ...prevErrors,
          email: "Please enter a valid email address"
        }))

      } else {
        setErrors(prevErrors => {
          const newErrors = { ...prevErrors };
          delete newErrors.email;
          return newErrors;
        });
      }
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;

    setFormData(prevState => ({
      ...prevState,
      [name]: checked
    }));

  };

  const validateForm = () => {

    const newErrors = {};

    // Name Validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is Required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Name is Required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.country) {
      newErrors.country = "Please select a country";
    }

    if (formData.bio.length > 500) {
      newErrors.bio = "Bio must le less than 500 characters";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    return newErrors;

  }

  const handelSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setErrors({});
    console.log("Form submitted data successfully", formData);
    alert('Form submitted data successfully');
    resetFrom();

  }

  const resetFrom = () => {
    setFormData({
      name: '',
      email: '',
      country: '',
      bio: '',
      agreeToTerms: false
    });
    setErrors({});
  }

  return (
    <div className='App'>
      <h1>Personal Info Form</h1>

      <form onSubmit={handelSubmit}>

        <div>
          <label htmlFor="name">Name</label>
          <input type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={errors.name ? "error" : ''}

          />
          {errors.name && <span className='error-message'>{errors.name}</span>}

        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={errors.email ? "error" : ''}
          />
          {errors.email && <span className='error-message'>{errors.email}</span>}
        </div>

        <div>
          <label htmlFor="country">Country</label>
          <select
            name="country"
            id="country"
            value={formData.country}
            onChange={handleInputChange}
            className={errors.country ? "error" : ''}
          >
            <option value="">Select Country</option>
            <option value="Australia">Australia</option>
            <option value="Brazil">Brazil</option>
            <option value="Canada">Canada</option>
            <option value="China">China</option>
            <option value="Denmark">Denmark</option>
            <option value="Egypt">Egypt</option>
            <option value="France">France</option>
            <option value="Germany">Germany</option>
            <option value="India">India</option>
            <option value="Indonesia">Indonesia</option>
            <option value="Ireland">Ireland</option>
            <option value="Italy">Italy</option>
            <option value="Japan">Japan</option>
            <option value="Malaysia">Malaysia</option>
            <option value="Mexico">Mexico</option>
            <option value="Netherlands">Netherlands</option>
            <option value="New Zealand">New Zealand</option>
            <option value="Nigeria">Nigeria</option>
            <option value="Norway">Norway</option>
            <option value="Pakistan">Pakistan</option>
            <option value="Philippines">Philippines</option>
            <option value="Russia">Russia</option>
            <option value="Saudi Arabia">Saudi Arabia</option>
            <option value="Singapore">Singapore</option>
            <option value="South Africa">South Africa</option>
            <option value="South Korea">South Korea</option>
            <option value="Spain">Spain</option>
            <option value="Sweden">Sweden</option>
            <option value="United Arab Emirates">United Arab Emirates</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="United States">United States</option>
          </select>
          {errors.country && <span className='error-message'>{errors.country}</span>}

        </div>


        <div>
          <label htmlFor="bio">Tell us about yourself:</label>
          <textarea name="bio" id="bio"
            value={formData.bio}
            onChange={handleInputChange}
            rows={4}
            placeholder='Share a brief bio apbout yourself...'
            className={errors.bio ? "error" : ''}

          ></textarea>
          <small className={`character-count ${formData.bio > 450 ? 'waring' : ''}`}>{formData.bio.length}/500 characters</small>
          {errors.bio && <span className='error-message'>{errors.bio}</span>}

        </div>

        <div>
          <label className='checkbox-label'>
            <input type="checkbox"
              name='agreeToTerms'
              checked={formData.agreeToTerms}
              onChange={handleCheckboxChange}
            />
            I agree to the terms and conditions
          </label>
          {errors.agreeToTerms && <span className='error-message'>{errors.agreeToTerms}</span>}

        </div>

        <button type="submit">Submit Form</button>



      </form>
    </div>
  )
}

export default App;
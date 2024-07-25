import React, { useState } from 'react';
import axios from 'axios';
import './WorkoutForm.css';
import Button from '../Button/Button';
import TextField from '../TextField/TextField';
import TimeSlot from '../TimeSlot/TimeSlot';
import Calendar from '../Calendar/Calendar';
import DeleteIcon from '../DeleteIcon/DeleteIcon';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const WorkoutForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: 8,
    photo: null as File | null,
    date: '',
    time: '',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    photo: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, photo: e.target.files[0] });
      setErrors({ ...errors, photo: '' });
    }
  };

  const handleDateChange = (date: string) => {
    setFormData({ ...formData, date, time: '' });
  };

  const handleRemoveFile = () => {
    setFormData({ ...formData, photo: null });
  };

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'firstName':
        setErrors({
          ...errors,
          firstName: value ? '' : 'Please enter your first name',
        });
        break;
      case 'lastName':
        setErrors({
          ...errors,
          lastName: value ? '' : 'Please enter your last name',
        });
        break;
      case 'email':
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setErrors({
          ...errors,
          email: emailPattern.test(value) ? '' : 'Please use correct formatting. Example: address@email.com',
        });
        break;
      default:
        break;
    }
  };

  const validateForm = () => {
    validateField('firstName', formData.firstName);
    validateField('lastName', formData.lastName);
    validateField('email', formData.email);

    if (!formData.photo) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        photo: 'Please upload a photo',
      }));
    }

    return (
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.photo &&
      !Object.values(errors).some((error) => error)
    );
  };

  const handleInvalidDate = () => {
    setFormData({ ...formData, date: '', time: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'photo' && value instanceof File) {
        formDataToSend.append(key, value);
      } else if (value) {
        formDataToSend.append(key, value.toString());
      }
    });

    try {
      await axios.post('http://localhost:5000/submit', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Application sent successfully!');

      // Очищення форми
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        age: 8,
        photo: null,
        date: '',
        time: '',
      });
      setErrors({
        firstName: '',
        lastName: '',
        email: '',
        photo: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const isFormValid = formData.firstName && formData.lastName && formData.email && formData.date && formData.photo && formData.time;

  return (
    <form onSubmit={handleSubmit} className="workout-form">
      <h2>Personal info</h2>
      <div className="form-group">
        <TextField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          error={!!errors.firstName}
          errorMessage={errors.firstName}
        />
      </div>
      <div className="form-group">
        <TextField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          error={!!errors.lastName}
          errorMessage={errors.lastName}
        />
      </div>
      <div className="form-group">
        <TextField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          error={!!errors.email}
          errorMessage={errors.email}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Age</label>
        <input
          type="range"
          name="age"
          min="8"
          max="100"
          value={formData.age}
          onChange={handleInputChange}
          className="form-range"
          required
        />
        <div className="form-range-value">{formData.age}</div>
      </div>
      <div className="form-group">
        <div className="file-container">
          <label className="form-file-label">
            <input
              type="file"
              name="photo"
              onChange={handleFileChange}
              className="form-file"
            />
            <span className="form-file-text">{formData.photo ? formData.photo.name : 'Upload a file'}</span>
          </label>
          <div className="form-drag-drop">
            {formData.photo ? (
              <div className="file-actions">
                <DeleteIcon onClick={handleRemoveFile} />
              </div>
            ) : "Or drag and drop here"}
          </div>
        </div>
        {errors.photo && <ErrorMessage errorMessage={errors.photo} />}
      </div>
      <h2>Your workout</h2>
      <div className="dateTime">
        <div className="form-group">
          <label className="form-label">Date</label>
          <Calendar onDateChange={handleDateChange} selectedDate={formData.date} onInvalidDate={handleInvalidDate} />
        </div>
        {formData.date && (
          <div className="form-group">
            <label className="form-label">Time</label>
            <div className="slots">
              {['12:00', '14:00', '16:30', '18:30', '20:00'].map(time => (
                <TimeSlot
                  key={time}
                  time={time}
                  selected={formData.time === time}
                  onSelect={() => setFormData({ ...formData, time })}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="form-group">
        <Button onClick={handleSubmit} state={isFormValid ? 'default' : 'inactive'}>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default WorkoutForm;
import React, { useState } from 'react';
import axios from 'axios';
import './WorkoutForm.css';
import Button from '../Button/Button';
import TextField from '../TextField/TextField';
import TimeSlot from '../TimeSlot/TimeSlot';
import Calendar from '../Calendar/Calendar';
import DeleteIcon from '../DeleteIcon/DeleteIcon';

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
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, photo: e.target.files[0] });
    }
  };

  const handleDateChange = (date: string) => {
    setFormData({ ...formData, date });
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
          email: emailPattern.test(value) ? '' : 'Please use correct formatting.\n Example: address@email.com',
        });
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    validateField('firstName', formData.firstName);
    validateField('lastName', formData.lastName);
    validateField('email', formData.email);

    if (Object.values(errors).some(error => error)) {
      return;
    }

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'photo' && value) {
        formDataToSend.append(key, value as Blob);
      } else {
        if (value) {
          formDataToSend.append(key, value.toString());
        }
      }
    });

    try {
      await axios.post('http://letsworkout.pl/submit', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Application sent successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const isFormValid = formData.firstName && formData.lastName && formData.email && formData.date;

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
              required
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
      </div>
      <h2>Your workout</h2>
      <div className="dateTime">
        <div className="form-group">
          <label className="form-label">Date</label>
          <Calendar onDateChange={handleDateChange} selectedDate={formData.date} />
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
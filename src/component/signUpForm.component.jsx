import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "./signUpForm.component.css";

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    formState,
  } = useForm({ mode: "onChange" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (data) => {
    setIsSubmitting(true);
    // Simulate form submission (e.g., send data to backend)
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Sign up successful!");
    }, 2000);
  };

  const password = watch("password");

  return (
    <div className="signup-form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/,
                message: "Please enter a valid email address",
              },
            })}
          />
          {errors.email && (
            <span className="error-message">{errors.email.message}</span>
          )}
        </div>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <span className="error-message">{errors.name.message}</span>
          )}
        </div>
        <div className="form-group">
          <label>Country:</label>
          <input
            type="text"
            {...register("country", { required: "Country is required" })}
          />
          {errors.country && (
            <span className="error-message">{errors.country.message}</span>
          )}
        </div>
        <div className="form-group">
          <label>Age:</label>
          <input
            type="number"
            {...register("age", { required: "Age is required" })}
          />
          {errors.age && (
            <span className="error-message">{errors.age.message}</span>
          )}
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
              pattern: {
                value:
                  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/,
                message:
                  "Password must include one uppercase, one lowercase, one number, and one special character",
              },
            })}
          />
          <div
            className="toggle-password-visibility"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </div>
          {errors.password && (
            <span className="error-message">{errors.password.message}</span>
          )}
        </div>
        <button type="submit" disabled={!formState.isValid || isSubmitting}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignupForm;

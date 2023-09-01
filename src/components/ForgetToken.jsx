import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Signup.css"; // Import the CSS file for Login component styles
import Logo from "../assets/Logo.png";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";

const ForgetToken = ({ token }) => {
  const { resetPassword } = useAuth();

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await resetPassword({ token, newPassword: values.password });
      } catch (error) {
        toast.error("Password reset failed");
      }
    },
  });

  return (
    <div className="fixed inset-0 flex flex-col items-center bg-gray-100 px-4 py-4">
      <img src={Logo} alt="Logo" width="150px" height="150px" className="rounded-full mb-4" />
      <div className="bg-white shadow-md rounded-md px-8 py-6 max-w-md w-full">
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium mb-2">
             Enter New Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={`w-full border-2 border-gray-500 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formik.touched.password && formik.errors.password ? "border-red-500" : ""
              }`}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 mt-1">{formik.errors.password}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block font-medium mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className={`w-full border-2 border-gray-500 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formik.touched.confirmPassword && formik.errors.confirmPassword ? "border-red-500" : ""
              }`}
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <p className="text-red-500 mt-1">{formik.errors.confirmPassword}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 w-full rounded-md hover:bg-blue-600"
            disabled={formik.isSubmitting}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetToken;
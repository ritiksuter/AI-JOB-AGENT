import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import Card from "../components/common/Card";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../redux/authSlice";

import {
  getProfileSuccess,
} from "../redux/userSlice";

import {
  loginUser,
} from "../services/auth.service";

const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!formData.email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!formData.password.trim()) {
      setError("Password is required.");
      return;
    }

    try {
      setLoading(true);

      dispatch(loginStart());

      const data = await loginUser(formData);

      localStorage.setItem(
        "token",
        data.token
      );

      dispatch(loginSuccess(data.token));

      dispatch(
        getProfileSuccess(data.user)
      );

      navigate("/dashboard", {replace: true});
    } catch (error) {
      const message =
          error.response?.data?.message ||
          "Login failed";

        dispatch(loginFailure(message));

        setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <Card
        className="w-full max-w-md"
        title="Welcome Back"
        subtitle="Login to your Job Agent account"
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />

          {error && (
            <p className="text-sm text-red-600">
              {error}
            </p>
          )}

          <Button
            type="submit"
            loading={loading}
            fullWidth
          >
            Login
          </Button>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-blue-600 hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default Login;
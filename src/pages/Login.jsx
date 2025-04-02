import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Danh sách tài khoản giả
const mockAccounts = [
  { email: "admin@example.com", password: "admin123", role: "admin" },
  { email: "user1@example.com", password: "user123", role: "user" },
  { email: "test@example.com", password: "test456", role: "user" },
];

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setShowError(false);

    // Kiểm tra thông tin đăng nhập với mock accounts
    const account = mockAccounts.find(
      (acc) => acc.email === email && acc.password === password
    );

    if (account) {
      // Giả lập lưu token (có thể bỏ qua nếu không cần)
      localStorage.setItem("accessToken", "fake-access-token");
      localStorage.setItem("refreshToken", "fake-refresh-token");
      localStorage.setItem("role", account.role); // Lưu vai trò nếu cần
      navigate("/post");
    } else {
      setShowError(true);
    }
  };

  return (
    <div style={styles.loginContainer}>
      <h2 style={styles.title}>Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <div style={styles.inputGroup}>
          <p style={styles.label}>Email</p>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <p style={styles.label}>Password</p>
          <div style={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={styles.togglePassword}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        {showError && (
          <p style={styles.errorMessage}>Wrong Email or Password</p>
        )}

        <div style={styles.actions}>
          <button type="submit" style={styles.button}>
            Login
          </button>
          <a href="#" style={styles.link}>
            Forgot password?
          </a>
        </div>
      </form>
    </div>
  );
};

// CSS inline
const styles = {
  loginContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#f4f4f4",
    padding: "20px",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "20px",
  },
  form: {
    width: "100%",
    maxWidth: "400px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  inputGroup: {
    marginBottom: "20px",
  },
  label: {
    fontSize: "1rem",
    color: "#555",
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "1rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    outline: "none",
    transition: "border-color 0.3s",
  },
  passwordWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  togglePassword: {
    position: "absolute",
    right: "10px",
    cursor: "pointer",
    color: "#666",
  },
  errorMessage: {
    color: "#e74c3c",
    fontSize: "0.9rem",
    textAlign: "center",
    marginBottom: "15px",
  },
  actions: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  },
  button: {
    width: "100%",
    padding: "10px",
    fontSize: "1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  link: {
    fontSize: "0.9rem",
    color: "#007bff",
    textDecoration: "none",
  },
};

// Thêm hiệu ứng hover
styles.input["&:focus"] = {
  borderColor: "#007bff",
};
styles.button["&:hover"] = {
  backgroundColor: "#0056b3",
};
styles.link["&:hover"] = {
  textDecoration: "underline",
};

export default Login;
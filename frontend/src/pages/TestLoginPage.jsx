import LoginForm from "../components/Forms/LoginForm/LoginForm";

const TestLoginPage = () => {
  return (
    <div style={pageStyle}>
      <h1 style={headingStyle}>Login Page</h1>
      <LoginForm />
    </div>
  );
}

const headingStyle = {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333"
};

const pageStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0",
    fontFamily: "Arial, sans-serif"
};

export default TestLoginPage;
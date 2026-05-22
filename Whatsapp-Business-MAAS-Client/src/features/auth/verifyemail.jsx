import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code"); // extract ?code=...
    const navigate=useNavigate();
  useEffect(() => {
    if (code) {
      verifyEmailCode(code);
    }
  }, [code]);

  const verifyEmailCode = async (code) => {
    try {
      const response = await axios.post("http://localhost:8080/api/user/verify-email", {
        code, // send it in the body
      });

      console.log("Verification success:", response.data);
      
      alert("Your email has been verified successfully!");
       setTimeout(() => {
            navigate("/"); // Redirect to login after 2 seconds
          }, 2000);
      // Optionally navigate to login page
    } catch (error) {
      console.error("Verification failed:", error.response?.data || error.message);
      alert("Invalid or expired verification link.");
    }
  };

  return (
    <div>
      <h2>Email Verification</h2>
      <p>Verifying your email...</p>
    </div>
  );
};

export default VerifyEmail;

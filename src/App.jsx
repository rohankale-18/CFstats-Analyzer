import React, { useState } from "react";
import axios from "axios";
import Userinfo from "./components/Userinfo";
import { Navbar } from "./components/Navbar";
import Loader from "./components/Loader";
import InputForm from "./components/Inputform";

function App() {
  const [userHandle, setUserHandle] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [userSub, setUserSub] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setUserHandle(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      setLoading(true);
      const res1 = await axios.get(
        `https://codeforces.com/api/user.info?handles=${userHandle}`
      );
      const res2 = await axios.get(
        `https://codeforces.com/api/user.status?handle=${userHandle}`
      );
      console.log(res1.data);
      console.log(res2.data);
      setUserInfo(res1.data);
      setUserSub(res2.data);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("Response data:", error.response.data);
        console.log("Response status:", error.response.status);
        console.log("Response headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log("Request made but no response received");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error during request setup:", error.message);
      }
      setUserInfo({ error: "invalid" });
      setUserSub({ error: "invalid" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-x-hidden min-h-screen">
      <Navbar />
      <div className="min-h-screen flex flex-col items-center">
        <form onSubmit={handleFormSubmit}>
          <InputForm
            userHandle={userHandle}
            handleInputChange={handleInputChange}
            handleSubmit={handleFormSubmit}
          />
        </form>
        {loading ? <Loader /> : <Userinfo userInfo={userInfo} userSolved={userSub} />}
      </div>
    </div>
  );
}

export default App;

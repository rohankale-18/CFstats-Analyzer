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
      setUserInfo(res1.data);
      setUserSub(res2.data);
    } catch (error) {
      // console.error('Error fetching data:', error);
      let errorMessage = '';
      // Check if the error is due to an invalid handle
      if (error.response && error.response.status === 400) {
        errorMessage = 'Please enter a valid Codeforces handle.';
      } else {
        errorMessage = 'Error fetching data, please try again later.';
      }
      setUserInfo({ error: errorMessage });
      setUserSub({ error: errorMessage });
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

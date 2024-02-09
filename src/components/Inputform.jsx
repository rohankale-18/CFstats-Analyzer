import React from 'react';

const InputForm = ({ userHandle, handleInputChange, handleSubmit }) => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center mt-10  font-sans font-semibold">
      Codeforces Handle:
      <input
        type="text"
        value={userHandle}
        onChange={handleInputChange}
        className="px-1 border border-solid border-slate-400 bg-slate-100 rounded-sm md:ml-1"
      />
      <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-semibold m-2 px-2 rounded">Submit</button>
    </div>
  );
};

export default InputForm;

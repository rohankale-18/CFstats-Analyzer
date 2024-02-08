import React from 'react';

const InputForm = ({ userHandle, handleInputChange, handleSubmit }) => {
  return (
    <div className="flex justify-center mt-10 p-4 border-solid font-sans font-semibold">
      Codeforces Handle:
      <input
        type="text"
        value={userHandle}
        onChange={handleInputChange}
        className="ml-2 px-1 border border-solid border-slate-400 bg-slate-100 rounded-sm"
      />
      <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-semibold ml-2 px-2 rounded">Submit</button>
    </div>
  );
};

export default InputForm;

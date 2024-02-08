import React from 'react';
import ratingColor from './RatingColor';
import rankColor from './RankColor';
import Tablevalue from './Tablevalue';
import Solved from './Solved';
import Charts from './Charts';

const Userinfo = ({ userInfo, userSolved }) => {
  return (
    <div className='flex justify-center items-center m-5 w-4/5'>
      {userInfo && userInfo.result && userInfo.result.length > 0 ? (
      <div className=' bg-slate-100 w-full sm:w-auto'>
        <div className='flex flex-col justify-center items-center mt-10 mb-10'>
        <table className='font-bold border bg-blue-50 w-3/5 table-responsive'>
          <tbody>
            <Tablevalue first={"Handle"} second={userInfo.result[0].handle} />
            <Tablevalue first={"Current Rating"} second={ratingColor({rating: userInfo.result[0].rating})} />
            <Tablevalue first={"Current Rank"} second={rankColor({rank: userInfo.result[0].rank})} />
            <Tablevalue first={"Max Rating"} second={ratingColor({rating: userInfo.result[0].maxRating})} />
            <Tablevalue first={"Max Rank"} second={rankColor({rank: userInfo.result[0].maxRank})} />
            <Tablevalue first={"Total Submissions"} second={userSolved.result.length} />
            <Tablevalue first={"Accepted Submissions"} second={<Solved subs={userSolved.result} />} />
          </tbody>
          </table>
          <div className='w-4/5 sm:w-3/4 md:w-9/10 lg:w-full'>
          <Charts subs={userSolved.result} />
          </div>
          </div>
          </div>
      ) : (
        userInfo.error === "invalid" ? (
          <p>Please enter a valid Codeforces handle.</p>
          ) : (
          <p>Enter a Codeforces Handle</p>
        ))}
    </div>
  );
};

export default Userinfo;

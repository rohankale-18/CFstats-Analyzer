import React from 'react';
import ratingColor from './RatingColor';
import rankColor from './RankColor';
import Tablevalue from './Tablevalue';
import Solved from './Solved';
import Charts from './Charts';

const Userinfo = ({ userInfo, userSolved }) => {
  return (
    <div className='flex justify-center items-center m-5  sm:w-100'>
      {userInfo && userInfo.error ? (
        <p>{userInfo.error }</p>
      ) : userInfo && userInfo.result && userInfo.result.length > 0 ? (
        <div className=' w-full h-auto'>
          <div className='flex flex-col justify-center items-center mt-10 mb-10'>
            <table className='font-bold border bg-blue-50 table-responsive'>
              <tbody>
                <Tablevalue first={"Handle"} second={userInfo.result[0].handle} />
                <Tablevalue first={"Current Rating"} second={ratingColor({ rating: userInfo.result[0].rating })} />
                <Tablevalue first={"Current Rank"} second={rankColor({ rank: userInfo.result[0].rank })} />
                <Tablevalue first={"Max Rating"} second={ratingColor({ rating: userInfo.result[0].maxRating })} />
                <Tablevalue first={"Max Rank"} second={rankColor({ rank: userInfo.result[0].maxRank })} />
                <Tablevalue first={"Total Submissions"} second={userSolved.result.length} />
                <Tablevalue first={"Accepted Submissions"} second={<Solved subs={userSolved.result} />} />
              </tbody>
            </table>
            <div>
              <Charts subs={userSolved.result} submap={ userSolved} />
            </div>
          </div>
        </div>
      ) : (
        <p>Enter a Codeforces Handle</p>
      )}
    </div>
  );
};


export default Userinfo;

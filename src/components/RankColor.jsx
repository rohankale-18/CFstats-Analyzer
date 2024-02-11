import React from 'react'

function rankColor({ rank}) {
    if (rank == "newbie" ) {
      return (
        <div className='text-Newbie capitalize'>
          {rank}
        </div>
      );
    } else if (rank == "pupil") {
      return (
        <div className='text-Pupil capitalize'>
          {rank}
        </div>
      );
    }else if (rank == "specialist") {
      return (
        <div className='text-Specialist capitalize'>
          {rank}
        </div>
      );
    }else if (rank == "expert") {
      return (
        <div className='text-Expert capitalize'>
          {rank}
        </div>
      );
    }else if (rank == "candidate master") {
      return (
        <div className='text-CandidateMaster capitalize'>
          {rank}
        </div>
      );
    }else if (rank == "master") {
      return (
        <div className='text-Master capitalize'>
          {rank}
        </div>
      );
    }else if (rank == "international master") {
      return (
        <div className='text-InternationalMaster capitalize'>
          {rank}
        </div>
      );
    }else if (rank == "grandmaster") {
      return (
        <div className='text-GrandMaster capitalize'>
          {rank}
        </div>
      );
    }else if (rank == "international grandmaster") {
      return (
        <div className='text-InternationalGrandMaster capitalize'>
          {rank}
        </div>
      );
    } else if(rank=="legendary grandmaster"){
      return (
        <div className='flex justify-center flex-row'>
            <div className='text-LegendaryGrandMaster'>Legendary Grandmaster</div>
        </div>
      );
    } else {
      return (
        <div className='flex justify-center flex-row'>
          <div >-</div>
        </div>
      ); 
    }
  }

export default rankColor
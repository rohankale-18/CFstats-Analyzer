import React, { useState } from 'react'

function ratingColor({ rating }) {
  if (rating < 1200) {
    return (
      <div className='text-Newbie'>
        {rating}
      </div>
    );
  } else if (rating >= 1200 && rating < 1400) {
    return (
      <div className='text-Pupil'>
        {rating}
      </div>
    );
  }else if (rating >= 1400 && rating < 1600) {
    return (
      <div className='text-Specialist'>
        {rating}
      </div>
    );
  }else if (rating >= 1600 && rating < 1900) {
    return (
      <div className='text-Expert'>
        {rating}
      </div>
    );
  }else if (rating >= 1900 && rating < 2100) {
    return (
      <div className='text-CandidateMaster'>
        {rating}
      </div>
    );
  }else if (rating >= 2100 && rating < 2300) {
    return (
      <div className='text-Master'>
        {rating}
      </div>
    );
  }else if (rating >= 2300 && rating < 2400) {
    return (
      <div className='text-InternationalMaster'>
        {rating}
      </div>
    );
  }else if (rating >= 2400 && rating < 2600) {
    return (
      <div className='text-GrandMaster'>
        {rating}
      </div>
    );
  }else if (rating >= 2600 && rating < 3000) {
    return (
      <div className='text-InternationalGrandMaster'>
        {rating}
      </div>
    );
  } else {
    return (
      <div className='text-LegendaryGrandMaster'>
        {rating}
      </div>
    );
  }
}

export default ratingColor
import React, { useState, useEffect } from 'react';

function Solved({ subs }) {
  const [ac, setAc] = useState(0);

  useEffect(() => {
    let temp = 0;

    for (let i = 0; i < subs.length; i++) {
      if (subs[i].verdict === 'OK') {
        temp += 1;
      }
    }

    setAc((prevAc) => temp);
  }, [subs]);

  return <div>{ac}</div>;
}

export default Solved;

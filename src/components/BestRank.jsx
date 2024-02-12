import React, { useState, useEffect } from 'react';

const BestRank = ({ ranking }) => {
    const [bestRank, setBestRank] = useState(0);

    useEffect(() => {
        let temp = Number.MAX_SAFE_INTEGER;
        for (let i = 0; i < ranking.length; i++) {
            temp = Math.min(temp, ranking[i].rank);
        }
        setBestRank(temp);
    }, [ranking]);

    return (
        <div>
            {bestRank === Number.MAX_SAFE_INTEGER ? (
                <div>-</div>
            ) : (
                <div>{bestRank}</div>
            )}
        </div>
    );
};

export default BestRank;

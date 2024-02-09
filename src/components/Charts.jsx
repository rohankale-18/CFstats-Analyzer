import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Tooltip as PieTooltip, Legend as PieLegend, Cell } from 'recharts';

const Charts = ({ subs}) => {
    const [chartData, setChartData] = useState([]);
    const [tagsData, setTagsData] = useState([]);
    const [ratingData, setRatingData] = useState([]);
    const customColors = ["#BFFFF1", "#7CFFCB", "#74F2CE", "#03b5aa", "#037971", "#023436", "#132cb9", "#88D585", "#00bfb3", "#049a8f", "#51547b", "#8d99ae", "#a85751", "#7d2e68", "#5a2fc6", "#edf2f4", "#f46778", "#ff1f53", "#a4b494", "#bec5ad", "#264653", "#2a9d8f", "#d8315b", "#928477", "#e9c46a", "#f4a261", "#e76f51", "#3b5249", "#519872", "#34252f", "#0a2463", "#3e92cc", "#496cd4", "#d7e6c6", "#fbfaf8", "#e7decd", "#804e49", "#c97b84"];

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (!subs || !Array.isArray(subs) || subs.length === 0) {
            // Handle the case when subs is undefined, not an array, or an empty array
            return;
        }

        // BarChart data
        const barChartData = [
            { name: 'A', Submissions: 0 },
            { name: 'B', Submissions: 0 },
            { name: 'C', Submissions: 0 },
            { name: 'D', Submissions: 0 },
            { name: 'E', Submissions: 0 },
            { name: 'F', Submissions: 0 },
            { name: 'G', Submissions: 0 },
            { name: 'H', Submissions: 0 },
        ];

        // PieChart data
        const tagsMap = {};

        for (let i = 0; i < subs.length; i++) {
            if (subs[i]?.verdict === 'OK') {
                // BarChart data
                let temp = subs[i]?.problem?.index;
                let index = barChartData.findIndex(item => item.name === temp);
                if (index !== -1) {
                    barChartData[index].Submissions++;
                }

                // PieChart data
                let len = subs[i]?.problem?.tags.length;
                for (let j = 0; j < len; j++) {
                    if (tagsMap[subs[i]?.problem?.tags[j]]) {
                        tagsMap[subs[i]?.problem?.tags[j]]++;
                    } else {
                        tagsMap[subs[i]?.problem?.tags[j]] = 1;
                    }
                }
            }
        }

        // Convert object to array of objects with "name" and "value" properties for PieChart
        const tagsDataArray = Object.entries(tagsMap).map(([name, value]) => ({ name, value }));
        // Sort tagsDataArray based on the "value" property (descending order)
        tagsDataArray.sort((a, b) => a.value - b.value);

        const rating = {};

        for (let i = 0; i < subs.length; i++) {
            if (subs[i]?.verdict === 'OK') {
                if (rating[subs[i]?.problem?.rating]) {
                    rating[subs[i]?.problem?.rating]++;
                } else {
                    rating[subs[i]?.problem?.rating] = 1;
                }
            }
        }
        const ratingArray = Object.entries(rating).map(([name, value]) => ({ name, value }));

        setChartData(barChartData);
        setTagsData(tagsDataArray);
        setRatingData(ratingArray);
        console.log(tagsDataArray)
        console.log(ratingArray);

    }, [subs]);
    console.log(windowWidth);

    return (
        /*outermost div*/
        <div className='flex flex-col justify-center items-center' >
            <div >
                <div className='flex flex-col xl:flex-row'>
                    <div className='flex flex-col'>
                        <div className='flex font-bold m-3 justify-center sm:justify-start'>Problems by Levels:</div>
                        <div className='flex justify-center m-1 sm:bg-slate-50 sm:border-2 sm:border-slate-400'>
                        {/* BarChart */}
                        <BarChart
                            width={windowWidth<600 ? windowWidth - 10 : 500}
                            height={windowWidth<600? 350 :400}
                            data={chartData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="4 4" />
                            <XAxis dataKey="name" />
                            <YAxis label={{ value: 'Submissions', angle: -90, position: 'insideLeft', dx: 5, dy: 5 }} />
                            <Tooltip />
                            {/* <Legend /> */}
                            <Bar dataKey="Submissions" fill="#496CD4" />
                        </BarChart>
                        </div>
                    </div>
                    
                    <div className='flex flex-col'>
                        <div className='flex font-bold m-3 justify-center sm:justify-start'>Problems by Ratings:</div>
                        <div className='flex justify-center m-1 sm:bg-slate-50 sm:border-2 sm:border-slate-400'>
                            {/* BarChart */}
                            <BarChart
                                width={windowWidth<600 ? windowWidth - 10 : 500}
                                height={windowWidth<600? 350 :400}
                                data={ratingData}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="4 4" />
                                <XAxis dataKey="name" />
                                <YAxis label={{ value: 'No. of Questions', angle: -90, position: 'insideLeft', dx: 5, dy: 5 }} />
                                <Tooltip />
                                {/* <Legend /> */}
                                <Bar dataKey="value" fill="#496CD5" />
                            </BarChart>
                        </div>
                    </div>
                    
                </div>

                <div className='flex font-bold m-3 justify-center sm:justify-start'>Problems by Tags:</div>
                <div className='flex justify-center items-center mt-1 sm:bg-slate-50 flex-col xl:flex-row sm:border-2 sm:border-slate-400'>
                    {/* PieChart */}
                    <PieChart
                        width={windowWidth<500 ? windowWidth-20 : 400}
                        height={windowWidth<500 ? windowWidth-20 : 400}
                    >
                        <Pie
                            data={tagsData}
                            cx="50%"
                            cy="50%"
                            innerRadius={windowWidth<500?40: 70}
                            outerRadius={windowWidth<500?120:150}
                            //   fill="blue"
                            nameKey="name"
                            dataKey="value"
                            stroke="none"
                            strokeWidth={0}
                        >
                            {tagsData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={customColors[index % customColors.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>

                    {/* Custom Legend */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 justify-center items-start sm:mr-10 sm:ml-5 ' style={{ maxHeight: '500px' }}>
                        {tagsData.map((entry, index) => (
                            <div key={`legend-item-${index}`} className='flex items-center'>
                                <div
                                    className='w-4 h-4 mr-2 ml-2'
                                    style={{ backgroundColor: customColors[index % customColors.length] }}
                                />
                                <div className='font-semibold'>{entry.name}: {entry.value}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>//outermost div
    );
}

export default Charts;

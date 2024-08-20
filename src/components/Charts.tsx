import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Tooltip as PieTooltip,
  Legend as PieLegend,
  Cell,
} from "recharts";
import CalenderHm from "./CalenderHm";

// Define the types for the props
type Problem = {
  index: string;
  tags: string[];
  rating?: number;
};

type Submission = {
  problem?: Problem;
  verdict?: string;
};

type Submap = {
  result: any[]; // Replace `any` with the correct type if available
};

type ChartsProps = {
  subs: Submission[];
  submap: Submap;
};

// Define the types for the state variables
type BarChartData = {
  name: string;
  Submissions: number;
};

type PieChartData = {
  name: string;
  value: number;
};

type RatingData = {
  name: string | number;
  Submissions: number;
};

const Charts: React.FC<ChartsProps> = ({ subs, submap }) => {
  const [chartData, setChartData] = useState<BarChartData[]>([]);
  const [tagsData, setTagsData] = useState<PieChartData[]>([]);
  const [ratingData, setRatingData] = useState<RatingData[]>([]);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  const customColor = [
    "#FF8A80",
    "#FF5252",
    "#FF1744",
    "#FF80AB",
    "#FF4081",
    "#F50057",
    "#EA80FD",
    "#b538cc",
    "#D500F9",
    "#B388FF",
    "#7C4DFF",
    "#651FFF",
    "#8C9EFF",
    "#536DFE",
    "#3D5AFE",
    "#82B1FF",
    "#448AFF",
    "#2979FF",
    "#A7FFEB",
    "#64FFDA",
    "#64FFDA",
    "#CCFF90",
    "#B2FF59",
    "#76FF03",
    "#FFFF8D",
    "#FFFF00",
    "#FFEA00",
    "#84FFFF",
    "#18FFFF",
    "#00E5FF",
    "#D1FAE5",
    "#FBCFE8",
  ];

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!subs || !Array.isArray(subs) || subs.length === 0) {
      // Handle the case when subs is undefined, not an array, or an empty array
      return;
    }

    // BarChart data
    const barChartData: BarChartData[] = [
      { name: "A", Submissions: 0 },
      { name: "B", Submissions: 0 },
      { name: "C", Submissions: 0 },
      { name: "D", Submissions: 0 },
      { name: "E", Submissions: 0 },
      { name: "F", Submissions: 0 },
      { name: "G", Submissions: 0 },
      { name: "H", Submissions: 0 },
    ];

    // PieChart data
    const tagsMap: Record<string, number> = {};

    subs.forEach((sub) => {
      if (sub?.verdict === "OK") {
        // BarChart data
        const temp = sub?.problem?.index;
        const index = barChartData.findIndex((item) => item.name === temp);
        if (index !== -1) {
          barChartData[index].Submissions++;
        }

        // PieChart data
        const len = sub?.problem?.tags.length || 0;
        for (let j = 0; j < len; j++) {
          const tag = sub?.problem?.tags[j];
          if (tag) {
            tagsMap[tag] = (tagsMap[tag] || 0) + 1;
          }
        }
      }
    });

    // Convert object to array of objects with "name" and "value" properties for PieChart
    const tagsDataArray: PieChartData[] = Object.entries(tagsMap).map(
      ([name, value]) => ({ name, value })
    );
    // Sort tagsDataArray based on the "value" property (descending order)
    tagsDataArray.sort((a, b) => b.value - a.value);

    const ratingMap: Record<number, number> = {};

    subs.forEach((sub) => {
      if (sub?.verdict === "OK" && sub?.problem?.rating !== undefined) {
        ratingMap[sub.problem.rating] =
          (ratingMap[sub.problem.rating] || 0) + 1;
      }
    });

    const ratingArray: RatingData[] = Object.entries(ratingMap).map(
      ([name, Submissions]) => ({
        name: parseInt(name, 10),
        Submissions,
      })
    );

    setChartData(barChartData);
    setTagsData(tagsDataArray);
    setRatingData(ratingArray);
  }, [subs]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <div className="flex flex-col xl:flex-row">
          <div className="flex flex-col">
            <div className="flex font-bold m-3 justify-center sm:justify-start">
              Problems by Levels:
            </div>
            <div className="flex justify-center m-1 sm:bg-slate-50 sm:border-2 sm:border-slate-400">
              <BarChart
                width={windowWidth < 600 ? windowWidth - 10 : 600}
                height={windowWidth < 600 ? 350 : 400}
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="4 4" />
                <XAxis dataKey="name" />
                <YAxis
                  label={{
                    value: "Submissions",
                    angle: -90,
                    position: "insideLeft",
                    dx: 5,
                    dy: 5,
                  }}
                />
                <Tooltip />
                <Bar dataKey="Submissions" fill="#496CD4" />
              </BarChart>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex font-bold m-3 justify-center sm:justify-start">
              Problems by Ratings:
            </div>
            <div className="flex justify-center m-1 sm:bg-slate-50 sm:border-2 sm:border-slate-400">
              <BarChart
                width={windowWidth < 600 ? windowWidth - 10 : 600}
                height={windowWidth < 600 ? 350 : 400}
                data={ratingData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="4 4" />
                <XAxis dataKey="name" />
                <YAxis
                  label={{
                    value: "No. of Questions",
                    angle: -90,
                    position: "insideLeft",
                    dx: 5,
                    dy: 5,
                  }}
                />
                <Tooltip />
                <Bar dataKey="Submissions" fill="#496CD5" />
              </BarChart>
            </div>
          </div>
        </div>

        <div className="flex font-bold m-3 justify-center sm:justify-start">
          Problems by Tags:
        </div>
        <div className="flex justify-center items-center mt-1 sm:bg-slate-50 flex-col xl:flex-row sm:border-2 sm:border-slate-400">
          <PieChart
            width={windowWidth < 500 ? windowWidth - 20 : 400}
            height={windowWidth < 500 ? windowWidth - 20 : 400}
          >
            <Pie
              data={tagsData}
              cx="50%"
              cy="50%"
              innerRadius={windowWidth < 500 ? 40 : 90}
              outerRadius={windowWidth < 500 ? 120 : 200}
              nameKey="name"
              dataKey="value"
              stroke="none"
              strokeWidth={0}
            >
              {tagsData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={customColor[index % customColor.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>

          <div
            className="grid grid-cols-1 overflow-auto mt-3 mb-3 justify-center items-start sm:mr-10 sm:ml-5 "
            style={{ maxHeight: "500px" }}
          >
            {tagsData.map((entry, index) => (
              <div key={`legend-item-${index}`} className="flex items-center">
                <div
                  className="w-4 h-4 mr-2 ml-2"
                  style={{
                    backgroundColor: customColor[index % customColor.length],
                  }}
                />
                <div className="font-semibold">
                  {entry.name}: {entry.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center sm:border-2 sm:border-slate-400 p-5 mt-10">
          <CalenderHm data={submap.result} />
        </div>
      </div>
    </div>
  );
};

export default Charts;

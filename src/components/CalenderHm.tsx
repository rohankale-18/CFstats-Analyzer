import React, { useEffect, useState, useRef, MouseEvent } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

// Define types for props and state
interface DataItem {
  creationTimeSeconds: number;
}

interface CalenderHmProps {
  data: DataItem[];
}

interface CreationItem {
  date: string;
  count: number;
}

interface HoverData {
  date: string;
  count: number;
}

const CalenderHm: React.FC<CalenderHmProps> = ({ data }) => {
  const [creation, setCreation] = useState<CreationItem[]>([]);
  const [allYears, setAllYears] = useState<string[]>([]);
  const [hoverData, setHoverData] = useState<HoverData | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heatmapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data && data.length > 0) {
      const datemap: Record<string, number> = {};
      const yearmap = new Set<string>();

      const dt = (timestamp: number): string => {
        const date = new Date(timestamp * 1000 + 5.5 * 60 * 60 * 1000);
        return date.toISOString().slice(0, 10);
      };

      for (let i = 0; i < data.length; i++) {
        const dateTemp = dt(data[i].creationTimeSeconds);
        datemap[dateTemp] = (datemap[dateTemp] || 0) + 1;
        yearmap.add(dateTemp.slice(0, 4));
      }

      const dateArray = Object.entries(datemap).map(([name, value]) => ({
        date: name,
        count: value,
      }));

      setCreation(dateArray);
      setAllYears(Array.from(yearmap));
    }
  }, [data]);

  const showDataOnHover = (
    value: CreationItem | null,
    event: MouseEvent
  ): void => {
    if (value) {
      const { date, count } = value;
      setHoverData({ date, count });
      setMousePosition({ x: event.pageX, y: event.pageY });
    } else {
      setHoverData(null);
      setMousePosition({ x: 0, y: 0 });
    }
  };

  const handleClickOutside = (event: globalThis.MouseEvent): void => {
    if (
      heatmapRef.current &&
      !heatmapRef.current.contains(event.target as Node)
    ) {
      setHoverData(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      {allYears.map((year, index) => (
        <div key={index} className="flex flex-col w-full">
          <div className="font-semibold text-lg ml-3 mt-3">{year}</div>
          <div ref={heatmapRef}>
            <CalendarHeatmap
              startDate={new Date(`${Number(year) - 1}-12-31`)}
              endDate={new Date(`${year}-12-31`)}
              values={creation}
              classForValue={(value: CreationItem | null) => {
                if (!value) {
                  return "color-empty";
                }
                if (value.count > 5) {
                  return `color-scale-5`;
                } else {
                  return `color-scale-${value.count}`;
                }
              }}
              onMouseOver={(event: MouseEvent, value: CreationItem | null) =>
                showDataOnHover(value, event)
              }
            />
          </div>
        </div>
      ))}
      {hoverData && (
        <div
          className="bg-black text-white opacity-75 rounded-md"
          style={{
            position: "absolute",
            top: mousePosition.y - 75,
            left: mousePosition.x - 50,
            padding: "5px",
            border: "1px solid black",
          }}
        >
          <p>Date: {hoverData.date}</p>
          <p>Submissions: {hoverData.count}</p>
        </div>
      )}
    </>
  );
};

export default CalenderHm;

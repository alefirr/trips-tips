import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCities, getAllSights, getAllTypes } from '../../redux';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Pie,
  PieChart,
  Tooltip,
  CartesianGrid,
} from 'recharts';

export const ChartPage = () => {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.type.list);
  const cities = useSelector((state) => state.city.list);
  const sights = useSelector((state) => state.sight.list);

  useEffect(() => {
    if (!cities.length) {
      dispatch(getAllCities());
    }
    if (!types.length) {
      dispatch(getAllTypes());
    }
    if (!sights.length) {
      dispatch(getAllSights());
    }
  }, [cities.length, sights.length, types.length, dispatch]);

  const renderSightsData = useCallback(
    (data, dataName) => {
      return data
        .map((item) => {
          const filterdSights = sights.filter(
            (sight) => sight[dataName] === item._id
          );
          return { name: item.name, value: filterdSights.length };
        })
        .filter((item) => item.value);
    },
    [sights]
  );

  const sightsPerType = useMemo(
    () => renderSightsData(types, 'type'),
    [types, renderSightsData]
  );

  const sightsPerCity = useMemo(
    () => renderSightsData(cities, 'city'),
    [cities, renderSightsData]
  );
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div>
      <h1>The number of sights per each type</h1>
      <BarChart
        width={1200}
        height={300}
        data={sightsPerType}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar
          dataKey="value"
          barSize={50}
          fill="#019288"
          label={(entry) => entry.value}
        />
      </BarChart>
      <h1>The number of sights per each city</h1>
      <PieChart width={700} height={600}>
        <Pie
          data={sightsPerCity}
          cx="50%"
          cy="50%"
          labelLine={false}
          // (entry) => entry.name +
          label={renderCustomizedLabel}
          fill="#019288"
          dataKey="value"
        />
        <Tooltip />
      </PieChart>
    </div>
  );
};

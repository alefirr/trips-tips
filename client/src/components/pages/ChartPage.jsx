import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCities, getAllSights, getAllTypes } from '../../redux';
import { BarChart, Bar, XAxis, YAxis, Cell, Pie, PieChart } from 'recharts';

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

  return (
    <div>
      <BarChart width={1200} height={300} data={sightsPerType}>
        <XAxis dataKey="name" />
        <YAxis />
        <Bar dataKey="value" barSize={100} fill="#019288" />
      </BarChart>
      <PieChart width={600} height={600}>
        <Pie
          data={sightsPerCity}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={(entry) => entry.name}
          fill="#019288"
          dataKey="value"
        />
      </PieChart>
    </div>
  );
};

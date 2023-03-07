import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../../ui';
import { DataInput } from './DataInput';

export const EditPage = ({
  initialData = {},
  inputs,
  dispatcher,
  preloaders = [],
}) => {
  const dispatch = useDispatch();
  const [data, setData] = useState(initialData);

  useEffect(() => {
    preloaders?.forEach((preloader) => dispatch(preloader()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, ...preloaders]);

  const submitHandler = () => {
    try {
      dispatch(dispatcher(data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add-country-container">
      <div className="form">
        <h1 className="header">New Country</h1>
        {inputs.map((inputData) => (
          <DataInput {...inputData} data={data} setData={setData} />
        ))}
        <div className="button-container">
          <Button title="Add" onClick={submitHandler} />
          <Button title="Cancel" secondary />
        </div>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../../ui';
import { DataInput } from './DataInput';
import './EditPage.css';

export const EditPage = ({
  initialData = {},
  inputs,
  title,
  dispatcher,
  preloaders = [],
}) => {
  const dispatch = useDispatch();
  const [data, setData] = useState(initialData);

  useEffect(() => {
    preloaders.forEach((preloader) => dispatch(preloader()));
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
    <div className="container">
      <div className="form">
        <h1 className="header">{title}</h1>
        {inputs.map((inputData) => (
          <DataInput
            key={inputData.id}
            data={data}
            setData={setData}
            {...inputData}
          />
        ))}
        <div className="button-container">
          <Button title="Add" onClick={submitHandler} />
          <Button title="Cancel" secondary />
        </div>
      </div>
    </div>
  );
};

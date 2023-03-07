import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../ui';
import { DataInput } from './DataInput';
import './EditPage.css';

export const EditPage = ({
  initialData,
  inputs,
  entity,
  dispatcher,
  preloaders = [],
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState([]);

  const [data, setData] = useState(initialData || {});

  useEffect(() => {
    preloaders.forEach((preloader) => dispatch(preloader()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, ...preloaders]);

  const submitHandler = async () => {
    try {
      const res = await dispatch(dispatcher(data));
      navigate(`/${entity}/${res.payload._id}`);
    } catch (e) {
      const errorTitle = e.payload?.message || 'Something went wrong :(';
      const errorText = e.payload?.e || '';
      setError([errorTitle, errorText]);
    }
  };

  const actionName = initialData ? 'Edit' : 'Add';
  const title = `${actionName} ${entity}`;

  const goBack = () => navigate(-1);

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
        <div className="error-msg">
          {error.map((text, i) => (
            <p key={i}>{text}</p>
          ))}
        </div>
        <div className="button-container">
          <Button title={actionName} onClick={submitHandler} />
          <Button onClick={goBack} title="Cancel" secondary />
        </div>
      </div>
    </div>
  );
};

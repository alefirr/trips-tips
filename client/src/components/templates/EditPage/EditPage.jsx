import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../ui';
import { DataInput } from './DataInput';
import './EditPage.css';

const fillDefaultData = (inputs) => {
  const data = {};

  inputs.forEach((input) => {
    const defaultValue = {
      checkbox: false,
      text: '',
      textarea: '',
    }[input.type];

    data[input.id] = defaultValue;
  });

  return data;
};

export const EditPage = ({
  selector,
  inputs,
  entity,
  dispatcher,
  preloaders = [],
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState([]);

  const initialData = useSelector(selector || (() => null));

  const [data, setData] = useState(initialData || fillDefaultData(inputs));
  const [errorData, setErrorData] = useState({});

  useEffect(() => {
    preloaders.forEach((preloader) => dispatch(preloader()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, ...preloaders]);

  const submitHandler = async () => {
    try {
      inputs.forEach((input) => {
        if (
          !input.isOptional &&
          (data[input.id] === '' || data[input.id] === undefined)
        ) {
          setErrorData((prev) => ({ ...prev, [input.id]: true }));
          throw new Error('Please fill all required fields');
        }

        if (data[input.id] === undefined) {
          data[input.id] = null;
        }
      });

      const res = await dispatch(dispatcher(data));

      navigate(`/${entity}/${res.payload.id}`);
    } catch (e) {
      const errorTitle =
        e.payload?.message || e.message || 'Something went wrong :(';

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
            value={data[inputData.id]}
            isError={errorData[inputData.id]}
            removeError={() =>
              setErrorData((prev) => ({ ...prev, [inputData.id]: false }))
            }
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

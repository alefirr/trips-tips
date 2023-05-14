import { useSelector } from 'react-redux';
import './DataInput.css';

const TextInput = ({ setter, max, value = '', ...props }) => (
  <input
    type="text"
    value={value}
    onChange={(e) => setter(e.target.value)}
    maxLength={max}
    {...props}
  />
);

const NumberInput = ({ setter, max, min, ...props }) => (
  <input
    type="number"
    min={min ?? 0}
    max={max ?? 800}
    onChange={(e) => setter(e.target.value)}
    {...props}
  />
);

const TextAreaInput = ({ setter, max, value = '', ...props }) => (
  <textarea
    value={value}
    onChange={(e) => setter(e.target.value)}
    maxLength={max}
    {...props}
  />
);

const CheckboxInput = ({ value = false, setter }) => (
  <input
    type="checkbox"
    checked={value}
    onChange={(e) => setter(!!e.target.checked)}
  />
);

const SelectInput = ({ optionsSelector, setter, placeholder, ...props }) => {
  const options = useSelector(optionsSelector);

  return (
    <select onChange={(e) => setter(+e.target.value)} {...props}>
      <option selected>{placeholder}</option>
      {options.map(({ id, name }) => (
        <option key={id} value={id}>
          {name}
        </option>
      ))}
    </select>
  );
};

const MultiselectInput = ({
  optionsSelector,
  setter,
  placeholder,
  ...props
}) => {
  // const options = useSelector(optionsSelector);
  // return (
  //   <select onChange={(e) => setter(e.target.value)} {...props}>
  //     {options.map(({ id, name }) => (
  //       <option key={id} value={id}>
  //         {name}
  //       </option>
  //     ))}
  //   </select>
  // );
};

const MAP_ID_TO_INPUT_COMP = {
  text: TextInput,
  number: NumberInput,
  textarea: TextAreaInput,
  select: SelectInput,
  multiselect: MultiselectInput,
  checkbox: CheckboxInput,
};

export const DataInput = ({
  id: dataId,
  type,
  label,
  value,
  setData,
  removeError,
  isError,
  ...inputData
}) => {
  const InputComp = MAP_ID_TO_INPUT_COMP[type];

  const style = isError ? { border: '2px solid red' } : {};

  const setter = (val) => {
    if (isError) removeError();
    setData((prev) => ({ ...prev, [dataId]: val }));
  };

  return (
    <div className="input">
      <label>{label}</label>
      <InputComp value={value} setter={setter} style={style} {...inputData} />
    </div>
  );
};

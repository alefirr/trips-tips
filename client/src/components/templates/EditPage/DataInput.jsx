import { useSelector } from 'react-redux';
import './DataInput.css';

const FileInput = ({ setter }) => (
  <input type="file" onChange={(e) => setter(e.target.files?.[0])} />
);

const TextInput = ({ placeholder, value, setter }) => (
  <input
    type="text"
    value={value}
    onChange={(e) => setter(e.target.value)}
    placeholder={placeholder}
  />
);

const NumberInput = ({ placeholder, value, setter }) => (
  <input
    type="number"
    min={0}
    max={10000000000}
    value={value}
    onChange={(e) => setter(e.target.value)}
    placeholder={placeholder}
  />
);

const TextAreaInput = ({ placeholder, value, setter }) => (
  <textarea
    value={value}
    onChange={(e) => setter(e.target.value)}
    placeholder={placeholder}
  />
);

const CheckboxInput = ({ value, setter }) => (
  <input
    type="checkbox"
    checked={value}
    onChange={(e) => setter(!!e.target.checked)}
  />
);

const SelectInput = ({ optionsSelector, value, setter }) => {
  const options = useSelector(optionsSelector);

  return (
    <select value={value} onChange={(e) => setter(e.target.value)}>
      {options.map(({ id, label }) => (
        <option key={id} value={id}>
          {label}
        </option>
      ))}
    </select>
  );
};

const MAP_ID_TO_INPUT_COMP = {
  file: FileInput,
  text: TextInput,
  number: NumberInput,
  textarea: TextAreaInput,
  select: SelectInput,
  checkbox: CheckboxInput,
};

export const DataInput = ({
  id: dataId,
  type,
  label,
  data,
  setData,
  ...inputData
}) => {
  const value = data[dataId];
  const setter = (value) => setData((prev) => ({ ...prev, [dataId]: value }));

  const props = { ...inputData, value, setter };

  const InputComp = MAP_ID_TO_INPUT_COMP[type];

  return (
    <div className="input">
      <label>{label}</label>
      <InputComp {...props} />
    </div>
  );
};

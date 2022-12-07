import "./DataTypeSlider.css";

export const DataTypeSlider = (props) => {
  const { onChange, value } = props;
  const handleValue = (value) => {
    switch (value) {
      case "Now": {
        return 0;
      }
      case "Hourly": {
        return 50;
      }
      case "Daily": {
        return 100;
      }
    }
  };
  return (
    <div className="DataTypeSlider">
      <label htmlFor="temp">Select view:</label>
      <br />
      <input
        type="range"
        id="temp"
        name="temp"
        list="tickmarks"
        step="50"
        value={handleValue(value)}
        onChange={(e) => onChange(e.target.value)}
      />

      <datalist id="tickmarks">
        <option value="0" label="Now"></option>
        <option value="50" label="Hourly"></option>
        <option value="100" label="Daily"></option>
      </datalist>
    </div>
  );
};

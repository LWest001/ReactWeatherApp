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
      <input
        type="range"
        id="temp"
        name="temp"
        list="tickmarks"
        step="50"
        value={handleValue(value)}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="dataList">
        <p id="now">Now</p>
        <p id="hourly">Hourly</p>
        <p id="daily">Daily</p>
      </div>

      {/* 
      This feature doesn't work on iOS.
      <datalist id="tickmarks">
        <option value="0" label="Now"></option>
        <option value="50" label="Hourly"></option>
        <option value="100" label="Daily"></option>
      </datalist> */}
    </div>
  );
};

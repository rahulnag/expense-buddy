import styles from "./page.module.css";

const Dropdown = ({ selectedMonth, onChange, months }) => {
  return (
    <select
      value={selectedMonth}
      onChange={(e) => onChange(e.target.value)}
      className={styles["dropdown"]}
    >
      <option value="" disabled>
        Select a Month
      </option>
      {months.map((month, index) => (
        <option key={index} value={month}>
          {month}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;

import PieChart from "@/app/components/Charts/PieChart";
import styles from "./page.module.css";
import ColumnChart from "@/app/components/Charts/ColumnChart";
import DiffChart from "@/app/components/Charts/DiffChart";
const ExpenseViewer = ({ expenseData, selectedMonth, monthList }) => {
  let expenses = expenseData?.expenseDetails?.[selectedMonth].expense;
  let tags = expenseData?.tags;
  const result = [["tag", "Expense"]];
  tags.forEach((tag) => {
    const totalExpense = expenses
      .filter((item) => item.tag?.toLowerCase() === tag.toLowerCase())
      .reduce((sum, item) => sum + Number(item.amount || 0), 0);
    result.push([tag, totalExpense]);
  });

  let lastMonth = monthList[(monthList.indexOf(selectedMonth) + 11) % 12];
  let lastMonthExpenses = expenseData?.expenseDetails?.[lastMonth].expense;
  const lastMonthResult = [["tag", "Expense"]];
  tags.forEach((tag) => {
    const totalExpense = lastMonthExpenses
      .filter((item) => item.tag?.toLowerCase() === tag.toLowerCase())
      .reduce((sum, item) => sum + Number(item.amount || 0), 0);
    lastMonthResult.push([tag, totalExpense]);
  });

  const diffdata = {
    old: lastMonthResult,
    new: result,
  };

  return (
    <div className={styles["table-chart-container"]}>
      <div className={styles["charts"]}>
        <PieChart data={result} heading={`${selectedMonth} Expense`} />
      </div>
      <div>
        <ColumnChart data={result} heading={`${selectedMonth} Expense`} />
      </div>
      <div>
        <DiffChart
          data={diffdata}
          heading={`${lastMonth} ${selectedMonth} Expense`}
        />
      </div>
    </div>
  );
};

export default ExpenseViewer;

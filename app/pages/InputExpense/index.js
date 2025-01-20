"use client";
import Button from "@/app/components/Button";
import Card from "@/app/components/Card";
import Dropdown from "@/app/components/Dropdown";
import Input from "@/app/components/Input";
import { useEffect, useState } from "react";
import TagList from "./TagList";
import saveToDb from "@/app/util";
import styles from "./page.module.css";
import ExpenseViewer from "./ExpenseViewer";
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const InputExpense = ({ groupData, setGroupData }) => {
  const [selectedMonth, setSelectedMonth] = useState(
    localStorage.getItem("month") !== undefined
      ? localStorage.getItem("month")
      : months[0]
  );
  const [expense, setExpense] = useState("");
  const [budget, setBudget] = useState(
    groupData?.expenseDetails?.[selectedMonth]?.budget
  );
  const [newTag, setNewTag] = useState(""); //new tag value
  const [tag, setTag] = useState(null); //current selected tag
  const [tagInput, setTagInput] = useState(false); //flag to enable input for adding tags
  const [remainingBudget, setRemainingBudget] = useState(0);

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    //save to locastorage so that no need to change it everytime
    if (window) {
      window.localStorage.setItem("month", month);
    }
    getGroupData();
  };

  const handleTagClick = (tag) => {
    setTag(tag); // Set the selected tag
  };

  const saveExpense = async () => {
    //save expense to the group name and to the current month month
    if (expense && tag) {
      const currentDateAndTime = new Date();
      const dateObj = new Date(currentDateAndTime);
      try {
        const result = await saveToDb(
          "/api/save-expense",
          {
            expense: {
              "entered-by": JSON.parse(localStorage.getItem("userdetails"))
                ?.name,
              amount: expense,
              tag: tag,
              date:
                dateObj.toISOString().split("T")[0] +
                " " +
                dateObj.toTimeString().split(" ")[0],
              //"amount": 1000,
              //"tag": "grocery",
              //"entered-by": "a",
              //"date": "1/11/2025"
            },
            month: selectedMonth,
            groupName: JSON.parse(localStorage.getItem("userdetails"))
              ?.groupName,
          },
          "Data saved successfully!"
        );
        getGroupData();
        setExpense("");
        setTag(null);
      } catch (error) {
        console.error("Error:", error); // Logs: FAILURE
      }
    } else {
      alert("Please enter expense and select tag");
    }
  };

  const getGroupData = async () => {
    const data = await saveToDb("/api/get-group-info", {
      groupName: JSON.parse(localStorage.getItem("userdetails"))?.groupName,
    });

    if (data !== "Error") {
      setGroupData(data);
    } else {
      setGroupData("Error");
    }
  };

  const saveBudget = async () => {
    if (budget == "" || selectedMonth == "") {
      alert("Please enter budget and month");
    } else {
      const data = await saveToDb("/api/save-budget", {
        budget: budget,
        groupName: JSON.parse(localStorage.getItem("userdetails"))?.groupName,
        month: selectedMonth,
      });

      if (data !== "Error") {
        getGroupData();
      }
    }
  };

  const saveTags = async () => {
    if (newTag) {
      if (groupData?.tags.includes(newTag)) {
        alert("Tag already available");
      } else {
        const data = await saveToDb("/api/save-tags", {
          budget: budget,
          groupName: JSON.parse(localStorage.getItem("userdetails"))?.groupName,
          tags: newTag,
        });

        if (data !== "Error") {
          getGroupData();
          setNewTag("");
          setTagInput(false);
        }
      }
    } else {
      alert("Please enter tag");
    }
  };
  useEffect(() => {
    if (window) {
      if (window.localStorage.getItem("month") == undefined) {
        localStorage.setItem("month", months[0]);
        setSelectedMonth(months[0]);
      }
    }
  }, []);

  useEffect(() => {
    setRemainingBudget(calculateRemainingBudget());
  }, [selectedMonth, groupData]);

  const calculateRemainingBudget = () => {
    const budget = groupData?.expenseDetails?.[selectedMonth]?.budget;
    let totalExpense = groupData?.expenseDetails?.[
      selectedMonth
    ]?.expense.reduce((acc, currentVal) => {
      return acc + Number(currentVal?.amount);
    }, 0);
    return budget - totalExpense;
  };

  const calculateTotalExpense = () => {
    const budget = groupData?.expenseDetails?.[selectedMonth]?.budget;
    let totalExpense = groupData?.expenseDetails?.[
      selectedMonth
    ]?.expense.reduce((acc, currentVal) => {
      return acc + Number(currentVal?.amount);
    }, 0);
    return totalExpense;
  };
  return (
    <>
      {groupData == "Error" ? (
        <h5>Failed to load data</h5>
      ) : (
        <>
          {groupData?.expenseDetails?.[selectedMonth]?.budget == undefined ||
          groupData?.expenseDetails?.selectedMonth?.budget == 0 ||
          groupData?.expenseDetails?.[selectedMonth]?.budget == "" ? (
            <div className={styles["enter-budget-container"]}>
              <Input
                type="number"
                value={budget}
                name="budget"
                placeholder="Enter budget"
                required={true}
                onChange={(e) => setBudget(e.target.value)}
              />
              <Dropdown
                selectedMonth={selectedMonth}
                onChange={handleMonthChange}
                months={months}
              />

              <button className="button-primary" onClick={saveBudget}>
                Save budget
              </button>
            </div>
          ) : (
            <>
              <div className={styles["group-expense-details-container"]}>
                <Card>
                  <small>Initial budget:</small>
                  <h3>
                    <span style={{ fontSize: "1.5rem" }}>&#8377;</span>
                    {groupData?.expenseDetails?.[selectedMonth]?.budget}
                  </h3>
                </Card>
                {/* <Card>
                  <small>Remaining amount</small>
                  <h3
                    style={{
                      color: remainingBudget < 0 ? "ff3434 !important" : "",
                    }}
                  >
                    {" "}
                    <span style={{ fontSize: "1.5rem" }}>&#8377;</span>
                    {remainingBudget}
                  </h3>
                </Card> */}

                <Card>
                  <small>Total Expense:</small>
                  <h3
                    style={{
                      color: remainingBudget < 0 ? "ff3434 !important" : "",
                    }}
                  >
                    {" "}
                    <span style={{ fontSize: "1.5rem" }}>&#8377;</span>
                    {calculateTotalExpense()}
                  </h3>
                  <small>
                    Remaining amount:{" "}
                    <span style={{ color: remainingBudget < 0 ? "red" : "" }}>
                      ({remainingBudget})
                    </span>
                  </small>
                </Card>
                <div className={styles["expense-adding-container"]}>
                  <h1 className={styles["heading"]}>Input expense</h1>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <Input
                      type="text"
                      value={expense}
                      name="expense"
                      placeholder="Enter expense"
                      required={true}
                      onChange={(e) => setExpense(e.target.value)}
                    />
                    <Dropdown
                      selectedMonth={selectedMonth}
                      onChange={handleMonthChange}
                      months={months}
                    />
                  </div>
                  <TagList
                    tags={groupData?.tags}
                    tag={tag}
                    handleTagClick={handleTagClick}
                    tagInput={tagInput}
                    setTagInput={setTagInput}
                    saveTags={saveTags}
                    newTag={newTag}
                    setNewTag={setNewTag}
                  />

                  {!tagInput && (
                    <Button
                      type="Primary"
                      text="Save expense"
                      clickHandler={saveExpense}
                      className="button-primary"
                    />
                  )}
                </div>
              </div>
              <ExpenseViewer
                expenseData={groupData}
                selectedMonth={selectedMonth}
                monthList={months}
              />
            </>
          )}
        </>
      )}
    </>
  );
};

export default InputExpense;

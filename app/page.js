"use client";
import LoginScreen from "./pages/LoginScreen";
import InputExpense from "./pages/InputExpense";
import saveToDb from "@/app/util";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import StickyHeader from "./components/StickyHeader";
const defaultData = {
  members: [],
  tags: [],
  expenseDetails: {
    January: {
      budget: "",
      expense: [],
    },
    February: {
      budget: "",
      expense: [],
    },
    March: {
      budget: "",
      expense: [],
    },
    April: {
      budget: "",
      expense: [],
    },
    May: {
      budget: "",
      expense: [],
    },
    June: {
      budget: "",
      expense: [],
    },
    July: {
      budget: "",
      expense: [],
    },
    August: {
      budget: "",
      expense: [],
    },
    September: {
      budget: "",
      expense: [],
    },
    October: {
      budget: "",
      expense: [],
    },
    November: {
      budget: "",
      expense: [],
    },
    December: {
      budget: "",
      expense: [],
    },
  },
};

const getGroupPass = () => {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem("userdetails")
      ? JSON.parse(window.localStorage.getItem("userdetails"))?.groupPassword
      : "";
  }
};
const getGroupName = () => {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem("userdetails")
      ? JSON.parse(window.localStorage.getItem("userdetails"))?.groupName
      : "";
  }
};
const getName = () => {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem("userdetails")
      ? JSON.parse(window.localStorage.getItem("userdetails"))?.name
      : "";
  }
};

export default function Home() {
  const [groupPassword, setGroupPassword] = useState(() => getGroupPass());
  const [groupName, setGroupName] = useState(() => getGroupName());
  const [name, setName] = useState(() => getName());
  const [groupData, setGroupData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [showPassField, setShowPassField] = useState(false);
  const [showNameField, setShowNameField] = useState(false);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     setGroupPassword(
  //       window.localStorage.getItem("userdetails")
  //         ? JSON.parse(window.localStorage.getItem("userdetails"))
  //             ?.groupPassword
  //         : ""
  //     );

  //     setGroupName(
  //       window.localStorage.getItem("userdetails")
  //         ? JSON.parse(window.localStorage.getItem("userdetails"))?.groupName
  //         : ""
  //     );

  //     setName(
  //       window.localStorage.getItem("userdetails")
  //         ? JSON.parse(window.localStorage.getItem("userdetails"))?.name
  //         : ""
  //     );
  //   }
  // }, []);
  const inputValidation = () => {
    let retVal = false;
    if (groupName == "") {
      window.alert("Please enter group name");
    } else {
      if (showPassField && groupPassword == "") {
        window.alert("Please enter group password");
      } else if (showNameField && name == "") {
        window.alert("Please enter your nickname");
      } else {
        retVal = true;
      }
    }
    return retVal;
  };
  const CheckGroup = async () => {
    //make a call to check that the group exist or not, if group exist then connect to that group and save info in localstorage.
    if (inputValidation())
      try {
        const result = await saveToDb(
          "/api/check-group",
          { groupName: groupName, groupPassword: groupPassword },
          "Data saved successfully!"
        );

        if (result == "Group does not exist") {
          //if group does not exists then create a group
          let shouldCreateGroup = window.confirm(
            "Group doesn't exist. Do you want to create a group"
          );

          if (shouldCreateGroup) {
            //if user confirms to create a group
            if (name == "" && groupPassword == "") {
              setShowNameField(true);
              setShowPassField(true);
            } else {
              const result = await saveToDb(
                "/api/create-group",
                {
                  groupName: groupName,
                  groupPassword: groupPassword,
                  ...defaultData,
                },
                "Group created successfully!"
              );
              if (result.msg == "SUCCESS" && typeof window !== "undefined") {
                //save data to localstorage
                setGroupData(result);
                window.localStorage.setItem(
                  "userdetails",
                  JSON.stringify({
                    groupName: groupName,
                    groupPassword: groupPassword,
                    name: name,
                  })
                );
                setIsLoggedIn(true);
                setGroupName("");
                setGroupPassword("");
                setName("");
              } else {
                window.alert("something went wrong");
              }
            }
          } else {
            //if user don't want to create a group
            setGroupName("");
            setGroupPassword("");
            setName("");
            setGroupData("");
          }
        } else if (
          result == "Wrong credentials" &&
          typeof window !== "undefined"
        ) {
          //might be the credential is wrong
          setShowPassField(true);
          if (
            JSON.parse(window.localStorage.getItem("userdetails"))?.name ==
              "" ||
            JSON.parse(window.localStorage.getItem("userdetails"))?.name ==
              undefined
          ) {
            setShowNameField(true);
          }
          window.alert(
            "Group already available, either enter correct password to join the group or choose different group name to create one"
          );
        } else if (result == "Internal Server Error") {
          window.alert("Something went wrong");
        } else {
          //if group check does not returns error then connect user to the group
          if (typeof window !== "undefined") {
            setGroupData(result);
            window.localStorage.setItem(
              "userdetails",
              JSON.stringify({
                groupName: groupName,
                groupPassword: groupPassword,
                name: name,
              })
            );
            setIsLoggedIn(true);
          }
        }
      } catch (error) {
        console.error("Error:", error); // Logs: FAILURE
        setGroupData("Error");
        setIsLoggedIn(false);
      }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.localStorage.getItem("userdetails")) {
        // setIsLoggedIn(true);
        CheckGroup();
      } else {
        setIsLoggedIn(false);
      }
    }
  }, []);

  return (
    <>
      <StickyHeader />
      <main className={styles["main"]}>
        {isLoggedIn ? (
          <>
            <InputExpense groupData={groupData} setGroupData={setGroupData} />
          </>
        ) : (
          <LoginScreen
            groupName={groupName}
            setGroupName={setGroupName}
            name={name}
            setName={setName}
            groupPassword={groupPassword}
            setGroupPassword={setGroupPassword}
            CheckGroup={CheckGroup}
            showPassField={showPassField}
            showNameField={showNameField}
          />
        )}
      </main>
      <footer></footer>
    </>
  );
}

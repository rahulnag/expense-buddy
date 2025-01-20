"use client";
import Button from "../../components/Button";
import Input from "../../components/Input";
import styles from "./page.module.css";
const LoginScreen = ({
  groupName,
  setGroupName,
  groupPassword,
  setGroupPassword,
  name,
  setName,
  budget,
  setBudget,
  CheckGroup,
  showPassField,
  showNameField,
}) => {
  return (
    <div className={styles["login-container"]}>
      <Input
        required={true}
        value={groupName}
        placeholder="Enter group name you want to create or join"
        onChange={(e) => setGroupName(e.target.value)}
      />
      {showPassField && (
        <Input
          required={true}
          value={groupPassword}
          placeholder="Enter group password"
          onChange={(e) => setGroupPassword(e.target.value)}
        />
      )}
      {showNameField && (
        <Input
          required={true}
          value={name}
          placeholder="Enter you nickname"
          onChange={(e) => setName(e.target.value)}
        />
      )}
      <Button
        type="primary"
        text="Create/Join"
        clickHandler={CheckGroup}
        className="button-primary"
      />{" "}
    </div>
  );
};

export default LoginScreen;

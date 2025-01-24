import Image from "next/image";
import styles from "./style.module.css";
// import userAvatar from "user-avatar.png";
const StickyHeader = () => {
  if (typeof window !== "undefined")
    return (
      <header className={styles["sticky-header"]}>
        <h1>Expense Buddy</h1>
        {window.localStorage.getItem("userdetails") && (
          <div className={styles["avatar"]}>
            <Image
              src={"/user-avatar.png"}
              alt="User Avatar"
              className={styles["avatar-img"]}
              height={80}
              width={80}
            />
            <small>
              Welcome{" "}
              {JSON.parse(
                window.localStorage.getItem("userdetails")
              )?.name.toUpperCase()}
            </small>
          </div>
        )}
      </header>
    );
  else {
    <header className={styles["sticky-header"]}>
      <h1>Expense Buddy</h1>
    </header>;
  }
};

export default StickyHeader;

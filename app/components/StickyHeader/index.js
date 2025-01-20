import Image from "next/image";
import styles from "./style.module.css";
// import userAvatar from "user-avatar.png";
const StickyHeader = () => {
  return (
    <header className={styles["sticky-header"]}>
      <h1>Expense Buddy</h1>
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
          {JSON.parse(localStorage.getItem("userdetails"))?.name.toUpperCase()}
        </small>
      </div>
    </header>
  );
};

export default StickyHeader;

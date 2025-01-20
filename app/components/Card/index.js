import styles from "./page.module.css";
export default function Card({ children }) {
  return <div className={styles["card"]}>{children}</div>;
}

// export default Card;

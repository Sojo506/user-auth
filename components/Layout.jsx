import styles from '../styles/Layout.module.css';

export default function Layout({ children, title }) {
  return (
    <>
      <div className="flex h-screen bg-blue-400">
        <div className="m-auto bg-slate-50 rounded-md w-full sm:w-3/4 h-3/4 grid lg:grid-cols-2">
          <div className={styles.img}>
            <div className={styles.cartoonImg}></div>
            <div className={styles.cloud1}></div>
            <div className={styles.cloud2}></div>
          </div>
          <div className="right flex flex-col justify-evenly">
            <div className="text-center py-11 lg:py-0">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}

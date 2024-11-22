import MainLayout from "@/components/layouts/MainLayout";
import styles from "./home.module.css";

const HomePage = () => {
  return (
    <div className={styles.home}>
      <span>Home</span>
    </div>
  );
};

HomePage.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default HomePage;

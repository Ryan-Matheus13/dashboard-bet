/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import styles from "../../styles/login.module.css";
import AuthLayout from "@/components/layouts/AuthLayout";
import LoginForm from "@/components/forms/LoginForm/Form";

export async function getServerSideProps() {
  const imageSrc = process.env.NEXT_LOGO ? process.env.NEXT_LOGO : "";
  return { props: { imageSrc } };
}

const LoginPage = ({ imageSrc }: { imageSrc: string }) => {
  return (
    <section className={"page-container"}>
      <div className={styles.login}>
        <div className={styles.loginFormContainer}>
          <img
            className={styles.loginLogo}
            src={imageSrc}
            alt={"Logo"}
            width={0}
            height={0}
          />
          <h2>Controle de Recursos</h2>
          <LoginForm />
        </div>
      </div>
    </section>
  );
};

LoginPage.getLayout = function getLayout(page: React.ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default LoginPage;

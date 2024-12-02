/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./notifications.module.css";
import { setMenu } from "@/store/applicationStore/actions";
import { useAppDispatch } from "@/store/hooks/useAppDispatch";
import { useAppSelector } from "@/store/hooks/useAppSelector";
import { useEffect } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { IMenu } from "@/store/applicationStore/interfaces";
import SendNotificationAppForm from "@/components/forms/SendNotificationAppForm/Form";
import PageHeader from "@/components/common/PageHeader/PageHeader";

export async function getServerSideProps() {
  const apiUrl = process.env.NEXT_APP_URL ? process.env.NEXT_APP_URL : "";

  return { props: { apiUrl } };
}

const NotificationsPage = () => {
  const { menu } = useAppSelector((store) => store.application);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (menu) {
      menu.data.map((menu: IMenu, index: number) => {
        if (menu.active) {
          if (index != 3) {
            dispatch(setMenu(3));
          }
        }
      });
    }
  }, [dispatch]);

  return (
    <>
      <div className={styles.notifications}>
        <PageHeader
          title={"Gerenciamento de Notificações"}
          buttonLabel={""}
          buttonOnClick={() => {}}
        />
        <div className={styles.notificationsContent}>
          <SendNotificationAppForm />
        </div>
      </div>
    </>
  );
};

NotificationsPage.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default NotificationsPage;

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import MainLayout from "@/components/layouts/MainLayout";
import styles from "./home.module.css";
import { useAppSelector } from "@/store/hooks/useAppSelector";
import { useRouter } from "next/router";
import { useEffect } from "react";
import StreamCalendar from "@/components/common/StreamCalendar/StreamCalendar";
import { useAppDispatch } from "@/store/hooks/useAppDispatch";
import { toast } from "react-toastify";
import {
  setStreams,
  setLoadStreamsError,
  clearLoadStreamsError,
} from "@/store/applicationStore/actions";

export async function getServerSideProps() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${apiUrl}/api/core/streams`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  return { props: { response } };
}

const StreamsPage = ({ response }: any) => {
  const router = useRouter();
  const { auth, application } = useAppSelector((store) => store.application);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      // if (response.ok) {
      //   const data = await response.json();
      //   dispatch(setStreams(data));
      //   toast.success("Login efetuado com sucesso!");
      // } else {
      //   const data = await response.json();
      //   dispatch(setLoadStreamsError(data.message));
      // }
    };

    fetchData();
  }, [response]);

  useEffect(() => {
    toast.error(application.streams.error);
    dispatch(clearLoadStreamsError());
  }, [application.streams.error]);

  useEffect(() => {
    if (!auth.user.token) {
      router.push("/auth/login");
    }
  }, [auth.user.token]);

  const handleEdit = (stream: any) => {
    console.log(stream);
  };

  return (
    <div className={styles.streams}>
      <div>{/* action header */}</div>
      <div>
        <StreamCalendar edit={handleEdit} data={application.streams.data} />
      </div>
    </div>
  );
};

StreamsPage.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default StreamsPage;

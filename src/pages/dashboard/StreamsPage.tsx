/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import StreamCalendar from "@/components/common/StreamCalendar/StreamCalendar";
import styles from "./streams.module.css";
import Loading from "@/components/common/Loading/Loading";
import { setStreams } from "@/store/applicationStore/actions";
import { useAppDispatch } from "@/store/hooks/useAppDispatch";
import { useAppSelector } from "@/store/hooks/useAppSelector";
import router from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";

const StreamsPage = ({ data, error }: any) => {
  const { application } = useAppSelector((store) => store.application);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (error == "Token não fornecido.") {
      router.push("/auth/login");
    }
    toast.error(error);
  }, [error]);

  useEffect(() => {
    if (!error) {
      dispatch(setStreams(data));
      toast.success("Dados Carregados!");
    }
  }, [data, error]);

  const handleEdit = (stream: any) => {
    console.log(stream);
  };
  return (
    <div className={styles.streams}>
      <div>{/* action header */}</div>
      <div>
        {!data && <Loading />}
        {data && (
          <StreamCalendar data={application.streams.data} edit={handleEdit} />
        )}
      </div>
    </div>
  );
};

export default StreamsPage;

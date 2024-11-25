/* eslint-disable @typescript-eslint/no-explicit-any */

import dynamic from "next/dynamic";
import Cookies from "cookies";
import MainLayout from "@/components/layouts/MainLayout";

const StreamCalendar: any = dynamic(
  () => import("../../components/common/StreamCalendar/StreamCalendar"),
  {
    ssr: false,
  }
);

StreamCalendar.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default StreamCalendar;

export async function getServerSideProps(context: any) {
  try {
    const apiUrl = process.env.NEXT_APP_URL;

    if (!apiUrl) {
      throw new Error(
        "A variável de ambiente NEXT_APP_URL não está configurada."
      );
    }

    const cookies = new Cookies(context.req, context.res);
    const token = cookies.get("jwt");
    if (!token) {
      throw new Error("Token não fornecido.");
    }

    const response = await fetch(`${apiUrl}/api/core/streams?token=${token}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(`${data.message}`);
    }

    const data = await response.json();

    return { props: { data } };
  } catch (error: any) {
    return {
      props: { data: [], error: error.message },
    };
  }
}

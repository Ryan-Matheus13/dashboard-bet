// import { useEffect } from "react";
// import { useRouter } from "next/router";
import MainLayout from "@/components/layouts/MainLayout";

const HomePage = () => {
  // const router = useRouter();

  // useEffect(() => {
  //   router.push("/dashboard/streams");
  // }, [router]);

  return null;
};

HomePage.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default HomePage;

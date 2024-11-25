import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/dashboard/streams",
      permanent: false, // Use false para redirecionamentos temporários (códigos 307/302)
    },
  };
};

const HomePage = () => {
  return null; // Nada será renderizado no cliente
};

export default HomePage;

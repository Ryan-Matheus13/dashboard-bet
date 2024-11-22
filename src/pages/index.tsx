import MainLayout from "@/components/layouts/MainLayout";

const HomePage = () => {
  return <div>Bem-vindo à página inicial!</div>;
};

HomePage.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default HomePage;

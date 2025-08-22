// pages/index.tsx
import { GetServerSideProps } from 'next';
export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    redirect: {
      destination: './Login-Pagina/Login',
      permanent: false,
    },
  };
};

export default function Home() {
  return null; // Esta página nunca será exibida, pois o redirecionamento acontece no lado do servidor
}

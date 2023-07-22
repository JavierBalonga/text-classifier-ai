import Layout from './components/business/Layout';
import TextClassifyForm from './components/business/TextClassifyForm';

export default function App() {
  return (
    <Layout>
      <div className="flex grow flex-row justify-center">
        <div className="flex w-full max-w-7xl grow items-center justify-center px-4 py-16 sm:px-8">
          <TextClassifyForm />
        </div>
      </div>
    </Layout>
  );
}

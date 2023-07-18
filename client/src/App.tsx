import Layout from "./components/Layout";
import { useAuth } from "./contexts/AuthProvider";

export default function App() {
  const {
    loginWithRedirect,
    logout,
    isAuthenticated,
    isLoading,
    user,
    error,
    getAccessTokenSilently,
  } = useAuth();

  const handleTestClassify = () => {
    getAccessTokenSilently().then((accessToken) => {
      return fetch("http://localhost:3001/classify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          text: "javascript it's a programming language",
          tags: [{ name: "javascript" }, { name: "dogs" }],
        }),
      });
    });
  };

  return (
    <Layout>
      <div>
        {error ? (
          <p>{error.message}</p>
        ) : !isAuthenticated || isLoading ? (
          <p>Loading...</p>
        ) : (
          <>TODO</>
        )}
      </div>
    </Layout>
  );
}

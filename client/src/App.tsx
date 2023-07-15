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
    <div>
      {error ? (
        <p>{error.message}</p>
      ) : isLoading ? (
        <p>Loading...</p>
      ) : !isAuthenticated ? (
        <button onClick={() => loginWithRedirect()}>Log In</button>
      ) : (
        <div className="flex flex-col gap-2">
          <p>{user?.email}</p>
          <img src={user?.picture} alt="avatar" />
          <button
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            Log Out
          </button>
          <button onClick={handleTestClassify}>test classify</button>
        </div>
      )}
    </div>
  );
}

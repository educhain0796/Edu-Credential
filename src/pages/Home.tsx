import { useOCAuth } from "@opencampus/ocid-connect-js";
import LoginButton from "@/components/LoginButton";

export default function Home() {
    const { authState, ocAuth } = useOCAuth();

    // Ensure authState is defined before accessing its properties
    if (!authState) {
        return <div>Loading authentication...</div>;
    }

    if (authState.error) {
        return <div>Error: {authState.error.message}</div>;
    }

    if (authState.isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Welcome to My App</h1>
            {authState.isAuthenticated ? (
                <p>You are logged in! {JSON.stringify(ocAuth.getAuthState())}</p>
            ) : (
                <LoginButton />
            )}
        </div>
    );
}

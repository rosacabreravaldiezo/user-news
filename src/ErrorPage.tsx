import { useNavigate, useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError() as Error;
    const navigate = useNavigate();

    if (!isRouteErrorResponse(error)) {
        return null;
    }

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{(error as Error)?.message || (error as { statusText?: string })?.statusText}</i>
            </p>
            <button onClick={() => navigate(-1)}>&larr; Go back</button>
        </div>
    );
}
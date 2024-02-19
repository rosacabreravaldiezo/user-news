import { useNavigate, useRouteError, isRouteErrorResponse } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ErrorPage() {
    const error = useRouteError() as Error;
    const { t } = useTranslation();
    const navigate = useNavigate();

    if (!isRouteErrorResponse(error)) {
        return null;
    }

    return (
        <div id="error-page">
            <h1>{t('oops')}</h1>
            <p>{t('sorry_unexcepted')}</p>
            <p>
                <i>{(error as Error)?.message || (error as { statusText?: string })?.statusText}</i>
            </p>
            <button onClick={() => navigate(-1)}>&larr; Go back</button>
        </div>
    );
}
const getErrorMessage = (error: unknown) => {
    if (error instanceof Error) {
        return error.message;
    } else if (typeof error === 'object' && error !== null && 'status' in error && 'data' in error && typeof error.data === 'object' && error.data !== null && 'status_message' in error.data) {
        return `Error status: ${error.status} &&  Error Message: ${error.data.status_message}`;
    } else {
        return String(error);
    }
};

const TemporaryError = ({ error }: { error?: string | Error }) => (
    <h2 className='text-3xl font-bold text-center'>
        {error ? (typeof error === 'string' ? error : error.message) : 'Unknown error'}
    </h2>
);

const ErrorMessage = ({ error }: { error: unknown }) => {
    if (!error) return null;
    const message = getErrorMessage(error);
    return <TemporaryError error={message} />;
};

export default ErrorMessage;

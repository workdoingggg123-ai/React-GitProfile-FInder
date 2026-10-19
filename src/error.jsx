
    function ErrorPage({ message, onRetry }) {
        return (
            <div className="error-page">
                <h1>Oops!</h1>
                <h2>Error Occured</h2>
                <img id="errorimg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDGnh-Jw0OFqWDKz2uKtRhux4KqEvBNIXtAq0lcHh5qg&s=10" alt="img-github"  />
                <p>{message}</p>

                <button onClick={onRetry}>
                    Try Again
                </button>
            </div>
        );
    }

    export default ErrorPage;
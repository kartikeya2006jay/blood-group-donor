import './LoadingSpinner.css';


function LoadingSpinner() {
    return (
        <div className="spinner-wrapper" role="status" aria-label="Loading donors...">
            <div className="spinner-container">
                <div className="spinner-ring" />
                <div className="spinner-inner" />
            </div>
            <p className="spinner-text">Finding nearby donors...</p>
        </div>
    );
}

export default LoadingSpinner;

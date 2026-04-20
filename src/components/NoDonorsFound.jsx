import './NoDonorsFound.css';

function NoDonorsFound({ selectedBloodGroup, citySearch }) {
    return (
        <div className="no-donors" role="status">
            <div className="no-donors-icon">🩸</div>
            <h3>No Donors Found</h3>
            <p>
                No donors match your current filters. Try a different blood group or city.
            </p>
            <div className="no-donors-hint">
                <span>💡</span>
                {selectedBloodGroup !== 'All' && citySearch
                    ? `Filtered by "${selectedBloodGroup}" in "${citySearch}"`
                    : selectedBloodGroup !== 'All'
                        ? `Filtered by blood group: ${selectedBloodGroup}`
                        : citySearch
                            ? `Searching in city: "${citySearch}"`
                            : 'No donors available right now'}
            </div>
        </div>
    );
}

export default NoDonorsFound;

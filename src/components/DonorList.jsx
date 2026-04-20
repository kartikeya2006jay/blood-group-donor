import DonorCard from './DonorCard';
import '../App.css';

function DonorList({ donors, requestStatus, onRequest }) {
    return (
        <div className="donor-grid">
            {donors.map((donor) => (
                <DonorCard
                    key={donor.id}
                    donor={donor}
                    isRequested={!!requestStatus[donor.id]}
                    onRequest={onRequest}
                />
            ))}
        </div>
    );
}

export default DonorList;

import { HashLoader } from 'react-spinners'

export default function Loading() {
    return (
        <div className="loading-spinner">
            <HashLoader
                color="#7209b7"
                size={100}
                speedMultiplier={1.5}
            />
        </div>
    )
}

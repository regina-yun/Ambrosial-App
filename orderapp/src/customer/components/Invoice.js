import {v4 as uuid} from 'uuid';

export default function Invoice() {
    

return (
    <p style={{textAlign: "center", fontFamily: "sans-serif", fontWeight: "bold"}}><strong>Invoice number:</strong>&nbsp;{uuid()}</p>
)
}
export default function Spinner(){
    return(
        <>
            <div className="spinner">
                <div className="lds-roller">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div>Loading...</div>
            </div>

        </>
    )
}
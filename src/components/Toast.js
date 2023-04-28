import { useState } from "react";
import { Toast } from "react-bootstrap";

export default function ToastBox({mainMsg, show}){

    const [showT, setShowT] = useState(show)
    return (
        <Toast show={showT} onClose={()=>{setShowT(!show)}}>
          <Toast.Header>
            <strong className="me-auto">{mainMsg}</strong>
          </Toast.Header>
        </Toast>
    );
}
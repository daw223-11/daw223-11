import React from "react";
import { createRoot } from "react-dom/client";

export default function HolaMundo() {
    const [count, setCount] = React.useState(0);

    const changeCount = () => {
        setCount(count + 1);
    };

    return (
        <>
            <h1>Hola Mundo2</h1>
            <button onClick={changeCount}>Cuenta: {count}</button>
        </>
    );
}

if (document.getElementById("root")) {
    createRoot(document.getElementById("root")).render(<HolaMundo />);
}

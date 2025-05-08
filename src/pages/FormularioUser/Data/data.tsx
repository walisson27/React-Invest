import { useState } from "react";



const Data = () => {
    const [inicio, setInicio] = useState("");
    const [final, setFinal] = useState("");

    return (
        <>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="inicio">Data de Início</label>
                    <input
                        type="date"
                        id="inicio"
                        value={inicio}
                        onChange={(e) => setInicio(e.target.value)}
                        className="border border-gray-300 rounded p-2"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="final">Data de Fim</label>
                    <input
                        type="date"
                        id="final"
                        value={final}
                        onChange={(e) => setFinal(e.target.value)}
                        className="border border-gray-300 rounded p-2"
                    />
                </div>
            </div>
        </>
    );
}

export default Data;
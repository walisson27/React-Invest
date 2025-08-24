import { useState } from "react"
import "./invest.css"


const invest = () => {
    return(
        <>
        <nav className="nav-invest">
            <ul>
                <li>Dashboard</li>
                <li>Payments</li>
                <li>Savings</li>
                <li>Investing</li>
            </ul>
        </nav>
        <aside>
            <h2 className="h2-invest">Credit</h2>
            <section className="conta-invest">Conta1</section>
            <section className="conta-invest">conta2</section>
        </aside>
        </>
    )
}



export default invest
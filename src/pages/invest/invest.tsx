import { useState } from "react"
import "../../../reset.css"
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
        <header className="header-invest">
        <aside>
            <h2 className="h2-invest">Credit</h2>
            <section className="conta-invest">Conta1</section>
            <section className="conta-invest">conta2</section>
        </aside>
        <article className="article-invest">
        <section className="current-invest">
            <h2 className="h2-invest">Current Status</h2>
            <div>Disposable Balance

            </div>
        </section>
        <section className="categories-invest">
            <h2 className="h2-invest">Categories</h2>
            <div>Grafico

            </div>
        </section>
        </article>
        </header>

        </>
    )
}



export default invest
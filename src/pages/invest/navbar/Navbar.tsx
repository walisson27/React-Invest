import Link from "next/link"
import "./navbar.css"





const Navbar = () => {
    

    return(
        <>
    <nav className="nav-invest">
        <ul>
          <li><Link href={"./dashboard/Dashboard"}>Dashboard</Link></li>
          <li><Link href={"/payments"}>Payments</Link></li>
          <li><Link href={"/savings"}>Savings</Link></li>
          <li><Link href={"/invest/invest"}>Sair</Link></li>
        </ul>
    </nav>
        
        </>
    )
}



export default Navbar
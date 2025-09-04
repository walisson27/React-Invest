import Link from "next/link"
import "./navbar.css"

interface Modal {
    openModal : boolean
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}


const Navbar = ({openModal, setOpenModal}:Modal) => {
    

    return(
        <>
    <nav className="nav-invest">
        <ul>
          <li><Link href={""} onClick={() => setOpenModal(true)}>Redimentos</Link></li>
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
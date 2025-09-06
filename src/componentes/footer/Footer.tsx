




const Footer = () =>{
    return( 
    <footer className="footer">
        <div className="footer-container">
        <p className="footer-text">© {new Date().getFullYear()} Todos os direitos reservados.</p>
        <div className="footer-links">
        <a href="#">Termos</a>
        <a href="#">Privacidade</a>
        </div>
        </div>
    </footer>
    )
}

export default Footer
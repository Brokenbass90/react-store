
function Footer() {
    return <footer className="page-footer grey darken-4">
        <div className="footer-copyright">
            <div className="container">
                © {new Date().getFullYear()} React studies
                <a className="grey-text text-lighten-4 right" href="#!">Repos</a>
            </div>
        </div>
    </footer>
}

export {Footer}
import Link from "next/link"


function Header() {
    return (
        <div className="header-class">
            <Link href='/'>
                <a className="header-a">Movies</a>
            </Link>
        </div>
    )
}

export default Header;
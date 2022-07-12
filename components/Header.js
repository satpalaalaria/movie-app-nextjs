import Link from "next/link"


function Header() {
    return (
        <div className="header-class">
            <Link href='/'>
                <a className="header-a">Movies</a>
            </Link>
            <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
            </label>
        </div>
    )
}

export default Header;
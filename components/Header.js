import Link from "next/link"


function Header() {
    return (
        <div className="header-class">
            <Link href='/'>
                <a className="header-a">Movies</a>
            </Link>
            <label class="switch">
                <input type="checkbox" />
                <span class="slider round"></span>
            </label>
        </div>
    )
}

export default Header;
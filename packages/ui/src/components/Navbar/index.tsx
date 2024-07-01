import { NavLink } from "react-router-dom"
import './index.css'
import { useContext } from "react"
import { AuthContext } from "../../context"
const Navbar = () => {
    const {token} = useContext(AuthContext)

    let activeStyle = {
        fontWeight: 'bold'
    }

    if(!token) return <></>;

    return (
        <nav className="flex justify-between items-center fixed z-10 w-full py-5 px-8 text-sm font-light top-0 select-none">
            <ul className="flex items-center gap-3">
                <li>
                    <NavLink to={'/'}
                        className={'nav-item'}
                        style={({ isActive }) => isActive ? activeStyle : undefined}
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/movements'}
                    className={'nav-item'}
                     style={({ isActive }) => isActive ? activeStyle : undefined}
                    >
                        Movements
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/stocks'}
                    className={'nav-item'}
                     style={({ isActive }) => isActive ? activeStyle : undefined}
                    >
                        Stocks
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/entry'}
                    className={'nav-item'}
                     style={({ isActive }) => isActive ? activeStyle : undefined}
                    >
                        Entry
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/panel'}
                    className={'nav-item'}
                     style={({ isActive }) => isActive ? activeStyle : undefined}
                    >
                        Panel
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;
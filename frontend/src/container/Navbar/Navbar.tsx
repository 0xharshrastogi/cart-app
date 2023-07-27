import Link from "next/link";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <a className="btn btn-ghost normal-case text-xl">🛒</a>

      <div className="item">
        <ul className="">
          <li>
            <Link href="shop">Shop More</Link>
          </li>

          <li>
            <Link href="cart">Cart</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

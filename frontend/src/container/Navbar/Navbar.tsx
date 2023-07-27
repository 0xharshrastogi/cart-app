import { useUserCart } from "@/hooks/useUserCart";
import Link from "next/link";
import { useEffect } from "react";
import "./Navbar.scss";

const Navbar = () => {
  const cart = useUserCart("1");

  const totalItems = cart.orders.length;

  useEffect(() => {
    if (cart.loading || cart.loadedFromServer) return;
    cart.initializeOrders();
  }, [cart]);

  return (
    <div className="navbar bg-base-100">
      <a className="btn btn-ghost normal-case text-xl">🛒</a>

      <div className="item">
        <ul className="">
          <li>
            <Link href="shop">Shop More</Link>
          </li>

          <li>
            <Link href="cart">
              Cart <div className="badge">{totalItems}</div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

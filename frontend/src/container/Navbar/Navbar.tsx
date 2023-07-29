import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useUserCart } from "@/hooks/useUserCart";
import { userSlice } from "@/redux/user/userSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import "./Navbar.scss";

const Navbar = () => {
  const cart = useUserCart();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const totalItems = cart.orders.length;

  useEffect(() => {
    if (cart.loading || cart.loadedFromServer) return;
    cart.initializeOrders();
  }, [cart]);

  const onLogoutHandler = () => {
    dispatch(userSlice.actions.logout());
    // router.push("/");
  };

  return (
    <div className="navbar bg-base-100">
      <div>
        <span className="navbar-title">Welcome to Cart Dashboard</span>
      </div>

      <div className="item">
        <ul className="">
          <li>
            <Link href="shop">Shop More</Link>
          </li>

          <li>
            <Link href="cart" className="cart-icon">
              Cart
              <sup className="totalitem">
                {totalItems}
                {/* <div className="badge">{totalItems}</div> */}
              </sup>
            </Link>
          </li>
          <li>
            <button className="btn btn-secondary" onClick={onLogoutHandler}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

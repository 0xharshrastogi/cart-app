import { FC, ReactNode } from "react";

import "./CartSection.scss";

type CartSectionProps = FC<{ title: string; children?: ReactNode }>;

const CartSection: CartSectionProps = (props) => {
  return (
    <div className="cart-section-container">
      <header>
        <h1>{props.title}</h1>
      </header>
      <div className="cart-section-content">{props.children}</div>
    </div>
  );
};

export default CartSection;

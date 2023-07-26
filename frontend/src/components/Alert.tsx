import { FC } from "react";

type AlertType = "error" | "info" | "warning";

type AlertFcProps = FC<{
  children: string;
  type?: AlertType;
  hidden?: boolean;
}>;

const AlertTypeIcon: { [key in AlertType]: JSX.Element } = {
  error: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="stroke-current shrink-0 h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  warning: <></>,
  info: <></>,
};

const Alert: AlertFcProps = (props) => {
  return (
    <div
      className={`alert alert-${props.type ?? ""} shadow-inner`}
      style={{ opacity: props.hidden ? 0 : 1 }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="stroke-info shrink-0 w-6 h-6"
      >
        {props.type ? (
          AlertTypeIcon[props.type]
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        )}
      </svg>
      <span>{props.children}</span>
    </div>
  );
};

export default Alert;

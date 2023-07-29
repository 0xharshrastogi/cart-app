import { useAppSelector } from "@/hooks/useAppSelector";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";

type PrivateComponentWrapperProps = {
  redirectTo: string;
  children: JSX.Element;
};

export const PrivateComponentWrapper: FC<PrivateComponentWrapperProps> = (
  props
) => {
  const { isLoggedIn } = useAppSelector((state) => state.User.user);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) return;
    router.push(props.redirectTo);
  }, [isLoggedIn, router, props.redirectTo]);

  return isLoggedIn ? props.children : null;
};

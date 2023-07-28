"use client";
import Alert from "@/components/Alert";
import { AuthenticationApiService } from "@/helper/AuthenticationService";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useForm } from "@/hooks/useForm";
import { userSlice } from "@/redux/user/userSlice";
import { IAuthApiService } from "@/shared/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEventHandler, useEffect, useState } from "react";
import { User } from "shared";

const authApiService: IAuthApiService = new AuthenticationApiService();

const SignupPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [formError, setFormError] = useState<Error | null>(null);
  const form = useForm<User>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (formError == null) return;
    const id = setTimeout(() => {
      setFormError(null);
    }, 2000);
    return () => {
      clearTimeout(id);
    };
  }, [formError]);

  const onSubmitHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    authApiService
      .signup(form.value)
      .then((data) => {
        dispatch(
          userSlice.actions.setUserAuthenticate({
            info: data.user,
            token: data.token,
          })
        );
        router.push("/");
      })
      .catch((err) => setFormError(err));
  };

  return (
    <main className="min-h-screen grid place-items-center">
      <section>
        <form
          className="p-6 backdrop:blur-sm bg-white bg-opacity-50 rounded-md border border-gray-100 shadow-lg w-[25rem]"
          autoComplete="false"
          onSubmit={onSubmitHandler}
        >
          <header className="text-center">
            <div className="mb-4">
              <span className="font-bold text-2xl">Signup</span>
            </div>
            <Alert hidden={formError == null} type="error">
              {formError?.message || ""}
            </Alert>
          </header>
          <div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                autoComplete="first-name"
                required
                placeholder="ex: John"
                className="input input-bordered"
                value={form.value.firstName}
                onChange={form.registerOnChange("firstName")}
              />
              <label className="label">
                <span className="label-text-alt"></span>
                <span className="label-text-alt"></span>
              </label>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="text"
                autoComplete="sir-name"
                required
                placeholder="ex: Smith"
                className="input input-bordered w-full"
                value={form.value.lastName}
                onChange={form.registerOnChange("lastName")}
              />
              <label className="label">
                <span className="label-text-alt"></span>
                <span className="label-text-alt"></span>
              </label>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                autoComplete="email"
                required
                placeholder="Enter your email"
                onChange={form.registerOnChange("email")}
                value={form.value.email}
                className="input input-bordered w-full"
              />
              <label className="label">
                <span className="label-text-alt"></span>
                <span className="label-text-alt"></span>
              </label>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                autoComplete="false"
                required
                placeholder="Enter your password"
                onChange={form.registerOnChange("password")}
                value={form.value.password}
                className="input input-bordered block w-full"
              />
              <label className="label">
                <span className="label-text-alt"></span>
                <span className="label-text-alt"></span>
              </label>
            </div>
          </div>

          <footer className="mt-10">
            <div>
              <button type="submit" className="btn btn-primary btn-block">
                Submit
              </button>
            </div>

            <p className="text-xs mt-4 text-center">
              Already Signed up? {"  "}
              <Link href="login" className="link-primary font-bold">
                Click Here
              </Link>
            </p>
          </footer>
        </form>
      </section>
    </main>
  );
};

export default SignupPage;

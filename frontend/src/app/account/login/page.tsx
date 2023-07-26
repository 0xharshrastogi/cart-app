"use client";
import Alert from "@/components/Alert";
import { useForm } from "@/hooks/useForm";
import Link from "next/link";
import { FormEventHandler } from "react";
import { Credentials } from "shared";

const LoginPage = () => {
  const form = useForm<Credentials>({
    email: "",
    password: "",
  });

  const onSubmitHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    console.log(form.value);
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
              <span className="font-bold text-2xl text-gray-700">Login</span>
            </div>
            <Alert hidden type="error">
              This is alert
            </Alert>
          </header>
          <div>
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
              Already have an account? {"  "}
              <Link href="signup" className="link-primary font-bold">
                Click Here
              </Link>
            </p>
          </footer>
        </form>
      </section>
    </main>
  );
};

export default LoginPage;

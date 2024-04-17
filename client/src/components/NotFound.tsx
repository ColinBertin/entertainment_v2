import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main
      className="relative isolate h-screen"
      id="banner"
      style={{
        backgroundImage: `linear-gradient(rgba(10,10,10,0.90), rgba(0,0,0,0.30)), url(https://images.pexels.com/photos/3566226/pexels-photo-3566226.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
        <p className="text-3xl font-semibold leading-8 text-white">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 text-base lg:text-lg text-white/70 sm:mt-6">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex justify-center">
          <Link
            to="/"
            className="text-sm font-semibold leading-7 text-white hover:text-lg ease-in duration-200"
          >
            <span aria-hidden="true">&larr;</span> Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}

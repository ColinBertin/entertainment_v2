import { ReactNode } from "react";

export default function FormContainer({
  children,
  logo,
}: {
  children: ReactNode;
  logo: string;
}) {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-8 md:gap-16 mx-8">
      <img className="h-8 md:h-10" src={logo} alt="Logo" />
      {children}
    </div>
  );
}

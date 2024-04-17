import { BsExclamationCircleFill } from "react-icons/bs";
import { IoIosCheckmarkCircle } from "react-icons/io";

export default function Alert({
  response,
}: {
  response: { status: boolean; message: string };
}) {
  return (
    <div className="fixed top-4 right-4 z-50">
      {response.status ? (
        <div
          id="alert-3"
          className="flex items-center p-4 mb-4 rounded-lg bg-green-400"
          role="alert"
        >
          <IoIosCheckmarkCircle size={24} />
          <span className="sr-only">Info</span>
          <div className="ml-3 text-sm font-medium">{response.message}</div>
        </div>
      ) : (
        <div
          id="alert-2"
          className="flex items-center p-4 mb-4 rounded-lg bg-red-500"
          role="alert"
        >
          <BsExclamationCircleFill size={20} />
          <span className="sr-only">Info</span>
          <div className="ml-3 text-sm font-medium">{response.message}</div>
        </div>
      )}
    </div>
  );
}

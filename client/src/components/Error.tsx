export default function Error({ errors }: { errors: (Error | null)[] }) {
  return (
    <div>
      {errors?.map((error) => (
        <p>Error...{error?.message}</p>
      ))}
    </div>
  );
}

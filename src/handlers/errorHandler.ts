export default function errorHandler(status: number, error: any) {
  const { message } = error;
  console.log(error);
  return {
    status,
    error,
  };
}

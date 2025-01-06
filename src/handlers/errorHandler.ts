export default function errorHandler(status: number, error: any) {
  console.log(error);
  return {
    status,
    error,
  };
}

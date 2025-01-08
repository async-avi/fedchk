export default function errorHandler(status: number, error: any) {
  return {
    status,
    error,
  };
}

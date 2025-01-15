import jwt from "jsonwebtoken";

export default function jwtDecoder(token: any, desired: any) {
  const decoded: any = jwt.decode(token);
  return decoded[desired];
}

import { decode } from "jsonwebtoken";

export function decodeToken(token: string) {
  const dec = decode(token);
  return dec;
}

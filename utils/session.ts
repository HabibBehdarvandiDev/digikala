import { SignJWT, jwtVerify, type JWTPayload } from "jose";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "spglb5G8kcdbd+0ObLrEtqB1j0OnAAtq96u7KqlkU50="
);

export async function createJWT(
  payload: JWTPayload,
  expiresIn: string = "1h"
): Promise<string> {
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secret);

  return jwt;
}

export async function validateJWT(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    console.error("Invalid or expired JWT:", error);
    return null;
  }
}

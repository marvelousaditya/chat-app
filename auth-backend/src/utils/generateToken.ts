import jwt from "jsonwebtoken";

function generateJwtAndSetCookie(userId: any, res: any) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "15d",
  });
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: false,
  });
}

export default generateJwtAndSetCookie;

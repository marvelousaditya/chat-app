import zod from "zod";
export const userSchema = zod.object({
  username: zod.string(),
  password: zod.string().min(8, { message: "password too short" }),
});

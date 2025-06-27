import zod from "zod";

export const userSchema = zod.object({
  name: zod.string(),
  password: zod.string().min(8, { message: "password too short" }),
});



import { User } from "../models/user.model";

//@ts-ignore
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "username");
    return res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "an error occured" });
  }
};
export default getUsers;

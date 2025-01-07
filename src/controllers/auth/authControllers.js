import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { checkRecordExists, insertRecord } from "../../utils/sqlFunctions.js";

const generateAccessToken = (user_id) =>
  jwt.sign({ user_id }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const register = async (req, res) => {
  const { email, password, role } = req.body;

  // validation is always important
  if (!email || !password) {
    res
      .status(400)
      .json({ error: "Email or Password fields cannot be empty!" });
    return;
  }

  const salt = await bcrypt.genSalt(10);

  // we don't want a plain text password in the database
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = {
    email,
    role,
    password: hashedPassword,
  };

  try {
    // check if user already exists
    const userAlreadyExists = await checkRecordExists("users", "email", email);
    if (userAlreadyExists) {
      res.status(409).json({ error: "Email already exists" });
    } else {
      // create a new user
      const createdUser = await insertRecord("users", user);

      if (role == "consumer") {
        const { name, phone, address, golf_club_size } = req.body;

        const profile = {
          // profileId: uuidv4(),
          name,
          phone,
          address,
          golf_club_size,
          user_id: createdUser.insertId,
        };
        await insertRecord("profiles", profile);
      }

      res.status(201).json({ message: "User created successfully!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res
      .status(400)
      .json({ error: "Email or Password fields cannot be empty!" });
    return;
  }

  try {
    const existingUser = await checkRecordExists("users", "email", email);

    if (existingUser) {
      if (!existingUser[0].password) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }

      const passwordMatch = await bcrypt.compare(
        password,
        existingUser[0].password
      );

      if (passwordMatch) {
        res.status(200).json({
          user: existingUser[0],
          access_token: generateAccessToken(existingUser.user_id),
        });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

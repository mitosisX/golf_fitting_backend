import { insertRecord } from "../../utils/sqlFunctions.js";

export const create = async (req, res) => {
  await insertRecord("fittings", profile);
  res.status(201).json({ message: "User created successfully!" });
};

export const schedule = async (req, res) => {
  const { user_id, date, comments, time } = req.body;

  const saveData = {
    user_id,
    date,
    comments,
    time,
    status: "scheduled",
  };

  await insertRecord("fitting", saveData);
  res.status(200).json({ message: "Scheduled" });
};

import {
  checkRecordExists,
  insertRecord,
  updateRecord,
} from "../../utils/sqlFunctions.js";

export const create = async (req, res) => {
  await insertRecord("fittings", profile);
  res.status(201).json({ message: "User created successfully!" });
};

export const get = async (req, res) => {
  const user_id = req.params.id;
  const profile = await checkRecordExists("profiles", "user_id", user_id);
  res.status(200).json({ data: profile[0] });
};

export const update = async (req, res) => {
  const { user_id, name, address, phone, email, golf_club_size } = req.body;

  try {
    const profile = await checkRecordExists("profiles", "user_id", user_id);

    if (!profile) {
      res.status(404).json({ error: "Profile not found" });
      return;
    }

    const updates = {
      name,
      address,
      phone,
      golf_club_size,
    };

    await updateRecord("users", { email }, "user_id", user_id);
    await updateRecord("profiles", updates, "profile_id", profile.profile_id);
    res.json({ message: "Profile Updated Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

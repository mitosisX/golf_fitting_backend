import {
  checkRecordExists,
  executeRawSQL,
  updateRecord,
} from "../../utils/sqlFunctions.js";

export const updateProfile = async (req, res) => {
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
    await updateRecord("profiles", updates, "user_id", user_id);
    res.json({ message: "Profile Updated Successfully" });
  } catch (error) {
    console.log;
    res.status(500).json({ error: error.message });
  }
};

export const profiles = async (req, res) => {
  const profiles = await executeRawSQL(`SELECT 
    Users.user_id,
    Users.email,
    Profiles.name,
    Profiles.address,
    Profiles.phone,
    Profiles.golf_club_size
    FROM
      Profiles
    JOIN
      Users
    ON
    Profiles.user_id = Users.user_id;
`);

  res.status(200).json({ data: profiles });
};

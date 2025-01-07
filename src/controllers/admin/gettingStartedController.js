import { executeRawSQL, updateRecord } from "../../utils/sqlFunctions.js";

export const viewInfo = async (req, res) => {
  try {
    const info = await executeRawSQL("SELECT * FROM gettingstartedinfo;");

    res.json({ data: info[0] });
  } catch (error) {
    console.log;
    res.status(500).json({ error: error.message });
  }
};

export const updateInfo = async (req, res) => {
  const { content } = req.body;

  try {
    const info = await updateRecord("gettingstartedinfo", { content }, "id", 1);

    res.json({ message: "Content Updated Successfully" });
  } catch (error) {
    console.log(error);
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

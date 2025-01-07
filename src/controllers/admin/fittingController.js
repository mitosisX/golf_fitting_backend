import {
  checkRecordExists,
  executeRawSQL,
  insertRecord,
  updateRecord,
} from "../../utils/sqlFunctions.js";

export const all_fittings = async (req, res) => {
  try {
    const fittings = await executeRawSQL(`
SELECT 
    Users.user_id,
    Users.email,
    Profiles.name,
    Profiles.address,
    Profiles.phone,
    Fittings.fitting_id,
    Fittings.type,
    Fittings.scheduled_date,
    Fittings.status,
    Fittings.comments,
    MAX(FittingProgress.progress_id) AS last_progress_id,
    MAX(FittingProgress.stage) AS last_stage,
    MAX(FittingProgress.timestamp) AS last_timestamp
FROM 
    FittingProgress
JOIN 
    Fittings 
ON 
    FittingProgress.fitting_id = Fittings.fitting_id
JOIN 
    Users 
ON 
    Fittings.user_id = Users.user_id
JOIN 
    Profiles
ON 
    Profiles.user_id = Users.user_id
GROUP BY 
    Fittings.fitting_id
ORDER BY 
    Fittings.scheduled_date ASC;
`);

    res.status(200).json({ data: fittings });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const fitting_progress = async (req, res) => {
  const fitting_id = req.params.id;

  const { status } = req.body;
  try {
    await updateRecord("fittings", { status }, "fitting_id", fitting_id);
    await insertRecord("fittingprogress", { stage: status, fitting_id });

    res.status(200).json({ message: "Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const fittings_for_calendar_view = async (req, res) => {
  try {
    const fittings = await executeRawSQL(`
    SELECT 
    Fittings.fitting_id,
    Users.user_id,
    Profiles.name AS customer_name,
    Profiles.phone AS customer_phone,
    Fittings.type AS fitting_type,
    Fittings.scheduled_date,
    Fittings.status
FROM 
    Fittings
JOIN 
    Users 
ON 
    Fittings.user_id = Users.user_id
JOIN 
    Profiles 
ON 
    Profiles.user_id = Users.user_id
WHERE 
    Fittings.scheduled_date IS NOT NULL
ORDER BY 
    Fittings.scheduled_date ASC;
    `);

    res.status(200).json({ data: fittings });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

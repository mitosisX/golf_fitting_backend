import { checkRecordExists, insertRecord } from "../../utils/sqlFunctions.js";

export const create = async (req, res) => {
  await insertRecord("fittings", profile);
  res.status(201).json({ message: "User created successfully!" });
};

export const consumer_fittings = async (req, res) => {
  const user_id = req.params.id;

  try {
    const fittings = await checkRecordExists("fittings", "user_id", user_id);

    res.status(200).json({ data: fittings });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const fitting_progress = async (req, res) => {
  const fitting_id = req.params.id;

  try {
    const fittings = await checkRecordExists(
      "fittingprogress",
      "fitting_id",
      fitting_id
    );

    res.status(200).json({ data: fittings });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const schedule_swig = async (req, res) => {
  const { user_id, scheduled_date, comments, scheduled_time, type } = req.body;

  const saveData = {
    type,
    user_id,
    scheduled_date,
    comments,
    scheduled_time,
    status: "scheduled",
  };

  try {
    await insertRecord("fittings", saveData);
    res.status(200).json({ message: "Scheduled wig analysis" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const schedule_fitting = async (req, res) => {
  const { user_id, scheduled_date, comments, scheduled_time, type } = req.body;

  const saveData = {
    type,
    user_id,
    scheduled_date,
    comments,
    scheduled_time,
    status: "scheduled",
  };

  try {
    const createdFitting = await insertRecord("fittings", saveData);

    const progressData = {
      fitting_id: createdFitting.insertId,
      stage: "scheduled",
    };

    insertRecord("fittingprogress", progressData);

    res.status(200).json({ message: "Scheduled wig analysis" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

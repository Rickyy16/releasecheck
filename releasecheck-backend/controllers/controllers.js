const pool = require("../db");
const { getStatus } = require("../utils/helper");

// default steps (7 steps)
const DEFAULT_STEPS = [false, false, false, false, false, false, false];

// GET all releases
exports.getReleases = async (req, res) => {
  try {
    const result = await pool.query(" SELECT * FROM releases ORDER BY created_at DESC");

    const data = result.rows.map(r => ({
      ...r,
      status: getStatus(r.steps),
      sldh:""
    }));

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE release
exports.createRelease = async (req, res) => {
  const { name, date, additional_info } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO releases (name, date, additional_info, steps) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, date, additional_info || "", JSON.stringify(DEFAULT_STEPS)]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET single release
exports.getReleaseById = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM releases WHERE id=$1", [req.params.id]);

    if (!result.rows.length) return res.status(404).json({ error: "Not found" });

    const release = result.rows[0];

    res.json({
      ...release,
      status: getStatus(release.steps)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE steps or info
exports.updateRelease = async (req, res) => {
  const { steps, additional_info } = req.body;

  try {
    const result = await pool.query(
      `UPDATE releases 
       SET steps = COALESCE($1, steps),
           additional_info = COALESCE($2, additional_info)
       WHERE id = $3
       RETURNING *`,
      [JSON.stringify(steps), additional_info, req.params.id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE (optional)
exports.deleteRelease = async (req, res) => {
  try {
    await pool.query("DELETE FROM releases WHERE id=$1", [req.params.id]);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
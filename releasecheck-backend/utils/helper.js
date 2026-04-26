function getStatus(steps) {
  const completed = steps.filter(s => s).length;

  if (completed === 0) return "planned";
  if (completed === steps.length) return "done";
  return "ongoing";
}

module.exports = { getStatus };
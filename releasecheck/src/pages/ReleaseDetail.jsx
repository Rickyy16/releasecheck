import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API = "http://localhost:5000";

const STEPS = [
  "Code Freeze",
  "Run Tests",
  "QA Approval",
  "Deploy to Staging",
  "Client Approval",
  "Deploy to Production",
  "Monitoring"
];

export default function ReleaseDetail() {
  const { id } = useParams();
  const [release, setRelease] = useState(null);

  useEffect(() => {
    axios.get(`${API}/releases/${id}`)
      .then(res => setRelease(res.data));
  }, [id]);

  const toggleStep = async (index) => {
    const updatedSteps = [...release.steps];
    updatedSteps[index] = !updatedSteps[index];

    const res = await axios.put(`${API}/releases/${id}`, {
      steps: updatedSteps
    });

    setRelease(res.data);
  };

  if (!release) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>{release.name}</h2>
      <p>Status: <b>{release.status}</b></p>

      <h3>Steps</h3>
      {STEPS.map((step, i) => (
        <div key={i}>
          <input
            type="checkbox"
            checked={release.steps[i]}
            onChange={() => toggleStep(i)}
          />
          {step}
        </div>
      ))}
    </div>
  );
}
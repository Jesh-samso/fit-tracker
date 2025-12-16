import { useState, useEffect } from "react";

function App() {
  const [workouts, setWorkouts] = useState([]);
  const [exercise, setExercise] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");

  const addWorkout = () => {
    if (!exercise || !sets || !reps || !weight) return;

    const newWorkout = {
      exercise,
      sets,
      reps,
      weight,
      date: new Date().toLocaleString(),
    };

    setWorkouts([newWorkout, ...workouts]);

    setExercise("");
    setSets("");
    setReps("");
    setWeight("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Fitness Tracker</h1>

      <h2>Log Workout</h2>

      <input placeholder="Exercise" value={exercise} onChange={(e) => setExercise(e.target.value)} />
      <input placeholder="Sets" value={sets} onChange={(e) => setSets(e.target.value)} />
      <input placeholder="Reps" value={reps} onChange={(e) => setReps(e.target.value)} />
      <input placeholder="Weight (kg)" value={weight} onChange={(e) => setWeight(e.target.value)} />

      <button onClick={addWorkout}>Add Workout</button>

      <h2>Workout History</h2>
      <ul>
        {workouts.map((w, i) => (
          <li key={i}>
            {w.exercise} — {w.sets}x{w.reps} @ {w.weight}kg ({w.date})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

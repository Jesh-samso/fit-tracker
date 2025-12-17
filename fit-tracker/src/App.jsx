import { useState, useEffect } from "react";
import "./App.css";


function App() {

  // Workout states
 
  const [workouts, setWorkouts] = useState([]);
  const [exercise, setExercise] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");


  // WGER API states

  const [exercises, setExercises] = useState([]);
  const [search, setSearch] = useState("");
  const [apiError, setApiError] = useState("");


  // Load saved workouts from localStorage
 
  useEffect(() => {
    const savedWorkouts = JSON.parse(localStorage.getItem("workouts"));
    if (savedWorkouts) {
      setWorkouts(savedWorkouts);
    }
  }, []);

 
  // Save workouts to localStorage whenever they change
 
  useEffect(() => {
    localStorage.setItem("workouts", JSON.stringify(workouts));
  }, [workouts]);


  // Fetch exercises from WGER API
 
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch(
  "https://wger.de/api/v2/exercise/?language=2&limit=50"
);


        if (!response.ok) {
          throw new Error("Failed to fetch exercises");
        }

        const data = await response.json();
        setExercises(data.results);
      } catch (error) {
        setApiError("Unable to load exercises. Please try again later.");
      }
    };

    fetchExercises();
  }, []);


  // Add a new workout
  
  const addWorkout = () => {
    if (!exercise || !sets || !reps || !weight) return;

    const newWorkout = {
      exercise,
      sets: Number(sets),
      reps: Number(reps),
      weight: Number(weight),
      date: new Date().toLocaleString(),
    };

    setWorkouts([newWorkout, ...workouts]);

    // Reset input fields
    setExercise("");
    setSets("");
    setReps("");
    setWeight("");
  };

   // Calculate progress metrics
  
  const totalWorkouts = workouts.length;
  const totalWeight = workouts.reduce(
    (sum, w) => sum + w.weight * w.sets * w.reps,
    0
  );

 
  // Filter exercises safely

  const filteredExercises = exercises.filter(
    (ex) => ex.name && ex.name.toLowerCase().includes(search.toLowerCase())
  );

 
  // Render
  
  return (
    <div className="app">

      <h1>Fitness Tracker</h1>


      {/* Workout Form */}
      <section>
        <h2>Log Workout</h2>
        <input
          type="text"
          placeholder="Exercise"
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
        />
        <input
          type="number"
          placeholder="Sets"
          value={sets}
          onChange={(e) => setSets(e.target.value)}
        />
        <input
          type="number"
          placeholder="Reps"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
        />
        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <button onClick={addWorkout}>Add Workout</button>
      </section>

      {/* Progress */}
      <section>
        <h2>Progress</h2>
        <p>Total Workouts: {totalWorkouts}</p>
        <p>Total Weight Lifted: {totalWeight} kg</p>
      </section>

      {/* Workout History */}
      <section>
        <h2>Workout History</h2>
        <ul>
          {workouts.map((w, i) => (
            <li key={i}>
              <strong>{w.exercise}</strong> — {w.sets}x{w.reps} @ {w.weight}kg
              <br />
              <small>{w.date}</small>
            </li>
          ))}
        </ul>
      </section>

      {/* Exercises from WGER API */}
      <section>
        <h2>Exercises (WGER API)</h2>
        <input
          type="text"
          placeholder="Search exercises"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {apiError && <p className="error">{apiError}</p>}


        <ul>
          {filteredExercises.length === 0 && !apiError && (
            <li>No exercises found.</li>
          )}
          {filteredExercises.map((ex) => (
            <li key={ex.id}>{ex.name}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;

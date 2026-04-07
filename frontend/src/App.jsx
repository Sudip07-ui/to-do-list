import { useState } from 'react';

function App() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const [planner, setPlanner] = useState({
    goal: '',
    appointments: [{ time: '', event: '' }],
    mealTracker: { breakfast: '', lunch: '', dinner: '', snacks: '' },
    waterIntake: 0,
    thingsToDo: '',
    grateful: '',
    notes: '',
    mood: 'happy'
  });

  const savePlanner = () => {
    alert("✅ Your Daily Planner has been saved successfully!");
    console.log("Saved Data:", planner);
  };

  const updateField = (field, value) => {
    setPlanner(prev => ({ ...prev, [field]: value }));
  };

  const addAppointment = () => {
    setPlanner(prev => ({
      ...prev,
      appointments: [...prev.appointments, { time: '', event: '' }]
    }));
  };

  const updateAppointment = (index, key, value) => {
    const newApps = [...planner.appointments];
    newApps[index][key] = value;
    setPlanner(prev => ({ ...prev, appointments: newApps }));
  };

  return (
    <div className="min-h-screen bg-[#e0f2fe] py-8 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-[#bae6fd] px-12 py-16 text-center border-b-4 border-white">
          <h1 className="text-7xl font-bold text-[#1e3a8a]">Daily Planner</h1>
          <p className="text-[#0369a1] text-3xl mt-3">Let's make today special ✨</p>
          <p className="text-2xl text-[#1e40af] mt-6 font-medium">{today}</p>
        </div>

        <div className="p-10 grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Today's Goal */}
          <div className="bg-[#f0f9ff] p-8 rounded-3xl border border-[#bae6fd]">
            <h2 className="text-2xl font-semibold text-[#1e3a8a] mb-4">🌟 Today's Goal</h2>
            <textarea 
              value={planner.goal}
              onChange={(e) => updateField('goal', e.target.value)}
              className="w-full h-40 border border-[#bae6fd] rounded-2xl p-6 text-lg"
              placeholder="What is your main goal for today?"
            />
          </div>

          {/* Appointments */}
          <div className="bg-[#f0f9ff] p-8 rounded-3xl border border-[#bae6fd]">
            <h2 className="text-2xl font-semibold text-[#1e3a8a] mb-4">📅 Today's Appointment</h2>
            {planner.appointments.map((app, index) => (
              <div key={index} className="flex gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Time"
                  value={app.time}
                  onChange={(e) => updateAppointment(index, 'time', e.target.value)}
                  className="w-32 border border-[#bae6fd] rounded-2xl px-4 py-3"
                />
                <input
                  type="text"
                  placeholder="Event"
                  value={app.event}
                  onChange={(e) => updateAppointment(index, 'event', e.target.value)}
                  className="flex-1 border border-[#bae6fd] rounded-2xl px-4 py-3"
                />
              </div>
            ))}
            <button 
              onClick={addAppointment}
              className="text-blue-600 font-medium hover:underline text-sm"
            >
              + Add another appointment
            </button>
          </div>

          {/* Meal Tracker */}
          <div className="bg-[#f0f9ff] p-8 rounded-3xl border border-[#bae6fd]">
            <h2 className="text-2xl font-semibold text-[#1e3a8a] mb-4">🍽️ Meal Tracker</h2>
            {['breakfast', 'lunch', 'dinner', 'snacks'].map((meal) => (
              <div key={meal} className="mb-6">
                <p className="font-medium text-[#1e40af] mb-2">{meal.toUpperCase()}</p>
                <input
                  type="text"
                  value={planner.mealTracker[meal] || ''}
                  onChange={(e) => setPlanner(p => ({
                    ...p,
                    mealTracker: { ...p.mealTracker, [meal]: e.target.value }
                  }))}
                  className="w-full border border-[#bae6fd] rounded-2xl px-5 py-4"
                  placeholder={`What did you have for ${meal}?`}
                />
              </div>
            ))}
          </div>

          {/* Water Intake */}
          <div className="bg-[#f0f9ff] p-8 rounded-3xl border border-[#bae6fd]">
            <h2 className="text-2xl font-semibold text-[#1e3a8a] mb-4">💧 Water Intake</h2>
            <div className="flex gap-4 flex-wrap">
              {[1,2,3,4,5,6,7,8].map(i => (
                <button
                  key={i}
                  onClick={() => updateField('waterIntake', i)}
                  className={`w-14 h-14 rounded-2xl text-4xl border-2 transition-all ${
                    planner.waterIntake >= i ? 'bg-[#bae6fd] border-blue-600 scale-110' : 'bg-white border-gray-200'
                  }`}
                >
                  💧
                </button>
              ))}
            </div>
            <p className="text-center mt-8 text-xl font-medium">
              Drank <span className="text-blue-600 font-bold">{planner.waterIntake}</span> bottles today
            </p>
          </div>

          {/* Grateful For */}
          <div className="bg-[#f0f9ff] p-8 rounded-3xl border border-[#bae6fd]">
            <h2 className="text-2xl font-semibold text-[#1e3a8a] mb-4">🙏 Things I Am Grateful For</h2>
            <textarea 
              value={planner.grateful}
              onChange={(e) => updateField('grateful', e.target.value)}
              className="w-full h-40 border border-[#bae6fd] rounded-2xl p-6"
              placeholder="Write what you're thankful for..."
            />
          </div>

          {/* Notes */}
          <div className="bg-[#f0f9ff] p-8 rounded-3xl border border-[#bae6fd]">
            <h2 className="text-2xl font-semibold text-[#1e3a8a] mb-4">📝 Notes</h2>
            <textarea 
              value={planner.notes}
              onChange={(e) => updateField('notes', e.target.value)}
              className="w-full h-40 border border-[#bae6fd] rounded-2xl p-6"
              placeholder="Any additional notes or reminders..."
            />
          </div>

        </div>

        {/* Save Button */}
        <div className="bg-[#bae6fd] p-12 text-center">
          <button 
            onClick={savePlanner}
            className="bg-red-500 hover:bg-red-600 text-white font-bold text-2xl px-24 py-7 rounded-3xl shadow-xl transition-all active:scale-95"
          >
            Save Today's Planner
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
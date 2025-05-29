let goals = JSON.parse(localStorage.getItem("goals")) || {};
let reports = JSON.parse(localStorage.getItem("reports")) || [];

function saveData() {
  localStorage.setItem("goals", JSON.stringify(goals));
  localStorage.setItem("reports", JSON.stringify(reports));
}

function showToast(message, type = "success") {
  Toastify({
    text: message,
    duration: 3000,
    style: {
      background: type === "success" ? "#2563eb" : "#ef4444",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      fontFamily: "Inter, sans-serif",
    },
  }).showToast();
}

function addGoal() {
  const timeframe = document.getElementById("timeframe").value;
  const subject = document.getElementById("subject").value.trim();
  const chapter = document.getElementById("chapter").value.trim();

  if (!subject || !chapter) {
    showToast("Please enter both subject and chapter.", "error");
    return;
  }

  const goal = {
    subject,
    chapter,
    completed: false,
    timestamp: new Date().toISOString(),
  };
  if (!goals[timeframe]) goals[timeframe] = [];
  goals[timeframe].push(goal);

  document.getElementById("subject").value = "";
  document.getElementById("chapter").value = "";
  saveData();
  updateSubjectFilter();
  renderGoals();
  showToast("Goal added successfully!");
}

function renderGoals() {
  const timeframe = document.getElementById("timeframe").value;
  const container = document.getElementById("goalsContainer");
  container.innerHTML = "";

  const currentGoals = goals[timeframe] || [];
  if (currentGoals.length === 0) {
    container.innerHTML = `<p>No goals set for <strong>${timeframe}</strong>.</p>`;
    return;
  }

  currentGoals.forEach((goal, index) => {
    const div = document.createElement("div");
    div.className = `goal ${goal.completed ? "completed" : ""}`;
    div.innerHTML = `
            <span>${goal.subject} - ${goal.chapter}</span>
            <div class="actions">
                <button onclick="markComplete('${timeframe}', ${index})">✅ ${
      goal.completed ? "Done" : "Mark Done"
    }</button>
                <button onclick="deleteGoal('${timeframe}', ${index})">🗑️ Delete</button>
            </div>
        `;
    container.appendChild(div);

    gsap.from(div, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      delay: index * 0.1,
    });
  });

  // Animate section
  gsap.from("#goals", { opacity: 0, y: 30, duration: 0.6 });
}

function markComplete(timeframe, index) {
  goals[timeframe][index].completed = true;
  saveData();
  renderGoals();
  showToast("Goal marked as complete!");
}

function deleteGoal(timeframe, index) {
  goals[timeframe].splice(index, 1);
  saveData();
  updateSubjectFilter();
  renderGoals();
  showToast("Goal deleted.");
}

function updateSubjectFilter() {
  const subjectFilter = document.getElementById("subjectFilter");
  const allSubjects = new Set();
  Object.values(goals)
    .flat()
    .forEach((goal) => allSubjects.add(goal.subject));

  subjectFilter.innerHTML = '<option value="">All Subjects</option>';
  allSubjects.forEach((subject) => {
    const option = document.createElement("option");
    option.value = subject;
    option.textContent = subject;
    subjectFilter.appendChild(option);
  });
}

function generateTimetable() {
  const timeframe = document.getElementById("timeframe").value;
  const subjectFilter = document.getElementById("subjectFilter").value;
  const container = document.getElementById("timetableContainer");
  container.innerHTML = "";

  let currentGoals = (goals[timeframe] || []).filter(
    (goal) => !subjectFilter || goal.subject === subjectFilter
  );
  if (currentGoals.length === 0) {
    container.innerHTML = `<p>No goals to schedule${
      subjectFilter ? ` for ${subjectFilter}` : ""
    }.</p>`;
    return;
  }

  let days;
  switch (timeframe) {
    case "Daily":
      days = 1;
      break;
    case "Weekly":
      days = 7;
      break;
    case "Monthly":
      days = 30;
      break;
    case "Yearly":
      days = 365;
      break;
  }

  const timeSlots = [
    "Morning (9 AM - 12 PM)",
    "Afternoon (1 PM - 4 PM)",
    "Evening (6 PM - 9 PM)",
  ];
  const goalsPerDay = Math.ceil(currentGoals.length / days);
  let output = "";

  for (let d = 1; d <= days && currentGoals.length > 0; d++) {
    output += `<strong>Day ${d}</strong><ul>`;
    const dayGoals = currentGoals.splice(0, goalsPerDay);
    dayGoals.forEach((goal, i) => {
      const slot = timeSlots[i % timeSlots.length];
      output += `<li>${slot}: ${goal.subject} - ${goal.chapter}</li>`;
    });
    output += `</ul>`;
  }

  container.innerHTML = output;
  gsap.from("#timetable", { opacity: 0, y: 30, duration: 0.6 });
  showToast("Timetable generated!");
}

function generateReport() {
  const timeframe = document.getElementById("timeframe").value;
  const currentGoals = goals[timeframe] || [];
  const total = currentGoals.length;
  const completed = currentGoals.filter((g) => g.completed).length;
  const pending = total - completed;

  const report = {
    timeframe,
    total,
    completed,
    pending,
    timestamp: new Date().toISOString(),
  };

  reports.push(report);
  saveData();

  const modal = document.getElementById("reportModal");
  const historyContainer = document.getElementById("reportHistory");
  historyContainer.innerHTML = reports
    .map(
      (r) => `
        <div class="report-entry">
            <p><strong>${r.timeframe} (${new Date(
        r.timestamp
      ).toLocaleString()}):</strong></p>
            <p>Total: ${r.total}, Completed: ${r.completed}, Pending: ${
        r.pending
      }</p>
        </div>
    `
    )
    .join("");

  modal.style.display = "flex";
  gsap.from(".modal-content", { scale: 0.9, opacity: 0, duration: 0.3 });
  showToast("Report generated!");
}

function closeModal() {
  const modal = document.getElementById("reportModal");
  gsap.to(".modal-content", {
    scale: 0.9,
    opacity: 0,
    duration: 0.3,
    onComplete: () => (modal.style.display = "none"),
  });
}

function downloadReport() {
  const csv = [
    "Timeframe,Total,Completed,Pending,Timestamp",
    ...reports.map(
      (r) =>
        `${r.timeframe},${r.total},${r.completed},${r.pending},${r.timestamp}`
    ),
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "study_goal_report.csv";
  a.click();
  URL.revokeObjectURL(url);
  showToast("Report downloaded!");
}

// Theme toggle
document.getElementById("themeSwitch").addEventListener("change", () => {
  const newTheme = document.getElementById("themeSwitch").checked
    ? "dark"
    : "light";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
});

// Smooth scrolling for nav links
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    } else {
      window.location.href = link.getAttribute("href");
    }
  });
});

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  const currentTheme = localStorage.getItem("theme") || "light";
  if (currentTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    document.getElementById("themeSwitch").checked = true;
  }

  updateSubjectFilter();
  renderGoals();

  document.getElementById("timeframe").addEventListener("change", renderGoals);
  document
    .getElementById("subjectFilter")
    .addEventListener("change", generateTimetable);
});

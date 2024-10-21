export const statusLevels = {
  low: {
    color: "#047857",
    background: "#d1fae5",
    description:
      "Caffeine levels are mild, resulting in a light boost in alertness with minimal side effects.",
    maxLevel: 100,
  },
  moderate: {
    color: "#b45309",
    background: "#fef3c7",
    description:
      "A moderate amount of caffeine leads to noticeable stimulation, increased focus, and potential restlessness.",
    maxLevel: 200,
  },
  high: {
    color: "#e11d48",
    background: "#ffe4e6",
    description:
      "Elevated caffeine levels can cause jitteriness, rapid heartbeat, and trouble concentrating, signaling an excessive intake.",
    maxLevel: 9999,
  },
};

export const teaOptions = [
  { name: "Black Tea", caffeine: 60 },
  { name: "Green Tea", caffeine: 35 },
  { name: "Oolong Tea", caffeine: 40 },
  { name: "Matcha", caffeine: 70 },
  { name: "White Tea", caffeine: 20 },
  { name: "Herbal Tea", caffeine: 0 },
  { name: "Chamomile Tea", caffeine: 0 },
  { name: "Earl Grey Tea", caffeine: 50 },
  { name: "Lemon Lift Tea", caffeine: 40 },
  { name: "Decaf Tea", caffeine: 85 },
];

const halfLifeHours = 5;

export function calculateCurrentCaffeineLevel(historyData) {
  const currentTime = Date.now();
  const halfLife = halfLifeHours * 60 * 60 * 1000; // 5 hours in milliseconds
  const maxAge = 48 * 60 * 60 * 1000; // 48 hours in milliseconds

  let totalCaffeine = 0;

  for (const [timestamp, entry] of Object.entries(historyData)) {
    const timeElapsed = currentTime - parseInt(timestamp);

    // Ignore entries older than 48 hours
    if (timeElapsed <= maxAge) {
      const caffeineInitial = getCaffeineAmount(entry.name);
      // Calculate the remaining caffeine using the half-life formula
      const remainingCaffeine =
        caffeineInitial * Math.pow(0.5, timeElapsed / halfLife);
      totalCaffeine += remainingCaffeine;
    }
  }

  return totalCaffeine.toFixed(2);
}

// Helper function to get caffeine amount based on the tea name
export function getCaffeineAmount(teaName) {
  const tea = teaOptions.find((c) => c.name === teaName);
  return tea ? tea.caffeine : 0;
}

export function getTopThreeTeas(historyData) {
  const teaCount = {};

  // Count occurrences of each tea type
  for (const entry of Object.values(historyData)) {
    const teaName = entry.name;
    if (teaCount[teaName]) {
      teaCount[teaName]++;
    } else {
      teaCount[teaName] = 1;
    }
  }

  // Convert teaCount object to an array of [teaName, count] and sort by count
  const sortedTeas = Object.entries(teaCount).sort((a, b) => b[1] - a[1]);

  // Calculate total teas consumed
  const totalTeas = Object.values(teaCount).reduce(
    (sum, count) => sum + count,
    0
  );

  // Get the top 3 most popular teas
  const topThree = sortedTeas.slice(0, 3).map(([teaName, count]) => {
    const percentage = ((count / totalTeas) * 100).toFixed(2);
    return {
      teaName: teaName,
      count: count,
      percentage: percentage + "%",
    };
  });

  return topThree;
}

export function timeSinceConsumption(utcMilliseconds) {
  const now = Date.now();
  const diffInMilliseconds = now - utcMilliseconds;

  // Convert to seconds, minutes, hours, days, and months
  const seconds = Math.floor(diffInMilliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);

  // Get the remainder for each unit
  const remainingDays = days % 30;
  const remainingHours = hours % 24;
  const remainingMinutes = minutes % 60;
  const remainingSeconds = seconds % 60;

  // Construct the string
  let result = "";
  if (months > 0) result += `${months}M `;
  if (remainingDays > 0) result += `${remainingDays}D `;
  if (remainingHours > 0) result += `${remainingHours}H `;
  if (remainingMinutes > 0) result += `${remainingMinutes}M `;
  if (remainingSeconds > 0 || result === "") result += `${remainingSeconds}S`; // Show seconds even if they're 0 if nothing else exists

  return result.trim(); // Remove any trailing space
}

// This function was added during recording
export function calculateTeaStats(teaConsumptionHistory) {
  const dailyStats = {};
  let totalTeas = 0;
  let totalCost = 0;
  let totalCaffeine = 0;
  let totalDaysWithtea = 0;

  for (const [timestamp, tea] of Object.entries(teaConsumptionHistory)) {
    const date = new Date(parseInt(timestamp)).toISOString().split("T")[0]; // Extract date in YYYY-MM-DD format
    const caffeine = getCaffeineAmount(tea.name);
    const cost = parseFloat(tea.cost);

    // Initialize or update the daily stats
    if (!dailyStats[date]) {
      dailyStats[date] = { caffeine: 0, cost: 0, count: 0 };
    }

    dailyStats[date].caffeine += caffeine;
    dailyStats[date].cost += cost;
    dailyStats[date].count += 1;

    // Update totals
    totalTeas += 1;
    totalCost += cost;
  }

  const days = Object.keys(dailyStats).length;
  for (const stats of Object.entries(dailyStats)) {
    if (stats.caffeine > 0) {
      totalCaffeine += stats.caffeine;
      totalDaysWithtea += 1; // Count days when caffeine was consumed
    }
  }

  // Calculate average daily caffeine and average daily cost
  const averageDailyCaffeine =
    totalDaysWithtea > 0
      ? (totalCaffeine / totalDaysWithtea).toFixed(2)
      : 0;
  const averageDailyCost =
    totalDaysWithtea > 0 ? (totalCost / totalDaysWithtea).toFixed(2) : 0;
  console.log(totalCost, typeof totalCost);
  return {
    daily_caffeine: averageDailyCaffeine,
    daily_cost: averageDailyCost,
    average_cups: (totalTeas / days).toFixed(2),
    total_cost: totalCost.toFixed(2),
  };
}

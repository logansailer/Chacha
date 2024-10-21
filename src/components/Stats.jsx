import { useAuth } from "../context/AuthContext";
import {
  calculateTeaStats,
  calculateCurrentCaffeineLevel,
  getTopThreeTeas,
  statusLevels,
} from "../utils";

function StatCard({ large, title, children }) {
  return (
    <div className={"card stat-card " + (large ? "col-span-2" : "")}>
      <h4>{title}</h4>
      {children}
    </div>
  );
}

export default function Stats() {
  const { globalData } = useAuth();
  const stats = calculateTeaStats(globalData);

  const caffeineLevel = calculateCurrentCaffeineLevel(globalData);
  const warnignLevel =
    caffeineLevel < statusLevels["low"].maxLevel
      ? "low"
      : caffeineLevel < statusLevels["moderate"].maxLevel
      ? "moderate"
      : "high";

  return (
    <>
      <div className="section-header">
        <i className="fa-solid fa-chart-simple" />
        <h2>Stats</h2>
      </div>
      <div className="stats-grid">
        <StatCard large title="Active Caffeine Level">
          <div className="status">
            <p>
              <span className="stat-text">{caffeineLevel}</span>mg
            </p>
            <h5
              style={{
                color: statusLevels[warnignLevel].color,
                background: statusLevels[warnignLevel].background,
              }}
            >
              {warnignLevel}
            </h5>
          </div>
          <p>{statusLevels[warnignLevel].description}</p>
        </StatCard>
        <StatCard title="Daily Caffeine">
          <p>
            <span className="stat-text">{stats.daily_caffeine}</span>mg
          </p>
        </StatCard>
        <StatCard title="Average Number of Cups">
          <p>
            <span className="stat-text">{stats.average_cups}</span>
          </p>
        </StatCard>
        <StatCard title="Daily Cost">
          <p>
            $<span className="stat-text"> {stats.daily_cost}</span>
          </p>
        </StatCard>
        <StatCard title="Total Cost">
          <p>
            $<span className="stat-text"> {stats.total_cost}</span>
          </p>
        </StatCard>
        <table className="stat-table">
          <thead>
            <tr>
              <th>Tea Name</th>
              <th>Number of Purchases</th>
              <th>Percentage of total</th>
            </tr>
          </thead>
          <tbody>
            {getTopThreeTeas(globalData).map((tea, teaIndex) => {
              return (
                <tr key={teaIndex}>
                  <td>{tea.teaName}</td>
                  <td>{tea.count}</td>
                  <td>{tea.percentage}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

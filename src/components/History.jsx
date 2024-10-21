import { useAuth } from "../context/AuthContext";
import {
  calculateCurrentCaffeineLevel,
  getCaffeineAmount,
  timeSinceConsumption,
} from "../utils";

export default function History() {
  const { globalData } = useAuth();

  return (
    <>
      <div className="section-header">
        <i className="fa-solid fa-timeline" />
        <h2>History</h2>
      </div>
      <p>
        <i>Hover for more information!</i>
      </p>
      <div className="tea-history">
        {Object.keys(globalData)
          .sort((a, b) => b - a)
          .map((utcTime, teaIndex) => {
            const tea = globalData[utcTime];
            const timeSinceConsume = timeSinceConsumption(utcTime);
            const originalAmount = getCaffeineAmount(tea.name);
            const remainingAmount = calculateCurrentCaffeineLevel({
              [utcTime]: tea,
            });

            const summary = `${tea.name} | ${timeSinceConsume} | $${tea.cost} | ${remainingAmount}mg / ${originalAmount}mg`;

            return (
              <div title={summary} key={teaIndex}>
                <i className="fa-solid fa-mug-hot" />
              </div>
            );
          })}
      </div>
    </>
  );
}

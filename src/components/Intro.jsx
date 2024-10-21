export default function Hero() {
  return (
    <>
      <h1>Tracking app for Tea Devotees</h1>
      <div className="benefits-list">
        <h3 className="font-bolder">
          Try <span className="text-gradient">Chacha</span> and start...
        </h3>
        <p>✔️ Tracking every tea</p>
        <p>✔️ Measuring caffeine levels</p>
        <p>✔️ Quantifying your addiction</p>
      </div>
      <div className="card info-card">
        <div>
          <i className="fa-solid fa-circle-info"></i>
          <h3>Did you know...</h3>
        </div>
        <h5>That caffeine&apos;s half life is about 5 hours?</h5>
        <p>
          This means that after 5 hours, 1/2 the caffeine you consumed is still
          in your system, keeping you alert longer! So if you drink a cup of
          tea with 50mg of caffeine, 5 hours later you&apos;ll still have
          25mg of caffiene in your system.
        </p>
      </div>
    </>
  );
}

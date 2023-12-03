function Test() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <section>
        <div>
          <h1>Withdrawable Cash Balance</h1>
          <h2>$16,000</h2>
        </div>
        <div>
          <ul>
            <li>
              <span>Total Cash</span> <span content="100">$100</span>
            </li>
            <li>
              <span>Settled Deposits</span> <span content="100">$100</span>
            </li>
            <li>
              <span>In Transit Deposits</span> <span content="100">$100</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Test;

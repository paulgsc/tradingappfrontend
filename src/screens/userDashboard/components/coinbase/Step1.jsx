function Step1() {
  return (
    <section>
      <h1 className="text-xl 2xl:text-2xl font-bold">
        Coinbase Trading API using OAuth2 Authentication
      </h1>
      <hr className="mt-1.5 mb-6" />
      <h6 className="font-medium">
        By following these steps you will be granting this app access to your
        account.
      </h6>
      <div className="mt-4">
        <p>
          This third party app, allows you to create a coinbase bot to
          programatically peform actions. You can create custom bots that are
          able to perform various actions such as track crypto prices, send buy
          sell signals, buy and sell crypto, etc. Follow these steps to set what
          actions you wish to perform.
        </p>
      </div>
    </section>
  );
}

export default Step1;

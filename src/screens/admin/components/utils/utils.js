export const createGroups = (data) => {
    const categories = [
      {
        title: "User",
        key: "user_count",
      },
      {
        title: "Transfer Sweep",
        key: "transfer_amount",
      },
      {
        title: "Booking",
        key: "order_amount",
      },
      {
        title: "Account",
        key: "account_count",
      },
    ];
  
    const metrics = categories.map((item) => {
      let groupedData = {};
  
      if (data) {
        Object.keys(data).map((key) => {
          if (key.includes(item.key)) {
            groupedData = {
              ...groupedData,
              title: item.title,
              metrics: {
                ...groupedData.metrics,
                key: data[key],
                default: data[`total_${item.key}`],
              },
            };
          }
        });
      }
      return groupedData;
    });
  
    return metrics;
  };
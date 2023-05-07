import React, { useEffect } from "react";
import { Card } from "../../components/cards/Card";
import TransfersTable from "../../components/tables/TransfersTable";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrders,
  fetchTransactions,
  fetchTransfers,
} from "../../contexts/redux/actions/fetchDataActions";
import Spinner from "../../components/loading/Spinner";

function History() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.fetchData);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  return (
    <Card className="ht-container-100vh wd-50vw">
      <Card.Title>History</Card.Title>
      <Card.Header className="flx bm-brd-container-gr ">
        <Card.Description className="rt-lft-mg-2">
          All Transactions
        </Card.Description>
        <Card.Description className="rt-lft-mg-2">
          Account Events
        </Card.Description>
        <Card.Description className="rt-lft-mg-2">
          Site updates
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <div className="rt-lft-mg-2">
          <span className="rt-lft-mg-2">This Month</span>
          <span className="rt-lft-mg-2">Pending</span>
          <span className="rt-lft-mg-2">Complete</span>
        </div>
        <div className="rt-lft-mg-2">
          <span>some filters!</span>
        </div>
        <div>{loading ? <Spinner /> : <TransfersTable />}</div>
      </Card.Content>
    </Card>
  );
}

export default History;

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
    <Card className="ht-container-100vh">
      <Card.Title className="z-mx pos-fxd history_container bg-wht bx-shd-brd-1 pd-10 ft-bldr">
        History
      </Card.Title>
      <div className="history_content absolute-container">
        <Card.Header className="pos-fxd flx bm-brd-container-gr zndx-2 bg-wht">
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
        <Card.Content className="">
          <div className="pos-fxd history_filters">
            <div className="rt-lft-mg-2">
              <span className="rt-lft-mg-2">This Month</span>
              <span className="rt-lft-mg-2">Pending</span>
              <span className="rt-lft-mg-2">Complete</span>
            </div>
            <div className="rt-lft-mg-2">
              <span>some filters!</span>
            </div>
          </div>
          <div className="history_table__content">
            {loading ? <Spinner /> : <TransfersTable />}
          </div>
        </Card.Content>
      </div>
    </Card>
  );
}

export default History;

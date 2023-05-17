import React from "react";
import SearchNavbar from "../components/navbar/SearchNavbar";
import PropertyRow from "../components/cards/PropertyRow";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPropertyRows } from "../contexts/redux/actions/fetchPropertyActions";
import { useMemo } from "react";

function Listings() {
  const { propertyInfo = {} } = useSelector((state) => state.propertyData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPropertyRows());
  }, [dispatch]);

  const memoizedPropertyRow = useMemo(() => {
    return <PropertyRow payload={propertyInfo} maxCol={4} />;
  }, [propertyInfo]);

  return (
    <div className="bg-wht-smk relative-container">
      <div className="fixed-zero-container pd-tp-bt-2 bg-wht-smk">
        <SearchNavbar className="listings_nav" />
      </div>

      <div className="mg-top-10 pd-tp-10-ms">{memoizedPropertyRow}</div>
    </div>
  );
}

export default Listings;

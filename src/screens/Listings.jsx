import React from "react";
import SearchNavbar from "../components/navbar/SearchNavbar";
import Property from "../components/cards/Property";
import PropertyRow from "../components/cards/PropertyRow";
import { db_properties } from "../constants/db/property";

function Listings() {
  return (
    <div className="bg-wht-smk relative-container">
      <div className="fixed-zero-container pd-tp-bt-2 bg-wht-smk">
        <SearchNavbar className="listings_nav" />
      </div>

      <div className="mg-top-10 pd-tp-10-ms">
        <PropertyRow payload={db_properties} maxCol={4} />
      </div>
    </div>
  );
}

export default Listings;

import { useSelector } from "react-redux";
import { getSelectedPropertyById } from "../../contexts/redux/selectors/propertySelectors";
import "./property.css";
function Property() {
  const { orderInfo: { propertyId = "" } = {} } = useSelector(
    (state) => state.trade
  );
  const {
    id = "",
    price_per_share = "",
    available_shares = "",
    url = "",
    property_name = "",
    property_address = "",
  } = useSelector((state) => getSelectedPropertyById(state, propertyId || 49));
  return (
    <div className="property__container">
      <ul>
        <li>
          <img src={url} alt="Search For a Property" />
        </li>
        <li>{property_address}</li>
        <li>{property_name}</li>
      </ul>
    </div>
  );
}

export default Property;

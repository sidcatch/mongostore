import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import alertStyles from "./Alert.module.css";

//alertType: "success"/"fail". Not used yet.
const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <div key={alert.id} className={alertStyles.alert}>
      {alert.msg}
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);

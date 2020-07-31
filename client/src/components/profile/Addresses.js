import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
//import { } from "../../actions/auth";
import PropTypes from "prop-types";

import Address from "./Address";

import cx from "classnames";
import addressStyles from "./Address.module.css";

import axios from "axios";

//can become a form or simply a display. reuse this in checkout
const Addresses = ({ token, showHeader, selectable, onSelect, selected }) => {
  const [addresses, setAddresses] = useState([]);
  const [addressToAdd, setAddressToAdd] = useState(null);
  const [selectedAddress, selectAddress] = useState(null);

  useEffect(() => {
    (async () => {
      const config = {
        headers: {
          "x-auth-token": token,
        },
      };
      try {
        if (token) {
          const res = await axios.get("/api/profile/addresses", config);
          let addresses = res.data.map((address) => ({
            ...address,
            savedName: address.name,
            savedMobile: address.mobile,
            savedAddress: address.address,
            savedCity: address.city,
            savedState: address.state,
            savedPincode: address.pincode,
            editable: true,
            edit: false,
            loading: false,
            hasEmptyField: false,
          }));

          setAddresses(addresses);
        }
      } catch (err) {
        console.log(err);
        if (err.response) {
          const error = err.response.data;
          console.log(error);
        }
      }
    })();
  }, [token]);

  const onSubmit = async (e, id) => {
    e.persist();
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };

    if (id) {
      try {
        setAddresses((prevState) =>
          prevState.map((address) => {
            if (address._id === id) return { ...address, loading: true };
            return address;
          })
        );
        let addr = addresses.find((address) => address._id === id);

        const { name, mobile, address, city, state, pincode } = addr;

        const res = await axios.put(
          "/api/profile/address",
          { id, name, mobile, address, city, state, pincode },
          config
        );
        setAddresses((prevState) =>
          prevState.map((address) => {
            if (address._id === id)
              return {
                ...address,
                loading: false,
                edit: false,
                name: res.data.name,
                mobile: res.data.mobile,
                address: res.data.address,
                city: res.data.city,
                state: res.data.state,
                pincode: res.data.pincode,
                savedName: res.data.name,
                savedMobile: res.data.mobile,
                savedAddress: res.data.address,
                savedCity: res.data.city,
                savedState: res.data.state,
                savedPincode: res.data.pincode,
              };
            return address;
          })
        );
      } catch (err) {
        setAddresses((prevState) =>
          prevState.map((address) => {
            if (address._id === id)
              return {
                ...address,
                loading: false,
                editable: true,
                edit: false,
                name: address.savedName,
                mobile: address.savedMobile,
                address: address.savedAddress,
                city: address.savedCity,
                state: address.savedState,
                pincode: address.savedPincode,
              };
            return address;
          })
        );

        console.log(err);
      }
    } else {
      try {
        setAddressToAdd((prevState) => ({ ...prevState, loading: true }));

        const { name, mobile, address, city, state, pincode } = addressToAdd;

        const res = await axios.post(
          "/api/profile/address",
          { name, mobile, address, city, state, pincode },
          config
        );

        setAddresses((prevState) => {
          let newAddress = {
            _id: res.data._id,
            name: res.data.name,
            mobile: res.data.mobile,
            address: res.data.address,
            city: res.data.city,
            state: res.data.state,
            pincode: res.data.pincode,
            savedName: res.data.name,
            savedMobile: res.data.mobile,
            savedAddress: res.data.address,
            savedCity: res.data.city,
            savedState: res.data.state,
            savedPincode: res.data.pincode,
            editable: true,
            edit: false,
            loading: false,
            hasEmptyField: false,
          };
          return [newAddress, ...prevState];
        });

        setAddressToAdd(null);
      } catch (err) {
        console.log("failed to add address");
        setAddressToAdd((prevState) => ({ ...prevState, loading: false }));
        console.log(err);
      }
    }
  };

  const showAddressToAddForm = () => {
    setAddressToAdd({
      _id: null,
      /* name: "Altaf Khan",
      mobile: "9876758475",
      address: "Steel street, downally above sultan bridge",
      city: "Warangal",
      state: "Telengana",
      pincode: "30000", */
      name: "",
      mobile: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      loading: false,
      editable: true,
      edit: true,
    });
  };

  const hasEmptyField = (id) => {
    if (id) {
      let addr = addresses.find((address) => address._id === id);
      let { name, mobile, address, city, state, pincode } = addr;
      if (
        name === "" ||
        mobile === "" ||
        address === "" ||
        city === "" ||
        state === "" ||
        pincode === ""
      )
        return true;
      else return false;
    } else {
      let { name, mobile, address, city, state, pincode } = addressToAdd;
      if (
        name === "" ||
        mobile === "" ||
        address === "" ||
        city === "" ||
        state === "" ||
        pincode === ""
      )
        return true;
      else return false;
    }
  };

  const onChange = (e, id) => {
    e.persist();

    if (id) {
      setAddresses((prevState) =>
        prevState.map((address) => {
          if (address._id === id)
            return { ...address, [e.target.name]: e.target.value };
          return address;
        })
      );
    } else {
      setAddressToAdd((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const toggleEdit = (e, id) => {
    e.persist();
    e.preventDefault();
    e.stopPropagation();

    if (id) {
      setAddresses((prevState) =>
        prevState.map((address) => {
          if (address._id === id)
            return {
              ...address,
              edit: !address.edit,
              name: address.savedName,
              mobile: address.savedMobile,
              address: address.savedAddress,
              city: address.savedCity,
              state: address.savedState,
              pincode: address.savedPincode,
            };
          return address;
        })
      );
    } else {
      setAddressToAdd(null);
    }
  };

  const onDelete = async (id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };

    try {
      setAddresses((prevState) =>
        prevState.map((address) => {
          if (address._id === id) return { ...address, loading: true };
          return address;
        })
      );

      const res = await axios.delete(`/api/profile/address/${id}`, config);

      setAddresses((prevState) =>
        prevState.filter((address) => address._id !== res.data)
      );
    } catch (err) {
      setAddresses((prevState) =>
        prevState.map((address) => {
          if (address._id === id) return { ...address, loading: false };
          return address;
        })
      );

      if (err.response) {
        console.log(err.response.data);
      }

      console.log(err);
    }
  };

  if (selected) {
    return (
      <section className={addressStyles.addressContainer}>
        <Address
          id={selectedAddress._id}
          name={selectedAddress.name}
          mobile={selectedAddress.mobile}
          address={selectedAddress.address}
          city={selectedAddress.city}
          state={selectedAddress.state}
          pincode={selectedAddress.pincode}
          editable={selectedAddress.editable}
          edit={selectedAddress.edit}
          loading={selectedAddress.loading}
        />
      </section>
    );
  }

  return (
    <Fragment>
      {showHeader && (
        <h2 id={addressStyles.manageAddresses}>Manage Addresses</h2>
      )}
      {/* <div className={addressStyles.addAddressContainer}></div> */}
      {!addressToAdd ? (
        <button
          className={addressStyles.addAddress}
          onClick={showAddressToAddForm}
        >
          + ADD ADDRESS
        </button>
      ) : (
        <section className={addressStyles.addressContainer}>
          <Address
            id={addressToAdd._id}
            name={addressToAdd.name}
            mobile={addressToAdd.mobile}
            address={addressToAdd.address}
            city={addressToAdd.city}
            state={addressToAdd.state}
            pincode={addressToAdd.pincode}
            editable={addressToAdd.editable}
            edit={addressToAdd.edit}
            loading={addressToAdd.loading}
            hasEmptyField={hasEmptyField(addressToAdd._id)}
            deletable={false}
            toggleEdit={toggleEdit}
            onChange={onChange}
            onSubmit={onSubmit}
          />
        </section>
      )}

      <div className={addressStyles.addresses}>
        {addresses.map(
          ({
            _id,
            name,
            mobile,
            address,
            city,
            state,
            pincode,
            editable,
            edit,
            loading,
          }) => (
            <section
              className={cx(addressStyles.addressContainer, {
                [addressStyles.selectableAddressContainer]: selectable,
              })}
              onClick={() => {
                if (selectable && !edit) {
                  onSelect(_id);
                  selectAddress({
                    _id,
                    name,
                    mobile,
                    address,
                    city,
                    state,
                    pincode,
                    editable: false,
                    edit: false,
                    loading: false,
                  });
                }
              }}
              key={_id}
            >
              <Address
                id={_id}
                name={name}
                mobile={mobile}
                address={address}
                city={city}
                state={state}
                pincode={pincode}
                editable={editable}
                edit={edit}
                loading={loading}
                hasEmptyField={hasEmptyField(_id)}
                toggleEdit={toggleEdit}
                onChange={onChange}
                onSubmit={onSubmit}
                onDelete={onDelete}
              />
            </section>
          )
        )}
      </div>
    </Fragment>
  );
};

Addresses.defaultProps = {
  showHeader: true,
  selectable: false,
};

Addresses.propTypes = {
  token: PropTypes.string,
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

export default connect(mapStateToProps)(Addresses);

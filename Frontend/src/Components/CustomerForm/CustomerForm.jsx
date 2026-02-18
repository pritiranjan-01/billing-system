import "./CustomerForm.css";
const CustomerForm = ({
  customerName,
  mobileNumber,
  setCustomerName,
  setMobileNumber,
}) => {
  return (
    <div className="p-2">
      <div className="mb-3">
        <div className="d-flex align-items-center gap-2">
          <label htmlFor="customerName" className="col-4">
            Customer Name
          </label>
          <input
            type="text"
            className="form-control form-control-sm"
            id="customerName"
            name= "customerName"
            placeholder="Enter Customer Name"
            onChange={(e) => setCustomerName(e.target.value)}
            value={customerName}
            required
          />
        </div>
      </div>
      <div className="mb-3">
        <div className="d-flex align-items-center gap-2">
          <label htmlFor="customerMobile" className="col-4">
            Mobile Number
          </label>
          <input
            type="number"
            name="mobileNumber"
            className="form-control form-control-sm"
            id="customerMobile"
            placeholder="Enter Mobile Number"
            onChange={(e) => setMobileNumber(e.target.value)}
            value={mobileNumber}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerForm;

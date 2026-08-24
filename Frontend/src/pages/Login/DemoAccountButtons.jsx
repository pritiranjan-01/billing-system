const demoAccounts = [
  {
    label: "Demo admin",
    icon: "bi-shield-check",
    email: "admin@gmail.com",
    password: "Admin@1234",
  },
  {
    label: "Demo user",
    icon: "bi-person",
    email: "user@gmail.com",
    password: "User@1234",
  },
];

const DemoAccountButtons = ({ onSelect }) => (
  <section className="demo-account-buttons mt-2" aria-label="Demo account login">
    <div className="d-flex gap-2">
      {demoAccounts.map(({ label, icon, email, password }) => (
        <button
          key={email}
          type="button"
          className="btn btn-outline-secondary flex-fill demo-account-button"
          onClick={() => onSelect({ email, password })}
        >
          <i className={`bi ${icon}`} aria-hidden="true" />
          <span>{label}</span>
        </button>
      ))}
    </div>
  </section>
);

export default DemoAccountButtons;

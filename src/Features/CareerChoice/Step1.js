import { CancelRounded } from "@mui/icons-material";

export const Step1 =({
  search,
  onSearch,
  filteredRoles,
  selectedRole,
  onSelectRole,
  onContinue,
  openModal,
  firstPillRef,
}) => {
  return (
    <>
      <div className="title pop">
        <div>
          <h2 className="career-title">My Career Choice</h2>
          <p className="subtitle">
            Choose a Role to explore or jump into a Skills Check
          </p>
        </div>
        <div className="badges">
          <span className="badge">Step 1 of 2</span>
        </div>
      </div>

      <div className="search">
        <input
          type="search"
          placeholder="Search roles…"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <div className="grid">
        {filteredRoles
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((role, idx) => {
            const pressed = selectedRole?.id === role.id;
            return (
              <button
                key={role.id}
                className="pill"
                role="button"
                aria-pressed={pressed}
                onClick={() => onSelectRole(role)}
                ref={idx === 0 ? firstPillRef : undefined}
                style={{ alignItems: "center" }}
              >
                <span className="icon" aria-hidden="true" sx={{ mt: 0 }}>
                  {pressed ? "✅" : "🟠"}
                </span>
                <span className="label">{role.name}</span>
                <span className="label ml-auto-imp" style={{ width: "30px" }}>
                  {pressed && (
                    <CancelRounded
                      style={{ position: "relative", zIndex: 1 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectRole(null);
                      }}
                    />
                  )}
                </span>
              </button>
            );
          })}
      </div>

      <div className="cta">
        <div></div>
        <div className="btn-container">
          <button
            className="btn btn-primary"
            disabled={!selectedRole}
            onClick={onContinue}
          >
            Continue →
          </button>
        </div>
      </div>
      <button className="btn btn-outline skill-check-cta" onClick={openModal}>
        ⚙️ Skills Check
      </button>
    </>
  );
}
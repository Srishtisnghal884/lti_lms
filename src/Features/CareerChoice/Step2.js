import { CancelRounded } from "@mui/icons-material";
import Loading from "../../Components/Loading";

export const Step2 =({
  role,
  search,
  onSearch,
  selectedSkill,
  onToggleSkill,
  onBack,
  onStart,
  firstPillRef,
  openModal,
  isLoading,
}) => {
  return (
    <>
    <Loading open={isLoading} />
      <div className="title pop">
        <div>
          <h2>{role.name}</h2>
          <p className="subtitle">
            Select a specific skill or sub‑role to assess
          </p>
        </div>
        <div className="badges">
          <span className="badge">Step 2 of 2</span>
          <span className="badge">{role.name}</span>
        </div>
      </div>

      <div className="search">
        <input
          type="search"
          placeholder="Search skills within this role…"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <div className="grid">
        {role.items
          .sort((a, b) => a?.name?.localeCompare(b?.name))
          .filter((s) =>
            s?.name?.toLowerCase().includes((search || "").toLowerCase())
          )
          .map((skill, idx) => {
            const pressed = selectedSkill === skill?.assessment_name;
            return (
              <button
                key={skill?.assessment_name}
                className="pill"
                aria-pressed={pressed}
                onClick={() => onToggleSkill(skill?.assessment_name)}
                ref={idx === 0 ? firstPillRef : undefined}
                style={{ alignItems: "center" }}
              >
                <span className="icon" aria-hidden="true" sx={{ mt: 0 }}>
                  {pressed ? "✅" : "🟠"}
                </span>
                <span className="label">{skill.name}</span>
                <span className="label ml-auto-imp" style={{ width: "30px" }}>
                  {pressed && (
                    <CancelRounded
                      style={{ position: "relative", zIndex: 1 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSkill(null);
                      }}
                    />
                  )}
                </span>
              </button>
            );
          })}
      </div>

      <div className="cta">
        <button className="btn btn-outline" onClick={onBack}>
          ← Back
        </button>
        <div>
          <button
            className="btn btn-primary"
            disabled={!selectedSkill}
            onClick={onStart}
          >
            {isLoading ? "Loading..." : "Start Assessment"}
          </button>
        </div>
      </div>
      <div>
        <button className="btn btn-outline skill-check-cta" onClick={openModal}>
          ⚙️ Skills Check
        </button>
      </div>
    </>
  );
}
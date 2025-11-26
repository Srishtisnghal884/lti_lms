import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useGetLogoIconQuery } from "../Features/Admin/adminApiSlice";

const MainLogo = ({ height = 40, width = "auto", className = "" }) => {
    const { data: apiData } = useGetLogoIconQuery();
    const [localLogo, setLocalLogo] = useState(
        JSON.parse(localStorage.getItem("userData"))?.logo || null
    );

    // Listen for logoUpdated event
    useEffect(() => {
        const handleLogoUpdate = () => {
            const updatedData = JSON.parse(localStorage.getItem("userData"));
            setLocalLogo(updatedData?.logo || null);
        };

        window?.addEventListener("logoUpdated", handleLogoUpdate);
        return () => window?.removeEventListener("logoUpdated", handleLogoUpdate);
    }, []);

    const apiLogo = apiData?.data?.logo;
    const finalLogo = apiLogo || localLogo;

    return (
        <>
            {finalLogo ? (
                <img
                    height={height}
                    width={width}
                    src={finalLogo}
                    alt="Logo"
                    className={className}
                />
            ) : (
                <Typography
                    variant="h6"
                    component="h4"
                    sx={{
                        fontWeight: 500,
                        textAlign: "left",
                        width: "100%",
                        maxWidth: "400px",
                        mr: "auto",
                        mt: 2,
                        whiteSpace: "break-spaces",
                        "@media (max-width: 900px)": {
                            textAlign: "left",
                        },
                    }}
                >
                    Employability <br /> Advantage
                </Typography>
            )}
        </>
    );
};

export default MainLogo;

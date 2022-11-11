import { Box, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import PublicIcon from "@mui/icons-material/Public";
import ResponsiveAppBar from "../Navbar/Navbar";
import HorizontalMenu from "../HorizontalMenu/HorizontalMenu";
import { EventMenuItems } from "../../constants/menuItems";

const TopNavbar = () => {
  return (
    <>
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          width: "250px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PublicIcon
          sx={{
            display: { xs: "none", md: "flex" },
            mr: 1,
            color: "white",
          }}
        />
        <Link
          component={RouterLink}
          to="/"
          color="inherit"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontWeight: 700,
            fontSize: "1.3rem",
            letterSpacing: ".1rem",
            color: "white",
            textDecoration: "none",
          }}
        >
          GeoEvents
        </Link>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          background: "rgb(36,35,48)",
        }}
      >
        <ResponsiveAppBar />
      </Box>
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <HorizontalMenu items={EventMenuItems} />
      </Box>
    </>
  );
};

export default TopNavbar;

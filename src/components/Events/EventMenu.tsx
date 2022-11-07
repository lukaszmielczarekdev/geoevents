import { Box } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import CheckIcon from "@mui/icons-material/Check";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export const EventMenu = () => {
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(1),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "15ch",
      },
    },
  }));

  return (
    <Box sx={{ width: "100%", background: "rgb(35,35,48)", color: "white" }}>
      <CardContent
        sx={{
          padding: "8px",
        }}
      >
        <Typography sx={{ fontSize: 14 }} color="rgb(120,120,126)" gutterBottom>
          {new Date().toLocaleString("en-US")}
        </Typography>
        <Typography
          variant="h5"
          component="div"
          sx={{ fontWeight: "bold", mb: 1.5 }}
        >
          Events
        </Typography>
        <Typography
          variant="body2"
          sx={{
            paddingTop: "0.5rem",
            fontWeight: "bold",
          }}
        >
          Filters
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <Search
          sx={{
            marginLeft: "0 !important",
            marginRight: "0.5rem !important",
            marginTop: "0.5rem !important",
          }}
        >
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
        <Button
          variant="contained"
          startIcon={<TravelExploreIcon />}
          sx={{
            background: "rgb(68,68,80)",
            marginLeft: "0 !important",
            marginRight: "0.5rem !important",
            marginTop: "0.5rem !important",
          }}
        >
          Discover
        </Button>
        <Button
          variant="outlined"
          startIcon={<CheckIcon />}
          sx={{
            border: "1px solid rgb(68,68,80)",
            marginLeft: "0 !important",
            marginRight: "0.5rem !important",
            marginTop: "0.5rem !important",
          }}
        >
          Joined
        </Button>
        <Button
          variant="outlined"
          startIcon={<AccessTimeIcon />}
          sx={{
            border: "1px solid rgb(68,68,80)",
            marginLeft: "0 !important",
            marginRight: "0.5rem !important",
            marginTop: "0.5rem !important",
            color: "rgb(235, 110, 105)",
          }}
        >
          Ending
        </Button>
      </CardActions>
    </Box>
  );
};

export default EventMenu;

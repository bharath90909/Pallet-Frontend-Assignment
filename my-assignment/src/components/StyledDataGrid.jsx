import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    border: 0,
    color: theme.palette.text.primary,
    "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-columnHeader:focus-within":
      {
        outline: "none !important",
      },
    width: "100% !important",
    "& .MuiDataGrid-main": {
      width: "100% !important",
    },
    "& .MuiDataGrid-virtualScroller": {
      width: "100% !important",
    },
    "& .MuiDataGrid-virtualScrollerContent": {
      width: "100% !important",
    },
    "& .MuiDataGrid-virtualScrollerRenderZone": {
      width: "100% !important",
    },
    "& .MuiDataGrid-row": {
      width: "100% !important",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.04)",
      },
    },
    "& .MuiDataGrid-cell": {
      borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
    },
    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: "transparent",
      borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
      borderTop: "1px solid rgba(255, 255, 255, 0.12)",
      fontWeight: 600,
    },
    "& .MuiDataGrid-footerContainer": {
      borderTop: "none",
    },
  }));

  export default StyledDataGrid;
import React, { useEffect, useState } from "react";
import { Box, } from "@mui/material";

function CustomContainer({ children }) {
  return (
    <Box px={4}>

          {children}

    </Box>
  );
}

export default CustomContainer;

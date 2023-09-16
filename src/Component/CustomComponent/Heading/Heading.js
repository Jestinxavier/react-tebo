import React, { useEffect, useState } from "react";
import { Box, Fade, Typography } from "@mui/material";

function Heading({ children }) {
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(true);
    return () => setChecked(false);
  }, []);

  return (
    <Box mt={"7%"}>
      <Fade in={checked}>
        <Typography variant="h4" gutterBottom>
          {children}
        </Typography>
      </Fade>
    </Box>
  );
}

export default Heading;

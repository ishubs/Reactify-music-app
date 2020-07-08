import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import InputBase from "@material-ui/core/InputBase";
function Search(props) {
  return (
      <Grid item xs={12} sm={6} >
          <Paper
      variant="elevation"
      elevation={11}
    
      justifyContent="center">
        <InputBase
            style={{ border: "Blue" }}
            type="text"
            onChange={props.onChangeHandler}
            placeholder="Search a Track" />
    </Paper>
      </Grid>
    
  );
}

export default Search;

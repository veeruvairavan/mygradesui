import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function CircularProgressWithLabel(props) {
  return (
    <Box position="relative" display="inline-flex" margin="5px">
      <CircularProgress color={props.value >= 80 ? "primary" :  "secondary"} variant="static" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {
          !props.custom ? 
          (<Typography variant={props.variant ? props.variant : "h5"} component="div" color="textSecondary">{`${Math.round(
            props.value,
          )}%`}</Typography>) :

          <Typography variant={props.variant ? props.variant : "h5"}  component="div" color="textSecondary">{props.txt}</Typography>
          }
        
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and static variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};
import * as React from 'react';
import { Card, CardActions, CardContent, Typography, Button } from '@material-ui/core';
import Pagination from '@mui/material/Pagination';

export default function DisplayInfo(props) {
  
  let start = 0;
  let end = 9;
  let styles = {
    display: 'flex',
    width: '80%',
    height: '100vh',
    margin: 'auto'
  };

  let cardStyle = {
    width: '40em',
    height: 'auto',
    margin: 'auto'
  }
  const [page, setPage] = React.useState(1);
  const [cardContentResponse, setCardContentResponse] = React.useState(props.response.results.slice(start, end));

  let handlePaginationChange = function(event, value) {
    start = (value - 1) * 10;
    end = (value * 10) - 1;
    setCardContentResponse(props.response.results.slice(start, end));
    setPage(value);
  };

  let getPageCount = function() {
    return Math.floor(props.response.results.length / 10) + 1;
  };

  if(props.showingInfoWindow) {
    if(props.response.results.length > 0 ) {
      return <Card style={cardStyle}>
      <CardContent>
        <Typography>{'Rating: ' + props.response.rating}</Typography>
        {cardContentResponse.map(res => (
          <Card>
            <CardContent>
              <Typography>
                {res.name}
              </Typography>
              <Typography>
                {'Distance: ' + res.distance}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </CardContent>
      <CardActions>
        <Pagination count={getPageCount()} page={page} onChange={handlePaginationChange} />
      </CardActions>
      </Card>
    }
    return <Card style={cardStyle}>
      <CardContent>
        <Typography>No results found..</Typography>
      </CardContent>
      </Card>
  }

  return <div style={styles}>Enter the details and hit submit to fetch content</div>
}
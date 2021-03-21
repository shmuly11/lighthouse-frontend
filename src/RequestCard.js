import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard({request}) {
  const {assigned, content, end_date, start_date, location, member_name, time, url} = request
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} style={{color: "red", background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'}}>
      <CardContent>
        {member_name && <Typography className={classes.title} color="textSecondary" gutterBottom>
          {member_name}
        </Typography>}
        <Typography variant="h5" component="h2">
          be{bull}nev{bull}o{bull}lent
        </Typography>
        {start_date && <Typography className={classes.pos} color="textSecondary">
          {start_date}
        </Typography>}
        {<Typography variant="body2" component="p">
          {content}
        </Typography>}
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

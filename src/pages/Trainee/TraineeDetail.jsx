import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';
import Button from '../../components/Button/Button';
import NoMatch from '../NoMatch/NoMatch';
import trainee from './data/trainee';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  text: {
    color: 'black',
    marginLeft: theme.spacing(5),
  },
}));

function getDateFormatted(date) {
  return moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a');
}

const TraineeDetail = () => {
  const classes = useStyles();
  const history = useHistory();
  const { TraineeId } = useParams();

  const found = trainee.find((element) => element.id === TraineeId);

  if (!found) {
    return <NoMatch />;
  }
  return (
    <>
      <Card className={classes.root}>
        <CardMedia
          className={classes.cover}
          image="https://image.flaticon.com/icons/svg/21/21104.svg"
          title="user cover"
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {found.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {getDateFormatted(found.createdAt)}
            </Typography>
            <Typography component="h5" variant="subtitle1">
              {found.email}
            </Typography>
          </CardContent>
        </div>

      </Card>
      <br />
      <div align="center">
        <Button onClick={() => history.goBack()} value="Back" />
      </div>
    </>
  );
};

export default TraineeDetail;

import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {useSelector, useDispatch} from 'react-redux'
import NewBroadcastForm from './NewBroadcastForm'
import {removeRequest} from './redux/requestsSlice'
import Avatar from '@material-ui/core/Avatar'
import AvatarGroup from '@material-ui/lab/AvatarGroup'



const useStyles = makeStyles((theme) =>({
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
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  } 
}));



export default function SimpleCard({request, peopleNeeded, helpers}) {
  const [formData, setFormData] = useState({
    ...request
  })
  const {id, assigned, content, end_date, start_date, location, member_name, member_image, title, people, time, url, member_id} = formData
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [editMode, setEditMode] = useState(false)
console.log(request)

  function handleDelete(){
    fetch(`http://localhost:3000/request_offers/${id}`,{
      method: "DELETE"
    })
    dispatch(removeRequest(request))
  }

  function handleChange(e){
    const value = e.target.value || "1"
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  function handleSubmit(e){
    e.preventDefault()
    setEditMode(false)
    fetch(`http://localhost:3000/request_offers/${id}`,{
      method: "PATCH",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
  }

  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURI(location)}`
  
  const helperImages= helpers.map(helper=>{
    return <Avatar key={helper.id} alt={helper.name} src={helper.image} />
  })
  return (
    <Card className="glass" style={{
      color: "red", 
      background: `linear-gradient(180deg, #3577A0 ${(people-helpers.length)/people * 100}%, #FDAA62 100%)`, 
      'border-style': "solid",
      'borer-width': '50px',
      'border-color': request.broadcast.color
      }}>
      <CardContent>
        {member_name && <Typography className={classes.title} color="textSecondary" gutterBottom>
          {member_name}
        </Typography>}
        <Avatar alt={member_name} src={member_image} />
        {editMode ? 
        <form onSubmit={handleSubmit}>
          {title &&  <Typography className={classes.pos} color="textSecondary">
          <input type ="text" name="title" value={formData.title} onChange={handleChange}></input>
        </Typography>}
          {request.start_date &&  <Typography className={classes.pos} color="textSecondary">
          <input type ="text" name="start_date" value={formData.start_date} onChange={handleChange}></input>
        </Typography>}
        {request.end_date &&  <Typography className={classes.pos} color="textSecondary">
        <input type ="text" name="end_date" value={formData.end_date} onChange={handleChange}></input>
        </Typography>}
        {request.time &&  <Typography className={classes.pos} color="textSecondary">
        <input type ="text" name="time" value={formData.time} onChange={handleChange}></input>
        </Typography>}
        {request.url &&  <Typography className={classes.pos} color="textSecondary">
        <input type ="text" name="url" value={formData.url} onChange={handleChange}></input>
        </Typography>}
        {request.people &&  <Typography className={classes.pos} color="textSecondary">
        <input type ="number" name="people" value={formData.people - helpers.length} onChange={handleChange}></input>
        </Typography>}
        {request.location &&  <Typography className={classes.pos} color="textSecondary">
        <input type ="text" name="location" value={formData.location} onChange={handleChange}></input>
        </Typography>}
       {request.content && <Typography variant="body2" component="p">
          <input type ="text" name="content" value={formData.content} onChange={handleChange}></input>
          
        </Typography>}
        <Button size="small" type="submit">update</Button>
        </form>
        :
          <>
          {/* <Typography variant="h5" component="h2">
          be{bull}nev{bull}o{bull}lent
        </Typography> */}
         {title &&  <Typography className={classes.pos} color="textSecondary">
          {title}
        </Typography>}
        {start_date &&  <Typography className={classes.pos} color="textSecondary">
          {start_date}
        </Typography>}
        {end_date &&  <Typography className={classes.pos} color="textSecondary">
          {end_date}
        </Typography>}
        {time &&  <Typography className={classes.pos} color="textSecondary">
          {time}
        </Typography>}
        {url &&  <Typography className={classes.pos} color="textSecondary">
           <a href={url} target="_blank">{url}</a>
           
        </Typography>}
        {people &&  <Typography className={classes.pos} color="textSecondary">
          {peopleNeeded} {peopleNeeded === 1 ? "person" : "people"} needed
        </Typography>}
        {location &&  <Typography className={classes.pos} color="textSecondary">
          <a href={mapsLink} target="_blank">{location}</a>
        </Typography>}
       {content && <Typography variant="body2" component="p">
          {content}
        </Typography>}
        </>
        }
      </CardContent>
      <CardActions>
        {user.id === member_id && 
        <>
        <Button size="small" onClick={()=> setEditMode(!editMode)}>{editMode ? "Cancel":"Edit"}</Button> 
        <Button size="small" onClick={handleDelete}>Delete</Button>
        </>}
      </CardActions>
      <AvatarGroup>
        {helperImages}
      </AvatarGroup>
    </Card>
  );
}

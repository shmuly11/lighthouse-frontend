import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {addRequest} from './redux/requestsSlice'
// import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

function NewBroadcastForm({handleClose}) {
    
    const user = useSelector(state => state.user)
    const community = useSelector(state => state.community)
    const templates = community.broadcasts 
    const [template, setTemplate] = useState(templates[0])
    console.log(templates)
    const [selectedDate, setSelectedDate] = useState(new Date());
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        member_id: user.id,
        title: "",
        start_date: "",
        end_date: "",
        time: "",
        url: "",
        content: "",
        people: 0,
        location: "",
        broadcast_id: template.id,
        offer: false
    })

    const options = templates.map((template, index) => {
       return <option key={template.id} value={index} >{template.name}</option>
    })

    function handleTemplateChange(e){
        const currentTemp = templates[e.target.value]
        setTemplate(currentTemp)
        setFormData({
            ...formData,
            start_date: currentTemp.start_date !== "1" ? currentTemp.start_date : "",
            end_date: currentTemp.end_date !== "1" ? currentTemp.end_date : "",
            time: currentTemp.time !== "1" ? currentTemp.time : "",
            url: currentTemp.url !== "1" ? currentTemp.url : "",
            
            people: currentTemp.people,
            location: currentTemp.location !== "1" ? currentTemp.location : "",
            broadcast_id: currentTemp.id

        })
    }
    console.log(template)
    console.log(formData)
    
    const handleDateChange = (date) => {
        console.log(date)
    setSelectedDate(date);
    setFormData({...formData, start_date: date.toDateString()})
    }

    const handleEndDateChange = (date) => {
        console.log(date)
    // setSelectedDate(date);
    setFormData({...formData, end_date: date.toDateString()})
    }

    const handleTimeChange = (date) => {
        console.log(date)
        
    // setSelectedDate(date);
    setFormData({...formData, time: date.toLocaleTimeString()})
    }

    function handleSubmit(e){
        e.preventDefault()
        console.log(formData)
        fetch("http://localhost:3000/request_offers",{
          method: "POST",
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
        .then(res=> res.json())
        .then(data=> {
            dispatch(addRequest(data))
            handleClose()
        })
    }
    
    function handleChange(e){
        console.log(e.target.value)
        const value = e.target.value || "1"
        setFormData({ ...formData, [e.target.name]: value})
        setTemplate({ ...template, [e.target.name]: value})
        
    }
    return (
        <div>
            <select onChange={handleTemplateChange}>
                {options}
            </select>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="title" name="title" onChange={handleChange}></input>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
            {template.start_date && <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date picker inline"
                
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
             />}
             {template.end_date && <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date picker inline"
                
                value={selectedDate}
                onChange={handleEndDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
             />}
              {template.time && <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Time picker"
                value={selectedDate}
                onChange={handleTimeChange}
                KeyboardButtonProps={{
                    'aria-label': 'change time',
                }}
            />}
         
            </Grid>
            </MuiPickersUtilsProvider>
            {template.url && <input type="text" placeholder="link" name="url" value={template.url !== "1" ? template.url : ""} onChange={handleChange}></input>}
            <input type="textarea" placeholder="content" name="content" onChange={handleChange}></input>
             <input type="number" placeholder="how many people" name="people" value={template.people} onChange={handleChange}></input>
            {template.location && <input type="textarea" placeholder="location" name="location" value={template.location !== "1" ? template.location : ""} onChange={handleChange}></input>}
            <input type="submit"></input>
                </form>
                {/* {selectedDate.toString()} */}
        </div>
    )
}

export default NewBroadcastForm

import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { HexColorPicker, HexColorInput } from "react-colorful";
import {setCommunity} from './redux/communitySlice'
import {useHistory} from 'react-router-dom'


function NewTemplateForm() {

    const community = useSelector(state => state.community)
    const dispatch = useDispatch()
    const history = useHistory()
    const [color, setColor] = useState("#aabbcc")
    const [formData, setFormData] = useState({
        community_id: community.id,
        name: "",
        color: "",
        start_date: "",
        end_date: "",
        time: "",
        url: "",
        people: 1,
        location: "",
    
    })

    function handleChange(e){
        console.log(e.target.type !== 'checkbox' )
        const value = e.target.type !== 'checkbox' ? e.target.value : e.target.checked ? "1" : ""
        setFormData({ ...formData, [e.target.name]: value })
    }

    function handleSubmit(e){
        e.preventDefault()
        
        fetch("http://localhost:3000/broadcasts",{
          method: "POST",
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
        .then(res=> res.json())
        .then(data=> {
            console.log(data)
            dispatch(setCommunity(data.community))
            history.push('/main')
        })
    }
    console.log(formData)
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="name" name="name" onChange={handleChange}></input><br/>
                <input type='color' name='color' onChange={handleChange}></input><br/>
                <input type="checkbox" name="start_date" onChange={handleChange}/>
                <label htmlFor="start_date"> Date </label><br/>
                <input type="checkbox"  name="end_date" onChange={handleChange}/>
                <label htmlFor="end_date"> End Date</label><br/>
                <input type="checkbox" name="time" onChange={handleChange}/>
                <label htmlFor="time"> Time</label><br/><br/>
                <input type="checkbox" name="url" onChange={handleChange}/>
                <label htmlFor="url"> Link</label>
                <input type="text" placeholder="set default link here" name="url" onChange={handleChange}></input><br/>
                <input type="checkbox" name="location" onChange={handleChange}/>
                <label htmlFor="location"> Location</label>
                <input type="text" placeholder="set default location here" name="location" onChange={handleChange}></input><br/>
                <input type="number" name="people" value={formData.people} onChange={handleChange}/>
                <label htmlFor="people"> Amount of people</label><br/><br/>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    )
}

export default NewTemplateForm

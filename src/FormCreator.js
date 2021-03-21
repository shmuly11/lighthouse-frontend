import {useState, useEffect} from 'react'

function FormCreator() {
    const [formComponents, setFormComponents] = useState([])
    const [builders, setBuilders] = useState( [] )
    useEffect(() => {
      setBuilders([<BuilderComponent id={0}/>])
    }, [])
    function makeFormComponent(event){
      event.preventDefault()
      const newComponent = {
        id: event.target.id,
        type: event.target.input.value,
        name: event.target.key.value,
        defaultValue: event.target.value.value
      }
      setFormComponents([...formComponents, newComponent])
      event.target.insert.disabled=true
    }
    // Just some of the options
    const inputTypes = ["button", "checkbox", 'color', "password", "text", "tel"]
    function BuilderComponent({id}) {   
      return (
        <form id={`component${id}`}onSubmit={makeFormComponent}>
          <input name="key" type="text" placeholder="Input name"/>
          <input name="value" type="text" placeholder="Input Default Value"/>
          <select name="input" >
            {
              inputTypes.map( type => {
                return <option name="input"> {type}</option>
              })
            }
          </select>
          <input name="insert" type="submit" value="Insert" />
        </form>
      )
    }
  function addBuilder(){
    setBuilders([...builders, <BuilderComponent id={builders.length}/>])
  }
  function DynamicForm({components}) {
    const inputs = formComponents.map( ({type, name, defaultValue}, index) => {
        return (
          <input key={index} type={type} name={name} value={defaultValue} />
        )
      })
    return (
      <form>
        {inputs}
        {inputs.length>0 && <input type="submit" value="submit"/>}
      </form>
    )
  }
  return (
    <div className="App">
      <h1>Dynamic Form Test </h1>
        <button onClick={addBuilder} > Add More Components! </button>
        {builders}
        <br></br>
        <hr/>
        <h1>Built Form </h1>
        <DynamicForm components={formComponents}/>
    </div>
  );
}
export default FormCreator
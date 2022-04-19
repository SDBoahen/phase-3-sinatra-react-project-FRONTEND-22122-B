import logo from './logo.svg';
import './App.css';

import { useState, useEffect } from "react"


function App() {


  const [ someMessage , setSomeMesaage ] = useState(  {}  )

  const [ users , setUsers ] = useState(  []  )
  console.log( "The STATE of users: " , users )  //


  const fetchMessage =()=>{

    fetch("http://localhost:9292/")
    .then( r => r.json() )
    .then( ( fetchedMessage )=>{
    
      setSomeMesaage( fetchedMessage )
    
    } )

  }
  const fetchUsers =()=>{

    fetch("http://localhost:9292/users ")
    .then( r => r.json() )
    .then( ( fetchedUser )=>{  
    
      setUsers( fetchedUser )
    
    } )

  }
  useEffect( ()=>{

    fetchMessage()

    fetchUsers()

  } , [] )


  const [ newUser , setNewUser ] = useState( 

    {

      name: "",
      username: "",
      password: "",
      image_URL: "",
      location: ""

    } 

  )
  console.log( "State of newUser: " , newUser )  //


  const handleNewUserNameOnChange =( synthEvent )=>{

    setNewUser( { ...newUser, name: synthEvent.target.value } )

  }
  const handleNewUserUsernameOnChange =( synthEvent )=>{

    setNewUser( { ...newUser, username: synthEvent.target.value } )

  }
  const handleNewUserPasswordOnChange =( synthEvent )=>{

    setNewUser( { ...newUser, password: synthEvent.target.value } )

  }
  const handleNewUserImageUrlOnChange =( synthEvent )=>{

    setNewUser( { ...newUser, image_URL: synthEvent.target.value } )

  }
  const handleNewUserLocationOnChange =( synthEvent )=>{

    setNewUser( { ...newUser, location: synthEvent.target.value } )

  }



  const handleNewUserSubmit =( synthEvent )=>{

    synthEvent.preventDefault()

      console.log(" DON'T FORGET YOU'RE ABOUT HIT A PRY 👀")  //

    fetch( "http://localhost:9292/users" , {

      method: "POST",
      headers: { "Content-Type": 'application/json' },
      body: JSON.stringify( newUser )

    } )
    .then( r => r.json() )
    .then( ( newUserObj )=>{  //// Pesimistic Rendering

      // setUsers( [ ...users , newUserObj ] )
      // append to the END of the List

      setUsers( [ newUserObj , ...users  ] )
      // append to the TOP of the List

    } )

    //// Optimistic Rendering
    // setUsers( [ ...users , newUserObj ] )




  }
  const handleUserDelete =( userObjToDELETE )=>{

    console.log( "DELETE! -> " , userObjToDELETE )

      const id = userObjToDELETE.id

    fetch( `http://localhost:9292/users/${id}` , { method: "DELETE" } )
    .then( r => r.json() )
    .then( ( someResponse ) => { 
      
      console.log(someResponse) //

      //// Handle Our Frontend Rendering
      //// - Pesimistically -

      let resultOfFilter = users.filter(  ( eachUserObj )=>{

        if( eachUserObj.id != userObjToDELETE.id ){

          return eachUserObj

        }

      }  )

      setUsers(  [ ...resultOfFilter ]  )

    } )



  }



  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
       

        <form onSubmit={ handleNewUserSubmit } >

          <label>Name for New User: </label>
          <input onChange={ handleNewUserNameOnChange } value={newUser.name} /><br/>
          
          <label>Username for New User: </label>
          <input onChange={ handleNewUserUsernameOnChange } value={newUser.imageUrl} /><br/>

          <label>Password for New User: </label>
          <input onChange={ handleNewUserPasswordOnChange } value={newUser.imageUrl} 
            type="password"
          /><br/>

          <label>Profile Pic for New User: </label>
          <input onChange={ handleNewUserImageUrlOnChange } value={newUser.imageUrl} /><br/>

          <label>Location for New User: </label>
          <input onChange={ handleNewUserLocationOnChange } value={newUser.imageUrl} /><br/>


          <input type="submit" />

        </form>


        <h1>{ someMessage.message }</h1>
        {

          users.map( ( eachUser )=>{

            return(<div>

              <br/><br/>
              ----------------\
  
              <h3>{ eachUser.name }</h3>
              <img src={eachUser.image_URL}  /><br/>
              <h3>{ eachUser.username }</h3>

              <button onClick={ ( synthEvent )=> handleUserDelete( eachUser ) } >X</button><br/>

              ----------------/
              <br/><br/>

            </div>)

          } )

        }




      </header>
    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';

import { useState, useEffect } from "react"

import UserCard from './UserComponents/UserCard';
import UsersList from './UserComponents/UsersList';


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

      console.log(" DON'T FORGET YOU'RE ABOUT HIT A PRY 👀 !!")  //

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
  const handleUserEdit =( userObjToEDIT , id )=>{

    // console.log( "Edit! -> " , userObjToEDIT ) //
    // console.log( "Id! -> " , id ) //
    console.log(" DON'T FORGET YOU'RE ABOUT HIT A PRY 👀 !!")  //


    fetch( `http://localhost:9292/users/${id}` , {

      method: "PATCH",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( userObjToEDIT )


    } )
    .then( r => r.json() )
    .then( ( updatedUser )=>{ 

      // console.log( updatedUser ) //

      //// Pesimistic Rendering : updatedUser (from Response)


        let resultOfFilter = users.filter( ( eachUserFilteringThrough )=>{

          return eachUserFilteringThrough.id =! updatedUser.id

        } )

        setUsers( [ updatedUser , ...resultOfFilter ] )

      //// Pesimistic Rendering : updatedUser (from Response)

    } )


      //// can use  userObjToEDIT  ==  updatedUser


    //// Optimistic Rendering : userObjToEDIT

      // let resultOfFilter = users.filter( ( eachUserFilteringThrough )=>{

      //   return eachUserFilteringThrough.id =! userObjToEDIT.id

      // } )

      // setUsers( [ userObjToEDIT , ...resultOfFilter ] )

    //// Optimistic Rendering


  }





  //// Login Functions


    const [ userToLogin , setUserToLoginInfo ] = useState( 

      {

        username: "",
        password: ""

      } 

    )
    // console.log( "State of userToLogin: " , userToLogin )  //

    const handleUserToLoginUsernameOnChange =( synthEvent )=>{

      setUserToLoginInfo( { ...userToLogin, username: synthEvent.target.value } )

    }
    const handleUserToLoginPasswordOnChange =( synthEvent )=>{

      setUserToLoginInfo( { ...userToLogin, password: synthEvent.target.value } )

    }

    const [ isThereAUserLoggedIn , setLoggedInUserStatus ] = useState( false )
    const [ currentUser , setCurrentUser ] = useState( {} )
    // console.log( "State of currentUser: " , currentUser )  //
      const [ currentUserPets , setCurrentUserPets ] = useState( [] )
      console.log( "State of currentUserPets: " , currentUserPets )  //




    const handleLogin =( synthEvent )=>{

      synthEvent.preventDefault()

        console.log(" HITTING A PRY!!!! ")  //

      fetch( "http://localhost:9292/login" , {
  
        method: "POST",
        headers: { "Content-type": "application/json"},
        body: JSON.stringify( userToLogin )
  
      } )
      .then( r => r.json() )
      .then( ( userLoginResult )=>{


        // console.log( userLoginResult.id  )  //

        if( userLoginResult.id ){

            console.log("LOGIN SUCCESSFUL :)")  //

          setLoggedInUserStatus( true )

          setCurrentUser( userLoginResult )
          setCurrentUserPets( userLoginResult.pets )

        }
        else{  console.log("LOGIN UNSUCCESSFUL :[")  }


      } )

    }



  ////




  //// Pet Funtions


    const [ newPetName , setNewPetName ] = useState( "" )

    const newPetNameChangeHandler =( synthEvent )=>{

      setNewPetName( synthEvent.target.value )

    }
    const handleNewPetSubmit =( synthEvent )=>{

      synthEvent.preventDefault()


      fetch( "http://localhost:9292/pets" , {

        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify( 
          { 
          
            name: newPetName,
            user_id: currentUser.id 
        
          }
        )

      } )
      .then( r => r.json() )
      .then(  ( reponseResult )=>{  let newPet = reponseResult


        //// spread operator + setState (reRender) approach

          setCurrentUserPets( [ ...currentUserPets , newPet ] ) 

        //// spread operator + setState (reRender) approach



        //// get fetch + setState (reRender) approach

          // fetch( `http://localhost:9292/users/${currentUser.id}` )
          // .then( r => r.json() )
          // .then( (userWithFreshRelatedData)=>{

          //   console.log( userWithFreshRelatedData )

          //   setCurrentUser( userWithFreshRelatedData )

          // } )

        //// get fetch + setState (reRender) approach


        } 
      
      )

    }


  ////



  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
       

        <h1>Sign Up! :) </h1>        
        
      <form onSubmit={ handleNewUserSubmit } >

          <label>Name for New User: </label>
          <input onChange={ handleNewUserNameOnChange } value={newUser.name} /><br/>
          
          <label>Username for New User: </label>
          <input onChange={ handleNewUserUsernameOnChange } value={newUser.username} /><br/>

          <label>Password for New User: </label>
          <input onChange={ handleNewUserPasswordOnChange } value={newUser.password} 
            type="password"
          /><br/>

          <label>Profile Pic for New User: </label>
          <input onChange={ handleNewUserImageUrlOnChange } value={newUser.imageUrl} /><br/>

          <label>Location for New User: </label>
          <input onChange={ handleNewUserLocationOnChange } value={newUser.location} /><br/>


          <input type="submit" />

      </form>


          <br/><br/><br/><br/>
          <br/><br/><br/><br/>


        <h1>Login In! :) </h1>    

        <form  onSubmit={ handleLogin }>

          <label>Username for New User: </label>
          <input onChange={ handleUserToLoginUsernameOnChange } 
          
            value={userToLogin.username} 
            placeholder={"Enter Username :)" }
            
          /><br/>

          <label>Password for New User: </label>
          <input onChange={ handleUserToLoginPasswordOnChange } 
          
            value={userToLogin.password} 
            placeholder={"Enter Password :)" }

            type="password"

          /><br/>

          <input type="submit" />
          
        </form>  
        {

          isThereAUserLoggedIn ?

          (<div>

            < UserCard 
                      
              userInCard={ currentUser }  

              //// App.js Functions
                handleUserDelete={ handleUserDelete }
                handleUserEdit={ handleUserEdit }
              //// App.js Functions

                      
            />
            <h2>{`Here are ${currentUser.name}'s Pets! :)`}</h2>
            {


              //// for spread operator approach

                currentUserPets.map( (eachPet)=>{

                  return(<h3>{eachPet.name}</h3>)

                })
              
              //// for spread operator approach
              


              //// for reFetch Approach
            
                // currentUser.pets.map( (eachPet)=>{

                //   return(<h3>{eachPet.name}</h3>)

                // })

              //// for reFetch Approach



            }
            <h2>~~~~~~~~~~~~~~~~</h2>

              <br/><br/>

            <form onSubmit={ handleNewPetSubmit } >

              <input value={newPetName} onChange={ newPetNameChangeHandler } />

              <input type="submit" />

            </form>

              <br/><br/>


            
          </div>)

          :

          null

          //// false

        }  



        <h1>{ someMessage.message }</h1>




        <h1>All of Our Users :)</h1>



        {/* <UsersList 

          users={ users }

          //// App.js Functions
          handleUserDelete={ handleUserDelete }
          handleUserEdit={ handleUserEdit }
          //// App.js Functions
        
        /> */}





      </header>
    </div>
  );
}

export default App;

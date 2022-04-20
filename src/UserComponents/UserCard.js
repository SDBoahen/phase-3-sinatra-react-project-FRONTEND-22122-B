import { useEffect, useState } from "react"


function UserCard( { userInCard , handleUserDelete , handleUserEdit } ){

    // two edits frontend renders - fetch again OR find + replace - renrender itself
    
    const [ showEditForm , toggleEditForm ] = useState( false )
    const [ userInfoBeingEdited , updateUserInfoBeingEdited ] = useState( 
    
        {

            name: "",
            username: "",
            password: "",
            image_URL: "",
            location: ""
      
        }
    
    )
    // console.log( "State of userInfoBeingEdited: " , userInfoBeingEdited )  //

    const setUserDataForEdit =()=>{

        updateUserInfoBeingEdited( userInCard )

    }
    useEffect( setUserDataForEdit , [] )




    const handleUserNameOnChange =( synthEvent )=>{

        updateUserInfoBeingEdited( { ...userInfoBeingEdited, name: synthEvent.target.value } )
    
    }
    const handleUserUsernameOnChange =( synthEvent )=>{

    updateUserInfoBeingEdited( { ...userInfoBeingEdited, username: synthEvent.target.value } )

    }
    const handleUserPasswordOnChange =( synthEvent )=>{

    updateUserInfoBeingEdited( { ...userInfoBeingEdited, password: synthEvent.target.value } )

    }
    const handleUserImageUrlOnChange =( synthEvent )=>{

    updateUserInfoBeingEdited( { ...userInfoBeingEdited, image_URL: synthEvent.target.value } )

    }
    const handleUserLocationOnChange =( synthEvent )=>{

    updateUserInfoBeingEdited( { ...userInfoBeingEdited, location: synthEvent.target.value } )

    }


    const editButtonSubmitHandler =( synthEvent )=>{

        synthEvent.preventDefault()

        toggleEditForm( false )  //  This will Hide the Form Once Again

        handleUserEdit( userInfoBeingEdited , userInCard.id )  

    }



    return(<div>

        <br/><br/>
        ----------------\

        <h3>{ userInCard.name }</h3>
        <img src={userInCard.image_URL}  /><br/>
        <h3>{ userInCard.username }</h3>

        <button 
            onClick={ 
                ( synthEvent )=>{ 

                    toggleEditForm( !showEditForm )
                
                }
            }
        >
            Edit
        </button><br/><br/>

        <button onClick={ ( synthEvent )=>{ handleUserDelete( userInCard ) } } >X</button><br/><br/><br/><br/>


        {

            showEditForm ?

            //////// true
            (<form onSubmit={ editButtonSubmitHandler } >
                       

                <label>Name for New User: </label>
                <input onChange={ handleUserNameOnChange } value={userInfoBeingEdited.name} placeholder={userInCard.name} /><br/>

                <label>Username for New User: </label>
                <input onChange={ handleUserUsernameOnChange } value={userInfoBeingEdited.username} placeholder={userInCard.username} /><br/>

                <label>Password for New User: </label>
                <input onChange={ handleUserPasswordOnChange } value={userInfoBeingEdited.password} 
                    type="password"
                /><br/>

                <label>Profile Pic for New User: </label>
                <input onChange={ handleUserImageUrlOnChange } value={userInfoBeingEdited.image_URL} placeholder={userInCard.image_URL} /><br/>

                <label>Location for New User: </label>
                <input onChange={ handleUserLocationOnChange } value={userInfoBeingEdited.location} placeholder={userInCard.location} /><br/>


                <input type="submit" />


            </form>)

            :

            null
            //// (<></>)
            //// (<div></div>)
            //////// false

        }


        ----------------/
        <br/><br/>

      </div>)


}
export default UserCard
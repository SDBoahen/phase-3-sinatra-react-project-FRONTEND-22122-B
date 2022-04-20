import UserCard from "./UserCard"


function UsersList( { users , handleUserDelete , handleUserEdit } ){


    return(<div>
        {

            // Users List

            users.map( ( eachUser )=>{

                return(< UserCard 
                    
                    userInCard={ eachUser }  

                    //// App.js Functions
                    handleUserDelete={ handleUserDelete }
                    handleUserEdit={ handleUserEdit }
                    //// App.js Functions

                    
                />)

            } )

        }
    </div>)


}
export default UsersList
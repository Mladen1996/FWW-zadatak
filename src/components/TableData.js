import React from 'react';
import './TableData.css';

class TableData extends React.Component{

    state={
        data:[],
        
    }
    componentDidMount(){
        fetch('https://fww-demo.herokuapp.com/')
        .then(result => result.json())
        .then(result => {
            console.log(result);
           
            this.setState({
                data:result,
               
            })
        });
    }
    render(){

        const allCountry=this.state.data.map(item=>{
            const allState=item.state.map( state =>{
                const AllUsers=state.users.map(user=>{
                    return(
                        <div class="user-info">
                            <p>{item.country}</p>
                            <p>{state.name}</p>
                            <p>{user.fullName}</p>
                            <p>{user.balance}</p>
                            <p>{user.isActive ? 'true': 'false'}</p>
                            <p>{user.registered}</p>
                        </div>
                    )
                })
                return(
                    <div>
                       
                    {
                        AllUsers
                    }
                    </div>
                    
                )
            }

            )
            return(
                <div key={item.id}>
                    <div class="table-header">
                     <p>Country</p>
                    <p>State</p>
                    <p>Full name</p>
                    <p>Balance</p>
                    <p>isActive</p>
                    <p>Registered</p>
                    </div>
                    {
                        allState
                    }
                </div>
               

            )
        })
       
        return(
            <>
           
             {
                 allCountry
             }
            </>
        )
    }
}

export default TableData;
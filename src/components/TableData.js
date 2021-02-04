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
                        <tr>
                            <td>{item.country}</td>
                            <td>{state.name}</td>
                            <td>{user.fullName}</td>
                            <td>{user.balance}</td>
                            <td>{user.isActive ? 'true': 'false'}</td>
                            <td>{user.registered}</td>
                        </tr>
                    )
                })
                return(
                   
                    <tbody>
                    {
                        AllUsers
                    }
                    </tbody>
                    
                )
            }

            )
            return(
                    <>
                    {
                        allState
                    }
                    </>
               

            )
        })
       
        return(
            
            <table>
                    <thead>
                    <tr>
                     <th>Country</th>
                    <th>State</th>
                    <th>Full name</th>
                    <th>Balance</th>
                    <th>isActive</th>
                    <th>Registered</th>
                    </tr>
                    </thead>
             {
                 allCountry
             }
            </table>
        )
    }
}

export default TableData;
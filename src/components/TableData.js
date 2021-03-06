import React from 'react';
import './TableData.css';

class TableData extends React.Component{
   
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.filterByCountry = this.filterByCountry.bind(this);
       
        this.filterByState = this.filterByState.bind(this);
        
        this.filterByFullName = this.filterByFullName.bind(this);
       
        this.filterByActive = this.filterByActive.bind(this);
        this.filterByBalance = this.filterByBalance.bind(this);
        this.filterByRegistered = this.filterByRegistered.bind(this);

        this.filterBy = this.filterBy.bind(this);
        this.state={
            data:[],
            temp:[],
            country:"",
            state:"",
            fullName:"",
            isActive:"",
            balanceM:"",
            balanceV:""
        }

       

      }
    
    componentDidMount(){
        fetch('https://fww-demo.herokuapp.com/')
        .then(result => result.json())
        .then(result => {
           
           
            this.setState({
                data:result,
               
            })


        });

    
        
    }

    /*compareBy(key) {
        return function (a, b) {
          if (a[key] < b[key]) return -1;
          if (a[key] > b[key]) return 1;
          return 0;
        };
      }
     
      sortBy(key) {
        let arrayCopy = [...this.state.data];
        arrayCopy.sort(this.compareBy(key));
        this.setState({data: arrayCopy});
      }*/


      filterByCountry(){
       
        
            const itemNames = this.state.data.filter( 
                (eachObj) => eachObj.country==this.state.country 
   
            );
       
            this.setState({
            data:itemNames,
               
            })

        
      
      }

      filterByState(){
       
    var cat = this.state.state;
    var result = this.state.data.reduce((a, o) => { 
     
      var filtered = o.state.filter(({name}) => cat === name);
      
      if (filtered.length) { 
      
        a.push(Object.assign({}, o, {state: filtered}));
      }
      
      return a;
    }, []);

console.log(result);

this.setState({data: result});


  
  }

  filterByFullName(){
       
    var cat = this.state.fullName;
    var result = this.state.data.reduce((a, o) => { 
     

      var filtered=o.state.reduce((b,c)=>{
        var filtered2 = c.users.filter(({fullName}) => cat === fullName);


        if (filtered2.length) { 
      
            b.push(Object.assign({}, c, {users: filtered2}));
          }

          return b;
      },[]);

      
     if (filtered.length) { 
      
        a.push(Object.assign({}, o, {state: filtered}));
      }
      
      return a;
    }, []);


this.setState({data: result});

  
  }

  filterByActive(){
       
    var cat = (this.state.isActive == 'true');
    var result = this.state.data.reduce((a, o) => { 
     

      var filtered=o.state.reduce((b,c)=>{
        var filtered2 = c.users.filter(({isActive}) => 
        {
            return cat == isActive;
        }
       );

        if (filtered2.length) { 
      
            b.push(Object.assign({}, c, {users: filtered2}));
          }

          
          return b;
      },[]);

      
     if (filtered.length) { 
      
        a.push(Object.assign({}, o, {state: filtered}));
      }
      
      return a;
    }, []);



this.setState({data: result});

  
  }

  filterByBalance(){

    var catManje = this.state.balanceM;
    var catVise = this.state.balanceV;
    var result = this.state.data.reduce((a, o) => { 
     

      var filtered=o.state.reduce((b,c)=>{
        var filtered2 = c.users.filter(({balance}) => 
        {
            var number = Number(balance.replace(/[^0-9.-]+/g,""));
            return number < catVise && number> catManje;
        }
       );

        if (filtered2.length) { 
      
            b.push(Object.assign({}, c, {users: filtered2}));
          }

         
          return b;
      },[]);

      
      
     if (filtered.length) { 
      
        a.push(Object.assign({}, o, {state: filtered}));
      }
      
      return a;
    }, []);



this.setState({data: result});

  }


        filterByRegistered(){
            var d=new Date("2014-02-22T12:35:59");
            var p="2014-02-01";
            var r="2014-03-01";
            
            console.log(d.getDate());
        
        }

        filterBy(event){
         
            this.filterByCountry();
            this.filterByState();
            this.filterByFullName();
           /* this.filterByBalance();
            this.filterByActive();*/

            event.preventDefault();
        }
    
      handleChange(event) {
      

        const value = event.target.value;
        this.setState({
          [event.target.name]: value
        });
        /*this.setState({
            country: event.target.value,
            state:event.target.state.value,
            fullName: event.target.fullName.value,
            isActive:event.target.isActive.value,
            balanceM: event.target.balanceM.value,
            balanceV:event.target.balanceV.value,
        });*/
      }

       
      
   
    render(){
        console.log(this.state);
      
        const allCountry=this.state.data.map(item=>{
            const allState=item.state.map( state =>{
                
                const AllUsers=state.users.map((user,i)=>{
                   
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
        });

    
       

        return(
            <>
             <form onSubmit={this.filterBy}>
        <label>
        
          <input type="text" placeholder="Country" name="country" value={this.state.country} onChange={this.handleChange} />
        </label>
        
        <label>
        
          <input type="text" placeholder="State" name="state" value={this.state.state} onChange={this.handleChange} />
        </label>
       
        <label>
        
          <input type="text" placeholder="Full name" name="fullName" value={this.state.fullName} onChange={this.handleChange} />
        </label>
        
        <label>
    
          <input type="text" placeholder="IsActive" name="isActive" value={this.state.isActive} onChange={this.handleChange} />
        </label>
        
        <label class="balance">
      
         <input type="text" placeholder="Balance from" name="balanceM" value={this.state.balanceM} onChange={this.handleChange} />
         <input type="text" placeholder="Balance to" name="balanceV" value={this.state.balanceV} onChange={this.handleChange} />
        </label>
         <input type="submit" value="Submit" />
        </form>
            <table>
                    <thead>
                    <tr>
                    <th>Country</th>
                    <th onClick={() => this.filterByState()}>State</th>
                    <th >Full name</th>
                    <th onClick={() => this.filterByBalance()}>Balance</th>
                    <th>isActive</th>
                    <th onClick={() => this.filterByRegistered()}>Registered</th>
                    </tr>
                    </thead>
             {
                 allCountry
             }
            </table>
            </>
        )
    }
}

export default TableData;
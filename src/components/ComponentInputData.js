import React from 'react';
import logo from '../logo.svg';
import '../App.css';
import DatePicker from 'react-datepicker';
import Dropdown from 'react-dropdown';

import "react-datepicker/dist/react-datepicker.css";
import 'react-dropdown/style.css';


class ComponentInputData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: '',  startDate: new Date(), selectedOption:''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({value: event.target.value});
      }
      
      handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
      }

      handleChangeC = date => {
        this.setState({
          startDate: date
        });
      };

      login = () =>{                
        const {login_email_address, login_password} = this.state;
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var network = "Network request failed"
        if(reg.test(login_email_address) === true && login_password.trim().length != 0)
        {
          fetch('http://192.168.33.10/' + 'loginApp',{
            method:'post',
            header:{
              'Accept':'application/json',
              'Content-type':'application/json'
            },
            body:JSON.stringify({
              login_email_address: value              
            })
          })
          .then((response) => response.json())          
          .then((responseJson) => {
            if(responseJson.status == true)
            {

              AsyncStorage.setItem('idUsr',responseJson.user_name);              
              const resetAction = NavigationActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Dashboard' })],
              });
              
              this.props.navigation.dispatch(resetAction);              
            }
            else
            {
              if(responseJson.error == 'PI')
              {
                this.setState({modalVisible:false});
                Toast.show({
                  text:'Password is incorrect, please try again.',
                  position:'bottom',
                  type:'danger',
                  duration:3000
                });            
              }
              else
              {
                this.setState({modalVisible:false});
                Toast.show({
                  text:'No user found with this email address.',
                  position:'bottom',
                  type:'danger',
                  duration:3000
                });              
              }
            }
          })
          .catch((error) => {
            this.setState({modalVisible:false});
                Toast.show({
                  text: error.message == network ? ErrorNetwork : MessageError,
                  position:'bottom',
                  type:'danger',
                  duration:3000
            });
          });
        }
        else
        {
          this.setState({modalVisible:false});
          Toast.show({
            text:'Fill required fields or provide a valid email address.',
            position:'bottom',
            type:'danger',
            duration:3000
          });
        }
    
      }
    
      render() {
          const options = [
              'blue', 'yellow', 'red'
          ];
          const defaultOption = options[0];
          return (
              <div className="App">
                  <header className="App-header">
                      <img src={logo} className="App-logo" alt="logo" />
                      <p>
                          New Component <code>src/Components.js</code> and nuew data.
                      </p>
                      <a
                          className="App-link"
                          href="https://reactjs.org"
                          target="_blank"
                          rel="noopener noreferrer"
                      >
                          Learn React
                      </a>
                      <form onSubmit={this.handleSubmit}>
                          <label>
                              Complete Name:
                        <input type="text" value={this.state.value} onChange={this.handleChange} />
                          </label>
                          <input type="submit" value="Submit" />
                          <br />
                          <DatePicker selected={this.state.startDate} onChange={this.handleChangeC} />
                          {console.log(this.state.startDate)}
                          <br />
                          <br />
                          <Dropdown options={options} onChange={this._onSelect, () => this.setState({ selectedOption: this._onSelected })} value={defaultOption} placeholder="Select an option" />
                          {console.log(this.state.selectedOption)}
                      </form>

                  </header>


              </div>
          );

      }
  }

export default ComponentInputData;

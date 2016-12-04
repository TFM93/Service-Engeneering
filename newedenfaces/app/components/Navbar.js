import React from 'react';
import { Link } from 'react-router';
import NavbarStore from '../stores/NavbarStore';
import NavbarActions from '../actions/NavbarActions';


class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = NavbarStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    NavbarStore.listen(this.onChange);
    NavbarActions.getCharacterCount();

    let socket = io.connect();

    socket.on('onlineUsers', (data) => {
      NavbarActions.updateOnlineUsers(data);
    });

    $(document).ajaxStart(() => {
      NavbarActions.updateAjaxAnimation('fadeIn');
    });

    $(document).ajaxComplete(() => {
      setTimeout(() => {
        NavbarActions.updateAjaxAnimation('fadeOut');
      }, 750);
    });

    // location.search[4] = id no url
    console.log(location.search[4]);
    NavbarActions.getUserDetails(location.search[4]);


  }

  componentWillUnmount() {
    NavbarStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();

    let searchQuery = this.state.searchQuery.trim();

    if (searchQuery) {
      NavbarActions.findCharacter({
        searchQuery: searchQuery,
        searchForm: this.refs.searchForm,
        history: this.props.history
      });
    }
  }

  render() {
    return (
      <nav className='navbar navbar-default navbar-static-top'>
        <div className='navbar-header'>
          <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#navbar'>
            <span className='sr-only'>Toggle navigation</span>
            <span className='icon-bar'></span>
            <span className='icon-bar'></span>
            <span className='icon-bar'></span>
          </button>
          <Link to='/' className='navbar-brand'>
            <span ref='triangles' className={'triangles animated ' + this.state.ajaxAnimationClass}>
              <div className='tri invert'></div>
              <div className='tri invert'></div>
              <div className='tri'></div>
              <div className='tri invert'></div>
              <div className='tri invert'></div>
              <div className='tri'></div>
              <div className='tri invert'></div>
              <div className='tri'></div>
              <div className='tri invert'></div>
            </span>
            SmartTicket
            <span className='badge badge-up badge-danger'>{this.state.onlineUsers}</span>
          </Link>
        </div>
        <div id='navbar' className='navbar-collapse collapse'>
          <ul className='nav navbar-nav'>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/stats'>Stats</Link></li>
          </ul>

          <ul className='nav navbar-nav' style={{float: 'right'}}>
            <li><a>Bem-vindo, {this.state.userDetails.name} !</a></li>
            <li><a className="btn btn-danger" role="button" href='http://google.pt'>Logout</a></li>

          </ul>


        </div>
      </nav>
    );
  }
}

export default Navbar;




          // <form ref='searchForm' className='navbar-form navbar-left animated' onSubmit={this.handleSubmit.bind(this)}>
          //   <div className='input-group'>
          //     <input type='text' className='form-control' placeholder={this.state.totalCharacters + ' characters'} value={this.state.searchQuery} onChange={NavbarActions.updateSearchQuery} />
          //     <span className='input-group-btn'>
          //       <button className='btn btn-default' onClick={this.handleSubmit.bind(this)}><span className='glyphicon glyphicon-search'></span></button>
          //     </span>
          //   </div>
          // </form>
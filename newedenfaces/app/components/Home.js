import React from 'react';
import { Link } from 'react-router';
import HomeStore from '../stores/HomeStore'
import HomeActions from '../actions/HomeActions';
import { first, without, findWhere } from 'underscore';
import AuthService from '../AuthService'




class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = HomeStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    AuthService.login();
    HomeStore.listen(this.onChange);
    HomeActions.getTwoCharacters();
    $("#login-form").delay(100).fadeIn(100);
    $("#register-form").fadeOut(100);
    $('#register-form-link').removeClass('active');
    $('#login-form-link').addClass('active');
    $('#login-form-link').click(function (e) {
      $("#login-form").delay(100).fadeIn(100);
      $("#register-form").fadeOut(100);
      $('#register-form-link').removeClass('active');
      $(this).addClass('active');
      e.preventDefault();
    });
    $('#register-form-link').click(function (e) {
      $("#register-form").delay(100).fadeIn(100);
      $("#login-form").fadeOut(100);
      $('#login-form-link').removeClass('active');
      $(this).addClass('active');
      e.preventDefault();
    });

  }

  componentWillUnmount() {
    HomeStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleClick(character) {
    var winner = character.characterId;
    var loser = first(without(this.state.characters, findWhere(this.state.characters, { characterId: winner }))).characterId;
    HomeActions.vote(winner, loser);
  }

  render() {

    return (
      <div className='container'>

        <div className="row">
          <div className="col-md-4 "></div>
          <div className="col-md-4">
            <center>
              <a href="https://authservice-es-2016.heroku.com/accounts/login/" class="btn btn-primary btn-lg" role="buttton">Autenticar</a>
            </center>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    );
  }
}

export default Home;


                    // <form id="login-form" action="http://phpoll.com/login/process" method="post" role="form" styles="display: block;">
                    //   <div className="form-group">
                    //     <input type="text" name="username" id="username" tabindex="1" className="form-control" placeholder="Username" value="" />
                    //   </div>
                    //   <div className="form-group">
                    //     <input type="password" name="password" id="password" tabindex="2" className="form-control" placeholder="Password" />
                    //   </div>
                    //   <div className="form-group text-center">
                    //     <input type="checkbox" tabindex="3" className="" name="remember" id="remember" />
                    //     <label for="remember"> Remember Me</label>
                    //   </div>
                    //   <div className="form-group">
                    //     <div className="row">
                    //       <div className="col-sm-6 col-sm-offset-3">
                    //         <Link to='/dashboardClient'><input type="submit" name="login-submit" id="login-submit" tabindex="4" className="form-control btn btn-login" value="Log In" /></Link>
                    //       </div>
                    //     </div>
                    //   </div>
                    //   <div className="form-group">
                    //     <div className="row">
                    //       <div className="col-lg-12">
                    //         <div className="text-center">
                    //           <a href="http://phpoll.com/recover" tabindex="5" className="forgot-password">Forgot Password?</a>
                    //         </div>
                    //       </div>
                    //     </div>
                    //   </div>
                    // </form>
                    // <form id="register-form" action="http://phpoll.com/register/process" method="post" role="form" styles="display: none;">
                    //   <div className="form-group">
                    //     <input type="text" name="username" id="username" tabindex="1" className="form-control" placeholder="Username" value="" />
                    //   </div>
                    //   <div className="form-group">
                    //     <input type="email" name="email" id="email" tabindex="1" className="form-control" placeholder="Email Address" value="" />
                    //   </div>
                    //   <div className="form-group">
                    //     <input type="password" name="password" id="password" tabindex="2" className="form-control" placeholder="Password" />
                    //   </div>
                    //   <div className="form-group">
                    //     <input type="password" name="confirm-password" id="confirm-password" tabindex="2" className="form-control" placeholder="Confirm Password" />
                    //   </div>
                    //   <div className="form-group">
                    //     <div className="row">
                    //       <div className="col-sm-6 col-sm-offset-3">
                    //         <input type="submit" name="register-submit" id="register-submit" tabindex="4" className="form-control btn btn-register" value="Register Now" />
                    //       </div>
                    //     </div>
                    //   </div>
                    // </form>
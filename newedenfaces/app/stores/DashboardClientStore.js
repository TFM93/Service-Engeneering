import { assign, contains } from 'underscore';
import alt from '../alt';
import DashboardClientActions from '../actions/DashboardClientActions';

class DashboardClientStore {
  constructor() {
    this.bindActions(DashboardClientActions);
    this.lastTickets = [];
    this.myTickets = [];
    this.user = { id: '', token: '', uuid: '' }
    this.credits = 0;
    this.creditsToGet = 0;
    this.userDetails = {};
    this.jump = 0;
    this.jumpType = '';
  }



  onUpdateJumpType(event) {
    this.jumpType = event.target.value;
  }

  onJumpSuccess(data) {
    console.log(data);
  }



  onLoginSuccess(usr) {
    this.user.id = usr.id;
    this.user.uuid = usr.uuid;
    console.log("apos login")
    console.log(this.user)
  }

  onJumpFail(jqXhr) {
    // Handle multiple response formats, fallback to HTTP status code number.
    toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
  }



  onGetCreditsSuccess(data) {

    this.credits = data;
  }


  onUpdateJump(event) {
    this.jump = event.target.value;
  }

  onUpdateCreditsToGet(event) {
    this.creditsToGet = event.target.value;
  }

  onGetCreditsFail(jqXhr) {
    // Handle multiple response formats, fallback to HTTP status code number.
    toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
  }


  onGetLastTicketsSuccess(data) {
    this.lastTickets = data;
  }

  onGetLastTicketsFail(jqXhr) {
    // Handle multiple response formats, fallback to HTTP status code number.
    toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
  }

  onGetMyTicketsSuccess(data) {
    this.myTickets = data;
  }

  onGetMyTicketsFail(jqXhr) {
    // Handle multiple response formats, fallback to HTTP status code number.
    toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
  }

  onLoginFail(jqXhr) {
    // Handle multiple response formats, fallback to HTTP status code number.
    toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
  }


  onTestSuccess(data) {
    console.log("on test success")
    console.log(data);
    this.myTickets = data;
  }

  onTestFail(jqXhr) {
    toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
  }

  onGetUserDetailsSuccess(data) {
    this.userDetails = data.extra_data;
    console.log(this.userDetails);
  }

  onGetUserDetailsFail(jqXhr) {
    // Handle multiple response formats, fallback to HTTP status code number.
    toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
  }




}

export default alt.createStore(DashboardClientStore);
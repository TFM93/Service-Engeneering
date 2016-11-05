import { assign, contains } from 'underscore';
import alt from '../alt';
import DashboardClientActions from '../actions/DashboardClientActions';

class DashboardClientStore {
  constructor() {
    this.bindActions(DashboardClientActions);
    this.lastTickets = [];
    this.myTickets = [];
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


  onTestSuccess(data) {
    console.log("on test success")
    console.log(data);
    this.myTickets = data;
  }

  onTestFail(jqXhr) {
    toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
  }



}

export default alt.createStore(DashboardClientStore);
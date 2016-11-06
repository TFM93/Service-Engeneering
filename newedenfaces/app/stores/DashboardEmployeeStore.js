import { assign, contains } from 'underscore';
import alt from '../alt';
import DashboardEmployeeActions from '../actions/DashboardEmployeeActions';

class DashboardEmployeeStore {
    constructor() {
        this.bindActions(DashboardEmployeeActions);
        this.currentTickets = [];
    }

    onNextTicketSuccess(data) {
        console.log("on next success")
        console.log(data);
        this.currentTickets = data;

    }

    onNextTicketFail(jqXhr) {
        toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
    }

    onAttendTicketSuccess(data) {
        console.log("SUCESSO A ATENDER");
        console.log(data);
    }

    onAttendTicketFail(jqXhr) {
        toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
    }




}

export default alt.createStore(DashboardEmployeeStore);
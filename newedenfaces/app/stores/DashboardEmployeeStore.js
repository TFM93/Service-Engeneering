import { assign, contains } from 'underscore';
import alt from '../alt';
import DashboardEmployeeActions from '../actions/DashboardEmployeeActions';

class DashboardEmployeeStore {
    constructor() {
        this.bindActions(DashboardEmployeeActions);
        this.currentTickets = [];
        this.newQueueName = '';
    }

    onNextTicketSuccess(data) {
        console.log("on next success")
        console.log(data);
        this.currentTickets = data;

    }

    onUpdateNewQueueName(event) {
        this.newQueueName = event.target.value;
    }

    onNewDaySuccess(data) {
        console.log(data);
        this.currentTickets = [];
    }

    onNewQueueSuccess(data) {
        console.log("on new queue success")
        console.log(data);
    }

    onNewQueueFail(data) {
        console.log(data);
    }

    onCloseDaySuccess(data) {
        console.log(data);

    }

    onCloseDayFail(jqXhr) {
        toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
    }


    onNewDayFail(jqXhr) {
        toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
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
import alt from '../alt';

class DashboardEmployeeActions {
  constructor() {
    this.generateActions(
      'reportSuccess',
      'reportFail',
      'nextTicketSuccess',
      'nextTicketFail',
      'attendTicketSuccess',
      'attendTicketFail',
      'newDaySuccess',
      'newDayFail',
      'closeDaySuccess',
      'closeDayFail'
    );
  }

  nextTicket() {
    $.ajax({
      type: 'GET',
      url: 'https://esmickettodule.herokuapp.com/employee/everyNextTicket'
    })
      .done((data) => {
        this.actions.nextTicketSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.nextTicketFail(jqXhr);
      });
  }


  newDay() {
    $.ajax({
      type: 'POST',
      url: 'https://esmickettodule.herokuapp.com/employee/newDay'
    })
      .done((data) => {
        this.actions.newDaySuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.newDayFail(jqXhr);
      });
  }

  closeDay() {
    $.ajax({
      type: 'POST',
      url: 'https://esmickettodule.herokuapp.com/employee/closeForTheDay'
    })
      .done((data) => {
        this.actions.closeDaySuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.closeDayFail(jqXhr);
      });
  }





  attendTicket(type, nr) {
    console.log(nr + type)
    $.ajax({
      type: 'POST',
      url: 'http://esmickettodule.herokuapp.com/employee/ticketAttended',
      data: { "ticket": { "ticket_number": nr, "ticket_type": type } }
    })
      .done((data) => {
        this.actions.attendTicketSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.attendTicketFail(jqXhr);
      });
  }



  report(DashboardEmployeeId) {
    $.ajax({
      type: 'POST',
      url: '/api/report',
      data: { DashboardEmployeeId: DashboardEmployeeId }
    })
      .done(() => {
        this.actions.reportSuccess();
      })
      .fail((jqXhr) => {
        this.actions.reportFail(jqXhr);
      });
  }
}

export default alt.createActions(DashboardEmployeeActions);
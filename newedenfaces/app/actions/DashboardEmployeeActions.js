import alt from '../alt';

class DashboardEmployeeActions {
    constructor() {
        this.generateActions(
            'reportSuccess',
            'reportFail',
            'nextTicketSuccess',
            'nextTicketFail',
            'attendTicketSuccess',
            'attendTicketFail'
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

        
        
        attendTicket(type, nr) {
    console.log(nr+type)
    $.ajax({
      type: 'POST',
      url: 'http://esmickettodule.herokuapp.com/employee/ticketAttended',
      data: { "ticket":{"ticket_number":nr, "ticket_type":type} }
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
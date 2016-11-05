import alt from '../alt';

class DashboardClientActions {
  constructor() {
    this.generateActions(
      'reportSuccess',
      'reportFail',
      'getLastTicketsSuccess',
      'getLastTicketsFail',
      'getMyTicketsSuccess',
      'getMyTicketsFail',
      'testSuccess',
      'testFail'
    );
  }

  test(type, nr) {
    console.log(nr+type)
    $.ajax({
      type: 'POST',
      url: 'http://192.168.1.78/client/cancelTicket',
      data: { "ticket":{"ticket_number":nr, "ticket_type":type} }
    })
      .done((data) => {
        this.actions.testSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.testFail(jqXhr);
      });
  }

  getLastTickets() {
    $.ajax({
      url: 'http://esmickettodule.herokuapp.com/lastTickets',
      //url: 'http://192.168.1.78/lastTickets',
      type: 'get'
    })
      .done((data) => {
        this.actions.getLastTicketsSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getLastTicketsFail(jqXhr);
      });
  }


  getMyTickets() {
    $.ajax({
      url: 'http://192.168.1.78/everyQueue',
      type: 'get'
    })
      .done((data) => {
        this.actions.getMyTicketsSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getMyTicketsFail(jqXhr);
      });
  }

  report(DashboardClientId) {
    $.ajax({
      type: 'POST',
      url: '/api/report',
      data: { DashboardClientId: DashboardClientId }
    })
      .done(() => {
        this.actions.reportSuccess();
      })
      .fail((jqXhr) => {
        this.actions.reportFail(jqXhr);
      });
  }
}

export default alt.createActions(DashboardClientActions);
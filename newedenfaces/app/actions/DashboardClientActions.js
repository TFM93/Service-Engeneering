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
      'testFail',
      'loginSuccess',
      'loginFail',
      'getCreditsSuccess',
      'getCreditsFail'
    );
  }

  test(type, nr) {
    console.log(nr + type)
    $.ajax({
      type: 'POST',
      url: 'https://esmickettodule.herokuapp.com/client/cancelTicket',
      data: { "ticket": { "ticket_number": nr, "ticket_type": type } }
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
      url: 'https://esmickettodule.herokuapp.com/lastTickets',
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

  logUser(usr) {
    //this.actions.login({id:usr.id, token:usr.token});
    $.ajax({
      type: 'GET',
      url: '/auth/api/authentication/user/id/' + usr.id + '/',
      headers: { 'Authorization': 'Token ' + usr.token }
    })
      .done((data) => {
        usr.uuid = data.uuid;
        this.actions.loginSuccess(usr);
      })
      .fail((jqXhr) => {
        this.actions.loginFail(jqXhr);
      });
    // url = 'http://authservice-es-2016.herokuapp.com/api/authentication/user/uuid/4/'
    // res = requests.get(url, auth=('admin', 'ad.test.min.es'))
    // print res.text

  }

  getCredits() {
    this.actions.getCreditsSuccess(10);
  //   $.ajax({
  //     url: 'https://esmickettodule.herokuapp.com/everyQueue',
  //     type: 'get'
  //   })
  //     .done((data) => {
  //       this.actions.getMyTicketsSuccess(data);
  //     })
  //     .fail((jqXhr) => {
  //       this.actions.getMyTicketsFail(jqXhr);
  //     });
  }



  getMyTickets() {
    $.ajax({
      url: 'https://esmickettodule.herokuapp.com/everyQueue',
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
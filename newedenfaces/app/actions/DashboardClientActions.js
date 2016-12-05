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
      'getCreditsFail',
      'updateCreditsToGet',
      'getUserDetailsSuccess',
      'getUserDetailsFail',
      'updateJump',
      'updateJumpType',
      'jumpSuccess',
      'jumpFail'
    );
  }

  jump(payload) {
    console.log(payload);
    $.ajax({
      type: 'POST',
      url: 'https://esmickettodule.herokuapp.com/client/jumpInQueue',
      data: { "ticket_type": payload.jumpType, "ticket_uuid": payload.user.uuid,"number_of_jumps": payload.jump}
    })
      .done((data) => {
        this.actions.jumpSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.jumpFail(jqXhr);
      });


  }


  getUserDetails(id) {
    $.ajax({
      type: 'GET',
      url: '/auth/api/authentication/user/details/' + id + '/'
    })
      .done((data) => {
        this.actions.getUserDetailsSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getUserDetailsFail(jqXhr);
      });
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

  buyCredits(payload) {
    console.log("GET CREDITS")
    console.log(payload);
    //nots2.aws.atnog.av.it.pt
    //nots2.aws.atnog.av.it.pt/pay/1000/rui
    window.location.replace("https://nots2.aws.atnog.av.it.pt/pay/" + payload.creditsToGet * 100 + "/" + payload.user.id);
    // $.ajax({
    //   url: 'https://esmickettodule.herokuapp.com/lastTickets',
    //   //url: 'http://192.168.1.78/lastTickets',
    //   type: 'get'
    // })
    //   .done((data) => {
    //     this.actions.getLastTicketsSuccess(data);
    //   })
    //   .fail((jqXhr) => {
    //     this.actions.getLastTicketsFail(jqXhr);
    //   });

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

  getCredits(id) {
    //this.actions.getCreditsSuccess(10);

    $.ajax({
      url: '/payment/api/get/' + id + '/',
      type: 'get'
    })
      .done((data) => {
        console.log(data);
        this.actions.getCreditsSuccess(data.credit_amt);
      })
      .fail((jqXhr) => {
        this.actions.getMyTicketsFail(jqXhr);
      });
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
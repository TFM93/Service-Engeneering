import alt from '../alt';

class NewTicketActions {
  constructor() {
    this.generateActions(
      'getNewTicketSuccess',
      'getNewTicketFail',
      'updateName',
      'updateGender',
      'invalidName',
      'invalidGender'
    );
  }

  getNewTicket(name, gender) {
    $.ajax({
      type: 'POST',
      url: '/api/characters',
      data: { name: name, gender: gender }
    })
      .done((data) => {
        this.actions.getNewTicketSuccess(data.message);
      })
      .fail((jqXhr) => {
        this.actions.getNewTicketFail(jqXhr.responseJSON.message);
      });
  }
}

export default alt.createActions(NewTicketActions);
import React from 'react';
import DashboardClientStore from '../stores/DashboardClientStore';
import DashboardClientActions from '../actions/DashboardClientActions'



class DashboardClient extends React.Component {
  constructor(props) {
    super(props);
    this.state = DashboardClientStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    DashboardClientStore.listen(this.onChange);
    DashboardClientActions.getLastTickets();
    DashboardClientActions.getMyTickets();
    DashboardClientActions.getCredits(location.search[4]);
    DashboardClientActions.getUserDetails(location.search[4]);
    console.log(document.cookie);
    console.log(this.props)
    DashboardClientActions.logUser({ id: this.props.location.query.id, token: this.props.location.query.token });

  }

  componentWillUnmount() {
    DashboardClientStore.unlisten(this.onChange);
    $(document.body).removeClass();
  }

  componentDidUpdate(prevProps) {
    // Fetch new charachter data when URL path changes
    if (prevProps.params.id !== this.props.params.id) {
      DashboardClientActions.getDashboardClient(this.props.params.id);
    }
  }

  onChange(state) {
    this.setState(state);
    console.log("eoqlol")
    console.log(this.state.myTickets);


    // this.state.myTickets.map((ticket) => {
    //   for (let i = 0; i < this.state.myTickets.length; i++) {
    //     if (ticket.queue[i]['ticket_UUID'] == '2') {
    //       //aux.push({ 'nr': ticket.queue[i]['ticket_number'], type: ticket.type });  
    //       console.log("ayy lmao that's spooky m8")

    //     }
    //   }
    // });

  }


  handleCreditSubmit(event) {
    event.preventDefault();
    console.log("CHEGA AKI MPS")
    console.log(this.state.creditsToGet)
    let creditsToGet = this.state.creditsToGet;

    if (creditsToGet) {
      console.log("YA POIS AQQUQUQUQUQQ")
      DashboardClientActions.buyCredits({
        creditsToGet: creditsToGet,
        user: this.state.user,
        history: this.props.history
      });
    }
    else {
      console.log("n pintou o if mpt")
    }
  }

  render() {


    let lastTicketsBoard = this.state.lastTickets.map((ticket) => {
      return (
        <div key={ticket['ticket_type']} className="col-lg-3">
          <div className="panel panel-default">
            <div className="panel-heading">{ticket['ticket_type']}</div>
            <div className="panel-body">{ticket['ticket_number']}</div>
          </div>
        </div>


      )
    });


    //var aux = [];
    let myTickets = this.state.myTickets.map((ticket) => {
      let avgTime = 0;
      for (let i = 0; i < ticket.queue.length; i++) {
        avgTime = avgTime + ticket['queue_average_time'];
        console.log("pre if :" + avgTime);

        if (ticket.queue[i]['ticket_UUID'] == this.state.user.uuid) {
          console.log(i);

          //console.log((Math.ceil(avgTime)).toHHMMSS());

          let dateTime = new Date(avgTime);




          return (

            <div key={ticket.type} className="col-lg-3">
              <div className="panel panel-default">
                <div className="panel-heading"><center>{ticket['type']}</center></div>
                <div className="panel-body">
                  <div className="row">
                    <div className="col-lg-6"><center>{ticket.queue[i]['ticket_number']}</center></div>
                    <div className="col-lg-6"><center>Tempo Estimado: {dateTime.getHours() + ':' + dateTime.getMinutes() + ':' + dateTime.getSeconds()}</center></div>
                  </div>
                </div>



              </div>
              <center><button onClick={DashboardClientActions.test.bind(this, ticket['type'], ticket.queue[i]['ticket_number'])} className="btn btn-danger">Cancelar Senha</button></center>
            </div>

          );


        }
      }

    });


    return (
      <div className='container'>

        <div className="row">
          <div className="col-lg-4"></div>
          <div className="col-lg-3">
            <h3>Bem-vindo, {this.state.userDetails.name}!</h3>
          </div>
          <div className="col-lg-5">
            <br/>
            <a className="btn btn-danger" role="button" href='http://authservice-es-2016.herokuapp.com/accounts/logout/'>Logout</a>

          </div>

        </div>

        <hr/>

        <div className="row">
          <div className="col-lg-12">
            <div className="panel panel-info">
              <div className="panel-heading"><h4>Créditos</h4></div>
              <div className="panel-body">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="panel panel-default">
                      <div className="panel-heading"><center>Os meus créditos</center></div>
                      <div className="panel-body">
                        <center>
                          {this.state.credits}
                        </center>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="panel panel-default">
                      <div className="panel-heading"><center>Obter créditos</center></div>
                      <div className="panel-body">
                        <center>


                          <form className='form-inline' onSubmit={this.handleCreditSubmit.bind(this)}>
                            <div className='input-group'>
                              <input type='number' className='form-control' placeholder="Nr de créditos a obter" value={this.state.creditsToGet} onChange={DashboardClientActions.updateCreditsToGet} />
                              <span className='input-group-btn'>
                                <button type="submit" className="btn btn-primary" data-toggle="tooltip" title="Será reencaminhado para a página de pagamentos">Receber créditos</button>
                              </span>
                            </div>
                          </form>

                        </center>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>


        <hr/>
        <div className="row">
          <div className="col-lg-12">
            <div className="panel panel-info">
              <div className="panel-heading"><h4>Filas de Espera (senha actual)</h4></div>
              <div className="panel-body">
                <div className="row">
                  {lastTicketsBoard}
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="row">
          <div className="col-lg-12">
            <div className="panel panel-info">
              <div className="panel-heading"><h4>As minhas senhas</h4></div>
              <div className="panel-body">
                <div className="row">
                  {myTickets}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default DashboardClient;


// <li key={character.tick}>
//   <Link to={'/characters/' + character.characterId}>
//     <img className='thumb-md' src={'http://image.eveonline.com/Character/' + character.characterId + '_128.jpg'} />
//   </Link>
// </li>


//         <div key={ticket["ticket_type"]} className="panel panel-default">
//   <div className="panel-heading">{ticket["ticket_type"]}</div>
//   <div className="panel-body">{ticket["ticket_number"]}</div>
// </div>


//         <div className="col-lg-12">
//   <div className="panel panel-default">
//     <div className="panel-heading">A</div>
//     <div className="panel-body">54</div>
//   </div>
// </div>

// <form className="form-inline">
//   <div className="form-group">
//     <input type="number" className="form-control" id="exampleInputEmail2" placeholder="Número de créditos a obter" />
//   </div>

// </form>
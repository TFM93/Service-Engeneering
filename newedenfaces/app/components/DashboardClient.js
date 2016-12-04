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
    DashboardClientActions.getCredits();
    console.log(document.cookie);
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
          <div className="col-lg-12">
            <div className="panel panel-info">
              <div className="panel-heading"><h4>Créditos: {this.state.credits}</h4></div>
            </div>
          </div>

        </div>

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
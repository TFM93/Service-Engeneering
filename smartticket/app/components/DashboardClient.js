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

    // $('.magnific-popup').magnificPopup({
    //   type: 'image',
    //   mainClass: 'mfp-zoom-in',
    //   closeOnContentClick: true,
    //   midClick: true,
    //   zoom: {
    //     enabled: true,
    //     duration: 300
    //   }
    // });
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

      for (let i = 0; i < ticket.queue.length; i++) {
        if (ticket.queue[i]['ticket_UUID'] == 'C3C72F79') {
          //aux.push({ 'nr': ticket.queue[i]['ticket_number'], type: ticket.type });

          return(

          <div key={ticket.queue[i]['ticket_UUID']} className="col-lg-3">
            <div className="panel panel-default">
              <div className="panel-heading">{ticket['type']}</div>
              <div className="panel-body">{ticket.queue[i]['ticket_number']}</div>
            </div>
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
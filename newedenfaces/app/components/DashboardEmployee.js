import React from 'react';
import DashboardEmployeeStore from '../stores/DashboardEmployeeStore';
import DashboardEmployeeActions from '../actions/DashboardEmployeeActions'



class DashboardEmployee extends React.Component {
    constructor(props) {
        super(props);
        this.state = DashboardEmployeeStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        DashboardEmployeeStore.listen(this.onChange);
        DashboardEmployeeActions.nextTicket();

    }

    componentWillUnmount() {
        DashboardEmployeeStore.unlisten(this.onChange);
        $(document.body).removeClass();
    }

    componentDidUpdate(prevProps) {
        // Fetch new charachter data when URL path changes
        if (prevProps.params.id !== this.props.params.id) {
            DashboardEmployeeActions.getDashboardEmployee(this.props.params.id);
        }
    }

    onChange(state) {
        this.setState(state);


    }

    render() {


        console.log(this.state.currentTickets);

        var currentTickets = this.state.currentTickets.map((ticket) => {

            if (ticket != null) {
                return (
                    <div key={ticket['type']} className="col-lg-3">
                        <div className="panel panel-default">
                            <div className="panel-heading">{ticket['type']}</div>
                            <div className="panel-body">{ticket['ticket_number']}</div>
                        </div>
                        <center><button onClick={DashboardEmployeeActions.attendTicket.bind(this, ticket['type'], ticket['ticket_number'])} type="button" className="btn btn-success">Próxima Senha</button></center>
                    </div>
                );
            }


        })




        return (
            <div className='container'>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="panel panel-info">
                            <div className="panel-heading">
                                <div className="row">
                                    <div className="col-lg-8">
                                        <h4>Gestão de Senhas</h4>
                                    </div>
                                    <div className="col-lg-2">
                                        <button onClick={DashboardEmployeeActions.newDay.bind(this)} className="btn btn-info btn-block">Começar o Dia</button>
                                    </div>

                                    <div className="col-lg-2">
                                        <button onClick={DashboardEmployeeActions.closeDay.bind(this)} className="btn btn-info btn-block">Acabar o Dia</button>
                                    </div>
                                </div>



                            </div>
                            <div className="panel-body">

                                <div className="row">
                                    {currentTickets}
                                </div>
                            </div>

                        </div>

                        <div className="panel panel-info">
                            <div className="panel-heading">
                                <h4>Adicionar filas de espera</h4>
                            </div>
                            <div className="panel-body">

                                <input type="text" placeholder="Introduza aqui o nome da nova fila" />
                            </div>

                        </div>


                    </div>

                </div>


                <br />




            </div>

        );
    }
}

export default DashboardEmployee;

                    // <div className="col-lg-6">
                    //     <center>
                    //         <button type="button" className="btn btn-success">Senha Atendida</button>
                    //     </center>
                    // </div>



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
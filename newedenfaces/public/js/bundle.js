(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AuthService = function () {
    function AuthService() {
        _classCallCheck(this, AuthService);
    }

    _createClass(AuthService, [{
        key: "login",
        value: function login() {
            // We call the server to log the user in.
            console.log("dfs");
            // return when(request({
            //     url: 'http://localhost:3001/sessions/create',
            //     method: 'POST',
            //     crossOrigin: true,
            //     type: 'json',
            //     data: {
            //         username, password
            //     }
            // }))
            //     .then(function (response) {
            //         // We get a JWT back.
            //         let jwt = response.id_token;
            //         // We trigger the LoginAction with that JWT.
            //         LoginActions.loginUser(jwt);
            //         return true;
            //     });
        }
    }]);

    return AuthService;
}();

exports.default = new AuthService();

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AddCharacterActions = function () {
  function AddCharacterActions() {
    _classCallCheck(this, AddCharacterActions);

    this.generateActions('addCharacterSuccess', 'addCharacterFail', 'updateName', 'updateGender', 'invalidName', 'invalidGender');
  }

  _createClass(AddCharacterActions, [{
    key: 'addCharacter',
    value: function addCharacter(name, gender) {
      var _this = this;

      $.ajax({
        type: 'POST',
        url: '/api/characters',
        data: { name: name, gender: gender }
      }).done(function (data) {
        _this.actions.addCharacterSuccess(data.message);
      }).fail(function (jqXhr) {
        _this.actions.addCharacterFail(jqXhr.responseJSON.message);
      });
    }
  }]);

  return AddCharacterActions;
}();

exports.default = _alt2.default.createActions(AddCharacterActions);

},{"../alt":9}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CharacterActions = function () {
  function CharacterActions() {
    _classCallCheck(this, CharacterActions);

    this.generateActions('reportSuccess', 'reportFail', 'getCharacterSuccess', 'getCharacterFail');
  }

  _createClass(CharacterActions, [{
    key: 'getCharacter',
    value: function getCharacter(characterId) {
      var _this = this;

      $.ajax({ url: '/api/characters/' + characterId }).done(function (data) {
        _this.actions.getCharacterSuccess(data);
      }).fail(function (jqXhr) {
        _this.actions.getCharacterFail(jqXhr);
      });
    }
  }, {
    key: 'report',
    value: function report(characterId) {
      var _this2 = this;

      $.ajax({
        type: 'POST',
        url: '/api/report',
        data: { characterId: characterId }
      }).done(function () {
        _this2.actions.reportSuccess();
      }).fail(function (jqXhr) {
        _this2.actions.reportFail(jqXhr);
      });
    }
  }]);

  return CharacterActions;
}();

exports.default = _alt2.default.createActions(CharacterActions);

},{"../alt":9}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DashboardClientActions = function () {
  function DashboardClientActions() {
    _classCallCheck(this, DashboardClientActions);

    this.generateActions('reportSuccess', 'reportFail', 'getLastTicketsSuccess', 'getLastTicketsFail', 'getMyTicketsSuccess', 'getMyTicketsFail', 'testSuccess', 'testFail', 'loginSuccess', 'loginFail', 'getCreditsSuccess', 'getCreditsFail', 'updateCreditsToGet', 'getUserDetailsSuccess', 'getUserDetailsFail');
  }

  _createClass(DashboardClientActions, [{
    key: 'getUserDetails',
    value: function getUserDetails(id) {
      var _this = this;

      $.ajax({
        type: 'GET',
        url: '/auth/api/authentication/user/details/' + id + '/'
      }).done(function (data) {
        _this.actions.getUserDetailsSuccess(data);
      }).fail(function (jqXhr) {
        _this.actions.getUserDetailsFail(jqXhr);
      });
    }
  }, {
    key: 'test',
    value: function test(type, nr) {
      var _this2 = this;

      console.log(nr + type);
      $.ajax({
        type: 'POST',
        url: 'https://esmickettodule.herokuapp.com/client/cancelTicket',
        data: { "ticket": { "ticket_number": nr, "ticket_type": type } }
      }).done(function (data) {
        _this2.actions.testSuccess(data);
      }).fail(function (jqXhr) {
        _this2.actions.testFail(jqXhr);
      });
    }
  }, {
    key: 'buyCredits',
    value: function buyCredits(payload) {
      console.log("GET CREDITS");
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
  }, {
    key: 'getLastTickets',
    value: function getLastTickets() {
      var _this3 = this;

      $.ajax({
        url: 'https://esmickettodule.herokuapp.com/lastTickets',
        //url: 'http://192.168.1.78/lastTickets',
        type: 'get'
      }).done(function (data) {
        _this3.actions.getLastTicketsSuccess(data);
      }).fail(function (jqXhr) {
        _this3.actions.getLastTicketsFail(jqXhr);
      });
    }
  }, {
    key: 'logUser',
    value: function logUser(usr) {
      var _this4 = this;

      //this.actions.login({id:usr.id, token:usr.token});
      $.ajax({
        type: 'GET',
        url: '/auth/api/authentication/user/id/' + usr.id + '/',
        headers: { 'Authorization': 'Token ' + usr.token }
      }).done(function (data) {
        usr.uuid = data.uuid;
        _this4.actions.loginSuccess(usr);
      }).fail(function (jqXhr) {
        _this4.actions.loginFail(jqXhr);
      });
      // url = 'http://authservice-es-2016.herokuapp.com/api/authentication/user/uuid/4/'
      // res = requests.get(url, auth=('admin', 'ad.test.min.es'))
      // print res.text
    }
  }, {
    key: 'getCredits',
    value: function getCredits(id) {
      var _this5 = this;

      //this.actions.getCreditsSuccess(10);

      $.ajax({
        url: '/payment/api/get/' + id + '/',
        type: 'get'
      }).done(function (data) {
        console.log(data);
        _this5.actions.getCreditsSuccess(data.credit_amt);
      }).fail(function (jqXhr) {
        _this5.actions.getMyTicketsFail(jqXhr);
      });
    }
  }, {
    key: 'getMyTickets',
    value: function getMyTickets() {
      var _this6 = this;

      $.ajax({
        url: 'https://esmickettodule.herokuapp.com/everyQueue',
        type: 'get'
      }).done(function (data) {
        _this6.actions.getMyTicketsSuccess(data);
      }).fail(function (jqXhr) {
        _this6.actions.getMyTicketsFail(jqXhr);
      });
    }
  }, {
    key: 'report',
    value: function report(DashboardClientId) {
      var _this7 = this;

      $.ajax({
        type: 'POST',
        url: '/api/report',
        data: { DashboardClientId: DashboardClientId }
      }).done(function () {
        _this7.actions.reportSuccess();
      }).fail(function (jqXhr) {
        _this7.actions.reportFail(jqXhr);
      });
    }
  }]);

  return DashboardClientActions;
}();

exports.default = _alt2.default.createActions(DashboardClientActions);

},{"../alt":9}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DashboardEmployeeActions = function () {
  function DashboardEmployeeActions() {
    _classCallCheck(this, DashboardEmployeeActions);

    this.generateActions('reportSuccess', 'reportFail', 'updateNewQueueName', 'nextTicketSuccess', 'nextTicketFail', 'attendTicketSuccess', 'attendTicketFail', 'newDaySuccess', 'newDayFail', 'closeDaySuccess', 'closeDayFail', 'newQueueSuccess', 'newQueueFail', 'login');
  }

  _createClass(DashboardEmployeeActions, [{
    key: 'nextTicket',
    value: function nextTicket() {
      var _this = this;

      $.ajax({
        type: 'GET',
        url: 'https://esmickettodule.herokuapp.com/employee/everyNextTicket'
      }).done(function (data) {
        _this.actions.nextTicketSuccess(data);
      }).fail(function (jqXhr) {
        _this.actions.nextTicketFail(jqXhr);
      });
    }
  }, {
    key: 'newQueue',
    value: function newQueue(payload) {
      var _this2 = this;

      console.log(payload.newQueueName);

      $.ajax({
        method: 'POST',
        url: 'https://esmickettodule.herokuapp.com/employee/makeNewType',
        data: { "ticket_type": { "ticket_type": payload.newQueueName } }
      }).done(function (data) {
        //assign(payload, data);
        _this2.actions.newQueueSuccess(payload);
      }).fail(function (jqXhr) {
        _this2.actions.newQueueFail(jqXhr);
      });
    }
  }, {
    key: 'newDay',
    value: function newDay() {
      var _this3 = this;

      $.ajax({
        type: 'POST',
        url: 'https://esmickettodule.herokuapp.com/employee/newDay'
      }).done(function (data) {
        _this3.actions.newDaySuccess(data);
      }).fail(function (jqXhr) {
        _this3.actions.newDayFail(jqXhr);
      });
    }
  }, {
    key: 'closeDay',
    value: function closeDay() {
      var _this4 = this;

      $.ajax({
        type: 'POST',
        url: 'https://esmickettodule.herokuapp.com/employee/closeForTheDay'
      }).done(function (data) {
        _this4.actions.closeDaySuccess(data);
      }).fail(function (jqXhr) {
        _this4.actions.closeDayFail(jqXhr);
      });
    }
  }, {
    key: 'logUser',
    value: function logUser(usr) {
      this.actions.login({ id: usr.id, token: usr.token });
    }
  }, {
    key: 'attendTicket',
    value: function attendTicket(type, nr) {
      var _this5 = this;

      console.log(nr + type);
      $.ajax({
        type: 'POST',
        url: 'http://esmickettodule.herokuapp.com/employee/ticketAttended',
        data: { "ticket": { "ticket_number": nr, "ticket_type": type } }
      }).done(function (data) {
        _this5.actions.attendTicketSuccess(data);
      }).fail(function (jqXhr) {
        _this5.actions.attendTicketFail(jqXhr);
      });
    }
  }, {
    key: 'report',
    value: function report(DashboardEmployeeId) {
      var _this6 = this;

      $.ajax({
        type: 'POST',
        url: '/api/report',
        data: { DashboardEmployeeId: DashboardEmployeeId }
      }).done(function () {
        _this6.actions.reportSuccess();
      }).fail(function (jqXhr) {
        _this6.actions.reportFail(jqXhr);
      });
    }
  }]);

  return DashboardEmployeeActions;
}();

exports.default = _alt2.default.createActions(DashboardEmployeeActions);

},{"../alt":9}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FooterActions = function () {
  function FooterActions() {
    _classCallCheck(this, FooterActions);

    this.generateActions('getTopCharactersSuccess', 'getTopCharactersFail');
  }

  _createClass(FooterActions, [{
    key: 'getTopCharacters',
    value: function getTopCharacters() {
      var _this = this;

      $.ajax({ url: '/api/characters/top' }).done(function (data) {
        _this.actions.getTopCharactersSuccess(data);
      }).fail(function (jqXhr) {
        _this.actions.getTopCharactersFail(jqXhr);
      });
    }
  }]);

  return FooterActions;
}();

exports.default = _alt2.default.createActions(FooterActions);

},{"../alt":9}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HomeActions = function () {
  function HomeActions() {
    _classCallCheck(this, HomeActions);

    this.generateActions('getTwoCharactersSuccess', 'getTwoCharactersFail', 'voteFail');
  }

  _createClass(HomeActions, [{
    key: 'getTwoCharacters',
    value: function getTwoCharacters() {
      var _this = this;

      $.ajax({ url: '/api/characters' }).done(function (data) {
        _this.actions.getTwoCharactersSuccess(data);
      }).fail(function (jqXhr) {
        _this.actions.getTwoCharactersFail(jqXhr.responseJSON.message);
      });
    }
  }, {
    key: 'vote',
    value: function vote(winner, loser) {
      var _this2 = this;

      $.ajax({
        type: 'PUT',
        url: '/api/characters',
        data: { winner: winner, loser: loser }
      }).done(function () {
        _this2.actions.getTwoCharacters();
      }).fail(function (jqXhr) {
        _this2.actions.voteFail(jqXhr.responseJSON.message);
      });
    }
  }]);

  return HomeActions;
}();

exports.default = _alt2.default.createActions(HomeActions);

},{"../alt":9}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _underscore = require('underscore');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NavbarActions = function () {
  function NavbarActions() {
    _classCallCheck(this, NavbarActions);

    this.generateActions('updateOnlineUsers', 'updateAjaxAnimation', 'updateSearchQuery', 'getCharacterCountSuccess', 'getCharacterCountFail', 'findCharacterSuccess', 'findCharacterFail');
  }

  _createClass(NavbarActions, [{
    key: 'findCharacter',
    value: function findCharacter(payload) {
      var _this = this;

      $.ajax({
        url: '/api/characters/search',
        data: { name: payload.searchQuery }
      }).done(function (data) {
        (0, _underscore.assign)(payload, data);
        _this.actions.findCharacterSuccess(payload);
      }).fail(function () {
        _this.actions.findCharacterFail(payload);
      });
    }
  }, {
    key: 'getCharacterCount',
    value: function getCharacterCount() {
      var _this2 = this;

      $.ajax({ url: '/api/characters/count' }).done(function (data) {
        _this2.actions.getCharacterCountSuccess(data);
      }).fail(function (jqXhr) {
        _this2.actions.getCharacterCountFail(jqXhr);
      });
    }
  }]);

  return NavbarActions;
}();

exports.default = _alt2.default.createActions(NavbarActions);

},{"../alt":9,"underscore":"underscore"}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alt = require('alt');

var _alt2 = _interopRequireDefault(_alt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _alt2.default();

},{"alt":"alt"}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AddCharacterStore = require('../stores/AddCharacterStore');

var _AddCharacterStore2 = _interopRequireDefault(_AddCharacterStore);

var _AddCharacterActions = require('../actions/AddCharacterActions');

var _AddCharacterActions2 = _interopRequireDefault(_AddCharacterActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddCharacter = function (_React$Component) {
    _inherits(AddCharacter, _React$Component);

    function AddCharacter(props) {
        _classCallCheck(this, AddCharacter);

        var _this = _possibleConstructorReturn(this, (AddCharacter.__proto__ || Object.getPrototypeOf(AddCharacter)).call(this, props));

        _this.state = _AddCharacterStore2.default.getState();
        _this.onChange = _this.onChange.bind(_this);
        return _this;
    }

    _createClass(AddCharacter, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            _AddCharacterStore2.default.listen(this.onChange);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            _AddCharacterStore2.default.unlisten(this.onChange);
        }
    }, {
        key: 'onChange',
        value: function onChange(state) {
            this.setState(state);
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit(event) {
            event.preventDefault();

            var name = this.state.name.trim();
            var gender = this.state.gender;

            if (!name) {
                _AddCharacterActions2.default.invalidName();
                this.refs.nameTextField.getDOMNode().focus();
            }

            if (!gender) {
                _AddCharacterActions2.default.invalidGender();
            }

            if (name && gender) {
                _AddCharacterActions2.default.addCharacter(name, gender);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'container' },
                _react2.default.createElement(
                    'div',
                    { className: 'row flipInX animated' },
                    _react2.default.createElement(
                        'div',
                        { className: 'col-sm-8' },
                        _react2.default.createElement(
                            'div',
                            { className: 'panel panel-default' },
                            _react2.default.createElement(
                                'div',
                                { className: 'panel-heading' },
                                'Add Character'
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'panel-body' },
                                _react2.default.createElement(
                                    'form',
                                    { onSubmit: this.handleSubmit.bind(this) },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'form-group ' + this.state.nameValidationState },
                                        _react2.default.createElement(
                                            'label',
                                            { className: 'control-label' },
                                            'Character Name'
                                        ),
                                        _react2.default.createElement('input', { type: 'text', className: 'form-control', ref: 'nameTextField', value: this.state.name,
                                            onChange: _AddCharacterActions2.default.updateName, autoFocus: true }),
                                        _react2.default.createElement(
                                            'span',
                                            { className: 'help-block' },
                                            this.state.helpBlock
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'form-group ' + this.state.genderValidationState },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'radio radio-inline' },
                                            _react2.default.createElement('input', { type: 'radio', name: 'gender', id: 'female', value: 'Female', checked: this.state.gender === 'Female',
                                                onChange: _AddCharacterActions2.default.updateGender }),
                                            _react2.default.createElement(
                                                'label',
                                                { htmlFor: 'female' },
                                                'Female'
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'radio radio-inline' },
                                            _react2.default.createElement('input', { type: 'radio', name: 'gender', id: 'male', value: 'Male', checked: this.state.gender === 'Male',
                                                onChange: _AddCharacterActions2.default.updateGender }),
                                            _react2.default.createElement(
                                                'label',
                                                { htmlFor: 'male' },
                                                'Male'
                                            )
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'button',
                                        { type: 'submit', className: 'btn btn-primary' },
                                        'Submit'
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return AddCharacter;
}(_react2.default.Component);

exports.default = AddCharacter;

},{"../actions/AddCharacterActions":2,"../stores/AddCharacterStore":20,"react":"react"}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Footer = require('./Footer');

var _Footer2 = _interopRequireDefault(_Footer);

var _Navbar = require('./Navbar');

var _Navbar2 = _interopRequireDefault(_Navbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App() {
        _classCallCheck(this, App);

        return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
    }

    _createClass(App, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_Navbar2.default, { history: this.props.history }),
                this.props.children,
                _react2.default.createElement(_Footer2.default, null)
            );
        }
    }]);

    return App;
}(_react2.default.Component);

exports.default = App;

},{"./Footer":15,"./Navbar":17,"react":"react"}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CharacterStore = require('../stores/CharacterStore');

var _CharacterStore2 = _interopRequireDefault(_CharacterStore);

var _CharacterActions = require('../actions/CharacterActions');

var _CharacterActions2 = _interopRequireDefault(_CharacterActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Character = function (_React$Component) {
  _inherits(Character, _React$Component);

  function Character(props) {
    _classCallCheck(this, Character);

    var _this = _possibleConstructorReturn(this, (Character.__proto__ || Object.getPrototypeOf(Character)).call(this, props));

    _this.state = _CharacterStore2.default.getState();
    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  _createClass(Character, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _CharacterStore2.default.listen(this.onChange);
      _CharacterActions2.default.getCharacter(this.props.params.id);

      $('.magnific-popup').magnificPopup({
        type: 'image',
        mainClass: 'mfp-zoom-in',
        closeOnContentClick: true,
        midClick: true,
        zoom: {
          enabled: true,
          duration: 300
        }
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _CharacterStore2.default.unlisten(this.onChange);
      $(document.body).removeClass();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      // Fetch new charachter data when URL path changes
      if (prevProps.params.id !== this.props.params.id) {
        _CharacterActions2.default.getCharacter(this.props.params.id);
      }
    }
  }, {
    key: 'onChange',
    value: function onChange(state) {
      this.setState(state);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'container' },
        _react2.default.createElement(
          'div',
          { className: 'profile-img' },
          _react2.default.createElement(
            'a',
            { className: 'magnific-popup', href: 'https://image.eveonline.com/Character/' + this.state.characterId + '_1024.jpg' },
            _react2.default.createElement('img', { src: 'https://image.eveonline.com/Character/' + this.state.characterId + '_256.jpg' })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'profile-info clearfix' },
          _react2.default.createElement(
            'h2',
            null,
            _react2.default.createElement(
              'strong',
              null,
              this.state.name
            )
          ),
          _react2.default.createElement(
            'h4',
            { className: 'lead' },
            'Race: ',
            _react2.default.createElement(
              'strong',
              null,
              this.state.race
            )
          ),
          _react2.default.createElement(
            'h4',
            { className: 'lead' },
            'Bloodline: ',
            _react2.default.createElement(
              'strong',
              null,
              this.state.bloodline
            )
          ),
          _react2.default.createElement(
            'h4',
            { className: 'lead' },
            'Gender: ',
            _react2.default.createElement(
              'strong',
              null,
              this.state.gender
            )
          ),
          _react2.default.createElement(
            'button',
            { className: 'btn btn-transparent',
              onClick: _CharacterActions2.default.report.bind(this, this.state.characterId),
              disabled: this.state.isReported },
            this.state.isReported ? 'Reported' : 'Report Character'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'profile-stats clearfix' },
          _react2.default.createElement(
            'ul',
            null,
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                'span',
                { className: 'stats-number' },
                this.state.winLossRatio
              ),
              'Winning Percentage'
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                'span',
                { className: 'stats-number' },
                this.state.wins
              ),
              ' Wins'
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                'span',
                { className: 'stats-number' },
                this.state.losses
              ),
              ' Losses'
            )
          )
        )
      );
    }
  }]);

  return Character;
}(_react2.default.Component);

exports.default = Character;

},{"../actions/CharacterActions":3,"../stores/CharacterStore":21,"react":"react"}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DashboardClientStore = require('../stores/DashboardClientStore');

var _DashboardClientStore2 = _interopRequireDefault(_DashboardClientStore);

var _DashboardClientActions = require('../actions/DashboardClientActions');

var _DashboardClientActions2 = _interopRequireDefault(_DashboardClientActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DashboardClient = function (_React$Component) {
  _inherits(DashboardClient, _React$Component);

  function DashboardClient(props) {
    _classCallCheck(this, DashboardClient);

    var _this = _possibleConstructorReturn(this, (DashboardClient.__proto__ || Object.getPrototypeOf(DashboardClient)).call(this, props));

    _this.state = _DashboardClientStore2.default.getState();
    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  _createClass(DashboardClient, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _DashboardClientStore2.default.listen(this.onChange);
      _DashboardClientActions2.default.getLastTickets();
      _DashboardClientActions2.default.getMyTickets();
      _DashboardClientActions2.default.getCredits(location.search[4]);
      _DashboardClientActions2.default.getUserDetails(location.search[4]);
      console.log(document.cookie);
      console.log(this.props);
      _DashboardClientActions2.default.logUser({ id: this.props.location.query.id, token: this.props.location.query.token });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _DashboardClientStore2.default.unlisten(this.onChange);
      $(document.body).removeClass();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      // Fetch new charachter data when URL path changes
      if (prevProps.params.id !== this.props.params.id) {
        _DashboardClientActions2.default.getDashboardClient(this.props.params.id);
      }
    }
  }, {
    key: 'onChange',
    value: function onChange(state) {
      this.setState(state);
      console.log("eoqlol");
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
  }, {
    key: 'handleCreditSubmit',
    value: function handleCreditSubmit(event) {
      event.preventDefault();
      console.log("CHEGA AKI MPS");
      console.log(this.state.creditsToGet);
      var creditsToGet = this.state.creditsToGet;

      if (creditsToGet) {
        console.log("YA POIS AQQUQUQUQUQQ");
        _DashboardClientActions2.default.buyCredits({
          creditsToGet: creditsToGet,
          user: this.state.user,
          history: this.props.history
        });
      } else {
        console.log("n pintou o if mpt");
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var lastTicketsBoard = this.state.lastTickets.map(function (ticket) {
        return _react2.default.createElement(
          'div',
          { key: ticket['ticket_type'], className: 'col-lg-3' },
          _react2.default.createElement(
            'div',
            { className: 'panel panel-default' },
            _react2.default.createElement(
              'div',
              { className: 'panel-heading' },
              ticket['ticket_type']
            ),
            _react2.default.createElement(
              'div',
              { className: 'panel-body' },
              ticket['ticket_number']
            )
          )
        );
      });

      //var aux = [];
      var myTickets = this.state.myTickets.map(function (ticket) {
        var avgTime = 0;
        for (var i = 0; i < ticket.queue.length; i++) {
          avgTime = avgTime + ticket['queue_average_time'];
          console.log("pre if :" + avgTime);

          if (ticket.queue[i]['ticket_UUID'] == _this2.state.user.uuid) {
            console.log(i);

            //console.log((Math.ceil(avgTime)).toHHMMSS());

            var dateTime = new Date(avgTime);

            return _react2.default.createElement(
              'div',
              { key: ticket.type, className: 'col-lg-3' },
              _react2.default.createElement(
                'div',
                { className: 'panel panel-default' },
                _react2.default.createElement(
                  'div',
                  { className: 'panel-heading' },
                  _react2.default.createElement(
                    'center',
                    null,
                    ticket['type']
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'panel-body' },
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      'div',
                      { className: 'col-lg-6' },
                      _react2.default.createElement(
                        'center',
                        null,
                        ticket.queue[i]['ticket_number']
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'col-lg-6' },
                      _react2.default.createElement(
                        'center',
                        null,
                        'Tempo Estimado: ',
                        dateTime.getHours() + ':' + dateTime.getMinutes() + ':' + dateTime.getSeconds()
                      )
                    )
                  )
                )
              ),
              _react2.default.createElement(
                'center',
                null,
                _react2.default.createElement(
                  'button',
                  { onClick: _DashboardClientActions2.default.test.bind(_this2, ticket['type'], ticket.queue[i]['ticket_number']), className: 'btn btn-danger' },
                  'Cancelar Senha'
                )
              )
            );
          }
        }
      });

      return _react2.default.createElement(
        'div',
        { className: 'container' },
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement('div', { className: 'col-lg-4' }),
          _react2.default.createElement(
            'div',
            { className: 'col-lg-3' },
            _react2.default.createElement(
              'h3',
              null,
              'Bem-vindo, ',
              this.state.userDetails.name,
              '!'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-lg-5' },
            _react2.default.createElement('br', null),
            _react2.default.createElement(
              'a',
              { className: 'btn btn-danger', role: 'button', href: 'http://authservice-es-2016.herokuapp.com/accounts/logout/' },
              'Logout'
            )
          )
        ),
        _react2.default.createElement('hr', null),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'col-lg-12' },
            _react2.default.createElement(
              'div',
              { className: 'panel panel-info' },
              _react2.default.createElement(
                'div',
                { className: 'panel-heading' },
                _react2.default.createElement(
                  'h4',
                  null,
                  'Cr\xE9ditos'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'panel-body' },
                _react2.default.createElement(
                  'div',
                  { className: 'row' },
                  _react2.default.createElement(
                    'div',
                    { className: 'col-lg-6' },
                    _react2.default.createElement(
                      'div',
                      { className: 'panel panel-default' },
                      _react2.default.createElement(
                        'div',
                        { className: 'panel-heading' },
                        _react2.default.createElement(
                          'center',
                          null,
                          'Os meus cr\xE9ditos'
                        )
                      ),
                      _react2.default.createElement(
                        'div',
                        { className: 'panel-body' },
                        _react2.default.createElement(
                          'center',
                          null,
                          this.state.credits
                        )
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'col-lg-6' },
                    _react2.default.createElement(
                      'div',
                      { className: 'panel panel-default' },
                      _react2.default.createElement(
                        'div',
                        { className: 'panel-heading' },
                        _react2.default.createElement(
                          'center',
                          null,
                          'Obter cr\xE9ditos'
                        )
                      ),
                      _react2.default.createElement(
                        'div',
                        { className: 'panel-body' },
                        _react2.default.createElement(
                          'center',
                          null,
                          _react2.default.createElement(
                            'form',
                            { className: 'form-inline', onSubmit: this.handleCreditSubmit.bind(this) },
                            _react2.default.createElement(
                              'div',
                              { className: 'input-group' },
                              _react2.default.createElement('input', { type: 'number', className: 'form-control', placeholder: 'Nr de cr\xE9ditos a obter', value: this.state.creditsToGet, onChange: _DashboardClientActions2.default.updateCreditsToGet }),
                              _react2.default.createElement(
                                'span',
                                { className: 'input-group-btn' },
                                _react2.default.createElement(
                                  'button',
                                  { type: 'submit', className: 'btn btn-primary', 'data-toggle': 'tooltip', title: 'Ser\xE1 reencaminhado para a p\xE1gina de pagamentos' },
                                  'Receber cr\xE9ditos'
                                )
                              )
                            )
                          )
                        )
                      )
                    )
                  )
                )
              )
            )
          )
        ),
        _react2.default.createElement('hr', null),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'col-lg-12' },
            _react2.default.createElement(
              'div',
              { className: 'panel panel-info' },
              _react2.default.createElement(
                'div',
                { className: 'panel-heading' },
                _react2.default.createElement(
                  'h4',
                  null,
                  'Filas de Espera (senha actual)'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'panel-body' },
                _react2.default.createElement(
                  'div',
                  { className: 'row' },
                  lastTicketsBoard
                )
              )
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'col-lg-12' },
            _react2.default.createElement(
              'div',
              { className: 'panel panel-info' },
              _react2.default.createElement(
                'div',
                { className: 'panel-heading' },
                _react2.default.createElement(
                  'h4',
                  null,
                  'As minhas senhas'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'panel-body' },
                _react2.default.createElement(
                  'div',
                  { className: 'row' },
                  myTickets
                )
              )
            )
          )
        )
      );
    }
  }]);

  return DashboardClient;
}(_react2.default.Component);

exports.default = DashboardClient;

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

},{"../actions/DashboardClientActions":4,"../stores/DashboardClientStore":22,"react":"react"}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DashboardEmployeeStore = require('../stores/DashboardEmployeeStore');

var _DashboardEmployeeStore2 = _interopRequireDefault(_DashboardEmployeeStore);

var _DashboardEmployeeActions = require('../actions/DashboardEmployeeActions');

var _DashboardEmployeeActions2 = _interopRequireDefault(_DashboardEmployeeActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DashboardEmployee = function (_React$Component) {
    _inherits(DashboardEmployee, _React$Component);

    function DashboardEmployee(props) {
        _classCallCheck(this, DashboardEmployee);

        var _this = _possibleConstructorReturn(this, (DashboardEmployee.__proto__ || Object.getPrototypeOf(DashboardEmployee)).call(this, props));

        _this.state = _DashboardEmployeeStore2.default.getState();
        _this.onChange = _this.onChange.bind(_this);
        return _this;
    }

    _createClass(DashboardEmployee, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            _DashboardEmployeeStore2.default.listen(this.onChange);
            _DashboardEmployeeActions2.default.nextTicket();
            _DashboardEmployeeActions2.default.logUser({ id: this.props.location.query.id, token: this.props.location.query.token });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            _DashboardEmployeeStore2.default.unlisten(this.onChange);
            $(document.body).removeClass();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            // Fetch new charachter data when URL path changes
            if (prevProps.params.id !== this.props.params.id) {
                _DashboardEmployeeActions2.default.getDashboardEmployee(this.props.params.id);
            }
        }
    }, {
        key: 'onChange',
        value: function onChange(state) {
            this.setState(state);
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit(event) {
            event.preventDefault();

            var newQueueName = this.state.newQueueName.trim();

            if (newQueueName) {
                _DashboardEmployeeActions2.default.newQueue({
                    newQueueName: newQueueName,
                    searchForm: this.refs.searchForm,
                    history: this.props.history
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            //console.log(this.state.currentTickets);

            var currentTickets = this.state.currentTickets.map(function (ticket) {

                if (ticket != null) {
                    return _react2.default.createElement(
                        'div',
                        { key: ticket['type'], className: 'col-lg-3' },
                        _react2.default.createElement(
                            'div',
                            { className: 'panel panel-default' },
                            _react2.default.createElement(
                                'div',
                                { className: 'panel-heading' },
                                ticket['type']
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'panel-body' },
                                ticket['ticket_number']
                            )
                        ),
                        _react2.default.createElement(
                            'center',
                            null,
                            _react2.default.createElement(
                                'button',
                                { onClick: _DashboardEmployeeActions2.default.attendTicket.bind(_this2, ticket['type'], ticket['ticket_number']), type: 'button', className: 'btn btn-success' },
                                'Pr\xF3xima Senha'
                            )
                        )
                    );
                }
            });

            return _react2.default.createElement(
                'div',
                { className: 'container' },
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'col-lg-12' },
                        _react2.default.createElement(
                            'div',
                            { className: 'panel panel-info' },
                            _react2.default.createElement(
                                'div',
                                { className: 'panel-heading' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'row' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'col-lg-8' },
                                        _react2.default.createElement(
                                            'h4',
                                            null,
                                            'Gest\xE3o de Senhas'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'col-lg-2' },
                                        _react2.default.createElement(
                                            'button',
                                            { onClick: _DashboardEmployeeActions2.default.newDay.bind(this), className: 'btn btn-info btn-block' },
                                            'Come\xE7ar o Dia'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'col-lg-2' },
                                        _react2.default.createElement(
                                            'button',
                                            { onClick: _DashboardEmployeeActions2.default.closeDay.bind(this), className: 'btn btn-info btn-block' },
                                            'Acabar o Dia'
                                        )
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'panel-body' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'row' },
                                    currentTickets
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'panel panel-info' },
                            _react2.default.createElement(
                                'div',
                                { className: 'panel-heading' },
                                _react2.default.createElement(
                                    'h4',
                                    null,
                                    'Adicionar filas de espera'
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'panel-body' },
                                _react2.default.createElement(
                                    'form',
                                    { ref: 'searchForm', className: 'navbar-form navbar-left animated', onSubmit: this.handleSubmit.bind(this) },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'input-group' },
                                        _react2.default.createElement('input', { type: 'text', className: 'form-control', placeholder: 'Novo nome', value: this.state.newQueueName, onChange: _DashboardEmployeeActions2.default.updateNewQueueName }),
                                        _react2.default.createElement(
                                            'span',
                                            { className: 'input-group-btn' },
                                            _react2.default.createElement(
                                                'button',
                                                { className: 'btn btn-default', onClick: this.handleSubmit.bind(this) },
                                                _react2.default.createElement('span', { className: 'glyphicon glyphicon-search' })
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                ),
                _react2.default.createElement('br', null)
            );
        }
    }]);

    return DashboardEmployee;
}(_react2.default.Component);

exports.default = DashboardEmployee;

//<input type="text" placeholder="Introduza aqui o nome da nova fila" />


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

},{"../actions/DashboardEmployeeActions":5,"../stores/DashboardEmployeeStore":23,"react":"react"}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _FooterStore = require('../stores/FooterStore');

var _FooterStore2 = _interopRequireDefault(_FooterStore);

var _FooterActions = require('../actions/FooterActions');

var _FooterActions2 = _interopRequireDefault(_FooterActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Footer = function (_React$Component) {
    _inherits(Footer, _React$Component);

    function Footer(props) {
        _classCallCheck(this, Footer);

        var _this = _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).call(this, props));

        _this.state = _FooterStore2.default.getState();
        _this.onChange = _this.onChange.bind(_this);
        return _this;
    }

    _createClass(Footer, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            _FooterStore2.default.listen(this.onChange);
            _FooterActions2.default.getTopCharacters();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            _FooterStore2.default.unlisten(this.onChange);
        }
    }, {
        key: 'onChange',
        value: function onChange(state) {
            this.state = state;
        }
    }, {
        key: 'render',
        value: function render() {

            var leaderboardCharacters = this.state.characters.map(function (character) {
                return _react2.default.createElement(
                    'li',
                    { key: character.characterId },
                    _react2.default.createElement(
                        _reactRouter.Link,
                        { to: '/characters/' + character.characterId },
                        _react2.default.createElement('img', { className: 'thumb-md', src: 'http://image.eveonline.com/Character/' + character.characterId + '_128.jpg' })
                    )
                );
            });

            return _react2.default.createElement(
                'footer',
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'container' },
                    _react2.default.createElement(
                        'div',
                        { className: 'row' },
                        _react2.default.createElement(
                            'div',
                            { className: 'col-sm-12' },
                            _react2.default.createElement(
                                'center',
                                null,
                                _react2.default.createElement(
                                    'h3',
                                    { className: 'lead' },
                                    _react2.default.createElement(
                                        'strong',
                                        null,
                                        'Information'
                                    ),
                                    ' and ',
                                    _react2.default.createElement(
                                        'strong',
                                        null,
                                        'Copyright'
                                    )
                                ),
                                _react2.default.createElement(
                                    'p',
                                    null,
                                    'Service Engineering 2016'
                                )
                            )
                        )
                    )
                )
            );
        }

        // <p>Powered by <strong>Node.js</strong>, <strong>MongoDB</strong> and <strong>React</strong> with Flux architecture and server-side rendering.</p>
        // <p>You may view the <a href='https://github.com/sahat/newedenfaces-react'>Source Code</a> behind this project on GitHub.</p>


    }]);

    return Footer;
}(_react2.default.Component);

// <div className='col-sm-7 hidden-xs'>
//     <h3 className='lead'>Next 5 clients</h3>
//     <ul className='list-inline'>
//         {leaderboardCharacters}
//     </ul>
// </div>


exports.default = Footer;

},{"../actions/FooterActions":6,"../stores/FooterStore":24,"react":"react","react-router":"react-router"}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _HomeStore = require('../stores/HomeStore');

var _HomeStore2 = _interopRequireDefault(_HomeStore);

var _HomeActions = require('../actions/HomeActions');

var _HomeActions2 = _interopRequireDefault(_HomeActions);

var _underscore = require('underscore');

var _AuthService = require('../AuthService');

var _AuthService2 = _interopRequireDefault(_AuthService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Home = function (_React$Component) {
  _inherits(Home, _React$Component);

  function Home(props) {
    _classCallCheck(this, Home);

    var _this = _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).call(this, props));

    _this.state = _HomeStore2.default.getState();
    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  _createClass(Home, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _AuthService2.default.login();
      _HomeStore2.default.listen(this.onChange);
      _HomeActions2.default.getTwoCharacters();
      $("#login-form").delay(100).fadeIn(100);
      $("#register-form").fadeOut(100);
      $('#register-form-link').removeClass('active');
      $('#login-form-link').addClass('active');
      $('#login-form-link').click(function (e) {
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
      });
      $('#register-form-link').click(function (e) {
        $("#register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _HomeStore2.default.unlisten(this.onChange);
    }
  }, {
    key: 'onChange',
    value: function onChange(state) {
      this.setState(state);
    }
  }, {
    key: 'handleClick',
    value: function handleClick(character) {
      var winner = character.characterId;
      var loser = (0, _underscore.first)((0, _underscore.without)(this.state.characters, (0, _underscore.findWhere)(this.state.characters, { characterId: winner }))).characterId;
      _HomeActions2.default.vote(winner, loser);
    }
  }, {
    key: 'render',
    value: function render() {

      return _react2.default.createElement(
        'div',
        { className: 'container' },
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement('div', { className: 'col-md-4 ' }),
          _react2.default.createElement(
            'div',
            { className: 'col-md-4' },
            _react2.default.createElement(
              'center',
              null,
              _react2.default.createElement(
                'a',
                { href: 'https://authservice-es-2016.heroku.com/accounts/login/', 'class': 'btn btn-primary btn-lg', role: 'buttton' },
                'Autenticar'
              )
            )
          ),
          _react2.default.createElement('div', { className: 'col-md-4' })
        )
      );
    }
  }]);

  return Home;
}(_react2.default.Component);

exports.default = Home;

// <form id="login-form" action="http://phpoll.com/login/process" method="post" role="form" styles="display: block;">
//   <div className="form-group">
//     <input type="text" name="username" id="username" tabindex="1" className="form-control" placeholder="Username" value="" />
//   </div>
//   <div className="form-group">
//     <input type="password" name="password" id="password" tabindex="2" className="form-control" placeholder="Password" />
//   </div>
//   <div className="form-group text-center">
//     <input type="checkbox" tabindex="3" className="" name="remember" id="remember" />
//     <label for="remember"> Remember Me</label>
//   </div>
//   <div className="form-group">
//     <div className="row">
//       <div className="col-sm-6 col-sm-offset-3">
//         <Link to='/dashboardClient'><input type="submit" name="login-submit" id="login-submit" tabindex="4" className="form-control btn btn-login" value="Log In" /></Link>
//       </div>
//     </div>
//   </div>
//   <div className="form-group">
//     <div className="row">
//       <div className="col-lg-12">
//         <div className="text-center">
//           <a href="http://phpoll.com/recover" tabindex="5" className="forgot-password">Forgot Password?</a>
//         </div>
//       </div>
//     </div>
//   </div>
// </form>
// <form id="register-form" action="http://phpoll.com/register/process" method="post" role="form" styles="display: none;">
//   <div className="form-group">
//     <input type="text" name="username" id="username" tabindex="1" className="form-control" placeholder="Username" value="" />
//   </div>
//   <div className="form-group">
//     <input type="email" name="email" id="email" tabindex="1" className="form-control" placeholder="Email Address" value="" />
//   </div>
//   <div className="form-group">
//     <input type="password" name="password" id="password" tabindex="2" className="form-control" placeholder="Password" />
//   </div>
//   <div className="form-group">
//     <input type="password" name="confirm-password" id="confirm-password" tabindex="2" className="form-control" placeholder="Confirm Password" />
//   </div>
//   <div className="form-group">
//     <div className="row">
//       <div className="col-sm-6 col-sm-offset-3">
//         <input type="submit" name="register-submit" id="register-submit" tabindex="4" className="form-control btn btn-register" value="Register Now" />
//       </div>
//     </div>
//   </div>
// </form>

},{"../AuthService":1,"../actions/HomeActions":7,"../stores/HomeStore":25,"react":"react","react-router":"react-router","underscore":"underscore"}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _NavbarStore = require('../stores/NavbarStore');

var _NavbarStore2 = _interopRequireDefault(_NavbarStore);

var _NavbarActions = require('../actions/NavbarActions');

var _NavbarActions2 = _interopRequireDefault(_NavbarActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Navbar = function (_React$Component) {
  _inherits(Navbar, _React$Component);

  function Navbar(props) {
    _classCallCheck(this, Navbar);

    var _this = _possibleConstructorReturn(this, (Navbar.__proto__ || Object.getPrototypeOf(Navbar)).call(this, props));

    _this.state = _NavbarStore2.default.getState();
    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  _createClass(Navbar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _NavbarStore2.default.listen(this.onChange);
      _NavbarActions2.default.getCharacterCount();

      var socket = io.connect();

      socket.on('onlineUsers', function (data) {
        _NavbarActions2.default.updateOnlineUsers(data);
      });

      $(document).ajaxStart(function () {
        _NavbarActions2.default.updateAjaxAnimation('fadeIn');
      });

      $(document).ajaxComplete(function () {
        setTimeout(function () {
          _NavbarActions2.default.updateAjaxAnimation('fadeOut');
        }, 750);
      });

      // location.search[4] = id no url
      console.log(location.search[4]);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _NavbarStore2.default.unlisten(this.onChange);
    }
  }, {
    key: 'onChange',
    value: function onChange(state) {
      this.setState(state);
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      event.preventDefault();

      var searchQuery = this.state.searchQuery.trim();

      if (searchQuery) {
        _NavbarActions2.default.findCharacter({
          searchQuery: searchQuery,
          searchForm: this.refs.searchForm,
          history: this.props.history
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {

      return _react2.default.createElement(
        'nav',
        { className: 'navbar navbar-default navbar-static-top' },
        _react2.default.createElement(
          'div',
          { className: 'navbar-header' },
          _react2.default.createElement(
            'button',
            { type: 'button', className: 'navbar-toggle collapsed', 'data-toggle': 'collapse', 'data-target': '#navbar' },
            _react2.default.createElement(
              'span',
              { className: 'sr-only' },
              'Toggle navigation'
            ),
            _react2.default.createElement('span', { className: 'icon-bar' }),
            _react2.default.createElement('span', { className: 'icon-bar' }),
            _react2.default.createElement('span', { className: 'icon-bar' })
          ),
          _react2.default.createElement(
            _reactRouter.Link,
            { to: '/', className: 'navbar-brand' },
            _react2.default.createElement(
              'span',
              { ref: 'triangles', className: 'triangles animated ' + this.state.ajaxAnimationClass },
              _react2.default.createElement('div', { className: 'tri invert' }),
              _react2.default.createElement('div', { className: 'tri invert' }),
              _react2.default.createElement('div', { className: 'tri' }),
              _react2.default.createElement('div', { className: 'tri invert' }),
              _react2.default.createElement('div', { className: 'tri invert' }),
              _react2.default.createElement('div', { className: 'tri' }),
              _react2.default.createElement('div', { className: 'tri invert' }),
              _react2.default.createElement('div', { className: 'tri' }),
              _react2.default.createElement('div', { className: 'tri invert' })
            ),
            'SmartTicket',
            _react2.default.createElement(
              'span',
              { className: 'badge badge-up badge-danger' },
              this.state.onlineUsers
            )
          )
        )
      );
    }
  }]);

  return Navbar;
}(_react2.default.Component);

exports.default = Navbar;

// <form ref='searchForm' className='navbar-form navbar-left animated' onSubmit={this.handleSubmit.bind(this)}>
//   <div className='input-group'>
//     <input type='text' className='form-control' placeholder={this.state.totalCharacters + ' characters'} value={this.state.searchQuery} onChange={NavbarActions.updateSearchQuery} />
//     <span className='input-group-btn'>
//       <button className='btn btn-default' onClick={this.handleSubmit.bind(this)}><span className='glyphicon glyphicon-search'></span></button>
//     </span>
//   </div>
// </form>

},{"../actions/NavbarActions":8,"../stores/NavbarStore":26,"react":"react","react-router":"react-router"}],18:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRouter2 = _interopRequireDefault(_reactRouter);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _createBrowserHistory = require('history/lib/createBrowserHistory');

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var history = (0, _createBrowserHistory2.default)();

_reactDom2.default.render(_react2.default.createElement(
  _reactRouter2.default,
  { history: history },
  _routes2.default
), document.getElementById('app'));

},{"./routes":19,"history/lib/createBrowserHistory":35,"react":"react","react-dom":"react-dom","react-router":"react-router"}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _App = require('./components/App');

var _App2 = _interopRequireDefault(_App);

var _Home = require('./components/Home');

var _Home2 = _interopRequireDefault(_Home);

var _AddCharacter = require('./components/AddCharacter');

var _AddCharacter2 = _interopRequireDefault(_AddCharacter);

var _Character = require('./components/Character');

var _Character2 = _interopRequireDefault(_Character);

var _DashboardClient = require('./components/DashboardClient');

var _DashboardClient2 = _interopRequireDefault(_DashboardClient);

var _DashboardEmployee = require('./components/DashboardEmployee');

var _DashboardEmployee2 = _interopRequireDefault(_DashboardEmployee);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createElement(
    _reactRouter.Route,
    { component: _App2.default },
    _react2.default.createElement(_reactRouter.Route, { path: '/', component: _Home2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: '/add', component: _AddCharacter2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: '/characters/:id', component: _Character2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: '/dashboardClient', component: _DashboardClient2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: '/dashboardEmployee', component: _DashboardEmployee2.default })
);

},{"./components/AddCharacter":10,"./components/App":11,"./components/Character":12,"./components/DashboardClient":13,"./components/DashboardEmployee":14,"./components/Home":16,"react":"react","react-router":"react-router"}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _AddCharacterActions = require('../actions/AddCharacterActions');

var _AddCharacterActions2 = _interopRequireDefault(_AddCharacterActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AddCharacterStore = function () {
    function AddCharacterStore() {
        _classCallCheck(this, AddCharacterStore);

        this.bindActions(_AddCharacterActions2.default);
        this.name = '';
        this.gender = '';
        this.helpBlock = '';
        this.nameValidationState = '';
        this.genderValidationState = '';
    }

    _createClass(AddCharacterStore, [{
        key: 'onAddCharacterSuccess',
        value: function onAddCharacterSuccess(successMessage) {
            this.nameValidationState = 'has-success';
            this.helpBlock = successMessage;
        }
    }, {
        key: 'onAddCharacterFail',
        value: function onAddCharacterFail(errorMessage) {
            this.nameValidationState = 'has-error';
            this.helpBlock = errorMessage;
        }
    }, {
        key: 'onUpdateName',
        value: function onUpdateName(event) {
            this.name = event.target.value;
            this.nameValidationState = '';
            this.helpBlock = '';
        }
    }, {
        key: 'onUpdateGender',
        value: function onUpdateGender(event) {
            this.gender = event.target.value;
            this.genderValidationState = '';
        }
    }, {
        key: 'onInvalidName',
        value: function onInvalidName() {
            this.nameValidationState = 'has-error';
            this.helpBlock = 'Please enter a character name.';
        }
    }, {
        key: 'onInvalidGender',
        value: function onInvalidGender() {
            this.genderValidationState = 'has-error';
        }
    }]);

    return AddCharacterStore;
}();

exports.default = _alt2.default.createStore(AddCharacterStore);

},{"../actions/AddCharacterActions":2,"../alt":9}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = require('underscore');

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _CharacterActions = require('../actions/CharacterActions');

var _CharacterActions2 = _interopRequireDefault(_CharacterActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CharacterStore = function () {
  function CharacterStore() {
    _classCallCheck(this, CharacterStore);

    this.bindActions(_CharacterActions2.default);
    this.characterId = 0;
    this.name = 'TBD';
    this.race = 'TBD';
    this.bloodline = 'TBD';
    this.gender = 'TBD';
    this.wins = 0;
    this.losses = 0;
    this.winLossRatio = 0;
    this.isReported = false;
  }

  _createClass(CharacterStore, [{
    key: 'onGetCharacterSuccess',
    value: function onGetCharacterSuccess(data) {
      (0, _underscore.assign)(this, data);
      $(document.body).attr('class', 'profile ' + this.race.toLowerCase());
      var localData = localStorage.getItem('NEF') ? JSON.parse(localStorage.getItem('NEF')) : {};
      var reports = localData.reports || [];
      this.isReported = (0, _underscore.contains)(reports, this.characterId);
      // If is NaN (from division by zero) then set it to "0"
      this.winLossRatio = (this.wins / (this.wins + this.losses) * 100 || 0).toFixed(1);
    }
  }, {
    key: 'onGetCharacterFail',
    value: function onGetCharacterFail(jqXhr) {
      toastr.error(jqXhr.responseJSON.message);
    }
  }, {
    key: 'onReportSuccess',
    value: function onReportSuccess() {
      this.isReported = true;
      var localData = localStorage.getItem('NEF') ? JSON.parse(localStorage.getItem('NEF')) : {};
      localData.reports = localData.reports || [];
      localData.reports.push(this.characterId);
      localStorage.setItem('NEF', JSON.stringify(localData));
      toastr.warning('Character has been reported.');
    }
  }, {
    key: 'onReportFail',
    value: function onReportFail(jqXhr) {
      toastr.error(jqXhr.responseJSON.message);
    }
  }]);

  return CharacterStore;
}();

exports.default = _alt2.default.createStore(CharacterStore);

},{"../actions/CharacterActions":3,"../alt":9,"underscore":"underscore"}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = require('underscore');

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _DashboardClientActions = require('../actions/DashboardClientActions');

var _DashboardClientActions2 = _interopRequireDefault(_DashboardClientActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DashboardClientStore = function () {
  function DashboardClientStore() {
    _classCallCheck(this, DashboardClientStore);

    this.bindActions(_DashboardClientActions2.default);
    this.lastTickets = [];
    this.myTickets = [];
    this.user = { id: '', token: '', uuid: '' };
    this.credits = 0;
    this.creditsToGet = 0;
    this.userDetails = {};
  }

  _createClass(DashboardClientStore, [{
    key: 'onLoginSuccess',
    value: function onLoginSuccess(usr) {
      this.user.id = usr.id;
      this.user.uuid = usr.uuid;
      console.log("apos login");
      console.log(this.user);
    }
  }, {
    key: 'onGetCreditsSuccess',
    value: function onGetCreditsSuccess(data) {

      this.credits = data;
    }
  }, {
    key: 'onUpdateCreditsToGet',
    value: function onUpdateCreditsToGet(event) {
      this.creditsToGet = event.target.value;
    }
  }, {
    key: 'onGetCreditsFail',
    value: function onGetCreditsFail(jqXhr) {
      // Handle multiple response formats, fallback to HTTP status code number.
      toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
    }
  }, {
    key: 'onGetLastTicketsSuccess',
    value: function onGetLastTicketsSuccess(data) {
      this.lastTickets = data;
    }
  }, {
    key: 'onGetLastTicketsFail',
    value: function onGetLastTicketsFail(jqXhr) {
      // Handle multiple response formats, fallback to HTTP status code number.
      toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
    }
  }, {
    key: 'onGetMyTicketsSuccess',
    value: function onGetMyTicketsSuccess(data) {
      this.myTickets = data;
    }
  }, {
    key: 'onGetMyTicketsFail',
    value: function onGetMyTicketsFail(jqXhr) {
      // Handle multiple response formats, fallback to HTTP status code number.
      toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
    }
  }, {
    key: 'onLoginFail',
    value: function onLoginFail(jqXhr) {
      // Handle multiple response formats, fallback to HTTP status code number.
      toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
    }
  }, {
    key: 'onTestSuccess',
    value: function onTestSuccess(data) {
      console.log("on test success");
      console.log(data);
      this.myTickets = data;
    }
  }, {
    key: 'onTestFail',
    value: function onTestFail(jqXhr) {
      toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
    }
  }, {
    key: 'onGetUserDetailsSuccess',
    value: function onGetUserDetailsSuccess(data) {
      this.userDetails = data.extra_data;
      console.log(this.userDetails);
    }
  }, {
    key: 'onGetUserDetailsFail',
    value: function onGetUserDetailsFail(jqXhr) {
      // Handle multiple response formats, fallback to HTTP status code number.
      toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
    }
  }]);

  return DashboardClientStore;
}();

exports.default = _alt2.default.createStore(DashboardClientStore);

},{"../actions/DashboardClientActions":4,"../alt":9,"underscore":"underscore"}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = require('underscore');

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _DashboardEmployeeActions = require('../actions/DashboardEmployeeActions');

var _DashboardEmployeeActions2 = _interopRequireDefault(_DashboardEmployeeActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DashboardEmployeeStore = function () {
    function DashboardEmployeeStore() {
        _classCallCheck(this, DashboardEmployeeStore);

        this.bindActions(_DashboardEmployeeActions2.default);
        this.currentTickets = [];
        this.newQueueName = '';
        this.user = { id: '', token: '' };
    }

    _createClass(DashboardEmployeeStore, [{
        key: 'login',
        value: function login(usr) {
            this.user.id = usr.id;
            this.user.token = usr.token;
        }
    }, {
        key: 'onNextTicketSuccess',
        value: function onNextTicketSuccess(data) {
            console.log("on next success");
            console.log(data);
            this.currentTickets = data;
        }
    }, {
        key: 'onUpdateNewQueueName',
        value: function onUpdateNewQueueName(event) {
            this.newQueueName = event.target.value;
        }
    }, {
        key: 'onNewDaySuccess',
        value: function onNewDaySuccess(data) {
            console.log(data);
            this.currentTickets = [];
        }
    }, {
        key: 'onNewQueueSuccess',
        value: function onNewQueueSuccess(data) {
            //console.log("on new queue success")
            console.log(data);
        }
    }, {
        key: 'onNewQueueFail',
        value: function onNewQueueFail(data) {
            console.log(data);
        }
    }, {
        key: 'onCloseDaySuccess',
        value: function onCloseDaySuccess(data) {
            console.log(data);
        }
    }, {
        key: 'onCloseDayFail',
        value: function onCloseDayFail(jqXhr) {
            toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
        }
    }, {
        key: 'onNewDayFail',
        value: function onNewDayFail(jqXhr) {
            toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
        }
    }, {
        key: 'onNextTicketFail',
        value: function onNextTicketFail(jqXhr) {
            toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
        }
    }, {
        key: 'onAttendTicketSuccess',
        value: function onAttendTicketSuccess(data) {
            console.log("SUCESSO A ATENDER");
            console.log(data);
        }
    }, {
        key: 'onAttendTicketFail',
        value: function onAttendTicketFail(jqXhr) {
            toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
        }
    }]);

    return DashboardEmployeeStore;
}();

exports.default = _alt2.default.createStore(DashboardEmployeeStore);

},{"../actions/DashboardEmployeeActions":5,"../alt":9,"underscore":"underscore"}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _FooterActions = require('../actions/FooterActions');

var _FooterActions2 = _interopRequireDefault(_FooterActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FooterStore = function () {
  function FooterStore() {
    _classCallCheck(this, FooterStore);

    this.bindActions(_FooterActions2.default);
    this.characters = [];
  }

  _createClass(FooterStore, [{
    key: 'onGetLastTicketsSuccess',
    value: function onGetLastTicketsSuccess(data) {
      this.characters = data;
    }
  }, {
    key: 'onGetLastTicketsFail',
    value: function onGetLastTicketsFail(jqXhr) {
      // Handle multiple response formats, fallback to HTTP status code number.
      toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
    }
  }]);

  return FooterStore;
}();

exports.default = _alt2.default.createStore(FooterStore);

},{"../actions/FooterActions":6,"../alt":9}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _HomeActions = require('../actions/HomeActions');

var _HomeActions2 = _interopRequireDefault(_HomeActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HomeStore = function () {
  function HomeStore() {
    _classCallCheck(this, HomeStore);

    this.bindActions(_HomeActions2.default);
    this.characters = [];
  }

  _createClass(HomeStore, [{
    key: 'onGetTwoCharactersSuccess',
    value: function onGetTwoCharactersSuccess(data) {
      this.characters = data;
    }
  }, {
    key: 'onGetTwoCharactersFail',
    value: function onGetTwoCharactersFail(errorMessage) {
      toastr.error(errorMessage);
    }
  }, {
    key: 'onVoteFail',
    value: function onVoteFail(errorMessage) {
      toastr.error(errorMessage);
    }
  }]);

  return HomeStore;
}();

exports.default = _alt2.default.createStore(HomeStore);

},{"../actions/HomeActions":7,"../alt":9}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _NavbarActions = require('../actions/NavbarActions');

var _NavbarActions2 = _interopRequireDefault(_NavbarActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NavbarStore = function () {
  function NavbarStore() {
    _classCallCheck(this, NavbarStore);

    this.bindActions(_NavbarActions2.default);
    this.totalCharacters = 0;
    this.onlineUsers = 0;
    this.searchQuery = '';
    this.ajaxAnimationClass = '';
  }

  _createClass(NavbarStore, [{
    key: 'onFindCharacterSuccess',
    value: function onFindCharacterSuccess(payload) {
      payload.history.pushState(null, '/characters/' + payload.characterId);
    }
  }, {
    key: 'onFindCharacterFail',
    value: function onFindCharacterFail(payload) {
      payload.searchForm.classList.add('shake');
      setTimeout(function () {
        payload.searchForm.classList.remove('shake');
      }, 1000);
    }
  }, {
    key: 'onUpdateOnlineUsers',
    value: function onUpdateOnlineUsers(data) {
      this.onlineUsers = data.onlineUsers;
    }
  }, {
    key: 'onUpdateAjaxAnimation',
    value: function onUpdateAjaxAnimation(className) {
      this.ajaxAnimationClass = className; //fadein or fadeout
    }
  }, {
    key: 'onUpdateSearchQuery',
    value: function onUpdateSearchQuery(event) {
      this.searchQuery = event.target.value;
    }
  }, {
    key: 'onGetCharacterCountSuccess',
    value: function onGetCharacterCountSuccess(data) {
      this.totalCharacters = data.count;
    }
  }, {
    key: 'onGetCharacterCountFail',
    value: function onGetCharacterCountFail(jqXhr) {
      toastr.error(jqXhr.responseJSON.message);
    }
  }]);

  return NavbarStore;
}();

exports.default = _alt2.default.createStore(NavbarStore);

},{"../actions/NavbarActions":8,"../alt":9}],27:[function(require,module,exports){
var pSlice = Array.prototype.slice;
var objectKeys = require('./lib/keys.js');
var isArguments = require('./lib/is_arguments.js');

var deepEqual = module.exports = function (actual, expected, opts) {
  if (!opts) opts = {};
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

  // 7.3. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
    return opts.strict ? actual === expected : actual == expected;

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected, opts);
  }
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer (x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') return false;
  return true;
}

function objEquiv(a, b, opts) {
  var i, key;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b, opts);
  }
  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false;
    }
    if (a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b);
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }
  return typeof a === typeof b;
}

},{"./lib/is_arguments.js":28,"./lib/keys.js":29}],28:[function(require,module,exports){
var supportsArgumentsClass = (function(){
  return Object.prototype.toString.call(arguments)
})() == '[object Arguments]';

exports = module.exports = supportsArgumentsClass ? supported : unsupported;

exports.supported = supported;
function supported(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
};

exports.unsupported = unsupported;
function unsupported(object){
  return object &&
    typeof object == 'object' &&
    typeof object.length == 'number' &&
    Object.prototype.hasOwnProperty.call(object, 'callee') &&
    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
    false;
};

},{}],29:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],30:[function(require,module,exports){
/**
 * Indicates that navigation was caused by a call to history.push.
 */
'use strict';

exports.__esModule = true;
var PUSH = 'PUSH';

exports.PUSH = PUSH;
/**
 * Indicates that navigation was caused by a call to history.replace.
 */
var REPLACE = 'REPLACE';

exports.REPLACE = REPLACE;
/**
 * Indicates that navigation was caused by some other action such
 * as using a browser's back/forward buttons and/or manually manipulating
 * the URL in a browser's location bar. This is the default.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate
 * for more information.
 */
var POP = 'POP';

exports.POP = POP;
exports['default'] = {
  PUSH: PUSH,
  REPLACE: REPLACE,
  POP: POP
};
},{}],31:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.loopAsync = loopAsync;

function loopAsync(turns, work, callback) {
  var currentTurn = 0;
  var isDone = false;

  function done() {
    isDone = true;
    callback.apply(this, arguments);
  }

  function next() {
    if (isDone) return;

    if (currentTurn < turns) {
      work.call(this, currentTurn++, next, done);
    } else {
      done.apply(this, arguments);
    }
  }

  next();
}
},{}],32:[function(require,module,exports){
(function (process){
/*eslint-disable no-empty */
'use strict';

exports.__esModule = true;
exports.saveState = saveState;
exports.readState = readState;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var KeyPrefix = '@@History/';
var QuotaExceededError = 'QuotaExceededError';
var SecurityError = 'SecurityError';

function createKey(key) {
  return KeyPrefix + key;
}

function saveState(key, state) {
  try {
    window.sessionStorage.setItem(createKey(key), JSON.stringify(state));
  } catch (error) {
    if (error.name === SecurityError) {
      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
      // attempt to access window.sessionStorage.
      process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] Unable to save state; sessionStorage is not available due to security settings') : undefined;

      return;
    }

    if (error.name === QuotaExceededError && window.sessionStorage.length === 0) {
      // Safari "private mode" throws QuotaExceededError.
      process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] Unable to save state; sessionStorage is not available in Safari private mode') : undefined;

      return;
    }

    throw error;
  }
}

function readState(key) {
  var json = undefined;
  try {
    json = window.sessionStorage.getItem(createKey(key));
  } catch (error) {
    if (error.name === SecurityError) {
      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
      // attempt to access window.sessionStorage.
      process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] Unable to read state; sessionStorage is not available due to security settings') : undefined;

      return null;
    }
  }

  if (json) {
    try {
      return JSON.parse(json);
    } catch (error) {
      // Ignore invalid JSON.
    }
  }

  return null;
}
}).call(this,require('_process'))

},{"_process":44,"warning":45}],33:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.addEventListener = addEventListener;
exports.removeEventListener = removeEventListener;
exports.getHashPath = getHashPath;
exports.replaceHashPath = replaceHashPath;
exports.getWindowPath = getWindowPath;
exports.go = go;
exports.getUserConfirmation = getUserConfirmation;
exports.supportsHistory = supportsHistory;
exports.supportsGoWithoutReloadUsingHash = supportsGoWithoutReloadUsingHash;

function addEventListener(node, event, listener) {
  if (node.addEventListener) {
    node.addEventListener(event, listener, false);
  } else {
    node.attachEvent('on' + event, listener);
  }
}

function removeEventListener(node, event, listener) {
  if (node.removeEventListener) {
    node.removeEventListener(event, listener, false);
  } else {
    node.detachEvent('on' + event, listener);
  }
}

function getHashPath() {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  return window.location.href.split('#')[1] || '';
}

function replaceHashPath(path) {
  window.location.replace(window.location.pathname + window.location.search + '#' + path);
}

function getWindowPath() {
  return window.location.pathname + window.location.search + window.location.hash;
}

function go(n) {
  if (n) window.history.go(n);
}

function getUserConfirmation(message, callback) {
  callback(window.confirm(message));
}

/**
 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
 *
 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
 * changed to avoid false negatives for Windows Phones: https://github.com/rackt/react-router/issues/586
 */

function supportsHistory() {
  var ua = navigator.userAgent;
  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) {
    return false;
  }
  // FIXME: Work around our browser history not working correctly on Chrome
  // iOS: https://github.com/rackt/react-router/issues/2565
  if (ua.indexOf('CriOS') !== -1) {
    return false;
  }
  return window.history && 'pushState' in window.history;
}

/**
 * Returns false if using go(n) with hash history causes a full page reload.
 */

function supportsGoWithoutReloadUsingHash() {
  var ua = navigator.userAgent;
  return ua.indexOf('Firefox') === -1;
}
},{}],34:[function(require,module,exports){
'use strict';

exports.__esModule = true;
var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
exports.canUseDOM = canUseDOM;
},{}],35:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _Actions = require('./Actions');

var _ExecutionEnvironment = require('./ExecutionEnvironment');

var _DOMUtils = require('./DOMUtils');

var _DOMStateStorage = require('./DOMStateStorage');

var _createDOMHistory = require('./createDOMHistory');

var _createDOMHistory2 = _interopRequireDefault(_createDOMHistory);

var _parsePath = require('./parsePath');

var _parsePath2 = _interopRequireDefault(_parsePath);

/**
 * Creates and returns a history object that uses HTML5's history API
 * (pushState, replaceState, and the popstate event) to manage history.
 * This is the recommended method of managing history in browsers because
 * it provides the cleanest URLs.
 *
 * Note: In browsers that do not support the HTML5 history API full
 * page reloads will be used to preserve URLs.
 */
function createBrowserHistory() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'Browser history needs a DOM') : _invariant2['default'](false) : undefined;

  var forceRefresh = options.forceRefresh;

  var isSupported = _DOMUtils.supportsHistory();
  var useRefresh = !isSupported || forceRefresh;

  function getCurrentLocation(historyState) {
    historyState = historyState || window.history.state || {};

    var path = _DOMUtils.getWindowPath();
    var _historyState = historyState;
    var key = _historyState.key;

    var state = undefined;
    if (key) {
      state = _DOMStateStorage.readState(key);
    } else {
      state = null;
      key = history.createKey();

      if (isSupported) window.history.replaceState(_extends({}, historyState, { key: key }), null, path);
    }

    var location = _parsePath2['default'](path);

    return history.createLocation(_extends({}, location, { state: state }), undefined, key);
  }

  function startPopStateListener(_ref) {
    var transitionTo = _ref.transitionTo;

    function popStateListener(event) {
      if (event.state === undefined) return; // Ignore extraneous popstate events in WebKit.

      transitionTo(getCurrentLocation(event.state));
    }

    _DOMUtils.addEventListener(window, 'popstate', popStateListener);

    return function () {
      _DOMUtils.removeEventListener(window, 'popstate', popStateListener);
    };
  }

  function finishTransition(location) {
    var basename = location.basename;
    var pathname = location.pathname;
    var search = location.search;
    var hash = location.hash;
    var state = location.state;
    var action = location.action;
    var key = location.key;

    if (action === _Actions.POP) return; // Nothing to do.

    _DOMStateStorage.saveState(key, state);

    var path = (basename || '') + pathname + search + hash;
    var historyState = {
      key: key
    };

    if (action === _Actions.PUSH) {
      if (useRefresh) {
        window.location.href = path;
        return false; // Prevent location update.
      } else {
          window.history.pushState(historyState, null, path);
        }
    } else {
      // REPLACE
      if (useRefresh) {
        window.location.replace(path);
        return false; // Prevent location update.
      } else {
          window.history.replaceState(historyState, null, path);
        }
    }
  }

  var history = _createDOMHistory2['default'](_extends({}, options, {
    getCurrentLocation: getCurrentLocation,
    finishTransition: finishTransition,
    saveState: _DOMStateStorage.saveState
  }));

  var listenerCount = 0,
      stopPopStateListener = undefined;

  function listenBefore(listener) {
    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);

    var unlisten = history.listenBefore(listener);

    return function () {
      unlisten();

      if (--listenerCount === 0) stopPopStateListener();
    };
  }

  function listen(listener) {
    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);

    var unlisten = history.listen(listener);

    return function () {
      unlisten();

      if (--listenerCount === 0) stopPopStateListener();
    };
  }

  // deprecated
  function registerTransitionHook(hook) {
    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);

    history.registerTransitionHook(hook);
  }

  // deprecated
  function unregisterTransitionHook(hook) {
    history.unregisterTransitionHook(hook);

    if (--listenerCount === 0) stopPopStateListener();
  }

  return _extends({}, history, {
    listenBefore: listenBefore,
    listen: listen,
    registerTransitionHook: registerTransitionHook,
    unregisterTransitionHook: unregisterTransitionHook
  });
}

exports['default'] = createBrowserHistory;
module.exports = exports['default'];
}).call(this,require('_process'))

},{"./Actions":30,"./DOMStateStorage":32,"./DOMUtils":33,"./ExecutionEnvironment":34,"./createDOMHistory":36,"./parsePath":41,"_process":44,"invariant":43}],36:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _ExecutionEnvironment = require('./ExecutionEnvironment');

var _DOMUtils = require('./DOMUtils');

var _createHistory = require('./createHistory');

var _createHistory2 = _interopRequireDefault(_createHistory);

function createDOMHistory(options) {
  var history = _createHistory2['default'](_extends({
    getUserConfirmation: _DOMUtils.getUserConfirmation
  }, options, {
    go: _DOMUtils.go
  }));

  function listen(listener) {
    !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'DOM history needs a DOM') : _invariant2['default'](false) : undefined;

    return history.listen(listener);
  }

  return _extends({}, history, {
    listen: listen
  });
}

exports['default'] = createDOMHistory;
module.exports = exports['default'];
}).call(this,require('_process'))

},{"./DOMUtils":33,"./ExecutionEnvironment":34,"./createHistory":37,"_process":44,"invariant":43}],37:[function(require,module,exports){
//import warning from 'warning'
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _deepEqual = require('deep-equal');

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _AsyncUtils = require('./AsyncUtils');

var _Actions = require('./Actions');

var _createLocation2 = require('./createLocation');

var _createLocation3 = _interopRequireDefault(_createLocation2);

var _runTransitionHook = require('./runTransitionHook');

var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);

var _parsePath = require('./parsePath');

var _parsePath2 = _interopRequireDefault(_parsePath);

var _deprecate = require('./deprecate');

var _deprecate2 = _interopRequireDefault(_deprecate);

function createRandomKey(length) {
  return Math.random().toString(36).substr(2, length);
}

function locationsAreEqual(a, b) {
  return a.pathname === b.pathname && a.search === b.search &&
  //a.action === b.action && // Different action !== location change.
  a.key === b.key && _deepEqual2['default'](a.state, b.state);
}

var DefaultKeyLength = 6;

function createHistory() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var getCurrentLocation = options.getCurrentLocation;
  var finishTransition = options.finishTransition;
  var saveState = options.saveState;
  var go = options.go;
  var keyLength = options.keyLength;
  var getUserConfirmation = options.getUserConfirmation;

  if (typeof keyLength !== 'number') keyLength = DefaultKeyLength;

  var transitionHooks = [];

  function listenBefore(hook) {
    transitionHooks.push(hook);

    return function () {
      transitionHooks = transitionHooks.filter(function (item) {
        return item !== hook;
      });
    };
  }

  var allKeys = [];
  var changeListeners = [];
  var location = undefined;

  function getCurrent() {
    if (pendingLocation && pendingLocation.action === _Actions.POP) {
      return allKeys.indexOf(pendingLocation.key);
    } else if (location) {
      return allKeys.indexOf(location.key);
    } else {
      return -1;
    }
  }

  function updateLocation(newLocation) {
    var current = getCurrent();

    location = newLocation;

    if (location.action === _Actions.PUSH) {
      allKeys = [].concat(allKeys.slice(0, current + 1), [location.key]);
    } else if (location.action === _Actions.REPLACE) {
      allKeys[current] = location.key;
    }

    changeListeners.forEach(function (listener) {
      listener(location);
    });
  }

  function listen(listener) {
    changeListeners.push(listener);

    if (location) {
      listener(location);
    } else {
      var _location = getCurrentLocation();
      allKeys = [_location.key];
      updateLocation(_location);
    }

    return function () {
      changeListeners = changeListeners.filter(function (item) {
        return item !== listener;
      });
    };
  }

  function confirmTransitionTo(location, callback) {
    _AsyncUtils.loopAsync(transitionHooks.length, function (index, next, done) {
      _runTransitionHook2['default'](transitionHooks[index], location, function (result) {
        if (result != null) {
          done(result);
        } else {
          next();
        }
      });
    }, function (message) {
      if (getUserConfirmation && typeof message === 'string') {
        getUserConfirmation(message, function (ok) {
          callback(ok !== false);
        });
      } else {
        callback(message !== false);
      }
    });
  }

  var pendingLocation = undefined;

  function transitionTo(nextLocation) {
    if (location && locationsAreEqual(location, nextLocation)) return; // Nothing to do.

    pendingLocation = nextLocation;

    confirmTransitionTo(nextLocation, function (ok) {
      if (pendingLocation !== nextLocation) return; // Transition was interrupted.

      if (ok) {
        // treat PUSH to current path like REPLACE to be consistent with browsers
        if (nextLocation.action === _Actions.PUSH) {
          var prevPath = createPath(location);
          var nextPath = createPath(nextLocation);

          if (nextPath === prevPath) nextLocation.action = _Actions.REPLACE;
        }

        if (finishTransition(nextLocation) !== false) updateLocation(nextLocation);
      } else if (location && nextLocation.action === _Actions.POP) {
        var prevIndex = allKeys.indexOf(location.key);
        var nextIndex = allKeys.indexOf(nextLocation.key);

        if (prevIndex !== -1 && nextIndex !== -1) go(prevIndex - nextIndex); // Restore the URL.
      }
    });
  }

  function push(location) {
    transitionTo(createLocation(location, _Actions.PUSH, createKey()));
  }

  function replace(location) {
    transitionTo(createLocation(location, _Actions.REPLACE, createKey()));
  }

  function goBack() {
    go(-1);
  }

  function goForward() {
    go(1);
  }

  function createKey() {
    return createRandomKey(keyLength);
  }

  function createPath(location) {
    if (location == null || typeof location === 'string') return location;

    var pathname = location.pathname;
    var search = location.search;
    var hash = location.hash;

    var result = pathname;

    if (search) result += search;

    if (hash) result += hash;

    return result;
  }

  function createHref(location) {
    return createPath(location);
  }

  function createLocation(location, action) {
    var key = arguments.length <= 2 || arguments[2] === undefined ? createKey() : arguments[2];

    if (typeof action === 'object') {
      //warning(
      //  false,
      //  'The state (2nd) argument to history.createLocation is deprecated; use a ' +
      //  'location descriptor instead'
      //)

      if (typeof location === 'string') location = _parsePath2['default'](location);

      location = _extends({}, location, { state: action });

      action = key;
      key = arguments[3] || createKey();
    }

    return _createLocation3['default'](location, action, key);
  }

  // deprecated
  function setState(state) {
    if (location) {
      updateLocationState(location, state);
      updateLocation(location);
    } else {
      updateLocationState(getCurrentLocation(), state);
    }
  }

  function updateLocationState(location, state) {
    location.state = _extends({}, location.state, state);
    saveState(location.key, location.state);
  }

  // deprecated
  function registerTransitionHook(hook) {
    if (transitionHooks.indexOf(hook) === -1) transitionHooks.push(hook);
  }

  // deprecated
  function unregisterTransitionHook(hook) {
    transitionHooks = transitionHooks.filter(function (item) {
      return item !== hook;
    });
  }

  // deprecated
  function pushState(state, path) {
    if (typeof path === 'string') path = _parsePath2['default'](path);

    push(_extends({ state: state }, path));
  }

  // deprecated
  function replaceState(state, path) {
    if (typeof path === 'string') path = _parsePath2['default'](path);

    replace(_extends({ state: state }, path));
  }

  return {
    listenBefore: listenBefore,
    listen: listen,
    transitionTo: transitionTo,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    createKey: createKey,
    createPath: createPath,
    createHref: createHref,
    createLocation: createLocation,

    setState: _deprecate2['default'](setState, 'setState is deprecated; use location.key to save state instead'),
    registerTransitionHook: _deprecate2['default'](registerTransitionHook, 'registerTransitionHook is deprecated; use listenBefore instead'),
    unregisterTransitionHook: _deprecate2['default'](unregisterTransitionHook, 'unregisterTransitionHook is deprecated; use the callback returned from listenBefore instead'),
    pushState: _deprecate2['default'](pushState, 'pushState is deprecated; use push instead'),
    replaceState: _deprecate2['default'](replaceState, 'replaceState is deprecated; use replace instead')
  };
}

exports['default'] = createHistory;
module.exports = exports['default'];
},{"./Actions":30,"./AsyncUtils":31,"./createLocation":38,"./deprecate":39,"./parsePath":41,"./runTransitionHook":42,"deep-equal":27}],38:[function(require,module,exports){
//import warning from 'warning'
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Actions = require('./Actions');

var _parsePath = require('./parsePath');

var _parsePath2 = _interopRequireDefault(_parsePath);

function createLocation() {
  var location = arguments.length <= 0 || arguments[0] === undefined ? '/' : arguments[0];
  var action = arguments.length <= 1 || arguments[1] === undefined ? _Actions.POP : arguments[1];
  var key = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

  var _fourthArg = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

  if (typeof location === 'string') location = _parsePath2['default'](location);

  if (typeof action === 'object') {
    //warning(
    //  false,
    //  'The state (2nd) argument to createLocation is deprecated; use a ' +
    //  'location descriptor instead'
    //)

    location = _extends({}, location, { state: action });

    action = key || _Actions.POP;
    key = _fourthArg;
  }

  var pathname = location.pathname || '/';
  var search = location.search || '';
  var hash = location.hash || '';
  var state = location.state || null;

  return {
    pathname: pathname,
    search: search,
    hash: hash,
    state: state,
    action: action,
    key: key
  };
}

exports['default'] = createLocation;
module.exports = exports['default'];
},{"./Actions":30,"./parsePath":41}],39:[function(require,module,exports){
//import warning from 'warning'

"use strict";

exports.__esModule = true;
function deprecate(fn) {
  return fn;
  //return function () {
  //  warning(false, '[history] ' + message)
  //  return fn.apply(this, arguments)
  //}
}

exports["default"] = deprecate;
module.exports = exports["default"];
},{}],40:[function(require,module,exports){
"use strict";

exports.__esModule = true;
function extractPath(string) {
  var match = string.match(/^https?:\/\/[^\/]*/);

  if (match == null) return string;

  return string.substring(match[0].length);
}

exports["default"] = extractPath;
module.exports = exports["default"];
},{}],41:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _extractPath = require('./extractPath');

var _extractPath2 = _interopRequireDefault(_extractPath);

function parsePath(path) {
  var pathname = _extractPath2['default'](path);
  var search = '';
  var hash = '';

  process.env.NODE_ENV !== 'production' ? _warning2['default'](path === pathname, 'A path must be pathname + search + hash only, not a fully qualified URL like "%s"', path) : undefined;

  var hashIndex = pathname.indexOf('#');
  if (hashIndex !== -1) {
    hash = pathname.substring(hashIndex);
    pathname = pathname.substring(0, hashIndex);
  }

  var searchIndex = pathname.indexOf('?');
  if (searchIndex !== -1) {
    search = pathname.substring(searchIndex);
    pathname = pathname.substring(0, searchIndex);
  }

  if (pathname === '') pathname = '/';

  return {
    pathname: pathname,
    search: search,
    hash: hash
  };
}

exports['default'] = parsePath;
module.exports = exports['default'];
}).call(this,require('_process'))

},{"./extractPath":40,"_process":44,"warning":45}],42:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

function runTransitionHook(hook, location, callback) {
  var result = hook(location, callback);

  if (hook.length < 2) {
    // Assume the hook runs synchronously and automatically
    // call the callback with the return value.
    callback(result);
  } else {
    process.env.NODE_ENV !== 'production' ? _warning2['default'](result === undefined, 'You should not "return" in a transition hook with a callback argument; call the callback instead') : undefined;
  }
}

exports['default'] = runTransitionHook;
module.exports = exports['default'];
}).call(this,require('_process'))

},{"_process":44,"warning":45}],43:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (process.env.NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

}).call(this,require('_process'))

},{"_process":44}],44:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],45:[function(require,module,exports){
(function (process){
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = function() {};

if (process.env.NODE_ENV !== 'production') {
  warning = function(condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error(
        '`warning(condition, format, ...args)` requires a warning ' +
        'message argument'
      );
    }

    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
      throw new Error(
        'The warning format should be able to uniquely identify this ' +
        'warning. Please, use a more descriptive format than: ' + format
      );
    }

    if (!condition) {
      var argIndex = 0;
      var message = 'Warning: ' +
        format.replace(/%s/g, function() {
          return args[argIndex++];
        });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch(x) {}
    }
  };
}

module.exports = warning;

}).call(this,require('_process'))

},{"_process":44}]},{},[18])


//# sourceMappingURL=bundle.js.map

"use strict";

//Variables
const Alexa = require('alexa-sdk');
const APP_ID = '';
const unsureMessage = ['Sorry?',"Sorry I didn't get that.","Would you repeat that please?"];
const SKILL_STATES = {
    BOOKING: '_BOOKMODE', 
    START: '_STARTMODE', 
};
//var booking = false;

const newSessionHandlers = {
    'LaunchRequest': function(){
        this.handler.state = SKILL_STATES.START;
        const speechOutput = 'Whelcome to my airline, I can help you book and track flights.';//+ context.System.user.userID.value;
        this.response.speak(speechOutput).listen('You can say help, for additional assistance.');
        this.emit(':responseReady');
    },
    'AMAZON.StartOverIntent': function () {
        this.handler.state = SKILL_STATES.START;
        this.response.speak('How may I help you').listen('You can say help, for additional assistance.');
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        this.handler.state = SKILL_STATES.START;
        this.emitWithState('AMAZON.HelpIntent');
    },
    'Unhandled': function () {
        this.handler.state = SKILL_STATES.START;
        this.emitWithState('AMAZON.HelpIntent');
    },
};

const startStateHandlers = Alexa.CreateStateHandler(SKILL_STATES.START, {
    'BookFlightIntent': function(){
        this.handler.state = SKILL_STATES.BOOKING;
        this.emitWithState('booking');
    },
    'CheckFlightIntent': function(){
        const statusList = [' is bording right now.',
            ' has landed.',
            ' is in the air.'];
        const flightNumber = this.event.request.intent.slots.flight_number.value;
        const flightCompany = this.event.request.intent.slots.flight_company.value;
        const i = randomInt(0,2);
        const flightStatus = statusList[i];
        const speechOutput = 'Flight ' + flightCompany + flightNumber + flightStatus;
        
        this.response.speak(speechOutput).listen('Is there anything else I can do for you?');
        this.emit(':responseReady');
    },

    'AMAZON.HelpIntent': function(){
        const speechOutput = "My airline help you book and track flights. "+ 
            "You can say, 'Book flight from city name, to city name,' to book flight, "+ 
            "or 'Where is flight, flight number,' to check flight status";
        this.response.speak(speechOutput).listen('');
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function(){
        this.emit(":tell", "Bye");
    },
    'AMAZON.CancelIntent': function(){
        this.emit(":tell", "Bye");
    },
    'Unhandled': function(){
        this.response.speak(unsureMessage[randomInt(0,2)]).listen(unsureMessage[randomInt(0,2)]);
        this.emit(':responseReady');
    },
    /*'SessionEndedRequest': function () {
        console.log(`Session ended in help state: ${this.event.request.reason}`);
    },*/
});

const bookingStateHandlers = Alexa.CreateStateHandler(SKILL_STATES.BOOKING, {
    'booking': function () {
        const departure = this.event.request.intent.slots.city_name_depa.value;
        const destnation = this.event.request.intent.slots.city_name_dest.value;
        const speechOutput = 'Flight from '+departure+' to '+destnation+' would cost '+ randomInt(180,390)+
            ' dollar. Would you like to proceed with the purchase?';
        this.response.speak(speechOutput).listen('');
        this.emit(':responseReady');
    },
    'AMAZON.YesIntent': function () {
        this.handler.state = SKILL_STATES.START;
        const speechOutput = 'Your flight has been booked successfully. Thank you for using My airline.';
        this.response.speak(speechOutput).listen('');
        this.emit(':responseReady');
    },
    'AMAZON.NoIntent': function () {
        this.handler.state = SKILL_STATES.START;
        this.response.speak('Flight is not booked, is there anything else I can do?').listen('');
        this.emit(':responseReady');
    },
    'AMAZON.RepeatIntent': function () {
        //this.response.speak(this.attributes['speechOutput']).listen(this.attributes['repromptText']);
        this.emitWithState('booking');
    },
    'AMAZON.HelpIntent': function () {
        this.handler.state = SKILL_STATES.START;
        this.emitWithState('AMAZON.HelpIntent');
    },
    'AMAZON.StopIntent': function () {
        this.handler.state = SKILL_STATES.START;
        this.response.speak('Alright, is there anything else I can do?').listen('');
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.handler.state = SKILL_STATES.START;
        this.response.speak('Alright, is there anything else I can do?').listen('');
        this.emit(':responseReady');
    },
    'Unhandled': function(){
        this.response.speak(unsureMessage[randomInt(0,2)]).listen(unsureMessage[randomInt(0,2)]);
        this.emit(':responseReady');
    },
    /*'SessionEndedRequest': function () {
        console.log(`Session ended in help state: ${this.event.request.reason}`);
    },*/
});

//support functions
exports.handler = function(event, context, callback){
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(newSessionHandlers, startStateHandlers, bookingStateHandlers);
    alexa.execute();
};

function randomInt(min,max){
    var value = Math.floor(Math.random() * (max+1-min));
    return value + min;
}


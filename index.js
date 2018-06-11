
"use strict";

//Variables
const Alexa = require('alexa-sdk');
const APP_ID = '';
const reprompt = "How may I help?";
const reprompt1 = "Hello?";
const reprompt2 = "Are you done?";
var i = 0;

const roast = [
            'Whelcome to the my airline skill, the best place to book a flight in America, '+
                'with our most advance artificial intelligence system, we can always find the best price for you.',
            'Why keep asking questions?',
            'Your hair is pretty, you will make a nice collection to my zoo.',
            'Please, keep talking. I always yawn when I am interested.',
            'Someday you’ll go far… and I hope you stay there.',
            'You are free to go, stupidity’s no crime after all.',
            'Scientists say the universe is made up of neutrons, protons and electrons. They forgot to mention morons.'
            ];

exports.handler = function(event, context, callback){
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
    'LaunchRequest': function(){
        this.emit('BadHelpIntent');
    },

    // My Intents
    'BookFlightIntent': function(){
        const speechOutput = "The skill keep silence as your flight is booked without confirmation";
        this.response.speak(speechOutput).listen(reprompt2);
        this.emit(':responseReady');
    },
    'CheckFlightIntent': function(){
        const statusList = [' has crashed',
            ' has landed',
            ' is in the air'];
        const flightNumber = this.event.request.intent.slots.flight_number.value;
        const flightCompany = this.event.request.intent.slots.flight_company.value;
        var j = Math.floor(Math.random() * 10);
        if (j > 3) {j = 2;}
        else if (j < 3) {j = 1;}
        else {j = 0;}
        const flightStatus = statusList[j];
        const speechOutput = 'Flight ' + flightCompany + flightNumber + flightStatus;
        
        this.response.speak(speechOutput).listen(reprompt2);
        this.emit(':responseReady');
    },
    'RealHelpIntent': function() {
        const speechOutput = "My airline help you book and track flights. "+ 
            "You can say, 'Book flight from, city name, to, city name,' to book flight, "+ 
            "or 'Where is flight, airline company, flight number,' to check flight status";
        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    
    'BadHelpIntent': function() {
        const messageLength = roast.length - 1;
        const speechOutput = roast[i];
        if (i < messageLength) {i++;}
        else if (i == messageLength) {i = 0;}
        this.response.speak(speechOutput).listen(reprompt1);
        this.emit(':responseReady');
    },

    // Alexa Defalut Intents
    'AMAZON.HelpIntent': function(){
        this.response.speak('').listen(reprompt1);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function(){
        this.emit(":tell", "Hummmm");
    },
    'AMAZON.CancelIntent': function(){
        this.emit(":tell", "What the fuck");
    },
    'AMAZON.FallbackIntent': function(){
        this.emit('AMAZON.HelpIntent');
    }
};

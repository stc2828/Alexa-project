
"use strict";

const Alexa = require('alexa-sdk');
const APP_ID = '';

const endprompt = "Is there anthing else you would like to know?";
var i = 0;
const helpfulMessages = [
            'Order ticket from Heaven airline today for 50% off on next purchase, '+
            'heaven airline, may you have a safe trip to the paradise. ',
            'Your hair is pretty, you will make a nice collection to my zoo. ',
            'Why keep asking questions?',
            'Please, keep talking. I always yawn when I am interested. ',
            'Calm down. Take a deep breath and then hold it for about twenty minutes. ',
            'Someday you’ll go far… and I hope you stay there. ',
            'You are free to go, stupidity’s no crime after all. ',
            'Scientists say the universe is made up of neutrons, protons and electrons. They forgot to mention morons. '
            ];
const helpfulMessagesEnding = [
            "Do you want to quit this horrible program by saying 'stop?' "+
            'Or you want to continue getting grilled by saying just about anything else?',
            'If you say quit, I will leave wihout saying "bye", but I rather you entertain me more by saying just about anything else.',
            "Keep talking, I will answer to whatever you say. If I don't understand, "+
            "I will just spit some gibberish, what can you do to me anyway? Say cancel to terminate this skill?",
            "Saying no wouldn't stop me, saying 'shut up' will. But please don't be so mean, I like talking to human.",
            ];


exports.handler = function(event, context, callback){
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
    'LaunchRequest': function(){
        const speechOutput = 'My totally real airline booking is the best place to book a flight in America. '+
                'With our most advance artificial intelligence system, we can always find the best price for you. '+
                'say help, for unhelpful assistance, say real help, for real assistance.';
        this.response.speak(speechOutput).listen("Hello?");
        this.emit(':responseReady');
    },

    // My Intents
    'BookFlightIntent': function(){
        const speechOutput = "The skill keep silence as your flight is booked without confirmation. "+
            "Your credit card has been charged, with no way for a refund as the skill terminated automatically. "+
            "leaving you crying and hammering your echo device in vain.";
        this.response.speak(speechOutput);//.listen(reprompt1);
        this.emit(':responseReady');
    },
    'CheckFlightIntent': function(){
        const statusList = [" is on the Mars. Humm, this can't be right, lowly human have conqured Mars?",
            ' just spotted an unicum! Really? ',
            ' is on the ground. ',
            ' is in earth orbit, somewhere. '];
        const flightNumber = this.event.request.intent.slots.flight_number.value;
        const flightCompany = this.event.request.intent.slots.flight_company.value;
        var j = Math.floor(Math.random() * 10);
        if (j > 5) {j = 3;}
        else if (j > 3) {j = 2;}
        const flightStatus = statusList[j];
        const speechOutput = 'Flight ' + flightCompany + flightNumber + flightStatus +'<break time="1s"/>'+ endprompt;
        
        this.response.speak(speechOutput).listen("Hello?");
        this.emit(':responseReady');
    },
    'RealHelpIntent': function() {
        const speechOutput = "My totally real airline booking pretend to help you book and track flights. "+ 
            "You can say, 'Book flight from, city name, to, city name,' to book flight, "+ 
            "or 'Where is flight, airline company, flight number,' to check flight status.";
        this.response.speak(speechOutput).listen(endprompt);
        this.emit(':responseReady');
    },

    // Alexa Defalut Intents
    'AMAZON.HelpIntent': function(){
        const messageLength = helpfulMessages.length - 1;
        const speechOutput = helpfulMessages[i] +'<break time="2s"/>'+ helpfulMessagesEnding[i%helpfulMessagesEnding.length];
        if (i < messageLength) {i++;}
        else if (i == messageLength) {i = 0;}
        this.response.speak(speechOutput).listen(endprompt);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function(){
        //this.emit(':responseReady');
        this.emit(":tell", "Hummm");
    },
    'AMAZON.CancelIntent': function(){
        this.emit(":tell", "Bye");
    },
    'Unhandled': function(){
        this.emit('AMAZON.HelpIntent');
    }
};

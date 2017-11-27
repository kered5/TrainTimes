/* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyBpLyI12p7jAw32kvIVYLz8PzmIiktsR30",
    authDomain: "my-awesome-project-c8267.firebaseapp.com",
    databaseURL: "https://my-awesome-project-c8267.firebaseio.com",
    projectId: "my-awesome-project-c8267",
    storageBucket: "my-awesome-project-c8267.appspot.com",
    messagingSenderId: "714037775645"
};

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees
$("#add-employee-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainTime = $("#time-input").val().trim();
  var trainFreq = $("#frequency-input").val().trim();

  console.log(trainTime);

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    time: trainTime,
    freq: trainFreq
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.time);
  console.log(newTrain.freq);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().time;
  var trainFreq = childSnapshot.val().freq;

  // Employee Info
  // console.log(empName);
  // console.log(empRole);
  // console.log(empStart);
  // console.log(empRate);
    console.log(trainName);
     console.log(trainDestination);
      console.log(trainTime);
       console.log(trainFreq);

  console.log(moment().format('HH:mm'));
  // console.log(moment('trainTime').format('HH:mm'));
  console.log(moment().format('mm'));
  console.log(moment().format('LT HHMM'));
  console.log(moment().locale());
  // console.log(moment().hour(Number));

  // Prettify the employee start
  // var trainStartPretty = moment.unix(trainTime).format("HHMM");

  // console.log(trainStartPretty);


var convertedTime = moment(trainTime);

var currentTime = moment(moment().format("HHmm"));



// console.log(moment().startOf('convertedTime').fromNow());

console.log(moment.duration(convertedTime.diff(currentTime)));

console.log(moment().diff(currentTime.convertedTime));
  // Calculate the months worked using hardcore math
  // To calculate the months worked
  // var trainMonths = moment().diff(moment.unix(trainTime, "X"), "months");
  // console.log(empMonths);

var startTime=moment();
var endTime=moment(trainTime, "HHmm");
var duration = moment.duration(endTime.diff(startTime));
var hours = parseInt(duration.asHours());
var minutes = parseInt(duration.asMinutes())-hours*60;
alert (hours + ' hour and '+ minutes+' minutes.');


var difference=moment.duration(convertedTime - currentTime);
console.log(difference);
console.log(moment.duration(convertedTime - currentTime));
console.log(currentTime.to(convertedTime));



console.log(currentTime);
console.log(convertedTime);
  // Calculate the total billed rate
  var trainNext = trainTime + trainFreq;
  console.log(trainNext);

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  trainTime + "</td><td>" + trainFreq + "</td><td>" + minutes + "</td><td>");
});



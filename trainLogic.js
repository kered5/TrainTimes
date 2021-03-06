

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

// 2. Button for adding trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainTime = $("#time-input").val().trim();
  var trainFreq = $("#frequency-input").val().trim();



  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    time: trainTime,
    freq: trainFreq
  };

  // Uploads train data to the database
  database.ref().push(newTrain);



  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().time;
  var trainFreq = childSnapshot.val().freq;



    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(trainTime, "hh:mm").subtract(1, "years");


    // Current Time
    var currentTime = moment();


    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");


    // Time apart (remainder)
    var tRemainder = diffTime % trainFreq;


    // Minute Until Train
    var tMinutesTillTrain = trainFreq - tRemainder;


    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    nextTrainConverted=moment(nextTrain).format("LT");



  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  trainFreq + "</td><td>" + nextTrainConverted + "</td><td>" + tMinutesTillTrain + "</td><td>");
});




// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBYuSEN2EDLfGMR1HGAXygyrSy2ToD-s1g",
    authDomain: "train-time-88187.firebaseapp.com",
    databaseURL: "https://train-time-88187.firebaseio.com",
    projectId: "train-time-88187",
    storageBucket: "train-time-88187.appspot.com",
    messagingSenderId: "193933219439"
  };
  firebase.initializeApp(config);

    var dataRef = firebase.database();
    // Initial Values
    var trainName = "";
    var destination = "";
    var firstTrainTime = 0;
    var frequency = "";
    var minutes = 63;

// Capture Button Click
// Code in the logic for storing and retrieving the most recent train.

    $("#add-train").on("click", function(event) {
      event.preventDefault();
      trainName = $("#name-input").val().trim();
      destination = $("#destination-input").val().trim();
      firstTrainTime = $("#time-input").val().trim();
      frequency = $("#freq-input").val().trim();

      // Code for the push
      dataRef.ref().push({
        TrainName: trainName,
        Destination: destination,
        NextArr: firstTrainTime,
        Frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });

// clear text-boxes
      $("#name-input").val("");
      $("#destination-input").val("");
      $("#time-input").val("");
      $("#freq-input").val("");

    });

// Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
    dataRef.ref().on("child_added", function(childSnapshot) {
      // Log everything that's coming out of snapshot
      console.log(childSnapshot.val().TrainName);
      console.log(childSnapshot.val().Destination);
      console.log(childSnapshot.val().NextArr);
      console.log(childSnapshot.val().Frequency);
      console.log(childSnapshot.val().dateAdded);

// Append train info to table on page
    $("#trainTable").append("<tr><td>" + trainName + "</td><td>"+ destination + "</td><td>" + frequency + " mins" + "</td><td>" + firstTrainTime + "</td><td>" + minutes + "</td></tr>");

// full list of trains to the well
      $("#full-member-list").append(
        "<div class='well'><span id='name-input'> " + childSnapshot.val().TrainName +
        " </span><span id='destination-input'> " + childSnapshot.val().Destination +
        " </span><span id='time-input'> " + childSnapshot.val().NextArr +
        " </span><span id='freq-input'> " + childSnapshot.val().Frequency + " </span></div>");

    dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
// Change the HTML to reflect
      $("#name-display").text(snapshot.val().TrainName);
      $("#destination-display").text(snapshot.val().Destination);
      $("#time-display").text(snapshot.val().NextArr);
      $("#freq-display").text(snapshot.val().Frequency);
    });

/*  Pseudo-code to complete:
   - Correct the initial page load to list the existing trains in the data base to the Current Trains table correctly.
   - Convert from military time to AM/PM time
   - Complete the calculation of time remaining to the next train using the 'moment' function
*/

// Prevents page from refreshing
       return false;
   });


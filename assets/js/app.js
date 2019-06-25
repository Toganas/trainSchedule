// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAb35rzqpbOTfRRkItw9T0p-7IAfhs6sgk",
    authDomain: "trains-8f46f.firebaseapp.com",
    databaseURL: "https://trains-8f46f.firebaseio.com",
    projectId: "trains-8f46f",
    storageBucket: "",
    messagingSenderId: "415937131946",
    appId: "1:415937131946:web:627cc30a9dd59246"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$("#trainForm").on("submit", function (event) {
    event.preventDefault();
    // variables to check if the form is filled in valid
    var regexTime = /^\d{1,2}:\d{2}([ap]m)?$/;
    var trainTime = $("#trainForm input[name = firstTrain]").val().trim();
    var trainName;
    var destination;
    var firstTrain;
    var frequency;
    // train name must contain 3 or more letters
    if ($("#trainForm input[name=trainName]").val().trim().length > 2) {
        trainName = $("#trainForm input[name=trainName]").val().trim();
    } else {
        alert("Train name should be 3 letters or more")
    }
    // train destination must contain 3 or more letters
    if ($("#trainForm input[name=destination]").val().trim().length > 2) {
        destination = $("#trainForm input[name=destination]").val().trim();
    }
    else {
        alert("Destination should be 3 letters or more")
    }
    // trainTime must be in the form of hh:mm
    if (trainTime != "" && !trainTime.match(regexTime)) {
        alert("Time must be in hh:mm")
    }
    else {
        firstTrain = trainTime;
    }
    // train name must be a number
    if (isNaN($("#trainForm input[name=frequency]").val().trim())) {
        alert("Frequency must be a number")
    }
    else {
        frequency = $("#trainForm input[name=frequency]").val().trim()
    }
    // object to store all the information collected from the form
    var trainInfo = {
        name: trainName,
        destination: destination,
        first: firstTrain,
        frequency: frequency
    }
    // pushing the object to firebase
    database.ref().push(trainInfo)
})

// retrieving information from firebase
database.ref().on('child_added', function (response) {
    // making frequency a var to use in moment.js
    var freq = response.val().frequency;
    // first Train 
    var firstTrain = response.val().first;
    // making sure first train was earlier than the current time
    var firstTrainEarly = moment(firstTrain, "HH:mm").subtract(1, "years");
    // difference between the first train and the current time
    var difference = moment().diff(moment(firstTrainEarly), "minutes");
    // Time apart
    var timeApart = difference % freq;
    // next Train
    var nextTrain = freq - timeApart;;
    // arrival time
    var arrival = moment().add(nextTrain, "minutes");
    // append schedule
    $("#schedule").append("<tr>" + "<td>" + response.val().name + "</td>" + "<td>" + response.val().destination + "</td>" + "<td>" +
        response.val().frequency + "</td>" + "<td>" + moment(arrival).format('hh:mm') + "</td>" + "<td>" + nextTrain + "</td>" + "</tr>");
})

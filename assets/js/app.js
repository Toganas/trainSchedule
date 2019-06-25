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

// function something() {
//     database.ref().set({ friend: "armando" })
// };



$("#trainForm").on("submit", function (event) {
    event.preventDefault();

    var regexTime = /^\d{1,2}:\d{2}([ap]m)?$/;
    var trainTime = $("#trainForm input[name = firstTrain]").val().trim();
    // var matchTime = trainTime.match(regexTime);
    var trainName;
    var destination;
    var firstTrain;
    var frequency;

    if ($("#trainForm input[name=trainName]").val().trim().length > 2) {

        trainName = $("#trainForm input[name=trainName]").val().trim();
    } else {
        alert("Train name should be 3 letters or more")
    }
    if ($("#trainForm input[name=destination]").val().trim().length > 2) {
        destination = $("#trainForm input[name=destination]").val().trim();
    }
    else {
        alert("Destination should be 3 letters or more")
    }
    if (trainTime != "" && !trainTime.match(regexTime)) {
        alert("Time must be in hh:mm")

    }
    else {
        firstTrain = trainTime;
    }
    if (isNaN($("#trainForm input[name=frequency]").val().trim())) {
        alert("Frequency must be a number")
    }
    else {
        frequency = $("#trainForm input[name=frequency]").val().trim()
    }


    var trainInfo = {
        name: trainName,
        destination: destination,
        first: firstTrain,
        frequency: frequency
    }

    database.ref().push(trainInfo)
})



database.ref().on('child_added', function (response) {
    console.log(response.val())
    // making frequency a var to use in moment.js
    var freq=response.val().frequency;
    console.log("frequency: " + freq);
    // grabbing the current time
    var currentTime=moment();
    console.log("current Time: " + moment(currentTime).format("hh:mm"));
    // first Train 
    var firstTrain=response.val().first;
    console.log("first Train: "+firstTrain);
    // making sure first train was earlier than the current time
    var firstTrainEarly = moment(firstTrain, "HH:mm").subtract(1,"years");
    console.log("1 year ago: "+firstTrainEarly);
    // difference between the first train and the current time
    var difference = moment().diff(moment(firstTrainEarly), "minutes");
    console.log("Difference in time "+difference);
    // Time apart
    var timeApart = difference % freq;
    console.log(timeApart);
    // next Train
    var nextTrain = freq - timeApart;
    console.log("Minutes till next train "+nextTrain);

    // arrival time
    var arrival = moment().add(nextTrain, "minutes");
    console.log("Arrival "+moment(arrival).format("hh:mm"));

    // append schedule
    
    $("#schedule").append("<tr>" + "<td>" + response.val().name + "</td>" + "<td>" + response.val().destination + "</td>" + "<td>" + response.val().frequency + "</td>" + "<td>" + moment(arrival).format('hh:mm')+"</td>"+"<td>"+nextTrain+"</td>"+ "</tr>");

    //use moment js to calculate arrival 

    //table
    //tr
    //td 
    //empty-div
})

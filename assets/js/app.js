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
    if (trainTime != "" && !trainTime.match(regexTime)){
        alert("Time must be in hh:mm")
      
    }
    else {
        firstTrain = trainTime;
    }
    if (isNaN($("#trainForm input[name=frequency]").val().trim())){
        alert("Frequency must be a number")
    }
    else{
        frequency = $("#trainForm input[name=frequency]").val().trim()
    }
    

    var trainInfo = {
        name : trainName,
        destination : destination,
        first : firstTrain,
        frequency : frequency
    }

    database.ref().push(trainInfo)
})



database.ref().on('child_added', function(response){
    console.log(response.val().name)


    //use moment js to calculate arrival 

    //table
    //tr
    //td 
    //empty-div
})
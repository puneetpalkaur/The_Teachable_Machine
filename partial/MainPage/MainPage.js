angular.module('TeachableMachine').controller('MainpageCtrl',function($scope,MainService,$timeout){
$scope.counter = 1;
$scope.category = '';
   var width = 300;    // We will scale the photo width to this
  var height = 0;     // This will be computed based on the input stream
  var streaming = false;
  $scope.flag = false;
  var video = null;
  var canvas = null;
  var photo = null;
  var startbutton = null;
  var valueSet = false;
  var x = 5;
/*

    $scope.$watch($scope.flag, function() {
        console.log('hey, flag has changed!',$scope.flag);
    });*/
     video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    startbutton = document.getElementById('startbutton');


 navigator.getMedia = ( navigator.getUserMedia ||
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia ||
                           navigator.msGetUserMedia);
     navigator.getMedia(
      {
        video: true,
        audio: false
      },
      function(stream) {
        if (navigator.mozGetUserMedia)
        {
          video.mozSrcObject = stream;
        }
        else
        {
          var vendorURL = window.URL || window.webkitURL;
          video.src = vendorURL.createObjectURL(stream);
          //console.log('video.src' ,video.src);
        }
        video.play();
      },
      function(err) {
        console.log("An error occured! " + err);
      }
    );

    video.addEventListener('canplay', function(ev){
      if (!streaming) {
         height = video.videoHeight / (video.videoWidth/width);

        // Firefox currently has a bug where the height can't be read from
        // the video, so we will make assumptions if this happens.
        if (isNaN(height)) {
         height = width / (4/3);
       }

       video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        streaming = true;
      }
    }, false);


/*$scope.$watch('flag', function (newValue, oldValue, scope) {*/
$scope.predictMe = function(){
      console.log('hey, flag has changed!',$scope.flag);
       if(true) //$scope.flag
       {
        $timeout(countUp, 5000);

      }
};


 $scope.red = function () {

console.log('i am red rrrrrrrrrrrrrrr')
    $scope.photo = "Red";

    photo = document.getElementById("Red");
    takepicture("1");


  };
$scope.green = function () {
    $scope.photo = "Green"

    photo = document.getElementById("Green");
    console.log('i am green')
    takepicture("2");
  };
  $scope.blue = function () {

    $scope.photo = "Blue"
    flag = true;
    photo = document.getElementById("Blue");
    console.log('i am blue')
    takepicture("3");
   };
  // Fill the photo with an indication that none has been
  // captured.

  function clearphoto() {
    var context = canvas.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
  }

  function takepicture(id) {
  $scope.category = '';
  console.log('calling take picture lalallallaa')
    var context = canvas.getContext('2d');
    var dataList = [];
    console.log('printing width',width)
    console.log('printing height',height)
    if (width && height) {
    console.log('inside width and height');
        canvas.width = width;
      canvas.height = height;
    for(i=0;i<100;i++)
    {

      context.drawImage(video, 0, 0, width, height);

      var data = canvas.toDataURL('image/png');
      photo.setAttribute('src', data);
      dataList.push(data)
    }
    photo.setAttribute('src', data);
    console.log('befr calling sav method')

    var dataToSend  = {
            id: id,
            content : dataList

        }
        console.log('calling sav method')
        MainService.trainmodel(dataToSend).then(function (data) {
            console.log(data);
            console.log(data.message.id)
            valueSet = true;

           // ngToast.create('Your Profile Has Been Updated!');
        });


    } else {
      clearphoto();
    }
  }
 $scope.move = function (barId){
  var elem = document.getElementById(barId);
  var width = 0;
  var id = setInterval(frame, 100);
  console.log('printing category ',$scope.category);
  function frame() {
/*    if (width >= 100) {*/
    if (valueSet) {
      clearInterval(id);
      elem.style.width = '100' + '%';
      elem.innerHTML = '100' + '%';
    } else {
      width++;
      elem.style.width = width + '%';
      elem.innerHTML = width * 1  + '%';
    }
  }
              console.log('setting flag');
                $scope.flag = true;
                console.log($scope.flag);

};

/*function predictImg(){


      return data


}*/
/*var i = 0;
function myLoop () {
        console.log('added counter',$scope.counter);
        //  create a loop function
   setTimeout(function () {    //  call a 3s setTimeout when the loop is called
      console.log('hello');          //  your code here
      $scope.counter= $scope.counter+1;
      console.log('counter increased ',$scope.counter)
      i++;                     //  increment the counter
      if (i < 10) {            //  if the counter < 10, call the loop function
         myLoop();             //  ..  again which will trigger another
      }                        //  ..  setTimeout()
   }, 300)
}*/


 $scope.timeInMs = 0;

    var countUp = function()
    {
        console.log('laaaaaaaaaaaaa');
        console.log('calling send predictImg')
        var context = canvas.getContext('2d');
        var predictList = [];
        if (width && height) {
            canvas.width = width;
            canvas.height = height;
            context.drawImage(video, 0, 0, width, height);
            var data = canvas.toDataURL('image/png');
            // photo.setAttribute('src', data);
            predictList.push(data)

        //console.log('datafrmPred',data)
        var dataToSend  = {
            /*id = "1"*/
            content : data

        }
        console.log('calling predict method-----')
        MainService.predict(dataToSend).then(function (data) {
            console.log('hooooooooolaaaaaaaaaaaaa');
            console.log(data);
            console.log(data.message.id)
            if(data.message.id =="0")
            {
                 $scope.rcategory = "Red"
                 $scope.gcategory = ""
                 $scope.bcategory = ""
            }
            else if(data.message.id =="1")
            {
                 $scope.rcategory = ""
                 $scope.gcategory = "Green"
                 $scope.bcategory = ""
            }
            else if(data.message.id =="2")
            {
                 $scope.rcategory = ""
                 $scope.gcategory = ""
                 $scope.bcategory = "Blue"

            }
            else
            {
                  $scope.category = "None"
            }
           // ngToast.create('Your Profile Has Been Updated!');
        });

       }

        //$scope.timeInMs+= 500;
        $timeout(countUp,5000);
    }
});

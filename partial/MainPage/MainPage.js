angular.module('TeachableMachine').controller('MainpageCtrl',function($scope,MainService,$timeout){
$scope.category = '';
   var width = 500;
  var height = 0;
  var streaming = false;
  $scope.flag = false;
  var video = null;
  var canvas = null;
  var photo = null;
  var valueSet = false;
  var x = 5;
  video = document.getElementById('video');
  canvas = document.getElementById('canvas');
/*  pred = document.getElementById('toPred');*/


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

$scope.trainMe = function(){
console.log('calling trainme')
  MainService.trainModel().then(function (data) {
            console.log(data);
            console.log(data.message.id)
            valueSet = true;


        });


}

$scope.predictMe = function(){

       if(true) //$scope.flag
       {
        $timeout(countUp, 2000);

      }
};


 $scope.red = function () {

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


  function clearphoto() {
    var context = canvas.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
  }

  function takepicture(id) {
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

    console.log('befr calling sav method')

    var dataToSend  = {
            id: id,
            content : dataList

        }
        console.log('calling sav method')
        MainService.collectImgs(dataToSend).then(function (data) {
            console.log(data);
            console.log(data.message.id)
            valueSet = true;


        });
    photo.setAttribute('src', data);

    } else {
      clearphoto();
    }
  }

  $scope.movefast = function (barId){
  console.log('calling moveee')
  var elem = document.getElementById(barId);
  var width = 0;
  var id = setInterval(frame,80);
  function frame() {

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
                valueSet = false;

};
 $scope.move = function (barId){
  var elem = document.getElementById(barId);
  var width = 0;
  var id = setInterval(frame,2000);
  function frame() {

    if (valueSet) {
      clearInterval(id);
      elem.style.width = '100' + '%';
      elem.innerHTML = '100' + '%';
    } else {
      width++;
      if(width<=100)
      {
      elem.style.width = width + '%';
      elem.innerHTML = width * 1  + '%';
      }
    }
  }
              console.log('setting flag');
                $scope.flag = true;
                console.log($scope.flag);
                valueSet = false;

};

 $scope.timeInMs = 0;

    var countUp = function()
    {
          $timeout(countUp,2000);
        console.log('calling send predictImg')
        var context = canvas.getContext('2d');
        //var predictList = [];
        if (width && height) {
            canvas.width = width;
            canvas.height = height;
            context.drawImage(video, 0, 0, width, height);
            var mydata = canvas.toDataURL('image/png');
            //pred.setAttribute('src', mydata);
           // predictList.push(mydata)

        var dataToSend  = {

            content : mydata

        }
        console.log('calling predict method-----')
        MainService.predict(dataToSend).then(function (sdata) {

            console.log(sdata.message.id)
            if(sdata.message.id =="0")
            {
                 $scope.rcategory = "Red"
                 $scope.gcategory = ""
                 $scope.bcategory = ""
            }
            else if(sdata.message.id =="1")
            {
                 $scope.rcategory = ""
                 $scope.gcategory = "Green"
                 $scope.bcategory = ""
            }
            else if(sdata.message.id =="2")
            {
                 $scope.rcategory = ""
                 $scope.gcategory = ""
                 $scope.bcategory = "Blue"

            }


        });
        //clearphoto();
       }



    }
});

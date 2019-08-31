$(document).ready(function () {


    // When the model is loaded
    function modelLoaded() {
        console.log("Model Loaded!");
    }

    // Initialize the Image Classifier method with MobileNet
    const classifier = ml5.imageClassifier("MobileNet", modelLoaded);

    

    var imgbase64;
    // Init
    $(".image-section").hide();
    $(".loader").hide();
    $("#result").hide();

    // Upload Preview
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                imgbase64 = e.target.result;
                $("#imagePreview").css("background-image", "url(" + imgbase64 + ")");
                $("#imagePreview").hide();
                $("#imagePreview").fadeIn(650);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#imageUpload").change(function () {
        $(".image-section").show();
        $("#btn-predict").show();
        $("#result").text("");
        $("#result").hide();
        readURL(this);
    });

    // Predict
    $("#btn-predict").click(function () {
        // Show loading animation
        $(this).hide();
        $(".loader").show();
        
        // Make a prediction with a selected image
        var image = new Image();
        image.src = imgbase64;
        classifier.predict(image, function(err, results) {
            $(".loader").hide();
            $("#result").fadeIn(600);
            $("#result").text(" Result:  " + results[0].label);
        });
       
    });

});
# chemdoodle-angular
Angular integration for the popular ChemDoodle chemical sketcher

###Requirements:
* Chemdoodle 6
* Angular 1.x
* jQuery

###Installation

From Bower using

    bower install chemdoodle-angular

Add the following requirements to your index.html for your project - using chemdoodle 6 - this will work with chemdoodle 7 but the instantiation of chemdoodle has to happen outside the directive lifecycle so it is harder to have a dynamic id.

    <script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
    <script src="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.20/angular.min.js"></script>
    <link rel="stylesheet" href="https://hub.chemdoodle.com/cwc/6.0.0//ChemDoodleWeb.css">
    <script src="https://hub.chemdoodle.com/cwc/6.0.0/ChemDoodleWeb.js"></script>
    <link rel="stylesheet" href="https://hub.chemdoodle.com/cwc/6.0.0/uis/jquery-ui-1.10.3.custom.css">
    <script src="https://hub.chemdoodle.com/cwc/6.0.0/uis/ChemDoodleWeb-uis.js"></script>
    
Inject the dependency in the usual way

    var myApp =  angular.module('myApp', ['chemdoodleAngular',...]);
    
###Demo

Clone the repository and run:

    python -m SimpleHTTPServer 8000
    
The demo app will be available at localhost:8000. Alternatively place in a web accessible folder

###Usage

Chemdoodle Angular is a wrapper directive which you can place at any level in your dom. It is linked to an id for the particular sketcher element that you want to create on the page. This allows more than one sketcher to be created if necessary. It is used like this:

 <chemdoodlewrapper  molfile="molecule.molfile" elementid="'chemdoodle'">
      <canvas id="chemdoodle"></canvas>
   </chemdoodlewrapper>

Molecule is an object and molfile is a string. Chemdoodle will be updated to reflect the molfile string when the following event is broadcasted. This is to avoid watchers.

    $rootScope.$broadcast("setMolecule");
    

To allow for situations where the molecule has been deleted, methane is assumed to be an empty molecule.

If you would like to run some code when the contents of the sketcher window has changed (or at least on click of the sketcher window) then use:

$scope.$on("moleculeChanged", function(){
                $scope.dataReady = false;
                $scope.dataset = undefined;
            });


The following features of chemdoodle are not supported with molfile export:

R groups, atom queries and * (any atom)

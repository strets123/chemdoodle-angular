    var testChemDoodleApp =  angular.module('chemdoodleAngular', []);
  

function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
       // Edge (IE 12+) => return version number
       return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
}



angular.module('chemdoodleAngular')
       .directive('chemdoodlewrapper', function ($timeout, $window, $rootScope) {
    return {
      restrict: 'E',
      scope:{'molfile' : '=' , 'elementid' : '=', 'fulldatabind': '='},
      link: function postLink(scope, element, attrs) {
      
        var localhtmlCopy = '<canvas id="' + scope.elementid + '" fulldatabind="' + scope.fulldatabind + '" molfile="' + scope.molfile + '"></canvas>';
        function resize(newElem){
          var cd_width = jQuery(element).parent().width() * 0.99;

          var max_height = $window.innerHeight * 0.5;

          var height = (cd_width*0.7) > max_height ? max_height : cd_width * 0.7;

          if(newElem){
            if(detectIE()){
              element.html(localhtmlCopy);
            }
            scope.elem = new ChemDoodle.SketcherCanvas(scope.elementid, cd_width, height, {oneMolecule:true, includeToolbar:true, includeQuery:true});
            if(scope.molfile){
              scope.elem.loadMolecule(ChemDoodle.readMOL(scope.molfile));
            }
          }else{
            if(detectIE()){
              //If the browser is IE then redraw the whole of the chemdoodle element becuase IE does not rerender it correctly on resize - IE users will lose the undo history but this cannot be helped
              element.html(localhtmlCopy);
              scope.elem = new ChemDoodle.SketcherCanvas(scope.elementid, cd_width, height, {oneMolecule:true, includeToolbar:true, includeQuery:true});
              if(scope.molfile){
                scope.elem.loadMolecule(ChemDoodle.readMOL(scope.molfile));
              }
            }else{
              scope.elem.resize(cd_width,height);
            }
            
          }
          
        }
        $timeout(function(){
          resize(true);
            //bind click events on 
            if(scope.fulldatabind){
               jQuery("#" + scope.elementid).prev().bind({
                click : function(e) {
                  scope.$apply(scope.setMol);
                }
              });

              scope.elem.keyup = function(e) {
                  scope.$apply(scope.setMol);
                };

              scope.elem.click = function(e) {
                  scope.$apply(scope.setMol);
                };
            }
         
        });
        
        scope.setMol = function(){
          var molfile = ChemDoodle.writeMOL(scope.elem.getMolecule()).valueOf();
          if(btoa(molfile) === "TW9sZWN1bGUgZnJvbSBDaGVtRG9vZGxlIFdlYiBDb21wb25lbnRzCgpodHRwOi8vd3d3LmljaGVtbGFicy5jb20KICAxICAwICAwICAwICAwICAwICAgICAgICAgICAgOTk5IFYyMDAwCiAgICAwLjAwMDAgICAgMC4wMDAwICAgIDAuMDAwMCBDICAgMCAgMCAgMCAgMCAgMCAgMApNICBFTkQ="){
            //check for methane - you can't search for methane
            scope.molfile = "";
          }else{
            scope.molfile = molfile;
          }
        };

        angular.element($window).bind('resize', function() {
            scope.$apply(function() {
                resize(false);
            });
        });
        $rootScope.$on("fetchMolecule", function(){
            scope.setMol();
        });
      
      }
  }});

 angular.module('chemdoodleAngular').controller('testChemDoodleAppController', function ($scope) {
        $scope.molecule = {"molfile": ""};
      });

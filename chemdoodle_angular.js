    var testChemDoodleApp =  angular.module('chemdoodleAngular', []);
  

angular.module('chemdoodleAngular')
       .directive('chemdoodlewrapper', function ($timeout, $window, $rootScope) {
    return {
      restrict: 'E',
      scope:{'molfile' : '=' , 
             'elementid' : '=', 
             'moleculeChangedEventName':'=?',
             'setMoleculeEventName': '=?'
           },

      link: function postLink(scope, element, attrs) {
        if (!angular.isDefined(scope.moleculeChangedEventName)) { scope.moleculeChangedEventName = 'moleculeChanged'; }
        if (!angular.isDefined(scope.setMoleculeEventName)) { scope.setMoleculeEventName = 'setMolecule'; }
        console.log(scope.setMoleculeEventName)
        function resize(newElem){
          var cd_width = jQuery(element).parent().width() * 0.99;

          var max_height = $window.innerHeight * 0.5;

          var height = (cd_width*0.7) > max_height ? max_height : cd_width * 0.7;
          if (jQuery('#' + scope.elementid ).is(":visible")){
            
              jQuery(element).html( '<canvas id="'+ scope.elementid +'"></canvas>');
              scope.elem = new ChemDoodle.SketcherCanvas(scope.elementid, cd_width, height, {oneMolecule:true, includeToolbar:true, includeQuery:true});
              if(scope.molfile){
                  scope.elem.loadMolecule(ChemDoodle.readMOL(scope.molfile));
              }
            //bind click events - we have to do this each time we resize as it is a new chemdoodle element 
               jQuery("#" + scope.elementid).prev().bind({
                click : scope.getMol
              });
              scope.elem.keyup = scope.getMol;
              scope.elem.click = scope.getMol;
          }

          
        }
        scope.methane = "TW9sZWN1bGUgZnJvbSBDaGVtRG9vZGxlIFdlYiBDb21wb25lbnRzCgpodHRwOi8vd3d3LmljaGVtbGFicy5jb20KICAxICAwICAwICAwICAwICAwICAgICAgICAgICAgOTk5IFYyMDAwCiAgICAwLjAwMDAgICAgMC4wMDAwICAgIDAuMDAwMCBDICAgMCAgMCAgMCAgMCAgMCAgMApNICBFTkQ=";
         scope.getMol = function(e){
          $timeout(function(){
                  scope.$apply(
                    function(){
                      var molfile = ChemDoodle.writeMOL(scope.elem.getMolecule()).valueOf();

                      if(btoa(molfile) === scope.methane ){
                        //check for methane - you can't search for methane
                        if(scope.molfile !== ""){
                          scope.molfile = "";
                          $rootScope.$broadcast(scope.moleculeChangedEventName);
                        }
                        
                      }else{
                        if(molfile !==scope.molfile){
                          scope.molfile = molfile;
                          $rootScope.$broadcast(scope.moleculeChangedEventName);
                        }
                        
                      }
                      
                    }
                );
            });
        };

        $timeout(function(){
          resize(true);
   

        });
        
        angular.element($window).bind('resize', function() {
            scope.$apply(function() {
                resize(false);
            });
        });
        $rootScope.$on(scope.setMoleculeEventName, function(){
          $timeout(function(){
            scope.$apply(function() {
              if(jQuery('#' + scope.elementid ).is(":visible")){
                 if(scope.molfile){
                  scope.elem.loadMolecule(ChemDoodle.readMOL(scope.molfile));
                  }else{
                    //Set the canvas to blank
                    scope.elem.loadMolecule(ChemDoodle.readMOL(atob(scope.methane)));
                  }
              }
             
            });
          });
        });
      

      }
  }});

 angular.module('chemdoodleAngular').controller('testChemDoodleAppController', function ($scope) {
        $scope.molecule = {"molfile": ""};
      });

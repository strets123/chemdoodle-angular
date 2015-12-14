    var testChemDoodleApp =  angular.module('chemdoodleAngular', []);
  

angular.module('chemdoodleAngular')
       .directive('chemdoodlewrapper', function () {
    return {
      restrict: 'E',
      scope:{'molfile' : '=' , 'elementid' : '='},
      link: function postLink(scope, element, attrs) {
        console.log(scope.elementid)
        var elem = new ChemDoodle.SketcherCanvas(scope.elementid, 455, 300, {oneMolecule:true, includeToolbar:true, includeQuery:true});

        scope.setMol = function(){
          var molfile = ChemDoodle.writeMOL(elem.getMolecule()).valueOf();
          if(btoa(molfile) === "TW9sZWN1bGUgZnJvbSBDaGVtRG9vZGxlIFdlYiBDb21wb25lbnRzCgpodHRwOi8vd3d3LmljaGVtbGFicy5jb20KICAxICAwICAwICAwICAwICAwICAgICAgICAgICAgOTk5IFYyMDAwCiAgICAwLjAwMDAgICAgMC4wMDAwICAgIDAuMDAwMCBDICAgMCAgMCAgMCAgMCAgMCAgMApNICBFTkQ="){
            //check for methane - you can't search for methane
            scope.molfile = "";
          }else{
            scope.molfile = molfile;
            var mol = elem.getMolecule();

          }
        };
        element.bind ({
          click : function(e) {
            scope.$apply(scope.setMol);
          },
          keyup : function(e) {
            scope.$apply(scope.setMol);
          }
        });
      }
  }});

 angular.module('chemdoodleAngular').controller('testChemDoodleAppController', function ($scope) {
        $scope.molecule = {"molfile": ""};
      });
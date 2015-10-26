describe('Directives', function() {
  beforeEach(module('myguthub'));

  describe('butterbar', function() {
    var element, scope;
    beforeEach(inject(function(_$rootScope_, _$compile_) {
      $rootScope = _$rootScope_;
      $compile = _$compile_;
      element = angular.element('<div butterbar></div>');
      scope = $rootScope.$new();

      scope.$apply(function() {
        $compile(element)(scope);
      });
    }));

    it('should be rendered hidden', function() {
      expect(element.hasClass('hide')).toBe(true);
    });
    it('should not be hidden on routeChangeStart', function() {
      $rootScope.$broadcast('$routeChangeStart');
      expect(element.hasClass('hide')).toBe(false);
    });
    it('should be hidden on routeChangeSuccess', function() {
      $rootScope.$broadcast('$routeChangeSuccess');
      expect(element.hasClass('hide')).toBe(true);
    });
  });

  describe('focus', function() {
    var element, scope, timeout;
    beforeEach(function() {
      jasmine.addMatchers({
        toHaveFocus: function() {
          return {
            compare: function(actual) {
              return {
                pass: document.activeElement === actual[0]
              };
            }
          };
        }
      });
    });

    beforeEach(inject(function(_$rootScope_, _$compile_, _$timeout_) {
      $rootScope = _$rootScope_;
      $compile = _$compile_;
      timeout = _$timeout_;
      element = angular.element('<form><input type="text" name="first" /><input type="text" name="second" focus="true" /></form>');

      scope = $rootScope.$new();
      scope.$apply(function() {
        $compile(element)(scope);
      });

    }));

    it('should have focus', function() {
      var input = element.find('input');
      console.log(input[1]);
      spyOn(input[1], 'focus');
      timeout.flush();
      expect(input[1].focus).toHaveBeenCalled();
    });
  });

});
describe('GutHub App', function() {
  it('should show a list of recipes', function() {
    browser.get('http://localhost:' + process.env.PORT.toString());
    browser.getTitle().then(function(title) {
      expect(title).toBe('My GutHub');
    });
    expect(element.all(
      by.repeater('recipe in recipes')).count()
        .then(function(count) { return count; })).toEqual(2);
  });
});
describe('Git is a dependency not handled by npm', function () {
  it('should have git installed', function (done) {
      require('child_process').exec('git --version', done);
  });
});

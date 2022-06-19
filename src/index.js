const core         = require('@actions/core');
const ShellManager = require('./res/shellmanager.js');
const Nuget        = require('./res/nuget.js');

(async () => {

  try {
    const inputs = {
      HELLO : core.getInput('hello'),
    };

    const Shell = new ShellManager();
    const nuget = new Nuget();

    nuget.setup(inputs);

    nuget.setShell(Shell);

    nuget.setLogger({
      notice: core.notice,
      info  : core.info
    })

    await nuget.run();
  }
  catch(error) {
    console.error(error);
    core.setFailed(error);
  }

})();

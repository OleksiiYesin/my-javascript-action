const core         = require('@actions/core');
const ShellManager = require('./res/shellmanager.js');
const Nuget        = require('./res/nuget.js');

(async () => {

  try {
    const inputs = {
      WHO       : core.getInput('who'),
      RUN_BUILD : core.getInput('build'),
      RUN       : core.getInput('run'),
      DIR       : core.getInput('dir'),
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

const { countReset } = require("console");
const shelly = require('shelljs');


class Nuget {
    constructor() {
        this.inputs = {};
    }

  setup(inputs) {
    for(const [key, value] of Object.entries(inputs)) {
        this.inputs[key] = value;
    }
  }
  setShell(Shell) {
    this.Shell = Shell;
  }
  setLogger({info, notice}) {
    this.info   = info;
    this.notice = notice;
  }

  async run() {
    try {

        // Hello
        if (this.inputs.WHO)
          await this.who();

        // check version .NET
        await this.checkVersion();
        
        // build of the project
        if (this.inputs.RUN_BUILD);
          await this.build();
          
        // run of the project
        if (this.inputs.RUN);
          await this.inputs.run();
    }

    catch(e) {
        throw new Error(e);
    }
  }

  async who() {
    try {
        let name = await this.inputs.WHO;
        this.info(`Hello ${name}`)
    }
    catch(e) {
        throw new Error(e);
    }
  }


  async checkVersion() {
    try {
        let version = await this.Shell.run('dotnet', [ '--version' ]);
        this.info(`.Net version ${version} installed`);
    }
    catch(e) {
        throw new Error(e);
    }
  }

  async build() {
    try {
        await this.shelly.cd([ this.inputs.DIR ]);
        await this.Shell.run('dotnet', [ 'build' ]);
    }
    catch(e) {
        throw new Error(e);
    }
  }

  async run() {
    try {
        await this.Shell.run('cd', [ this.inputs.DIR ]);
        await this.Shell.run('dotnet', [ 'build' ]);
    }
    catch(e) {
        throw new Error(e);
    }
  }

}

module.exports = Nuget;

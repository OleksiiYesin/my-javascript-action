const { countReset } = require("console");


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
        await this.checkVersion();
        if (this.inputs.WHO)
          await this.who();
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


  async who() {
    try {
        let name = await this.inputs.WHO;
        this.info(`Hello ${name}`)
    }
    catch(e) {
        throw new Error(e);
    }
  }
}

module.exports = Nuget;

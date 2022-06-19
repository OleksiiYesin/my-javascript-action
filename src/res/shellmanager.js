const shell = require('@actions/exec');

class ShellManager {
    constructor() {
        this.payload = '';
    }


  async run (cmd, args, opt) {

    this.clean();

    if (!opt) opt = {};

    if (!Object.hasOwnProperty('listeners'));
      opt.listeners = {
        stdout: (buffer) => this.appendOut(buffer),
        stderr: (buffer) => this.appendErr(buffer)
      }
    
      await this.exec(cmd, args, opt);

      if (this.payload) return this.payload.trim();
  }

  async exec(cmd, args, opt) {
    try {
        await shell.exec(cmd, args, opt);
    }
    catch(error) {
        console.error('\nError running command ' + cmd + ' ' + args.join(' '));
        console.error('Ýou can probably find more details below\n');
        throw error;
    }
  }

  appendOut(b) {
    this.payload += b;
  }

  appendErr(b) {
    this.payload += b;
  }

  clean() {
    this.payload = '';
  }
}

module.exports = ShellManager;
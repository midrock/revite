import { Command } from 'commander'

export const program = new Command()

program
  .on('--help', () => {
    console.info(
      '\nAdditional Information:\n' +
      '  This utility allows you to create ready-made templates for service, provider and listener\n' +
      '  Argument description:\n' +
      '    type - service, provider or listener\n' +
      '    name - generates folder and file names (kebab-case)\n' +
      '    path - path where to create template\n' +
      '  Example: revite g service test-name demo/src\n ',
    )
  })

if (!process.argv.slice(2).length) {
  program.help()
}

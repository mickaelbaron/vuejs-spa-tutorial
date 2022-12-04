const translateList = {
  noValue: 'Select a value',
  memory: 'Memory',
  core: 'Core',
  socket: 'Socket',
  diskSize: 'Disk Size',
  login: 'Login',
  password: 'Password',
  sshkey: 'SSH Key',
  publicNet: 'Public Network',
  privateNet: 'Private Network'
}

export const myi18n = {
  getTranslate(value) {
    let translatedValue = translateList[value]

    if (translatedValue === undefined) {
      return value
    } else {
      return translatedValue
    }
  }
}

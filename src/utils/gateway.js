const STO = {
  currency: 'STA',
  issuer: 'rUAU22rLt8TbXo5mcZr2JZZMavfS7MtHwG'
}

const STE = {
  currency: 'XRP'
}

const USDT = {
  currency: 'UST',
  issuer: 'r3FnAL25N4dtSiQntx7jRyCtHoYUApQ6C1'
}
const HUSD = {
  currency: 'HUS',
  issuer: 'r9FctBtb1p3t3hPQDwhpkEAwrkve5bY8FY'
}
const coinList = [
  {
    display: 'STO/USDT',
    coin: STO
  },
  {
    display: 'STE/USDT',
    coin: STE
  },
  {
    display: 'STE/HUSD',
    coin: STE
  },
  {
    display: 'STO/HUSD',
    coin: STO
  }
]
module.exports = {
  STO,
  STE,
  USDT,
  HUSD,
  coinList
}

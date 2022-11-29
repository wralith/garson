class Cents {
  cents: number
  constructor(cents: number) {
    this.cents = cents
  }

  getDollar() {
    return (this.cents / 1000).toFixed(2)
  }
}

export class MenuItem {
  id: string
  name: string
  price: Cents

  constructor(id: string, name: string, price: number) {
    this.id = id
    this.name = name
    this.price = new Cents(price)
  }
}

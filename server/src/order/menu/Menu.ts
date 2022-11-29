import { MenuItem } from "./MenuItem"

class Menu {
  items: Map<string, MenuItem>
  constructor(items?: Map<string, MenuItem>) {
    this.items = items ?? new Map()
  }

  getAll() {
    return this.items
  }

  getOne(name: string) {
    return this.items.get(name)
  }

  upsert(item: MenuItem) {
    this.items.set(item.name, item)
  }
}

const FoodMenu = new Menu()
FoodMenu.upsert(new MenuItem("1", "Pizza", 6000))
FoodMenu.upsert(new MenuItem("2", "Hamburger", 5000))
FoodMenu.upsert(new MenuItem("3", "Cheesecake", 3000))
FoodMenu.upsert(new MenuItem("4", "Hot Dog", 1500))
FoodMenu.upsert(new MenuItem("5", "Popcorn", 500))

const BeverageMenu = new Menu()
FoodMenu.upsert(new MenuItem("101", "Coke", 500))
FoodMenu.upsert(new MenuItem("102", "Water", 200))
FoodMenu.upsert(new MenuItem("103", "Beer", 1000))

export { FoodMenu, BeverageMenu }

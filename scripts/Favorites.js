export class GithubUser {
  static search(userName) {
    const endpoint = `https://api.github.com/users/${userName}`

    return fetch(endpoint).then((response) =>
      response.json().then(({ login, name, public_repos, followers }) => ({
        login,
        name,
        public_repos,
        followers,
      }))
    )
  }
}

export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)
    this.load()
  }

  load() {
    this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []
  }

  delete(user) {
    const filteredEntries = this.entries.filter(
      (entry) => entry.login !== user.login
    )
    this.entries = filteredEntries
    this.update()
  }

  async add(userName) {
    const user = await GithubUser.search(userName)
  }
}

export class FavoritesView extends Favorites {
  constructor(root) {
    super(root)
    // console.log(this.root)

    this.tbody = this.root.querySelector('table tbody')
    this.update()
    this.onAdd()
  }

  onAdd() {
    const favButton = this.root.querySelector('.search-btn')

    favButton.onclick = () => {
      const { value } = this.root.querySelector('#input-search')

      this.add(value)
    }
  }

  update() {
    this.removeAllTr()
    this.entries.forEach((user) => {
      const row = this.createRow(user)

      row.querySelector('.remove-btn').onclick = () => {
        const isDeleting = confirm(
          'Tem certeza que deseja remover esse usuário?'
        )

        if (isDeleting) {
          this.delete(user)
        }
      }
      this.tbody.append(row)
    })
  }

  createRow(user) {
    const tr = document.createElement('tr')
    const content = `    
      <td class="users">
        <img
          src="https://github.com/${user.login}.png"
          alt="Imagem de ${user.name}"
        />
        <a href="https://github.com/${user.login}" target="_blank">
          <p>${user.name}</p>
          <span>/${user.login}</span>
        </a>
      </td>
      <td class="repositories">${user.puplic_repos}</td>
      <td class="followers">${user.followers}</td>
      <td>
        <button class="remove-btn">Remover</button>
      </td>
      `
    tr.innerHTML = content

    return tr
  }

  removeAllTr() {
    this.tbody.querySelectorAll('tr').forEach((tr) => {
      tr.remove()
    })
  }
}

export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)
    this.load()
  }

  load() {
    this.entries = [
      {
        login: 'dbento-dev',
        name: 'David Bento',
        puplic_repos: 38,
        followers: 18990,
      },
      {
        login: 'diego3g',
        name: 'Diego Fernandes',
        puplic_repos: 15,
        followers: 1884,
      },
    ]
  }

  delete(user) {
    const filteredEntries = this.entries.filter(
      (entry) => entry.login !== user.login
    )
    this.entries = filteredEntries
    this.update()
  }
}

export class FavoritesView extends Favorites {
  constructor(root) {
    super(root)
    // console.log(this.root)

    this.tbody = this.root.querySelector('table tbody')
    this.update()
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

const authorName: HTMLElement = document.querySelector(".author-name")!;
const tags: HTMLElement = document.querySelector(".tags")!;
const quote: HTMLElement = document.querySelector(".author-quote")!;

const btnRegroup: HTMLElement = document.querySelector(".regroup")!;
const btnLink: HTMLElement = document.querySelector(".link")!;

interface Quote {
  author: string;
  tags: string[];
  quote: string;
}

class App {
  #currentQuote!: Quote;

  constructor() {
    this._getLocalStorage();
    btnRegroup?.addEventListener("click", () => {
      this._generateQuote();
    });
  }

  async _generateQuote() {
    try {
      let quote: Quote;
      const response = await fetch("https://api.quotable.io/random");

      const data = await response.json();
      console.log(data);
      quote = {
        author: data.author,
        tags: data.tags,
        quote: data.content,
      };
      this.#currentQuote = quote;
      this._setLocalStorage();
      this._displayQuote(quote);
    } catch (error) {
      let message: string = "Unknown Error";

      if (error instanceof Error) message = error.message;
      console.error(message);
    }
  }

  _displayQuote(q: Quote) {
    authorName.innerHTML = q.author;
    quote.innerHTML = q.quote;
    tags.innerHTML = "";
    q.tags.forEach(function (tag) {
      tags.insertAdjacentHTML("beforeend", `<span class="tag"> ${tag} </span>`);
    });
  }

  _setLocalStorage() {
    const quoteString = JSON.stringify(this.#currentQuote);
    localStorage.setItem("quote", quoteString);
  }

  _getLocalStorage() {
    const storedQuote: string | null = localStorage.getItem("quote");

    if (!storedQuote) {
      this._generateQuote();
      return;
    }
    this.#currentQuote = JSON.parse(storedQuote);
    this._displayQuote(this.#currentQuote);
  }
}

const x = new App();

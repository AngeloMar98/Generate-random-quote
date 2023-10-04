"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _App_currentQuote;
const authorName = document.querySelector(".author-name");
const tags = document.querySelector(".tags");
const quote = document.querySelector(".author-quote");
const btnRegroup = document.querySelector(".regroup");
const btnLink = document.querySelector(".link");
class App {
    constructor() {
        _App_currentQuote.set(this, void 0);
        this._getLocalStorage();
        btnRegroup === null || btnRegroup === void 0 ? void 0 : btnRegroup.addEventListener("click", () => {
            this._generateQuote();
        });
    }
    _generateQuote() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let quote;
                const response = yield fetch("https://api.quotable.io/random");
                const data = yield response.json();
                console.log(data);
                quote = {
                    author: data.author,
                    tags: data.tags,
                    quote: data.content,
                };
                __classPrivateFieldSet(this, _App_currentQuote, quote, "f");
                this._setLocalStorage();
                this._displayQuote(quote);
            }
            catch (error) {
                let message = "Unknown Error";
                if (error instanceof Error)
                    message = error.message;
                console.error(message);
            }
        });
    }
    _displayQuote(q) {
        authorName.innerHTML = q.author;
        quote.innerHTML = q.quote;
        tags.innerHTML = "";
        q.tags.forEach(function (tag) {
            tags.insertAdjacentHTML("beforeend", `<span class="tag"> ${tag} </span>`);
        });
    }
    _setLocalStorage() {
        const quoteString = JSON.stringify(__classPrivateFieldGet(this, _App_currentQuote, "f"));
        localStorage.setItem("quote", quoteString);
    }
    _getLocalStorage() {
        const storedQuote = localStorage.getItem("quote");
        if (!storedQuote) {
            this._generateQuote();
            return;
        }
        __classPrivateFieldSet(this, _App_currentQuote, JSON.parse(storedQuote), "f");
        this._displayQuote(__classPrivateFieldGet(this, _App_currentQuote, "f"));
    }
}
_App_currentQuote = new WeakMap();
const x = new App();

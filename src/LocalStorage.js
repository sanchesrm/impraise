export const loadState = () => {
    return localStorage.getItem('shortenList') ? JSON.parse(localStorage.getItem('shortenList')) : {};
}

export const saveState = (state) => {
    localStorage.setItem('shortenList', JSON.stringify(state));
}
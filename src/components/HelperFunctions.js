
export const AutoLink = (content) => { 
const str = content
const arr = str.split('*');
console.log(arr);
const links = ["SEO", "Google Ads"]
let result = arr.filter((word)=> links.some((link) => link === word && word != document.title));
console.log(result)
}
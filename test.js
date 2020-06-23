function removal(array, element) {
  const index = array.indexOf(element);
  array.splice(index, 1);
}

const vowels = ["a", "e", "i", "o", "u", "x"];
// vowels.toString(); // "a,e,i,o,u,x"

// Let's remove "x" since it's not a vowel.
removal(vowels, "x");
console.log(vowels.toString()); // "a,e,i,o,u"

// What happens if we remove "x" again? Oops!
// remove(vowels, "x");
// vowels.toString(); // "a,e,i,o"

// var msg = "hello world #twitterbot";
function remove(textToFilter) {
  var msgArray = message.split(" ");
  const index = msgArray.indexOf(textToFilter);
  msgArray.splice(index, 1);
  return msgArray.join(" ");
}
console.log(remove("#twitterbot"));

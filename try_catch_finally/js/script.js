//General layout
try {
  // run this code
} catch (error) {
  // if error, go here
  // error is the error object
} finally {
  // do regardless of an error
}

////* examples *////

//Use in setTimeout
setTimeout(function () {
  try {
    nonExcistantVariable; //error happends here
  } catch {
    alert("error is caught here!");
  }
}, 1000);

//Error data
try {
  lalala; // error, undefined variable
} catch (err) {
  alert(err.name); // name of error
  alert(err.message); // what the error is
  alert(err.stack); // name, what the error is and where to find it in code
  //Stack used primarily for debugging

  // Can also show one message
  alert(err); // Shows name and what the error is
}

//Throwing data
let json = '{ "age": 30 }'; // incomplete data

try {
  let user = JSON.parse(json); // <-- no errors

  if (!user.name) {
    throw new SyntaxError("Incomplete data: no name");
  }

  alert(user.name);
} catch (err) {
  alert("JSON Error: " + err.message); // Output = JSON Error: Incomplete data: no name
}

//Rethrowing to extral catch
function readData() {
  let json = '{ "age": 30 }';

  try {
    // ...
    blabla(); // error!
  } catch (err) {
    // ...
    if (!(err instanceof SyntaxError)) {
      throw err; // rethrow error
    }
  }
}

try {
  readData();
} catch (err) {
  alert("External catch got: " + err); // catch error
}

//Adding Finally
try {
  alert("try");
  if (confirm("Make an error?")) BAD_CODE();
} catch (err) {
  alert("catch");
} finally {
  alert("finally");
}

//CODE FROM :
// https://javascript.info/try-catch#finally-or-just-the-code
